
module.exports = (function(){

    var express = require('express');
    var LoginHandler = require('../handlers/login');

    var loginRouter = express.Router();
    var loginHandler = new LoginHandler();

    loginRouter.post('/', loginHandler.auth);

    return loginRouter;
 })();
