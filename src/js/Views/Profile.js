define (
	['mustache', 'Views/Pageview', 'Views/Panel', 'Session', 'Views/Panels/Iframe'],
	function (Mustache, Pageview, Panel, Session, IframePanel)
	{
		var Page = Pageview.extend(
		{

			render: function ()
			{

				// Build Pageview
				this.$el.html (Mustache.render (Templates.home, {}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				return this;
			}

		});

		return Page;
	}
);
