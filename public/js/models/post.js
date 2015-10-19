/**
 * Created by Michael on 18.10.2015.
 */
define([],function(){

    var Model = Backbone.Model.extend({

        idAttribute: '_id',

        urlRoot: function () {
            return '/posts';
        }

    });

    return Model;
});