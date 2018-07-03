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

const db = require('../db.js');

module.exports = function(poolObj){

	const getRoot = (callback) => {

	  const queryString = 'SELECT * from pokemon;';
	  poolObj.query(queryString, callback);

	}

	const getPokemon = (id, callback) => {
	  const queryString = 'SELECT * FROM pokemon WHERE id = $1'
	  poolObj.query(queryString, [id], (error, result) => {
      	callback(result.rows[0]);
      }
	}

	const postPokemon = (name, height, callback) => {

	  const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2);';
	  const values = [name, height];
	  poolObj.query(queryString, values, callback);

	}

	const editPokemonForm = (id, callback) => {

	  const queryString = 'SELECT * FROM pokemon WHERE id = '
	  poolObj.query(queryString, [id], (error, result) => {
      	callback(result.rows[0]);
      }
	}

	const updatePokemon = (num, name, img, height, weight, id, callback) => {

	  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
	  const values = [num, name, img, height, weight, id];
	  poolObj.query(queryString, values, (error, result) => {
    	callback(result.rows[0]['id']);
  		});
	}


	const deletePokemon = (id, callback) => {

	  const queryString = 'DELETE FROM pokemon WHERE id = '
	  poolObj.query(queryString, [id], (error, result) => {
      	callback(result.rows[0]['id']);
      }

	}
}
