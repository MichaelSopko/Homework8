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


            $.ajax({
                url: "/login",
                method: "POST",
                data: form.serialize(),
                complete: function () {
                    console.log('complete..');
                    var sidebarView = new SidebarView();
                    var headerView = new HeaderView();
                },
                statusCode: {
                    200: function(response){
                        //form.html  ("Welcome").addClass('alert-success');
                        window.location.replace('#');
                       /* var userId = response.user;
                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#users/' + userId, { trigger : true });*/

                    },
                    404: function(){
                        alert("404")
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