/**
 * Created by Michael on 07.10.2015.
 */
define(['router','Session'], function(Router, Session){

    function init(){
        var router = new Router();
        var fragment = Backbone.history.fragment;
        var url = window.location.hash;

        Backbone.history.start();  //{silent: true});

        if (fragment){
            Backbone.history.fragment = '';
        } else {
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        }
    }

    return {
        init: init
    }
});