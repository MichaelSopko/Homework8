/**
 * Created by Michael on 21.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var logoutRouter = express.Router();

    logoutRouter.delete("/", function(req, res){
        req.session.destroy();
        res.redirect('/');
    });

    return logoutRouter;
})();
