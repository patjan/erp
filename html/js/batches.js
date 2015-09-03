"use strict";

/**
 * batches.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Batches'
		, table_name	: 'Batches'
		, specific		: ''
		, select		: JKY.incoming.select
		, filter		: ''
		, sort_by		: 'batch'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-checkin-boxes'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
//	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	JKY.set_side_active('jky-threads-batches');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-app-select', JKY.set_options(JKY.incoming.select, 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');

	$('#jky-labels-printed'	).ForceIntegerOnly();
	$('#jky-received-boxes'	).ForceIntegerOnly();
	$('#jky-checkin-boxes'	).ForceIntegerOnly();
	$('#jky-number-of-cones').ForceIntegerOnly();
	$('#jky-unit-price'		).ForceNumericOnly();
	$('#jky-average-weight'	).ForceNumericOnly();
	$('#jky-received-weight').ForceNumericOnly();
	$('#jky-checkin-weight'	).ForceNumericOnly();
	$('#jky-returned-weight').ForceNumericOnly();
	$('#jky-checkout-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_received_boxes	= parseInt(the_row.received_boxes);
	var my_labels_printed	= parseInt(the_row.labels_printed);
	var my_checkin_boxes	= parseInt(the_row.checkin_boxes );
	var my_labels_color		= (my_labels_printed < my_received_boxes) ? 'jky-error' : 'jky-ok';
	var my_checkin_color	= (my_checkin_boxes  < my_received_boxes) ? 'jky-error' : 'jky-ok';

	var my_html = ''
		+  '<td class="jky-td-name-l"	>' +				 the_row.name					+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.supplier_name			+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.batch				)	+ '</td>'
		+  '<td class="jky-td-boxes"	>' +				 the_row.received_boxes			+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.nfe_tm				)	+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.purchase_number	)	+ '</td>'
//		+  '<td class="jky-td-integer ' + my_labels_color  + '"	>' + the_row.labels_printed	+ '</td>'
//		+  '<td class="jky-td-boxes   ' + my_checkin_color + '"	>' + the_row.checkin_boxes	+ '</td>'
//		+  '<td class="jky-td-integer"	>' +				 the_row.number_of_cones		+ '</td>'
		+  '<td class="jky-td-price"	>' +				 the_row.unit_price				+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.average_weight			+ '</td>'
//		+  '<td class="jky-td-weight"	>' +				 the_row.received_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkin_weight			+ '</td>'
//		+  '<td class="jky-td-weight"	>' +				 the_row.returned_weight		+ '</td>'
//		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-product-code'		,			 the_row.code			) ;
	JKY.set_value	('jky-batch-code'		,			 the_row.batch			) ;
	JKY.set_value	('jky-labels-printed'	,			 the_row.labels_printed	) ;
	JKY.set_value	('jky-received-boxes'	,			 the_row.received_boxes	) ;
	JKY.set_value	('jky-checkin-boxes'	,			 the_row.checkin_boxes	) ;
	JKY.set_value	('jky-number-of-cones'	,			 the_row.number_of_cones) ;
	JKY.set_value	('jky-unit-price'		,			 the_row.unit_price		) ;
	JKY.set_value	('jky-average-weight'	,			 the_row.average_weight	) ;
	JKY.set_value	('jky-received-weight'	,			 the_row.received_weight) ;
	JKY.set_value	('jky-checkin-weight'	,			 the_row.checkin_weight	) ;
	JKY.set_value	('jky-returned-weight'	,			 the_row.returned_weight) ;
	JKY.set_value	('jky-checkout-weight'	,			 the_row.checkout_weight) ;
	JKY.set_value	('jky-remarks'			, JKY.decode(the_row.remarks		));
	JKY.display_boxes();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-code'		, '');
	JKY.set_value	('jky-batch-code'		, '');
	JKY.set_value	('jky-labels-printed'	,  0);
	JKY.set_value	('jky-received-boxes'	,  0);
	JKY.set_value	('jky-checkin-boxes'	,  0);
	JKY.set_value	('jky-number-of-cones'	,  0);
	JKY.set_value	('jky-unit-price'		,  0);
	JKY.set_value	('jky-average-weight'	,  0);
	JKY.set_value	('jky-received-weight'	,  0);
	JKY.set_value	('jky-checkin-weight'	,  0);
	JKY.set_value	('jky-returned-weight'	,  0);
	JKY.set_value	('jky-checkout-weight'	,  0);
	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
//	var my_supplier_id = JKY.get_value('jky-thread-name');
//	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+              '  code=\'' +			JKY.get_value('jky-product-code'	)	+ '\''
		+             ', batch=\'' +			JKY.get_value('jky-batch-code'		)	+ '\''
		+    ', labels_printed=  ' +			JKY.get_value('jky-labels-printed'	)
		+    ', received_boxes=  ' +			JKY.get_value('jky-received-boxes'	)
		+     ', checkin_boxes=  ' +			JKY.get_value('jky-checkin-boxes'	)
		+   ', number_of_cones=  ' +			JKY.get_value('jky-number-of-cones'	)
		+        ', unit_price=  ' +			JKY.get_value('jky-unit-price'		)
		+    ', average_weight=  ' +			JKY.get_value('jky-average-weight'	)
		+   ', received_weight=  ' +			JKY.get_value('jky-received-weight'	)
		+    ', checkin_weight=  ' +			JKY.get_value('jky-checkin-weight'	)
		+   ', returned_weight=  ' +			JKY.get_value('jky-returned-weight'	)
		+   ', checkout_weight=  ' +			JKY.get_value('jky-checkout-weight'	)
		+           ', remarks=\'' + JKY.encode(JKY.get_value('jky-remarks'			))	+ '\''
		;
	return my_set;
};
