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
const pokemon_model = require('./models/pokemon');
const users_model = require('./models/user');

const config = {
  user: 'delontoh89',
  host: '127.0.0.1',
  database: 'pokemon_users',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

module.exports = {

	pokemon: pokemon_model(pool),
	user: users_model(pool),
	pool: pool
};

