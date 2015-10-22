/**
 * Created by Michael on 20.10.2015.
 */
define(['text!templates/sidebar.html','models/user', 'Cookie'],
    function(sidebarTemplate, User, Cookie){

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
            var userId = Session.get("user");
            Backbone.history.navigate('#users/' + userId, { trigger : true });
        },

        render : function(){
            var user;
            var self = this;
            var userId = Cookie.get('user');
            console.log("<<==SIDEBAR==>>");

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

    return View;

});