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
		, sort_by		: 'number'
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
	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-purchases-incomings');
//	JKY.set_html('jky-app-select', JKY.set_configs('Product Types', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-thread-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
	JKY.set_html('jky-payment-term', JKY.set_configs('Payment Terms', '', ''));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-number"			>' + the_row.number			+ '</td>'
		+  '<td class="jky-thread-name"	>' + the_row.supplier_name	+ '</td>'
		+  '<td class="jky-invoice-number"	>' + the_row.invoice_number	+ '</td>'
		+  '<td class="jky-invoice-weigth"	>' + the_row.invoice_weight	+ '</td>'
		+  '<td class="jky-invoice-amount"	>' + the_row.invoice_amount	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-number'			, the_row.number		);
	JKY.set_option	('jky-thread-name'	, the_row.supplier_id	);
	JKY.set_value	('jky-invoice-number'	, the_row.invoice_number);
	JKY.set_value	('jky-invoice-weight'	, the_row.invoice_weight);
	JKY.set_value	('jky-invoice-amount'	, the_row.invoice_amount);

//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-number'			,  JKY.t('New'));
	JKY.set_option	('jky-thread-name'	, '');
	JKY.set_value	('jky-invoice-number'	, '');
	JKY.set_value	('jky-invoice-weight'	,  0);
	JKY.set_value	('jky-invoice-amount'	,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_supplier_id = JKY.get_value('jky-thread-name');
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+   ', supplier_id=  ' + my_supplier_id
		+', invoice_number=\'' +			  JKY.get_value('jky-invoice-number'	) + '\''
		+', invoice_weight=  ' +			  JKY.get_value('jky-invoice-weight'	)
		+', invoice_amount=  ' +			  JKY.get_value('jky-invoice-amount'	)
		;
	return my_set;
};
