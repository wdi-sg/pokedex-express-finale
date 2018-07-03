const sha256 = require('js-sha256');
const db = require('../db.js')

module.exports = function(db){

    const newUser = (req, res) => {

        let newUser = req.body;
        newUser.password = sha256(newUser.password);

        db.user.userModel(newUser.email, newUser.password, (err, result) => {
            if (err) {
                res.send('db error: ' + err.message)
            } else {
                let user_id = result.rows[0].id;
                res.cookie('logged_in', 'true');
                res.cookie('user_id', user_id);
                res.send('created new user: ' + user_id)
            }

        });
    };

    const loginPage = (req, res) => {
        res.render('password_home');
    };

    const signUp = (req, res) => {
        res.render('password_registration')
    }

    const loginCheck = (req, res) => {

        let userCheck = req.body
        userCheck.password = sha256(userCheck.password);

        db.user.loginCheck(userCheck.email, (err, queryResult) => {
            if (err) {
                res.send('deb error: ' + err.message);
            } else {
                if (queryResult.rows.length > 0) {
                    if (enterPassHash === queryResult.rows[0].password) {
                        let user_id = queryResult.rows[0].id;
                        res.cookie('logged_in', 'true');
                        res.cookie('user_id', user_id);
                        res.redirect('/pokemon');
                    } else {
                        res.redirect('/');
                    }
                }
            }
        })
    }
     const addPokemon2User = (req, res) => {
        let pokemon_id = req.params.id;
        let user_id = req.cookies['user_id'];
        db.user.addPokemon2User(pokemon_id, user_id, (err, queryResult) => {
            if (err) {
                res.send('deb error: ' + err.message);
            } else {
                res.redirect('/pokemon')
            }

        })
    }

    const displayUserPokemon = (req, res) => {
        let user_id = req.cookies['user_id'];
        db.user.displayUserPokemon.(user_id, (err, queryResult) => {
            if (err) {
                res.send('deb error: ' + err.message);
            } else {
                // console.log(queryResult.rows[0].id)
                console.log(queryResult.rows)
                res.render('mypokelist', { pokemon: queryResult.rows })
            }
        })
    }
    return {
        newUser : newUser,
        loginPage: loginPage,
        signUp: signUp,
        loginCheck : loginCheck,
        addPokemon2User : addPokemon2User,
        displayUserPokemon : displayUserPokemon
}