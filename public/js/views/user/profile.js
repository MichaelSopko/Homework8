/**
 * Created by Michael on 18.10.2015.
 */

define(['models/user','text!templates/profile.html','models/post','Session'], function(User, userTemplate, Post,Session){

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
            var thisEl = this.$el;
            var message = thisEl.find('#message').val();
            var user = Session.get('user');

            var data = {
                name: message,
                _creator: user
            };

            var post = new Post(data);

            post.save({}, {
                success: function (model) {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate( '#users/' + user._id, {trigger: true});
                },
                error: function (response, xhr) {
                    alert(response.status);
                }
            });
        },

        render: function(options){
            var user = options;
            this.$el.html(this.template({user: user}));
            return this;
        }
    });

    return View;
});