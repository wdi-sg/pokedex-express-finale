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

module.exports = (app, db) => {
    /*
     *  =========================================
     *  Users
     *  =========================================
     */
    // CRUD users
    app.get('/users/new', users.newForm);
    app.post('/users', users.create(db));

    // Authentication
    app.post('/users/logout', users.logout);
    app.get('/users/login', users.loginForm);
    app.post('/users/login', users.login(db));

    /*
     *  =========================================
     *  Pokemons
     *  =========================================
     */
    // CRUD pokemons
    // app.get('/pokemons/:id/edit', pokemons.updateForm);
    // app.put('/pokemons/:id', pokemons.update(db));
    // app.get('/pokemon/new', pokemons.createForm);
    // app.post('/pokemons', pokemons.create(db));
    // app.get('/pokemons/:id', pokemons.get(db));
};