/**
 * Created by Michael on 28.08.2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = Schema({
    _id: Number,
    _creator : { type: Number, ref: 'User' },
    name: String
}, {collection: 'Post'});

mongoose.schemas.Post = PostSchema;
