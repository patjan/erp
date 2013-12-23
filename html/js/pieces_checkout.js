"use strict";

/**
 * pieces_loadout.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces Check Out'
		, table_name	: 'LoadSets'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'LoadOut.requested_at'
		, sort_seq		: 'ASC'
		, focus			: 'jky-piece-input-barcode'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-clear'		).click	(function() {JKY.process_clear_screen	();});
	$('#jky-action-confirm'		).click	(function() {JKY.process_confirm_screen	();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-piece-input-barcode').change(function() {JKY.process_input_barcode	();});
	$('#jky-piece-check-all'	).click (function() {JKY.set_all_piece_check	(this);});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_css('jky-app-breadcrumb', 'color', '#CC0000');
	JKY.set_side_active('jky-pieces-checkout');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	JKY.process_clear_screen();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-loadout-number"	>' +				 the_row.loadout_number			+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.out_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-dyer-name"		>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-color-name"		>' + JKY.fix_null	(the_row.color_name			)	+ '</td>'
		+  '<td class="jky-sale-number"		>' +				 the_row.sale_number			+ '</td>'
		+  '<td class="jky-customer-name"	>' +				 the_row.customer_name			+ '</td>'
		+  '<td class="jky-product-short"	>' +				 the_row.product_name			+ '</td>'
		+  '<td class="jky-checkin-location">' +				 the_row.checkin_location		+ '</td>'
		+  '<td class="jky-checkin-pieces"	>' +				 the_row.checkin_pieces			+ '</td>'
		+  '<td class="jky-reserved-pieces"	>' +				 the_row.reserved_pieces		+ '</td>'
		+  '<td class="jky-checkout-pieces"	>' +				 the_row.checkout_pieces		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'				, JKY.t(the_row.status		));
	JKY.set_value	('jky-loadout-number'		, the_row.loadout_number	);
	JKY.set_value	('jky-dyer-name'			, the_row.dyer_name			);
	JKY.set_value	('jky-color-name'			, the_row.color_name		);
	JKY.set_value	('jky-sale-number'			, the_row.sale_number		);
	JKY.set_value	('jky-customer-name'		, the_row.customer_name		);
	JKY.set_value	('jky-product-name'			, the_row.product_name		);
	JKY.set_value	('jky-checkin-location'		, the_row.checkin_location	);
	JKY.set_value	('jky-customer-name'		, the_row.customer_name		);
	JKY.set_value	('jky-product_name'			, the_row.product_name		);
	JKY.set_value	('jky-requested-date'		, the_row.requested_at		);

	JKY.set_value	('jky-reserved-pieces'		, the_row.reserved_pieces	);

	JKY.set_value	('jky-checkout-weight'		, the_row.checkout_weight	);
	JKY.set_value	('jky-checkout-pieces'		, the_row.checkout_pieces	);
};

JKY.set_all_piece_check = function(the_index) {
	JKY.display_trace('set_all_piece_check');
	if ($(the_index).is(':checked')) {
		$('#jky-piece-table-body .jky-checkbox input').each(function() {$(this).attr('checked', 'checked');})
	}else{
		$('#jky-piece-table-body .jky-checkbox input').each(function() {$(this).removeAttr('checked');})
	}
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-export' );
};

JKY.display_form = function() {
	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-export' );
};

JKY.process_clear_screen = function() {
	JKY.hide('jky-action-clear'  );
	JKY.hide('jky-action-confirm');
	JKY.remove_attr('jky-piece-check-all', 'checked');
	JKY.set_html ('jky-piece-table-body'	, '');
	JKY.set_html ('jky-piece-input-message'	, '');
	JKY.set_value('jky-piece-input-barcode'	, '');
	JKY.set_focus('jky-piece-input-barcode');
	JKY.sequence = 0;
}

JKY.process_input_barcode = function() {
	var my_barcode = JKY.get_value('jky-piece-input-barcode');
//	JKY.display_trace('process_input_barcode: ' + my_barcode);
	var my_data =
		{ method	: 'get_row'
		, table		: 'Pieces'
		, where		: 'Pieces.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, JKY.process_barcode_success);
}

JKY.process_barcode_success = function(response) {
	var my_row  = response.row;
	if (my_row) {
		var my_barcode = JKY.get_value('jky-piece-input-barcode');
		if ($('#jky-piece-table-body td:contains("' + my_barcode + '")').length > 0) {
			JKY.play_beep();
			JKY.set_html ('jky-piece-input-message', JKY.t('duplicate'));
			JKY.set_focus('jky-piece-input-barcode');
		}else{
			var	my_checkbox = '<input type="checkbox" onclick="JKY.App.set_checkbox(this)" barcode=' + my_barcode + ' />';
			var my_status_class = '';
			if (my_row.status != 'Check In' && my_row.status != 'Return') {
				my_status_class = 'jky-error ';
				my_checkbox = '';
			}
			var my_location_class = '';
			if (my_row.checkin_location != JKY.row.checkin_location) {
				my_location_class = 'jky-error ';
				my_checkbox = '';
			}

			var my_sequence = '';
			if (my_checkbox != '') {
				JKY.sequence++;
				my_sequence = JKY.sequence;
			}

			var my_html = '<tr>'
					+ '<td class="jky-checkbox"			>' +  my_checkbox				+ '</td>'
					+ '<td class="jky-barcode"			>' +  my_row.barcode			+ '</td>'
					+ '<td class="jky-sequence"			>' +  my_sequence				+ '</td>'
					+ '<td class="' + my_status_class	+ 'jky-status"			>' +  JKY.t(my_row.status)		+ '</td>'
					+ '<td class="jky-produced-by"		>' +  my_row.produced_by		+ '</td>'
					+ '<td class="jky-number-of-pieces"	>' +  my_row.number_of_pieces	+ '</td>'
					+ '<td class="jky-checkin-weight"	>' +  my_row.checkin_weight		+ '</td>'
					+ '<td class="' + my_location_class + 'jky-checkin-location">' +  my_row.checkin_location	+ '</td>'
					+ '<td class="jky-product-name"		>' +  my_row.product_name		+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-piece-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.show('jky-action-confirm');
			JKY.set_html ('jky-piece-input-message', '');
			JKY.set_value('jky-piece-input-barcode', '');
		}
	}else{
		JKY.play_beep();
		JKY.set_html ('jky-piece-input-message', JKY.t('not found'));
		JKY.set_focus('jky-piece-input-barcode');
	}
}

/**
 * confirm screen
 */
