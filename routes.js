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

  app.get('/users', users.get);
  app.get('/users/new', users.newForm);
  app.post('/users/new', users.newForm);
};
