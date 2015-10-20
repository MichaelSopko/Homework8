define([
	'Session',
	'text!templates/homeTemplate.html'
], function(Session, homeTemplate){

	var HomeView = Backbone.View.extend({
		el: "#contentHolder",
		template : _.template(homeTemplate),

		events : {
		},

		initialize: function(){
			this.render();
		},

		render : function(){
			var user = Session.get('user');
			this.$el.html(this.template({
				user : user
			}));
			return this;
		}
	});

	return HomeView;

});