define(['models/post','text!templates/posts.html','Cookie', 'views/post/post'], function(Post, postTemplate, Cookie,PostView){

	var View = Backbone.View.extend({
		el: '#contentHolder',
		template: _.template(postTemplate),

		events: {
			'click #post-button': 'createPost'
		},

		initialize: function(){
			this.render();
		},

		createPost: function() {
			var thisEl = this.$el;
			var message = thisEl.find('#message').val();
			var user = Cookie.get('user');

			var data = {
				name: message,
				_creator: user
			};

			var post = new Post(data);

			post.save({}, {
				success: function (model) {
					Backbone.history.fragment = '';
					Backbone.history.navigate( "#posts", {trigger: true});
				},
				error: function (response, xhr) {
					alert(response.status);
				}
			});
		},

		render: function(){
			this.$el.html(this.template());
			this.collection.each(function(post){
				var view = new PostView({model: post});
				$('#postList').append(view.el);
			}, this);
			return this;
		}
	});

	return View;
});