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
        db.query(`insert into users (name, email, password, created_at, updated_at) values ('${user.name}', '${user.email}', '${hash}', now(), now()) returning id`, (err, res) => {
          if (err) console.error("unable to create user in db", err.stack);
          callback(err, res);
        })
      });
    },

    getUserByEmail: (email, callback) => {
      db.query(`select id, name, email, password, fb_id, is_admin from users where email='${email}'`, (err, res) => {
        if (err) {
          console.error("unable to retrive user via email:", err.stack)
        }
        let user;
        if (res.rowCount > 0) {
          user = {
            id: res.rows[0].id,
            name: res.rows[0].name,
            email: res.rows[0].email,
            password: res.rows[0].password,
            fb_id: res.rows[0].fb_id,
            is_admin: res.rows[0].isAdmin
          }
        }
        callback(user);
      })
    },
    updateTelegram: (id, callback) => {
      db.query(`select telegram_id from users where id=${id}`, (err, res) => {
        if (err) console.error("telegram link error", err.stack);
        let telegram_id;
        if (res.rowCount > 0 ) {
          telegram_id = res.rows[0].telegram_id;
        }
        callback(telegram_id);
      })
    },

    checkEmail: (email, callback) => {
      db.query(`select 1 from users where email='${email}'`,
      (err, res) => {
        let isAvai = false;
        if (err) {
          console.error("error checking email", err.stack);
        } else {
          if (res.rowCount == 0) {
            isAvai = true;
          }
          // console.log("model ans", isAvai);
          callback(isAvai);
        }
      })
    }
  }
}
