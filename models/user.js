/**
 * User model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a user (be it C, R, U, D, or Login),
 * one or more of the functions here should be called.
 *
 * NOTE: You can add authentication logic in this model.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */
const bcrypt = require('bcrypt');
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
  return {
    create: (user, callback) => {
      bcrypt.hash(user.password, 1, (err, hash) => {
        const queryString = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${hash}') RETURNING id;`;
        dbPool.query(queryString, (err2, results) => {
          callback(err2, results.rows[0].id);
        })
      })
    },

    login: (user, callback) => {
      const queryString = `SELECT id AS user_id, password FROM users WHERE email = '${user.email}';`;
      dbPool.query(queryString, (err, queryResult) => {
        bcrypt.compare(user.password, queryResult.rows[0].password, (err2, results) => {
          callback(err2, { user_id: queryResult.rows[0].user_id, authenticated: results });
        })
      })
    }     
  }
}

