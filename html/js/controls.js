"use strict";
var jky_program	 = 'Controls';
var jky_selected = '';
//var jky_selected = 'User Roles';
//var jky_selected = 'System Keys';

/**
 * controls.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.display_trace('start_program - controls');
	JKY.set_all_events();
	JKY.set_initial_values();
}

/*
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events');
	if ($('#jky-body-loaded').length > 0) {
		$('#jky-app-select'		).change(function() {JKY.change_select(this);});
		$('#jky-display-list'	).click (function() {JKY.display_list();});
		$('#jky-display-form'	).click (function() {JKY.display_form();});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/*
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.display_trace('set_initial_values');
	if ($('#jky-body-loaded').length > 0) {

		JKY.set_active('jky-menu-admin');
		JKY.set_active('jky-admin-controls');
		JKY.show('jky-side-admin');
		JKY.show('jky-action-add-new');

		if (jky_selected === '') {
			jky_selected = 'Root';
		}

		JKY.set_html('jky-app-breadcrumb', jky_program);
        JKY.set_html('jky-app-select', JKY.set_group_set(jky_selected, 'Root'));
		JKY.load_table();

		JKY.display_list();
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.change_select = function(event){
	jky_selected = event.value;
	JKY.display_trace('change_select: ' + jky_selected);
	JKY.load_table();
}

JKY.display_list = function() {
	JKY.show('jky-app-filter');
	JKY.show('jky-app-table');
	JKY.show('jky-app-more');
	JKY.hide('jky-app-navs');
	JKY.hide('jky-app-form');
}

JKY.display_form = function() {
	JKY.hide('jky-app-filter');
	JKY.hide('jky-app-table');
	JKY.hide('jky-app-more');
	JKY.show('jky-app-navs');
	JKY.show('jky-app-form');
}

JKY.load_table = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Controls'
		, select		: jky_selected
		};
	JKY.ajax(false, my_data, JKY.process_load_success);
}

JKY.process_load_success = function(response) {
	JKY.display_trace('process_load_success');
	var my_html = '';
	var my_rows = response.rows;
	for(var i=0; i<my_rows.length; i++) {
		var my_row = my_rows[i];
		my_html += '<tr>'
				+  '<td class="jky-checkbox"		><input type="checkbox"	 /></td>'
				+  '<td class="jky-sequence"		>' + my_row['sequence'	] + '</td>'
				+  '<td class="jky-control-name"	>' + my_row['name'		] + '</td>'
				+  '<td class="jky-control-value"	>' + my_row['value'		] + '</td>'
				+  '<td class="jky-control-status"	>' + my_row['status'	] + '</td>'
				+  '</tr>'
				;
	}
	JKY.set_html('jky-table-body', my_html);
}
