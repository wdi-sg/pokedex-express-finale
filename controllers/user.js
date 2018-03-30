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
