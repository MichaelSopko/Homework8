/**
 * Created by Michael on 07.10.2015.
 */

define([],function(){

    var Model = Backbone.Model.extend({
        defaults: {
            photo: "img/placeholder.png"
        },
        idAttribute: '_id',

        urlRoot: function () {
            return '/users'
        }//,
        //parse: function(response){
            //response.fullName = response.name.first + ' ' +  response.name.last;

            //return response;
        //}
    });

    return Model;
});

