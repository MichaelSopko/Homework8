/**
 * Created by Michael on 29.08.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var AdminSchema = mongoose.schemas.Admin;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var _Admin = mongoose.model('admin', AdminSchema);
var Post = mongoose.model('Post', PostSchema);

var Admin = function() {

    this.create = function (req, res, next) {
        var body = req.body;

        var admin = new _Admin(body);
        admin._id = req.params.id;

        admin.save(function (err) {
            if (err) return next(err);

            res.status(200).send(admin);
        });
    };

    this.deleteUser = function (req, res, next) {
        var _id = req.params.id;

        _User.findByIdAndRemove(_id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getAll = function (req, res, next) {
        _User
            .find()
            .populate('posts')
            .lean()
            .exec(function(err, response){
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };
};

module.exports = Admin;