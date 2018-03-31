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
 				console.log(dbRes.rows);
 				if(err){
 					console.log("sql error",err.message);
 				}else if(dbRes.rows.length==0){
 					callback(err,dbRes);
 				}else {
 					hashedPw = dbRes.rows[0].password;
 					bcrypt.compare(userInput.password,hashedPw,(err,dbRes)=>{
 						callback(err,dbRes);
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

