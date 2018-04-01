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
function newForm (request, response) {
    // show the form for registering a new user
    response.render('user/new');
}

function create (db) {
    return function (request, response) {
        // create the user, then redirect to '/'
    }
}

function logout (request, response) {
    // clear the cookies, then redirect to 301, '/'

}

function loginForm (request, response) {
    response.render('user/login');
}

function login (request, response) {
    // call on the models/user.js login function too log the user in here
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
    newForm: newForm,
    create: create,
    login: login,
    loginForm: loginForm,
    logout: logout
}
