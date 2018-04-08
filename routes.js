const users = require("./controllers/user");
const alerts = require("./controllers/alert");
const crypto = require("./controllers/crypto");
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// production
// 196833977347198
// b311c700917109efe256e9d0e9c8195f

// development
// 256464778050784
// cfea98d681b24e97f6afbfddf47a7baf
passport.use(new Strategy({
  clientID: "196833977347198" || process.env.CLIENT_ID,
  clientSecret: "b311c700917109efe256e9d0e9c8195f" || process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/facebook/return',
  profileFields: ['id', 'first_name', 'email', 'cover']
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  console.log("serialize", user.id);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  console.log("de-serialize", obj.id);
  cb(null, obj);
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/users/login');
}

module.exports = (app, db, passport) => {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function(email, password, callback) {
    db.pool.query(`select id, name, email, password, is_admin from users where email='${email}';`, (err ,res) => {
      if (err) console.error("error fetching user data", err.stack)
      console.log("row count", res.rowCount);
      if (res.rowCount === 1) {
        bcrypt.compare(password, res.rows[0].password, (err, hashResult) => {
          if (hashResult) {
            // req.flash('success_msg', 'login successful');
            let user = {
              id: res.rows[0].id,
              name: res.rows[0].name,
              email: res.rows[0].email,
              is_admin: res.rows[0].is_admin
            }
            callback(null, user);
          } else {
            callback(null, false, {message: "login unsuccessful"}) // password incorrect
          }
        })
      } else {
        callback(null, false, {message: "login unsuccessful"}) // email not found
      }
    })
  }));

// USERS
app.get('/users/create', users.createForm);
app.post("/users/create", users.create(db));
app.get("/users/login", users.loginForm);
app.post("/users/login", passport.authenticate('local', {successRedirect : '/', failureRedirect: '/users/login', failureFlash: true}));
app.get("/users/telegram", ensureAuthenticated, users.getTelegram);
app.get("/users/logout", users.logout);
app.get("/users/updateTelegram", ensureAuthenticated, users.updateTelegram(db));
app.post("/users/checkEmail", users.checkEmail(db));


// ALERTS
app.get("/alerts/create", ensureAuthenticated, alerts.createForm);
app.post("/alerts/create", ensureAuthenticated, alerts.create(db));
app.get("/alerts/edit/:id", ensureAuthenticated, alerts.editForm(db));
app.put("/alerts/edit/:id", ensureAuthenticated, alerts.edit(db));
app.delete("/alerts/delete/:id", ensureAuthenticated, alerts.remove(db));
app.get("/alerts/crypto", alerts.cryptoForm);
app.get("/alerts/:id", ensureAuthenticated, alerts.getAlert(db));

// CRYPTO
app.post("/crypto/fetchTickers", crypto.fetchTickers);
app.post("/crypto/fetchTicker", crypto.fetchTicker);

// Define facebook routes.
app.get('/login/facebook',
passport.authenticate('facebook'));

app.get('/login/facebook/return',
passport.authenticate('facebook', { failureRedirect: '/users/login' }),
users.fbReturn(db, passport));

// Root GET request (it doesn't belong in any controller file)
app.get('/', (req, res) => {
  // console.log("session data", (req.session.authenticated));
  // if user data is available then user is logged in
  // console.log("REQUEST data", req.user);
  let isAuthenticated = req.isAuthenticated()
  console.log("authenticated", isAuthenticated);
  if (req.user != null && !isNaN(req.user.id)) {
    db.pool.query(`select id, name, description, type, TO_CHAR(alert_time, 'DY, DD MON at HH:MI AM') as display_time, alert_time from alerts where user_id=${req.user.id} and is_expired='FALSE' order by alert_time;`, (err, queryRes) => {
      if (err) console.error("unable to get user alerts", err.stack);
      // console.log(queryRes.rows);
      res.render("home", {alerts: queryRes.rows, isAuthenticated });
    })
  } else {
    res.render("home");
  }

});

// Catch all unmatched requests and return 404 not found page
app.get('*', (req, res) => {
  res.status(404).send("<h1>OUT OF THE WORLD</h1>");
})
};
