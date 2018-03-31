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
        if (queryResult.duplicate == true) {
          response.render('user/new', { duplicateUser: true });
        } else {
          response.cookie('loggedin', true);
          response.cookie('userid', queryResult.user_id);
          response.redirect('/');
        }
      }
    })
  }
}

const logout = (request, response) => {
  response.clearCookie('loggedin');
  response.clearCookie('userid');
  response.redirect(301, '/');
}

const login = (db) => {
  return (request, response) => {
    db.userDB.login(request.body, (error, queryResult) => {
      if (queryResult.authenticated == false) {
        response.render('user/login', { invalidUser: true });
      } else {
        response.cookie('loggedin', true);
        response.cookie('userid', queryResult.user_id);
        response.redirect('/');
      }
    })
  }
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
  loginForm,
  login
}