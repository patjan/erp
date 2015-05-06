"use strict";

/**
 * history.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'History'
		, table_name	: 'History'
		, specific		: ''
		, select		: 'FTPs'
		, filter		: ''
		, display		: '100'
		, sort_by		: 'updated_at'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-parent-id'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.set_side_active('jky-admin-history');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-app-select', JKY.set_controls('User Resources', JKY.App.get('select')));
	JKY.set_html('jky-app-select-label', JKY.t('Parent'));
	JKY.show('jky-app-select-line');
};
/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-datetime"	>' + the_row.updated_at		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.updated_name	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.parent_name	+ '</td>'
		+  '<td class="jky-td-number"	>' + the_row.parent_id		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.method			+ '</td>'
		+  '<td class="jky-td-name-w"	>' + the_row.history		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-updated-at'		, the_row.updated_at	);
	JKY.set_value	('jky-updated-by'		, the_row.updated_name	);
	JKY.set_value	('jky-parent-name'		, the_row.parent_name	);
	JKY.set_value	('jky-parent-id'		, the_row.parent_id		);
	JKY.set_value	('jky-method'			, the_row.method		);
	JKY.set_value	('jky-history'			, the_row.history.replace(/\, /g, "\n"));
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-updated-at'		, JKY.get_now());
	JKY.set_value	('jky-updated-by'		, JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-parent-name'		, '');
	JKY.set_value	('jky-parent-id'		, '');
	JKY.set_value	('jky-method'			, '');
	JKY.set_value	('jky-history'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+     'parent_name=\'' + JKY.get_value	('jky-parent-name'		) + '\''
		+     ', parent_id=  ' + JKY.get_value	('jky-parent-id'		)
		+        ', method=\'' + JKY.get_value	('jky-method'			) + '\''
		+       ', history=\'' + JKY.get_value	('jky-history'			) + '\''
		;
	return my_set;
};
