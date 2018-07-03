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

  	const usersController = require('./controllers/user.js')(db);
  	const pokemonController = require('./controllers/pokemon.js')(db);

  	//const monkey = require('./controllers/user.js');
  	//const users = monkey(db);

  	//requests related to Users
  	app.get('/', usersController.getRoot);
	app.get('/users', usersController.get );
	app.get('/pokemon/user/registrationform', usersController.registrationForm);
	app.post('/pokemon/user/registration', usersController.registerUser);
	app.get('/pokemon/user/login_page', usersController.userLoginPage);
	app.post('/pokemon/user', usersController.logUserIn);
	app.get('/pokemon/user/user_home_page', usersController.userHomePage);


	//requests related to pokemons
	app.get('/users', pokemonController.get);
	app.get('/pokemon/new', pokemonController.getNew);
	app.get('/pokemon/:id', pokemonController.getPokemon);	
	app.post('/pokemon', pokemonController.postPokemon);
	app.get('/pokemon/:id/edit', pokemonController.editPokemonForm);
	app.put('/pokemon/:id', pokemonController.updatePokemon);
	app.get('/pokemon/:id/delete', pokemonController.deletePokemonForm);
	app.delete('/pokemon/:id', pokemonController.deletePokemon);
};


// over here
// require user controller and pokemon controller.
// app.get('/pokemon....', function_name1)   -- function_name1 is from user controller. hence have to requrie the required controller file
// 										  	 -- (A) app.get, the route, will be linked to, or required, at index.js. it'll be 'require' from there
// 										  	 -- for the apps, the routes to be available to be linked, or required, at index.js, they have to be exported -> module.exports
