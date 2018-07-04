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

  const users = require('../models/user.js')(db)
  
  const get = (request, response) => {
    // make a query for a user and return that user data
    response.send("WEIRD");
  };

  const newForm = (request, response) => {
    response.render('./user/new.jsx')
  }

  const postForm = (request, response) => {

    let email = request.body.email
    let password_hash = request.body.password
   

    users.example(email, password_hash, (error, result) => {
      if (error) {
      console.log('query error:', error.stack); 
      } 
      else {
      console.log('query result:', result);

        // redirect to home page
        response.send('noice!');
      }
    

    })

  };

  return {
    
    get: get,
    newForm: newForm,
    postForm:postForm

  };
}
