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
module.exports = (dbPool) => {
    return {
        get: (id, callback) => {
            const queryString = 'SELECT * from pokemons where id=$1'
            const value = [id];
            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};