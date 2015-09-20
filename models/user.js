/**
 * Created by Michael on 28.08.2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    id: false,
    _id: Number,
    name: {
        firstName: {type: String, default: 'Vasya'},
        lastName: {type: String, default: 'Pupkin'}
    },
    dateOfBirth: {type: Date, default: Date.now()},
    posts: [{type: Number, ref:'Post'}],
    age: Number,
    login: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String}
}, {collection: 'User', version: false});

UserSchema.pre('save', function(next){
    var dOb = this.dateOfBirth;

    this.age = (new Date() - new Date(dOb)) / 1000 / 60 / 60 / 24;

    next();
});

UserSchema.virtual('fullName').get(function(){
    return this.name.first + ' ' + this.name.last
});

UserSchema.set('toJSON', { virtuals: true });

mongoose.schemas.User = UserSchema;
