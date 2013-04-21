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
var jky_sort_by		= 'code';
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

var jky_rows		= [];
var jky_row 		= null;
var jky_count		=  0;
var jky_index		=  0;				//	0=Add New

var jky_materials	= [];
var jky_threads		= [];
var jky_loads		= [];
var jky_settings	= [];

var jky_set_index	= null;				//	only for insert set
var jky_set_setting	= null;				//	only for insert set

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

		$('#jky-comp-add-new'	).click (function() {JKY.insert_composition	();});
		$('#jky-thread-add-new'	).click (function() {JKY.insert_thread		();});
		$('#jky-load-add-new'	).click (function() {JKY.insert_load		();});
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
		JKY.set_html('jky-machine', JKY.set_table_options('Machines', 'name', '', null));
		JKY.set_html('jky-app-breadcrumb', jky_program);
		JKY.display_list();
		JKY.show('jky-side-production'	);
		JKY.show('jky-app-header'		);
		JKY.show('jky-action-add-new'	);
		jky_materials	= JKY.get_configs('Materials');
		jky_threads		= JKY.get_ids	 ('Threads'  );
		jky_settings	= JKY.get_configs('Settings' );
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
	JKY.show('jky-form-tabs');
	jky_index = index;
	jky_row = JKY.get_row(jky_table, jky_rows[index-1]['id']);
	jky_rows[index-1] = jky_row;
	JKY.set_html('jky-app-index', index);
	JKY.set_value	('jky-code'			, jky_row['code'			]);
	JKY.set_value	('jky-product'		, jky_row['product'			]);
	JKY.set_value	('jky-composition'	, jky_row['composition' 	]);
	JKY.set_option	('jky-machine'		, jky_row['machine_id'		]);
	JKY.set_value	('jky-diameter'		, jky_row['diameter'		]);
	JKY.set_value	('jky-density'		, jky_row['density'			]);
	JKY.set_value	('jky-inputs'		, jky_row['inputs'			]);
	JKY.set_value	('jky-speed'		, jky_row['speed'			]);
	JKY.set_value	('jky-turns'		, jky_row['turns'			]);
	JKY.set_value	('jky-weight'		, jky_row['weight'			]);
	JKY.set_value	('jky-width'		, jky_row['width'			]);
	JKY.set_value	('jky-lanes'		, jky_row['lanes'			]);
	JKY.set_value	('jky-yield'		, jky_row['yield'			]);
	JKY.set_value	('jky-needling'		, jky_row['needling'		]);
	JKY.set_value	('jky-peso'			, jky_row['peso'			]);
	JKY.set_radio	('jky-has-break'	, jky_row['has_break'		]);
	JKY.set_focus(jky_focus);

	JKY.display_composition	(jky_materials);
	JKY.display_threads		(jky_row.id   );
	JKY.display_loads		(jky_row.id   );
	JKY.display_settings	(jky_row.id   );
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
	JKY.hide('jky-form-tabs');
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
	JKY.set_value	('jky-composition'	, '');
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
	JKY.set_value	('jky-peso'			, '12.5');
	JKY.set_radio	('jky-has-break'	, 'No');
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
		+		   ', peso=\'' + JKY.get_value	('jky-peso'			) + '\''
		+     ', has_break=\'' + JKY.get_checked('jky-has-break'	) + '\''
		;
	return my_set;
}

JKY.process_save = function() {
	if (jky_index == 0) {
		JKY.process_insert();
	}else{
		JKY.process_update();
	}
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

JKY.process_delete = function() {
	JKY.display_confirm(JKY.delete_confirmed, null, 'Delete', 'You requested to <b>delete</b> this record. <br>Are you sure?', 'Yes', 'No');
}

JKY.delete_confirmed = function() {
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

/*
 * display Composition ---------------------------------------------------------
 */
JKY.display_composition = function(jky_materials) {
	var my_html  = '';
	var my_total =  0;
	var my_rows  = jky_row.composition;
	if (my_rows != '') {
		var my_comps = my_rows.split(', ');
		for(var i in my_comps) {
			var my_comp = my_comps[i];
			var my_strings  = my_comp.split(' ');
			var my_percent  = parseFloat(my_strings[0]);
			var my_material = my_strings[1];
			var my_options  = JKY.set_options_array(my_material, jky_materials, false);
			my_total += my_percent;
			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-action"><a onclick="JKY.delete_composition(this)"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-comp-value"><input  class="jky-comp-percent"  text="text"	onchange="JKY.update_composition()" value="' + my_percent + '" /></td>'
				+ '<td class="jky-comp-label"><select class="jky-comp-material"				onchange="JKY.update_composition()">' + my_options + '</select></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-comp-total', my_total);
	JKY.set_html('jky-comp-body' , my_html );
}

JKY.update_composition = function() {
	var my_total = 0;
	var my_composition = '';
	$('#jky-comp-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-comp-percent' ).val());
		var my_material = $(this).find('.jky-comp-material').val();
		var my_name = JKY.get_name_by_id(my_material, jky_materials);
		my_composition += my_percent + ' ' + my_name + ', ';
		my_total += my_percent
	})
	JKY.set_html('jky-comp-total', my_total);
	if (my_total == 100) {
		$('#jky-comp-total').css('color', 'black');
		my_composition = my_composition.substr(0, my_composition.length-2);
		JKY.set_value('jky-composition', my_composition);
		var my_data =
			{ method	: 'update'
			, table		: jky_table
			, set		: 'composition = \'' + my_composition + '\''
			, where		: 'id = ' + jky_row.id
			};
		JKY.ajax(true, my_data, JKY.update_composition_success);
	}else{
		$('#jky-comp-total').css('color', 'red');
		JKY.display_message('Total percent is not 100.')
	}
}

