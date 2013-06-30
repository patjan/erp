"use strict";

/**
 * incomings.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Incomings'
		, table_name	: 'Incomings'
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
	$('#jky-invoice-weight'		).datetimepicker({language: 'pt-BR'});
	$('#jky-expected-date'	).datetimepicker({language: 'pt-BR', pickTime: false});
	$('#jky-scheduled-at'	).datetimepicker({language: 'pt-BR'});

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
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
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
		+  '<td class="jky-received-time"		>' + the_row.received_time		+ '</td>'
		+  '<td class="jky-invoice-weight"		>' + JKY.short_date(the_row.ordered_at   )	+ '</td>'
		+  '<td class="jky-expected-date"	>' + the_row.expected_date 	+ '</td>'
		+  '<td class="jky-scheduled-at"	>' + JKY.short_date(the_row.scheduled_at )	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + the_row.supplier_name	+ '</td>'
		+  '<td class="jky-supplier-ref"	>' + the_row.supplier_ref	+ '</td>'
		+  '<td class="jky-payment-term"	>' + the_row.payment_term	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-number'			, the_row.number		);
	JKY.set_value	('jky-received-time'		, the_row.received_time	);
	JKY.set_value	('jky-ordered-value'	, JKY.fix_ymd2dmy(the_row.ordered_at));
	JKY.set_value	('jky-expected-value'	, JKY.fix_ymd2dmy(the_row.expected_date));
	JKY.set_value	('jky-scheduled-value'	, JKY.fix_ymd2dmy(the_row.scheduled_at));
	JKY.set_option	('jky-supplier-name'	, the_row.supplier_id	);
	JKY.set_value	('jky-supplier-ref'		, the_row.supplier_ref	);
	JKY.set_option	('jky-payment-term'		, the_row.payment_term	);

	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-number'			,  JKY.t('New'));
	JKY.set_value	('jky-received-time'		, '');
	JKY.set_value	('jky-invoice-weight'		,  JKY.fix_ymd2dmy(JKY.get_now()));
	JKY.set_value	('jky-expected-date'	,  JKY.fix_ymd2dmy(JKY.get_now()));
	JKY.set_value	('jky-scheduled_at'		,  JKY.fix_ymd2dmy(JKY.get_now()));
	JKY.set_option	('jky-supplier-name'	, '');
	JKY.set_value	('jky-supplier-ref'		, '');
	JKY.set_option	('jky-payment-term'		, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_supplier_id = JKY.get_value('jky-supplier-name');
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+      'received_time=\'' + JKY.get_value	('jky-received-time'		) + '\''
		+    ', ordered_at=  ' + JKY.fix_dmy2ymd(JKY.get_value('jky-ordered-value'	))
		+ ', expected_date=  ' + JKY.fix_dmy2ymd(JKY.get_value('jky-expected-value'	))
		+  ', scheduled_at=  ' + JKY.fix_dmy2ymd(JKY.get_value('jky-scheduled-value'))
		+   ', supplier_id=  ' + my_supplier_id
		+  ', supplier_ref=\'' + JKY.get_value	('jky-supplier-ref'		) + '\''
		+  ', payment_term=\'' + JKY.get_value	('jky-payment-term'		) + '\''
		;
	return my_set;
};
