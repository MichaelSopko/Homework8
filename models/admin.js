/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.schemas.User;

var SuperAdminSchema = Schema.extend({
    name:{
        first: {type:String, default: 'Admin'},
        last: {type:String, default: 'Admin'}
    },
    admin: {type: Boolean, default: true}
});

mongoose.schemas.Admin = SuperAdminSchema;