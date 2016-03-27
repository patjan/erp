"use strict";

/**
 * fabrics_saleout.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Fabrics Sale Out'
		, table_name	: 'SaleOuts'
		, specific		: 'sale_open'		//	Sales.status != 'Closed'
		, select		: 'Active'
		, filter		: ''
		, sort_by		: 'SaleOuts.requested_at'
		, sort_seq		: 'ASC'
		, sort_list		: [[6, 0]]
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
//	$('#jky-input-barcode'		).change(function() {JKY.process_input_barcode	();});
	$('#jky-fabric-check-all'	).click (function() {JKY.set_all_fabric_check(this);});

	$('#jky-action-clear'		).click	(function()	{JKY.process_clear_screen	();});
	$('#jky-fabric-table input[id]').each	(function() {$(this).keyup(function(event)	{JKY.process_keyup_input(this, event);});});

	JKY.set_side_active('jky-fabrics-saleout');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_css('jky-app-breadcrumb', 'color', '#CC0000');
	JKY.append_file('jky-load-assigned', '../JKY.Search.Assigned.html');
/*
	JKY.set_html('jky-app-select', JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();
*/
	JKY.process_clear_screen();

	$('#jky-checkout-weight0').ForceIntegerOnly();
	$('#jky-checkout-weight1').ForceIntegerOnly();
	$('#jky-checkout-weight2').ForceIntegerOnly();
	$('#jky-checkout-weight3').ForceIntegerOnly();
	$('#jky-checkout-weight4').ForceIntegerOnly();

};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-name-s jky-assigned-name"	>' + JKY.fix_null(the_row.assigned_name) + '</td>'
		+  '<td class="jky-td-date"		>' +				 the_row.sale_id				+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null	(the_row.product_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.color_name			)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.customer_name			+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.requested_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.checkout_pieces		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-saleout-number'		,				 the_row.id					);
	JKY.set_value	('jky-sale-number'			,				 the_row.sale_id			);
	JKY.set_value	('jky-assigned-name'		,				 the_row.assigned_name		);
	JKY.set_value	('jky-product-name'			,				 the_row.product_name		);
	JKY.set_value	('jky-color-name'			,				 the_row.color_name			);
	JKY.set_value	('jky-customer-name'		,				 the_row.customer_name		);
	JKY.set_value	('jky-checkin-location'		,				 the_row.checkin_location	);
	JKY.set_value	('jky-requested-date'		, JKY.out_time	(the_row.requested_at		));
	JKY.set_value	('jky-requested-pieces'		,				 the_row.requested_pieces	);
	JKY.set_value	('jky-requested-weight'		,				 the_row.requested_weight	);
	JKY.set_value	('jky-checkout-date'		, JKY.out_time  (the_row.checkout_at		));
	JKY.set_value	('jky-checkout-pieces'		,				 the_row.checkout_pieces	);
	JKY.set_value	('jky-checkout-weight'		, 				 the_row.checkout_weight	);
	JKY.set_value	('jky-hidden-weight'		, 				 the_row.checkout_weight	);
	JKY.set_focus('jky-barcode');
};

JKY.set_all_fabric_check = function(the_index) {
	JKY.display_trace('set_all_fabric_check');
	if ($(the_index).is(':checked')) {
		$('#jky-fabrics-table-body .jky-td-checkbox input').each(function() {$(this).attr('checked', 'checked');})
	}else{
		$('#jky-fabrics-table-body .jky-td-checkbox input').each(function() {$(this).removeAttr('checked');})
	}
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-assign' );
};

JKY.display_form = function() {
	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-assign' );
};

JKY.process_clear_screen = function() {
	JKY.hide('jky-action-clear'  );
	JKY.hide('jky-action-confirm');
	JKY.remove_attr('jky-fabric-check-all', 'checked');
	JKY.set_html ('jky-fabrics-table-body', '');
	JKY.set_value('jky-barcode'	, '');
	JKY.set_focus('jky-barcode');
	JKY.sequence = 0;
}

JKY.process_keyup_input = function(the_id, the_event) {
	if (the_event.which != 13)		return;

	var my_id = $(the_id).attr('id');
	switch(my_id) {
		case('jky-barcode'			) : JKY.process_barcode(); break;
		case('jky-checkout-weight0'	) : JKY.process_weight(my_id, 'jky-checkout-weight1'); break;
		case('jky-checkout-weight1'	) : JKY.process_weight(my_id, 'jky-checkout-weight2'); break;
		case('jky-checkout-weight2'	) : JKY.process_weight(my_id, 'jky-checkout-weight3'); break;
		case('jky-checkout-weight3'	) : JKY.process_weight(my_id, 'jky-checkout-weight4'); break;
		case('jky-checkout-weight4'	) : JKY.process_weight(my_id, 'jky-barcode');
										JKY.process_divide();
										break;
	}
}

