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
	
    const getRoot = (req, res) => {
        db.pokemon.getRoot(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                res.render('home', { pokemon: result.rows });
            }
        });
    }

    const getNew = (req, res) => {
        res.render('new');
    }

    const getPokemon = (req, res) => {

        let id = req.params['id'];
        db.pokemon.getPokemon(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                res.render('pokemon', { pokemon: result.rows[0] });
            }
        });
    }

    const postPokemon = (req, res) => {

        let params = req.body;
        db.pokemon.postPokemon(params.name, params.height, (err, result) => {
            if (err) {
                console.log('query error:', err.stack);
            } else {
                // redirect to home page
                res.redirect('/pokemon');
            }
        });
    };

    const editPokemonForm = (req, res) => {
        let id = req.params['id'];
        db.pokemon.editPokemonForm(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                res.render('Edit', { pokemon: result.rows[0] });
            }
        });
    }

    const updatePokemon = (req, res) => {
        let id = req.params['id'];
        let pokemon = req.body;
        pool.query(pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                res.redirect('/pokemon');
            }
        });
    }

    const deletePokemonForm = (req, res) => {
        res.send("COMPLETE ME");
    }

    const deletePokemon = (req, res) => {
        let id = req.params['id'];
        db.pokemon.deletePokemon(queryString, (err, result) => {
            if (err) {
                console.error('Query error:', err.stack);
            } else {
                // redirect to home page
                res.redirect('/pokemon');
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
