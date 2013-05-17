"use strict";

/**
 * login.html
 */
var jky_program		= 'Login';
var jky_focus		= 'jky-log-in-user-name';

/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.hide('jky-side-bar');
	JKY.Session.load_values();
	JKY.set_all_events(jky_program);
	JKY.set_initial_values(jky_program);
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function(jky_program) {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-log-in-user-name'	).change(function() {JKY.change_log_in_name	(this)	;});
		$('#jky-log-in-password'	).change(function() {JKY.change_password	(this)	;});
		$('#jky-button-log-in'		).click (function() {JKY.process_log_in		()		;});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function(jky_program) {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		JKY.set_html('jky-log-in-logo', '<img src="/img/' + JKY.Session.get_value('company_logo') + '" />');
		$('#jky-log-in-user-name').val('');
		$('#jky-log-in-password' ).val('');
		JKY.set_button_log_in();
		JKY.set_focus(jky_focus);
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.change_log_in_name= function(user_name) {
	var my_user_name = user_name.value;
	JKY.display_trace('change_log_in_name: ' + my_user_name);
//	$('#jky-sign-up-user-name').val(my_user_name);
	JKY.set_button_log_in();
}

JKY.change_password= function(password) {
	var my_password = password.value;
	JKY.display_trace('change_password: ' + my_password);
	JKY.set_button_log_in();
}

JKY.set_button_log_in = function() {
	JKY.display_trace('set_button_log_in');
	var my_user_name 	= $('#jky-log-in-user-name'	).val();
	var my_password		= $('#jky-log-in-password'	).val();
	if (my_user_name === '' || my_password === '') {
		JKY.disabled_id('jky-button-log-in');
	}else{
		JKY.enabled_id ('jky-button-log-in');
	}
}

JKY.process_log_in = function() {
	JKY.display_trace('process_log_in');
	if (JKY.is_disabled('jky-button-log-in')) {
		JKY.display_message('Please, fill in all information');
		JKY.set_focus(jky_focus);
		return;
	}
	var my_user_name = $('#jky-log-in-user-name').val();
	var my_password  = $('#jky-log-in-password' ).val();
	var my_data =
		{ method		: 'log_in'
		, user_name		: my_user_name
		, encrypted		: $.md5(JKY.Session.get_value('user_time') + $.md5(my_password))
//		, encrypted		: $.md5(my_password)
		};
	JKY.ajax(false, my_data, JKY.process_log_in_success);
	JKY.set_focus(jky_focus);
}

JKY.process_log_in_success = function(response) {
	JKY.display_trace('process_log_in_success');
	JKY.Session.load_values();
	JKY.process_start_page();
}
