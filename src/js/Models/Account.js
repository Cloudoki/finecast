define (
	['backbone'],
	function (Backbone)
	{
		var Account = Backbone.Model.extend({
		
			typestring: 'accounts',
			
			url: function ()
			{
				var url = App.config.url + this.typestring;
				
				if (this.id) url += '/' + this.id;
				
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}
		});
		
		return Account;
	}
);