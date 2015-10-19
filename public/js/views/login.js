define(['text!templates/login.html','Session'], function( loginTemplate, Session){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(loginTemplate),

        events: {
            'click #login-button': 'login'
        },

        login: function(){
            var form = $('.login-form');

            $.ajax({
                url: "/login",
                method: "POST",
                data: form.serialize(),
                complete: function () {
                    console.log('complete..');
                },
                statusCode: {
                    200: function(response){
                        form.html  ("Welcome").addClass('alert-success');
                        Session.set('user', JSON.stringify(response.user));
                        Session.set('authenticated', true);
                        if(Session.get('redirectFrom')){
                            var path = that.get('redirectFrom');
                            Session.unset('redirectFrom');
                            Backbone.history.navigate(path, { trigger : true });
                        }else{
                            //Backbone.history.fragment = '';
                            var user = Session.get("user");
                            Backbone.history.navigate('#users/' + user._id, { trigger : true });
                        }
                    },
                    404: function(){
                        alert("404")
                    }
                }
            });
            return false;
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            var user = Session.get("user");
            this.$el.html(this.template({user: user}));
            return this;
        }
    });

    return View;
});