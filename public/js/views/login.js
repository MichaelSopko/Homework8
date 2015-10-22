define(['text!templates/login.html'], function( loginTemplate){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(loginTemplate),

        events: {
            'click #login-button': 'login'
        },

        initialize: function(){
            this.render();
        },

        login: function(){
            var self = this;
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
                        var userId = response.user;
                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#users/' + userId, { trigger : true });
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