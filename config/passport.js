const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {

  passport.serializeUser((user, cb) => {
    console.log("serialize", user.id);
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    console.log("de-serialize", obj.id);
    cb(null, obj);
  });

  passport.use(new Strategy({
    clientID: "256464778050784" || process.env.CLIENT_ID,
    clientSecret: "cfea98d681b24e97f6afbfddf47a7baf" || process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'first_name', 'email', 'cover']
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

};
