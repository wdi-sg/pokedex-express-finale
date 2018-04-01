/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

 function getById(db) {
     return function (request, response) {
         // use the models/pokemon.js getById function to retrieve the pokemon

     };
 };

 function updateForm(db) {
     return function (request, response) {
         // show the form for updating the pokemon here. need to populate the form with the pokemon data
     };
 };

 function update(db) {
     return function (request, response) {
         // actually update the pokemon data in the database by using the models/pokemon.js update function
     };
 };

 function createForm(request, response) {
     response.render('pokemon/new');
 };

 function create(db) {
     return function (request, response) {
         // actually create the pokemon in the database by using the models/pokemon.js create function, then redirect to homepage
     };
 };

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
    get: getById,
    updateForm: updateForm,
    update: update,
    createForm: createForm,
    create: create
}