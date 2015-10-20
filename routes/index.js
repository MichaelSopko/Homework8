/**
 * Created by Michael on 07.10.2015.
 */
var chat = require('../chat');

module.exports = function(app){

    var bodyParser = require('body-parser');
    var userRouter = require('./user');
    var postRouter = require('./post');
    var adminRouter = require('./admin');

    app.use(bodyParser.json());

    app.get('/', function(req, res, next){
        res.sendfile("index.html");
    });

    app.use('/users', function(req, res, next){
        if(!req.session.user)
            return next(new Error(403));
        next();
    }, userRouter);
    app.use('/posts', function(req, res, next){
        if(!req.session.user)
            return next(new Error(403));
        next();
    },postRouter);
    app.use('/admin', function(req, res, next){
        if(!req.session.user)
            return next(new Error(403));
        next();
    },adminRouter);
    app.post('/login', require('./login').post);
    app.get('/chat', require('./chat').get);
    app.post('/chat', require('./chat').post);
    app.get('/subscribe', function(req, res){
        chat.subscribe(req,res);
    });

    app.get("/session", function(req, res){
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

    app.delete("/logout", function(req, res){
        req.session.user = null;
        console.log(req.user);
        res.send(200);
    });

    app.use(function(err, req, res, next){
        var status = err.status || 500;
        res.status(status).send(err);
    });
};