 /**
 * Created by Michael on 28.08.2015.
 */
 var mongoose = require('mongoose');
 var UserSchema = mongoose.schemas.User;
 var PostSchema = mongoose.schemas.Post;
 var _User = mongoose.model('user', UserSchema);
 var Post = mongoose.model('Post', PostSchema);

 var User = function() {
     this.create = function (req, res, next) {
         var body = req.body;

         var user = new _User(body);
         user._id = req.params.id;

         user.save(function (err) {
             if (err) return next(err);

             res.status(200).send(user);
         });
     };

     this.remove = function(req, res, next){
         var _id = req.params.id;

         _User.findByIdAndRemove(_id, function (err, response) {
             if (err) {
                 return next(err);
             }

             res.status(200).send(response);
         });
     };

     this.addContent = function (req, res, next) {
         var body = req.body;

         var post = new Post(body);
         post._id = req.params.postid;
         post._creator = req.params.id;

         post.save(function (err) {
             if (err) return next(err);

             _User.findById(post._creator, function(err, user){
                 user.posts.push(post);

                 user.save(function (err) {
                       if (err) return next(err);
                 });
             });

             res.status(200).send( " posted: " + post);
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

module.exports = User;