define(['models/user','text!templates/user/users.html', 'views/user/user'], function(User, userTemplate, UserView){

	var View = Backbone.View.extend({
		el: '#contentHolder',
		template: _.template(userTemplate),

		events: {
			"click #find-user":'find'
		},

		initialize: function(){
			this.render();
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