define(
	['backbone', 'Session', 'Views/Home', 'Views/Match', 'Views/Models','Views/Model', 'Views/Profile'],
	function (Backbone, Session, Home, Match, Models, Model, Profile)
	{
		var Router = Backbone.Router.extend (
		{
			routes :
			{
				'match': 'match',
				'models': 'models',
				'models/:id': 'model',
				'profile': 'profile',
				'login': 'logout',
				'logout': 'logout',
				'*path': 'home'
			},

			/**
			 *	General
			 **/

			home : function ()
			{
				Session.setView (new Home ());
			},
			
			match : function ()
			{
				Session.setView (new Match ());
			},

			models : function ()
			{
				Session.setView (new Models ());
			},

			model : function (id)
			{
				Session.setView (new Model(id));
			},

			profile : function ()
			{
				Session.setView (new Profile ());
			},

			logout : function ()
			{
				Session.revoke ();
			},

		});

		return Router;
	}
);
