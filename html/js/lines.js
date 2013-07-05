"use strict";

/**
 * lines.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Lines'
		, table_name	: 'Lines'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'ordered_at'
		, sort_seq		: 'DESC'
		, focus			: 'jky-schedule-at'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-at'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-expected-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-at'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-received-at'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-ordered-at'		).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-expected-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-scheduled-at'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-received-at'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-purchases-purchases');
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
		+  '<td class="jky-number"			>' + the_row.number							+ '</td>'
		+  '<td class="jky-ordered-at"		>' + JKY.short_date(the_row.ordered_at   )	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + the_row.supplier_name					+ '</td>'
		+  '<td class="jky-thread-name"		>' + the_row.thread_name					+ '</td>'
		+  '<td class="jky-expected-date"	>' + JKY.out_date  (the_row.expected_date) 	+ '</td>'
		+  '<td class="jky-scheduled-at"	>' + JKY.short_date(the_row.scheduled_at )	+ '</td>'
		+  '<td class="jky-received-at"		>' + JKY.short_date(the_row.scheduled_at )	+ '</td>'
		+  '<td class="jky-expected-weight"	>' + the_row.expected_weight				+ '</td>'
		+  '<td class="jky-received-weight"	>' + the_row.received_weight				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-number'			, the_row.number					);
	JKY.set_date	('jky-ordered-at'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_option	('jky-supplier-name'	, the_row.supplier_id				);
	JKY.set_option	('jky-thread-name'		, the_row.thread_id					);
	JKY.set_date	('jky-expected-date'	, JKY.out_date(the_row.expected_date));
	JKY.set_date	('jky-scheduled-at'		, JKY.out_time(the_row.scheduled_at	));
	JKY.set_date	('jky-received-at'		, JKY.out_time(the_row.scheduled_at	));
	JKY.set_value	('jky-expected-weight'	, the_row.expected_weight			);
	JKY.set_value	('jky-received-weight'	, the_row.received_weight			);
	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-number'			,  JKY.t('New'));
	JKY.set_option	('jky-supplier-name'	, '');
	JKY.set_option	('jky-thread-name'		, '');
	JKY.set_date	('jky-ordered-at'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-expected-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-scheduled-at'		, '');
	JKY.set_date	('jky-received-at'		, '');
	JKY.set_value	('jky-expected-weight'	, '');
	JKY.set_option	('jky-received-weight'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_supplier_id = JKY.get_value('jky-supplier-name');
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+      'source_doc=\'' + JKY.get_value	('jky-source-doc'		) + '\''
		+    ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'		))
		+ ', expected_date=  ' + JKY.inp_date(JKY.get_value('jky-expected-value'	))
		+  ', scheduled_at=  ' + JKY.inp_time(JKY.get_value('jky-scheduled-value'	))
		+   ', supplier_id=  ' + my_supplier_id
		+  ', supplier_ref=\'' + JKY.get_value	('jky-supplier-ref'		) + '\''
		+  ', payment_term=\'' + JKY.get_value	('jky-payment-term'		) + '\''
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'PurchaseLines'
		, where : 'purchase_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

