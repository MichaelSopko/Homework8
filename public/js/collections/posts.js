/**
 * Created by Michael on 18.10.2015.
 */
define(['models/post'], function(Model){

    var Collection = Backbone.Collection.extend({
        model: Model,

        url: '/posts/'
    });

    return Collection;
});