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
		, sort_list		: [[1, 0]]
		, focus			: 'jky-thread-name'
		, add_new		: 'display form'
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
	JKY.set_side_active('jky-planning-threads');
	JKY.set_side_active('jky-threads-threads');
	JKY.set_side_active('jky-production-threads');
	JKY.set_html('jky-compositions'		, JKY.set_configs('Thread Compositions', '', ''));
	JKY.set_html('jky-thread-groups'	, JKY.set_configs('Thread Groups', '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Thread Groups', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('Group'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-name-l"	>' +				 the_row.name				+ '</td>'
		+  '<td class="jky-td-code"		>' + JKY.fix_null	(the_row.ncm			)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.thread_group		+ '</td>'
//		+  '<td class="jky-td-name-s"	>' +				 the_row.thread_color		+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.composition		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-ncm'				,				 the_row.ncm			);
	JKY.set_value	('jky-thread-name'		,				 the_row.name			);
	JKY.set_option	('jky-thread-groups'	,				 the_row.thread_group	);
//	JKY.set_value	('jky-thread-color'		,				 the_row.thread_color	);
	JKY.set_option	('jky-compositions'		,				 the_row.composition	);

	JKY.display_balance();
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
		+             'ncm=\'' + JKY.get_value	('jky-ncm'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-thread-name'		) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread-groups'	) + '\''
//		+  ', thread_color=\'' + JKY.get_value	('jky-thread-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-compositions'		) + '\''
		;
	return my_set;
};
