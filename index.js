/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */

const express = require('express');
const bodyParser=require('body-parser');
const handlebars=require('express-handlebars');
const cookieParser = require('cookie-parser');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Set handlebars to be the default view engine
const handlebarsConfig={
	extname: '.handlebars',
	layoutsDir: 'views/layouts',
	defaultLayout: 'mainLayout'
};
app.engine('.handlebars',handlebars(handlebarsConfig));
app.set('view engine', '.handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
const routes = require('./routes');
const db =require('./db');
routes(app,db);

// Root GET request (it doesn't belong in any controller file)
app.get('/',(sReq,sRes)=>{
	let context = {};
	let error = sReq.query.error
	if(error=="invalidpassword"){
		context.incorrectPw=true;
	}else if(error=="noUser"){
		context.noSuchUser=true;
	}
	let queryText=('select * from pokemons')
	db.dbPool.query(queryText,(err,dbRes)=>{
		context.pokemon=dbRes.rows;
		sRes.render('home',context);
	});
});

// Catch all unmatched requests and return 404 not found page
app.get('/*',(sReq,sRes)=>{
	sRes.render('404');
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

});
