/**
 * Created by Michael on 21.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);

var Login = function(){

    this.auth = function(req,res,next) {
        var username = req.body.username;
        var password = req.body.password;

        User.autorize(username, password,  function(err, user){
            if(err){
                return next(err);
            }
            req.session.user = user._id;
            res.send(200, {
                auth : true,
                user : user
            });
        });
    };
};

module.exports = Login;