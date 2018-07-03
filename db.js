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

const config = {
    user: 'fupuchu',
    host: '127.0.0.1',
    database: 'pokemons',
    port: 5432,
  }

  const pool = new pg.Pool(config);

  pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
  });

  const userModel = require('./models/user');

  const userObj = userModel(pool);
  
  module.exports = {
      user: userObj,
      pool : pool
  }
