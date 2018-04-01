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

const db = require('../db');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = {
    create: async function (pokemonObj) {
        let tmp = await db.singleQuery('SELECT MAX(id)+1 AS newid FROM pokemons;');
        let newId = tmp[0].newid;
        let newNum = newId.toString().padStart(3, '0');
        await db.singleQuery('INSERT INTO pokemons (name, num, img, weight, height) VALUES ($1, $2, $3, $4, $5);', [pokemonObj.name, newNum,pokemonObj.image, pokemonObj.weight, pokemonObj.height]);
    },

    getById: async function (id) {
        let queryResult = await db.singleQuery('SELECT * FROM pokemons WHERE id=$1;', [id]);
        return queryResult[0];
    },

    update: async function (pokemonObj) {
        await db.singleQuery('UPDATE pokemons SET name=\''+pokemonObj.name+'\', img=\''+pokemonObj.image+'\', weight=\''+pokemonObj.weight+'\', height=\''+pokemonObj.height+'\' WHERE id=$1;', [pokemonObj.id]);
    },

    deleteById: async function (id) {
        await db.singleQuery('DELETE FROM pokemons WHERE id=$1;', [id]);
    }
}