JKY.process_confirm_screen = function() {
	JKY.display_trace('process_confirm_screen');
//	if ($('#jky-app-form').css('display') == 'block') {
//		JKY.confirm_row(JKY.row.id);
//	}else{
		$('#jky-piece-table-body .jky-checkbox input:checked').each(function() {
			JKY.confirm_row(this, $(this).attr('barcode'));
		});
//	}

	if (JKY.get_html('jky-piece-table-body') == '') {
		JKY.process_clear_screen();
	}
	JKY.set_focus('jky-piece-input-barcode');
}

/**
 * confirm row
 */
JKY.confirm_row = function(the_id, the_barcode) {
	JKY.display_trace('confirm_row');
	JKY.display_message(JKY.t('Confirmed, barcode') + ': ' + the_barcode);
	var my_data =
		{ method		: 'checkout'
		, table			: 'Pieces'
		, barcode		: the_barcode
		, location		: JKY.row.dyer_name
		, loadset_id	: JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.confirm_row_success);
	$(the_id).parent().parent().remove();
}

/**
 * confirm row success
 */
JKY.confirm_row_success = function(response) {
	JKY.display_trace('confirm_row');
//	JKY.set_value('jky-checkout-weight', JKY.get_value_by_id('BatchOuts', 'checkout_weight', JKY.row.id));
//	JKY.set_value('jky-checkout-pieces', JKY.get_value_by_id('BatchOuts', 'checkout_pieces', JKY.row.id));
	JKY.row = JKY.get_row(my_args.table_name, JKY.row.id);
	JKY.set_value('jky-reserved-pieces' , JKY.row.reserved_pieces );
	JKY.set_value('jky-checkout-weight', JKY.row.checkout_weight);
	JKY.set_value('jky-checkout-pieces' , JKY.row.checkout_pieces );
}

