/**
 * Created by Michael on 07.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var UserHandler = require('../handlers/user');
    var checkAuth = require('../middleware/checkAuth');

    var userRouter = express.Router();
    var userHandler = new UserHandler();

    userRouter.get('/', userHandler.getAll);
    userRouter.post('/', userHandler.create);
    userRouter.delete('/:id', checkAuth, userHandler.remove);
    userRouter.get('/:id', checkAuth, userHandler.getById);
    userRouter.put('/:id', checkAuth, userHandler.changeUser);

    userRouter.get('/:id/posts', checkAuth, userHandler.getPostsById);
    userRouter.post('/find', checkAuth, userHandler.findByName);

    return userRouter;
})();