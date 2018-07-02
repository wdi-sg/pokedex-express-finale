const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'elvera',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = pool;