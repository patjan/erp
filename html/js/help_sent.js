"use strict";

/**
 * help_sent.html
 */
var jky_program		= 'HelpSent';

/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.hide('jky-side-bar');
	JKY.Session.load_values();
	JKY.set_all_events();
	JKY.set_initial_values();
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events - ' + jky_program);
	if (JKY.is_loaded('jky-body')) {
		$('#jky-button-log-in').click(function()	{JKY.process_action('login');});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.display_trace('set_initial_values - ' + jky_program);
	if (JKY.is_loaded('jky-body')) {
		JKY.set_html('jky-log-logo', '<img src="/img/' + JKY.Session.get_value('company_logo') + '" />');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}
