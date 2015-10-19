/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var AdminSchema = mongoose.schemas.Admin;
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _Admin = mongoose.model('admin', AdminSchema);
var _User = mongoose.model('user', UserSchema);
var Post = mongoose.model('post', PostSchema);


var Admin = function(){

    this.getAll = function(req, res, next){
        console.log("Admin handler opened!");
        _Admin
            .find({admin:true})
            .populate('posts', '-_id')
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

        var admin = new _Admin(body);

        admin.save(function (err, admin) {
            if (err) {
                return next(err);
            }

            res.status(200).send(admin);
        });
    };

    this.remove = function(req, res){
        var id = req.body._id;

        _Admin.findByIdAndRemove(id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getById = function(req, res){
        var id = req.params.id;

        _Admin
            .findById(id)
            //.populate('posts', '-_id')
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
        post._creator = req.params.id;

        post.save(function (err) {
            if (err) return next(err);

            _Admin.findById(post._creator, function(err, user){
                user.posts.push(post);

                user.save(function (err) {
                    if (err) return next(err);
                });
            });

            res.status(200).send( " posted: " + post);
        });
    };
};

module.exports = Admin;