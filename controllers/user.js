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
};

const create = (allModels) => {
    return (request, response) => {
        //create new user entry in database
        allModels.user.create(request.body, (error, queryResult) => {

            if (error) {
                console.error('error ??? ', error);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');

                // drop cookies to indicate user's logged in status and username
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
            } else {
                console.log('User could not be created');
                response.sendStatus(500);
            }

            //redirect to homepage after creation
            response.redirect('/');
        });
    };
};

const loginForm = (request, response) => {
    if (request.cookies['loggedIn'] === 'true') {
        response.redirect('/');
    } else {
        response.render('user/login');
    }
};

const login = (allModels) => {
    return (request, response) => {
        allModels.user.login(request.body, (error, queryResult) => {
            if (queryResult) {
                let userName = queryResult.rows[0].name;
                response.cookie('loggedIn', true);
                response.cookie('username', userName);
                response.redirect('/');
            } else {
                response.redirect('/users/login');
            }
        });
    };
};

const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.redirect(301, '/');
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