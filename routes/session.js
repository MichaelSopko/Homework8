/**
 * Created by Michael on 21.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var sessionRouter = express.Router();

    sessionRouter.get('/', function(req, res){
        if(req.session.user){
            res.send(200, {
                auth : true,
                user : req.user
            });
        }else{
            res.send(401, {
                auth : false
            });
        }
    });

    return sessionRouter;
})();