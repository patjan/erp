"use strict";

/**
 * permissions.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Permissions'
		, table_name	: 'Permissions'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'user_resource'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, focus			: 'jky-user-role'
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
	JKY.set_side_active('jky-support-permissions');
	JKY.set_html('jky-user-resource'	, JKY.set_controls('User Resources'	, '', ''));
	JKY.set_html('jky-user-action'		, JKY.set_controls('User Actions'	, '', ''));
	JKY.set_html('jky-user-role'		, JKY.set_controls('User Roles'		, '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_controls('User Roles'		, JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label', JKY.t('User Role'));
	JKY.show('jky-app-select-line');
//	select the last option type as default
	$('#jky-app-select option:last-child').prop('selected', true);
	$('#jky-app-select').change();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-name-l"	>' + the_row.user_role		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + the_row.user_resource	+ '</td>'
		+  '<td class="jky-td-name-l"	>' + the_row.user_action	+ '</td>'
//		+  '<td class="jky-td-status"	>' + the_row.status			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
//	JKY.set_option	('jky-status'			, JKY.row.status		);
	JKY.set_value	('jky-user-role'		, JKY.row.user_role		);
	JKY.set_value	('jky-user-resource'	, JKY.row.user_resource	);
	JKY.set_value	('jky-user-action'		, JKY.row.user_action	);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
//	JKY.set_option	('jky-status'			, 'Active');
//	JKY.set_value	('jky-user-role'		, '');
	JKY.set_value	('jky-user-resource'	, '');
	JKY.set_value	('jky-user-action'		, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
//		+          'status=\'' + JKY.get_value	('jky-status'			) + '\''
		+       'user_role=\'' + JKY.get_value	('jky-user-role'		) + '\''
		+ ', user_resource=\'' + JKY.get_value	('jky-user-resource'	) + '\''
		+   ', user_action=\'' + JKY.get_value	('jky-user-action'		) + '\''
		;
	return my_set;
};
