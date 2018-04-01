/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

module.exports = function(db){
	return{
		newPokemon: (sReq,sRes)=>{
			db.pokemonModel.newPokemon(sReq,(err,dbRes)=>{
				if(err){
					console.log("could not write data",err.message)
				}else{
					sRes.send('created');
				}
			});
		},

		pinPokemon: (sReq,sRes)=>{
			db.pokemonModel.pinPokemon(sReq,(err,dbRes)=>{
				// console.log(dbRes.rows);
				if(err){
					console.log(err.message);
				}
				sRes.send({status:'added',id:sReq.body.pokemonId});
			});
		}
	}
};