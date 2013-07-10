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
		, table_name	: 'PurchaseLines'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'expected_date'
		, sort_seq		: 'ASC'
		, focus			: 'jky-scheduled-value'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-expected-value'	).attr('data-format', JKY.Session.get_date		());
	$('#jky-scheduled-value').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-expected-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-at'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-expected-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-scheduled-at'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-action-batch'	).click( function() {JKY.generate_batch();})
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-lines');
//	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-purchase-number"	>' + the_row.purchase_number				+ '</td>'
		+  '<td class="jky-supplier-name"	>' + the_row.supplier_name					+ '</td>'
		+  '<td class="jky-thread-name"		>' + the_row.thread_name					+ '</td>'
		+  '<td class="jky-ordered-at"		>' + JKY.short_date(the_row.ordered_at   )	+ '</td>'
		+  '<td class="jky-expected-date"	>' + JKY.out_date  (the_row.expected_date) 	+ '</td>'
		+  '<td class="jky-scheduled-at"	>' + JKY.short_date(the_row.scheduled_at )	+ '</td>'
//		+  '<td class="jky-received-at"		>' + JKY.out_time(the_row.received_at )	+ '</td>'
		+  '<td class="jky-expected-weight"	>' + the_row.expected_weight				+ '</td>'
		+  '<td class="jky-received-weight"	>' + the_row.received_weight				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-purchase-number'	, the_row.purchase_number			);
	JKY.set_value	('jky-supplier-name'	, the_row.supplier_name				);
	JKY.set_value	('jky-thread-name'		, the_row.thread_name				);
	JKY.set_value	('jky-ordered-at'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-expected-date'	, JKY.out_date(the_row.expected_date));
	JKY.set_value	('jky-expected-weight'	, the_row.expected_weight			);
	JKY.set_date	('jky-scheduled-at'		, JKY.out_time(the_row.scheduled_at	));
	JKY.set_value	('jky-received-at'		, JKY.out_time(the_row.received_at	));
	JKY.set_value	('jky-received-weight'	, the_row.received_weight			);

	if (the_row.batch_id == null) {
		JKY.show('jky-action-batch');
		JKY.show('jky-action-delete');
	}else{
		JKY.hide('jky-action-batch');
		JKY.hide('jky-action-delete');
	}

//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-purchase-number'	,  JKY.t('New'));
	JKY.set_value	('jky-supplier-name'	, '');
	JKY.set_value	('jky-thread-name'		, '');
	JKY.set_value	('jky-ordered-at'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-expected-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-expected-weight'	, '');
	JKY.set_date	('jky-scheduled-at'		, '');
	JKY.set_date	('jky-received-at'		, '');
	JKY.set_option	('jky-received-weight'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
//		+       'source_doc=\'' + JKY.get_value('jky-source-doc'		) + '\''
//		+     ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'		))
		+   ' expected_date=  ' + JKY.inp_date (JKY.get_value('jky-expected-value'	))
		+', expected_weight=  ' +				JKY.get_value('jky-expected-weight'	)
		+   ', scheduled_at=  ' + JKY.inp_time (JKY.get_value('jky-scheduled-value'	))
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

JKY.generate_batch = function() {
	JKY.insert_incoming();
}

JKY.insert_incoming = function() {
	var my_invoice_date = JKY.row.expected_date;
	if (my_invoice_date == null) {
		my_invoice_date = JKY.get_date();
	}
	var my_incoming = ''
		+   '  supplier_id=  ' + JKY.row.supplier_id
		+        ', nfe_dl=\'' + '' + '\''
		+        ', nfe_tm=\'' + '' + '\''
		+  ', invoice_date=\'' + my_invoice_date + '\''
		+', invoice_weight=  ' + JKY.row.expected_weight
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Incomings'
		, set		: my_incoming
		};
	JKY.ajax(false, my_data, JKY.insert_batch);
}

JKY.insert_batch = function(response) {
	var my_batch = ''
		+     '  incoming_id=  ' + response.id
		+       ', thread_id=  ' + JKY.row.thread_id
		+', purchase_line_id=  ' + JKY.row.id
		+            ', code=\'' + '' + '\''
		+           ', batch=\'' + '' + '\''
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Batches'
		, set		: my_batch
		};
	JKY.ajax(false, my_data, JKY.connect_batch);
}

JKY.connect_batch = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		: 'batch_id = ' + response.id
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Batch row generated');
	JKY.Application.display_row();
}