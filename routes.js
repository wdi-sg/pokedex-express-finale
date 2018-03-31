/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */
const users = require('./controllers/user')
const pokemons = require('./controllers/pokemon')

module.exports = (app, db) => {
  // Users CRUD
  app.get('/users/new', users.newForm);
  app.post('/users/new', users.create(db));

  app.get('/users/login', users.loginForm);
  app.post('/users/login', users.login(db));
  app.post('/users/logout', users.logout);

  // Pokemons CRUD
  app.get('/pokemons/:id/edit', pokemons.updateForm(db));
  app.put('/pokemons/:id/edit', pokemons.update(db));
  app.get('/pokemons/new', pokemons.newForm);
  app.post('/pokemons/new', pokemons.create(db));
  app.get('/pokemons/:id', pokemons.details(db));
}