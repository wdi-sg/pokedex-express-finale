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
  user: 'sabrinachow',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432
};


const poolObj = new pg.Pool(configs);

poolObj.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const userModel = require('./models/user');

const userObj = userModel(poolObj);

module.exports = {
    user: userObj,
    pool : poolObj
};