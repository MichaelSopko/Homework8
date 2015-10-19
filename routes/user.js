/**
 * Created by Michael on 07.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var UserHandler = require('../handlers/user');

    var userRouter = express.Router();
    var userHandler = new UserHandler();

    userRouter.get('/', userHandler.getAll);
    userRouter.post('/', userHandler.create);
    userRouter.delete('/', userHandler.remove);
    userRouter.get('/:id', userHandler.getById);
    userRouter.post('/:id', userHandler.createPost);

    return userRouter;
})();