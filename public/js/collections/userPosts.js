/**
 * Created by Michael on 24.10.2015.
 */
define(['models/post'], function(Model){

    var Collection = Backbone.Collection.extend({
        model: Model,


       /* "url": function() {
            return '/users/' + this.get('id') + '/posts/'
        }*/
    });

    return Collection;
});