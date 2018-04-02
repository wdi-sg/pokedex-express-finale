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
const user = require('./controllers/user');

module.exports = (app, db) => {
    /*
    *  =========================================
    *  Users
    *  =========================================
    */
   
    // CRUD users
    app.get('/user/new', user.newForm);
    app.post('/user', user.create(db));

    // Authentication
    app.post('/user/logout', user.logout);
    app.get('/user/login', user.loginForm);
    app.post('/user/login', user.login(db));

    /*
    *  =========================================
    *  Pokemons
    *  =========================================
    */
}