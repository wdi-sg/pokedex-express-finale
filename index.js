/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */

const express = require('express');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const exphbs = require('express-handlebars');
let session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
let MemcachedStore = require('connect-memcached')(session);

// App config: need config.js

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// MVC setting: need db.js and routes.js
const config = require('./config'); // contains all strings, titles, and default appContext object
const db = require('./db');

const intercept = function (request, response, next) {
  request.session.cookie['ip'] = request.ip;
  request.session.cookie['id'] = request.sessionID;
  next();
}

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');

// Set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());
// app.use(contextBuilder);
// app.use(authCheck);
app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  store: new MemcachedStore({
    hosts: config.memcacheHost,
    secret: config.memcacheSecret
  })
}));
app.use(intercept);

/**
 * ===================================
 * Routes
 * ===================================
 */
// Basic routing functions
function errorHandler (request, response) {
  response.render('404');
}

const dbGetAllPokemonsQuery = {
  name: "get-all-pokemons",
  text: "SELECT * FROM pokemons ORDER BY id ASC",
  values: []
}

async function rootGetHandler (request, response) {
  // run a query for all the pokemons and render the home page. Note: use a named query for this since it's a fixed non-parametrized query.
  let pokemons = await db.singleQuery(dbGetAllPokemonsQuery);
  
  let context = {
    pokemon: pokemons
  };

  if (request.cookies['loggedIn']) {
    let tmp = await db.singleQuery('SELECT id FROM users WHERE name=$1 ORDER BY id ASC', [request.cookies['name']]);
    let id = tmp[0].id;
    let userPokemons = await db.singleQuery('SELECT * FROM pokemons WHERE id IN (SELECT pokemon_id FROM users_pokemons WHERE user_id=$1);', [id]);
    context['loggedIn'] = true;
    context['name'] = request.cookies['name'];
    context['userPokemon'] = userPokemons;
  } else {
    context['loggedIn'] = false;
  }
  response.render('home', context);
}

// Import routes to match incoming requests
require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)
app.get('/', rootGetHandler);

// Catch all unmatched requests and return 404 not found page
app.get('*', errorHandler);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', async () => {
  console.log('Closed express server');

  // close database connection pool
  await db.pool.end();
  console.log('Database connections closed');
});

process.on("SIGINT", function() {    
  server.close(); 
});