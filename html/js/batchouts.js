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
		, select		: ''
		, filter		: ''
		, sort_by		: 'CheckOuts.requested_at'
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
	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	$('#jky-action-batch'	).click( function() {JKY.generate_batch();})
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-batchouts');
//	JKY.set_html('jky-app-select', JKY.set_configs('Product Types', JKY.App.get('select'), 'All'));
//	JKY.set_html('jky-thread-name'  , JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
//	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), true));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-checkout-number"	>' +				 the_row.checkout_number		+ '</td>'
//		+  '<td class="jky-code"				>' +				 the_row.code					+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.short_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-thread-name"		>' +				 the_row.thread_name			+ '</td>'
		+  '<td class="jky-batch-number"	>' +				 the_row.batch_number			+ '</td>'
//		+  '<td class="jky-unit-price"		>' +				 the_row.unit_price				+ '</td>'
//		+  '<td class="jky-average-weight"	>' +				 the_row.average_weight			+ '</td>'
		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-requested-boxes"	>' +				 the_row.requested_boxes		+ '</td>'
		+  '<td class="jky-reserved-boxes"	>' +				 the_row.reserved_boxes			+ '</td>'
		+  '<td class="jky-checkout-boxes"	>' +				 the_row.checkout_boxes			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-product-code'			, the_row.code				);
	JKY.set_value	('jky-thread-name'			, the_row.thread_name		);
	JKY.set_value	('jky-batch-number'			, the_row.batch_number		);
	JKY.set_value	('jky-machine-name'			, the_row.machine_name		);
	JKY.set_value	('jky-supplier-name'		, the_row.supplier_name		);
	JKY.set_value	('jky-unit-price'			, the_row.unit_price		);
	JKY.set_value	('jky-requested-weight'		, the_row.requested_weight	);
	JKY.set_value	('jky-requested-boxes'		, the_row.requested_boxes	);
	JKY.set_value	('jky-reserved-boxes'		, the_row.reserved_boxes	);
	JKY.set_value	('jky-average-weight'		, the_row.average_weight	);
	JKY.set_value	('jky-checkout-weight'		, the_row.checkout_weight	);
	JKY.set_value	('jky-checkout-boxes'		, the_row.checkout_boxes	);

	if (parseInt(the_row.requested_boxes) > (parseInt(the_row.reserved_boxes) + parseInt(the_row.checkout_boxes))) {
		JKY.enable_button ('jky-action-batch' );
		JKY.enable_button ('jky-action-delete');
	}else{
		JKY.disable_button('jky-action-batch' );
		JKY.disable_button('jky-action-delete');
	}

	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-code'			, '');
	JKY.set_value	('jky-thread-name'			, '');
	JKY.set_value	('jky-batch-number'			, '');
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
		+   'code=\''				+	JKY.get_value('jky-product-code'		) + '\''
		+', batch=\''				+	JKY.get_value('jky-batch-number'		) + '\''
		+', unit_price=  '			+	JKY.get_value('jky-unit-price'			)
		+', requested_weight= '		+	JKY.get_value('jky-requested-weight'	)
		+', requested_boxes=  '		+	JKY.get_value('jky-requested-boxes'		)
		+', reserved_boxes=  '		+	JKY.get_value('jky-reserved-boxes'		)
		+', average_weight=  '		+	JKY.get_value('jky-average-weight'		)
		+', checkout_weight=  '		+	JKY.get_value('jky-checkout-weight'		)
		+', checkout_boxes=  '		+	JKY.get_value('jky-checkout-boxes'		)
		;
	return my_set;
};

/* -------------------------------------------------------------------------- */

JKY.generate_batch = function() {
	JKY.insert_batch_sets();
}

JKY.insert_batch_sets = function() {
	var my_trs = $('#jky-boxes-body tr');
	for(var i=0, max=my_trs.length; i<max; i++) {
		var my_tr = my_trs[i];
		var my_reserved_boxes = parseInt($(my_tr).find('.jky-reserved-boxes').val());
		if (my_reserved_boxes > 0) {
			var my_checkin_location	=				 $(my_tr).find('.jky-checkin-location'	).val() ;
			var my_checkin_date		= JKY.inp_date	($(my_tr).find('.jky-checkin-date'		).val());
			var my_checkin_weight	= parseFloat	($(my_tr).find('.jky-checkin-weight'	).val());
			var my_checkin_boxes	= parseInt		($(my_tr).find('.jky-checkin-boxes'		).val());
			var my_set = ''
				+       ' batchout_id=  ' + JKY.row.id
				+ ', checkin_location=\'' + my_checkin_location + '\''
				+     ', checkin_date=  ' + my_checkin_date
				+   ', checkin_weight=  ' + my_checkin_weight
				+    ', checkin_boxes=  ' + my_checkin_boxes
				+   ', reserved_boxes=  ' + my_reserved_boxes
				;
			var my_data =
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
	JKY.display_message('Batch row generated');
	JKY.Application.display_row();
}