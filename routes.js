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

  const user = require('./controllers/user')(db);
  const pokemons = require('./controllers/pokemon')(db);

  // Pokemon routes
  app.get('/', pokemons.getRoot);

  app.get('/pokemon/:id', pokemons.getPokemon);

  app.get('/pokemon/new', pokemons.newForm);

  app.post('/pokemon', pokemons.postPokemon);

  app.get('/pokemon/:id/edit', pokemons.editForm);

  app.put('/pokemon/:id', pokemons.putPokemon);

  app.get('/pokemon/:id/delete', pokemons.deleteForm);

  app.delete('/pokemon/:id', pokemons.deletePokemon);


  // User routes
  app.get('/users/list', user.getUserList);

  app.get('/users/new', user.newForm);

  app.post('/users/new', user.postUser);

  app.get('/users/login', user.login);

  app.post('/users/login', user.verifyUser);

  app.get('/users/logout', user.logout);
};
