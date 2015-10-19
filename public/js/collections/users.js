/**
 * Created by Michael on 10.10.2015.
 */
define(['models/user'], function(Model){

    var Collection = Backbone.Collection.extend({
        model: Model,

        url: '/users/'
    });

    return Collection;
});

//sessions
//storage
//edit ??
