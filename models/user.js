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
const db = require('../db.js');

module.exports = function(poolObj){

    const userModel = (email, password, callback) => {

        let queryText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];

        poolObj.query(queryText, values, callback);
    }

    const loginCheck = (email, callback) => {

        let queryText = 'SELECT password, id FROM users WHERE email = $1';
        const values = [email];

        poolObj.query(queryText, values, callback);

    }
     const addPokemon2User = (pokemon_id, pokemon_user) => {

        let queryText = 'INSERT INTO pokemon_user (pokemon_id, user_id) VALUES ($1, $2) RETURNING *'
        const values = [pokemon_id, usr_id];

        poolObj.query(queryText, values, callback);

    }

    const displayUserPokemon = (callback) => {
        
        let queryText = 'SELECT * FROM pokemon_user JOIN pokemon ON pokemon.id = pokemon_user.pokemon_id WHERE user_id=' + user_id
        poolObj.query(queryText, callback);

    }

    return {
        userModel : userModel,
        loginCheck : loginCheck,
        addPokemon2User : addPokemon2User,
        displayUserPokemon : displayUserPokemon
    };
};
