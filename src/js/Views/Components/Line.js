define (
	['backbone', 'mustache', 'config'],
	function (Backbone, Mustache, config)
	{
		var Line = Backbone.View.extend({
			
			className: "line",
			tagName: "li",
			events: {},
			sum: 0,
			
			initialize: function (options)
			{
				// Routing triggers
				this.options = options;
			},

			render: function ()
			{
				// Get template
				this.$el.html (Mustache.render (Templates.line, this.options));
				//this.$container = this.$el.find(".panel-body").eq(0);
				
				return this;
			},
			
			calculate: function (value)
			{
				this.sum += Number(value);
				
				this.$el.attr('data-sum', Math.round(this.sum *100)/100);
				this.$el.find('.amount').html ('&euro;' + (Math.round(this.sum *100)/100).toLocaleString());
			}
		});

		return Line;
	}
);
