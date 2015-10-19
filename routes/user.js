/**
 * Created by Michael on 28.08.2015.
 */
module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');

    var userRouter = express.Router();
    var userHandler = new UserHandler();

    userRouter.get('/', userHandler.getAll);
    userRouter.post('/', userHandler.create);
    userRouter.post('/:firstName/:lastName', userHandler.updateUser);
    userRouter.post('/:addContent', userHandler.addContent);

    return userRouter;
})();