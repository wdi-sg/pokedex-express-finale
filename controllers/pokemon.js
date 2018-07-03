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

module.exports = function(db) {
	const get = (request, response) => {
		response.send("Pokemon Controller Function");
	}

	const getNew = (request, response) => {
	  response.render('new');
	}

	const getPokemon = (request, response) => {
	  let id = request.params['id'];
	  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
	  db.pokemon.pokemonModelGetPokemon(queryString, (err, result) => {
	    if (err) {
	      console.error('getNew Query error:', err.stack);
	    } else {
	      console.log('getPokemon Query result:', result.rows[0]);

	      // redirect to home page
	      response.render( 'Pokemonpage', {pokemon: result.rows[0]} );
	    }
	  });
	}	

	const postPokemon = (request, response) => {
	  let params = request.body;
	  
	  const queryString = 'INSERT INTO pokemon(id, num, name, img, height, weight) VALUES($1, $2, $3, $4, $5, $6);';
	  const values = [params.id, params.num, params.name, params.img, params.height, params.weight];

	  db.pokemon.pokemonModelPostPokemon(queryString, values, (err, result) => {
	    if (err) {
	      console.log('postPokemon query error:', err.stack);
	    } else {
	      console.log('query result:', result);

	      // redirect to home page
	      response.redirect('/');
	    }
	  });
	}

	const editPokemonForm = (request, response) => {
	  let id = request.params['id'];
	  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
	  db.pokemon.pokemonModelEditPokemonForm(queryString, (err, result) => {
	    if (err) {
	      console.error('editPokemon Query error:', err.stack);
	    } else {
	      console.log('Query result:', result);

	      // redirect to home page
	      response.render( 'edit', {pokemon: result.rows[0]} );
	    }
	  });
	}

	const updatePokemon = (request, response) => {
	  let id = request.params['id'];
	  let pokemon = request.body;
	  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
	  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
	  console.log(queryString);
	  db.pokemon.pokemonModelUpdatePokemon(queryString, values, (err, result) => {
	    if (err) {
	      console.error('updatePokemon Query error:', err.stack);
	    } else {
	      console.log('Query result:', result);

	      // redirect to home page
	      response.redirect('/');
	    }
	  });
	}

	const deletePokemonForm = (request, response) => {
	  let deletePokemonId = parseInt(request.params['id']);
	  console.log('before query string ' + deletePokemonId);
	  const queryString = `SELECT * FROM pokemon WHERE id = ${deletePokemonId}`;
	  db.pokemon.pokemonModelDeletePokemonForm(queryString, (err, result) => {
	    if(err) {
	      console.error('deletePokemonFORM Query error', err.stack);
	    } else {
	      console.log('Query result:', result.rows[0])
	      let content = {
	      pokedex : result.rows[0]
	    }  

	      response.render('DeleteForm', content)
	    }

	  })
	   //response.send("COMPLETE ME");
	}

	const deletePokemon = (request, response) => {
	  let pokemonToDelete = parseInt(request.params['id']);
	  const queryString = 'DELETE FROM pokemon WHERE id = '+pokemonToDelete

	  db.pokemon.pokemonModelDeletePokemon(queryString, (err, result) => {
	    if(err) {
	      console.log('deletePokemon Query Query error', err.stack)
	    } else {
	      console.log('Query result: ', result)
	      response.send('Pokemon Deleted');
	    }
	  }) 
	}

	return {
		get: get,
		getNew: getNew,
		getPokemon: getPokemon,
		postPokemon: postPokemon,
		editPokemonForm: editPokemonForm,
		updatePokemon: updatePokemon,
		deletePokemonForm: deletePokemonForm,
		deletePokemon: deletePokemon
	};
}