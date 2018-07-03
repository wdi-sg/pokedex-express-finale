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

module.exports = function(db){

    // let example = function(email, password_hash, callback){
    //     let queryText = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';

    //     const values = [email, password_hash];
    //     db.query(queryText, values, callback);
    // };

    let pokemonModelGetPokemon = function(queryString, callback){
    	db.query(queryString, callback);
    };

    let pokemonModelPostPokemon = function(queryString, values, callback){
    	db.query(queryString, values, callback);
    };

    let pokemonModelEditPokemonForm = function(queryString, callback){
    	db.query(queryString, callback);
    };

    let pokemonModelUpdatePokemon = function(queryString, values, callback){
    	db.query(queryString, values, callback);
    };

	let pokemonModelDeletePokemonForm = function(queryString, callback){
		db.query(queryString, callback);
	};

	let pokemonModelDeletePokemon = function(queryString, callback){
		db.query(queryString, callback);
	};

    return {
        //example : example
        pokemonModelGetPokemon: pokemonModelGetPokemon,
        pokemonModelPostPokemon : pokemonModelPostPokemon,
        pokemonModelEditPokemonForm : pokemonModelEditPokemonForm,
        pokemonModelUpdatePokemon : pokemonModelUpdatePokemon,
        pokemonModelDeletePokemonForm : pokemonModelDeletePokemonForm,
        pokemonModelDeletePokemon : pokemonModelDeletePokemon
    };
};