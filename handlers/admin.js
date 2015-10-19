/**
 * Created by Michael on 29.08.2015.
 */
var User = function() {
    var adminModel = require('../models/user');

    this.create = function (req, res, next) {
        console.log("ip: " + req.ip);
        this.admin = new adminModel('Admin');
        res.status(200).send("Admin created");
        console.log(this.admin);
    };

    this.deleteUser = function (req, res, next) {
        if(this.user.firstName == req.params.username){
            this.admin.deleteUser(this.user);

            res.status(200).send(this.user.firstName + ' deleted');
        }

        res.send('error');
    };

    this.getAll = function (req, res, next) {
        if (!this.admin){
            this.admin = new adminModel("Admin");
        }

        res.status(200).send("Admin's content: " + this.admin.content);
        console.log(req.ip);
        console.log(this.admin);
    };

};

module.exports = User;