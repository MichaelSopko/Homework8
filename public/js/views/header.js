define([
    'Session',
    'text!templates/header.html'
], function(Session, headerTemplate){

    var HeaderView = Backbone.View.extend({
        el: "#header",
        template : _.template(headerTemplate),

        events : {
            'click .logout' : 'logout'
        },

        initialize: function(){
            this.render();
        },

        logout : function(){
            var view = this;
            Session.logout();
            //Session.clear();
            Backbone.history.navigate('', { trigger : true });
            view.render();
        },

        render : function(){
            var user = Session.get('user');
            this.$el.html(this.template({
                user : user
            }));
            return this;
        }
    });

    return HeaderView;

});