"use strict";

/**
 * boxes_info.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Boxes Info'
		, table_name	: ''		//	load from cookies Boxes
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'batch'
		, sort_seq		: 'DESC'
		, focus			: 'jky-received-time'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
	$('#jky-barcode'		).change(function() {JKY.process_barcode();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-boxes');
//	JKY.set_html('jky-app-select', JKY.set_configs('Product Types', JKY.App.get('select'), 'All'));
//	JKY.set_html('jky-thread-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-payment-term', JKY.set_configs('Payment Terms', '', ''));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
	JKY.set_focus('jky-barcode');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-batch"				>' + the_row.batch				+ '</td>'
		+  '<td class="jky-barcode"				>' + the_row.barcode			+ '</td>'
		+  '<td class="jky-average-weight"		>' + the_row.average_weight		+ '</td>'
		+  '<td class="jky-real-weight"			>' + the_row.real_weight		+ '</td>'
		+  '<td class="jky-checkin-location"	>' + the_row.checkin_location	+ '</td>'
		+  '<td class="jky-checkout-location"	>' + the_row.checkout_location	+ '</td>'
		+  '<td class="jky-stocked-location"	>' + the_row.stocked_location	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-batch'					, the_row.batch					);
	JKY.set_value	('jky-barcode'					, the_row.barcode				);
	JKY.set_value	('jky-average-weight'			, the_row.average_weight		);
	JKY.set_value	('jky-real-weight'				, the_row.real_weight			);
	JKY.set_value	('jky-checkin-location'			, the_row.checkin_location		);
	JKY.set_value	('jky-checkout-location'		, the_row.checkout_location		);
	JKY.set_value	('jky-stocked-location'			, the_row.stocked_location		);
//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-batch'				, '');
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-average-weight'		,  0);
	JKY.set_value	('jky-real-weight'			,  0);
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-stocked-location'		, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
//	var my_supplier_id = JKY.get_value('jky-thread-name');
//	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+'	batch_id='				+			  JKY.get_value('jky-batch'					)
		+', barcode=\''				+			  JKY.get_value('jky-barcode'				) + '\''
		+', average_weight=  '		+			  JKY.get_value('jky-average-weight'		)
		+', real_weight=  '			+			  JKY.get_value('jky-real-weight'			)
		+', checkin_location=\''	+			  JKY.get_value('jky-checkin-location'		) + '\''
		+', checkout_location=\''	+			  JKY.get_value('jky-checkout-location'		) + '\''
		+', stocked_location=\''	+			  JKY.get_value('jky-stocked-location'		) + '\''
	return my_set;
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-print');
};

JKY.process_barcode = function() {
	var my_barcode = JKY.get_value('jky-barcode');
	JKY.display_message('process_message: ' + my_barcode);
	var my_data =
		{ method	: 'get_row'
		, table		: 'Boxes'
		, where		: 'Boxes.barcode = ' + my_barcode
		};
	JKY.ajax(false, my_data, JKY.process_barcode_success);
}

JKY.process_barcode_success = function(response) {
	var my_barcode = JKY.get_value('jky-barcode');
	var my_html = '';
	var my_row  = response.row;
	if (my_row) {
		my_html = '<tr>'
				+ '<td class="jky-checkbox"			></td>'
				+ '<td class="jky-barcode"			>' +  my_row.barcode			+ '</td>'
				+ '<td class="jky-parent"			>' +  my_row.parent				+ '</td>'
				+ '<td class="jky-batch"			>' +  my_row.batch				+ '</td>'
				+ '<td class="jky-number-of-boxes"	>' +  my_row.number_of_boxes	+ '</td>'
				+ '<td class="jky-number-of-cones"	>' +  my_row.number_of_cones	+ '</td>'
				+ '<td class="jky-average-weight"	>' +  my_row.average_weight		+ '</td>'
				+ '<td class="jky-real-weight"		>' +  my_row.real_weight		+ '</td>'
				+ '<td class="jky-checkin-location"	>' +  my_row.checkin_location	+ '</td>'
				+ '<td class="jky-checkout-location">' +  my_row.checkout_location	+ '</td>'
				+ '<td class="jky-stocked-location"	>' +  my_row.stocked_location	+ '</td>'
				+ '</tr>'
				;
	}else{
		JKY.play_beep();
		my_html = '<tr>'
				+ '<td class="jky-checkbox"			></td>'
				+ '<td class="jky-barcode"			>' +  my_barcode			+ '</td>'
				+ '<td class="jky-parent" colspan="99"	>' + 'not found' 			+ '</td>'
				+ '</tr>'
				;
	}
	$('#jky-table-body').prepend(my_html);
	JKY.set_value('jky-barcode', '');
}