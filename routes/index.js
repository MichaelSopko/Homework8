/**
 * Created by Michael on 28.08.2015.
 */
module.exports = function(app) {

    var bodyParser = require('body-parser');
    var userRouter = require('./user');
    var adminRouter = require('./admin');

    app.use(bodyParser.json());

    app.get('/', function (req, res, next) {
        res.status(200).send("Main Page");
        console.log(req.ip);
        next();
    });

    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
};