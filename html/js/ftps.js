"use strict";

/**
 * ftps.html
 */
var jky_program		= 'FTPs';
var jky_table		= 'FTPs';
var jky_select		= '';
var jky_focus		= 'jky-diameter';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'code;
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

var jky_rows		= [];
var jky_count		=  0;
var jky_index		=  0;				//	0=Add New
var jky_settings	= [];
/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_all_events(jky_program);
	JKY.set_initial_values(jky_program);
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function(jky_program) {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-app-select'		).change(function() {JKY.change_select  (this);});
		$('#jky-app-filter'		).change(function() {JKY.change_filter  (this);});
		$('#jky-action-add-new'	).click (function() {JKY.process_add_new	();});
		$('#jky-action-save'	).click (function() {JKY.process_save		();});
		$('#jky-action-delete'	).click (function() {JKY.process_delete		();});
		$('#jky-action-cancel'	).click (function() {JKY.process_cancel		();});
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

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function(jky_program) {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		JKY.set_menu_active('jky-menu-production');
		JKY.set_side_active('jky-production-ftps');
//		JKY.set_html('jky-product' , JKY.set_radio('Configs', '', 'Machine Types' ));
		JKY.set_html('jky-machine', JKY.set_table_options('Machines', 'name', '', ''));
		JKY.set_html('jky-app-breadcrumb', jky_program);
		JKY.display_list();
		JKY.show('jky-side-production');
		JKY.show('jky-action-add-new');
		jky_settings = JKY.get_configs('Settings');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
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
	JKY.hide('jky-action-cancel'	);
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
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
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
	JKY.set_value	('jky-code'			, my_row['code'			]);
	JKY.set_value	('jky-product'		, my_row['product'		]);
	JKY.set_option	('jky-machine'		, my_row['machine_id'	]);
	JKY.set_value	('jky-diameter'		, my_row['diameter'		]);
	JKY.set_value	('jky-density'		, my_row['density'		]);
	JKY.set_value	('jky-inputs'		, my_row['inputs'		]);
	JKY.set_value	('jky-speed'		, my_row['speed'		]);
	JKY.set_value	('jky-turns'		, my_row['turns'		]);
	JKY.set_value	('jky-weight'		, my_row['weight'		]);
	JKY.set_value	('jky-width'		, my_row['width'		]);
	JKY.set_value	('jky-lanes'		, my_row['lanes'		]);
	JKY.set_value	('jky-yield'		, my_row['yield'		]);
	JKY.set_value	('jky-needling'		, my_row['needling'		]);
	JKY.set_value	('jky-has-break'	, my_row['has_break'	]);
	JKY.set_focus(jky_focus);
}

JKY.load_table = function() {
	var my_order_by = jky_sort_by + ' ' + (jky_sort_seq == 0 ? 'ASC' : 'DESC');
	var my_data =
		{ method	: 'get_index'
		, table		: jky_table
		, select	: jky_select
		, filter	: jky_filter
		, order_by	: my_order_by
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
				+  '<td class="jky-code"		>' + my_row['code'			] + '</td>'
				+  '<td class="jky-product"		>' + my_row['product'		] + '</td>'
				+  '<td class="jky-machine"		>' + my_row['machine'		] + '</td>'
				+  '<td class="jky-composition"	>' + my_row['composition'	] + '</td>'
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
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}

JKY.display_new = function() {
	JKY.set_value	('jky-code'			, 'New');
	JKY.set_radio	('jky-product'		,  null);
	JKY.set_option	('jky-machine'		,  null);
	JKY.set_value	('jky-diameter'		, '0');
	JKY.set_value	('jky-density'		, '0');
	JKY.set_value	('jky-inputs'		, '0');
	JKY.set_value	('jky-speed'		, '0');
	JKY.set_value	('jky-turns'		, '0');
	JKY.set_value	('jky-weight'		, '0');
	JKY.set_value	('jky-width'		, '0');
	JKY.set_value	('jky-lanes'		, '0');
	JKY.set_value	('jky-yield'		, '0');
	JKY.set_value	('jky-needling'		, '0');
	JKY.set_value	('jky-has-break'	, '0');
	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_set = ''
//		+            'code=\'' + JKY.get_value	('jky-code'			) + '\''
//		+    ', product_id=\'' + JKY.get_value	('jky-product'		) + '\''
		+    '  machine_id=\'' + JKY.get_value	('jky-machine'		) + '\''
		+      ', diameter=\'' + JKY.get_value	('jky-diameter'		) + '\''
		+       ', density=\'' + JKY.get_value	('jky-density'		) + '\''
		+        ', inputs=\'' + JKY.get_value	('jky-inputs'		) + '\''
		+         ', speed=\'' + JKY.get_value	('jky-speed'		) + '\''
		+         ', turns=\'' + JKY.get_value	('jky-turns'		) + '\''
		+        ', weight=\'' + JKY.get_value	('jky-weight'		) + '\''
		+         ', width=\'' + JKY.get_value	('jky-width'		) + '\''
		+         ', lanes=\'' + JKY.get_value	('jky-lanes'		) + '\''
		+         ', yield=\'' + JKY.get_value	('jky-yield'		) + '\''
		+      ', needling=\'' + JKY.get_value	('jky-needling'		) + '\''
		+     ', has_break=\'' + JKY.get_value	('jky-has-break'	) + '\''
		;
	return my_set;
}

JKY.process_insert = function() {
	var my_data =
		{ method: 'insert'
		, table : jky_table
		, set	: JKY.get_form_set()
		};
	JKY.ajax(false, my_data, JKY.process_insert_success);
}

JKY.process_insert_success = function(response) {
	JKY.display_trace('process_insert_success');
	JKY.display_message(response.message);
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
	JKY.display_message(response.message);
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
	JKY.display_message(response.message);
	JKY.display_list();
}

JKY.process_cancel = function() {
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