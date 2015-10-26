/**
 * Created by Michael on 21.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);

var Login = function(){

    this.auth = function(req,res,next) {
        var login = req.body.username;
        var password = req.body.password;

        User.autorize(login, password,  function(err, user){
            if(err){
                return next(err);
            }

            req.session.user = user._id;
            res.status(200).send({
                auth : true,
                user : user._id
            });

        });
    };
};

module.exports = Login;