"use strict";

/**
 * tickets.html
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
		, sort_by		: 'created_at'
		, sort_seq		: 'DESC'
		, focus			: 'jky-history'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-admin');
	JKY.set_side_active('jky-admin-history');
	JKY.set_html('jky-app-select'		, JKY.set_controls('User Resources'	, JKY.App.get('select')));
	JKY.set_html('jky-app-select-label', JKY.t('Parent'));
	JKY.show('jky-side-admin');
};
/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-created-at"		>' + the_row.created_at		+ '</td>'
		+  '<td class="jky-created-by"		>' + the_row.created_name	+ '</td>'
		+  '<td class="jky-parent-name"		>' + the_row.parent_name	+ '</td>'
		+  '<td class="jky-parent-id"		>' + the_row.parent_id		+ '</td>'
		+  '<td class="jky-method"			>' + the_row.method			+ '</td>'
		+  '<td class="jky-history"			>' + the_row.history		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-created-at'		, the_row.created_at	);
	JKY.set_value	('jky-created-by'		, the_row.created_name	);
	JKY.set_value	('jky-parent-name'		, the_row.parent_name	);
	JKY.set_value	('jky-parent-id'		, the_row.parent_id		);
	JKY.set_value	('jky-method'			, the_row.method		);
	JKY.set_value	('jky-history'			, the_row.history		);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-created-at'		, JKY.get_now());
	JKY.set_value	('jky-created-by'		, JKY.Session.get_value('full_name'));
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

JKY.display_form = function() {
	JKY.hide('jky-app-upload');
};

JKY.process_insert = function(the_id) {
};

JKY.process_update = function(the_id, the_row) {
};

JKY.process_delete = function(the_id, the_row) {
};
