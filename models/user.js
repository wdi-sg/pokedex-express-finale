/**
* User model functions.
*
* Any time a database SQL query needs to be executed
* relating to a user (be it C, R, U, D, or Login),
* one or more of the functions here should be called.
*
* NOTE: You can add authentication logic in this model.
*
* Export all functions as a module using `module.exports`,
* to be imported (using `require(...)`) in `db.js`.
*/
const bcrypt = require('bcrypt');

/**
* ===========================================
* Export model functions as a module
* ===========================================
*/

module.exports = (db) => {
  return {
    create: (user, callback) => {
      bcrypt.hash(user.password, 1, (err, hash) => {
        if (err) console.error('hash error', err);
        db.query(`insert into users (name, email, password) values ('${user.name}', '${user.email}', '${hash}') returning id`, (err, res) => {
          if (err) console.error("unable to create user in db", err.stack);
          callback(res);
        })
      });
    },
    login: (user, callback) => {
      db.query(`select id, name, password from users where email='${user.email}'`, (err, res) => {
        if (err) console.error('unable to retrive user pw from db');
        bcrypt.compare(user.password, res.rows[0].password, (err, hashResult) => {
          callback([hashResult, res.rows[0].id, res.rows[0].name]);
        })
      });
    }
  }
}
