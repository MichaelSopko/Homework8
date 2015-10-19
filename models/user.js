/**
 * Created by Michael on 28.08.2015.
 */
var Content = require('./content');

var User = function (firstName, lastName, Email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = Email;
    this.content = new Content();
};

 User.prototype.constructor = User;

 User.prototype.changeEmail = function (newEmail) {
     this.email = newEmail;
     return "New Email Saved: " + this.email;
 };
 User.prototype.getFullName = function () {
     return this.firstName + " " + this.lastName;
 };
 User.prototype.deleteUser = function () {
     for (var i in this) {
         delete this[i];
     }
 };

module.exports = User;