/**
 * Created by Michael on 18.10.2015.
 */
define(['text!templates/chat.html', 'Cookie'], function(chatTemplate, Cookie){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(chatTemplate),

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            var user = Cookie.get("user");
            this.$el.html(this.template({
                user: user
            }));
            return this;
        }
    });

    return View;
});