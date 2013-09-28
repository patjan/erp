"use strict";

/**
 * pieces_checkin.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces Check In'
		, table_name	: 'Pieces'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, display		: '20'
		, sort_by		: 'Pieces.checkin_at'
		, sort_seq		: 'DESC'
		, focus			: 'jky-barcode'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-clear'		).click	(function()	{JKY.process_clear_screen	();});
	$('#jky-form-data input[id]').each	(function() {$(this).keyup(function(event)	{JKY.process_keyup_input(this, event);});});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-pieces-checkin');
//	JKY.set_html('jky-app-select', JKY.set_configs('Thread Groups', JKY.App.get('select'), 'All'));
//	JKY.set_html('jky-app-select-label', JKY.t('Group'));
//	JKY.show('jky-app-select-line');
	JKY.show('jky-action-clear');
	JKY.App.display_form();
	JKY.process_clear_screen();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-barcode"				>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-product-name"		>' +				 the_row.product_name			+ '</td>'
		+  '<td class="jky-inspected-by"		>' +				 the_row.inspected_name			+ '</td>'
		+  '<td class="jky-weighed-by"			>' +				 the_row.weighed_name			+ '</td>'
		+  '<td class="jky-checkin-date"		>' + JKY.short_date	(the_row.checkin_at			)	+ '</td>'
		+  '<td class="jky-checkin-location"	>' + JKY.fix_null	(the_row.checkin_location	)	+ '</td>'
		+  '<td class="jky-checkin-weight"		>' +				 the_row.checkin_weight			+ '</td>'
		+  '<td class="jky-remarks"				>' + JKY.fix_null	(the_row.remarks			)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-barcode'			, the_row.barcode			);
	JKY.set_value	('jky-inspected-by'		, the_row.inspected_by		);
	JKY.set_value	('jky-inspected-name'	, the_row.inspected_name	);
	JKY.set_value	('jky-weighed-by'		, the_row.weighed_by		);
	JKY.set_value	('jky-weighed-name'		, the_row.weighed_name		);
	JKY.set_value	('jky-product-name'		, the_row.product_name		);
	JKY.set_value	('jky-inspector-name'	, the_row.inspector_name	);
	JKY.set_value	('jky-weigher-name'		, the_row.weigher_name		);
	JKY.set_value	('jky-remarks'			, the_row.remarks			);
	JKY.set_value	('jky-checkin-weight'	, the_row.checkin_weight	);
	JKY.set_value	('jky-checkin-location'	, the_row.checkin_location	);
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
	JKY.set_value('jky-barcode'			, '');
	JKY.set_value('jky-product-name'	, '');
	JKY.set_value('jky-inspected-by'	, '');
	JKY.set_value('jky-inspected-name'	, '');
	JKY.set_value('jky-weighed-by'		, '');
	JKY.set_value('jky-weighed-name'	, '');
	JKY.set_value('jky-remarks'			, '');
	JKY.set_value('jky-checkin-weight'	, '');
	JKY.set_value('jky-checkin-location', '');
	JKY.set_value('jky-form-action'		, '');
	JKY.set_focus(JKY.App.get('focus'));
	JKY.Changes.reset();
}

JKY.process_keyup_input = function(the_id, the_event) {
	if (the_event.which != 13)		return;

	var my_id = $(the_id).attr('id');
//alert('the_id: ' + my_id);
	switch(my_id) {
		case('jky-barcode'			) : JKY.process_barcode()				 ;	break;
		case('jky-inspected-name'	) : JKY.set_focus('jky-weighed-name'	);	break;
		case('jky-weighed-name'		) : JKY.set_focus('jky-remarks'			);	break;
		case('jky-remarks'			) : JKY.set_focus('jky-checkin-weight'	);	break;
		case('jky-checkin-weight'	) : JKY.set_focus('jky-checkin-location');	break;
		case('jky-checkin-location'	) : JKY.set_focus('jky-form-action'		);	break;
		case('jky-form-action'		) : JKY.process_form_action()			 ;	break;
	}
}

JKY.process_barcode = function() {
	var my_barcode = JKY.get_value('jky-barcode');
	if (my_barcode == '') {
		return;
	}
//	JKY.display_trace('process_barcode: ' + my_barcode);
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
		JKY.set_value('jky-product-name'	, my_row.product_name		);
		JKY.set_value('jky-inspected-by'	, my_row.inspected_by		);
		JKY.set_value('jky-inspected-name'	, my_row.inspected_name		);
		JKY.set_value('jky-weighed-by'		, my_row.weighed_by			);
		JKY.set_value('jky-weighed-name'	, my_row.weighed_name		);
		JKY.set_value('jky-remarks'			, my_row.remarks			);
		JKY.set_value('jky-checkin-weight'	, my_row.checkin_weight		);
		JKY.set_value('jky-checkin-location', my_row.checkin_location	);
		JKY.set_value('jky-form-action'		, '');
		JKY.set_focus('jky-inspected-name');
	}else{
		JKY.play_beep();
		JKY.display_message(JKY.set_not_found('Barcode'));
		JKY.set_focus('jky-barcode');
	}
}

JKY.process_form_action = function() {
	var my_form_action = JKY.get_value('jky-form-action');

	if (my_form_action == 'Clear' || my_form_action == 'Limpar') {
		JKY.process_clear_screen();
	}

	if (my_form_action == 'Save'  || my_form_action == 'Salvar') {
		var my_barcode			= JKY.get_value('jky-barcode'			);
		var my_inspected_name	= JKY.get_value('jky-inspected-name'	);
		var my_weighed_name		= JKY.get_value('jky-weighed-name'		);
		var my_remarks			= JKY.get_value('jky-remarks'			);
		var my_checkin_weight	= JKY.get_value('jky-checkin-weight'	);
		var my_checkin_location	= JKY.get_value('jky-checkin-location'	);

		var my_error = '';
		if (my_barcode			== '' )		my_error += JKY.set_is_required('Barcode'	);
		if (my_inspected_name	== '' )		my_error += JKY.set_is_required('Inspected'	);
		if (my_weighed_name		== '' )		my_error += JKY.set_is_required('Weighed'	);
		if (my_remarks			== '' )		my_error += JKY.set_is_required('Remarks'	);
		if (my_checkin_weight	== '' )		my_error += JKY.set_is_required('Weight'	);
		if (my_checkin_location	== '' )		my_error += JKY.set_is_required('Location'	);

		if (JKY.is_empty(my_error)) {
			var my_inspected_by = JKY.get_id('Contacts', 'nick_name =\'' + my_inspected_name + '\'');
			var my_weighed_by	= JKY.get_id('Contacts', 'nick_name =\'' + my_weighed_name	 + '\'');

			var my_set = ''
				+          '  barcode=\'' + my_barcode			+ '\''
				+     ', inspected_by=  ' + my_inspected_by
				+       ', weighed_by=  ' + my_weighed_by
				+          ', remarks=\'' + my_remarks			+ '\''
				+   ', checkin_weight=  ' + my_checkin_weight
				+ ', checkin_location=\'' + my_checkin_location + '\''
				+       ', checkin_at=\'' + JKY.get_now()		+ '\''
				;
			var my_where = 'Pieces.barcode =\'' + my_barcode + '\''
			var my_data =
				{ method: 'update'
				, table : 'Pieces'
				, set	:  my_set
				, where :  my_where
				};
			JKY.ajax(false, my_data, JKY.update_piece_success);
			JKY.process_clear_screen();
		}else{
			JKY.set_value('jky-form-action', '');
			JKY.play_beep();
			JKY.display_message(my_error);
			JKY.set_focus('jky-barcode');
		}
	}
}

JKY.update_piece_success = function() {
	var my_barcode	= JKY.get_value('jky-barcode');
	var my_where	= 'Pieces.barcode =\'' + my_barcode + '\'';
	var my_id	= JKY.get_id ('Pieces', my_where);
	var my_row	= JKY.get_row('Pieces', my_id);

	var my_html = '<tr>'
		+  '<td class="jky-barcode"				>' +				 my_row.barcode				+ '</td>'
		+  '<td class="jky-product-name"		>' +				 my_row.product_name		+ '</td>'
		+  '<td class="jky-inspected-by"		>' +				 my_row.inspected_name		+ '</td>'
		+  '<td class="jky-weighed-by"			>' +				 my_row.weighed_name		+ '</td>'
		+  '<td class="jky-checkin-date"		>' + JKY.short_date	(my_row.checkin_at		)	+ '</td>'
		+  '<td class="jky-checkin-location"	>' + JKY.fix_null	(my_row.checkin_location)	+ '</td>'
		+  '<td class="jky-checkin-weight"		>' +				 my_row.checkin_weight		+ '</td>'
		+  '<td class="jky-remarks"				>' + JKY.fix_null	(my_row.remarks			)	+ '</td>'
		+ '</tr>'
		;
	JKY.prepend_html('jky-pieces-table-body', my_html);
}