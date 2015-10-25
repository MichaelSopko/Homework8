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

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send({});
        });
    };

    this.remove = function(req, res){
        var id = req.body._id;

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

                Post.find()
                    .populate({ path: '_creator', select: 'name' })
                    .lean()
                    .exec(function (err, post) {
                        if (err) {
                            return next(err);
                        }
                        post.forEach(function(el){
                            console.log(el._creator);
                        });
                        res.status(200).send(response);
                    });
            });
    };

    this.changeUser = function(req, res,next){
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
                    user2.friends.push(user1._id);
                    user2.save(function (err) {
                        if (err) return next(err);
                    });

                    user1.friends.push(user2._id);
                    user1.save(function (err) {
                        if (err) return next(err);
                    });
                });

                res.status(200).send([]);
            }else{
                res.status(404).send('not found user');
            }
        });
    };

    this.getPostsById = function(req, res, next){
        var userPageId = req.params.id;

        Post.find({owner: userPageId})
            .populate('_creator')
            .lean()
            .exec(function (err, posts) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(posts);
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