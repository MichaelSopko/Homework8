/**
 * Created by Michael on 10.10.2015.
 */
define(['models/user','views/HomeView', 'views/user/user', 'collections/users', 'views/user/create','views/login',
        'views/post/post','collections/posts', 'views/user/profile','views/chat'],
    function(User, HomeView, UserView, UserCollection, Create, Login, PostView, PostCollection, ProfileView, ChatView){

    var Router = Backbone.Router.extend({
        routes: {
            "registration":"registration",
            "login":"login",
            "users(/:userId)": "user",
            "posts": "posts",
            '':"index",
            'chat':"chat",
            "*any": "any"
        },

        initialize: function(){
            this.index();
        },

        chat:function(){
            var homeView = new HomeView();
            var chatView = new ChatView();
        },

        index: function(){
            var homeView = new HomeView();
        },
        login: function(){
            var homeView = new HomeView();
            var login = new Login();
        },
        registration: function(){
            var homeView = new HomeView();
            var create = new Create();
        },
        users: function(){
            var userCollection = new UserCollection();
            var userRenderView = function(){
                var view = new UserView({
                    collection: userCollection
                });
            };
            userCollection.fetch({reset:true});
            userCollection.bind('reset', userRenderView);
        },

        user: function(userId){
            var self = this;
            var collection;
            var renderView;
            var user;
            var homeView = new HomeView();

            if(!userId) {
                collection = new UserCollection();

                collection.unbind();
                renderView = function () {
                    if (self.userView) {
                        self.userView.undelegateEvents();
                    }

                    self.userView = new UserView({
                        collection: collection
                    });
                    return self;
                };

                collection.fetch({reset: true});
                collection.bind('reset', renderView, this);
            } else {
                user = new User({_id: userId});
                user.fetch({
                    success: function(model, response){
                        self.userView = new ProfileView(model.toJSON());
                    },
                    error: function(model, response){
                        alert(response.text);
                    }
                });
            }
        },

        posts: function(){
            var self = this;
            var postCollection;
            var postRenderView;

            var homeView = new HomeView();

            postCollection = new PostCollection();
            postCollection.unbind();
            postRenderView = function(){
                if (self.postView) {
                    self.postView.undelegateEvents();
                }

                self.postView = new PostView({
                    collection: postCollection
                });

                return self;
            };
            postCollection.fetch({reset:true});
            postCollection.bind('reset', postRenderView, this);
        },

        any: function(){
            alert("404 Not found")
        }
    });

    return Router;
});