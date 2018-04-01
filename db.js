/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */

const pg = require('pg');
const pokemon = require('./models/pokemon');
const user = require('./models/user');

const configs = {
    user: 'postgres',
    password: '13Dec1985',
    host: '127.0.0.1',
    database: 'pokemons_development',
    port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    //pokemon: pokemon(pool),
    user: user(pool)
};