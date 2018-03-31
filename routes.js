/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */

module.exports = function (app,db) {
	const userController=require('./controllers/user')(db);
	const pokemonController=require('./controllers/pokemon')(db);

	
	app.get('/users/new',userController.getNewUserForm);
	app.post('/users/new',userController.submitNewUserForm);
	app.post('/users/login',userController.login);

	app.post('/pokemon/new',pokemonController.newPokemon);


};