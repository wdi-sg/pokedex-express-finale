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
const userModel = require('./models/user');
const pokemonModel = require('./models/pokemon');

const dbPool = new pg.Pool({
	host:'localhost',
	user: 'seliyansilvarajoo',
	port: 5432,
	database: 'pokedex'
});


module.exports = {
	dbPool:dbPool,
	userModel: userModel(dbPool),
	pokemonModel:pokemonModel(dbPool)

}