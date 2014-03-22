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
		, sort_by		: 'requested_at'
		, sort_seq		: 'ASC'
		, sort_list		: [[7, 0]]
		, focus			: 'jky-scheduled-value'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-requested-date	input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-scheduled-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-requested-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-date'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-generate'	).click( function() {JKY.generate_batch();})
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-planning-reqlines');
//	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
//	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-request-number"	>' +				 the_row.request_number			+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-thread-name"		>' +				 the_row.thread_name			+ '</td>'
		+  '<td class="jky-batch-code"		>' +				 the_row.batch_code				+ '</td>'
		+  '<td class="jky-ordered-date"	>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.out_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-scheduled-date"	>' + JKY.short_date	(the_row.scheduled_at		)	+ '</td>'
		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-checkout-weight"	>' + JKY.fix_null	(the_row.checkout_weight	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-request-number'	, the_row.request_number			);
	JKY.set_value	('jky-machine-name'		, the_row.machine_name				);
	JKY.set_value	('jky-supplier-name'	, the_row.supplier_name				);
	JKY.set_value	('jky-thread-name'		, the_row.thread_name				);
	JKY.set_value	('jky-batch-code'		, the_row.batch_code				);
	JKY.set_value	('jky-ordered-date'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-requested-date'	, JKY.out_date(the_row.requested_at	));
	JKY.set_value	('jky-requested-weight'	, the_row.requested_weight			);
	JKY.set_date	('jky-scheduled-date'	, JKY.out_time(the_row.scheduled_at	));
	JKY.set_value	('jky-checkout-date'	, JKY.out_time(the_row.checkout_at	));
	JKY.set_value	('jky-checkout-weight'	, the_row.checkout_weight			);

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
	JKY.set_value	('jky-request-number'	,  JKY.t('New'));
	JKY.set_value	('jky-machine-name'		, '');
	JKY.set_value	('jky-supplier-name'	, '');
	JKY.set_value	('jky-thread-name'		, '');
	JKY.set_value	('jky-batch-number'		, '');
	JKY.set_value	('jky-ordered-date'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-requested-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-requested-weight'	, '');
	JKY.set_date	('jky-scheduled-date'	, '');
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_value	('jky-checkout-weight'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
//		+     ', machine_id=  ' + my_machine_id
//		+	 ', supplier_id=  ' + my_supplier_id
//		+	   ', thread_id=  ' + my_thread_id
//		+	  ', batchin_id=  ' + my_batchin_id
//		+	   ' ordered_at=  ' + JKY.inp_time ('jky-ordered-date'	)
		+   'requested_date=  ' + JKY.inp_date ('jky-requested-date')
		+   ', scheduled_at=  ' + JKY.inp_time ('jky-scheduled-date')
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
	JKY.insert_checkout();
}

JKY.insert_checkout = function() {
	var my_requested_date = JKY.row.expected_date;
	if (my_requested_date == null) {
		my_requested_date = JKY.get_date();
	}
	var my_set = ''
		+      '  machine_id=  ' + JKY.row.machine_id
		+    ',  supplier_id=  ' + JKY.row.supplier_id
		+          ', nfe_dl=\'' + '' + '\''
		+          ', nfe_tm=\'' + '' + '\''
		+    ', requested_at=\'' + my_requested_date + '\''
		+', requested_weight=  ' + JKY.row.requested_weight
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'CheckOuts'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.insert_batch);
}

JKY.insert_batch = function(response) {
	var my_batch = JKY.get_row('Batches', JKY.row.batchin_id);
	var my_requested_boxes = Math.round(JKY.row.requested_weight / my_batch.average_weight + 0.5);
	var my_set = ''
		+     '  checkout_id=  ' + response.id
		+       ', thread_id=  ' + JKY.row.thread_id
		+      ', batchin_id=  ' + JKY.row.batchin_id
		+     ', req_line_id=  ' + JKY.row.id
		+            ', code=\'' + '' + '\''
		+           ', batch=\'' + my_batch.number + '\''
		+      ', unit_price=  ' + my_batch.unit_price
		+  ', average_weight=  ' + my_batch.average_weight
		+', requested_weight=  ' + JKY.row.requested_weight
		+ ', requested_boxes=  ' + my_requested_boxes
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'BatchOuts'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.connect_batch);
}

JKY.connect_batch = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'ReqLines'
		, set		: 'batch_id = ' + response.id
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Batch row generated');
	JKY.App.display_row();
}