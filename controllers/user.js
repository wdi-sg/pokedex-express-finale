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
const db = require('../db.js');



module.exports = {
  newForm: (req, res) => {
    res.render('user/new');
    console.log("INSIDE USERS CONTROLLER");
  },
  create: (req, res) => {
    let userDetails = req.body;
    db.users.new(userDetails);
    
  }
};
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
