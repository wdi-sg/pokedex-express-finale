const express = require('express');
const bcrypt = require('bcrypt');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const db = require('./db')


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Set handlebars to be the default view engine
const handlebarsConfig = {
  extname: '.handlebars',
  layoutsDir: 'views',
  defaultLayout: 'layout'
}
app.engine('.handlebars', handlebars(handlebarsConfig));
app.set('view engine', '.handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app, db);


// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  const queryString = 'SELECT * FROM pokemons ORDER BY 1;'
  db.pool.query(queryString, (error, queryResults) => {
    response.render('home', { pokemons: queryResults.rows,
                              loggedIn: request.cookies["loggedIn"]

                            });
  })
})

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

});
