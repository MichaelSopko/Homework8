/**
 * Created by Michael on 20.10.2015.
 */
define([
    'Session',
    'text!templates/sidebar.html'
], function(Session, sidebarTemplate){

    var View = Backbone.View.extend({
        el: "#sidebar",
        template : _.template(sidebarTemplate),

        events : {
            'click #my-page' : 'page'
        },

        initialize: function(){
            this.render();
        },

        page: function(){
            var user = Session.get("user");
            Backbone.history.navigate('#users/' + user._id, { trigger : true });
        },

        render : function(){
            var user = Session.get('user');
            this.$el.html(this.template({
                user : user
            }));
            return this;
        }
    });

    return View;

});