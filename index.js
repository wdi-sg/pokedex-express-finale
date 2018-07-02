/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */

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
//use the views directory for all the templates
app.set('views', __dirname + '/views');
//use the react engine in express
app.engine('jsx', reactEngine);
// this line sets react to be the default view engine
app.set('view engine', 'jsx');



/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests

// Root GET request (it doesn't belong in any controller file)

// Catch all unmatched requests and return 404 not found page
require('./routes')(app, db);

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

});
