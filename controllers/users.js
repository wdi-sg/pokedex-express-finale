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

  const get = (request, response) => {
    // make a query for a user and return that user data
    response.send("User");
  };

  const userForm = (request, response) => {
    response.render('newUser');
  }

  const create = ( request, response ) => {


    // create a user
    let password_hash = sha256( request.body.password );

    let queryText = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';

    const values = [request.body.email, password_hash];

    db.user.userCreate( request.body.email, password_hash, (err, queryResult) => {
        if( err ){
            response.send('db error: '+ err.message)
        }else{
            let user_id = queryResult.rows[0].id;

            var SALT = Math.random();

            let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );


            response.cookie('session', currentSessionCookie);

            response.cookie('logged_in', 'true');
            response.cookie('user_id', user_id);

            response.send( "created user with id: " + user_id )
        }

    });




  };

  return {
    userForm : userForm,
    get: get,
    create: create
  };
