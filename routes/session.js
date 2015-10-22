/**
 * Created by Michael on 21.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var sessionRouter = express.Router();

    sessionRouter.get('/', function(req, res){
        if(req.session.user){
            res.status(200).send({
                auth : true,
                user : req.session.user
            });
        }else{
            res.status(401).send({
                auth : false
            });
        }
    });

    return sessionRouter;
})();