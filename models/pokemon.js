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

 module.exports = function (dbPool) {
     // Note: dbPool is the connection pool that db.js will pass into this file
     return {
         create: async function (pokemonObj) {

         },

         getById: async function (id) {
             
         }
     }
 }