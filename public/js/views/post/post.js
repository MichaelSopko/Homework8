define(['models/post','text!templates/post.html','Session'], function(Post, postTemplate, Session){

	var View = Backbone.View.extend({
		el: '#contentHolder',
		template: _.template(postTemplate),

		events: {
			'click #post-button': 'createPost'
		},

		initialize: function(options){
			this.render(options);
		},

		createPost: function() {
			var thisEl = this.$el;
			var message = thisEl.find('#message').val();
			this.user = this.user || Session.get('user');;

			var data = {
				name: message,
				_creator: this.user
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

		render: function(options){
			var collection = options.collection.toJSON();
			this.$el.html(this.template({posts: collection}));
			return this;
		}
	});

	return View;
});