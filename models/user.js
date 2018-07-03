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
     
    	get: (userId, callback) => {
    		const queryString = 'SELECT * FROM pokemon WHERE user_id = $1;';
  			const values = [userId];

   			pool.query(queryString, values, (err, result) => {
   				callback(err, result);
   			});
    	},

    	create: (body, password_hash, callback) => {
    		let queryString = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *;';
    		const values = [body.email, password_hash];

  			pool.query(queryString, values, (err, result) => {
  				callback(err, result);
  			});
    	},

    	verify: (body, callback) => {
    		let queryString = 'SELECT * FROM users WHERE email = $1;';
  			const values = [body.email];

  			pool.query(queryString, values, (err, result) => {
  				callback(err, result);
  			});
    	}
    };
};
