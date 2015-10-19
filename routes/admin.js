/**
 * Created by Michael on 07.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var AdminHandler = require('../handlers/admin');

    var adminRouter = express.Router();
    var adminHandler = new AdminHandler();

    adminRouter.get('/', adminHandler.getAll);
    adminRouter.post('/', adminHandler.create);
    adminRouter.delete('/', adminHandler.remove);
    adminRouter.get('/:id', adminHandler.getById);
    adminRouter.post('/:id', adminHandler.createPost);

    return adminRouter;
})();