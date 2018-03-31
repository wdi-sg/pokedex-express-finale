/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */
//const { Client } = require('pg');
//const client = new Client();
//
//client.connect();
//
//module.exports = (pool) => {
//  client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//    console.log(err ? err.stack : res.rows[0].message); // Hello World!
//    client.end();
//  });
//};
const { Pool } = require('pg');
const users = require('./models/user.js');
const pokemons = require('./models/pokemon.js');

const pool = new Pool({
  user: 'stonefruit',
  host: '127.0.0.1',
  database: 'pokemons_development',
  port: 5432
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// callback - checkout a client
pool.connect((err, client, done) => {
  if (err) throw err;
  //console.log("INSIDE DB.JS");
  //console.log(pool);
});

module.exports = {
  pool: pool,
  users: users(pool),
  pokemons: pokemons(pool)
};
