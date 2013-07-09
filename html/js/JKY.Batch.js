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
		var my_row = response.row;
		var my_html = '';
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
		JKY.set_focus('jky-boxes-labels-to-print');
		JKY.show_modal(my_layer);
	}


	function my_print() {
		var my_labels_to_print = parseFloat(JKY.get_value('jky-boxes-labels-to-print'));
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
			JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_checkin_boxes);
		}
		var my_data =
			{ method	: 'update'
			, table		: 'Batches'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Batches.id=' + my_id
			};
		JKY.ajax(false, my_data, my_update_data_success);
	}
	
	function my_update_data_success(response) {
		$(my_index).parent().find('.jky-batch-labels-printed' ).val(my_labels_printed);
		JKY.hide_modal(my_layer);
	}

	return {
		  display		: function(the_index, the_id)	{		my_display(the_index, the_id);}
		, print			: function()					{		my_print();}
	};
}();