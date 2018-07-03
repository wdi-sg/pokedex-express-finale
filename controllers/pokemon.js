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

	const getRoot = (request, response) => {

		db.pokemon.root((err, result) => { 
		    if(err) {
		      console.error('Query error:', err.stack);
		    } 
		    else {
		      console.log('Query result:', result);
		      response.render('./pokemon/Home', {pokemon: result.rows} );
		    }
		});
	};


	const getPokemon = (request, response) => {

		db.pokemon.get(request.params.id, (err, result) => {
			if(err) {
				console.error('Query error:', err.stack);
				response.sendStatus(500);
			}
			else {
				console.log('Query result:', result);
				response.render('./pokemon/Pokemon', {pokemon: result.rows[0] });
			}	
		});
	};

	const newForm = (request, response) => {
	  response.render('./pokemon/New');
	};

	const postPokemon = (request, response) => {
	  let body = request.body;
	  let userId = parseInt(request.cookies['user_id']);

	  db.pokemon.create(body, userId, (err, result) => {	
	    if (err) {
	      console.log('Query error:', err.stack);
	      response.sendStatus(500);
	    } 
	    else {
	      console.log('Query result:', result);
	      response.redirect('/users/list');  // redirect to home page
	    }
	  });
	};

	const editForm = (request, response) => {
	  let id = request.params['id'];
	  
	  db.pokemon.edit(id, (err, result) => {
	    if (err) {
	      console.error('Query error:', err.stack);
	      response.sendStatus(500);
	    } 
	    else {
	      console.log('Query result:', result);
	      response.render('./pokemon/Edit', {pokemon: result.rows[0]} );
	    }
	  });
	};

	const putPokemon = (request, response) => {
	  let id = request.params['id'];
	  let body = request.body;

	  db.pokemon.update(id, body, (err, result) => {
	    if (err) {
	      console.error('Query error:', err.stack);
	      response.sendStatus(500);
	    } 
	    else {
	      console.log('Query result:', result);
	      response.redirect('/');
	    }
	  });
	};

	const deleteForm = (request, response) => {
	  let id  = request.params['id'];

	  db.pokemon.delete(id, (err, result) => {
	    if (err) {
	      console.error('Query error:', err.stack);
	      response.sendStatus(500);
	    } 
	    else {
	      console.log('Query result:', result);
	      response.render('./pokemon/Delete', {pokemon: result.rows[0]} );
	    }
	  });
	};

	const deletePokemon = (request, response) => {
	  let id = request.params['id'];

	  db.pokemon.destory(id, (err, result) => {
	    if (err) {
	      console.log('Query error:', err.stack);
	      response.sendStatus(500);
	    } 
	    else {
	      console.log('Query result:', result);
	      response.redirect('/');
	    }
	  });
	};


	/**
	 * ===========================================
	 * Export controller functions as a module
	 * ===========================================
	 */

	return {
		getRoot,
		getPokemon,
		newForm,
		postPokemon,
		editForm,
		putPokemon,
		deleteForm,
		deletePokemon
	};
};