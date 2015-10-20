define(['models/user','text!templates/create.html'], function(User, createTemplate){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(createTemplate),

        events: {
            'click #create-button': 'create'
        },

        initialize: function(){
            this.render();
        },

        create: function() {
            var thisEl = this.$el;
            var firstName = thisEl.find('#input-firstname').val();
            var lastName = thisEl.find('#input-lastname').val();
            var login = thisEl.find('#input-login').val();
            var pass = thisEl.find('#input-password').val();
            var email = thisEl.find('#input-email').val();
            var date = thisEl.find('#input-date').val();

            var data = {
                firstName: firstName,
                lastName: lastName,
                login: login,
                password: pass,
                email: email,
                dateOfBirth: date
            };

            var user = new User(data);

            user.save({}, {
                success: function(model){
                    Backbone.history.navigate('#login', {trigger: true});
                },
                error: function(response, xhr){
                    alert(response.status);
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