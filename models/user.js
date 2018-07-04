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

module.exports = function(pool){


    // let example = function(email, password_hash, callback){
    //     let queryText = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';

    //     const values = [email, password_hash];
    //     pool.query(queryText, values, callback);
    // };



    // checks login email and password
    let checkLogin = (email, password, callback) => {
        let queryString = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        let values = [email, password];
        pool.query(queryString, values, callback)
    }



    // checks if the email address already has an account 
    let checkEmail = (email, callback) => {
        let queryString = 'SELECT FROM users WHERE email = $1';
        let values = [email];
        pool.query(queryString, values, callback);
    }



    // creates a new user
    let createUser = (name, email, password_hash, callback) => {
    	let queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    	let values = [name, email, password_hash];
    	pool.query(queryString, values, callback);
    }



    return {
        // example : example
        checkEmail: checkEmail,
        createUser: createUser,
        checkLogin: checkLogin
    };
};
