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
//setTimeout(function() {
//  console.log('FROM USER CONTROLLER');
//  console.log(db.pool);
//},1000);


module.exports = {
  newForm: (req, res) => {
    res.render('user/new');
    console.log("INSIDE USERS CONTROLLER");
    //console.log(db.pool);   
  },
  create: (req, res) => {
    let userDetails = req.body;
    let callback = (details) => {
      console.log("INSIDE CALLBACK");
      res.send('User created!');
    };
    db.users.new(userDetails, callback);
    console.log('userDetails: ', userDetails);
  }
};
/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
