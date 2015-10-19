/**
 * Created by Michael on 07.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var PostHandler = require('../handlers/post');

    var postRouter = express.Router();
    var postHandler = new PostHandler();

    postRouter.get('/', postHandler.getAll);
    postRouter.post('/', postHandler.create);
    postRouter.delete('/', postHandler.remove);
    postRouter.get('/:id', postHandler.getById);

    return postRouter;
})();