"use strict";

/**
 * reqlines.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'ReqLines'
		, table_name	: 'ReqLines'
		, specific		: ''
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'Requests.number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-source-doc'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-requested-value').attr('data-format', JKY.Session.get_date		());
	$('#jky-scheduled-value').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-ordered-at'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-requested-at'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-at'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-ordered-at'		).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-requested-at'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-scheduled-at'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-action-batch'	).click( function() {JKY.generate_batch();})
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-planning-reqlines');
	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-request-number"		>' + the_row.request_number					+ '</td>'
		+  '<td class="jky-machine-name"		>' + the_row.machine_name					+ '</td>'
		+  '<td class="jky-supplier-name"		>' + the_row.supplier_name					+ '</td>'
		+  '<td class="jky-thread-name"			>' + the_row.thread_name					+ '</td>'
		+  '<td class="jky-ordered-at"			>' + JKY.short_date(the_row.ordered_at   )	+ '</td>'
		+  '<td class="jky-requested-date"		>' + JKY.out_date  (the_row.requested_date) + '</td>'
		+  '<td class="jky-scheduled-at"		>' + JKY.short_date(the_row.scheduled_at )	+ '</td>'
		+  '<td class="jky-requested-weight"	>' + the_row.requested_weight				+ '</td>'
		+  '<td class="jky-checkout-weight"		>' + the_row.checkout_weight				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-request-number'		, the_row.request_number);
	JKY.set_value	('jky-machine-name'			, the_row.machine_name	);
	JKY.set_value	('jky-supplier-name'		, the_row.supplier_name	);
	JKY.set_value	('jky-thread-name'			, the_row.thread_name	);
	JKY.set_date	('jky-ordered-at'			, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-requested-date'		, JKY.out_date(the_row.requested_date));
	JKY.set_date	('jky-scheduled-at'			, JKY.out_time(the_row.scheduled_at	));
	JKY.set_value	('jky-requested-weight'		, the_row.requested_weight	);
	JKY.set_value	('jky-checkout-weight'		, the_row.checkout_weight	);

//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-request-number'		,  JKY.t('New'));
	JKY.set_value	('jky-machine-name'			, '');
	JKY.set_value	('jky-supplier-name'		, '');
	JKY.set_option	('jky-thread-name'			, '');
	JKY.set_date	('jky-ordered-at'			,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-requested-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-scheduled-at'			, '');
	JKY.set_value	('jky-requested-weight'		,  0);
	JKY.set_value	('jky-checkout-weight'		,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+      ', machine_id=  ' + my_machine_id
		+	  ', supplier_id=  ' + my_supplier_id
		+	    ', thread_id=  ' + my_thread_id
		+	   ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'	))
		+  ', requested_date=  ' + JKY.inp_date(JKY.get_value('jky-requestd-value'	))
		+	 ', scheduled_at=  ' + JKY.inp_time(JKY.get_value('jky-scheduled-value'	))
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'ReqLines'
		, where : 'request_id = ' + the_id
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