"use strict";

/**
 * JKY.Application - process all application functions
 *
 * method:
 *
 * require:	JKY.Utils.js
 *
 */
JKY.Application = function() {
	var my_args		= null;
	var my_count	= 0;
	var my_index	= 0;		//	0=Add New
	var my_skip_form;

	JKY.rows		= [];
	JKY.row 		= null;

/**
 *	set all events (run only once per load)
 */
	function my_set_all_events() {
			JKY.display_trace('my_set_all_events');
			if (JKY.is_loaded('jky-body-loaded')) {
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
				$('#jky-action-save'		).click (function() {									my_process_save			();});
				$('#jky-action-delete'		).click (function() {JKY.Changes.can_leave(function() { my_process_delete		();})});
				$('#jky-action-cancel'		).click (function() {JKY.Changes.can_leave(function() { my_process_cancel		();})});
				$('#jky-check-all'			).click (function() {									my_set_all_check	(this);});
				$('#jky-form-data    input[id]').each (function() {$(this).change(function() 	{my_process_change_input(this);});});
				$('#jky-form-data   select[id]').each (function() {$(this).change(function()	{my_process_change_input(this);});});
				$('#jky-form-data textarea[id]').each (function() {$(this).change(function()	{my_process_change_input(this);});});
				JKY.set_all_events();	// from caller
			}else{
				setTimeout(function() {my_set_all_events();}, 100);
			}
		}

/**
 *	set initial values (run only once per load)
 */
	function my_set_initial_values() {
			JKY.display_trace('my_set_initial_values');
			if (JKY.is_loaded('jky-body')) {
				JKY.set_html('jky-app-breadcrumb', JKY.t(my_args.program_name));
				my_display_list();
//				my_display_form(1);
				JKY.show('jky-app-header');
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
			JKY.hide('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.hide('jky-action-delete'	);
			JKY.hide('jky-action-cancel'	);
			JKY.hide('jky-action-publish'	);
			JKY.show('jky-app-table'		);
			JKY.hide('jky-app-form'			);
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
			JKY.hide('jky-action-reset'		);
			JKY.hide('jky-action-copy'		);
			JKY.show('jky-action-delete'	);
			JKY.show('jky-action-cancel'	);
			JKY.hide('jky-app-table'		);
			JKY.show('jky-app-form'			);
			JKY.show('jky-app-upload'		);
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
			JKY.hide('jky-action-reset'		);
			JKY.hide('jky-action-copy'		);
			JKY.hide('jky-action-delete'	);
			JKY.show('jky-action-cancel'	);
			JKY.hide('jky-app-table'		);
			JKY.show('jky-app-form'			);
			JKY.hide('jky-app-upload'		);
			my_display_new();
		}

	function my_display_new() {
			JKY.display_trace('my_display_new');
			my_index = 0;
			JKY.set_add_new_row();
			JKY.set_focus(my_args.focus);
		}

	function my_process_save() {
			JKY.display_trace('my_process_save');
			if (my_is_invalid(null)) {
				return;
			}

			if (my_index == 0) {
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
//			display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
			my_process_add_new();
			JKY.Changes.reset();
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
 * process export
 */
	function my_process_export() {
			JKY.display_trace('my_process_export');
			var my_sort_by = my_args.sort_by + ' ' + my_args.sort_seq;
			JKY.run_export(my_args.table_name, my_args.select, my_args.filter, my_args.specific, my_sort_by);
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
				my_is_invalid(my_id);
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

	function my_is_invalid(the_id) {
			JKY.display_trace('my_is_invalid');
			var my_error = '';

			if (JKY.is_loaded('jky-user-name') && (the_id == null || the_id == 'jky-user-name')) {
				var my_user_name = JKY.get_value('jky-user-name');
				if (JKY.is_empty(my_user_name)) {
					if (my_args.program_name != 'Contacts') {
						my_error += JKY.set_is_required('User Name');
					}
				}else{
					var my_id = JKY.get_user_id(my_user_name);
					if (!JKY.is_empty(my_id) && ( JKY.row == null || my_id != JKY.row.user_id)) {
						my_error += JKY.set_already_taken('User Name');
					}
				}
			}

			if (JKY.is_loaded('jky-nick-name') && (the_id == null || the_id == 'jky-nick-name')) {
				var my_nick_name = JKY.get_value('jky-nick-name');
				if (JKY.is_empty(my_nick_name)) {
					my_error += JKY.set_is_required('Nick Name');
				}
				var my_id = JKY.get_id('Contacts', 'nick_name = \'' + my_nick_name + '\'');
				if (!JKY.is_empty(my_id) && ( JKY.row == null || my_id != JKY.row.id)) {
					my_error += JKY.set_already_taken('Nick Name');
				}
			}

			if (JKY.is_loaded('jky-full-name') && (the_id == null || the_id == 'jky-full-name')) {
				var my_full_name = JKY.get_value('jky-full-name');
				if (JKY.is_empty(my_full_name)) {
					my_error += JKY.set_is_required('Full Name');
				}
				var my_id = JKY.get_id('Contacts', 'full_name = \'' + my_full_name + '\'');
				if (!JKY.is_empty(my_id) && ( JKY.row == null || my_id != JKY.row.id)) {
					my_error += JKY.set_already_taken('Full Name');
				}
			}

			if (JKY.is_loaded('jky-contact-company') && (the_id == null || the_id == 'jky-contact-company')) {
				if (!JKY.is_checked('jky-is-company')) {
					var my_company_id = JKY.get_value('jky-contact-company');
					if (JKY.is_empty(my_company_id)) {
						my_error += JKY.set_is_required('Company');
					}
				}
			}
/*
			if (JKY.is_loaded('jky-contact-tag') && (the_id == null || the_id == 'jky-contact-tag')) {
				var my_contact_tag = JKY.get_value('jky-contact-tag');
				if (JKY.is_empty(my_contact_tag)) {
					my_error += JKY.set_is_required('Tag');
				}
			}

			if (JKY.is_loaded('jky-cnpj') && (the_id == null || the_id == 'jky-cnpj')) {
				var my_cnpj = JKY.get_value('jky-cnpj');
				if (!JKY.is_empty(my_cnpj) && !JKY.is_numeric(my_cnpj)) {
					my_error += JKY.set_must_be_numeric('CNPJ or CPF');
				}
			}

			if (JKY.is_loaded('jky-ie') && (the_id == null || the_id == 'jky-ie')) {
				var my_ie = JKY.get_value('jky-ie');
				if (!JKY.is_empty(my_ie) && !JKY.is_numeric(my_ie)) {
					my_error += JKY.set_must_be_numeric('IE or RG');
				}
			}
*/
			if (JKY.is_empty(my_error)) {
				return false;
			}else{
				JKY.display_message(my_error);
				return true;
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

//	$(function() {
//		my_changes = 0;
//	});

	return {version			:	'1.0.0'
		, set				:	function(the_args)		{		my_set(the_args)				;}
		, get				:	function(the_property)	{return my_get(the_property)			;}
		, display_form		:	function(the_index)		{		my_display_form(the_index)		;}
		, set_checkbox		:	function(the_index)		{		my_set_checkbox(the_index)		;}
		, process_is_company:	function(the_id)		{		my_process_is_company(the_id)	;}

		, init				:	function() {
									my_set_all_events();
									my_set_initial_values();
								}
	};
}();