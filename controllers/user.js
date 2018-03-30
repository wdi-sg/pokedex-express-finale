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
module.exports = {
  newForm: (req, res) => {
    let context = {


    };
    res.render('user/new', context);
    console.log("INSIDE USERS CONTROLLER");
  },
  create: (req, res) => {
    let userDetails = req.body;
    res.send(userDetails);
  }
};
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
