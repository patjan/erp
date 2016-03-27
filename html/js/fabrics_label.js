"use strict";

/**
 * fabrics_label.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Fabrics Label'
		, table_name	: 'Fabrics'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, display		: '20'
		, sort_by		: 'Fabrics.checkin_at'
		, sort_seq		: 'DESC'
		, sort_list		: [[5, 1]]
		, focus			: 'jky-checkin-location'
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

	JKY.set_side_active('jky-fabrics-label');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-product'	, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'	, '../JKY.Search.Color.html'	);

//	JKY.set_html('jky-app-select', JKY.set_configs('Thread Groups', JKY.App.get_prop('select'), 'All'));
//	JKY.set_html('jky-app-select-label', JKY.t('Group'));
//	JKY.show('jky-app-select-line');
	JKY.show('jky-action-clear');
	JKY.App.display_form();
	JKY.process_clear_screen();

	$('#jky-number-of-pieces').ForceIntegerOnly();

	$('#jky-product-filter'	).KeyUpDelay(JKY.Product.load_data);
	$('#jky-color-filter'	).KeyUpDelay(JKY.Color	.load_data);
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
		+  '<td class="jky-td-name-s"	>' + JKY.decode		(the_row.qualities + ' ' + the_row.remarks) + '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-barcode'			, the_row.barcode			);
	JKY.set_value	('jky-revised-by'		, the_row.revised_by		);
	JKY.set_value	('jky-revised-name'		, the_row.revised_name		);
	JKY.set_value	('jky-weighed-by'		, the_row.weighed_by		);
	JKY.set_value	('jky-weighed-name'		, the_row.weighed_name		);
	JKY.set_value	('jky-product-name'		, the_row.product_name		);
	var my_weight = parseFloat(the_row.checkin_weight) * 100 + 10000 + '';
	JKY.set_value	('jky-checkin-weight1'	, my_weight.substr(1, 1));
	JKY.set_value	('jky-checkin-weight2'	, my_weight.substr(2, 1));
	JKY.set_value	('jky-checkin-weight3'	, my_weight.substr(3, 1));
	JKY.set_value	('jky-checkin-weight4'	, my_weight.substr(4, 1));
	var my_location = the_row.checkin_location;
	if (my_location) {
		JKY.set_value	('jky-checkin-location1', my_location.substr(0, 1));
		JKY.set_value	('jky-checkin-location2', my_location.substr(1, 1));
		JKY.set_value	('jky-checkin-location3', my_location.substr(2, 1));
		JKY.set_value	('jky-checkin-location4', my_location.substr(3, 1));
	}
	JKY.set_value	('jky-qualities'		,			 the_row.qualities			);
	JKY.set_value	('jky-remarks'			, JKY.decode(the_row.remarks			));
	JKY.set_value	('jky-checkin-location'	,			 the_row.checkin_location	);
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
	JKY.set_value('jky-checkin-location', '');
	JKY.set_value('jky-loadout-number'	, '');
	JKY.set_value('jky-product-id'		, null);
	JKY.set_value('jky-product-name'	, '');
	JKY.set_value('jky-color-id'		, null);
	JKY.set_value('jky-color-name'		, '');
	JKY.set_value('jky-number-of-pieces', '');
	JKY.set_focus(JKY.App.get_prop('focus'));
	JKY.set_html('jky-fabrics-table-body', '');
	JKY.Changes.reset();
}

JKY.process_keyup_input = function(the_id, the_event) {
	if (the_event.which != 13)		return;
/*
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
*/	
		var my_id = $(the_id).attr('id');
		switch(my_id) {
			case('jky-checkin-location' ) : JKY.set_focus('jky-loadout-number'	);	break;
			case('jky-loadout-number'	) : JKY.set_focus('jky-product-name'	);	break;
			case('jky-product-name'		) : JKY.set_focus('jky-color-name'		);	break;
			case('jky-color-name'		) : JKY.set_focus('jky-number-of-pieces');	break;
			case('jky-number-of-pieces'	) : JKY.process_form_action				();	break;
		}
//	}
}

