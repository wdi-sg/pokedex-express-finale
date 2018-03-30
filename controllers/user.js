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
const createForm = (req, res) => {
  res.render("user/create");
};

const create = (db) => {
  return (req, res) => {
    db.users.create(req.body, (err, queryRes) => {
      if (err) {
        console.log(err.detail);
        res.send("unable to create user");
      } else {
        // inject cookie
        res.cookie("id", queryRes.rows[0].id);
        res.cookie("name", req.body.name);
        res.redirect("/");
      }

    });
  }
}

const loginForm = (req, res) => {
  // check if user is already logged in
  if (req.cookies["id"]) {
    res.redirect("/");
  } else {
    res.render("user/login");
  }
}

const login = (db) => {
  return (req, res) => {
    db.users.login(req.body, (queryRes) => {
      if (queryRes[0]) {
        // inject cookie
        res.cookie("id", queryRes[1]);
        res.cookie("name", queryRes[2]);
        res.redirect('/');
      } else {
        res.render("user/login");
      }
    });
  }
}

const logout = (req, res) => {
  res.clearCookie('id');
  res.clearCookie('name');
  res.redirect('/');
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
   logout
 }
