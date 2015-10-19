/**
 * Created by Michael on 07.10.2015.
 */
var App = App || {};

require.config({
    paths:{
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        text: 'libs/text/text',
        templates: '../templates'
    },
    shim:{
        Backbone: ['Underscore', 'jQuery'],
        app: ['Backbone']
    }
});

require(['app'], function (app) {
    app.init();
});



