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

  const users = require('./controllers/users.js')(db);

  app.get('/users', users.get );
  app.get('/pokemon', getRoot);

	app.get('/pokemon/:id/edit', editPokemonForm);
	app.get('/pokemon/new', getNew);
	app.get('/pokemon/:id', getPokemon);
	app.get('/pokemon/:id/delete', deletePokemonForm);

	app.post('/pokemon', postPokemon);

	app.put('/pokemon/:id', updatePokemon);

	app.delete('/pokemon/:id', deletePokemon);

	/* Creating user login and password */
	app.get('/', loginPage);
	app.get('/users/create', signUp);

	app.post('/users/new', newUser);

	app.post('/users/exist', loginCheck);

	/*adding pokemon to specific user*/
	app.get('/mypokelist', displayUserPokemon);
	app.post('/pokemon/add/:id', addPokemon2User);
};
