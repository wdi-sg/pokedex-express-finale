/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// Set handlebars to be the default view engine
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app);
// Root GET request (it doesn't belong in any controller file)

// Catch all unmatched requests and return 404 not found page

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
  let db = require('./db.js');
  db.pool.end();
  setTimeout(() => {
  //  console.log(db.pool);
    process.exit( 0 );
  },500);
});

process.on( "SIGINT", function() {
  console.log( "got SIGINT" );
  server.close();
});
