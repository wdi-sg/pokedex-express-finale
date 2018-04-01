/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

const db = require('../db');
const bcrypt = require('bcrypt');
const config = require('../config');
const user = require('../models/user');

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
function newForm (request, response) {
    // show the form for registering a new user
    response.render('user/new');
}

async function create (request, response) {
    // create the user, then redirect to '/'
    await user.create({name: request.body.name, email: request.body.email, password: request.body.password})
    response.cookie('loggedIn', 'true');
    response.cookie('name', request.body.name);
    response.redirect('/');
}

function logout (request, response) {
    // clear the cookies, then redirect to 301, '/'
    response.clearCookie('loggedIn');
    response.clearCookie('name');
    response.redirect('/');
}

function loginForm (request, response) {
    response.render('user/login');
}

async function login (request, response) {
    // call on the models/user.js login function too log the user in here
    let userObj = {
        name: request.body.name,
        password: request.body.password
    };
    let authenticate = await user.loginByName(userObj);
    if (authenticate) {
        response.cookie('loggedIn', 'true');
        response.cookie('name', userObj.name);
        response.redirect('/');
    } else {
        response.redirect('/users/login');
    }
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
