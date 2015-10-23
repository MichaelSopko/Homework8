/**
 * Created by Michael on 23.10.2015.
 */
define(['models/post','text!templates/post.html'], function(User, postTemplate){

    var View = Backbone.View.extend({
        tagName: 'li',
        template: _.template(postTemplate),

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.template({post: this.model.toJSON()}));
            return this;
        }
    });

    return View;
});