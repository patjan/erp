"use strict";

/**
 * JKY.Pieces - process all changes during one transaction
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-pieces-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-pieces-row-name').val(my_name);
 */
JKY.Pieces = function() {
	var my_index		=  null;		//	external id that initiated the call
	var my_the_id		=  null;
	var my_id			=  null;
	var my_layer		= 'jky-pieces-layer';
	var my_row			=  null;

	var my_ordered_pieces 	= 0;
	var my_labels_printed	= 0;

	function my_display(the_id) {
		my_the_id = the_id;
		my_load_data(JKY.row.id);
	}

	function my_load_data(the_id) {
		my_id = the_id;
		var my_data =
			{ method	: 'get_row'
			, table		: 'Orders'
			, where		: 'Orders.id=' + the_id
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		my_row = response.row;
		my_ordered_pieces 	= parseFloat(my_row.ordered_pieces	);
		my_labels_printed	= parseFloat(my_row.labels_printed	);
		var my_labels_unprinted	= my_ordered_pieces - my_labels_printed;
		var my_labels_to_print	= my_labels_unprinted > 100 ? 100 : my_labels_unprinted;
//		var my_machine_name = JKY.get_value('jky-machine-name');
//		var my_partner_name = JKY.get_value('jky-partner-name');
//		var my_produced_by	= my_machine_name == '' ? my_partner_name : my_machine_name;
		var my_machine_name = my_row.machine_name;
		var my_partner_name = my_row.partner_name;
		var my_produced_by	= my_machine_name == null ? my_partner_name : my_machine_name;

		JKY.set_value('jky-pieces-ordered-pieces'	, my_ordered_pieces		);
		JKY.set_value('jky-pieces-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-pieces-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-pieces-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-pieces-produced-by'		, my_produced_by		);

		JKY.set_focus('jky-pieces-labels-to-print');
		JKY.show_modal(my_layer);
	}

	function my_print() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-pieces-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-pieces-labels-to-print' ));
		var my_produced_by		= JKY.get_value('jky-pieces-produced-by');
		if (isNaN(my_labels_to_print)
		||  my_labels_to_print < 1
		||	my_labels_to_print > 100
		||  my_produced_by == '') {
			JKY.display_message(JKY.t('Info is invalid'));
			JKY.set_focus('jky-pieces-labels-to-print');
			return;
		}
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_data = '';
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_ordered_pieces);
			var my_set = ''
					+          ' order_id =  ' + my_id
					+ ', number_of_pieces =  ' + my_labels_printed
					+      ', produced_by =\'' + my_produced_by + '\''
					+       ', checkin_by =  ' + JKY.Session.get_value('user_id')
					+       ', checkin_at =\'' + JKY.get_now() + '\''
					;
			my_data =
				{ method	: 'insert'
				, table		: 'Pieces'
				, set		: my_set
				}
			JKY.ajax(false, my_data, my_insert_pieces_success);
		}
		my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Orders.id=' + my_id
			};
		JKY.ajax(false, my_data, my_update_data_success);
	}

	function my_insert_pieces_success(response) {
return;
	}

	function my_update_data_success(response) {
		var my_data =
			{ method	: 'print_labels'
			, table		: 'Pieces'
			}
//		JKY.ajax(false, my_data, my_print_labels_success);
//	}

//	function my_print_labels_success(response) {
		JKY.set_value('jky-labels-printed', my_labels_printed);
		JKY.hide_modal(my_layer);
		JKY.display_message(response.message);
	}


	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, print			: function()					{		my_print();}
	};
}();