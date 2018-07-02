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

// make module.exports as a function

module.exports = (dbPoolInstance) => {

	//`dbPoolInstance` is accessible within this function scope
	return {
		// Create Pokemon
		create: (pokemon, callback) => {

			// set up query
			const queryString = 'INSERT INTO pokemons (name, num, img, weight, height, id) VALUES ($1, $2, $3, $4, $5, $6)';

			const values = [
				pokemon.name,
				pokemon.num,
				pokemon.img,
				pokemon.weight,
				pokemon.height,
				pokemon.id
			];

			// execute query
			dbPoolInstance.query(queryString, values, (err, queryResult) => {
				// invoke callback function with results after query has excuted
				callback(err, queryResult);
			});
		},

		// Get information from Pokemon Data
		get: (id, callback) => {

			queryString = 'SELECT * FROM pokemons WHERE id = $1';

			const values = [id];

			// console.log(values);

			dbPoolInstance.query(queryString, values, (error, queryResult) => {
				// invoke callback function with results after query has excuted
				callback(error, queryResult);

			});
		},

		// Edit pokemon 
		edit: (pokemonId, newValue, callback) => {

			const queryString = 'UPDATE pokemons SET (id = $2, num = $3, name = $4, img = $5, weight = $6, height = $7) WHERE id = $1' ;

			let values = [pokemonId, newValue.id, newValue.num, newValue.name, newValue.img, newValue.weight, newValue.height];

			console.log(values);

			dbPoolInstance.query(queryString, values, (error, queryResult) => {
				// invoke callback function with results after query has excuted
				callback(error, queryResult);

			});

		},

		// Delete pokemon
		delete: (id, callback) => {

			const queryString = 'DELETE from pokemons WHERE id = $1';
			let values = [id];

			dbPoolInstance.query(queryString, values, (error, queryResult) => {
				// invoke callback function with results after query has excuted
				callback(error, queryResult);

			});
		},

		getAllPokemon: (smth, callback) => {

			const queryString = 'SELECT * FROM pokemons';

			dbPoolInstance.query(queryString, (error, queryResult) => {
				// invoke callback function with results after query has excuted
				callback(error, queryResult);

			});
		}
	};
};
















