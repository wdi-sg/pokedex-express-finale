/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

module.exports = (db) => {


/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

	const get = (request, response) => {
	 	// use pokemon model method 'get' to retrieve pokemon data
	 	db.pokemon.get(parseInt(request.params.id), (error, queryResult) => {
	 		// queryResult contains pokemon data returned from the pokemon model
	 		if (error) {
	 			console.error('err 1 error getting pokemon: ', error.message);
	 			response.sendStatus(500);
	 		} else {
	 			if (queryResult.rows.length > 0) {
		 			// render pokemon view in the view folder
		 			// console.log(queryResult.rows[0]);
		 			response.render('showPokemon', { pokemon: queryResult.rows[0] });
	 			} else {
	 				response.send('Pokemon Not Found.')
	 			}
	 		}
	 	});
 	};

 	const createForm = (request, response) => {

 		response.render('addPokemon');

 	};

 	const create = (request, response) => {

		let input = request.body;
		input.id = parseInt(input.id);
		input.height += ' m';
		input.weight += ' kg';

 		// use pokemon model method 'create' to create new entry
 		db.pokemon.create(input, (error, queryResult) => {

 			if (error) {
 				console.error('error 3 getting pokemon: ', error);
 				response.sendStatus(500);
 			}

 			if (queryResult.rowCount >= 1) {
 				console.log('Pokemon created successfully.');
 			} else {
 				console.log('Pokemon could not be created.');
 			}

 			// redirect to home page
 			response.send('Pokemon created.')

 		});

 	};

 	const editForm = (request, response) => {

 		let pokemonIndex = parseInt(request.params.id);
 		// console.log(pokemonIndex);
 		// show pokemon form
 		response.render('editPokemon', {id: pokemonIndex});

 	};

 	const editData = (request, response) => {

		let pokemonId = parseInt(request.params.id);

		let newValue = request.body;
		newValue.id = parseInt(newValue.id);
		newValue.height += ' m';
		newValue.weight += ' kg';

		// console.log(newValue);

		db.pokemon.edit(pokemonId, newValue, (error, queryResult) => {

			if (error) {
	 			console.error('err 2 error getting pokemon: ', error.message);
	 			response.sendStatus(500);
	 		} else {
	 			// render pokemon view in the view folder
	 			response.send('pokemon edited.');
	 		}
		});
 	};

 	const deleteData = (request, response) => {

 		let pokemonId = parseInt(request.params.id);

 		db.pokemon.delete(pokemonId, (error, queryResult) => {

		    if (error) {
		      response.status(500).send('error 4: ' + err.message);
		    } else {
		      // go back to home page
		      response.send('Pokemon deleted.');
		    }

 		});
 	};

 	const showAllPokemon = (request, response) => {

 		let smth;

 		db.pokemon.getAllPokemon(smth, (error, queryResult) => {

 			const pokeData = queryResult.rows;

 			if (error) {
 				console.error('query error 5: ', error.stack);
 			} else {

 				const data = {
 					all_pokemon: pokeData
 				};

 				// redirect to home page
 				response.render('Home', data);
 			}
 		});
 	};







/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

 	return {
 		get,
 		createForm,
 		create,
 		editForm,
 		editData,
 		deleteData,
 		showAllPokemon
 	};




};