define(
	['backbone', 'mustache', 'Models/Me'],
	function (Backbone, Mustache, Me)
	{
		Session =
		{
			user : null,

			authenticate: function (fallback)
			{
				var token = window.localStorage.getItem ('token');

				// Check if there is authentication
				if(token || fallback)
					this.authenticationtoken = token && token.length >= 18? token: fallback;

				else window.location = "/login.html";
			},


			// Loads logged user data
			loadEssentialData : function (callback)
			{
				if (!this.authenticationtoken)	return;

				// Load me.
				this.user = new Me ();
				this.user.fetch({error: this.revoke});
				
				// Load storage.
				

				// Continue
				callback ();
			},

			revoke: function ()
			{
				this.user = this.authenticationtoken = null;
				window.localStorage.removeItem ('token');

				if (!App.passthrough)

					window.location = "/login.html";
			},

			isLoaded : function ()
			{
				return this.user !== null;
			},

			render: function ()
			{
				// Do some rendering
				$('#page').html (this.view.render ().el);
			},

			setView: function (view)
			{
				// Remove the old
				if (this.view) this.view.remove();

				Session.trigger('destroy:view');

				this.view = view;

				this.render();
			},
			
			/**
			 *	Accounts shortcut functions
			 **/
			getAccount : function (id)
			{
				return (id)? this.user.accounts.get(id):  this.user.account;
			},

			getAccounts : function (id)
			{
				return this.user.accounts;
			},
			
			/**
			 *	Channels shortcut functions
			 **/
			
			getChannel : function (id)
			{
				return (typeof id == "number")? this.user.account.channels.get(id): this.user.account.channels.findWhere({type: id});
			},
			
			getChannels : function (id)
			{
				return this.user.account.channels;
			},
		};

		// Add events
		_.extend(Session, Backbone.Events);

		return Session;
	}
);
