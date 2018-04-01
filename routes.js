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

module.exports = (app) => {
    app.get('/users/new', user.newForm);
    app.post('/users', user.create);
    app.get('/users/login', user.loginForm);
    app.post('/users/login', user.login);
    app.post('/users/logout', user.logout);

    app.get('/pokemons/new', pokemon.newForm);
    app.post('/pokemons', pokemon.create);
    app.get('/pokemons/:id', pokemon.show);
    app.get('/pokemons/:id/edit', pokemon.updateForm);
    app.put('/pokemons/:id', pokemon.update);
    app.delete('/pokemons/:id', pokemon.delete);
};