JKY.update_composition_success = function(response) {
	JKY.display_message(response.message)
}

JKY.insert_composition = function() {
	var my_percent = 0;
	var my_options = JKY.set_options_array(null, jky_materials, false);
	var	my_html = ''
		+ '<tr>'
		+ '<td class="jky-action"><a onclick="JKY.delete_composition(this)"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-comp-value"><input  class="jky-comp-percent"  text="text"	onchange="JKY.update_composition()" value="' + my_percent + '" /></td>'
		+ '<td class="jky-comp-label"><select class="jky-comp-material"				onchange="JKY.update_composition()">' + my_options + '</select></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-comp-body', my_html);
}

JKY.delete_composition = function(id_name) {
	$(id_name).parent().parent().remove();
	JKY.update_composition();
}

/*
 * display Threads -------------------------------------------------------------
 */
JKY.display_threads = function(id) {
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Threads'
		, select	:  id
		, order_by  : 'FTP_Threads.id'
		};
	JKY.ajax(false, my_data, JKY.generate_threads);
}

JKY.generate_threads = function(response) {
	var my_html  = '';
	var my_total =  0;
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row	 	= my_rows[i];
			var my_id		= my_row.id;
			var my_name		= my_row.name;
			var my_percent	= parseFloat(my_row.percent);
			var my_options	= JKY.set_options_array(my_name, jky_threads, true);

			my_total += my_percent;
			my_html  += ''
				+ '<tr ftp_thread_id=' + my_id + '>'
				+ '<td class="jky-action"><a onclick="JKY.delete_thread(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-thread-value"		><input  class="jky-thread-percent" text="text" onchange="JKY.update_thread(this, ' + my_id + ')" value="' + my_percent + '" /></td>'
				+ '<td class="jky-thread-label"		><select class="jky-thread-name"				onchange="JKY.update_thread(this, ' + my_id + ')">' + my_options + '</select></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-thread-total', my_total);
	JKY.set_html('jky-thread-body' , my_html );
}

JKY.verify_total_percent = function() {
	var my_total = 0;
	$('#jky-thread-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-thread-percent' ).val());
		my_total += my_percent
	})
	JKY.set_html('jky-thread-total', my_total);
	if (my_total == 100) {
		$('#jky-thread-total').css('color', 'black');
	}else{
		$('#jky-thread-total').css('color', 'red');
		JKY.display_message('Total percent is not 100.')
	}
}

JKY.update_thread = function(id_name, the_id ) {
	var my_percent = parseFloat($(id_name).parent().parent().find('.jky-thread-percent').val());
	var my_thread_id = $(id_name).parent().parent().find('.jky-thread-name').val();
	var my_set = ''
		+ 'thread_id = ' + my_thread_id
		+ ', percent = ' + my_percent
		;
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Threads'
		, set		: my_set
		, where		: 'FTP_Threads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_thread_success);
}

JKY.update_thread_success = function(response) {
	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.insert_thread = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Threads'
		, set		: 'FTP_Threads.ftp_id = ' + jky_row.id
		};
	JKY.ajax(true, my_data, JKY.insert_thread_success);
}

JKY.insert_thread_success = function(response) {
	var my_percent	= 0;
	var my_options	= JKY.set_options_array(null, jky_threads, true);
	var	my_html = ''
		+ '<tr ftp_thread_id=' + response.id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_thread(this, ' + response.id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-thread-value"><input  class="jky-thread-percent"  text="text"	onchange="JKY.update_thread(this, ' + response.id + ')" value="' + my_percent + '" /></td>'
		+ '<td class="jky-thread-label"><select class="jky-thread-name"					onchange="JKY.update_thread(this, ' + response.id + ')">' + my_options + '</select></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-thread-body', my_html);
}

JKY.delete_thread = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'FTP_Threads'
		, where		: 'FTP_Threads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_thread_success);
}

JKY.delete_thread_success = function(response) {
	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

/*
 * display Loads -------------------------------------------------------------
 */
JKY.display_loads = function(id) {
	jky_loads = JKY.load_ids(jky_row.id);
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Loads'
		, select	:  id
		, order_by  : 'FTP_Loads.id'
		};
	JKY.ajax(false, my_data, JKY.generate_loads);
}

