/**
 * Created by Michael on 28.08.2015.
 */
var express = require('express');

var app = express();

var port = process.env.PORT || 3030;

require('./routes')(app);

app.listen(port, function(){
    console.log('Server start success = ' + port);
});