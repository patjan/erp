"use strict";

/**
 * batchouts.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'BatchOuts'
		, table_name	: 'BatchOuts'
		, specific		: ''
		, select		: JKY.checkout.select
		, filter		: ''
		, sort_by		: 'CheckOuts.requested_at'
		, sort_seq		: 'ASC'
		, sort_list		: [[2, 0]]
		, focus			: 'jky-requested-weight'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	$('#jky-action-generate').click( function() {JKY.generate_checkout();});
	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-batchouts');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.checkout.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');

	$('#jky-unit-price'		 ).ForceNumericOnly();
	$('#jky-requested-weight').ForceNumericOnly();
	$('#jky-requested-boxes' ).ForceIntegerOnly();
	$('#jky-reserved-boxes'  ).ForceIntegerOnly();
	$('#jky-average-weight'  ).ForceNumericOnly();
	$('#jky-checkout-weight' ).ForceNumericOnly();
	$('#jky-checkout-boxes'  ).ForceIntegerOnly();
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.checkout_number		+ '</td>'
//		+  '<td class="jky-td-code"		>' +				 the_row.code					+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null	(the_row.thread_name		)	+ '</td>'
		+  '<td class="jky-td-code"		>' + JKY.fix_null	(the_row.batch_code			)	+ '</td>'
//		+  '<td class="jky-td-price"	>' +				 the_row.unit_price				+ '</td>'
//		+  '<td class="jky-td-weight"	>' +				 the_row.average_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-td-boxes"	>' +				 the_row.requested_boxes		+ '</td>'
		+  '<td class="jky-td-boxes"	>' +				 the_row.reserved_boxes			+ '</td>'
		+  '<td class="jky-td-boxes"	>' +				 the_row.checkout_boxes			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	var my_requested_boxes	= parseInt(the_row.requested_boxes	);
	var my_reserved_boxes	= parseInt(the_row.reserved_boxes	);
	var my_checkout_boxes	= parseInt(the_row.checkout_boxes	);

	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}

	JKY.set_html	('jky-status'			, JKY.t(the_row.status));
	JKY.set_value	('jky-product-code'		, the_row.code				);
	JKY.set_value	('jky-thread-name'		, the_row.thread_name		);
	JKY.set_value	('jky-batch-code'		, the_row.batch_code		);
	JKY.set_value	('jky-machine-name'		, the_row.machine_name		);
	JKY.set_value	('jky-supplier-name'	, the_row.supplier_name		);
	JKY.set_value	('jky-unit-price'		, the_row.unit_price		);
	JKY.set_value	('jky-requested-weight'	, the_row.requested_weight	);
	JKY.set_value	('jky-requested-boxes'	, the_row.requested_boxes	);
	JKY.set_value	('jky-reserved-boxes'	, the_row.reserved_boxes	);
	JKY.set_value	('jky-average-weight'	, the_row.average_weight	);
	JKY.set_value	('jky-checkout-weight'	, the_row.checkout_weight	);
	JKY.set_value	('jky-checkout-boxes'	, the_row.checkout_boxes	);
	JKY.set_calculated_color();

	if (the_row.batchin_id) {
		JKY.display_boxes();
	}
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-product-code'			, '');
	JKY.set_value	('jky-thread-name'			, '');
	JKY.set_value	('jky-batch-code'			, '');
	JKY.set_value	('jky-machine-name'			, '');
	JKY.set_value	('jky-supplier-name'		, '');
	JKY.set_value	('jky-requested-weight'		,  0);
	JKY.set_value	('jky-requested-boxes'		, '');
	JKY.set_value	('jky-reserved-boxes'		, '');
	JKY.set_value	('jky-unit-price'			,  0);
	JKY.set_value	('jky-average-weight'		,  0);
	JKY.set_value	('jky-checkout-weight'		,  0);
	JKY.set_value	('jky-checkout-boxes'		, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
//	var my_supplier_id = JKY.get_value('jky-thread-name');
//	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+            '  code=\'' + JKY.get_value('jky-product-code'		) + '\''
		+'           , batch=\'' + JKY.get_value('jky-batch-code'		) + '\''
		+'      , unit_price=  ' + JKY.get_value('jky-unit-price'		)
		+', requested_weight=  ' + JKY.get_value('jky-requested-weight'	)
		+' , requested_boxes=  ' + JKY.get_value('jky-requested-boxes'	)
		+'  , reserved_boxes=  ' + JKY.get_value('jky-reserved-boxes'	)
		+'  , average_weight=  ' + JKY.get_value('jky-average-weight'	)
		+' , checkout_weight=  ' + JKY.get_value('jky-checkout-weight'	)
		+'  , checkout_boxes=  ' + JKY.get_value('jky-checkout-boxes'	)
		;
	return my_set;
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_requested_weight	= parseFloat(JKY.get_value('jky-requested-weight'	));
	var my_checkout_weight	= parseFloat(JKY.get_value('jky-checkout-weight'	));
	JKY.set_css('jky-checkout-weight', 'color', ((my_requested_weight - my_checkout_weight) > 0.001) ? 'red' : 'black');

	var my_requested_boxes	= parseInt(JKY.get_value('jky-requested-boxes'	));
	var my_checkout_boxes	= parseInt(JKY.get_value('jky-checkout-boxes'	));
	JKY.set_css('jky-checkout-boxes', 'color', (my_requested_boxes > my_checkout_boxes) ? 'red' : 'black');

	var my_reserved_boxes	= parseInt(JKY.get_value('jky-reserved-boxes'	));
	JKY.set_css('jky-reserved-boxes', 'color', (my_reserved_boxes < 0) ? 'red' : 'black');
}

/* -------------------------------------------------------------------------- */
JKY.generate_checkout = function() {
	var my_requested_boxes = JKY.get_value('jky-requested-boxes');
	var my_reserved_boxes  = JKY.get_value('jky-reserved-boxes' );
	if (my_requested_boxes !=  my_reserved_boxes) {
		JKY.display_message('Check Out cannot be generated');
		JKY.display_message('because Resersed Boxes is not equal to Requested Boxes');
		return;
	}

	JKY.insert_batch_sets();
}

