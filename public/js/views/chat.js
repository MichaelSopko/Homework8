/**
 * Created by Michael on 18.10.2015.
 */

define(['text!templates/chat.html','Session'], function(chatTemplate, Session){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(chatTemplate),

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            var user = Session.get("user");
            this.$el.html(this.template({
                user: user
            }));
            return this;
        }
    });

    return View;
});