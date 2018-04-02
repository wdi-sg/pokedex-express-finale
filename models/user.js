// import { create } from "handlebars";

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
const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
    return {
        get: (id, callback) => {
            const queryString = 'SELECT * from users where id=$1';
            const values = [id];
            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        create: (user, callback) => {
            const emailCheck = `SELECT * FROM users WHERE email = '${user.email}';`
            dbPool.query(emailCheck, (error1, result) => {
                if(result.rowCount>0) {
                    callback(error1, {duplicate: true});
                } else {
                    bcrypt.hash(user.password, 1,(error2, hashed) => {
                        const queryString = 'INSERT into users (name, email, password) VALUES ($1, $2, $3)';
                        const values = [
                            user.name,
                            user.email,
                            hashed
                        ];

                        dbPool.query(queryString, values, (error3, queryResult) => {
                            callback(error3, queryResult);
                        });
                    });
                }
            });
        },

        login: (user, callback) => {
            const queryString = 'SELECT * from users WHERE email=$1';
            const values = [user.email];

            dbPool.query(queryString, values, (error, queryResult) => {
                bcrypt.compare(user.password, queryResult.rows[0].password, (error, result) => {
                    callback(error, {status: result});
                });
            });
        }
    };
};