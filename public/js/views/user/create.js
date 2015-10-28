define(['models/user','text!templates/user/create.html'], function(UserModel, createTemplate){

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
            var phone = thisEl.find('#input-phone').val();

            var data = {
                firstName: firstName,
                lastName: lastName,
                login: login,
                password: pass,
                email: email,
                dateOfBirth: date,
                phone: phone
            };

            var user = new UserModel(data);
            user.save({}, {
                success: function(){
                    console.log("ok");
                    Backbone.history.navigate('#login', {trigger: true});
                },
                error: function(response, xhr){
                    window.location.replace('#registration');
                    $("#err").html(xhr.responseText).addClass('alert-danger');
                    //alert(xhr.responseText);
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