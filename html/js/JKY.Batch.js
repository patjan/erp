"use strict";

/**
 * JKY.Batch - process all changes during one transaction
 *			   control save into private array [my_appraisals]
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-thread-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-thread-row-name').val(my_name);
 */
JKY.Batch = function() {
	var my_index 	= null;		//	external id that initiated the call
	var my_id		= null;
	var my_layer	= 'jky-boxes-layer';
	var my_row		= null;

	var my_checkin_boxes 	= 0;
	var my_labels_printed	= 0;

	function my_display(the_index, the_id) {
		my_index = the_index;
		my_id	 = the_id;
		my_load_data(my_id);
	}

	function my_load_data(the_id) {
		var my_data =
			{ method	: 'get_row'
			, table		: 'Batches'
			, where		: 'Batches.id=' + the_id
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		my_row = response.row;
		my_checkin_boxes 	= parseFloat(my_row.checkin_boxes	);
		my_labels_printed	= parseFloat(my_row.labels_printed	);
		var my_labels_unprinted	= my_checkin_boxes - my_labels_printed;
		var my_labels_to_print  = 16;
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		JKY.set_value('jky-boxes-checkin-boxes'		, my_checkin_boxes		);
		JKY.set_value('jky-boxes-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-boxes-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-boxes-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-boxes-location'			, '');
		JKY.set_focus('jky-boxes-labels-to-print');
		JKY.show_modal(my_layer);
	}


	function my_print() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-boxes-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-boxes-labels-to-print' ));
		var my_location			= JKY.get_value('jky-boxes-location').toUpperCase();
		if (my_labels_to_print <= 0 || my_location == '') {
			JKY.set_focus('jky-boxes-labels-to-print');
			return;
		}
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_data = '';
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_checkin_boxes);
			var my_set = ''
					+          ' batch_id =  ' + my_id
					+  ', number_of_boxes =  ' + my_labels_printed
					+  ', number_of_cones =  ' + my_row.number_of_cones
					+   ', average_weight =  ' + my_row.average_weight
					+ ', checkin_location =\'' + my_location + '\''
					+       ', checkin_by =  ' + JKY.Session.get_value('user_id')
					+       ', checkin_at =\'' + JKY.get_now() + '\''
					;
			my_data =
				{ method	: 'insert'
				, table		: 'Boxes'
				, set		: my_set
				}
			JKY.ajax(false, my_data, my_insert_boxes_success);
		}
		my_data =
			{ method	: 'update'
			, table		: 'Batches'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Batches.id=' + my_id
			};
		JKY.ajax(false, my_data, my_update_data_success);
	}

	function my_insert_boxes_success(response) {
		var my_data =
			{ method	: 'get_row'
			, table		: 'Boxes'
			, where		: 'Boxes.id = ' + response.id
			}
		JKY.ajax(false, my_data, my_get_row_boxes_success);
	}

	function my_get_row_boxes_success(response) {
		var my_row = response.row;
		var my_thread_id		= JKY.get_value_by_id('Batches'		, 'thread_id'	, my_row.batch_id	);
		var my_incoming_id		= JKY.get_value_by_id('Batches'		, 'incoming_id'	, my_row.batch_id	);
		var my_supplier_id		= JKY.get_value_by_id('Incomings'	, 'supplier_id'	, my_incoming_id	);
		var my_composition		= JKY.get_value_by_id('Threads'		, 'composition'	, my_thread_id		);
		var my_thread_name		= JKY.get_value_by_id('Threads'		, 'name'		, my_thread_id		);
		var my_supplier_name	= JKY.get_value_by_id('Contacts'	, 'nick_name'	, my_supplier_id	);

		var my_checkin_at		= JKY.out_time	(my_row.checkin_at		);
		var my_average_weight	= parseFloat	(my_row.average_weight	);
		var my_real_weight		= parseFloat	(my_row.real_weight		);
		if (my_real_weight == 0) {
			my_real_weight = my_average_weight;
		}
		var my_number_of_cones	= my_row.number_of_cones	;
		var my_batch_number		= my_row.batch				;
		var my_checkin_location	= my_row.checkin_location	;
		var my_barcode			= my_row.barcode			;

		var my_html = ''
			+ '<br>    Checkin Time: ' + my_checkin_at
			+ '<br>     Real Weight: ' + my_real_weight + ' Kg'
			+ '<br>     Composition: ' + my_composition
			+ '<br> Number of Cones: ' + my_number_of_cones
			+ '<br>    Batch Number: ' + my_batch_number
			+ '<br>     Thread Name: ' + my_thread_name
			+ '<br>   Supplier Name: ' + my_supplier_name
			+ '<br>Checkin Location: ' + my_checkin_location
			+ '<br>         Barcode: ' + my_barcode + '------------------'
			;
		JKY.display_message(my_html);
	}

	function my_update_data_success(response) {
		$(my_index).parent().parent().find('.jky-batch-labels-printed' ).val(my_labels_printed);
		JKY.hide_modal(my_layer);
	}

	return {
		  display		: function(the_index, the_id)	{		my_display(the_index, the_id);}
		, print			: function()					{		my_print();}
	};
}();