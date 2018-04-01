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
	app.get('/users/login',userController.login);
	app.get('/users/logout',userController.logout);

	app.post('/pokemon/new',pokemonController.newPokemon);
	app.post('/pokemon/pin',pokemonController.pinPokemon);
	app.delete('/pokemon/pin/remove',pokemonController.unPinPokemon);


};

// select users.id as user_id,users.username as username, user_pin_pokemon.pokemon_id as pinned_pokemon_id, pokemons.name as pinned_pokemon_name from users 
// 		inner join user_pin_pokemon on users.id=user_pin_pokemon.user_id
// 			inner join pokemons on pokemons.id =user_pin_pokemon.pokemon_id;
		
// 		