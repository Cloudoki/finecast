define (
	['backbone', 'mustache'],
	function (Backbone, Mustache)
	{
		var Pageview = Backbone.View.extend({

			title: "Page",
			className: "container-fluid",
			span: 0,
			panels: [],
			panelviews: [],
			events: {
				'remove': 'destroy'
			},

			render: function ()
			{
				// Build Pageview
				this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

				// Panels parent
				this.$container = this.$el.find("#container").eq(0);

				// Append panels
				this.appendPanels();

				return this;
			},
			
			appendRow: function(row, rowclass) {

				this.$container.append(Mustache.render (Templates.row, {'class' : rowclass}));
				this.$container.find('section').last().append( row.render().el );

				this.panelviews.push(row);

				return this;
			},


			appendPanels: function() {

				for(var n in this.panels)
				{
					var panel = this.panels[n].view(this.panels[n].data);

					this.appendPanel(panel, this.panels[n].size);
				}
			},

			appendPanel: function(panel, span, rowclass) {

				if(!this.span || span === 0)
				{
					this.$container.append( rowclass? 
						Mustache.render (Templates.row, {'class' : rowclass}):
						Templates.row
					);
				}

				this.span = (span + this.span < 12)? span + this.span : 0;

				if(panel)
				{
					this.$container.children().last().append( panel.render().el );

					this.panelviews.push(panel);

					panel.$el.addClass("col-md-" + span);
				}
				
				return this;
			},

			appendhtml: function(html)
			{
				this.$container.children().last().append(html);
			},

			cleanviews: function ()
			{
				if(this.panelviews.length)
				{
					this.destroy();
					this.panelviews = [];
				}
			},

			destroy: function ()
			{
				$.each(this.panelviews, function(i, view){ view.remove() });
			}
		});

		return Pageview;
	}
);
