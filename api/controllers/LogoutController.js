/**
 * LogoutController
 *
 * @description :: Server-side logic for managing logouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
		index : function(req, res){
			console.log(req.session.user);
			req.session.user = null;
			res.send(200, "User logged out");
			
		}
};

