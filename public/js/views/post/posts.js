define(['models/post','text!templates/post/posts.html','Cookie', 'views/post/post'], function(Post, postTemplate, Cookie,PostView){

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
			var self = this;
			var thisEl = this.$el;
			var message = thisEl.find('#message').val();
			var user = Cookie.get('user');

			var data = {
				text: message,
				_creator: user
			};

			var post = new Post(data);

			post.save({}, {
				success: function (model) {
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
			this.collection.each(this.addOne, this);
			return this;
		}
	});

	return View;
});