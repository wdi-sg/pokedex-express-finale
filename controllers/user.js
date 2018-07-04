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

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */



   // requires js-sha256 and declare salt
  const sha256 = require('js-sha256');
  const salt = "cuckoobird rocks";


  //render home page
  const home = (req, res) => {

    res.render('./user/home', {cookies: req.cookies});

  }



  // checks if email and password is correct
  const get = (request, response) => {

    // make a query for a user and return that user data
    let password_hash = sha256(request.query.password);
    db.user.checkLogin(request.query.email, password_hash, (err, result) => {
      if (err) {

        response.send("db error: " + err);

      } else {

        if (result.rows.length > 0) {

          response.cookie('user_id', result.rows[0].id);
          response.cookie('session', sha256(result.rows[0].id + 'login' + salt));
          response.send("Welcome back, " + result.rows[0].name);

        } else {

          response.redirect('/users/login');

          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          // HOW TO DISPLAY IN APP MESSAGE

          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        }

      }
    })
  };



  // user registration
  const newForm = (req, res) => {
    res.render("./user/new");
  }



  // creates new user
  const createUser = (req, res) => {

    // checks if email already has an account
    db.user.checkEmail(req.body.email, (err, result) => {
      if (err) {
        
        res.send("db error: " + err);
      
      } else {

        if (result.rows.length > 0) {

          res.send(req.body.email + " has already registered an account!");

        } else {

          // hash password and creates user if email does not have an account
          let password_hash = sha256(req.body.password);
          db.user.createUser(req.body.name, req.body.email, password_hash, (err1, result1) => {

            if (err1) {

              res.send("query error: " + err1);

            } else {

              // creates cookie and salted cookie
              res.cookie('user_id', result1.rows[0].id);
              res.cookie('session', sha256(result1.rows[0].id + 'login' + salt));
              res.send("Welcome to Actify, " + req.body.name);

            }
          });
        }
      }
    }); 
  }



  // log in
  const loginForm = (req, res) => {

    res.render('./user/login');

  }



  // log out
  const logout = (req, res) => {

    res.clearCookie('user_id');
    // res.clearCookie('logged_in');
    res.clearCookie('session');
    res.redirect('/users/login');

  }



  // just testing AJAX with this
  const hello = (req, res) => {

    const foo = {
      "hello" : "testing",
      "byebye" : "here"
    }

    res.send(foo);

  }



  return {
    get: get,
    newForm: newForm,
    createUser: createUser,
    loginForm: loginForm,
    logout: logout,
    home: home,
    
    // testing AJAX with this
    hello: hello
  };
}
