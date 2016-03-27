"use strict";

/**
 * fabrics_scrap.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Fabrics Scrap'
		, table_name	: 'Fabrics'
		, specific		: ''
		, select		: 'Active'
		, filter		: ''
		, display		: '20'
		, sort_by		: 'Fabrics.checkin_at'
		, sort_seq		: 'ASC'
		, sort_list		: [[3, 0]]
		, focus			: 'jky-input-barcode'
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
//	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-input-barcode'		).change(function() {JKY.process_input_barcode	();});
	$('#jky-piece-check-all'	).click (function() {JKY.set_all_piece_check(this);});

	JKY.set_side_active('jky-receiving-scrap');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_css('jky-app-breadcrumb', 'color', '#CC0000');

//	JKY.set_html('jky-app-select', JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Closed'));
//	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
//	JKY.show('jky-app-select-line');
//	select the first option as default
//	$('#jky-app-select option').eq(1).prop('selected', true);
//	$('#jky-app-select').change();
	JKY.show('jky-action-clear');
	JKY.App.display_form();
	JKY.process_clear_screen();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	return '';

	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.loadout_number			+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.requested_at		)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.color_name			)	+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.quotation_number		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.customer_name			+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.product_name			+ '</td>'
//		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-td-location"	>' +				 the_row.checkin_location		+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.checkin_pieces			+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.reserved_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.checkout_pieces		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
/*
	JKY.set_value	('jky-loadout-number'		,				 the_row.loadout_number		);
	JKY.set_value	('jky-dyer-name'			,				 the_row.dyer_name			);
	JKY.set_value	('jky-color-name'			,				 the_row.color_name			);
	JKY.set_value	('jky-quotation-number'		,				 the_row.quotation_number	);
	JKY.set_value	('jky-checkin-location'		,				 the_row.checkin_location	);
	JKY.set_value	('jky-customer-name'		,				 the_row.customer_name		);
	JKY.set_value	('jky-product-name'			,				 the_row.product_name		);
	JKY.set_value	('jky-requested-date'		, JKY.out_date	(the_row.requested_at		));
	JKY.set_value	('jky-average-weight'		, (the_row.checkin_weight / the_row.checkin_pieces).toFixed(2));
	JKY.set_value	('jky-reserved-pieces'		,				 the_row.reserved_pieces	);
	JKY.set_value	('jky-reserved-weight'		, 				 the_row.reserved_weight	);
	JKY.set_value	('jky-checkout-pieces'		,				 the_row.checkout_pieces	);
	JKY.set_value	('jky-checkout-weight'		, 				 the_row.checkout_weight	);
*/
};

JKY.set_all_piece_check = function(the_index) {
	JKY.display_trace('set_all_piece_check');
	if ($(the_index).is(':checked')) {
		$('#jky-pieces-table-body .jky-td-checkbox input').each(function() {$(this).attr('checked', 'checked');})
	}else{
		$('#jky-pieces-table-body .jky-td-checkbox input').each(function() {$(this).removeAttr('checked');})
	}
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
};

JKY.display_form = function() {
	JKY.hide('jky-action-add-new');
};

JKY.process_clear_screen = function() {
	JKY.hide('jky-form-data');
	JKY.hide('jky-action-clear'  );
	JKY.hide('jky-action-confirm');
	JKY.remove_attr('jky-piece-check-all', 'checked');
	JKY.set_html ('jky-pieces-table-body', '');
	JKY.set_html ('jky-input-message'	, '');
	JKY.set_value('jky-input-barcode'	, '');
	JKY.set_focus('jky-input-barcode');
	JKY.sequence = 0;
}

