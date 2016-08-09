define (
	['mustache', 'Views/Components/Line', 'config'],
	function (Mustache, Line, config)
	{
		var BankLine = Line.extend({
			
			render: function (options)
			{
				// Get template
				this.$el.html (Mustache.render (Templates.bank_line, this.options));

				return this;
			},
		});

		return BankLine;
	}
);