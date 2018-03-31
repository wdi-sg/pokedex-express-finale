/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const newForm = (request, response) => {
  response.render('user/new');
}

const create = (db) => {
  return (request, response) => {
    db.userDB.create(request.body, (error, queryResult) => {
      if (error) {
        response.end('Oops, something happened! Please try again');
      } else {
        response.cookie('loggedIn', true);
        response.cookie('userName', request.body.name);
        response.cookie('userId', queryResult);
        response.redirect('/');
      }
    });
  }
}

const logout = (request, response) => {
  response.clearCookie('loggedIn');
  response.redirect(301, '/');
}

const loginForm = (request, response) => {
  response.render('user/login');
}
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  newForm,
  create,
  logout,
  loginForm
}