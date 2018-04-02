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
// form to create user
const newForm = (request, response) => {
    response.render('user/new');
};

// create user function
const create = (db) => {
    return (request, response) => {
        // taking user input and saving into db
        db.user.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting user', error);
                response.sendStatus(500);
            };
            // if a valid row number is issued by db, user can be created
            if (queryResult.duplicate === true) {
                response.render('user/new', {duplicateEmail: true});
            } else {
                response.cookie('loggedIn', true);
                response.redirect('/');
            }
        });
    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.redirect('/');
};

// form to login
const loginForm = (request, response) => {
    response.render('user/login');
};

// login function
const login = (db) => {
    return (request, response) => {
        // taking user input
        db.user.login(request.body, (error, queryResult) => {
            // if login information do not tally with db
            if(queryResult.status === false) {
                response.render('user/login', {invalidUser: true});
            // login is successful
            } else {
                response.cookie('loggedIn', true);
                response.redirect('/');
            };
        });
    };
};
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
};