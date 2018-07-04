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

configs = {
	user: 'acechua',
	host: '127.0.0.1',
	database: 'spotifier_development',
	port: 5432
};

const poolObj = new pg.Pool(configs);

poolObj.on('error', (err) => {
	console.log('idle client error', err.message, err.stack);
});

const userModel = require('./models/user.js')(poolObj);
const songModel = require('./models/song.js')(poolObj);

module.exports = {
	pool: poolObj,
	user: userModel,
	song: songModel
};