JKY.process_divide = function() {
	var my_checkout_weight = parseFloat(JKY.get_value('jky-checkout-weight0') + JKY.get_value('jky-checkout-weight1') + JKY.get_value('jky-checkout-weight2') + '.' + JKY.get_value('jky-checkout-weight3') + JKY.get_value('jky-checkout-weight4'));
	JKY.set_value('jky-checkout-weight', (parseFloat(JKY.get_value('jky-hidden-weight')) + parseFloat(my_checkout_weight)).toFixed(2));
	var $my_rows = $('#jky-fabrics-table-body tr');
	var my_average_weight = (my_checkout_weight / $my_rows.length).toFixed(2);
	var my_last = $my_rows.length - 1;
	$my_rows.each(function(the_index) {
		if (the_index === my_last) {
			my_average_weight = my_checkout_weight.toFixed(2);
		}else{	
			my_checkout_weight -= my_average_weight ;
		}
		$(this).find('.jky-checkout-weight').html(my_average_weight);
	});
	JKY.set_value('jky-checkout-weight0'	, '');
	JKY.set_value('jky-checkout-weight1'	, '');
	JKY.set_value('jky-checkout-weight2'	, '');
	JKY.set_value('jky-checkout-weight3'	, '');
	JKY.set_value('jky-checkout-weight4'	, '');
}

JKY.process_weight = function(the_id, the_next_field) {
	var my_value = JKY.get_value(the_id);
	var my_digit = my_value.substr(my_value.length-1, 1);
	if (my_digit === '')	my_digit = '0';
	JKY.set_value(the_id, my_digit);
	JKY.set_focus(the_next_field);
}

JKY.process_barcode = function() {
	var my_barcode = JKY.get_value('jky-barcode');
//	if (my_barcode == '')		{return;}
	if (my_barcode == '') {
		my_barcode = JKY.add_new_fabric();
		JKY.set_value('jky-barcode', my_barcode);
	}

	if ($('#jky-fabrics-table-body td:contains("' + my_barcode + '")').length > 0) {
		JKY.play_beep();
		JKY.display_message(JKY.t('Fabric') + ' ' + JKY.t('is duplicate'));
		JKY.set_focus('jky-barcode');
		return;
	}

	var my_data =
		{ method	: 'get_row'
		, table		: 'Fabrics'
		, where		: 'Fabrics.barcode = \'' + my_barcode +'\''
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_row  = the_response.row;
		if (!my_row) {
			JKY.play_beep();
			JKY.display_message(JKY.t('Fabric') + ' ' + JKY.t('not found'));
			return;
		}
		
		if (my_row.status != 'Check In' && my_row.status != 'Return') {
			$('#jky-th-status').addClass('jky-error');
		}else{
			$('#jky-th-status').removeClass('jky-error');
		}

		if (my_row.product_name != JKY.row.product_name
		&&  my_row.family_name  != JKY.row.family_name) {
			$('#jky-th-product-name').addClass('jky-error');
		}else{
			$('#jky-th-product-name').removeClass('jky-error');
		}

		if (my_row.color_name != JKY.row.color_name) {
			$('#jky-th-color-name').addClass('jky-error');
		}else{
			$('#jky-th-color-name').removeClass('jky-error');
		}

		JKY.set_value('jky-th-checkin-weight'	,		 my_row.checkin_weight	);
		JKY.set_value('jky-th-status'			, JKY.t	(my_row.status)			);
		JKY.set_value('jky-th-product-name'		,		 my_row.product_name	);
		JKY.set_value('jky-th-color-name'		,		 my_row.color_name		);
		JKY.set_value('jky-th-checkin-location'	,		 my_row.checkin_location);
		JKY.set_focus('jky-checkout-weight0');

		if ($('#jky-fabric-table thead .jky-error').length > 0) {
			JKY.play_beep();
			JKY.set_focus('jky-barcode');
		}else{
			JKY.process_input();
		}
	});
}

JKY.add_new_fabric = function() {
	var my_id = null;
	var my_ftp_id = JKY.get_ftp_id(JKY.row.product_id);

	var my_set = ''
			+           '  status =\'' + 'Check In' + '\''
			+ ', checkin_location =\'' + JKY.get_value('jky-checkin-location') + '\''
//			+       ', loadout_id =  ' + my_loadout_number
			+       ', product_id =  ' + JKY.row.product_id
			+     ', product_name =\'' + JKY.row.product_name + '\''
			+           ', ftp_id =  ' + my_ftp_id
			+         ', color_id =  ' + JKY.row.color_id
			+       ', color_name =\'' + JKY.row.color_name + '\''
			;
	var my_data =
		{ method	: 'insert'
		, table		: 'Fabrics'
		, set		: my_set
		};
	JKY.ajax(false, my_data, function(the_data) {
		my_id = the_data.id;
	});
	return my_id;
}

