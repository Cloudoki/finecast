define (
	['backbone'],
	function (Backbone)
	{
		var Entry = Backbone.Model.extend({
		
			typestring: 'entries',
			
			url: function ()
			{
				var url = App.config.url + this.typestring;
				
				if (this.id) url += '/' + this.id;
				
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}
		});
		
		return Entry;
	}
);