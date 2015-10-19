/**
 * Created by Michael on 28.08.2015.
 */
var User = require('./models/user');

function superAdmin(){
    User.apply(this,arguments);
    this.accessRights = true;
}
superAdmin.prototype = new User();
superAdmin.prototype.constructor = superAdmin;

superAdmin.prototype.deleteContent = function (postName)  {
    postName.deleteContent();
};
superAdmin.prototype.deleteUser = function(username) {
    username.deleteUser();
};