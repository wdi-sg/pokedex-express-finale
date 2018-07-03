/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */
const pg = require('pg');
configs = {

	user: 'wenyaolee',
	host: '127.0.0.1',
	database: 'pokemons',
	port: 5432
};

const poolObj = new pg.Pool(configs);

poolObj.on('error', function(err) {
	console.log('Error connecting to database', err.message, err.stack);
});

const userModel = require('./models/user');
const pokemonModel = require('./models/pokemon');

const userObj = userModel(poolObj);
const pokemonObj = pokemonModel(poolObj);

module.exports = {
	pool : poolObj,
	user : userObj,
	pokemon : pokemonObj
}