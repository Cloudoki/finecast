define (
	['backbone', 'mustache', 'config'],
	function (Backbone, Mustache, config)
	{
		var Footer = Backbone.View.extend({

			className: "footer",
			tagName: "nav",
			
			initialize: function ()
			{
				// Routing triggers
				this.listenTo(App.router, 'route', this.setActive);

				this.listenTo(Session.user, 'sync', this.renderUser)
			},

			render: function ()
			{
				// Build Navigation
				this.$el.html (Mustache.render (Templates.footernav, {total: "€ 0,00"}));

				return this;
			}
		});

		return Footer;
	}
);
