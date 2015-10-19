define([
	'Session',
	'text!templates/homeTemplate.html'
], function(Session, homeTemplate){

	var HomeView = Backbone.View.extend({
		el: "#container",
		template : _.template(homeTemplate),

		events : {
			'click .logout' : 'logout',
			'click #my-page' : 'page'
		},

		initialize: function(){
			this.render();
		},
		logout : function(){
			var view = this;
			Session.clear();
			Backbone.history.navigate('', { trigger : true });
			view.render();
		},

		page: function(){
			console.log(this.url);

			var user = Session.get("user");
			Backbone.history.navigate('#users/' + user._id, { trigger : true });
		},

		render : function(){
			this.user = this.user || Session.get('user');
			this.$el.html(this.template({
				user : this.user
			}));
			return this;
		}
	});

	return HomeView;

});