/* -------------------------------------------------------------------------- */
JKY.close_row = function(the_id) {
	var my_data =
		{ method	: 'update'
		, table		: 'BatchSets'
		, set		: 'status = \'Closed\''
		, where		: 'batchout_id = ' + the_id
		};
	JKY.ajax(false, my_data);
}

JKY.insert_batch_sets = function() {
	var my_data;
	var my_trs = $('#jky-boxes-body tr');
	for(var i=0, max=my_trs.length; i<max; i++) {
		var my_tr = my_trs[i];
		var my_reserved_boxes = parseInt($(my_tr).find('.jky-reserved-boxes').val());
		if (my_reserved_boxes > 0) {
			var my_checkin_location	=					 $(my_tr).find('.jky-checkin-location'	).val().toUpperCase();
			var my_checkin_date		= JKY.inp_date_value($(my_tr).find('.jky-checkin-date'		).val());
			var my_checkin_weight	= parseFloat		($(my_tr).find('.jky-checkin-weight'	).val());
			var my_checkin_boxes	= parseInt			($(my_tr).find('.jky-checkin-boxes'		).val());
			var my_set = ''
				+       ' batchout_id=  ' + JKY.row.id
				+ ', checkin_location=\'' + my_checkin_location + '\''
				+     ', checkin_date=  ' + my_checkin_date
				+   ', checkin_weight=  ' + my_checkin_weight
				+    ', checkin_boxes=  ' + my_checkin_boxes
				+   ', reserved_boxes=  ' + my_reserved_boxes
				;
			my_data =
				{ method	: 'insert'
				, table		: 'BatchSets'
				, set		:  my_set
				};
			JKY.ajax(false, my_data);

			my_data =
				{ method	: 'update'
				, table		: 'BatchOuts'
				, set		: 'reserved_boxes = reserved_boxes + ' + my_reserved_boxes
				, where		: 'BatchOuts.id = ' + JKY.row.id
				};
			JKY.ajax(false, my_data);
		}
	}

	my_data =
		{ method	: 'update'
		, table		: 'BatchOuts'
		, set		: 'status = \'Active\''
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Batch row generated: ' + JKY.row.id);
	JKY.App.display_row();
}