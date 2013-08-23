"use strict";

/**
 * threads.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Colors'
		, table_name	: 'Colors'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'color_name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-color-name'
		});
	JKY.App.init();
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-sales-colors');
	JKY.set_html('jky-app-select'		, JKY.set_configs ('Color Types' , JKY.App.get('select'), 'All'));
	JKY.set_html('jky-color-type'		, JKY.set_configs ('Color Types' , JKY.App.get('select'), ''));
	JKY.set_html('jky-status'			, JKY.set_controls('Status Codes', 'Active'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Type'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-color-name"	>' + the_row.color_name + '</td>'
		+  '<td class="jky-color-type"	>' + the_row.color_type + '</td>'
		+  '<td class="jky-status"		>' +  the_row.status	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-color-name'	, the_row.color_name	);
	JKY.set_option	('jky-color-type'	, the_row.color_type	);
	JKY.set_option	('jky-status'		, the_row.status		);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-color-name'	, '' );
	JKY.set_option	('jky-color-type'	, '' );
	JKY.set_option	('jky-status'		, 'Active');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+      'color_name=\'' + JKY.get_value	('jky-color-name'	) + '\''
		+    ', color_type=\'' + JKY.get_value	('jky-color-type'	) + '\''
		+        ', status=\'' + JKY.get_value	('jky-status'		) + '\''
		;
	return my_set;
};
