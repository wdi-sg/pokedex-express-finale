const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());


// Set jsx to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */



// Import routes to match incoming requests

// Root GET request (it doesn't belong in any controller file)
app.get('/', (req, res) => {
  console.log(req.cookies['loginCookie']);
  res.render('application', {page: 'home', userLogin: req.cookies['loginCookie']});
})

const myRoutes = require('./routes.js');
myRoutes(app, db);


app.get('*', (req, res) => {
  res.render('404');
})
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');
  // close database connection pool
  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