JKY.process_input_barcode = function() {
	var my_barcode = JKY.get_value('jky-input-barcode');
	JKY.display_trace('process_input_barcode: ' + my_barcode);
	var my_data =
		{ method	: 'get_row'
		, table		: 'Fabrics'
		, where		: 'Fabrics.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, JKY.process_barcode_success);
}

JKY.process_barcode_success = function(response) {
	var my_row  = response.row;

	if (my_row) {
		var my_barcode = JKY.get_value('jky-input-barcode');
		if ($('#jky-pieces-table-body td:contains("' + my_barcode + '")').length > 0) {
			JKY.play_beep();
			JKY.set_html ('jky-input-message', JKY.t('duplicate'));
			JKY.set_focus('jky-input-barcode');
		}else{
			var	my_checkbox = '<input type="checkbox" onclick="JKY.App.set_checkbox(this)" barcode=' + my_barcode + ' />';
			var my_status_class = '';
			if (my_row.status != 'Active'
			&&	my_row.status != 'Check In'
			&&	my_row.status != 'Return') {
				JKY.play_beep();
				my_status_class = 'jky-error ';
				my_checkbox = '';
			}
/*
			var my_location_class = '';
			if (my_row.checkin_location.toUpperCase() != JKY.row.checkin_location.toUpperCase()) {
				my_location_class = 'jky-error ';
				my_checkbox = '';
			}

			var my_product_class = '';
			if (my_row.product_name != JKY.row.product_name
			&&  my_row.product_name != JKY.row.parent_name) {
				my_product_class = 'jky-error ';
				my_checkbox = '';
			}
*/
			var my_sequence = '';
			if (my_checkbox != '') {
				JKY.sequence++;
				my_sequence = JKY.sequence;
/*				
				var my_reserved_pieces = parseInt  (JKY.get_value('jky-reserved-pieces')) - 1;
				var my_reserved_weight = parseFloat(JKY.get_value('jky-reserved-weight')) - parseFloat(my_row.checkin_weight);
				var my_checkout_pieces = parseInt  (JKY.get_value('jky-checkout-pieces')) + 1;
				var my_checkout_weight = parseFloat(JKY.get_value('jky-checkout-weight')) + parseFloat(my_row.checkin_weight);
				JKY.set_value('jky-reserved-pieces', my_reserved_pieces);
				JKY.set_value('jky-reserved-weight', my_reserved_weight.toFixed(2));
				JKY.set_value('jky-checkout-pieces', my_checkout_pieces);
				JKY.set_value('jky-checkout-weight', my_checkout_weight.toFixed(2));
*/
			}

			if (parseInt(JKY.get_value('jky-reserved-pieces')) < 0) {
				JKY.play_beep();
				JKY.display_message('Check out pieces is greater than requested pieces');
			}

			var my_html = '<tr>'
					+ '<td class="jky-td-checkbox"	>'							+				 my_checkbox			+ '</td>'
					+ '<td class="jky-td-barcode"	>'							+				 my_row.barcode			+ '</td>'
					+ '<td class="jky-td-input"		>'							+				 my_sequence			+ '</td>'
					+ '<td class="jky-td-status '	+ my_status_class	+ '">'	+ JKY.t			(my_row.status)			+ '</td>'
//					+ '<td class="jky-td-name-l '	+ my_product_class	+ '">'	+				 my_row.product_name	+ '</td>'
					+ '<td class="jky-td-name-l"	>'							+				 my_row.product_name	+ '</td>'
//					+ '<td class="jky-td-name-l '   + my_color_class	+ '">'	+				 my_row.color_name		+ '</td>'
					+ '<td class="jky-td-name-l"	>'						 	+				 my_row.color_name		+ '</td>'
					+ '<td class="jky-td-number"	>'  						+				 my_row.loadout_id		+ '</td>'
					+ '<td class="jky-td-weight"	>'							+				 my_row.checkin_weight	+ '</td>'
//					+ '<td class="jky-td-location ' + my_location_class + '">'	+				 my_row.checkin_location+ '</td>'
					+ '<td class="jky-td-location"	>'							+				 my_row.checkin_location+ '</td>'
					+ '<td class="jky-td-name-l"	>'							+ JKY.decode	(my_row.remarks		)	+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-pieces-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.show('jky-action-confirm');
			JKY.set_html ('jky-input-message', '');
			JKY.set_value('jky-input-barcode', '');
		}
	}else{
		JKY.play_beep();
		JKY.set_html ('jky-input-message', JKY.t('not found'));
	}
	JKY.set_focus('jky-input-barcode');
}

/**
 * confirm screen
 */
JKY.process_confirm_screen = function() {
	JKY.display_trace('process_confirm_screen');
//	if ($('#jky-app-form').css('display') == 'block') {
//		JKY.confirm_row(JKY.row.id);
//	}else{
		$('#jky-pieces-table-body .jky-td-checkbox input:checked').each(function() {
			JKY.confirm_row(this, $(this).attr('barcode'));
		});
//	}

	if (JKY.get_html('jky-pieces-table-body') == '') {
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
		{ method		: 'update'
		, table			: 'Fabrics'
		, set			: 'status = \'Scrap\''
		, where			: 'barcode = ' + the_barcode 
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
/*
	JKY.row = JKY.get_row('LoadSets', JKY.row.id);
	JKY.set_value('jky-reserved-pieces', JKY.row.reserved_pieces);
	JKY.set_value('jky-reserved-weight', JKY.row.reserved_weight);
	JKY.set_value('jky-checkout-pieces', JKY.row.checkout_pieces);
	JKY.set_value('jky-checkout-weight', JKY.row.checkout_weight);
*/
}