JKY.load_ids = function(the_id) {
	var my_rows = [];
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Threads'
		, select	:  the_id
		, order_by  : 'FTP_Threads.id'
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					my_rows = response.rows;
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_rows;
}

JKY.generate_loads = function(response) {
	var my_html = '';
	var my_rows = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row		 	= my_rows[i];
			var my_id			= my_row.id;
			var my_first_number	= my_row.first_number;
			var my_first_name	= my_row.first_name;
			var my_second_number= my_row.second_number;
			var my_second_name	= my_row.second_name;

			my_html += ''
				+ '<tr ftp_load_id=' + my_id + '>'
				+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-load-first-value"		><input  class="jky-load-first-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_first_number  + '" /></td>'
				+ '<td class="jky-load-first-select"	><select class="jky-load-first-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_first_name , jky_loads, true) + '</select></td>'
				+ '<td class="jky-load-second-value"	><input  class="jky-load-second-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_second_number + '" /></td>'
				+ '<td class="jky-load-second-select"	><select class="jky-load-second-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_second_name, jky_loads, true) + '</select></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-load-body', my_html);
}

JKY.update_load = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	var my_first_number		= parseFloat(my_tr.find('.jky-load-first-number' ).val());
	var my_first_thread_id	= my_tr.find('.jky-load-first-name' ).val();
	var my_second_number	= parseFloat(my_tr.find('.jky-load-second-number').val());
	var my_second_thread_id	= my_tr.find('.jky-load-second-name').val();
	var my_set = ''
		+       'first_number = ' + my_first_number
		+  ', first_thread_id = ' + my_first_thread_id
		+    ', second_number = ' + my_second_number
		+ ', second_thread_id = ' + my_second_thread_id
		;
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Loads'
		, set		:  my_set
		, where		: 'FTP_Loads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_load_success);
}

JKY.update_load_success = function(response) {
	JKY.display_message(response.message)
}

JKY.insert_load = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Loads'
		, set		: 'FTP_Loads.ftp_id = ' + jky_row.id
		};
	JKY.ajax(true, my_data, JKY.insert_load_success);
}

JKY.insert_load_success = function(response) {
	var my_id = response.id;
	var my_first_number	=  0;
	var my_first_name	= '';
	var my_second_number=  0;
	var my_second_name	= '';
	var	my_html = ''
		+ '<tr ftp_load_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-load-first-value"		><input  class="jky-load-first-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_first_number  + '" /></td>'
		+ '<td class="jky-load-first-select"	><select class="jky-load-first-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_first_name , jky_loads, true) + '</select></td>'
		+ '<td class="jky-load-second-value"	><input  class="jky-load-second-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_second_number + '" /></td>'
		+ '<td class="jky-load-second-select"	><select class="jky-load-second-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_second_name, jky_loads, true) + '</select></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-load-body', my_html);
}

JKY.delete_load = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'FTP_Loads'
		, where		: 'FTP_Loads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_load_success);
}

JKY.delete_load_success = function(response) {
	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

/*
 * display Settings ------------------------------------------------------------
 */
JKY.display_settings = function(id) {
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Sets'
		, select	:  id
		};
	JKY.ajax(false, my_data, JKY.generate_settings);
}

JKY.generate_settings = function(response) {
	var my_html = '';
	var my_rows = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row	 	= my_rows[i];
			var my_setting	= my_row.setting;
			var my_name		= my_row.name;
			var my_id		= my_row.id;
			var my_value	= (my_row.value == null) ? 0 : my_row.value;

			var my_onchange = '';
			if (my_row.value == null) {
				my_onchange = 'JKY.insert_setting(this, ' + my_setting + ')';
			}else{
				my_onchange = 'JKY.update_setting(this, ' + my_setting + ', ' + my_id + ')';
			}

			my_html += ''
				+ '<tr>'
				+ '<td class="jky-set-label">' + my_name  + '</td>'
				+ '<td class="left" ><input class="jky-set-value" text="text" onchange="' + my_onchange + '" value="' + my_value + '" /></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-set-body', my_html);
}

JKY.insert_setting = function(index, setting) {
	var my_set  = 'ftp_id = ' + jky_row.id + ', setting_id = ' + setting + ',value = \'' + $(index).val() + '\'';
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Sets'
		, set		:  my_set
		};
	JKY.ajax(true, my_data, JKY.insert_settings_success);
	jky_set_index	= index;
	jky_set_setting	= setting;
}

JKY.insert_settings_success = function(response) {
	JKY.display_message(response.message)
	$(jky_set_index).attr('onchange', 'JKY.update_setting(this, ' + jky_set_setting + ', ' + response.id + ')');
}

JKY.update_setting = function(index, setting, id) {
	var my_set  = 'ftp_id = ' + jky_row.id + ', setting_id = ' + setting + ',value = \'' + $(index).val() + '\'';
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Sets'
		, set		:  my_set
		, where		: 'id = ' + id
		};
	JKY.ajax(true, my_data, JKY.update_settings_success);
}

JKY.update_settings_success = function(response) {
	JKY.display_message(response.message)
}
