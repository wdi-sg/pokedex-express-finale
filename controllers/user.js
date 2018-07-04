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

module.exports = function(db){

  const SALT = 'delon is awesome';
  const sha256 = require('js-sha256');
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const getUserList = (request, response) => {

    let userId = parseInt(request.cookies['user_id']);

    db.user.get(userId, (err, result) => {

      if (err) {
        console.log('query error:', err.stack);
      } 
      else {
        response.render('./user/user_list', {pokemon: result.rows});
      }
    });
  };


  const newForm = (request, response) => {
    response.render('/user/Register');
  };


  const postUser = (request, response) => {

    let body = request.body;
    let password_hash = sha256(body.password);

    db.user.create(body, password_hash, (err, result) => {

      if(err) {
        response.send('db query error: ' + err.message);
      }
      else {
        let user_id = result.rows[0].id;
        let currentSessionCookie = sha256(user_id + 'logged_in' + SALT);

        // Tag cookie to logged in user
        response.cookie('logged_in', currentSessionCookie);
        response.cookie('user_id', user_id);
        response.redirect('/users/list');
      }
    });
  };


// ** Login and Logout **

  const login = (request, response) => {
    response.render('./user/Login');
  };


  const verifyUser = (request, response) => {

    let body = request.body;

    db.user.verify(body, (err, result) => {
      let queryRows;

      if(err) {
        response.send('db query error: ' + err.message); // error check for query from db
      }
      else {
        queryRows = result.rows;
        console.log(queryRows);
      }

      if(queryRows.length < 1){
        response.send(401);   // error check for email match; user not created.
      }
      else {
        let db_password = queryRows[0].password_hash;

        let request_password = sha256(body['password'])

        if(db_password === request_password) {

          let currentSessionCookie = sha256(queryRows[0].id + 'logged_in' + SALT);

          // Tag cookie to logged in user
          response.cookie('logged_in', currentSessionCookie);  
          response.cookie('user_id', queryRows[0].id);

          // response.send('Welcome ' + queryRows[0].email);
          response.redirect('/users/list');
        }
        else {
          response.status(401);
          response.send('Wrong password!');
        };
      };
    });
  };

  const logout = (request, response) => {
    response.clearCookie('user_id');
    response.clearCookie('logged_in');
    response.send('You are logged out');
  };


  return {
    getUserList,
    newForm,
    postUser,
    login,
    verifyUser,
    logout
  };
};
