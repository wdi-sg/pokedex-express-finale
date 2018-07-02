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

module.exports = function(db){


    let example = function(email, password_hash, callback){
        let queryText = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';

        const values = [email, password_hash];
        db.query(queryText, values, callback);
    };

    return {
        example : example
    };
};
