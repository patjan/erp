"use strict";
var JKY = JKY || {};
/**
 * schedules.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Schedules'
		, table_name	: 'Schedules'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'schedule_date'
		, sort_seq		: 'DESC'
		, sort_list		: [[2, 1]]
		, sort_false	: ''
		, focus			: 'jky-remarks'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-schedule-date input').attr('data-format', JKY.Session.get_date());
	$('#jky-schedule-date'		).datetimepicker({language:JKY.Session.get_locale(), pickTime:false});

	JKY.set_side_active('jky-production-schedules');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Inactive'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');

//	select the first option as default
	if (JKY.is_empty($('#jky-app-filter').val())) {
		$('#jky-app-select option').eq(1).prop('selected', true);
		$('#jky-app-select').change();
	}

	$('#jky-shift-1-hours'	).ForceIntegerOnly();
	$('#jky-shift-2-hours'	).ForceIntegerOnly();
	$('#jky-shift-3-hours'	).ForceIntegerOnly();
	
	JKY.display_machines();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-status"	>'	+				 the_row.status				+ '</td>'
		+  '<td class="jky-td-date"		>'	+ JKY.out_date	(the_row.schedule_date	)	+ '</td>'
		+  '<td class="jky-td-number"	>'	+ JKY.fix_null	(the_row.shift_1_hours	)	+ '</td>'
		+  '<td class="jky-td-number"	>'	+ JKY.fix_null	(the_row.shift_2_hours	)	+ '</td>'
		+  '<td class="jky-td-number"	>'	+ JKY.fix_null	(the_row.shift_3_hours	)	+ '</td>'
		+  '<td class="jky-td-remarks"	>'	+ JKY.decode	(the_row.remarks		)	+ '</td>'
		+  '</tr>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.hide_parent ('jky-status');
	JKY.set_date	('jky-schedule-date'	, JKY.out_date(the_row.schedule_date));
	JKY.set_value	('jky-shift-1-hours'	, the_row.shift_1_hours);
	JKY.set_value	('jky-shift-2-hours'	, the_row.shift_2_hours);
	JKY.set_value	('jky-shift-3-hours'	, the_row.shift_3_hours);
	JKY.set_value	('jky-remarks'			, JKY.decode(the_row.remarks));

	JKY.display_shifts(the_row.id);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);
	JKY.hide_parent ('jky-status');
	JKY.set_date	('jky-schedule-date'	, JKY.out_date(JKY.get_next_date()));
	JKY.set_value	('jky-shift-1-hours'	, 8);
	JKY.set_value	('jky-shift-2-hours'	, 8);
	JKY.set_value	('jky-shift-3-hours'	, 8);
	JKY.set_value	('jky-remarks'			, '');
	JKY.Changes.increment();
	JKY.hide('jky-shifts-body');
};

/**
 *	get form set
 */
JKY.get_form_set = function(the_from) {
	var my_schedule_date = '';
	if (the_from === 'copy') {
		my_schedule_date = '\'' + JKY.get_next_date() + '\'';
	}else{
	 	my_schedule_date = JKY.inp_date('jky-schedule-date');
	}
	var my_set = ''
		+   'schedule_date=' + my_schedule_date
		+ ', shift_1_hours=' + JKY.get_value('jky-shift-1-hours')
		+ ', shift_2_hours=' + JKY.get_value('jky-shift-2-hours')
		+ ', shift_3_hours=' + JKY.get_value('jky-shift-3-hours')
		+ ', remarks=\'' + JKY.encode(JKY.get_value('jky-remarks'))	+ '\''
		;
	return my_set;
};

JKY.display_list = function() {
//	JKY.show('jky-action-print');
};

JKY.display_form = function() {
	JKY.show('jky-action-print');	
	JKY.show('jky-action-copy');
};

JKY.process_validation = function() {
	var my_error = '';
	my_error += JKY.Validation.is_numeric('jky-shift-1-hours', 'Shift 1 Hours');
	my_error += JKY.Validation.is_numeric('jky-shift-2-hours', 'Shift 2 Hours');
	my_error += JKY.Validation.is_numeric('jky-shift-3-hours', 'Shift 3 Hours');
	return my_error;
};

JKY.get_next_date = function() {
	var my_next_date = '';
	var my_data =
		{ method: 'get_max'
		, table : 'Schedules'
		, field	: 'schedule_date'
		};
	JKY.ajax(false, my_data, function(the_response) {
		my_next_date = moment(the_response.max).add(1, 'day').format().substr(0, 10);
	});
	return my_next_date;
};

JKY.process_copy = function(the_id, the_row) {
	JKY.copy_shifts(the_row.id, the_id);
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Shifts'
		, where : 'Shifts.schedule_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.print_shifts(the_id);
};
