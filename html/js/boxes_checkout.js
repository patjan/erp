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
		, table_name	: 'BatchOuts'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'CheckOuts.requested_date'
		, sort_seq		: 'ASC'
		, focus			: 'jky-requested-weight'
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
		+  '<td class="jky-requested-date"	>' +				 the_row.requested_date			+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-thread-name"		>' +				 the_row.thread_name			+ '</td>'
		+  '<td class="jky-batch-number"	>' +				 the_row.batch_number			+ '</td>'
//		+  '<td class="jky-unit-price"		>' +				 the_row.unit_price				+ '</td>'
		+  '<td class="jky-average-weight"	>' +				 the_row.average_weight			+ '</td>'
		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-requested-boxes"	>' +				 the_row.requested_boxes		+ '</td>'
		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-checkout-boxes"	>' +				 the_row.checkout_boxes			+ '</td>'
		;
	return my_html;
};

JKY.App.display_form = function(the_index) {
	JKY.display_trace('my_display_form');
//	if (my_skip_form) {
//		my_skip_form = false;
//		return;
//	}
	$(the_id).css('background-color', '#CCCCCC');
}

JKY.display_list = function() {
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
			var my_checkbox = '';
			if ( my_row.status == 'Check In' || my_row.status == 'Return') {
				my_checkbox = '<input type="checkbox" onclick="JKY.Application.set_checkbox(this)" barcode=' + my_barcode + ' />';
			}
			JKY.sequence++;
			var my_html = '<tr>'
					+ '<td class="jky-box-checkbox"			>' +  my_checkbox				+ '</td>'
					+ '<td class="jky-box-barcode"			>' +  my_row.barcode			+ '</td>'
					+ '<td class="jky-box-sequence"			>' +  JKY.sequence				+ '</td>'
					+ '<td class="jky-box-status"			>' +  JKY.t(my_row.status)		+ '</td>'
					+ '<td class="jky-box-batch"			>' +  my_row.batch				+ '</td>'
					+ '<td class="jky-box-number-of-boxes"	>' +  my_row.number_of_boxes	+ '</td>'
					+ '<td class="jky-box-number-of-cones"	>' +  my_row.number_of_cones	+ '</td>'
					+ '<td class="jky-box-average-weight"	>' +  my_row.average_weight		+ '</td>'
					+ '<td class="jky-box-real-weight"		>' +  my_row.real_weight		+ '</td>'
					+ '<td class="jky-box-checkin-location"	>' +  my_row.checkin_location	+ '</td>'
					+ '<td class="jky-box-supplier-name"	>' +  my_row.supplier_name		+ '</td>'
					+ '<td class="jky-box-thread-name"		>' +  my_row.thread_name		+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-box-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.show('jky-action-confirm');
			JKY.set_html ('jky-input-message', '');
			JKY.set_value('jky-input-barcode', '');
		}
	}else{
		JKY.play_beep();
		JKY.set_html ('jky-input-message', JKY.t('not found'));
		JKY.set_focus('jky-input-barcode');
	}
}

/**
 * confirm screen
 */
JKY.process_confirm_screen = function() {
	JKY.display_trace('process_confirm_screen');
	if ($('#jky-app-form').css('display') == 'block') {
		JKY.confirm_row(JKY.row.id);
	}else{
		$('#jky-table-body .jky-checkbox input:checked').each(function() {
			JKY.confirm_row(this, $(this).attr('barcode'));
		});
	}

	if (JKY.get_html('jky-table-body') == '') {
		JKY.process_clear_screen();
	}
	JKY.set_focus('jky-input-barcode');
}

/**
 * confirm row
 */
JKY.confirm_row = function(the_id, the_barcode) {
	JKY.display_trace('confirm_row');
	JKY.display_message(JKY.t('Confirmed, barcode') + ': ' + the_barcode);
	var my_data =
		{ method	: 'checkout'
		, table		: 'Boxes'
		, barcode	: the_barcode
		};
	JKY.ajax(false, my_data, JKY.confirm_row_success);
	$(the_id).parent().parent().remove();
}

/**
 * confirm row success
 */
JKY.confirm_row_success = function(response) {
	JKY.display_trace('confirm_row');
}

