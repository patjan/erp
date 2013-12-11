"use strict";

/**
 * boxes_return.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Boxes Return'
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
	$('#jky-action-clear'			).click	(function() {JKY.process_clear_screen			();});
	$('#jky-action-confirm'			).click	(function() {JKY.process_confirm_screen			();});
	$('#jky-input-barcode'			).change(function() {JKY.process_input_barcode			();});
	$('#jky-input-number-of-cones'	).change(function() {JKY.process_input_number_of_cones	();});
	$('#jky-input-real-weight'		).change(function() {JKY.process_input_real_weight		();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_css('jky-app-breadcrumb', 'color', '#996600');
	JKY.set_side_active('jky-boxes-return');
	JKY.process_clear_screen();
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-export' );
};

JKY.process_clear_screen = function() {
	JKY.hide('jky-action-clear'  );
	JKY.hide('jky-action-confirm');
	JKY.remove_attr('jky-check-all', 'checked');
	JKY.set_html ('jky-table-body'	 , '');
	JKY.set_html ('jky-input-message', '');
	JKY.set_value('jky-input-barcode', '');
	JKY.set_focus('jky-input-barcode');
	JKY.sequence = 0;
}

JKY.process_input_barcode = function() {
	var my_barcode = JKY.get_value('jky-input-barcode');

	if (my_barcode == '' || isNaN(my_barcode))	{
		JKY.display_message('Barcode is invalid');
		JKY.set_focus('jky-input-barcode');
		return;
	}

	if ($('#jky-table-body td:contains("' + my_barcode + '")').length > 0) {
		JKY.play_beep();
		JKY.set_html ('jky-input-message', JKY.t('duplicate'));
		JKY.set_focus('jky-input-barcode');
		return;
	}

	JKY.set_html ('jky-input-message', '');
	JKY.process_input();
}

JKY.process_input_number_of_cones = function() {
	var my_number_of_cones = JKY.get_value('jky-input-number-of-cones');

	if (my_number_of_cones == '' || isNaN(my_number_of_cones)) {
		JKY.display_message('Number of Cones is invalid');
		JKY.set_focus('jky-input-number-of-cones');
		return;
	}

	JKY.process_input();
}

JKY.process_input_real_weight = function() {
	var my_real_weight = JKY.get_value('jky-input-real-weight');

	if (my_real_weight == '' || isNaN(my_real_weight))	{
		JKY.display_message('Real Weight is invalid');
		JKY.set_focus('jky-input-real-weight');
		return;
	}
	JKY.process_input();
}

JKY.process_input = function() {
	var my_barcode			= JKY.get_value('jky-input-barcode'			);
	var my_number_of_cones	= JKY.get_value('jky-input-number-of-cones'	);
	var my_real_weight		= JKY.get_value('jky-input-real-weight'		);
	var my_focus = '';

	if (my_real_weight		== '' || isNaN(my_real_weight		))	{my_focus = 'jky-input-real-weight'		;}
	if (my_number_of_cones	== '' || isNaN(my_number_of_cones	))	{my_focus = 'jky-input-number-of-cones'	;}
	if (my_barcode			== '' || isNaN(my_barcode			))	{my_focus = 'jky-input-barcode'			;}

	if (my_focus != '') {
		JKY.set_focus(my_focus);
		return;
	}
//	JKY.display_trace('process_input_barcode: ' + my_barcode);
	var my_data =
		{ method	: 'get_row'
		, table		: 'Boxes'
		, where		: 'Boxes.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, JKY.process_input_success);
}

JKY.process_input_success = function(response) {
	var my_row  = response.row;
	if (my_row) {
		var my_barcode			= JKY.get_value('jky-input-barcode'			);
		var my_number_of_cones	= JKY.get_value('jky-input-number-of-cones'	);
		var my_real_weight		= JKY.get_value('jky-input-real-weight'		);
		if ($('#jky-table-body td:contains("' + my_barcode + '")').length > 0) {
			JKY.play_beep();
			JKY.set_html ('jky-input-message', JKY.t('duplicate'));
			JKY.set_focus('jky-input-barcode');
		}else{
			var my_checkbox = '';
			if ( my_row.status == 'Check Out') {
				my_checkbox = '<input type="checkbox" onclick="JKY.App.set_checkbox(this)" barcode=' + my_barcode + ' />';
			}

			var my_location = my_row.checkout_location;
			if(!my_location) {
				my_location = my_row.checkin_location;
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
					+ '<td class="jky-status"			>' +  JKY.t(my_row.status)		+ '</td>'
					+ '<td class="jky-batch-number"		>' +  my_row.batch_number		+ '</td>'
					+ '<td class="jky-number-of-boxes"	>' +  my_row.number_of_boxes	+ '</td>'
					+ '<td class="jky-number-of-cones"	>' +  my_number_of_cones		+ '</td>'
					+ '<td class="jky-average-weight"	>' +  my_row.average_weight		+ '</td>'
					+ '<td class="jky-real-weight"		>' +  my_real_weight			+ '</td>'
					+ '<td class="jky-location"			>' +  my_location				+ '</td>'
					+ '<td class="jky-supplier-name"	>' +  my_row.supplier_name		+ '</td>'
					+ '<td class="jky-thread-name"		>' +  my_row.thread_name		+ '</td>'
					+ '</tr>'
					;
			JKY.prepend_html('jky-table-body', my_html);
			JKY.show('jky-action-clear'  );
			JKY.show('jky-action-confirm');
			JKY.set_html ('jky-input-message', '');
			JKY.set_value('jky-input-barcode'			, '');
			JKY.set_value('jky-input-number-of-cones'	, '');
			JKY.set_value('jky-input-real-weight'		, '');
			JKY.set_focus('jky-input-barcode');
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
	var my_parent = $(the_id).parent().parent();
	var my_barcode			= $(my_parent).find('.jky-barcode'			).html();
	var my_number_of_cones	= $(my_parent).find('.jky-number-of-cones'	).html();
	var my_real_weight		= $(my_parent).find('.jky-real-weight'		).html();

	var my_data =
		{ method			: 'return'
		, table				: 'Boxes'
		, barcode			: my_barcode
		, number_of_cones	: my_number_of_cones
		, real_weight		: my_real_weight
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

