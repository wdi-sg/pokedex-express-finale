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

 module.exports = function(dbPool){
 	return{
 		newPokemon: (userInput,callback)=>{
 			let queryText="insert into pokemons (num,name,img,weight,height) values($1,$2,$3,$4,$5)";
 			let values=[userInput.num,userInput.name,userInput.img,userInput.weight,userInput.height];
 			dbPool.query(queryText,values,(err,dbRes)=>{
 				callback(err,dbRes);
 			})
 		}
 	}
 }