JKY.process_barcode = function() {
	var my_barcode = JKY.get_value('jky-barcode');
	if (my_barcode == '')		return;

	var my_data =
		{ method	: 'get_row'
		, table		: 'Fabrics'
		, where		: 'Fabrics.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_row  = the_response.row;
		if (my_row) {
			if (my_row.status == 'Active') {
//				var my_location = JKY.get_value_by_id('Orders', 'location', my_row.order_id);
var my_location = '0A00';
				JKY.set_value('jky-checkin-weight'	,			 my_row.checkin_weight		);
				JKY.set_value('jky-qualities'		,			 my_row.qualities			);
				JKY.set_value('jky-remarks'			, JKY.decode(my_row.remarks				));
//				JKY.set_value('jky-revised-by'		,			 my_row.revised_by			);
//				JKY.set_value('jky-revised-name'	,			 my_row.revised_name		);
//				JKY.set_value('jky-weighed-by'		,			 my_row.weighed_by			);
//				JKY.set_value('jky-weighed-name'	,			 my_row.weighed_name		);
				JKY.set_value('jky-status'			,			 my_row.status				);
				JKY.set_value('jky-product-name'	,			 my_row.product_name		);
				JKY.set_value('jky-color-name'		,			 my_row.color_name			);
				JKY.set_value('jky-loadout-number'	,			 my_row.loadout_id			);
//				JKY.set_value('jky-checkin-location',			 my_row.checkin_location	);
				JKY.set_value('jky-hidden-location' ,			 my_location				);
				JKY.set_value('jky-checkin-location',			 my_location				);
				JKY.set_value('jky-form-action'		, '');
				JKY.set_focus('jky-checkin-weight1');
			}else{
				JKY.play_beep();
				JKY.display_message(JKY.t('Status code is') + ' ' + JKY.t(my_row.status));
				JKY.set_focus('jky-barcode');
			}
		}else{
			JKY.play_beep();
			JKY.display_message(JKY.set_not_found('Barcode'));
			JKY.set_focus('jky-barcode');
		}
	})
}

JKY.process_weight = function(the_id, the_next_field) {
	var my_value = JKY.get_value(the_id);
	var my_digit = my_value.substr(my_value.length-1, 1);
	if (my_digit === '')	my_digit = '0';
	JKY.set_value(the_id, my_digit);
	JKY.set_focus(the_next_field);
}

JKY.process_qualities = function() {
	
	
	var my_qualities = JKY.get_value('jky-qualities');
	if (my_qualities == '')		return;

	var my_location = JKY.get_config_value('QC Quality', my_qualities);
	if (!my_location || JKY.is_empty(my_location)) {
		JKY.set_value('jky-checkin-location', JKY.get_value('jky-hidden-location'));
	}else{
		JKY.set_value('jky-checkin-location', my_location);
	}

	JKY.set_focus('jky-remark')
}

JKY.process_remark = function() {
	var my_remark = JKY.get_value('jky-remark');
	if (my_remark == '')	return;

	JKY.set_value('jky-remarks', JKY.get_value('jky-remark') + "\n" + JKY.get_value('jky-remarks'));
	JKY.set_value('jky-remark', '');
}

