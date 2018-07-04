/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */
const pokemons = require('./controllers/pokemon');
const users = require('./controllers/user');

module.exports = (app, allModels) => {
    /*
     *  =========================================
     *  Users
     *  =========================================
     */
    // CRUD users
    app.get('/users/new', users.newForm);
    app.post('/users', users.create(allModels));

    // Authentication
    app.delete('/users/logout', users.logout);
    app.get('/users/login', users.loginForm);
    app.post('/users/login', users.login(allModels));

    /*
     *  =========================================
     *  Pokemons
     *  =========================================
     */
    // CRUD pokemons
    app.get('/pokemons/:id/edit', pokemons.updateForm(allModels));
    app.put('/pokemons/:id', pokemons.update(allModels));
    app.get('/pokemons/new', pokemons.createForm(allModels));
    app.post('/pokemons', pokemons.create(allModels));
    app.get('/pokemons/:id', pokemons.get(allModels));
    app.delete('/pokemons/:id', pokemons.deletePokemon(allModels));
};