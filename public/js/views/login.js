define(['text!templates/login.html','views/user/profile','views/header', 'views/sidebar'],
    function(loginTemplate, ProfileView, HeaderView, SidebarView){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(loginTemplate),

        events: {
            'click #login-button': 'login'
        },

        initialize: function(){
            this.render();
        },

        login: function(e){
            e.preventDefault();
            var self = this;
            var form = $('.login-form');
            console.log(form.serialize());

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
                       // window.location.replace('#');
                        var userId = response.user;
                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#users/' + userId, { trigger : true });

                    },
                    500: function(response){
                        window.location.replace('#login');
                        $("#error").html(response.responseText).addClass('alert-danger');
                        //alert(response.responseText);
                    }
                }
            });
            return false;
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });

    return View;
});