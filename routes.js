/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */

const user = require('./controllers/user');
const pokemon = require('./controllers/pokemon');
const session = require('./controllers/session');

module.exports = (app) => {
  app.get('/users/new', user.newForm);
  app.post('/users', user.create);
  app.get('/login', session.new);
  app.post('/login', session.create);
  app.delete('/logout', session.destroy);
  app.get('/pokemons/', pokemon.index);
  app.get('/pokemons/new', pokemon.new);
  app.post('/pokemons', pokemon.create);
  app.get('/pokemons/:id', pokemon.show);
  app.get('/pokemons/:id/edit', pokemon.edit);
  app.put('/pokemons/:id', pokemon.update);
  app.delete('/pokemons/:id', pokemon.destroy);
};
