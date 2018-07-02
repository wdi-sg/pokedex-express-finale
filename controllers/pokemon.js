let createControllers = db => {
    const Pokemon = require("../models/pokemon")(db);

    return {
        showNewPokemonForm: (request, response) => {
            response.render('newpokeform');
        },

        showEditPokemonForm: (request, response) => {
            let errorCallback = error => {
                console.error('query error:', err.stack);
            }
            let successCallback = (pokemon, count) => {
                if (count > 0) {
                    let context = pokemon;
                    response.render('editpokeform', context);
                } else {
                    response.send('No matching pokemon!');
                }
            }
            Pokemon.read(request.params.id, errorCallback, successCallback);
        },

        pokemonCreate: (request, response) => {
            let pokeInfo = {
                name: request.body.name,
                img: request.body.img,
                weight: request.body.weight,
                height: request.body.height
            };
            let errorCallback = error => {
                console.error('query error:', error.stack);
            };
            let successCallback = (pokemon, count) => {
                request.flash('success', 'Pokemon added successfully!');
                response.redirect('/');
            };
            console.log(Pokemon);
            Pokemon.create(pokeInfo, request.cookies.user_id, errorCallback, successCallback);
        },

        pokemonRead: (request, response) => {
            let errorCallback = error => {
                console.error('query error:', error.stack);
            };
            let successCallback = (pokemon, count) => {
                if (count > 0) {
                    response.send(pokemon);
                } else {
                    response.status(404);
                    response.send("not found");
                }
            };
            Pokemon.read(request.params.id, errorCallback, successCallback);
        },

        pokemonUpdate: (request, response) => {
            let pokeInfo = {
                name: request.body.name,
                img: request.body.img,
                height: request.body.height,
                weight: request.body.weight
            };
            let errorCallback = error => {
                console.error('query error:', error.stack);
            };
            let successCallback = () => {
                request.flash('success', 'Pokemon updated successfully!');
                response.redirect('/');
            };
            Pokemon.update(request.params.id, pokeInfo, errorCallback, successCallback);
        },

        pokemonDelete: (request, response) => {
            let errorCallback = error => {
                console.error('query error:', error.stack);
                request.flash('error', 'Error during deletion.');
            };
            let successCallback = () => {
                request.flash('success', 'Pokemon deleted successfully!');
                response.redirect('/');
            };
            Pokemon.delete(request.params.id, errorCallback, successCallback);
        }
    }
}

module.exports = createControllers;