"use strict";

/**
 * config s.html
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Configs'
		, table_name	: 'Configs'
		, specific		: ''
		, select		: 'Root'
		, filter		: ''
		, sort_by		: 'sequence, name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-name'
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
	JKY.set_side_active('jky-admin-configs');
	JKY.set_html('jky-app-select', JKY.set_configs ('Root', JKY.App.get('select')));
	JKY.set_html('jky-status', JKY.set_controls('Status Codes', 'Active'));
	JKY.set_html('jky-app-select-label', JKY.t('Group Set'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-sequence"		>' +				 the_row.sequence		+ '</td>'
		+  '<td class="jky-name"			>' +				 the_row.name			+ '</td>'
		+  '<td class="jky-value"			>' + JKY.fix_null	(the_row.value		)	+ '</td>'
		+  '<td class="jky-status"			>' +				 the_row.status			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_option	('jky-status'			, the_row.status		);
	JKY.set_value	('jky-sequence'			, the_row.sequence		);
	JKY.set_value	('jky-name'				, the_row.name			);
	JKY.set_value	('jky-value'			, the_row.value			);

	var my_select = JKY.App.get('select');
	if (my_select == 'Root' && the_row.name == 'Root') {
		JKY.hide('jky-action-save'		);
		JKY.hide('jky-action-copy'		);
		JKY.hide('jky-action-delete'	);
		JKY.hide('jky-action-cancel'	);
	}else{
		JKY.show('jky-action-save'		);
		JKY.show('jky-action-copy'		);
		JKY.show('jky-action-delete'	);
		JKY.show('jky-action-cancel'	);
	}
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_option	('jky-status'			, 'Active');
	JKY.set_value	('jky-sequence'			, 50);
	JKY.set_value	('jky-name'				, '');
	JKY.set_value	('jky-value'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+       'group_set=\'' + JKY.App.get	('select'				) + '\''
		+        ', status=\'' + JKY.get_value	('jky-status'			) + '\''
		+      ', sequence=  ' + JKY.get_value	('jky-sequence'			)
		+          ', name=\'' + JKY.get_value	('jky-name'				) + '\''
		+         ', value=\'' + JKY.get_value	('jky-value'			) + '\''
		;
	return my_set;
};

JKY.display_form = function() {
	JKY.hide('jky-app-upload');
};

JKY.process_insert = function(the_id) {
	JKY.refresh_select();
};

JKY.process_update = function(the_id, the_row) {
	JKY.refresh_select();
};

JKY.process_delete = function(the_id, the_row) {
	JKY.refresh_select();
	if (JKY.row.group_set == 'Root') {
		var my_data =
			{ method: 'delete_many'
			, table :  JKY.App.get('table_name')
			, where : 'group_set = "' + JKY.row.name + '"'
			};
		JKY.ajax(true, my_data);
	}
};

JKY.refresh_select = function() {
	var my_select = JKY.App.get('select');
	if (my_select == 'Root') {
		JKY.set_html('jky-app-select', JKY.set_configs('Root', my_select));
	}
};
