/**
 * Created by Michael on 18.10.2015.
 */

define(['models/user','text!templates/user/profile.html','models/post', 'Cookie', 'views/user/posts', 'collections/userPosts'],
    function(User, userTemplate, Post, Cookie, UserPostsView, UserPostCollection){

    var View = Backbone.View.extend({
        el: '#contentHolder',
        template: _.template(userTemplate),

        events: {
            'click .add-friend': 'addFriend'
        },

        initialize: function(options){
            this.render(options);
        },

        addFriend: function(e){
            var targetEl = $(e.target);
            var el = targetEl.closest('.contact-container');
            var id = el.attr('id');
            var userId = Cookie.get("user");

            console.log(id);
            console.log(userId);

            var user = new User({_id: userId});

            user.save({friend: id}, {
                success: function (model) {
                    //self.render();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate( '#users/' + userId, {trigger: true});
                },
                error: function (response, xhr) {
                    alert(response.status);
                }
            });
        },

        render: function(){
            var self = this;
            var user =  this.model;
            console.log("<<==PROFILE==>>");

            self.$el.html(self.template({
                user: user
            }));
            var urlUs = '/users/' + user._id + '/posts';

            var postCollection = new UserPostCollection();
            postCollection.url = urlUs;
            postCollection.unbind();
            var postRenderView = function(){
                if (self.postView) {
                    self.postView.undelegateEvents();
                }

                self.postView = new UserPostsView({
                    collection: postCollection
                });

                return self;
            };
            //var user1 = new UserModel({_id: userId});

            postCollection.fetch({reset:true});
            postCollection.bind('reset', postRenderView, this);

            //return this;
        }
    });

    return View;
})