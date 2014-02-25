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

	JKY.row 		= null;		//	null=Add New

	JKY.checkout	= JKY.checkout	|| [];
	JKY.incoming	= JKY.incoming	|| [];
	JKY.loadout		= JKY.laodout	|| [];
	JKY.planning	= JKY.planning	|| [];
	JKY.purchase	= JKY.purchase	|| [];
	JKY.sales		= JKY.sales		|| [];
	JKY.shipdyer	= JKY.shipdyer	|| [];

	JKY.checkout.select = JKY.checkout.select	||	'Draft + Active';
	JKY.incoming.select = JKY.incoming.select	||			'Active';
	JKY.loadout.select	= JKY.loadout.select	||	'Draft + Active';
	JKY.planning.select = JKY.planning.select	||	'Draft + Active';
	JKY.purchase.select = JKY.purchase.select	||	'Draft + Active';
	JKY.sales.select	= JKY.sales.select		||	'Draft + Active';
	JKY.shipdyer.select	= JKY.shipdyer.select	||	'Draft + Active';

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
				$('#jky-action-graph'		).click (function() {JKY.Changes.can_leave(function() { my_display_graph		();})});
				$('#jky-action-form'		).click (function() {JKY.Changes.can_leave(function() { my_display_form			();})});
}
				$('#jky-action-save'		).click (function() {									my_process_save			();});
				$('#jky-action-copy'		).click (function() {JKY.Changes.can_leave(function() { my_process_copy			();})});
				$('#jky-action-delete'		).click (function() {									my_process_delete		();});
				$('#jky-action-cancel'		).click (function() {JKY.Changes.can_leave(function() { my_process_cancel		();})});
//				disabled by tablesorter
//				$('#jky-check-all'			).click (function() {									my_set_all_check	(this);});

				JKY.set_all_events();	// from caller
			}else{
				setTimeout(function() {my_set_all_events();}, 100);
			}
		}

