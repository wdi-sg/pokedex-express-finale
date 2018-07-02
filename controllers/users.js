const sha256 = require('js-sha256')
const SALT = 'Angkiki is Very Handsome';

module.exports = function(db){

  const newUser = (req, res) => {
    let userIsLoggedIn = req.cookies['loginCookie'];
    console.log(userIsLoggedIn);
    if (userIsLoggedIn) {
        // if user is logged in, he should not be able to visit the new user page
        res.redirect('/');
    } else {
        res.render('application', {page: 'newUser'});
    }
  };

  const createUser = (req, res) => {
    let hashedPassword = sha256(req.body.password);
    let name = req.body.name;
    let email = req.body.email;

    db.user.createUser(name, email, hashedPassword, (err, queryResult) => {
      if (err) {
        console.error('Query Error:', err.stack);
      } else {
        console.log('Query Result:', queryResult);
        res.redirect('/');
      }
    });
  };

  const newUserSession = (req, res) => {
    let userIsLoggedIn = req.cookies['loginCookie'];

    if (userIsLoggedIn) {
        // if user is logged in, he should not be able to visit the login page
        res.redirect('/');
    } else {
        res.render('application', {page: 'login'});
    }
  };

  const loginUser = (req, res) => {
    let email = req.body.email;

    db.user.loginUser(email, (err, queryResult) => {
      if (err) {
          // no such email
          console.error('NO SUCH EMAIL', err.stack);
          res.redirect('/users/login');
      } else {
          let hashedPassword = sha256(req.body.password);
          let userPassword = queryResult.rows[0].password;

          if (hashedPassword === userPassword) {
              // password matches, log user in
              let userId = queryResult.rows[0].id;
              let loginCookie = sha256(userId + SALT);

              res.cookie('loginCookie', loginCookie);
              res.cookie('userId', userId);

              res.redirect('/');
          } else {
              // password doesnt match
              console.log('PASSWORD DOESNT MATCH');
              res.redirect('/users/login');
          }
      }
    });
  };

  const logoutUser = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('loginCookie');

    res.redirect('/');
  };

  return {
    newUser: newUser,
    createUser: createUser,
    newUserSession: newUserSession,
    loginUser: loginUser,
    logoutUser: logoutUser
  };
};
