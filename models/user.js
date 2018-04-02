/**
 * User model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a user (be it C, R, U, D, or Login),
 * one or more of the functions here should be called.
 *
 * NOTE: You can add authentication logic in this model.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

 const bcrypt = require('bcrypt');

 module.exports = function(dbPool){

 	return{
 		newUserEntry : function(userInput,callback){
 			bcrypt.hash(userInput.password,2,(err,hash)=>{
 				userInput.password=hash;
 				let queryText= 'insert into users (username,email,password) values($1,$2,$3)';
 				let values=[];
 				let keys=Object.keys(userInput);
 				for(i=0;i<keys.length;i++){
 					values.push(userInput[keys[i]]);
 				}
 				dbPool.query(queryText,values,(err,dbRes)=>{
 					callback(err,dbRes);
 				});
 			});
 		},

 		login: function(userInput,callback){
 			let queryText='select * from users where username='+"'"+userInput.username+"'";
 			dbPool.query(queryText,(err,dbRes)=>{
 				if(err){
 					console.log("sql error",err.message);
 				}else if(dbRes.rows.length==0){
 					callback(err,dbRes);
 				}else {
 					hashedPw = dbRes.rows[0].password;
 					bcrypt.compare(userInput.password,hashedPw,(err,dbRes)=>{
 						if(dbRes==false){
 							callback(err,dbRes);
 						}else{
 							let queryText='select user_pin_pokemon.pokemon_id as id, pokemons.name as name, pokemons.img as img from users inner join user_pin_pokemon on users.id=user_pin_pokemon.user_id inner join pokemons on pokemons.id =user_pin_pokemon.pokemon_id AND users.username='+"'"+userInput.username+"'";
 							dbPool.query(queryText,(err,dbRes)=>{
 								let pinnedPokemons=dbRes.rows;
 								queryText='select * from pokemons'
 								dbPool.query(queryText,(err,dbRes)=>{
 									callback(err,dbRes,pinnedPokemons);
 								})
 							});	
 						}
 					});	
 				}	
 			});
 		}
 	}
 };


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

