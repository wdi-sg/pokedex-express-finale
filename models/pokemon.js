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

        createForm: (pokemon, callback) => {
            console.log('create form in mod');
            const queryString = 'SELECT COUNT(id) FROM pokemons';
            dbPool.query(queryString, (error, queryResult) => {
                console.log('running query in createForm models...');
                console.log(queryResult.rows[0].count);
                callback(error, queryResult);
            });
        },

        create: (pokemon, callback) => {
            const queryString = 'INSERT INTO pokemons (num, name, img, weight, height) VALUES ($1, $2, $3, $4, $5)';
            const VALUES = [
                pokemon.num,
                pokemon.name,
                pokemon.img,
                pokemon.weight,
                pokemon.height
            ];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        get: (id, callback) => {

            const queryString = "SELECT * FROM pokemons WHERE id=$1";
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        deletePokemon: (id, callback) => {
            const queryString = "DELETE FROM pokemons WHERE id=$1";
            const VALUES = [id];

            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        update: (pokemon, callback) => {

            const queryString = 'UPDATE pokemons SET num = $6, name=$1, img=$2, height=$3, weight=$4 WHERE pokemons.id = $5';
            const VALUES = [pokemon.name, pokemon.img, pokemon.height, pokemon.weight, parseInt(pokemon.id), pokemon.num];

            //set up query to update data of a specific pokemon
            dbPool.query(queryString, VALUES, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};