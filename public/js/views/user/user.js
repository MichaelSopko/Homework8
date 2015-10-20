
define(['models/user','text!templates/user.html'], function(User, userTemplate){

	var View = Backbone.View.extend({
		el: '#contentHolder',
		template: _.template(userTemplate),

		events: {
			"click #find-user":'find'
		},

		initialize: function(options){
			this.render(options);
		},

		find: function(){
			var thisEl = this.$el;
			var users = thisEl.find('#find').val();
			alert(users);
		},

		render: function(options){
			var collection = options.collection.toJSON();
			this.$el.html(this.template({users: collection}));
			return this;
		}
	});

	return View;
});