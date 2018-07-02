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
const sha256 = require('js-sha256');

module.exports = function(db) {
const getRoot = (request, response) => {
        const queryString = 'SELECT * from pokemon;';
        pool.query(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                response.render('home', { pokemon: result.rows });
            }
        });
    }

    const getNew = (request, response) => {
        response.render('new');
    }

    const getPokemon = (request, response) => {
        let id = request.params['id'];
        const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
        pool.query(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                response.render('pokemon', { pokemon: result.rows[0] });
            }
        });
    }

    const postPokemon = (request, response) => {
        let params = request.body;

        const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2);';
        const values = [params.name, params.height];

        pool.query(queryString, values, (err, result) => {
            if (err) {
                console.log('query error:', err.stack);
            } else {
                // redirect to home page
                response.redirect('/pokemon');
            }
        });
    };

    const editPokemonForm = (request, response) => {
        let id = request.params['id'];
        const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
        pool.query(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                response.render('Edit', { pokemon: result.rows[0] });
            }
        });
    }

    const updatePokemon = (request, response) => {
        let id = request.params['id'];
        let pokemon = request.body;
        const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
        const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
        pool.query(queryString, values, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                response.redirect('/pokemon');
            }
        });
    }

    const deletePokemonForm = (request, response) => {
        response.send("COMPLETE ME");
    }

    const deletePokemon = (request, response) => {
        let id = request.params['id'];
        const queryString = 'DELETE FROM pokemon WHERE id =' + id + ';';
        pool.query(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                response.redirect('/pokemon');
            }
        })
    }
return {
        getRoot: getRoot,
        getNew: getNew,
        getPokemon: getPokemon,
        postPokemon: postPokemon,
        editPokemonForm: editPokemonForm,
        updatePokemon: updatePokemon,
        deletePokemon: deletePokemon,
        deletePokemonForm: deletePokemonForm,
   	}
}
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
