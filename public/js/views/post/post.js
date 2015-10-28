/**
 * Created by Michael on 23.10.2015.
 */
define(['models/post','text!templates/post/post.html', 'Cookie'], function(Post, postTemplate, Cookie){

    var View = Backbone.View.extend({
        tagName: 'li',
        template: _.template(postTemplate),

        events: {
            'click #delete-post': 'deletePost'
        },

        initialize: function(){
            this.render();
        },

        deletePost: function(e) {
            var targetEl = $(e.target);
            var el = targetEl.closest('.well');
            var id = el.attr('id');
            var post = new Post({_id: id});
            console.log(post);
            post.destroy({
                success: function(){
                    el.remove();
                },
                error: function(){
                    alert('error');
                }
            });

            return;
        },

        render: function(){
            var user = Cookie.get("user");
            this.$el.html(this.template({
                post: this.model.toJSON(),
                user: user
            }));
            return this;
        }
    });

    return View;
});