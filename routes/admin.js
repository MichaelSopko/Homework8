/**
 * Created by Michael on 28.08.2015.
 */
module.exports = (function(){
    var express = require('express');
    var AdminHandler = require('../handlers/admin');

    var adminRouter = express.Router();
    var adminHandler = new AdminHandler();

    adminRouter.get('/', adminHandler.getAll);
    adminRouter.post('/:id', adminHandler.create);
    adminRouter.delete('/:userId', adminHandler.deleteUser);

    return adminRouter;
})();