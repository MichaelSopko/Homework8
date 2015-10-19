 /**
 * Created by Michael on 28.08.2015.
 */

 var User = function() {
     var userModel = require('../models/user');

     this.create = function (req, res, next) {
         console.log("ip: " + req.ip);
         this.user = new userModel('Vasya','Pupkin');
         res.status(200).send("User " + this.user.firstName + ' ' + this.user.lastName + " was created");
         console.log(this.user);
     };

     this.updateUser = function (req, res, next) {
         if (!this.user){
             this.user = new userModel();
         }
         this.user.firstName = req.params.firstName;
         this.user.lastName = req.params.lastName;

         res.status(200).send("User: " + this.user.firstName + ' ' + this.user.lastName);
     };

     this.addContent = function (req, res, next) {
         if (!this.user){
             this.user = new userModel('anonimus');
         }
         this.user.content.text = req.params.addContent;

         res.status(200).send(this.user.firstName + " posted: " + this.user.content.text);
     };

     this.getAll = function (req, res, next) {
         if (!this.user){
             this.user = new userModel("Anonimus");
         }

         res.status(200).send(this.user.firstName + "'s content: " + this.user.content);
         console.log(req.ip);
         console.log(this.user);
     };

 };

module.exports = User;