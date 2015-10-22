/**
 * Created by Michael on 10.10.2015.
 */
define(['models/user','views/header', 'views/sidebar', 'views/HomeView', 'views/user/user',
        'collections/users', 'views/user/create','views/login', 'views/post/post',
        'collections/posts', 'views/user/profile','views/chat'],
    function(User, HeaderView, SidebarView, HomeView, UserView,
             UserCollection, Create, Login, PostView,
             PostCollection, ProfileView, ChatView){

    var Router = Backbone.Router.extend({
        routes: {
            '':"index",
            "registration":"registration",
            "login":"login",
            "users(/:userId)": "user",
            "posts": "posts",
            "chat":"chat",
            "*any": "any"
        },

        initialize: function(){
            var headerView = new HeaderView();
            var sidebarView = new SidebarView();
        },

        index: function(){
            var homeView = new HomeView();
        },

        chat:function(){
            var chatView = new ChatView();
        },

        login: function(){
            var login = new Login();
        },

        registration: function(){
            var create = new Create();
        },

        user: function(userId){
            console.log("======init======");
          //  this.initialize();

            var self = this;
            var collection;
            var renderView;
            var user;

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
            }else {
                user = new User({_id: userId});
                user.fetch({
                    success: function(model, response){
                        self.userView = new ProfileView({model: model.toJSON()});
                    },
                    error: function(model, response){
                        alert(model, response);
                    }
                });
            }
        },

        posts: function(){
            var self = this;
            var postCollection;
            var postRenderView;

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