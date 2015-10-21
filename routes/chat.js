/**
 * Created by Michael on 06.09.2015.
 */
module.exports = (function(req, res, next){

    var express = require('express');
    var chatRouter = express.Router();

    chatRouter.get('/', function(req, res){
        subscribe(req,res);
    });

    chatRouter.post('/', function(req,res, next){
        var body = '';

        req.on('readable', function(){
            body += req.read();

            if(body.length > 1e4){
                res.statusCode = 413;
                res.end("Message is big");
            }
        }).on('end', function(){
            try {
                body = JSON.parse(body);
            }catch(e){
                res.statusCode = 400;
                res.end("Bad request");
                return
            }

            publish(body.message);
            res.end('ok');
        });
    });

    var clients = [];

    var subscribe = function(req, res){
        console.log("subscribe");

        clients.push(res);

        res.on('close',function(){
            clients.splice(clients.indexOf(res),1);
        });
    };

    var publish = function(message){
        console.log("publish '%s'", message);

        clients.forEach(function(res){
            res.end(message);
        });

        clients = [];
    };

    return chatRouter;
})();
