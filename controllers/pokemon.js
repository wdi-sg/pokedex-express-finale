/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

const db = require('../db');
const pokemon = require('../models/pokemon');

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

async function getById(request, response) {
    // use the models/pokemon.js getById function to retrieve the pokemon
    let result = await pokemon.getById(request.params.id);
    let context = { pokemon: result };
    response.render('pokemon/show', context);
};

async function updateForm(request, response) {
    // show the form for updating the pokemon here. need to populate the form with the pokemon data
    let result = await pokemon.getById(request.params.id);
    let context = { pokemon: result };
    response.render('pokemon/edit', context);
};

async function update(request, response) {
    // actually update the pokemon data in the database by using the models/pokemon.js update function
    let pokemonObj = {
        id: request.body.id,
        name: request.body.name,
        image: request.body.img,
        weight: request.body.weight,
        height: request.body.height
    };
    let result = await pokemon.update(pokemonObj);
    response.redirect('/');
};

function newForm(request, response) {
    response.render('pokemon/new');
};

async function create(request, response) {
    // actually create the pokemon in the database by using the models/pokemon.js create function, then redirect to homepage
    let pokemonObj = {
        name: request.body.name,
        image: request.body.img,
        weight: request.body.weight,
        height: request.body.height
    };
    let result = await pokemon.create(pokemonObj);
    response.redirect('/');
};

async function deleteById(request, response) {
    await pokemon.deleteById(request.params.id);
    response.redirect('/');
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
    show: getById,
    updateForm: updateForm,
    update: update,
    newForm: newForm,
    create: create,
    delete: deleteById
}