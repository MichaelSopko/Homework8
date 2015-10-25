define(['models/user','text!templates/user/posts.html','models/post', 'Cookie', 'views/post/post'],
function(User, userTemplate, Post, Cookie, PostView){

    var View = Backbone.View.extend({
        el: '#userPosts',
        template: _.template(userTemplate),

        events: {
            'click #send-button': 'createPost'
        },

        initialize: function(options){
            this.render(options);
        },

        createPost: function(e) {
           // if(!this.e) {
                this.e = e;

                var targetEl = $(e.target);
                var el = targetEl.closest('.page-container');
                var pageId = el.attr('id');

                var self = this;
                var thisEl = this.$el;
                var message = thisEl.find('#message').val();
                var creator = Cookie.get('user');

                var data = {
                    text: message,
                    _creator: creator
                };

                var post = new Post(data);
                var url = post.urlRoot();
                post.url = url + '/' + pageId;
             //}
            post.save({}, {
                success: function (model) {
                    console.log('=================================================================');

                    self.addOne(model);
                    thisEl.find('#message').val('');
                },
                error: function (response, xhr) {
                    alert(response.status);
                }
            });
        },

        addOne: function(post){
            var view = new PostView({model: post});
            $('#postList').append(view.el);
        },

        render: function(){
            this.$el.html(this.template());
            this.collection.forEach(this.addOne, this);
            return this;
        }
    });

    return View;
});