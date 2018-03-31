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

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  return {
    new: (userDetails, callback) => {
      let queryString = 'INSERT INTO users (id, name, email, password)' +
        'VALUES ($1, $2, $3, $4)';
      let values = [userDetails.id, userDetails.name, userDetails.email,
      userDetails.password];
      console.log(queryString);
      console.log('values: ', values);
      pool.query(queryString, values, (err, res) => {
        console.log("USER ADDED");
        console.log(res);
        callback(res);
      });
    }
  };
};
