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
  const pokemons = require('./controllers/pokemon')(db);

  // users
  app.get('/users/new', users.newUserForm);
  app.post('/users/new', users.create);
  app.get('/users/login', users.loginPage);
  app.post('/users/login', users.loginData);
  app.delete('/users/logout', users.logout);

  // pokemon
  app.get('/pokemon', pokemons.showAllPokemon);
  app.get('/pokemon/new', pokemons.createForm);
  app.post('/pokemon/new', pokemons.create);
  app.get('/pokemon/:id', pokemons.get);
  app.get('/pokemon/:id/edit', pokemons.editForm);
  app.put('/pokemon/:id/edit', pokemons.editData);
  app.delete('/pokemon/:id/delete', pokemons.deleteData);
};
