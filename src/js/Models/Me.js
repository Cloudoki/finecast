define (
	['Models/User'],
	function (User)
	{
		var Me = User.extend({
		
			url: function () 
			{
				return App.config.url + "me?" + $.param ({display: 'full'});
			}
		});
		
		return Me;
	}
);