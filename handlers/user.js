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
            .find({admin:false})
            .populate('posts', '_id')
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
            .populate('posts')
            .lean()
            .exec(function (err, response) {

                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.createPost = function(req, res, next){
        var body = req.body;

        var post = new Post(body);
        var creator = req.params.id;

        _User.findById(creator, function (err, user) {
            if (err) return next(err);

            if(user){
                post._creator = user;
                user.posts.push(post._id);
                user.save(function (err) {
                    if (err) return next(err);
                });
            }

            post.save(function (err, post) {
                if (err) { return next(err); }
                res.status(200).send(post);
            });
        });


    };
};

module.exports = User;