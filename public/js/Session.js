define(['Backbone', 'router'], function( Backbone, Router){

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

		clear : function(){
			localStorage.clear();
		}
	});

	return new SessionModel();	
});