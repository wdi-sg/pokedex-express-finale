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
const pokemon = require('./models/pokemon');
const users = require('./models/user');

const configs = {
  user: 'angtingsoon',
  host: '127.0.0.1',
  database: 'pokemons_development',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  pokemon: pokemon(pool),
  users: users(pool),

  // get a reference to end the connection pool at server end
  pool:pool
};








