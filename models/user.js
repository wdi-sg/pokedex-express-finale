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

const sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
    // `dbPool` is accessible within this function scope
    return {
        create: (user, callback) => {
                //setup query
                const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
                const values = [
                    user.name,
                    user.email,
                    sha256(user.password)
                ];
                console.log(values);

                //execute query
                dbPool.query(queryString, values, (error, queryResult) => {

                

                    callback(error, queryResult);
                });
        },

        login: (user, callback) => {

            console.log(user)
            const queryString = "SELECT * FROM users WHERE name = $1";
            
            dbPool.query(queryString, (error, queryResult) => {
            
                console.log(queryString);
                // if (VALUES[1] == user.password) {
                //     console.log(user.password);
                    
                //     response.cookie('loggedIn', true);
                //     response.cookie('username', queryResult.rows[0].id);

                //     response.redirect('/pokemons');
                // } 
                
            })
        }
    };
};