var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);

exports.post = function(req,res,next) {
    var username = req.body.username;
    var password = req.body.password;

    User.autorize(username, password,  function(err, user){
        if(err){
            return next(err);
        }

        res.send(200, {
            auth : true,
            user : user
        });
    });
};