/**
 *	set initial values (run only once per load)
 */
	function my_set_initial_values() {
		JKY.set_css('jky-app-breadcrumb', 'color', '#4C4C4C');
		JKY.display_trace('my_set_initial_values - ' + my_args.program_name);
		if (JKY.is_loaded('jky-body')) {
			JKY.set_html ('jky-app-breadcrumb', JKY.t(my_args.program_name));
			JKY.set_value('jky-app-filter', my_args.filter);
			JKY.hide('jky-app-select-line');
			my_display_list();
//			my_display_form();
			JKY.show('jky-app-header');
			JKY.hide('jky-action-publish'	);
			JKY.show('jky-action-list'		);
			JKY.show('jky-action-form'		);
			JKY.set_initial_values();

//			$('#jky-form-data       input[id]').each (function() {$(this).change(function() 	{my_process_change_input(this);});});
//			$('#jky-form-data     input[name]').each (function() {$(this).change(function() 	{my_process_change_input(this);});});
//			$('#jky-form-data      select[id]').each (function() {$(this).change(function()		{my_process_change_input(this);});});
//			$('#jky-form-data    textarea[id]').each (function() {$(this).change(function()		{my_process_change_input(this);});});

			$('#jky-form-data       input[id]').each (function() {$(this).keyup (function(event)		{my_process_keyup_input (this, event, true	);});});
			$('#jky-form-data     input[name]').each (function() {$(this).keyup (function(event)		{my_process_keyup_input (this, event, true	);});});
			$('#jky-form-data    textarea[id]').each (function() {$(this).keyup (function(event)		{my_process_keyup_input (this, event, false	);});});

			$('#jky-form-data       input[id]').each (function() {$(this).change(function()				{my_process_change_input(this);});});
			$('#jky-form-data     input[name]').each (function() {$(this).change(function()				{my_process_change_input(this);});});
			$('#jky-form-data      select[id]').each (function() {$(this).change(function()				{my_process_change_input(this);});});
			$('#jky-form-data           .date').each (function() {$(this).on('changeDate', function()	{my_process_change_input(this);});});

//			do not use blur, it will break [click] from jky-action-...
//			$('#jky-form-data       input[id]').each (function() {$(this).on('blur', function()		{my_process_verify_input (this);});});
//			$('#jky-form-data     input[name]').each (function() {$(this).on('blur', function()		{my_process_verify_input (this);});});
//			$('#jky-form-data    textarea[id]').each (function() {$(this).on('blur', function()		{my_process_verify_input (this);});});
//			$('#jky-form-data      select[id]').each (function() {$(this).on('blur', function()		{my_process_verify_input (this);});});
//			$('#jky-form-data           .date').each (function() {$(this).on('blur', function()		{my_process_verify_input (this);});});

			$('#jky-form-data       input[id]').each (function() {$(this).change(function()		{my_process_verify_input (this);});});
			$('#jky-form-data     input[name]').each (function() {$(this).change(function()		{my_process_verify_input (this);});});
			$('#jky-form-data    textarea[id]').each (function() {$(this).change(function()		{my_process_verify_input (this);});});
			$('#jky-form-data      select[id]').each (function() {$(this).change(function()		{my_process_verify_input (this);});});
			$('#jky-form-data           .date').each (function() {$(this).change(function()		{my_process_verify_input (this);});});
			JKY.Changes.reset();
		}else{
			setTimeout(function() {my_set_initial_values();}, 100);
		}
	}

	function my_change_select(){
			my_args.select = JKY.get_value('jky-app-select');
			JKY.display_trace('my_change_select: ' + my_args.select);
			my_display_list();

			switch(my_args.program_name) {
				case 'Batches'			:	JKY.incoming.select = my_args.select; break;
				case 'BatchOuts'		:	JKY.checkout.select = my_args.select; break;
//				case 'Boxes'			:	JKY.incoming.select = my_args.select; break;
				case 'CheckOuts'		:	JKY.checkout.select = my_args.select; break;
				case 'Incomings'		:	JKY.incoming.select = my_args.select; break;
				case 'LoadOuts'			:	JKY.loadout.select  = my_args.select; break;
				case 'LoadSales'		:	JKY.loadout.select  = my_args.select; break;
				case 'Orders'			:	JKY.planning.select = my_args.select; break;
				case 'Purchases'		:	JKY.purchase.select = my_args.select; break;
				case 'Purchase Lines'	:	JKY.purchase.select = my_args.select; break;
				case 'Quotations'		:	JKY.sales.select	= my_args.select; break;
				case 'Thread Dyers'		:	JKY.planning.select = my_args.select; break;
			}
		}

	function my_change_filter(){
			my_args.filter = JKY.get_value('jky-app-filter');
			JKY.display_trace('my_change_filter: ' + my_args.filter);
			my_display_list();
		}

	function my_display_prev() {
			JKY.display_trace('my_display_prev: ' + my_index);
			my_index = (my_index <= 1) ? my_count : (my_index-1);
			my_display_row(my_index);
		}

	function my_display_next() {
			JKY.display_trace('my_display_next: ' + my_index);
			my_index = (my_index >= my_count) ? 1 : (my_index+1);
			my_display_row(my_index);
		}

	function my_set_all_check(the_index) {
			JKY.display_trace('set_all_check');
			if ($(the_index).is(':checked')) {
				$('#jky-table-body .jky-td-checkbox input').each(function() {$(this).attr('checked', 'checked');})
			}else{
				$('#jky-table-body .jky-td-checkbox input').each(function() {$(this).removeAttr('checked');})
			}
		}

	function my_set_checkbox(the_index) {
			JKY.display_trace('set_checkbox');
			my_skip_form = true;
			my_index = the_index.rowIndex - 1;
		}

	function my_display_list() {
			JKY.display_trace('my_display_list');
			JKY.show('jky-app-filter'		);
			JKY.show('jky-app-more'			);
			JKY.hide('jky-app-navs'			);
			JKY.hide('jky-app-add-new'		);
			JKY.show('jky-app-counters'		);
			if (JKY.is_loaded('jky-app-form')) {
//				JKY.show('jky-action-add-new');
				JKY.enable_button('jky-action-add-new');
			}else{
				JKY.hide('jky-action-add-new');
			}
			JKY.hide('jky-action-print'		);
			JKY.hide('jky-action-clear'		);
			JKY.hide('jky-action-confirm'	);
			if (JKY.Session.get_value('user_role') == 'Support') {
				JKY.show('jky-action-export');
			}else{
				JKY.hide('jky-action-export');
			}
			JKY.hide('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.disable_button('jky-action-delete');
			JKY.hide('jky-action-cancel'	);
			JKY.show('jky-app-table'		);
		JKY.hide('jky-app-graph'		);
			JKY.hide('jky-app-form'			);
			JKY.display_list();
			my_load_table();
		}

	function my_load_table() {
		JKY.display_trace('my_load_table');
		if (my_args.table_name == '')		return;

		JKY.show('jky-loading');
		var my_data =
			{ method	: 'get_index'
			, table		: my_args.table_name
			, specific	: my_args.specific
			, select	: my_args.select
			, filter	: my_args.filter
			, display	: my_args.display
			, order_by	: my_args.sort_by + ' ' + my_args.sort_seq
			};
		JKY.ajax(false, my_data, my_process_load_success);
	}

	function my_process_load_success(response) {
		JKY.display_trace('my_process_load_success');
		var my_rows	= response.rows;
		my_count	= my_rows.length;
		if (my_index == 0 || my_index > my_count) 		my_index = my_count > 0 ? 1 : 0;
		var my_html = '';
		for(var i=0; i<my_count; i++) {
			var my_row = my_rows[i];
			my_html += my_set_table_row(my_args, my_row);
		}
		JKY.set_html('jky-app-index', my_index);
		JKY.set_html('jky-app-count', my_count);
		JKY.set_html('jky-table-body', my_html);
		setTimeout(function() {
			JKY_ts();
		}, 10);
//		JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
//		JKY.setTableWidthHeight('jky-app-table', 851, 240, 350, 125);
		JKY.set_focus('jky-app-filter');
		JKY.hide('jky-loading');
	}

	function my_set_table_row(the_args, the_row) {
		var my_checkbox = '<input type="checkbox" onclick="' + the_args.object_name + '.set_checkbox(this)" row_id=' + the_row.id + ' />';
		var my_clickrow = JKY.is_loaded('jky-app-form') ? ' onclick="' + the_args.object_name + '.display_form(this)"' : '';
		return '<tr row_id=' + the_row.id + my_clickrow + '>'
			+  '<td class="jky-td-checkbox">' + my_checkbox + '</td>'
			+  JKY.set_table_row(the_row)
			+  '</tr>'
			;
	}

/**
 *	display graph
 *
 *	$param	undefined	display last index
 *	$param	number		display new  index
 *	$param	object		display index of the row
 */
	function my_display_graph(the_index) {
		JKY.display_trace('my_display_graph: ' + the_index);
		JKY.hide('jky-app-table'		);
		JKY.show('jky-app-graph'		);
		JKY.hide('jky-app-form'			);
		JKY.display_graph();
	}

/**
 *	display form
 *
 *	$param	undefined	display last index
 *	$param	number		display new  index
 *	$param	object		display index of the row
 */
		function my_display_form(the_index) {
			JKY.display_trace('my_display_form: ' + the_index);
					if (typeof the_index == 'number')	my_index = the_index;
			else	if (typeof the_index == 'object')	my_index = the_index.rowIndex;

			if (my_skip_form) {
				my_skip_form = false;
				return;
			}
//			JKY.show('jky-app-filter'		);
			JKY.hide('jky-app-more'			);
			JKY.show('jky-app-navs'			);
			JKY.hide('jky-app-add-new'		);
			JKY.show('jky-app-counters'		);
			JKY.enable_button('jky-action-add-new'	);
			JKY.hide('jky-action-print'		);
			JKY.show('jky-action-save'		);
			JKY.hide('jky-action-copy'		);
			JKY.enable_button('jky-action-delete'	);
			JKY.show('jky-action-cancel'	);
			JKY.hide('jky-app-table'		);
		JKY.hide('jky-app-graph'		);
			JKY.show('jky-app-form'			);
			JKY.show('jky-app-upload'		);		//	??????????
			JKY.display_form();
			my_display_row(my_index);
		}

	function my_display_row(the_index) {
		JKY.display_trace('my_display_row');
		JKY.show('jky-form-tabs');
		if (the_index) {
			my_index = the_index;
		}
		JKY.display_trace('my_index: ' + my_index);
		var my_id = $('#jky-app-table tbody tr:eq(' + (my_index-1) + ')').attr('row_id');
		JKY.display_trace('my_id: ' + my_id);
		JKY.row = JKY.get_row(my_args.table_name, my_id);
		JKY.set_html('jky-app-index', my_index);
		JKY.set_form_row(JKY.row);
		JKY.set_focus(my_args.focus);
	}

	function my_process_add_new() {
		JKY.display_trace('my_process_add_new');
		JKY.hide('jky-form-tabs');
//		JKY.hide('jky-app-filter'		);
		JKY.hide('jky-app-more'			);
		JKY.hide('jky-app-navs'			);
		JKY.show('jky-app-add-new'		);
		JKY.hide('jky-app-counters'		);
		JKY.disable_button('jky-action-add-new'	);
		JKY.hide('jky-action-print'		);
		JKY.show('jky-action-save'		);
		JKY.hide('jky-action-copy'		);
		JKY.disable_button('jky-action-delete'	);
		JKY.show('jky-action-cancel'	);
		JKY.hide('jky-app-table'		);
		JKY.show('jky-app-form'			);
		JKY.hide('jky-app-upload'		);		//	??????
		JKY.process_add_new();
		my_display_new();
	}

	function my_display_new() {
		JKY.display_trace('my_display_new');
//		my_index = 0;
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
			if (my_args.program_name == 'Customers'	) {my_set = ', is_customer  = \'Yes\'';}
			if (my_args.program_name == 'Suppliers'	) {my_set = ', is_supplier  = \'Yes\'';}
			if (my_args.program_name == 'Dyers'		) {my_set = ', is_dyer      = \'Yes\'';}
			if (my_args.program_name == 'Partners'	) {my_set = ', is_partner   = \'Yes\'';}
			if (my_args.program_name == 'Transports') {my_set = ', is_transport = \'Yes\'';}
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
			var my_row = JKY.get_row(my_args.table_name, response.id);
			var my_html = my_set_table_row(my_args, my_row);
			$('#jky-table-body').prepend(my_html);
			my_index  = 1;
			my_count += 1;
			JKY.set_html('jky-app-count', my_count);
			JKY.Changes.reset();

			if (my_args.add_new == 'display form') {
//				my_display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
//				my_index = $('#jky-table-body tr[row_id="' + response.id + '"]').index() + 1;
				my_display_form(my_index);		//	display added record
			}else{
				my_process_add_new();
			}
		}

	function my_process_update() {
			JKY.display_trace('my_process_update');
			var my_data =
				{ method: 'update'
				, table :  my_args.table_name
				, set	:  JKY.get_form_set()
				, where :  'id = ' + JKY.row.id
				};
			JKY.ajax(false, my_data, my_process_update_success);
		}

	function my_process_update_success(response) {
			JKY.display_trace('my_process_update_success');
			JKY.display_message(response.message);
			JKY.process_update (response.id, JKY.row);
//			JKY.rows[my_index-1] = JKY.get_row(my_args.table_name, JKY.rows[my_index-1]['id']);
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
		JKY.process_copy   (response.id, JKY.row);
		my_display_list();
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

		$('#jky-table-body tr:eq(' + (my_index-1) + ')').remove();
		my_count -= 1;
		JKY.set_html('jky-app-count', my_count);
		if (my_count == 0) {
			my_process_add_new()
		}else{
			my_display_next();
		}
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
			$('#jky-table-body .jky-td-checkbox input:checked').each(function() {
				my_print_row($(this).attr('row_id'));
			});
		}
	}

