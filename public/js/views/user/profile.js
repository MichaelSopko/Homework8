/**
 * Created by Michael on 18.10.2015.
 */

define(['models/user','text!templates/profile.html'], function(User, userTemplate){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(userTemplate),

        events: {
        },

        initialize: function(options){
            this.render(options);
        },

        render: function(options){
            var user = options;
            this.$el.html(this.template({user: user}));
            return this;
        }
    });

    return View;
});