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
 		newPokemon: (sReq,callback)=>{
 			let queryText='select * from users where username='+"'"+sReq.cookies.username+"'";
 			dbPool.query(queryText,(err,dbRes)=>{
 				queryText='insert into user_created_pokemons (user_id,num,name,img,weight,height) values($1,$2,$3,$4,$5,$6)';
 				let values=[dbRes.rows[0].id,sReq.body.num,sReq.body.name,sReq.body.img,sReq.body.weight,sReq.body.height];
 				dbPool.query(queryText,values,(err,dbRes)=>{
 					if(err){
 						console.log('error',err.message);
 					}
 					callback(err,dbRes);
 				});
 			});
 		},

 		pinPokemon: (sReq,callback)=>{
 			let queryText = 'select id from users where username='+"'"+sReq.cookies.username+"'";
 			dbPool.query(queryText,(err,dbRes)=>{
 				if(err){
 					console.log("cannot find userId",err.message);
 				}else{
 					queryText='insert into user_pin_pokemon (user_id,pokemon_id) values($1,$2)';
 					let values = [dbRes.rows[0].id,parseInt(sReq.body.pokemonId)];
 					dbPool.query(queryText,values,(err,dbRes)=>{
 						callback(err,dbRes);
 					});
 				}
 			})
 		}
 	}
}
