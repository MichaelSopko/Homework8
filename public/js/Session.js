define(['Backbone'], function(Backbone){

	var SessionModel = Backbone.Model.extend({
		
		url : '/session',

		initialize : function(){
		},

		get : function(key){
			return JSON.parse(localStorage.getItem(key));
		},

		set : function(key, value){
			localStorage.setItem(key, value);
		},

		unset : function(key){
			localStorage.removeItem(key);
		},

		getAuth : function(callback){
			var self = this;
			var Session = this.fetch();

			Session.done(function(response){
				self.set('user', JSON.stringify(response.user));
				self.set('authenticated', true);
			});

			Session.fail(function(response){

			});

			Session.always(callback);
		},

		logout : function(callback){
			var self = this;
			$.ajax({
				url : '/logout',
				type: 'DELETE'
			}).done(function(response){
				//Clear all session data
				self.clear();
				callback();
			});
		},

		clear : function(){
			localStorage.clear();
		}
	});

	return new SessionModel();	
});