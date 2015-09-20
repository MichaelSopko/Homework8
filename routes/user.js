/**
 * Created by Michael on 28.08.2015.
 */
module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');

    var userRouter = express.Router();
    var userHandler = new UserHandler();

    userRouter.get('/', userHandler.getAll);
    userRouter.delete('/:id', userHandler.remove);

    userRouter.post('/:id', userHandler.create);
    userRouter.post('/:id/post/:postid', userHandler.addContent);

    return userRouter;
})();