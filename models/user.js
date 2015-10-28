/**
 * Created by Michael on 07.10.2015.
 */
var crypto = require('crypto');
var async = require('async');
var validator = require('validator');

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
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {type: String},
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    age: Number,
    posts: [{type: String, ref: 'post'}],
    friends: [{type: String, unique: true, ref: 'user'}],
    myProposals: [{type: String, unique: true, ref: 'user'}],
    proposals: [{type: String, unique: true, ref: 'user'}],
    admin: {type: Boolean, default: false},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics.validate = function(user, next){

    if (!validator.isLength(user.name.first, 1, 50)) {
        return next(new Error('Name must be between 1 and 50 characters.'));
    }

    if (!validator.isLength(user.name.last, 1, 50)) {
        return next(new Error('Name must be between 1 and 50 characters.'));
    }

    if (!validator.isLength(user.login, 4, 16)) {
        return next(new Error('Login must be between 4 and 16 characters.'));
    }

    if (!validator.isLength(user.password, 8, 16)) {
        return next(new Error('Password must be between 8 and 16 characters.'));
    }

    if (!validator.isEmail(user.email)) {
        return next(new Error('Email must be example@example.com'));
    }

    if (!validator.isNumeric(user.phone)) {
        return next(new Error('Phone must be a number'));
    }

    var UserModel = mongoose.model('user');
    UserModel.findOne({login: user.login }, function (err, user) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if(user) {
            return next(new Error('This login is already registered'));
        }
    });

    UserModel.findOne({email: user.email}, function (err, user) {
        if (err) {
            return next(err);
        }
        if(user) {
            return next(new Error('This email address is already registered'));
        }
    });


    next();
};

UserSchema.pre('save', function(next){
    var user = this;
    console.log('2');

    var dOb = this.dateOfBirth;

        this.age = (new Date() - new Date(dOb)) / 1000 / 60 / 60 / 24 / 365;

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
                    callback(new Error('Password wrong'));
                }
            }else {
                callback(new Error('User not found'));
            }
        }
    ], callback);
};

mongoose.schemas.User = UserSchema;
