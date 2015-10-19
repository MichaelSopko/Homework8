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

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/admin', adminRouter);
    app.post('/login', require('./login').post);
    app.get('/chat', require('./chat').get);
    app.post('/chat', require('./chat').post);
    app.get('/subscribe', function(req, res){
        chat.subscribe(req,res);
    });

    app.use(function(err, req, res, next){
        var status = err.status || 500;
        res.status(status).send(err);
    });
};