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

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Vrakashy'});
    });

    app.use('/users', userRouter);
    app.use('/posts', checkAuth,postRouter);
    app.use('/admin', checkAuth,adminRouter);
    app.use('/login', loginRouter);
    app.use('/logout', checkAuth, logoutRouter);
    app.use('/chat', checkAuth, chatRouter);
    app.use('/singUp', singUpRouter);

};