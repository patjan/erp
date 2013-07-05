"use strict";
var JKY = JKY || {};
/**
 * JKY.Application - process all application functions
 *
 * require:	JKY.Utils.js
 *			JKY.Reset.js
 *			JKY.Changes.js
 *			JKY.Validation.js
 */
JKY.Application = function() {
	var my_args		= null;
	var my_count	= 0;
	var my_index	= 0;
	var my_first	= true;
	var my_skip_form;

	JKY.rows		= [];
	JKY.row 		= null;		// null=Add New

/**
 *	set all events (run only once per load)
 */
	function my_set_all_events() {
			JKY.display_trace('my_set_all_events - ' + my_args.program_name);
			if (JKY.is_loaded('jky-body-loaded')) {
if (my_first == true) {
	my_first = false;
			JKY.display_trace('my_set_all_events - first - ' + my_args.program_name);
				$('#jky-app-select'			).change(function() {JKY.Changes.can_leave(function() { my_change_select		();})});
				$('#jky-app-filter'			).change(function() {JKY.Changes.can_leave(function() { my_change_filter		();})});
				$('#jky-action-add-new'		).click (function() {JKY.Changes.can_leave(function() { my_process_add_new		();})});
				$('#jky-action-print'		).click (function() {JKY.Changes.can_leave(function() { my_process_print		();})});
				$('#jky-action-export'		).click (function() {JKY.Changes.can_leave(function() { my_process_export		();})});
				$('#jky-action-publish'		).click (function() {JKY.Changes.can_leave(function() { my_process_publish		();})});
				$('#jky-action-prev'		).click (function() {JKY.Changes.can_leave(function() { my_display_prev			();})});
				$('#jky-action-next'		).click (function() {JKY.Changes.can_leave(function() { my_display_next			();})});
				$('#jky-action-list'		).click (function() {JKY.Changes.can_leave(function() { my_display_list			();})});
				$('#jky-action-form'		).click (function() {JKY.Changes.can_leave(function() { my_display_form		   (1);})});
}
				$('#jky-action-save'		).click (function() {									my_process_save			();});
				$('#jky-action-copy'		).click (function() {JKY.Changes.can_leave(function() { my_process_copy			();})});
				$('#jky-action-delete'		).click (function() {									my_process_delete		();});
				$('#jky-action-cancel'		).click (function() {JKY.Changes.can_leave(function() { my_process_cancel		();})});
				$('#jky-check-all'			).click (function() {									my_set_all_check	(this);});

				$('#jky-form-data       input[id]').each (function() {$(this).change(function() 	{my_process_change_input(this);});});
				$('#jky-form-data     input[name]').each (function() {$(this).change(function() 	{my_process_change_input(this);});});
				$('#jky-form-data      select[id]').each (function() {$(this).change(function()	{my_process_change_input(this);});});
				$('#jky-form-data    textarea[id]').each (function() {$(this).change(function()	{my_process_change_input(this);});});
				$('#jky-form-data i.icon-calendar').each (function() {$(this).on (function()	{alert('icon');});});
				JKY.set_all_events();	// from caller
			}else{
				setTimeout(function() {my_set_all_events();}, 100);
			}
		}

/**
 *	set initial values (run only once per load)
 */
	function my_set_initial_values() {
			JKY.display_trace('my_set_initial_values - ' + my_args.program_name);
			if (JKY.is_loaded('jky-body')) {
				JKY.set_html ('jky-app-breadcrumb', JKY.t(my_args.program_name));
				JKY.set_value('jky-app-filter', my_args.filter);
				JKY.hide('jky-app-select-line');
				my_display_list();
//				my_display_form(1);
				JKY.show('jky-app-header');
				JKY.hide('jky-action-publish');
				JKY.set_initial_values();
				JKY.Changes.reset();
			}else{
				setTimeout(function() {my_set_initial_values();}, 100);
			}
		}

	function my_change_select(){
			my_args.select = JKY.get_value('jky-app-select');
			JKY.display_trace('my_change_select: ' + my_args.select);
			my_display_list();
		}

	function my_change_filter(){
			my_args.filter = JKY.get_value('jky-app-filter');
			JKY.display_trace('my_change_filter: ' + my_args.filter);
			my_display_list();
		}

	function my_display_prev() {
			JKY.display_trace('my_display_prev');
			my_index = (my_index == 1) ? my_count : (my_index-1);
			my_display_row(my_index);
		}

	function my_display_next() {
			JKY.display_trace('my_display_next');
			my_index = (my_index == my_count) ? 1 : (my_index+1);
			my_display_row(my_index);
		}

	function my_set_all_check(the_index) {
			JKY.display_trace('set_all_check');
			if ($(the_index).is(':checked')) {
				$('#jky-table-body .jky-checkbox input').each(function() {$(this).attr('checked', 'checked');})
			}else{
				$('#jky-table-body .jky-checkbox input').each(function() {$(this).removeAttr('checked');})
			}
		}

	function my_set_checkbox(the_index) {
			JKY.display_trace('set_checkbox');
			my_skip_form = true;
		}

	function my_display_list() {
			JKY.display_trace('my_display_list');
			JKY.show('jky-app-filter'		);
			JKY.show('jky-app-more'			);
			JKY.hide('jky-app-navs'			);
			JKY.hide('jky-app-add-new'		);
			JKY.show('jky-app-counters'		);
			JKY.show('jky-action-add-new'	);
			JKY.hide('jky-action-print'		);
			if (JKY.Session.get_value('user_role') == 'Support') {
				JKY.show('jky-action-export');
			}else{
				JKY.hide('jky-action-export');
			};
			JKY.hide('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.hide('jky-action-delete'	);
			JKY.hide('jky-action-cancel'	);
			JKY.show('jky-app-table'		);
			JKY.hide('jky-app-form'			);
			JKY.display_list();
			my_load_table();
		}

	function my_load_table() {
			JKY.display_trace('my_load_table');
			JKY.show('jky-loading');
			var my_data =
				{ method	: 'get_index'
				, table		: my_args.table_name
				, specific	: my_args.specific
				, select	: my_args.select
				, filter	: my_args.filter
				, order_by	: my_args.sort_by + ' ' + my_args.sort_seq
				};
			JKY.ajax(false, my_data, my_process_load_success);
		}

	function my_process_load_success(response) {
			JKY.display_trace('my_process_load_success');
			JKY.rows	= response.rows;
			my_count	= JKY.rows.length;
			my_index	= 1;
			var my_html = '';
			for(var i=0; i<my_count; i++) {
				var my_row = JKY.rows[i];
				var my_checkbox = '<input type="checkbox" onclick="' + my_args.object_name + '.set_checkbox(this)" row_id=' + my_row.id + ' />';
				my_html += '<tr onclick="' + my_args.object_name + '.display_form(' + (i+1) + ')">'
						+  '<td class="jky-checkbox">' + my_checkbox + '</td>'
						+  JKY.set_table_row(my_row)
						+  '</tr>'
						;
			}
			JKY.set_html('jky-app-index', my_index);
			JKY.set_html('jky-app-count', my_count);
			JKY.set_html('jky-table-body', my_html );
//			JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
			JKY.setTableWidthHeight('jky-app-table', 851, 240, 350, 125);
			JKY.set_focus('jky-app-filter');
			JKY.hide('jky-loading');
		}

	function my_display_form(the_index) {
			JKY.display_trace('my_display_form');
			if (my_skip_form) {
				my_skip_form = false;
				return;
			}
//			JKY.show('jky-app-filter'		);
			JKY.hide('jky-app-more'			);
			JKY.show('jky-app-navs'			);
			JKY.hide('jky-app-add-new'		);
			JKY.show('jky-app-counters'		);
			JKY.show('jky-action-add-new'	);
			JKY.hide('jky-action-print'		);
			JKY.show('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.show('jky-action-delete'	);
			JKY.show('jky-action-cancel'	);
			JKY.hide('jky-app-table'		);
			JKY.show('jky-app-form'			);
			JKY.show('jky-app-upload'		);		//	??????????
			JKY.display_form();
			my_display_row(the_index);
		}

	function my_display_row(the_index) {
			JKY.display_trace('my_display_row');
			JKY.show('jky-form-tabs');
			my_index = the_index;
			JKY.row = JKY.get_row(my_args.table_name, JKY.rows[the_index-1]['id']);
			JKY.rows[the_index-1] = JKY.row;
			JKY.set_html('jky-app-index', the_index);
			JKY.set_form_row(JKY.row);
			JKY.set_focus(my_args.focus);
		}

	function my_process_add_new() {
			JKY.display_trace('my_process_add_new');
			JKY.hide('jky-form-tabs');
//			JKY.hide('jky-app-filter'		);
			JKY.hide('jky-app-more'			);
			JKY.hide('jky-app-navs'			);
			JKY.show('jky-app-add-new'		);
			JKY.hide('jky-app-counters'		);
			JKY.hide('jky-action-add-new'	);
			JKY.hide('jky-action-print'		);
			JKY.show('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.hide('jky-action-delete'	);
			JKY.show('jky-action-cancel'	);
			JKY.hide('jky-app-table'		);
			JKY.show('jky-app-form'			);
			JKY.hide('jky-app-upload'		);		//	??????
			JKY.process_add_new();
			my_display_new();
		}

	function my_display_new() {
			JKY.display_trace('my_display_new');
//			my_index = 0;
			JKY.row = null;
			JKY.set_add_new_row();
			JKY.set_focus(my_args.focus);
		}

	function my_process_save() {
			JKY.display_trace('my_process_save');
			if (JKY.Validation.is_invalid(JKY.row, null)) {
				return;
			}

			if (JKY.row == null) {
				my_process_insert();
			}else{
				my_process_update();
			}
		}

	function my_process_insert() {
			JKY.display_trace('my_process_insert');

			var my_set = '';
			if (my_args.program_name == 'Customers') {my_set = ', is_customer = \'Yes\'';}
			if (my_args.program_name == 'Suppliers') {my_set = ', is_supplier = \'Yes\'';}
			var my_data =
				{ method: 'insert'
				, table :  my_args.table_name
				, set	:  JKY.get_form_set() + my_set
				};
			JKY.ajax(false, my_data, my_process_insert_success);
		}

	function my_process_insert_success(response) {
			JKY.display_trace('my_process_insert_success');
			JKY.display_message(response.message);
			JKY.process_insert (response.id);
			my_load_table();
			JKY.Changes.reset();

			if (my_args.add_new == 'display form') {
				my_display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
			}else{
				my_process_add_new();
			}
		}

	function my_process_update() {
			JKY.display_trace('my_process_update');
			var my_where = 'id = ' + JKY.rows[my_index-1]['id'];
			var my_data =
				{ method: 'update'
				, table :  my_args.table_name
				, set	:  JKY.get_form_set()
				, where :  my_where
				};
			JKY.ajax(false, my_data, my_process_update_success);
		}

	function my_process_update_success(response) {
			JKY.display_trace('my_process_update_success');
			JKY.display_message(response.message);
			JKY.process_update (response.id, JKY.row);
			JKY.rows[my_index-1] = JKY.get_row(my_args.table_name, JKY.rows[my_index-1]['id']);
//			my_display_next();
			my_display_row(my_index);
			JKY.Changes.reset();
		}

/**
 * process copy
 */
	function my_process_copy() {
		JKY.display_trace('my_process_copy');
		var my_data =
			{ method: 'insert'
			, table :  my_args.table_name
			, set	:  JKY.get_form_set()
			};
		JKY.ajax(false, my_data, my_process_copy_success);
}

	function my_process_copy_success(response) {
		JKY.display_trace('my_process_copy_success');
		JKY.display_message(response.message);
		my_display_list();
	};

	function my_process_delete() {
			JKY.display_trace('my_process_delete');
			JKY.display_confirm(my_delete_confirmed, null, 'Delete', 'You requested to <b>delete</b> this record. <br>Are you sure?', 'Yes', 'No');
		}

	function my_delete_confirmed() {
			JKY.display_trace('my_delete_confirmed');
			var my_data =
				{ method: 'delete'
				, table :  my_args.table_name
				, where : 'id = ' + JKY.row.id
				};
			JKY.ajax(false, my_data, my_process_delete_success);
		}

	function my_process_delete_success(response) {
			JKY.display_trace('my_process_delete_success');
			JKY.display_message(response.message);
			JKY.process_delete (response.id, JKY.row);
			my_display_list();
		}

	function my_process_cancel() {
			JKY.display_trace('my_process_cancel');
			my_display_list();
			JKY.Changes.reset();
		}

/**
 * process print
 */
	function my_process_print() {
		JKY.display_trace('my_process_print');
		if ($('#jky-app-form').css('display') == 'block') {
			my_print_row(JKY.row.id);
		}else{
			$('#jky-table-body .jky-checkbox input:checked').each(function() {
				my_print_row($(this).attr('row_id'));
			});
		};
	};

/**
 * process print
 */
	function my_print_row(the_id) {
		JKY.display_trace('my_print_row');
		JKY.print_row(the_id);
	}

/**
 * process export
 */
	function my_process_export() {
			JKY.display_trace('my_process_export');
			var my_sort_by = my_args.sort_by + ' ' + my_args.sort_seq;
			JKY.run_export(my_args.table_name, my_args.select, my_args.filter, my_args.specific, my_sort_by);
		};

/**
 * process publish
 */
	function my_process_publish() {
		JKY.display_trace('my_process_publish');
		JKY.process_publish();
	};

/**
 * process change input
 */
	function my_process_change_input(the_id) {
		var my_id = $(the_id).attr('id');
		JKY.display_trace('my_process_change_input: ' + my_id);
		JKY.Changes.increment();
		if (my_id == 'jky-is-company') {
			my_process_is_company(the_id);
		}else{
			JKY.Validation.is_invalid(JKY.row, my_id);
		}
	}

/**
 * only used on [Customers, Suppliers, Companies]
 */
	function my_process_is_company(the_id) {
		JKY.display_trace('my_process_is_company');
		if ($(the_id).is(':checked')) {
			JKY.invisible	('jky-company');
			JKY.hide		('jky-position-line'	);
			JKY.show		('jky-website-line'		);
			JKY.set_html	('jky-cnpj-label','CNPJ');
			JKY.set_html	('jky-ie-label'  ,'IE'	);
		}else{
			JKY.visible		('jky-company');
			JKY.show		('jky-position-line'	);
			JKY.hide		('jky-website-line'		);
			JKY.set_html	('jky-cnpj-label','CPF'	);
			JKY.set_html	('jky-ie-label'  ,'RG'	);
		}
	}

	function my_set(the_args) {
			JKY.display_trace('my_set');
			my_args = the_args;
		}

	function my_get(the_property) {
			JKY.display_trace('my_get');
			return my_args[the_property];
		}

	function my_init() {
		JKY.display_trace('my_init');
		my_set_all_events();
		my_set_initial_values();
	}

//	$(function() {
//		my_changes = 0;
//	});

	return {version				:	'1.0.0'
		, set					:	function(the_args)		{		my_set(the_args)				;}
		, get					:	function(the_property)	{return my_get(the_property)			;}
		, init					:	function()				{		my_init()						;}

		, display_form			:	function(the_index)		{		my_display_form(the_index)		;}
		, set_checkbox			:	function(the_index)		{		my_set_checkbox(the_index)		;}
		, process_is_company	:	function(the_id)		{		my_process_is_company(the_id)	;}
		, process_change_input	:	function(the_id)		{		my_process_change_input(the_id) ;}
	};
}();
