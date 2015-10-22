define(['text!templates/header.html','models/user', 'Cookie'
], function(headerTemplate, User, Cookie){

    var HeaderView = Backbone.View.extend({
        el: "#header",
        template : _.template(headerTemplate),

        events : {
            'click .logout' : 'logout'
        },

        initialize: function(){
            this.render();
        },

        logout : function(callback){
            var view = this;

            $.ajax({
                url : '/logout',
                type: 'DELETE'
            }).done(function(response){
                callback();
            });

            Backbone.history.navigate('', { trigger : true });
            view.render();
        },

        render : function(){
            var user;
            var self = this;
            var userId = Cookie.get('user');
            console.log("<<==HEADER==>>");
            if(userId){
                user = new User({_id: userId});
                user.fetch({
                    success: function(model, response){
                        self.$el.html(self.template({
                            user: model.toJSON()
                        }));
                    },
                    error: function(response){
                        alert(response.text);
                    }
                });
            }else{
                self.$el.html(self.template({
                    user:  null
                }));
            }

            return this;
        }
    });

    return HeaderView;

});