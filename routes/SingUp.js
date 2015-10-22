/**
 * Created by Michael on 21.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var SingUpHandler = require('../handlers/singUp');

    var singUpRouter = express.Router();
    var singUpHandler = new SingUpHandler();

    singUpRouter.post('/', singUpHandler.create);

    return singUpRouter;
})();