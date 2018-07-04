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

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
const get = (db) => {
    return (request, response) => {
        //use pokemon model method 'get' to retrive pokemon data
        db.pokemon.get(request.params.id, (error, queryResult) => {
            //queryResult contains pokemon data returned from the pokemon model
            if (error) {
                console.log('error getting pokemon', error);
                response.sendStatus(500);
            } else {
                //render pokemon.handlebars in the pokemon view folder
                response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
            }
        });
    };
};

const deletePokemon = (db) => {
    return (request, response) => {
        db.pokemon.deletePokemon(request.params.id, (error, queryResult) => {
            if (error) {
                response.sendStatus(500);
            } else {
                response.redirect('/');
            }
        });
    };
};

const updateForm = (db) => {
    return (request, response) => {
        db.pokemon.get(request.params.id, (error, queryResult) => {
            if (error) {
                console.log('error getting pokemon', error);
                response.sendStatus(500);
            } else {
                //render pokemon.handlerbars in pokemon view folder
                console.log(queryResult.rows[0]);
                response.render('pokemon/edit', { pokemon: queryResult.rows[0] });
            }
        });
    };
};

const update = (db) => {
    return (request, response) => {

        db.pokemon.update(request.body, (error, queryResult) => {
            let pokemon_id = request.params.id;

            if (error) {
                response.sendStatus(500);
            } else {
                response.redirect('/pokemons/' + pokemon_id);
            }
        });
    };
};

const createForm = (db) => {
    return (request, response) => {
        console.log('create form');
        db.pokemon.createForm(request.body, (error, queryResult) => {
            console.log('pokemons girlssss');

            if (error) {
                response.sendStatus(500);
            } else {
                let number = parseInt(queryResult.rows[0].count) + 1;
                response.render('pokemon/new', { pokemon: { num: number } });
            }
        });
    };
};

const create = (db) => {
    return (request, response) => {
        //use pokemon model method 'create' to create new pokemon entry in database
        db.pokemon.create(request.body, (error, queryResult) => {

            // check if able to get queryResult 
            if (error) {
                console.log('error getting pokemon ', error);
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
    deletePokemon,
    updateForm,
    update,
    createForm,
    create
}