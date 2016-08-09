define (
	['mustache', 'Views/Pageview', 'Views/Panels/Column', 'Collections/Channels'],
	function (Mustache, Pageview, ColumnView, Channels)
	{
		var Page = Pageview.extend(
		{
			initialize : function ()
			{
				this.channels = new Channels ();
				
				// Listen for changes
				this.listenTo(this.channels, 'sync', this.fill);
			},
			
			render: function ()
			{
				// Build Pageview
				this.$el.html (Mustache.render (Templates.home_grid, {}));

				// Panel parents
				this.$dates =  this.$el.find(".left-dates").eq(0);
				this.$bank =  this.$el.find(".bank").eq(0);
				this.$left =  this.$el.find(".left-group").eq(0);
				this.$right = this.$el.find(".right-group").eq(0);

				// Dates
				this.dates_column = new ColumnView ({title: "Pay-day"});
				this.$dates.append (this.dates_column.render().el);
				this.dates_column.datelines();

				this.dates = this.dates_column.contents;

				// Bank
				this.bank_column = new ColumnView ({title: "Bank"});
				this.$bank.append (this.bank_column.render().el);
				this.bank_column.banklines(this.dates.length);
				
				// Load channels
				this.channels.fetch();
								
				return this;
			},
			
			fill : function (proc, models) 
			{
				for (n in models)
				{
					// Append column
					var column = new ColumnView ({title: models[n].name, model: models[n]});
					
					if(models[n].incoming)
						 
						 this.$left.append (column.render().el).attr('data-count', this.$left.children().length);
					else this.$right.append (column.render().el).attr('data-count', this.$right.children().length);
					
					column.addlines(this.dates.length);
					
					// Append Entries
					entries = models[n].entries;
					
					if(entries && entries.length)
						column.addentries(this.dates, entries);
				}
			}
		});

		return Page;
	}
);