JKY.process_input = function() {
	var my_barcode			= JKY.get_value('jky-barcode');
	var my_checkout_weight	= 0.00;
	var my_checkin_weight	= JKY.get_value('jky-th-checkin-weight'		); 
	var my_status			= JKY.get_value('jky-th-status'				); 
	var my_product_name		= JKY.get_value('jky-th-product-name'		); 
	var my_color_name		= JKY.get_value('jky-th-color-name'			); 
	var my_checkin_location	= JKY.get_value('jky-th-checkin-location'	); 
/*
	if (my_checkout_weight === 0) {
		JKY.play_beep();
		JKY.display_message(JKY.t('Check Out Weight') + ' ' + JKY.t('is zero'));
		return;
	}
	if ($('#jky-fabric-table thead .jky-error').length > 0) {
		JKY.set_focus('jky-barcode');
		return;
	}
*/
	var	my_checkbox = '<input type="checkbox" onclick="JKY.App.set_checkbox(this)" barcode=' + my_barcode + ' weight=' + my_checkout_weight + ' />';

	var my_requested_pieces	= parseInt  (JKY.get_value('jky-requested-pieces'));
	var my_checkout_pieces	= parseInt  (JKY.get_value('jky-checkout-pieces' )) + 1;
	JKY.set_value('jky-checkout-pieces',  my_checkout_pieces);

	if (my_checkout_pieces > my_requested_pieces) {
		JKY.play_beep();
		JKY.display_message('Check out pieces is greater than requested pieces');
	}

	var my_html = '<tr>'
			+ '<td class="jky-td-checkbox"	>'	+ my_checkbox			+ '</td>'
			+ '<td class="jky-td-barcode"	>'	+ my_barcode			+ '</td>'
			+ '<td class="jky-td-weight jky-checkout-weight">'	+ my_checkout_weight+ '</td>'
			+ '<td class="jky-td-weight jky-checkin-weight"	>'	+ my_checkin_weight	+ '</td>'
			+ '<td class="jky-td-input"		>'	+ ++JKY.sequence		+ '</td>'
			+ '<td class="jky-td-status"	>'	+ my_status				+ '</td>'
			+ '<td class="jky-td-text-l"	>'	+ my_product_name		+ '</td>'
			+ '<td class="jky-td-name-s"	>'	+ my_color_name			+ '</td>'
			+ '<td class="jky-td-location"	>'	+ my_checkin_location	+ '</td>'
			+ '</tr>'
			;
	JKY.prepend_html('jky-fabrics-table-body', my_html);
	JKY.show('jky-action-clear'  );
	JKY.show('jky-action-confirm');
	JKY.set_value('jky-barcode', '');
	JKY.set_value('jky-th-checkin-weight'	, '');
	JKY.set_value('jky-th-status'			, '');
	JKY.set_value('jky-th-product-name'		, '');
	JKY.set_value('jky-th-color-name'		, '');
	JKY.set_value('jky-th-checkin-location'	, '');
	JKY.set_focus('jky-barcode');
}

/**
 * confirm screen
 */
JKY.process_confirm_screen = function() {
	JKY.display_trace('process_confirm_screen');
//	if ($('#jky-app-form').css('display') == 'block') {
//		JKY.confirm_row(JKY.row.id);
//	}else{
		$('#jky-fabrics-table-body .jky-td-checkbox input:checked').each(function() {
			var $my_tr = $(this).parent().parent();
			var my_barcode = $my_tr.find('.jky-td-barcode'		).html();
			var my_weight  = $my_tr.find('.jky-checkout-weight'	).html();
			JKY.confirm_row(this, my_barcode, my_weight);
		});
//	}

	if (JKY.get_html('jky-fabrics-table-body') == '') {
		JKY.process_clear_screen();
	}
	JKY.set_focus('jky-input-barcode');
}

/**
 * confirm row
 */
JKY.confirm_row = function(the_id, the_barcode, the_weight) {
	JKY.display_trace('confirm_row');
	JKY.display_message(JKY.t('Confirmed, barcode') + ': ' + the_barcode + ' ' + the_weight);
	var my_data =
		{ method		: 'checkout'
		, table			: 'Fabrics'
		, barcode		: the_barcode
		, weight		: the_weight
		, saleout_id	: JKY.row.id
		, salecolor_id	: JKY.row.salecolor_id
		, sale_id		: JKY.row.sale_id
		};
	JKY.ajax(false, my_data, JKY.confirm_row_success);
	$(the_id).parent().parent().remove();
}

/**
 * confirm row success
 */
JKY.confirm_row_success = function(response) {
	JKY.display_trace('confirm_row');
//	JKY.set_value('jky-saleout-weight' , JKY.get_value_by_id('BatchOuts', 'saleout_weight' , JKY.row.id));
//	JKY.set_value('jky-saleout-fabrics', JKY.get_value_by_id('BatchOuts', 'saleout_fabrics', JKY.row.id));
	JKY.row = JKY.get_row('SaleOuts', JKY.row.id);
	JKY.set_value('jky-reserved-fabrics', JKY.row.reserved_fabrics	);
	JKY.set_value('jky-reserved-weight'	, JKY.row.reserved_weight	);
	JKY.set_value('jky-saleout-fabrics'	, JKY.row.saleout_fabrics	);
	JKY.set_value('jky-saleout-weight'	, JKY.row.saleout_weight	);
}

JKY.assign_row = function(the_id, the_assigned_id) {

	var my_data =
		{ method	: 'update'
		, table		: 'SaleOuts'
		, set		: 'assigned_by = ' + the_assigned_id
		, where		: 'id = ' + the_id
		};
	JKY.ajax(false, my_data);
}
