/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
module.exports=function(db){

	return {

		getNewUserForm: function (sReq,sRes) {
			sRes.render('user/new');
		},

		submitNewUserForm: function(sReq,sRes){
			db.userModel.newUserEntry(sReq.body,(err,dbRes)=>{
				sRes.send('Submitted');
			})
		},

		login: function(sReq,sRes){
			db.userModel.login(sReq.body,(err,dbRes)=>{
				if(err){
					console.log(err.message);
				}else if (dbRes==false){
					sRes.redirect('/?error=invalidpassword');
				}else if(dbRes.rows.length==0){
					sRes.redirect('/?error=noUser')
				}else{
					let context = {
						pokemon: dbRes.rows,
						username: sReq.body.username
					}
					sRes.cookie('loggedin',true);
					sRes.cookie('username',sReq.body.username);
					sRes.render('pokemon/new',context);
				}
			});
		},

		logout: function(sReq,sRes){
			sRes.clearCookie('loggedin');
			sRes.clearCookie('username');
			sRes.redirect('/');
		}

	};

};



/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

// module.exports = function(db){
// 	return{
// 		getNewUserForm:getNewUserForm,
// 		submitNewUserForm:submitNewUserForm
// 	}
// };
