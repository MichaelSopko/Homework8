/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var _Post = mongoose.model('post', PostSchema);

var Post = function(){

    this.getAll = function(req, res, next){
        _Post
            .find()
            .populate('_creator', 'name')
            .populate('comments._creator', 'name')
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
        var text = body.text;
        var creator = body._creator;

        var userPageId = req.params.id;

        var data = {
            text: text,
            _creator: creator,
            owner: userPageId
        };

        var post = new _Post(data);

        _User.findById(userPageId, function (err, user) {
            if (err) return next(err);

            if(user){
                user.posts.push(post._id);
                user.save(function (err) {
                    if (err) return next(err);
                });
            }

            post.save(function (err, post) {
                if (err) { return next(err); }

                _Post.findById(post._id)
                    .populate('_creator', 'name')
                    .populate('comments._creator', 'name')
                    .lean()
                    .exec(function(err, post) {
                        if (err) { return next(err); }
                        console.log("================");
                        res.status(200).send(post);
                    });
            });
        });
    };

    this.remove = function(req, res){
        var id = req.params.id;

        _Post.findByIdAndRemove(id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getById = function(req, res){
        var id = req.body._id;

        _Post
            .findById(id)
            .populate('_creator', 'name')
            .populate('comments._creator', 'name')
            .lean()
            .exec(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            })
    };

    this.getUserPagePosts = function(req, res){
        var userPageId = req.params.id;

        _Post.find({owner: userPageId})
            .populate('_creator', 'name')
            .populate('comments._creator', 'name')
            .lean()
            .exec(function (err, posts) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(posts);
            });
    };
};

module.exports = Post;