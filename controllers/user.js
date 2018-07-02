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
  const get = (request, response) => {
    // make a query for a user and return that user data
    response.send("WEIRD");
  };

  const newForm = (request, response) => {
    response.render('user/new');
    // response.send('hi');
  };

  return {
    get: get,
    newForm: newForm
  };
}
