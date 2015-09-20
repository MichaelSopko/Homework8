/**
 * Created by Michael on 28.08.2015.
 */
var express = require('express');

var app = express();

var mongoose = require('mongoose');
mongoose.schemas = {};

require('./models');

var port = process.env.PORT || 3030;

require('./routes')(app);

var myModule = require('./handlers/user');

mongoose.connect('localhost', 'mytestDb', 27017);

var db = mongoose.connection;

db.on('error', function(err){
    console.error(err);
});

db.once('open', function(){
    app.listen(port, function(){
        console.log('Server start success = ' + port);
    });
});
