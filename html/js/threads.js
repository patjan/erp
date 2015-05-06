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
	$('#jky-thread-name').change(function()	{if (JKY.row == null)	JKY.title_case(this);});

	JKY.set_side_active('jky-planning-threads');
	JKY.set_side_active('jky-threads-threads');
	JKY.set_side_active('jky-production-threads');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-composition'		, JKY.set_configs('Thread Compositions', '', ''));
	JKY.set_html('jky-thread-group'		, JKY.set_configs('Thread Groups', '', ''));
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
		+  '<td class="jky-td-name-s"	>' +				 the_row.name				+ '</td>'
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
	JKY.set_option	('jky-thread-group'		,				 the_row.thread_group	);
//	JKY.set_value	('jky-thread-color'		,				 the_row.thread_color	);
	JKY.set_option	('jky-composition'		,				 the_row.composition	);

//	if ($('#jky-tab-balance'	).hasClass('active'))	JKY.display_balance();
//	if ($('#jky-tab-batchins'	).hasClass('active'))	JKY.BatchIns	.display();
	JKY.display_balance();
	JKY.BatchIns.display();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-ncm'				, '' );
	JKY.set_value	('jky-thread-name'		, '' );
	JKY.set_option	('jky-thread-group'		, '' );
//	JKY.set_value	('jky-thread-color'		, '0');
	JKY.set_option	('jky-composition'		, '0');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+             'ncm=\'' + JKY.get_value	('jky-ncm'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-thread-name'		) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread-group'		) + '\''
//		+  ', thread_color=\'' + JKY.get_value	('jky-thread-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-composition'		) + '\''
		;
	return my_set;
};
