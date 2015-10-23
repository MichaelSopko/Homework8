/**
 * Created by Michael on 23.10.2015.
 */
define(['models/user','text!templates/user/user.html'], function(User, userTemplate){

    var View = Backbone.View.extend({
        tagName: 'tr',
        template: _.template(userTemplate),

        events: {
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.template({user: this.model.toJSON()}));
            return this;
        }
    });

    return View;
});