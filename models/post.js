/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
    text: String,
    _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    owner:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    comments: [{
        text: String,
        _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    }]
});

mongoose.schemas.Post = PostSchema;
