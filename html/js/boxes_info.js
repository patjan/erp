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
		, table_name	: ''
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: ''
		, sort_seq		: ''
		, focus			: ''
		, add_new		: ''
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-clear'			).click	(function() {JKY.process_clear_screen	();});
	$('#jky-input-barcode'			).change(function() {JKY.process_input_barcode	();});

	JKY.set_side_active('jky-boxes-info');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.hide('jky-action-export');
	JKY.hide('jky-action-list'	);
	JKY.hide('jky-action-form'	);

	JKY.process_clear_screen();
};

JKY.process_clear_screen = function() {
	JKY.hide('jky-action-clear'  );
	JKY.remove_attr('jky-check-all', 'checked');
	JKY.set_html ('jky-table-body'	 , '');
	JKY.set_html ('jky-input-message', '');
	JKY.set_value('jky-input-barcode', '');
	JKY.set_focus('jky-input-barcode');
	JKY.sequence = 0;
}

JKY.process_input_barcode = function() {
	var my_barcode = JKY.get_value('jky-input-barcode');
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
		var my_barcode = JKY.get_value('jky-input-barcode');
		if ($('#jky-table-body td:contains("' + my_barcode + '")').length > 0) {
			JKY.play_beep();
			JKY.set_html ('jky-input-message', JKY.t('duplicate'));
			JKY.set_focus('jky-input-barcode');
		}else{
			var my_checkbox = '<input type="checkbox" onclick="JKY.App.set_checkbox(this)" barcode=' + my_barcode + ' />';
			var my_location = my_row.checkout_location;
			if(!my_location) {
				my_location = my_row.checkin_location;
			}

			JKY.sequence++;
			var my_html = '<tr>'
					+ '<td class="jky-td-checkbox"	>' +  my_checkbox				+ '</td>'
					+ '<td class="jky-td-barcode"	>' +  my_row.barcode			+ '</td>'
					+ '<td class="jky-td-input"		>' +  JKY.sequence				+ '</td>'
					+ '<td class="jky-td-status"	>' +  JKY.t(my_row.status)		+ '</td>'
					+ '<td class="jky-td-code"		>' +  my_row.batch_code			+ '</td>'
					+ '<td class="jky-td-integer"	>' +  my_row.number_of_boxes	+ '</td>'
					+ '<td class="jky-td-integer"	>' +  my_row.number_of_cones	+ '</td>'
					+ '<td class="jky-td-weight"	>' +  my_row.average_weight		+ '</td>'
					+ '<td class="jky-td-weight"	>' +  my_row.real_weight		+ '</td>'
					+ '<td class="jky-td-location"	>' +  my_location				+ '</td>'
					+ '<td class="jky-td-name-s"	>' +  my_row.supplier_name		+ '</td>'
					+ '<td class="jky-td-name-l"	>' +  my_row.thread_name		+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.set_html ('jky-input-message', '');
			JKY.set_value('jky-input-barcode', '');
		}
	}else{
		JKY.play_beep();
		JKY.set_html ('jky-input-message', JKY.t('not found'));
	}
	JKY.set_focus('jky-input-barcode');
}