/**
 * process print
 */
	function my_print_row(the_id) {
		JKY.display_trace('my_print_row');
		JKY.print_row(the_id);
	}

/**
 * change status
 */
	function my_change_status(the_id) {
		var my_status = JKY.is_status('Active') ? 'Inactive' : 'Active';
		var my_data =
			{ method	: 'update'
			, table		:  my_args.table_name
			, set		: 'status = \'' + my_status + '\''
			, where		: 'id = ' + the_id
			};
//		JKY.ajax(false, my_data, my_display_list);
		JKY.ajax(false, my_data, my_display_form);
		JKY.display_message('record (' + the_id + ') changed')
	}

/**
 * process close
 */
	function my_close_row(the_id) {
		var my_data =
			{ method	: 'update'
			, table		:  my_args.table_name
			, set		: 'status = \'Closed\''
			, where		: 'id = ' + the_id
			};
		JKY.ajax(false, my_data, my_display_list);
		JKY.display_message('record (' + the_id + ') closed')
	}

/**
 * process export
 */
	function my_process_export() {
			JKY.display_trace('my_process_export');
			var my_sort_by = my_args.sort_by + ' ' + my_args.sort_seq;
			JKY.run_export(my_args.table_name, my_args.select, my_args.filter, my_args.specific, my_sort_by);
		}

