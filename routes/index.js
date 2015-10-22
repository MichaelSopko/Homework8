/**
 * Created by Michael on 07.10.2015.
 */
module.exports = function(app){

    var userRouter = require('./user');
    var postRouter = require('./post');
    var adminRouter = require('./admin');
    var checkAuth = require('../middleware/checkAuth');
    var loginRouter = require('./login');
    var chatRouter = require('./chat');
    var logoutRouter = require('./logout');
    var singUpRouter = require('./singUp');

    app.get('/', function(req, res, next){
        var path = __dirname.split('\\').slice(0, -1).join('\\') + '\\';
        res.sendFile(path + 'index.html');
    });

    app.use('/users', userRouter);
    app.use('/posts', checkAuth,postRouter);
    app.use('/admin', checkAuth,adminRouter);
    app.use('/login', loginRouter);
    app.use('/logout', checkAuth, logoutRouter);
    app.use('/chat', checkAuth, chatRouter);
    app.use('/singUp', singUpRouter);

    app.use(function(err, req, res, next){
        console.error(err);
        var status = err.status || 500;
        res.status(status).send(err);
    });
};