/**
 * Pokemon model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a pokemon (be it C, R, U, or D),
 * one or more of the functions here should be called.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (pool) => {

  return {

	root: (callback) => {
		const queryString = 'SELECT * from pokemon;';

  		pool.query(queryString, (err, result) => {
  			callback(err, result);
  		});
	},

	get: (id, callback) => {
		const values = [id];
		const queryString = 'SELECT *FROM pokemon WHERE id = $1;';

		pool.query(queryString, values, (err, result) => {
			callback(err, result);
		});
	},

	create: (body, userId, callback) => {
		const queryString = 'INSERT INTO pokemon(id, num, name, img, height, weight, user_id) VALUES($1, $2, $3, $4, $5, $6, $7);';  			
		const values = [body.id, body.num, body.name, body.img, body.height, body.weight, userId];

  		pool.query(queryString, values, (err, result) => {
  			callback(err, result); 
  		});
	},

	edit: (id, callback) => {
		const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  			
  		pool.query(queryString, (err, result) => {
  			callback(err, result);
  		});
	},

	update: (id, body, callback) => {
		const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  		const values = [body.num, body.name, body.img, body.height, body.weight, id];

  		pool.query(queryString, values, (err, result) => {
  			callback(err, result);
  		});
  	},

  	delete: (id, callback) => {
  		const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  			
  		pool.query(queryString, (err, result) => {
  			callback(err, result);
  		});
  	},

  	destroy: (id, callback) => {
  		const queryString = 'DELETE FROM pokemon WHERE id = ' + id + ';';

 		pool.query(queryString, (err, result) => {
 		 	callback(err, result);
 		});
  	}

  };

};