JKY.process_form_action = function() {
	var my_checkin_location	= JKY.get_value('jky-checkin-location'	).toUpperCase();
	var my_loadout_number	= JKY.get_value('jky-loadout-number'	);
	var my_product_id		= JKY.get_value('jky-product-id'		);
	var my_product_name		= JKY.get_value('jky-product-name'		);
	var my_color_id			= JKY.get_value('jky-color-id'			);
	var my_color_name		= JKY.get_value('jky-color-name'		);
	var my_number_of_pieces	= JKY.get_value('jky-number-of-pieces'	);

	var my_error = '';
	if (my_checkin_location	=== '' )		my_error += JKY.set_is_required('Location'		);
	if (my_loadout_number	=== '' )		my_error += JKY.set_is_required('Load Out'		);
	if (my_product_name		=== '' )		my_error += JKY.set_is_required('Product'		);
	if (my_color_name		=== '' )		my_error += JKY.set_is_required('Color'			);

	if (my_number_of_pieces	=== '' ) {
		my_error += JKY.set_is_required('Number Pieces'	);
	}else
	if (my_number_of_pieces	< 1) {
		my_error += JKY.set_value_is_under('Number Pieces', 1);
	}else
	if (my_number_of_pieces	> 100) {
		my_error += JKY.set_value_is_above('Number Pieces', 100);
	}

	if (JKY.is_empty(my_error)) {
		var my_ftp_id = JKY.get_ftp_id(my_product_id);
		
		var my_set = ''
				+           '  status =\'' + 'Check In' + '\''
				+ ', checkin_location =\'' + my_checkin_location + '\''
				+       ', loadout_id =  ' + my_loadout_number
				+       ', product_id =  ' + my_product_id
				+     ', product_name =\'' + my_product_name + '\''
				+           ', ftp_id =  ' + my_ftp_id
				+         ', color_id =  ' + my_color_id
				+       ', color_name =\'' + my_color_name + '\''
				;
		var my_ids = [];
		for(var i = 0; i < my_number_of_pieces; i++) {
			var my_data =
				{ method	: 'insert'
				, table		: 'Fabrics'
				, set		: my_set
				};
			JKY.ajax(false, my_data, function(the_data) {
				my_ids.push(the_data.id);
				var my_html = '<tr>'
					+  '<td class="jky-td-barcode"	>' +				 the_data.id			+ '</td>'
					+  '<td class="jky-td-name-l"	>' +				 my_product_name		+ '</td>'
					+  '<td class="jky-td-name-l"	>' +				 my_color_name			+ '</td>'
					+  '<td class="jky-td-number"	>' +				 my_loadout_number		+ '</td>'
					+  '<td class="jky-td-location"	>' +				 my_checkin_location	+ '</td>'
					+ '</tr>'
					;
				JKY.prepend_html('jky-fabrics-table-body', my_html);
			});
		}

		var my_data =
			{ method	: 'print_labels'
			, table		: 'Fabrics'
			, ids		: my_ids.join(',')
			};
		JKY.ajax(false, my_data, function(the_data) {
			JKY.display_message(the_data.message);
		});

//		JKY.process_clear_screen();
	}else{
		JKY.set_value('jky-form-action', '');
		JKY.play_beep();
		JKY.display_message(my_error);
		JKY.set_focus('jky-number-of-pieces');
	}
}

JKY.checkin_fabric_success = function() {
	var my_barcode	= JKY.get_value('jky-barcode');
	var my_where	= 'Fabrics.barcode =\'' + my_barcode + '\'';
	var my_id	= JKY.get_id ('Fabrics', my_where);
	var my_row	= JKY.get_row('Fabrics', my_id);

	var my_html = '<tr>'
		+  '<td class="jky-td-barcode"	>' +				 my_row.barcode				+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 my_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 my_row.revised_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 my_row.weighed_name		+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(my_row.checkin_at)			+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(my_row.checkin_location)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 my_row.checkin_weight		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.decode		(my_row.qualities + ' ' + my_row.remarks) + '</td>'
		+ '</tr>'
		;
	JKY.prepend_html('jky-fabrics-table-body', my_html);
/*
	if (my_row.qualities.toLowerCase() != 'boa') {
//		process Rejected fabric
		JKY.display_message(JKY.t('Rejected fabric, print extra label'));

		var my_set = ''
			+          ' order_id =  ' + my_row.order_id
			+ ', number_of_fabrics =  ' + my_row.number_of_fabrics
			+      ', produced_by =\'' + my_row.produced_by  + '\''
			+     ', product_name =\'' + my_row.product_name + '\''
			;
		var my_data =
			{ method	: 'insert'
			, table		: 'Fabrics'
			, set		: my_set
			}
		JKY.ajax(false, my_data);

		my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'labels_printed = labels_printed + 1'
			, where		: 'Orders.id=' + my_row.order_id
			};
		JKY.ajax(false, my_data, function() {
			var my_data =
				{ method	: 'print_labels'
				, table		: 'Fabrics'
				}
			JKY.ajax(false, my_data);
		});
	}
*/
}