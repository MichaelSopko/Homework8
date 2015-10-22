define(['text!templates/homeTemplate.html'], function(homeTemplate){

	var HomeView = Backbone.View.extend({
		el: "#contentHolder",
		template : _.template(homeTemplate),

		events : {
		},

		initialize: function(){
			this.render();
		},

		render : function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return HomeView;

});