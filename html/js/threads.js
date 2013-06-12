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
		, program_name	: 'Threads'
		, table_name	: 'Threads'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-name'
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
	JKY.set_menu_active('jky-menu-production');
	JKY.set_side_active('jky-production-threads');
	JKY.set_html('jky-thread-groups'	, JKY.set_configs('Thread Groups', '', ''));
	JKY.set_html('jky-compositions'		, JKY.set_configs('Thread Compositions', '', ''));
	JKY.show('jky-side-production');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-code"			>' + the_row.code			+ '</td>'
		+  '<td class="jky-thread-name"		>' + the_row.name			+ '</td>'
		+  '<td class="jky-thread_group"	>' + the_row.thread_group	+ '</td>'
		+  '<td class="jky-thread_color"	>' + the_row.thread_color	+ '</td>'
		+  '<td class="jky-composition"		>' + the_row.composition	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-code'				, the_row.code			);
	JKY.set_value	('jky-thread-name'		, the_row.name			);
	JKY.set_option	('jky-thread-groups'	, the_row.thread_group	);
	JKY.set_value	('jky-thread-color'		, the_row.thread_color	);
	JKY.set_option	('jky-compositions'		, the_row.composition	);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-code'				, '' );
	JKY.set_value	('jky-thread-name'		, '' );
	JKY.set_option	('jky-thread-groups'	, '' );
	JKY.set_value	('jky-thread-color'		, '0');
	JKY.set_option	('jky-compositions'		, '0');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+            'code=\'' + JKY.get_value	('jky-code'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-thread-name'		) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread-groups'	) + '\''
		+  ', thread_color=\'' + JKY.get_value	('jky-thread-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-compositions'		) + '\''
		;
	return my_set;
};

JKY.display_form = function() {
};

JKY.process_insert = function(the_id) {
};

JKY.process_update = function(the_id, the_row) {
};

JKY.process_delete = function(the_id, the_row) {
};
