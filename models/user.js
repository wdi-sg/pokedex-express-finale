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

 module.exports = function (dbPool) {
     // Note: dbPool is the connection pool that db.js will pass into this model.
     return {
         create: async function (userObj) {

         },

         getById: async function (id) {

         },

         login: async function (userObj) {

         },

         update: async function (userObj) {

         }
     }
 }