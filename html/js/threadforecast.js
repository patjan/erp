"use strict";

/**
 * threadforecast.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'ThreadForecast'
		, table_name	: 'ThreadForecast'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'thread_group ASC, thread_name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0],[2, 0]]
		, focus			: 'jky-thread-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-reference-date	input').attr('data-format', JKY.Session.get_date());
	$('#jky-reference-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-refresh'	).click (function() {JKY.process_refresh();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-forecast');
//	JKY.set_html('jky-compositions'		, JKY.set_configs('Thread Compositions', '', ''));
//	JKY.set_html('jky-thread-groups'	, JKY.set_configs('Thread Groups', '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Thread Groups', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('Group'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

//	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-form' );
	JKY.set_date('jky-reference-date', JKY.out_time(JKY.get_config_value('System Controls', 'Reference Date')));
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	JKY.show('jky-action-print');
	var my_html = ''
		+  '<td class="jky-td-name-s"	>' + the_row.thread_group		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + the_row.thread_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.supplier_name		+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.current_balance	+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.forecast_past		+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.forecast_month_1	+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.forecast_month_2	+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.forecast_month_3	+ '</td>'
		+  '<td class="jky-td-weight"	>' + the_row.forecast_future	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-ncm'				, the_row.ncm			);
	JKY.set_value	('jky-thread-name'		, the_row.name			);
	JKY.set_option	('jky-thread-groups'	, the_row.thread_group	);
//	JKY.set_value	('jky-thread-color'		, the_row.thread_color	);
	JKY.set_option	('jky-compositions'		, the_row.composition	);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-ncm'				, '' );
	JKY.set_value	('jky-thread-name'		, '' );
	JKY.set_option	('jky-thread-groups'	, '' );
//	JKY.set_value	('jky-thread-color'		, '0');
	JKY.set_option	('jky-compositions'		, '0');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+            ' ncm=\'' + JKY.get_value	('jky-ncm'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-thread-name'		) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread-groups'	) + '\''
//		+  ', thread_color=\'' + JKY.get_value	('jky-thread-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-compositions'		) + '\''
		;
	return my_set;
};

/**
 *	get form set
 */
JKY.process_refresh = function() {
	JKY.show('jky-loading');
	var my_reference_date = JKY.inp_date('jky-reference-date');
	var my_data =
		{ method		: 'refresh'
		, table			: 'ThreadForecast'
		, reference_date: my_reference_date
		};
	JKY.ajax(true, my_data, JKY.App.display_list);
};
