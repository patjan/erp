"use strict";

/**
 * templates.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Templates'
		, table_name	: 'Templates'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'created_at'
		, sort_seq		: 'ASC'
		, focus			: 'jky-priority'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-created-date').attr('data-format', JKY.Session.get_date_time	());
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-support-templates');
	JKY.set_html('jky-priority'			, JKY.set_controls('Priorities', '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_controls('Template Types', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('Template Types'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-created-at"		>' + JKY.short_date(the_row.created_date   )	+ '</td>'
		+  '<td class="jky-opened-by"		>' + the_row.opened_name						+ '</td>'
		+  '<td class="jky-priority"		>' + the_row.priority							+ '</td>'
		+  '<td class="jky-description"		>' + the_row.description						+ '</td>'
		+  '<td class="jky-resolution"		>' + the_row.resolution							+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-opened-by'		, the_row.opened_name	);
	JKY.set_value	('jky-created-value'	, JKY.out_time(the_row.created_date	));
	JKY.set_value	('jky-priority'			, the_row.priority		);
	JKY.set_value	('jky-description'		, the_row.description	);
	JKY.set_value	('jky-resolution'		, the_row.resolution	);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_option	('jky-status'			, 'Active');
	JKY.set_date	('jky-created-date'		,  JKY.out_time(JKY.get_now ()));
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+        'priority=\'' + JKY.get_value	('jky-priority'			) + '\''
		+   ', description=\'' + JKY.get_value	('jky-description'		) + '\''
		+    ', resolution=\'' + JKY.get_value	('jky-resolution'		) + '\''
		;
	return my_set;
};
