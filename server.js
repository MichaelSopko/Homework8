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

var port = process.env.PORT || config.get('port');
var db;
var app = express();
mongoose.schemas = {};

require('./models');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser());
app.use(cookieParser());
app.use(logger('dev'));

mongoose.connect('localhost', 'mytestDb', 27017);
db = mongoose.connection;

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