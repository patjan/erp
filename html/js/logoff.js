"use strict";

/**
 * logoff.html
 */
var jky_program		= 'Logoff';

/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.hide('jky-app-header');
	JKY.hide('jky-side-bar'  );
	JKY.Session.load_values();
	JKY.set_all_events();
	JKY.set_initial_values();
//	this is needed to avoid another Session timeout
	JKY.Session.clear_timeout();
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events - ' + jky_program);
	if (JKY.is_loaded('jky-body')) {
		$('#jky-button-log-mini').click(function()	{JKY.process_action('login');});
		$('#jky-button-log-in'	).click(function()	{JKY.process_action('login');});
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
		JKY.set_html('jky-log-off-time', JKY.get_time());
		JKY.t_tag('jky-log-form', 'span');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}
