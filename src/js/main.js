require.config(
{
	baseUrl : '/js/',
	shim:
	{
		bootstrap: {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		backgrid: {
			deps: ['jquery','backbone','underscore'],
			exports: 'Backgrid'
		}
	},
	paths:
	{
		backbone:	'/vendor/backbone/backbone-min',
		backgrid:	'/vendor/backgrid/lib/backgrid',
		bootstrap:	'/vendor/bootstrap/dist/js/bootstrap.min',
		chosen: 	'/vendor/chosen/chosen.jquery',
		jquery:		'/vendor/jquery/dist/jquery.min',
		moment:		'/vendor/moment/min/moment.min',
		mustache:	'/vendor/mustache.js/mustache',
		requirejs:	'/vendor/requirejs/require',
	/*	storage:	'/js/Utilities/Storage',*/
		underscore:	'/vendor/underscore/underscore-min',
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

/**
 * Set up the global project name
 */
var App;

require(
	['backbone', 'bootstrap', 'Application'],
	function(Backbone, bootstrap, appl)
	{
		// Start
		App = appl.init ();
		App.activate ();
	}
);
