let createControllers = db => {
    const User = require("../models/user")(db);
    const sha256 = require('js-sha256');

    return {
        showCreationForm: (request, response) => {
            response.render('newuserform');
        },

        userCreate: (request, response) => {
            let userInfo = {
                username: request.body.username,
                password: request.body.password,
                passwordHash: sha256(password)
            };
            let errorCallback = (err) => {
                console.log("Error creating user:", err);
                response.status(401);
            }
            let successCallback = (createdUserId) => {
                response.cookie('logged_in', 'true');
                response.cookie('user_id', createdUserId);
                request.flash('success', 'Successfully created account.');
                response.redirect('/');
            }
            User.create(userInfo, errorCallback, successCallback);
        }
    }
}

module.exports = createControllers;