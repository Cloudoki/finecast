define (
	['backbone', 'mustache', 'config'],
	function (Backbone, Mustache, Line, config)
	{
		var Entry = Backbone.View.extend({
			
			className: 'entry',
			
			initialize: function (options)
			{
				this.model = options.model;
			},
			
			render: function (options)
			{
				// Get template
				this.$el.html (this.model.name);

				return this;
			},
		});

		return Entry;
	}
);