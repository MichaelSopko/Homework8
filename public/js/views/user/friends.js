
define(['models/user','text!templates/user/friends.html','models/post', 'Cookie'],
    function(User, userTemplate, Post, Cookie){

        var View = Backbone.View.extend({
            el: '#contentHolder',
            template: _.template(userTemplate),

            events: {

            },

            initialize: function(options){
                this.render(options);
            },

            render: function(){
                var self = this;
                var user =  this.model;
                console.log("<<==PROFILE==>>");

                self.$el.html(self.template({
                    user: user
                }));

                return this;
            }
        });

        return View;
    });