/**
 * Created by Michael on 07.10.2015.
 */
var crypto = require('crypto');
var async = require('async');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name:{
        first: {type:String, default: 'Ivan'},
        last: {type:String, default: 'Pupkin'}
    },
    email: String,
    phone: Number,
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    age: Number,
    posts: [{type: String, ref: 'post'}],
    admin: {type: Boolean, default: false},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next){
    var dOb = this.dateOfBirth;

    this.age = (new Date() - new Date(dOb)) / 1000 / 60 / 60 / 24;

    next();
});

UserSchema.virtual('fullName')
    .get(function(){
        return this.name.first + ' ' + this.name.last
    });

UserSchema.set('toJSON', { virtuals: true });

UserSchema.methods.encryptPassword = function(password){
    return crypto.createHash("sha1").update(password).digest("hex");
};

UserSchema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._plainPassword;
    });

UserSchema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.statics.autorize = function(login, password, callback){
    var User = this;

    async.waterfall([
        function (callback) {
            User.findOne({login: login}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new Error(500, 'Password wrong'));
                }
            }else {
                 callback(new Error(500, 'User not found'));
            }
        }
    ], callback);
};

mongoose.schemas.User = UserSchema;
