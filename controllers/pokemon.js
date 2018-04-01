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
const get = (allModels) => {
    return (request, response) => {
        //use pokemon model method 'get' to retrive pokemon data
        allModels.pokemon.get(request.params.id, (error, queryResult) => {
            //queryResult contains pokemon data returned from the pokemon model
            if (error) {
                console.log('error getting pokemon: ', error);
                response.sendStatus(500);
            } else {
                //render pokemon.handlebars in the pokemon view folder
                response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
            }
        });
    };
};

// const updateForm = (allModels) => {
//     return (request, response) => {
//         allModels.pokemon.get(request.params.id, )
//     }
// }

const createForm = (request, response) => {
    response.render('pokemon/new');
}

const create = (allModels) => {
    return (request, response) => {
        //use pokemon model method 'create' to create new pokemon entry in database
        allModels.pokemon.create(request.body, (error, queryResult) => {

            // check if able to get queryResult 
            if (error) {
                console.log('error getting pokemon: ', error);
                response.sendStatus(500);
            }

            //check if pokemon is successfully created
            if (queryResult.rowCount >= 1) {
                console.log('Pokemon created successfully');
            } else {
                console.log('Pokemon could not be created');
            }

            //redirect to homepage after creation
            response.redirect('/');
        });
    };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
    get,
    // updateForm,
    // update,
    createForm,
    create
}