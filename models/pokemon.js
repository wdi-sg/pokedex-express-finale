/**
 * Pokemon model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a pokemon (be it C, R, U, or D),
 * one or more of the functions here should be called.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  return {
    all: (callback) => {
      let queryString = 'SELECT * FROM pokemons;';
      pool.query(queryString, (err, res) => {
        callback(res.rows);
      });
    }
  };
};
