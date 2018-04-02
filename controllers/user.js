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

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
const newForm = (request, response) => {
    response.render('user/new');
};

const create = (db) => {
    return (request, response) => {
        // use user model method `create` to create new user entry in db
        db.user.create(request.body, (error, queryResult) => {
            // queryResult of creation is not useful to us, so we ignore it
            // (console log it to see for yourself)
            // (you can choose to omit it completely from the function parameters)
            if (error) {
                console.error('error getting pokemon:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');

                // drop cookies to indicate user's logged in status and username
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
            } else {
                console.log('User could not be created');
            }

            // redirect to home page after creation
            response.redirect('/');
        });
    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.redirect(301, '/');
};

const loginForm = (request, response) => {
    if (request.cookies['loggedIn'] == true) {
        response.redirect('/');
    } else {
        response.render('user/login');
    }
};

const login = (db) => {
    return (request, response) => {
        // use user model method `login` to create login entry in db
        db.user.login(request.body, (error, queryResult) => {
            if (queryResult) {
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
                response.redirect(301, '/');
            } else {
                response.redirect('/users/login');
            }
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