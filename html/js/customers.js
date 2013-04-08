"use strict";

/**
 * customers.html
 */
var jky_program		= 'Customers';
var jky_table		= 'Contacts';
var jky_select		= '';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'name';
var jky_sort_seq	=  0;

var jky_rows		= [];
var jky_count		=  0;
var jky_index		=  0;				//	0 = Add New

/**
 * start program
 */
JKY.start_program = function() {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_all_events();
	JKY.set_initial_values();
}

/*
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-app-select'		).change(function() {JKY.change_select  (this);});
		$('#jky-app-filter'		).change(function() {JKY.change_filter  (this);});
		$('#jky-action-add-new'	).click (function() {JKY.process_add_new	();});
		$('#jky-action-save'	).click (function() {JKY.process_save		();});
		$('#jky-action-delete'	).click (function() {JKY.process_delete		();});
		$('#jky-action-discard'	).click (function() {JKY.process_discard	();});
		$('#jky-action-export'	).click (function() {JKY.process_export		();});
		$('#jky-action-publish'	).click (function() {JKY.process_publish	();});	// not needed on version 0
		$('#jky-action-prev'	).click (function() {JKY.display_prev		();});
		$('#jky-action-next'	).click (function() {JKY.display_next		();});
		$('#jky-action-list'	).click (function() {JKY.display_list		();});
		$('#jky-action-form'	).click (function() {JKY.display_form	   (1);});
		$('#jky-action-comment'	).click (function() {JKY.process_comment	();});	// not done
		$('#jky-check-all'		).click (function() {JKY.process_check_all	();});	// not needed on version 0
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/*
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		JKY.set_active('jky-menu-sales');
		JKY.set_active('jky-sales-customers');
		JKY.set_html('jky-app-breadcrumb', jky_program);
<!--	JKY.set_html('jky-app-select', JKY.set_group_set(jky_select, 'Root'));	-->
		JKY.display_list();
		JKY.show('jky-side-sales');
		JKY.show('jky-action-add-new');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.change_select = function(event){
	jky_select = event.value;
	JKY.display_trace('change_select: ' + jky_select);
	JKY.display_list();
}

JKY.change_filter = function(event){
	jky_filter = event.value;
	JKY.display_trace('change_filter: ' + jky_filter);
	JKY.display_list();
}

JKY.display_list = function() {
	JKY.load_table();
	JKY.show('jky-app-filter'		);
	JKY.show('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-action-add-new'	);
	JKY.hide('jky-action-save'		);
	JKY.hide('jky-action-delete'	);
	JKY.hide('jky-action-discard'	);
	JKY.show('jky-app-table'		);
	JKY.hide('jky-app-form'			);
}

JKY.display_form = function(index) {
	JKY.display_row(index);
	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.show('jky-action-save'		);
	JKY.show('jky-action-delete'	);
	JKY.show('jky-action-discard'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}

JKY.display_prev = function() {
	jky_index = (jky_index == 1) ? jky_count : (jky_index-1);
	JKY.display_row(jky_index);
}

JKY.display_next = function() {
	jky_index = (jky_index == jky_count) ? 1 : (jky_index+1);
	JKY.display_row(jky_index);
}

JKY.display_row = function(index) {
	jky_index = index;
	var my_row = JKY.get_row(jky_table, jky_rows[index-1]['id']);
	jky_rows[index-1] = my_row;
	JKY.set_html('jky-app-index', index);
	JKY.set_value	('jky-full-name', my_row['full_name']);
//	JKY.set_option	('jky-status'	, my_row['status'	]);
	JKY.set_value	('jky-phone'	, my_row['phone'	]);
	JKY.set_value	('jky-email'	, my_row['email'	]);
	JKY.set_focus('jky-full-name');
}

JKY.load_table = function() {
	var my_data =
		{ method: 'get_index'
		, table	: jky_table
		, select: jky_select
		, filter: jky_filter
		};
	JKY.ajax(false, my_data, JKY.process_load_success);
}

JKY.process_load_success = function(response) {
	JKY.display_trace('process_load_success');
	jky_rows	= response.rows;
	jky_count	= jky_rows.length;
	jky_index	= 1;
	var my_html = '';
	for(var i=0; i<jky_count; i++) {
		var my_row = jky_rows[i];
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"	><input type="checkbox"	 /></td>'
				+  '<td class="jky-full-name"	>' + my_row['full_name'	] + '</td>'
				+  '<td class="jky-phone"		>' + my_row['phone'		] + '</td>'
				+  '<td class="jky-email"		>' + my_row['email'		] + '</td>'
				+  '</tr>'
				;
	}
	JKY.set_html('jky-app-index', jky_index);
	JKY.set_html('jky-app-count', jky_count);
	JKY.set_html('jky-table-body', my_html );
	JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
}

JKY.process_add_new = function() {
	jky_index = 0;
	JKY.display_new();
	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.show('jky-app-add-new'		);
	JKY.hide('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.show('jky-action-save'		);
	JKY.hide('jky-action-delete'	);
	JKY.show('jky-action-discard'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}

JKY.display_new = function() {
	JKY.set_value	('jky-full-name', '');
	JKY.set_value	('jky-phone'	, '');
//	JKY.set_option	('jky-status'	, 'Active');
	JKY.set_value	('jky-email'	, '');
	JKY.set_focus('jky-full-name');
}

JKY.get_form_set = function() {
	var my_set = ''
		+ ' full_name=\'' + JKY.get_value('jky-full-name'	) + '\''
		+    ', phone=\'' + JKY.get_value('jky-phone'		) + '\''
//		+   ', status=\'' + JKY.get_value('jky-status'		) + '\''
		+	 ', email=\'' + JKY.get_value('jky-email'		) + '\''
		;
	return my_set;
}

JKY.process_insert = function() {
	var my_data =
		{ method: 'insert'
		, table : jky_table
		, set	: JKY.get_form_set() + ', group_set=\'' + jky_select + '\''
		};
	JKY.ajax(false, my_data, JKY.process_insert_success);
}

JKY.process_insert_success = function(response) {
	JKY.display_trace('process_insert_success');
	JKY.display_list();
}

JKY.process_update = function() {
	var my_where = 'id = ' + jky_rows[jky_index-1]['id'];
	var my_data =
		{ method: 'update'
		, table : jky_table
		, set	: JKY.get_form_set()
		, where : my_where
		};
	JKY.ajax(false, my_data, JKY.process_update_success);
}

JKY.process_update_success = function(response) {
	JKY.display_trace('process_update_success');
	jky_rows[jky_index-1] = JKY.get_row(jky_table, jky_rows[jky_index-1]['id']);
	JKY.display_next();
}

JKY.process_save = function() {
	if (jky_index == 0) {
		JKY.process_insert();
	}else{
		JKY.process_update();
	}
}

JKY.process_delete = function() {
	var my_where = 'id = ' + jky_rows[jky_index-1]['id'];
	var my_data =
		{ method: 'delete'
		, table : jky_table
		, where : my_where
		};
	JKY.ajax(false, my_data, JKY.process_delete_success);
}

JKY.process_delete_success = function(response) {
	JKY.display_trace('process_delete_success');
	JKY.display_list();
}

JKY.process_discard = function() {
	JKY.show('jky-action-delete'	);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.display_list();
}

/**
 * process export
 */
JKY.process_export = function() {
	var my_sort_by = jky_sort_by;
	if (jky_sort_seq < 0 ) {
		my_sort_by += ' DESC';
	}

	JKY.run_export(jky_table, jky_select, jky_filter, jky_specific, my_sort_by);
};
