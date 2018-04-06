/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const bcrypt = require('bcrypt');
 // const { check, validationResult } = require('express-validator/check');

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const createForm = (req, res) => {
  res.render("user/create");
};

const create = (db) => {
  return (req, res) => {

    // Validation
  	req.checkBody('name', 'Name is required').notEmpty();
  	req.checkBody('email', 'Email is required').notEmpty();
  	req.checkBody('email', 'Email is not valid').isEmail();
  	req.checkBody('password', 'Password is required').notEmpty();
  	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    console.log(errors);

    if (errors) {
      res.render("user/create", {errors});
    } else {
      db.users.create(req.body, (err, queryRes) => {
        if (err) {
          // manually assign flash message as flash will only read on next req (not re-render)
          res.locals.error_msg = "Email has been registered before";
          console.log(err.detail);
          let user = {
            name: req.body.name,
            email: req.body.email
          };
          res.render("user/create", {user});
        } else {
          // inject cookie
          // res.cookie("id", queryRes.rows[0].id);
          // res.cookie("name", req.body.name);
          let user = {
            id: queryRes.rows[0].id,
            name: req.body.name,
            email: req.body.email,
            is_admin: false
          }
          // req.login();
          // req.user = user;
          req.login(user, (err) => {
            console.log("ERROR", err);
          });

          req.flash("success_msg", "registration successful");
          res.redirect("/users/telegram");
        }
      });
    }
  }
}

const loginForm = (req, res) => {
  // check if user is already logged in
  if (req.user == null || req.user === false){
    res.render("user/login");
  } else {
    res.redirect("/");
  }
}

const login = (db) => {
  return (req, res) => {
    db.users.getUserByEmail(req.body.email, (result) => {
      if (result == null) {
        req.flash('error_msg', 'login unsuccessful');
        res.redirect("/users/login");
      } else {
        // inject cookie
        // console.log(result);
        bcrypt.compare(req.body.password, result.password, (err, hashResult) => {
          if (hashResult) {
            req.flash('success_msg', 'login successful');
          } else {
            req.flash('success_msg', 'login unsuccessful');
          }
          res.redirect('/');
        })
        // req.session.authenticated = true;
        // res.cookie("id", queryRes[1]);
        // res.cookie("name", queryRes[2]);
      }
    });
  }
}

const logout = (req, res) => {
  // res.clearCookie('id');
  // res.clearCookie('name');
  req.session.authenticated = false;
  req.logout()
  res.redirect('/');
}

const fbReturn = (db, passport) => {
  return (req, res) => {
    // search if email EXIST
    db.pool.query(`select * from users where email='${req.user._json.email}'`, (err, result) => {
      if (err) console.error("fb fetch email fail", err);
      if (result.rows.length === 0) {
        // register user
        db.pool.query(`insert into users (name, email, created_at, updated_at, fb_id) values ('${req.user._json.first_name}', '${req.user._json.email}', now(), now(), '${req.user._json.id}')`,
      (err, result) => {
        if (err) {
          console.error('fb register error', err);
        } else {
          // req.session.authenticated = true;
        }
        res.redirect('/');
      });

      } else {
        // login user
        // console.log("results", result.rows);
        // req.session.authenticated = true;
        res.redirect('/');
      };
    });
  }
}

const getTelegram = (req, res) => {
  res.render("user/telegram");
}

const updateTelegram = (db) => {
  return (req, res) => {
    // console.log("user id", req.user.id);
    db.users.updateTelegram(req.user.id, (queryRes) => {
      if (queryRes == null) {
        req.flash("error_msg", "telegram not linked");
        res.redirect('/users/telegram');
      } else {
        // successful
        // console.log(queryRes);
        req.flash("error_msg", "telegram account linked");
        res.redirect('/');
      }
    })
  }
}

const checkEmail = (db) => {
  return (req, res) => {
    console.log(req.body.email);
    // email format validation check
    let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email);
    console.log("email", emailValid);
    if (!emailValid) {
      res.send("not valid");
    } else {
      db.users.checkEmail(req.body.email, (queryRes) => {
        res.send(queryRes);
      })
    }
  }
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
 module.exports = {
   createForm,
   create,
   loginForm,
   login,
   logout,
   fbReturn,
   getTelegram,
   updateTelegram,
   checkEmail
 }
