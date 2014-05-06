"use strict";

/**
 * reset.html
 */
var jky_program		= 'Reset';
var jky_focus		= 'jky-new-password';

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
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events_reset = function() {
	JKY.display_trace('set_all_events - ' + jky_program);
	if (JKY.is_loaded('jky-reset')) {
		$('#jky-new-password'		).change(function() {JKY.change_new_password	(this)	;});
		$('#jky-confirm-password'	).change(function() {JKY.change_confirm_password(this)	;});
		$('#jky-button-save'		).click (function() {JKY.process_save()					;});
	}else{
		setTimeout(function() {JKY.set_all_events_reset();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values_reset = function() {
	JKY.display_trace('set_initial_values - ' + jky_program);
	if (JKY.is_loaded('jky-reset')) {
//		JKY.set_html('jky-log-logo', '<img src="/img/' + JKY.Session.get_value('company_logo') + '" />');
		$('#jky-new-password'	 ).val('');
		$('#jky-confirm-password').val('');
		JKY.t_tag	 ('jky-reset', 'span');
		JKY.t_input	 ('jky-reset', 'placeholder');
		JKY.set_focus(jky_focus);
		JKY.set_button_save();
	}else{
		setTimeout(function() {JKY.set_initial_values_reset();}, 100);
	}
}

/**
 * display reset
 */
JKY.display_reset = function() {
	JKY.display_trace('display_reset');
	if (JKY.is_loaded ('jky-reset')) {
		JKY.set_initial_values_reset();
		JKY.show_modal('jky-reset');
	}else{
		setTimeout(function() {JKY.display_reset();}, 100);
	}
}

JKY.change_new_password = function(the_new_password) {
	var my_new_password = the_new_password.value;
	JKY.display_trace('change_new_password: ' + my_new_password);
	if (JKY.is_empty(my_new_password)) {
		JKY.display_message(JKY.set_is_required('New Password'));
		return false;
	}
	JKY.set_button_save();
}

JKY.change_confirm_password = function(the_confirm_password) {
	var my_confirm_password = the_confirm_password.value;
	JKY.display_trace('change_confirm_password: ' + my_confirm_password);
	if (JKY.is_empty(my_confirm_password)) {
		JKY.display_message(JKY.set_is_required('Confirm Password'));
		return false;
	}
	JKY.set_button_save();
}

JKY.set_button_save = function() {
	JKY.display_trace('set_button_save');
	var my_new_password	= $('#jky-new-password'		).val();
	var my_confirm		= $('#jky-confirm-password'	).val();

	if (JKY.is_empty(my_new_password)
	||  JKY.is_empty(my_confirm)) {
		JKY.disabled_id('jky-button-save');
		return;
	}

	var my_error = '';
	if (my_new_password != my_confirm)	{my_error += '<br>' + JKY.t('Confirm Password does not match New Password');}

	if (my_error != '') {
		JKY.display_message(my_error);
		JKY.disabled_id('jky-button-save');
	}else{
		JKY. enabled_id('jky-button-save');
	}
}

JKY.process_save = function() {
	JKY.display_trace('process_save');
	if (JKY.is_disabled('jky-button-save')) {
		JKY.display_message(JKY.t('Please, fill in missing information'));
		JKY.set_focus(jky_focus);
		return;
	}
	var my_password	= $('#jky-new-password').val();

	var my_data =
		{ method		: 'reset'
		, password		: $.md5(my_password)
		};
	JKY.ajax(false, my_data, JKY.process_save_success);
	JKY.set_focus(jky_focus);
}

JKY.process_save_success = function(response) {
	JKY.display_trace('process_save_success');
	JKY.Session.load_values();
	JKY.hide_modal('jky-reset');
	JKY.display_message(response.message);
}
