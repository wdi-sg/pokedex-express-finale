/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const config = {
  user: 'saywan',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'home', {pokemon: result.rows} );
    }
  });
}

const getNew = (request, response) => {
  response.render('new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;
  let userId = request.cookies['user_id'];
  console.log(userId);
  const queryString = 'INSERT INTO pokemon(num, name, img, weight, height, user_id) VALUES($1, $2, $3, $4 ,$5, $6)';
  const values = [params.num, params.name, params.img, params.weight + ' kg', params.height +' m', userId];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemon = (request, response) => {

  const queryString = 'DELETE from pokemon WHERE id =' + request.params.id;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.log('Query error ', err.stack);
    } else {
      // redirect to home page
      response.redirect('/');

    }
  });
}

//Create User
const createForm = (request, response) => {
  response.render('userCreation');
}

const createUser = (request, response) => {

  const queryString = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';
  const values = [request.body.email, sha256(request.body.password)];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      let user_id = result.rows[0].id;

      response.cookie('logged_in', 'true');
      response.cookie('user_id', user_id);
      // redirect to home page
      response.redirect('/');
    }
  });
};

//Login
const loginForm = (request, response) => {
    response.render('login');
};

const userLogin = (request, response) => {

    let queryText = 'SELECT * FROM users WHERE email=$1';

    const values = [request.body.email];

    pool.query(queryText, values, (err, result) => {
        if( err ){
            response.send('db error: '+ err.message)
        }else{

            const queryRows = result.rows;

            if( queryRows.length < 1){
                response.send(401);
            }else{

                let db_pass_hash = queryRows[0].password;

                let request_pass_hash = sha256( request.body.password );

                if( db_pass_hash ===  request_pass_hash ){

                    response.cookie('logged_in', 'true');
                    response.cookie('user_id', queryRows[0].id);
                    response.send("Welcome "+queryRows[0].email);
                }else{
                    response.status(401).send('nope');

                }
            }
        }
    });
};

//Log out
const userLogout = (request, response) => {
  response.clearCookie('user_id');
  response.clearCookie('logged_in');
  response.redirect('/users/login');
};
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);

app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/pokemon/:id', getPokemon);
app.get('/pokemon/:id/delete', deletePokemon);

app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id/delete', deletePokemon);

// TODO: New routes for creating users
app.get('/users/new', createForm);
app.post('/users/new', createUser);

app.get('/users/login', loginForm);
app.post('/users/login', userLogin)

app.get('/users/logout', userLogout);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


