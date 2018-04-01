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
        create: (pokemon, callback) => {
            const queryString = 'INSERT INTO pokemons (num, name, img, weight, height) VALUES ($1, $2, $3, $4, $5)';
            const VALUES = [
                pokemon.num,
                pokemon.name,
                pokemon.img,
                pokemon.weight,
                pokemon.height
            ];

            //execute query
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                //invoke callback function with results after query has executed
                callback(error, queryResult);
            });
        },

        get: (id, callback) => {

            const queryString = "SELECT * FROM pokemons WHERE id=$1";
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};