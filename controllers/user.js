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

const sha256 = require('js-sha256');

module.exports = function(db){

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newUserForm = (request, response) => {

    response.render('newUser');

  };  

  const create = (request, response) => {

    // create a user
    let password_hash = sha256(request.body.password);
    let email = request.body.email;

    db.users.userCreate(email, password_hash, (error, queryResult) => {

      if (error) {
        response.send('Database error 6: ', err.message);
      } else {
        let user_id = queryResult.rows[0].id;

        response.send('Created user with id: ' + user_id);
      }
    });
  };

  const loginPage = (request, response) => {

    response.render('login');

  };

  const loginData = (request, response) => {

    let email = request.body.email;

    db.users.checkLogin(email, (error, queryResult) => {

      if (error) {
        response.send('Database error 6: ' , error.message);
      } else {
        const queryRows = queryResult.rows;

        if (queryRows.length < 1) {
          response.status(401).send('Wrong email or password. Try again.');
        } else {

          let db_pass_hash = queryRows[0].password;

          let request_pass_hash = sha256(request.body.password);

          if (db_pass_hash === request_pass_hash) {

            response.cookie('logged_in', 'true');
            response.cookie('user_id', queryRows[0].id);

            response.redirect('/pokemon');
          } else {
            response.status(401).send('Wrong email or password. Try again.');
          }
        }
      }

    })


  };

  const logout = (request, response) => {

    response.clearCookie('user_id');
    response.clearCookie('logged_in');
    response.redirect('/users/login');

  };


  return {
    newUserForm : newUserForm,
    create : create,
    loginPage: loginPage,
    loginData : loginData,
    logout : logout
  }


};
