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
const config = require('../config');
const db = require('../db');
const bcrypt = require('bcrypt');
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */


module.exports = {
    create: async function (userObj) {
        if (!userObj.password) {return false};
        let check = await db.singleQuery('SELECT * FROM users WHERE name='+userObj.name+';');
        if (check.length > 0) {return false};
        let hashedPassword = await bcrypt.hash(userObj.password, config.bcryptSalt);
        await db.singleQuery('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [userObj.name, userObj.email, hashedPassword]);
        return true;
    },

    getById: async function (id) {
        let result = db.singleQuery('SELECT * FROM users WHERE id=$1;', [id]);
        return result[0];
    },

    loginByName: async function (userObj) {
        let tmp = await db.singleQuery('SELECT password FROM users WHERE name=$1', [userObj.name]);
        if (tmp.length === 0) {return false};
        let hashedPassword = tmp[0].password;
        if (!hashedPassword) {return false};
        let result = await bcrypt.compare(userObj.password, hashedPassword);
        return result;
    },

    update: async function (userObj) {

    },

    addPokemon: async function (username, pokemonId) {

    },

    removePokemon: async function (username, pokemonId) {
        
    }
}