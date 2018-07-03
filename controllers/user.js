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

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = function(db){

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const get = (request, response) => {

    //db.user.get()
    // make a query for a user and return that user data
    response.send("User Controller Function");
  }

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  let queryString = 'SELECT * from pokemon;';

    db.user.userModelGetRoot(queryString, (err, result) => {
      if (err) {
        console.error('getRoot Query error:', err.stack);
      } else {
        console.log('getRoot Query result:', result.rows);

        // redirect to home page
        response.render( 'home', {pokemon: result.rows} );
      }
    });
  }

  const registrationForm = (request, response) => {
    response.render('registrationForm');
  }

  const registerUser = (request, response) => {
    let newUserName =  request.body['userName'];
    let hashedNewUserPassword = sha256(request.body['password']);
    let newUserEmail =  request.body['email'];
    response.cookie('regUser', newUserName);

    let queryString = `INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3)`
    let values = [newUserName, hashedNewUserPassword, newUserEmail];

    db.user.userModelRegisterUser(queryString, values, (err, result) => {
      if(err) {
        console.log('QUERY ERROR IN REGISTERING NEW USER', err.stack);
      } else {
        console.log('QUERY RESULT FOR REGISTERING NEW USER', result);
        response.send('New User Created');
      }
    })
  }

  const userLoginPage = (request, response) => {
    response.render('userLoginPage');
  }

  const logUserIn = (request, response) => {
    const SALT = "bananas are delicious";
    let currentSessionCookie = sha256(user_id + 'logged_in' + SALT);
    response.cookie('logged_in', currentSessionCookie);

    let loginUserName = request.body['loginUserName'];
    let hashedLoginUserPassword = sha256(request.body['loginPassword']);

    let queryString = `SELECT user_name, password FROM users`;
    db.user.userModelLogUserIn(queryString, (err, result) => {
      if(err){
        console.log('QUERY ERROR IN RETRIEVING USER_NAME & PW', err.result);
      } else {
        console.log('QUERY RESULT FOR USER_NAME & PW FROM DATABASE', result);
        // console.log('QUERY RESULT FOR USER_NAME & PW FROM DATABASE', result.rows[0].password);
        // console.log('password entered during login. NOT FROM DATABASE ' + hashedLoginUserPassword);
        // console.log('QUERY RESULT FOR USER_NAME & PW FROM DATABASE', result.rows[0].user_name);
        // console.log('username entered during login. NOT FROM DATABASE ' +loginUserName);
        let dbUserName = result.rows[0].user_name;
        let dbPassword = result.rows[0].password;

        if ((loginUserName === dbUserName) && (hashedLoginUserPassword === dbPassword)) {
            response.redirect('/pokemon/user/user_home_page');
           }
           else if ((loginUserName != dbUserName) && (hashedLoginUserPassword === dbPassword)) {
            response.send('Enter a valid User Name');
           }
           else if ((loginUserName === dbUserName) && (hashedLoginUserPassword != dbPassword)) {
            response.send('Enter a valid Password');
           }
           else if ((loginUserName != dbUserName) && (hashedLoginUserPassword != dbPassword)) {
            response.send('Enter a valid User Name and Password');      
           }
           else if (!loginUserName && !hashedLoginUserPassword) {
            response.send('Enter your User Name and Password');
           }
      }
    })
  }

  const userHomePage = (request, response) => {
    let queryString = `SELECT user_name FROM users`;
    db.user.userModelUserHomePage(queryString, (err, result) => {
      if(err){
        console.log('QUERY ERROR IN RETRIEVING USER_NAME', err.result);
      } else {
        console.log('QUERY RESULT FOR USER_NAME FROM DATABASE', result.rows[0].user_name);
        let context = {
          user: result.rows[0]
        }
          response.render('userHomePage', context);
    }
    })
  }

  return {
    get: get,
    getRoot: getRoot,
    registrationForm: registrationForm,
    registerUser: registerUser,
    userLoginPage: userLoginPage,
    logUserIn: logUserIn,
    userHomePage: userHomePage

  };
}

//these functions are to be exported to routes file
//from the routes file, the routes will be exported to index.js