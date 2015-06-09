"use strict";

/**
 * pieces_weigher.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces Weigher'
		, table_name	: 'Pieces'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, display		: '20'
		, sort_by		: 'Pieces.checkin_at'
		, sort_seq		: 'DESC'
		, sort_list		: [[5, 1]]
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

	JKY.set_side_active('jky-pieces-weigher');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
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
		+  '<td class="jky-td-barcode"	>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.product_name			+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.revised_name			+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.weighed_name			+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.checkin_at			)	+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkin_location	)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkin_weight			+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.qualities + ' ' + the_row.remarks) + '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-status'			, the_row.status		);
	JKY.set_value	('jky-barcode'			, the_row.barcode		);
	JKY.set_value	('jky-weighed-by'		, the_row.weighed_by	);
	JKY.set_value	('jky-weighed-name'		, the_row.weighed_name	);
	JKY.set_value	('jky-product-name'		, the_row.product_name	);
	var my_weight = parseFloat(the_row.checkin_weight) * 100 + 10000 + '';
	JKY.set_value	('jky-checkin-weight1'	, my_weight.substr(1, 1));
	JKY.set_value	('jky-checkin-weight2'	, my_weight.substr(2, 1));
	JKY.set_value	('jky-checkin-weight3'	, my_weight.substr(3, 1));
	JKY.set_value	('jky-checkin-weight4'	, my_weight.substr(4, 1));
	var my_location = the_row.checkin_location;
	JKY.set_value	('jky-checkin-location1', my_location.substr(0, 1));
	JKY.set_value	('jky-checkin-location2', my_location.substr(1, 1));
	JKY.set_value	('jky-checkin-location3', my_location.substr(2, 1));
	JKY.set_value	('jky-checkin-location4', my_location.substr(3, 1));
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
	JKY.set_value('jky-status'			, '');
	JKY.set_value('jky-barcode'			, '');
	JKY.set_value('jky-product-name'	, '');
	JKY.set_value('jky-weighed-by'		, '');
	JKY.set_value('jky-weighed-name'	, '');
	JKY.set_value('jky-checkin-weight1'	, '1');
	JKY.set_value('jky-checkin-weight2'	, '0');
	JKY.set_value('jky-checkin-weight3'	, '0');
	JKY.set_value('jky-checkin-weight4'	, '0');
	JKY.set_value('jky-checkin-location1', '0');
	JKY.set_value('jky-checkin-location2', 'A');
	JKY.set_value('jky-checkin-location3', '0');
	JKY.set_value('jky-checkin-location4', '0');
	JKY.set_value('jky-form-action'		, '');
	JKY.set_focus(JKY.App.get('focus'));
	JKY.Changes.reset();
}

JKY.process_keyup_input = function(the_id, the_event) {
	if (the_event.which != 13)		return;

	var my_value = $(the_id).val();
	if (my_value == 'Back'  || my_value == 'Voltar') {
		$(the_id).val('');
		var my_inputs = $('#jky-form-data input:enabled[type!=hidden]');
		for(var i=0, max=my_inputs.length; i<max; i++) {
			if (my_inputs[i] == the_id) {
				if (i > 0)		i = i - 1;
				my_inputs[i].focus ();
				my_inputs[i].select();
				return;
			}
		}
	}else
	if (my_value == 'Clear' || my_value == 'Limpar') {
		$(the_id).val('');
		JKY.process_clear_screen();
	}else
	if (my_value == 'Save'  || my_value == 'Salvar') {
		$(the_id).val('');
		JKY.process_save_screen();
	}else{
		var my_id = $(the_id).attr('id');
		switch(my_id) {
			case('jky-barcode'			) : JKY.process_barcode					();	break;
			case('jky-weighed-name'		) : JKY.set_focus('jky-checkin-weight1'  );	break;
			case('jky-checkin-weight1'	) : JKY.set_focus('jky-checkin-weight2'  );	break;
			case('jky-checkin-weight2'	) : JKY.set_focus('jky-checkin-weight3'  );	break;
			case('jky-checkin-weight3'	) : JKY.set_focus('jky-checkin-weight4'  );	break;
			case('jky-checkin-weight4'	) : JKY.set_focus('jky-checkin-location1');	break;
			case('jky-checkin-location1') : JKY.set_focus('jky-checkin-location2');	break;
			case('jky-checkin-location2') : JKY.set_focus('jky-checkin-location3');	break;
			case('jky-checkin-location3') : JKY.set_focus('jky-checkin-location4');	break;
			case('jky-checkin-location4') : JKY.set_focus('jky-form-action'		 );	break;
			case('jky-form-action'		) : JKY.process_form_action				();	break;
		}
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
		if (my_row.status == 'Active') {
			JKY.set_value('jky-status'			, my_row.status				);
			JKY.set_value('jky-product-name'	, my_row.product_name		);
			JKY.set_value('jky-weighed-by'		, my_row.weighed_by			);
			JKY.set_value('jky-weighed-name'	, my_row.weighed_name		);
			JKY.set_value('jky-checkin-weight'	, my_row.checkin_weight		);
			JKY.set_value('jky-checkin-location', my_row.checkin_location	);
			JKY.set_value('jky-form-action'		, '');
			JKY.set_focus('jky-weighed-name');
		}else{
			JKY.play_beep();
			JKY.display_message(JKY.set_is_invalid('Barcode'));
			JKY.set_focus('jky-barcode');
		}
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
	}else
	if (my_form_action == 'Save'  || my_form_action == 'Salvar') {
		JKY.process_save_screen();
	}
}

JKY.process_save_screen = function() {
	var my_barcode			= JKY.get_value('jky-barcode'			);
	var my_weighed_name		= JKY.get_value('jky-weighed-name'		);
	var my_checkin_weight	= JKY.get_value('jky-checkin-weight1') + JKY.get_value('jky-checkin-weight2') + '.' + JKY.get_value('jky-checkin-weight3') + JKY.get_value('jky-checkin-weight4');
	var my_checkin_location	= JKY.get_value('jky-checkin-location1') + JKY.get_value('jky-checkin-location2').toUpperCase() + JKY.get_value('jky-checkin-location3') + JKY.get_value('jky-checkin-location4');

	var my_weighed_by		= JKY.get_id('Contacts', 'nick_name = \'' + my_weighed_name + '\'');

	var my_error = '';
	if (my_barcode			== '' )		my_error += JKY.set_is_required('Barcode'	);
	if (my_weighed_by		== '' )		my_error += JKY.set_is_required('Weighed'	);
	if (my_checkin_weight	== '' )		my_error += JKY.set_is_required('Weight'	);
	if (my_checkin_location	== '' )		my_error += JKY.set_is_required('Location'	);

	if (JKY.is_empty(my_error)) {
		JKY.display_message(JKY.t('Confirmed, barcode') + ': ' + my_barcode);
		var my_data =
			{ method			: 'checkin'
			, table				: 'Pieces'
			, barcode			: my_barcode
			, weighed_by		: my_weighed_by
			, checkin_weight	: my_checkin_weight
			, checkin_location	: my_checkin_location
			};
		JKY.ajax(false, my_data, JKY.checkin_piece_success);
		JKY.process_clear_screen();
	}else{
		JKY.set_value('jky-form-action', '');
		JKY.play_beep();
		JKY.display_message(my_error);
		JKY.set_focus('jky-barcode');
	}
}

JKY.checkin_piece_success = function() {
	var my_barcode	= JKY.get_value('jky-barcode');
	var my_where	= 'Pieces.barcode =\'' + my_barcode + '\'';
	var my_id	= JKY.get_id ('Pieces', my_where);
	var my_row	= JKY.get_row('Pieces', my_id);

	var my_html = '<tr>'
		+  '<td class="jky-td-barcode"	>' +				 my_row.barcode				+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 my_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 my_row.revised_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 my_row.weighed_name		+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(my_row.checkin_at)			+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(my_row.checkin_location)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 my_row.checkin_weight		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(my_row.qualities +' ' + my_row.remarks) + '</td>'
		+ '</tr>'
		;
	JKY.prepend_html('jky-pieces-table-body', my_html);
}