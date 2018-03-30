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
// var bcyrpt = require('bcyrpt');

module.exports = function(dbPool){

 	return{
 		newUserEntry : function(userInput,callback){
 			// bcrypt.hash(userInput.password,2,(err,hash)=>{
 				// userInput.password=hash;
 				queryText= 'insert into users (username,email,password) values($1,$2,$3)';
 				values=[];
 				let keys=Object.keys(userInput);
 				for(i=0;i<keys.length;i++){
 					values.push(userInput[keys[i]]);
 				}
 				dbPool.query(queryText,values,(err,dbRes)=>{
 					callback(err,dbRes);
 				});
 			// });
 		}
 	}
};


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

