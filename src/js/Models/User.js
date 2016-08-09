define (
	['backbone'],
	function (Backbone)
	{
		var User = Backbone.Model.extend({
		
			typestring: 'users',

		});
		
		return User;
	}
);