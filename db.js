/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */
const config = require("./config.js");

const pg = require("pg");
const pokemon = require('./models/pokemon');
const userModel = require('./models/user');

const exportPool = new pg.Pool(config.dbSettings);

exportPool.on("error", function(err) {
  console.log("Idle client error", err.message, err.stack);
});

module.exports = {
  pool: exportPool,
  
  //pokemon: pokemon(exportPool),

  //user: user(exportPool),

  singleQuery: async function(queryObj) {
    let result = await db.pool.query(queryObj);
    return result.rows;
  },

  multiQuery: async function(queryObjectArray) {
    // possibility of using generators here?
  }
};
