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
const userDB = require('./models/user');
const pokemonDB = require('./models/pokemon');

const configs = {
  user: 'Isa',
  host: '127.0.0.1',
  database: 'pokemons_development',
  port: 5432
}

const pool = new pg.Pool(configs);

pool.on('error', (err) => {
  console.log('pg client error', err.message, err.stack);
})

module.exports = {
  pool: pool,
  userDB: userDB(pool),
  pokemonDB: pokemonDB(pool)
}
