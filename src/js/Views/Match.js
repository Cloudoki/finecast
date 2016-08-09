define (
	['mustache', 'backgrid', 'Views/Pageview',
	'Views/Panels/List', 'Utilities/backgrid/DeleteCell'],
	function (Mustache, Backgrid, Pageview, ListPanel, DeleteCell)
	{

		var Match = Pageview.extend(
		{
			title : "Match",

			render: function ()
			{

				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				// Accounts
				var grid = (new AccountsView()).accountsgrid ();
				var accountslist = new ListPanel ({title: 'Accounts', grid: grid, addNew: {required: grid.collection.required}});
				this.appendPanel (accountslist, 6);

				grid.collection.on('newaccount:save', function() {
					this.fetch ({reset: true});
				});

				grid.collection.fetch ({reset: true});

				// Users
				grid = (new UsersView()).usersgrid ();
				var userslist = new ListPanel ({title: 'Users', grid: grid, addNew: {required: grid.collection.required}});
				this.appendPanel (userslist, 6);

				grid.collection.on('newuser:save', function() {
					this.fetch ({reset: true});
				});

				grid.collection.fetch ({reset: true});

				return this;
			}

		});

		return Match;
	}
);
