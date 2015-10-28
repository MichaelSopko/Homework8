/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var Post = mongoose.model('post', PostSchema);

var User = function(){

    this.getAll = function(req, res, next){

        _User
            .find()
            .populate('posts friends', '_id')
            .lean()
            .exec(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.create = function(req, res,next){
        var body = req.body;
        var login = body.login;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var email = body.email;
        var dateOfBirth = body.dateOfBirth;
        var phone = body.phone;

        var data = {
            name: {
                first: firstName,
                last: lastName
            },
            login: login,
            password: password,
            email: email,
            dateOfBirth: dateOfBirth,
            phone: phone
        };

        var user = new _User(data);
        _User.validate(user ,function(err){
            if(err){
                return next(err);
            }
            user.save(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).send({});
            });
        });
    };

    this.remove = function(req, res){
        var id = req.params._id;

        _User.findByIdAndRemove(id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getById = function(req, res, next){

        var id = req.params.id;

        _User
            .findById(id)
            .populate('posts friends')
            .lean()
            .exec(function (err, response){
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.addFriend = function(req, res,next){
        var body = req.body;
        var _id = req.params.id;
        var id = body.friend;

        _User.findById(_id, function (err, user) {
            if (err) {
                return next(err);
            }
            if(user){
                var user1 = user;
                _User.findById(id, function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    var user2 = user;

                    user1.myProposals.forEach(function(proposal) {
                        console.log(proposal);
                        if(user2._id == proposal){
                            return next("User is already added");
                        }
                    });

                    user1.proposals.push(user2._id);

                    user1.modified = new Date();

                    user1.saveWithoutValidation(function(err) {
                        console.log(err)
                        if (err)
                            console.log('error')
                        else
                            console.log('success')
                    });

                    /*user1.myProposals.push(user1._id);
                    user1.save(function (err) {
                        if (err) return next(err);
                    });*/
                });

                res.status(200).send([]);
            }else{
                res.status(404).send('not found user');
            }
        });
    };

    this.findByName =  function(req, res, next){
        //...
        var name = "firstname";
        console.log(name);
        _User
            .find({name:{firstname:name}})
            .populate('posts', '_id')
            .lean()
            .exec(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

};

module.exports = User;