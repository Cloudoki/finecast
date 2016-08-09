define (
	['backbone'],
	function (Backbone)
	{
		var Channel = Backbone.Model.extend({
		
			typestring: 'channels',
			
			url: function ()
			{
				var url = App.config.url + this.typestring;
				
				if (this.id) url += '/' + this.id;
				
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}
		});
		
		return Channel;
	}
);