"use strict";

/**
 * boxes_checkout.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Boxes Check Out'
		, table_name	: 'BatchSets'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'CheckOuts.requested_date'
		, sort_seq		: 'ASC'
		, focus			: 'jky-box-input-barcode'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-clear'			).click	(function() {JKY.process_clear_screen	();});
	$('#jky-action-confirm'			).click	(function() {JKY.process_confirm_screen	();});
	$('#jky-box-input-barcode'		).change(function() {JKY.process_input_barcode	();});
	$('#jky-box-check-all'			).click (function() {JKY.set_all_box_check	(this);});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_css('jky-app-breadcrumb', 'color', '#CC0000');
	JKY.set_side_active('jky-boxes-checkout');
	JKY.process_clear_screen();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-checkout-number"	>' +				 the_row.checkout_number		+ '</td>'
//		+  '<td class="jky-code"				>' +				 the_row.code					+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.out_date	(the_row.requested_date		)	+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-thread-name"		>' +				 the_row.thread_name			+ '</td>'
		+  '<td class="jky-batch-number"	>' +				 the_row.batch_number			+ '</td>'
//		+  '<td class="jky-unit-price"		>' +				 the_row.unit_price				+ '</td>'
//		+  '<td class="jky-average-weight"	>' +				 the_row.average_weight			+ '</td>'
//		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
//		+  '<td class="jky-requested-boxes"	>' +				 the_row.requested_boxes		+ '</td>'
		+  '<td class="jky-checkin-location">' +				 the_row.checkin_location		+ '</td>'
		+  '<td class="jky-reserved-boxes"	>' +				 the_row.reserved_boxes			+ '</td>'
//		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-checkout-boxes"	>' +				 the_row.checkout_boxes			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-checkout-number'		, the_row.checkout_number	);
	JKY.set_value	('jky-thread-name'			, the_row.thread_name		);
	JKY.set_value	('jky-batch-number'			, the_row.batch_number		);
	JKY.set_value	('jky-checkin-location'		, the_row.checkin_location	);
	JKY.set_value	('jky-machine-name'			, the_row.machine_name		);
	JKY.set_value	('jky-supplier-name'		, the_row.supplier_name		);
	JKY.set_value	('jky-requested-date'		, the_row.requested_date	);
	JKY.set_value	('jky-requested-weight'		, the_row.requested_weight	);
	JKY.set_value	('jky-reserved-boxes'		, the_row.reserved_boxes	);
	JKY.set_value	('jky-average-weight'		, the_row.average_weight	);
	JKY.set_value	('jky-checkout-weight'		, the_row.checkout_weight	);
	JKY.set_value	('jky-checkout-boxes'		, the_row.checkout_boxes	);
//	JKY.display_lines();
};

JKY.set_all_box_check = function(the_index) {
	JKY.display_trace('set_all_box_check');
	if ($(the_index).is(':checked')) {
		$('#jky-box-table-body .jky-checkbox input').each(function() {$(this).attr('checked', 'checked');})
	}else{
		$('#jky-box-table-body .jky-checkbox input').each(function() {$(this).removeAttr('checked');})
	}
}

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
	JKY.remove_attr('jky-box-check-all', 'checked');
	JKY.set_html ('jky-box-table-body'	 , '');
	JKY.set_html ('jky-box-input-message', '');
	JKY.set_value('jky-box-input-barcode', '');
	JKY.set_focus('jky-box-input-barcode');
	JKY.sequence = 0;
}

JKY.process_input_barcode = function() {
	var my_barcode = JKY.get_value('jky-box-input-barcode');
//	JKY.display_trace('process_input_barcode: ' + my_barcode);
	var my_data =
		{ method	: 'get_row'
		, table		: 'Boxes'
		, where		: 'Boxes.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, JKY.process_barcode_success);
}

JKY.process_barcode_success = function(response) {
	var my_row  = response.row;
	if (my_row) {
		var my_barcode = JKY.get_value('jky-box-input-barcode');
		if ($('#jky-box-table-body td:contains("' + my_barcode + '")').length > 0) {
			JKY.play_beep();
			JKY.set_html ('jky-box-input-message', JKY.t('duplicate'));
			JKY.set_focus('jky-box-input-barcode');
		}else{
			var	my_checkbox = '<input type="checkbox" onclick="JKY.Application.set_checkbox(this)" barcode=' + my_barcode + ' />';
			var my_status_class = '';
			if (my_row.status != 'Check In' && my_row.status != 'Return') {
				my_status_class = 'jky-error ';
				my_checkbox = '';
			}
			var my_thread_class = '';
			if (my_row.thread_name != JKY.row.thread_name) {
				my_thread_class = 'jky-error ';
				my_checkbox = '';
			}
			var my_batch_class = '';
			if (my_row.batch_number != JKY.row.batch_number) {
				my_batch_class = 'jky-error ';
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
					+ '<td class="' + my_thread_class	+ 'jky-thread-name"		>' +  my_row.thread_name		+ '</td>'
					+ '<td class="' + my_batch_class	+ 'jky-batch"			>' +  my_row.batch_number		+ '</td>'
					+ '<td class="jky-number-of-boxes"	>' +  my_row.number_of_boxes	+ '</td>'
					+ '<td class="jky-number-of-cones"	>' +  my_row.number_of_cones	+ '</td>'
					+ '<td class="jky-average-weight"	>' +  my_row.average_weight		+ '</td>'
					+ '<td class="jky-real-weight"		>' +  my_row.real_weight		+ '</td>'
					+ '<td class="' + my_location_class + 'jky-checkin-location">' +  my_row.checkin_location	+ '</td>'
					+ '<td class="jky-supplier-name"	>' +  my_row.supplier_name		+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-box-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.show('jky-action-confirm');
			JKY.set_html ('jky-box-input-message', '');
			JKY.set_value('jky-box-input-barcode', '');
		}
	}else{
		JKY.play_beep();
		JKY.set_html ('jky-box-input-message', JKY.t('not found'));
		JKY.set_focus('jky-box-input-barcode');
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
		$('#jky-box-table-body .jky-checkbox input:checked').each(function() {
			JKY.confirm_row(this, $(this).attr('barcode'));
		});
//	}

	if (JKY.get_html('jky-box-table-body') == '') {
		JKY.process_clear_screen();
	}
	JKY.set_focus('jky-box-input-barcode');
}

/**
 * confirm row
 */
JKY.confirm_row = function(the_id, the_barcode) {
	JKY.display_trace('confirm_row');
	JKY.display_message(JKY.t('Confirmed, barcode') + ': ' + the_barcode);
	var my_location = (JKY.row.machine_name == null) ? JKY.row.supplier_name : JKY.row.machine_name;
	var my_data =
		{ method		: 'checkout'
		, table			: 'Boxes'
		, barcode		: the_barcode
		, location		: my_location
		, batchset_id	: JKY.row.id
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
//	JKY.set_value('jky-checkout-boxes' , JKY.get_value_by_id('BatchOuts', 'checkout_boxes' , JKY.row.id));
	var my_row = response.row;
	JKY.set_value('jky-reserved-boxes' , my_row.reserved_boxes );
	JKY.set_value('jky-checkout-weight', my_row.checkout_weight);
	JKY.set_value('jky-checkout-boxes' , my_row.checkout_boxes );
}

