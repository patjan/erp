"use strict";

/**
 * pieces.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces'
		, table_name	: 'Pieces'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'barcode'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-barcode'
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
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-planning-pieces');
	JKY.set_side_active('jky-production-pieces');
	JKY.set_side_active('jky-dyers-pieces');
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Check In', 'Check Out', 'Return'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	JKY.hide('jky-action-form');

	$('#jky-checkin-weight' ).ForceNumericOnly();
	$('#jky-returned-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-barcode"	>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-td-status"	>' + JKY.t			(the_row.status				)	+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.product_name			+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.order_number			+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.number_of_pieces		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.produced_by			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkin_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.returned_weight		+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkin_location	)	+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkout_location	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.remarks			)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'				, JKY.t(the_row.status		));
	JKY.set_value	('jky-order-number'			, the_row.order_number		);
	JKY.set_value	('jky-barcode'				, the_row.barcode			);
	JKY.set_value	('jky-number-of-pieces'		, the_row.number_of_pieces	);
	JKY.set_value	('jky-produced-by'			, the_row.produced_by		);
	JKY.set_value	('jky-checkin-weight'		, the_row.checkin_weight	);
	JKY.set_value	('jky-returned-weight'		, the_row.returned_weight	);
	JKY.set_value	('jky-checkin-location'		, the_row.checkin_location	);
	JKY.set_value	('jky-checkout-location'	, the_row.checkout_location	);
	JKY.set_value	('jky-remarks'				, the_row.remarks			);
//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-order-number'			, '');
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-status'				, '');
	JKY.set_value	('jky-number-of-pieces'		, '0');
	JKY.set_value	('jky-produced-by'			, '');
	JKY.set_value	('jky-checkin-weight'		,  0);
	JKY.set_value	('jky-returned-weight'		,  0);
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-remarks'				, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
//	var my_supplier_id = JKY.get_value('jky-thread-name');
//	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+            ' barcode=  ' + JKY.get_value('jky-barcode'			)
//		+            ', status=\'' + JKY.get_value('jky-status'				) + '\''
		+  ', number_of_pieces=  ' + JKY.get_value('jky-number-of-pieces'	)
		+       ', produced_by=\'' + JKY.get_value('jky-produced-by'		) + '\''
		+    ', checkin_weight=  ' + JKY.get_value('jky-checkin-weight'		)
		+   ', returned_weight=  ' + JKY.get_value('jky-returned-weight'	)
		+  ', checkin_location=\'' + JKY.get_value('jky-checkin-location'	).toUpperCase() + '\''
		+ ', checkout_location=\'' + JKY.get_value('jky-checkout-location'	).toUpperCase() + '\''
		+           ', remarks=\'' + JKY.get_value('jky-remarks'			) + '\''
	return my_set;
};
