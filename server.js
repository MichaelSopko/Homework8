/**
 * Created by Michael on 28.08.2015.
 */
var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var checkSession = require('./middleware/checkSession');
var methodOverride = require('method-override')

var port = process.env.PORT || config.get('port');
var db;
var app = express();
mongoose.schemas = {};

require('./models');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('localhost', 'vrokashyDbTest', 27017);
db = mongoose.connection;

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: true
}));

app.use(checkSession);
app.use(methodOverride('_method'));

db.on('connected', function() {
    console.log('Connected to dataBase');
});

db.on('error', function(err){
    console.error(err);
    throw err;
});

db.once('open', function(){

    require('./routes')(app);

    app.listen(port, function(){
        console.log("Express server listening on port " + port);
        console.log("HOST: " + "http://localhost:" + port);
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            console.error(err.message);
            res.status(err.status || 500);
            res.send(err.message);
        });
    }
});