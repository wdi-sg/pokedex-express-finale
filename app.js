const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const path = require('path');
const jsonfile = require('jsonfile');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

const db = require("./db");
const helpers = require("./helpers");
// load the router module in the app
const pokemon = require('./routes/pokemon')(db);
const user = require('./routes/user')(db);

/** * ===================================
 * Configurations and set up
 * =================================== */

// Init express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(cookieParser());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  if (req.originalUrl === '/' || req.originalUrl === '/signin' || req.originalUrl === '/user/new?' || req.originalUrl === '/user' || req.cookies.logged_in === 'true') {
    next();
  } else {
    res.redirect('/signin');
  }
});

// set react to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

/** * ===================================
 * Routes
 * =================================== */

// use the pokemon router
app.use('/pokemon', pokemon);
// use the user router
app.use('/user', user);

// Root handler
app.get('/', (request, response) => {
    let isLoggedIn = request.cookies.logged_in;
    let currentUserId = request.cookies.user_id;
    if (isLoggedIn === 'true') {
      let queryString;
      let values = [currentUserId];
      if (request.query.sortby == "name") {
          queryString = 'SELECT * FROM pokemon INNER JOIN user_pokemon ON pokemon.id = user_pokemon.pokemon_id WHERE username_id = $1 ORDER BY pokemon.name ASC;'
      } else {
          queryString = 'SELECT * FROM pokemon INNER JOIN user_pokemon ON pokemon.id = user_pokemon.pokemon_id WHERE username_id = $1 ORDER BY pokemon.id ASC;'
      }
      db.query(queryString, values, (err, result) => {
          if (err) {
              console.error('query error:', err.stack);
          } else {
              console.log(result.rows);
              let pokeinfo = result.rows.map( pokemon => { return { "name": pokemon.name, "id": pokemon.pokemon_id, "num": pokemon.num, "img": pokemon.img }; })
              let context = { pokeinfo: pokeinfo, cookies: request.cookies };
              response.render('home', context);
          }
      });
    } else {
      response.render('homeempty');
    }
});

app.get('/signin', (request, response) => {
  response.render('signinform');
});

app.post('/signin', (request, response) => {
  let enteredUsername = request.body.username;
  let enteredPasswordHash = sha256(request.body.password);
  let queryText = 'SELECT * FROM users WHERE username = $1';
  let value = [enteredUsername];
  db.query(queryText, value, (err, res) => {
    if (err) {
      console.log("Error signing in:", err);
      response.status(401);
    } else {
      if (res.rows.length < 1) {
        request.flash('error', 'No such account!');
        response.redirect('/');
        return;
      };
      if (enteredPasswordHash !== res.rows[0].password_hash) {
        request.flash('error', 'Please check your password.');
        response.redirect('/');
        return;
      };
      response.cookie('logged_in', 'true');
      response.cookie('user_id', res.rows[0].id);
      request.flash('success', 'Successfully signed in!');
      response.redirect('/');
    };
  });
});

app.post('/signout', (request, response) => {
    response.clearCookie('user_id');
    response.clearCookie('logged_in');
    request.flash('success', 'Successfully signed out!');
    response.redirect('/');
});

/** * ===================================
 * Listen to requests on port 3000
 * =================================== */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));