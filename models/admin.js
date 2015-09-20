/**
 * Created by Michael on 28.08.2015.
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema =  mongoose.schemas.User;

var SuperAdminSchema = Schema.extend({
    name: {
        firstName: {type: String, default: 'Admin'},
        lastName: {type: String, default: 'Admin'}
    },
    admin: Boolean
});

mongoose.schemas.Admin = SuperAdminSchema;


