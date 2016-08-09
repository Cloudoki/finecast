define (
	['mustache', 'Views/Panel', 'Views/Components/Line', 'Views/Components/BankLine', 'Views/Components/Entry', 'config', 'moment'],
	function (Mustache, Panel, Line, BankLine, Entry, config, moment)
	{
		var Column = Panel.extend({
			
			className: "panel",
			events: {},
			//entries: [],

			initialize: function (options)
			{
				this.options = options;

				// Template data
				var params = this;
				
				// Get template
				this.$el.html (Mustache.render (Templates.column, params));
				this.$container = this.$el.find("ul.list").eq(0);
				
				return this;
			},
			
			render: function ()
			{
				// Get template
				this.$el.html (Mustache.render (Templates.column, this.options));
				this.$container = this.$el.find("ul.list").eq(0);
				
				return this;
			},
			
			addlines: function (count) 
			{
				this.contents = [];
				
				for (var n = 0; n < count; n++)
				{
					var line = new Line ({});
					this.contents.push (line);
					
					this.$container.append (line.render().el);
				}
			},
			
			banklines: function (count) 
			{
				this.contents = [];
				
				for (var n = 0; n < count; n++)
				{
					var line = new BankLine ({});
					this.contents.push (line);
					
					this.$container.append (line.render().el);
				}
			},
			
			datelines: function () 
			{
				// Calculate end date
				var end = moment().add(config.datespan, 'months').format("X"),
				iterator = moment().subtract(2, 'weeks');
				this.contents = [];
				
				while (iterator.format("X") < end)
				{
					iterator.add(1, "days");
					
					if (config.paydays.indexOf (Number (iterator.format("d"))) >= 0)
						
						this.contents.push (new Line ({content: iterator.format("ddd, D MMM YY"), moment: iterator.clone()}));
				}
				
				// Fill template
				for (n in this.contents)
				
					this.$container.append (this.contents[n].render().el);
			},
			
			addentries: function (dates, entries)
			{
				var entries = this.sortentries(entries);

				for (i in entries)
				
					for (n in dates) if(moment(entries[i].estimation, "YYYY-MM-DD hh:mm:ss").isBefore(dates[n].options.moment)) 
					{
						var entry = new Entry({model: entries[i]});
						
						this.contents[n].$el.find('.items').append (entry.render().el);
						this.contents[n].calculate(entries[i].value);
						
						break;
					}
			},
			
			sortentries: function (items)
			{
				// sort by value
				items.sort(function (a, b) {
				  if (a.estimation > b.estimation) {
				    return 1;
				  }
				  if (a.estimation < b.estimation) {
				    return -1;
				  }
				  // a must be equal to b
				  return 0;
				});
				
				return items;
			}
		});

		return Column;
	}
);
