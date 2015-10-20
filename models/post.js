/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
    name:{ type:String, default: ''},
    _creator: {type: String, ref: 'user'},
    likes: [{type: String, ref: 'user'}]
});


mongoose.schemas.Post = PostSchema;