/**
 * Created by Michael on 21.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var _User = mongoose.model('user', UserSchema);

var User = function(){

    this.create = function(req, res,next){
        var body = req.body;
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var email = body.email;
        var dateOfBirth = body.dateOfBirth;

        var data = {
            name: {
                first: firstName,
                last: lastName
            },
            login: login,
            password: password,
            email: email,
            dateOfBirth: dateOfBirth
        };

        var user = new _User(data);

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

};

module.exports = User;