/**
 * process publish
 */
	function my_process_publish() {
		JKY.display_trace('my_process_publish');
		JKY.process_publish();
	}

/**
 * process keup input
 */
	function my_process_keyup_input(the_id, the_event, the_enter) {
//JKY.set_html('jky-event-which', the_event.keyCode);
		if (the_enter && the_event.which == 13) {
//			not able to simulate tab to focus on next field
//			$(the_id).trigger({type:'keypress', which:9});
//			$(the_id).next("input, textarea").focus();
			return;
		}
//JKY.set_html('jky-event-which', the_event.keyCode);
		if (the_event.which ==   8									//	backspace
		||  the_event.which ==  13									//	enter
		||  the_event.which ==  32									//	space
		||  the_event.which ==  46									//	delete
		|| (the_event.which >=  48 && the_event.which <=  90)		//	0 - Z
		|| (the_event.which >=  96 && the_event.which <= 111)		//	0 - /
		|| (the_event.which >= 160 && the_event.which <= 222)) {	//	^ - "
			JKY.Changes.increment();
		}
	}

/**
 * process change input
 */
	function my_process_change_input(the_id, the_event) {
		var my_id = $(the_id).attr('id');
		JKY.display_trace('my_process_change_input: ' + my_id);
		JKY.Changes.increment();
	}

/**
 * process verify input
 */
	function my_process_verify_input(the_id) {
		var my_id = $(the_id).attr('id');
		JKY.display_trace('my_process_verify_input: ' + my_id);
		JKY.Validation.is_invalid(JKY.row, my_id);
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

		, set_all_check			:	function(the_index)		{		my_set_all_check(the_index);	;}
		, display_list			:	function()				{		my_display_list	()				;}
		, display_form			:	function(the_index)		{		my_display_form	(the_index)		;}
		, display_row			:	function(the_index)		{		my_display_row	(the_index)		;}
		, change_status			:	function(the_index)		{		my_change_status(the_index)		;}
		, close_row				:	function(the_index)		{		my_close_row	(the_index)		;}
		, set_checkbox			:	function(the_index)		{		my_set_checkbox	(the_index)		;}
		, Xprocess_is_company	:	function(the_id)		{		Xmy_process_is_company(the_id)	;}
		, process_change_input	:	function(the_id)		{		my_process_change_input(the_id) ;}
	};
}();
