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
const config = {
  user: 'drillaxholic',
  host: '127.0.0.1',
  database: 'pokemon-go',
  port: 5432,
};

const poolObj = new pg.Pool(config);

poolI=poolObj.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

const userModel = require('./models/user.js');

const userObj = userModel(poolObj);

module.exports = {
    user: userObj,

    pool : poolObj
};