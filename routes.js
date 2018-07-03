/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */

module.exports = (app, db) => {

  	const users = require('./controllers/user.js')(db);
  	const pokemon = require('./controllers/pokemon.js')(db);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~Pokemon~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	app.get('/pokemon/:id/edit', pokemon.editPokemonForm);
	app.get('/pokemon/new', pokemon.getNew);
	app.get('/pokemon/:id', pokemon.getPokemon);
	app.get('/pokemon/:id/delete', pokemon.deletePokemonForm);

	app.post('/pokemon', pokemon.postPokemon);

	app.put('/pokemon/:id', pokemon.updatePokemon);

	app.delete('/pokemon/:id', pokemon.deletePokemon);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	app.get('/', users.loginPage);
	app.get('/users/create', users.signUp);

	app.post('/users/new', users.newUser);

	app.post('/users/exist', users.loginCheck);

	/*adding pokemon to specific user*/
	app.get('/mypokelist', users.displayUserPokemon);
	app.post('/pokemon/add/:id', users.addPokemon2User);
};
