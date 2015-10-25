define(['models/user','text!templates/user/users.html', 'views/user/user'], function(User, userTemplate, UserView){

	var View = Backbone.View.extend({
		el: '#contentHolder',
		template: _.template(userTemplate),

		events: {
			"click #find-user":'find',
			"click h1":'userPage'
		},

		initialize: function(){
			this.render();
		},

		userPage: function(e){
			var targetEl = $(e.target);
			var el = targetEl.closest('div');
			var id = el.attr('id');
			Backbone.history.navigate('#users/' + id, {trigger: true});
		},

		find: function(){
			var thisEl = this.$el;
			var users = thisEl.find('#find').val();
			alert(users);
		},

		render: function(){
			this.$el.html(this.template());
			this.collection.each(function(user){
				var view = new UserView({model: user});
				$('#userList').append(view.el);
			}, this);
			return this;
		}
	});

	return View;
});