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
	var my_layer		= 'jky-pieces-layer';
	var my_row			=  null;

	var my_ordered_pieces 	= 0;
	var my_labels_printed	= 0;

	function my_display(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		my_load_data(JKY.row.id);
	}

	function my_load_data(the_id) {
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
		var my_labels_to_print	= my_labels_unprinted;
//		var my_average_weight = my_row.average_weight;

		JKY.set_value('jky-pieces-ordered-pieces'	, my_ordered_pieces		);
		JKY.set_value('jky-pieces-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-pieces-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-pieces-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-pieces-location'			, my_row.machine_name	);
//		JKY.set_value('jky-pieces-average-weight'	, my_row.average_weight	);
/*
		if (my_average_weight < 20.00
		||  my_average_weight > 40.00) {
			JKY.set_css('jky-pieces-average-weight', 'color', '#CC0000');
		}else{
			JKY.set_css('jky-pieces-average-weight', 'color', '#51A351');
		}
*/
		JKY.set_focus('jky-pieces-labels-to-print');
		JKY.show_modal(my_layer);
	}

	function my_print() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-pieces-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-pieces-labels-to-print' ));
		var my_location			= JKY.get_value('jky-pieces-location').toUpperCase();
		if (isNaN(my_labels_to_print)
		||  my_labels_to_print < 1
		||	my_labels_to_print > 100
		||  my_location == '') {
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
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_received_pieces);
			var my_set = ''
					+          ' batch_id =  ' + my_id
					+  ', number_of_pieces =  ' + my_labels_printed
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
			JKY.ajax(false, my_data, my_insert_pieces_success);
		}
		my_data =
			{ method	: 'update'
			, table		: 'Batches'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Batches.id=' + my_id
			};
//		JKY.ajax(false, my_data, my_update_data_success);
	}

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, print			: function()					{		my_print();}
	};
}();