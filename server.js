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

var port = process.env.PORT || config.get('port');
var db;
var app = express();
mongoose.schemas = {};

require('./models');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(logger('dev'));

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

db.on('error', function(err){
    console.error(err);
    throw err;
});

db.once('open', function(){

    require('./routes')(app);

    app.use(express.static(__dirname + '/public'));

    app.listen(port, function(){
        console.log("Express server listening on port " + port);
        console.log("HOST: " + "http://localhost:" + port);
    });

});