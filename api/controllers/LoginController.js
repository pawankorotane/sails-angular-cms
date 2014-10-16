/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
module.exports = {
	
	index : function (req, res){
		var username = req.param('username');
		if(typeof username === 'undefined'){
			return res.serverError("Username is required.");
		}
		Users.findOne({username: req.param('username')}, function (err, user) {
    		if (err) { return next(err); }
    		if (!user) { return res.send(401, "User does not exit"); }
    		bcrypt.compare(req.param('password'), user.password, function (err, valid) {
      			if (err) { return next(err); }
      			if (!valid) { return res.send(401, "Username and password is incorrect"); }
			   	req.session.user =  username;
			   	req.session.authenticated =  true;
			    res.send(user, 200);
    });
  });
	}
};

