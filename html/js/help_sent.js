"use strict";

/**
 * loghelp.html
 */
var jky_program		= 'LogHelp';
var jky_focus		= 'jky-log-user-name';

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
		$('#jky-log-user-name'		).change(function() {JKY.change_user_name	(this)	;});
		$('#jky-button-log-in'		).click (function() {JKY.process_action('login')	;});
		$('#jky-button-submit-help'	).click (function() {JKY.process_submit_help()		;});
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
		if (JKY.Session.get_value('environment') == 'development') {
//			$('#jky-log-user-name').val('patjan');
//			setTimeout(function() {$('#jky-button-log-in').click();}, 500);
		}else{
			$('#jky-log-user-name').val('');
		}
		JKY.set_button_submit_help();
		JKY.set_focus(jky_focus);
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.change_user_name= function(user_name) {
	var my_user_name = user_name.value;
	JKY.display_trace('change_user_name: ' + my_user_name);
//	$('#jky-sign-up-user-name').val(my_user_name);
	JKY.set_button_submit_help();
}

JKY.set_button_submit_help = function() {
	JKY.display_trace('set_button_submit_help - ' + jky_program);
	var my_user_name = JKY.get_value('jky-log-user-name');
	if (JKY.is_empty(my_user_name)) {
		JKY.disabled_id('jky-button-submit-help');
	}else{
		JKY.enabled_id ('jky-button-submit-help');
	}
}

JKY.process_submit_help = function() {
	JKY.display_trace('process_submit_help - ' + jky_program);
	if (JKY.is_disabled('jky-button-submit-help')) {
		JKY.display_message(JKY.t('Please, fill in missing information'));
		JKY.set_focus(jky_focus);
		return;
	}
	var my_user_name = $('#jky-log-user-name').val();
	var my_data =
		{ method		: 'log_help'
		, help_name		: my_user_name
		};
	JKY.ajax(false, my_data, JKY.process_submit_help_success);
	JKY.set_focus(jky_focus);
}

JKY.process_submit_help_success = function(response) {
	JKY.display_trace('process_submit_help_success - ' + jky_program);
	JKY.Session.load_values();
	JKY.process_start_page();
}
