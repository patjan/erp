"use strict";

/**
 * boxes.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Boxes'
		, table_name	: 'Boxes'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'barcode'
		, sort_seq		: 'DESC'
		, focus			: 'jky-received-time'
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
	JKY.set_side_active('jky-threads-boxes');
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Check In', 'Check Out', 'Return'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	JKY.hide('jky-action-add-new');
	JKY.hide('jky-action-form');

	$('#jky-number-of-boxes').ForceIntegerOnly();
	$('#jky-number-of-cones').ForceIntegerOnly();
	$('#jky-average-weight' ).ForceNumericOnly();
	$('#jky-real-weight'	).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-code"		>' +				 the_row.batch_code				+ '</td>'
		+  '<td class="jky-td-barcode"	>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-td-status"	>' + JKY.t			(the_row.status				)	+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.number_of_boxes		+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.number_of_cones		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.average_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.real_weight			+ '</td>'
		+  '<td class="jky-td-location"	>' +				 the_row.checkin_location		+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkout_location	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'				, JKY.t(the_row.status		));
	JKY.set_value	('jky-batch-code'			, the_row.batch_code		);
	JKY.set_value	('jky-barcode'				, the_row.barcode			);
	JKY.set_value	('jky-number-of-boxes'		, the_row.number_of_boxes	);
	JKY.set_value	('jky-number-of-cones'		, the_row.number_of_cones	);
	JKY.set_value	('jky-average-weight'		, the_row.average_weight	);
	JKY.set_value	('jky-real-weight'			, the_row.real_weight		);
	JKY.set_value	('jky-checkin-location'		, the_row.checkin_location	);
	JKY.set_value	('jky-checkout-location'	, the_row.checkout_location	);
	JKY.set_value	('jky-returned-location'	, the_row.returned_location	);
//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-batch-code'			, '');
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-average-weight'		,  0);
	JKY.set_value	('jky-real-weight'			,  0);
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-returned-location'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
//	var my_supplier_id = JKY.get_value('jky-thread-name');
//	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+'	batch_id='				+ JKY.get_value('jky-batch-code'		)
		+', barcode=\''				+ JKY.get_value('jky-barcode'			) + '\''
		+', average_weight=  '		+ JKY.get_value('jky-average-weight'	)
		+', real_weight=  '			+ JKY.get_value('jky-real-weight'		)
		+', checkin_location=\''	+ JKY.get_value('jky-checkin-location'	).toUpperCase() + '\''
		+', checkout_location=\''	+ JKY.get_value('jky-checkout-location'	).toUpperCase() + '\''
		+', returned_location=\''	+ JKY.get_value('jky-returned-location'	).toUpperCase() + '\''
	return my_set;
};
