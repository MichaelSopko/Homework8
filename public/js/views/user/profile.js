/**
 * Created by Michael on 18.10.2015.
 */

define(['models/user','text!templates/profile.html','models/post', 'Cookie'],
    function(User, userTemplate, Post, Cookie){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(userTemplate),

        events: {
            'click #send-button': 'createPost'
        },

        initialize: function(options){
            this.render(options);
        },

        createPost: function() {
            var self = this;
            var message = self.$el.find('#message').val();
            var userId = this.model;

            var data = {
                name: message,
                _creator: userId
            };

            var post = new Post();

            post.save(data, {
                success: function (model) {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate( '#users/' + userId, {trigger: true});
                },
                error: function (response, xhr) {
                    alert(response.status);
                }
            });
        },

        render: function(options){
            var self = this;
            var user =  this.model;
            console.log("<<==PROFILE==>>");

            self.$el.html(self.template({
                user: user
            }));

            return this;
        }
    });

    return View;
});