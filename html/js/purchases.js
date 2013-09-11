"use strict";

/**
 * purchases.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Purchases'
		, table_name	: 'Purchases'
		, specific		: ''
		, select		: 'Draft + Active'
		, filter		: ''
		, sort_by		: 'purchase_number'
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
	$('#jky-ordered-value'		).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-expected-value'		).attr('data-format', JKY.Session.get_date		());
	$('#jky-scheduled-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-ordered-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-expected-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-ordered-date'		).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-expected-date'		).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-scheduled-date'		).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-tab-lines'			).click (function() {JKY.display_lines	();});
	$('#jky-line-add-new'		).click (function() {JKY.insert_line	();});

	$('#jky-action-close'		).click( function() {JKY.close_order();})
	$('#jky-action-generate'	).click( function() {JKY.generate_puchase();})

	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-purchases');
	JKY.set_html('jky-app-select'	, JKY.set_options('Draft + Active', 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-payment-term'	, JKY.set_configs('Payment Terms', '', ''));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-purchase-number"	>' +				 the_row.purchase_number
		+ '</td>'
		+  '<td class="jky-source-doc"		>' +				 the_row.source_doc				+ '</td>'
		+  '<td class="jky-ordered-date"	>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-expected-date"	>' + JKY.out_date	(the_row.expected_date		)	+ '</td>'
//		+  '<td class="jky-scheduled-date"	>' + JKY.short_date	(the_row.scheduled_at		)	+ '</td>'
		+  '<td class="jky-expected-weight"	>' +				 the_row.expected_weight		+ '</td>'
		+  '<td class="jky-received-weight"	>' +				 the_row.received_weight		+ '</td>'
		+  '<td class="jky-supplier-name"	>' +				 the_row.supplier_name			+ '</td>'
//		+  '<td class="jky-supplier-ref"	>' +				 the_row.supplier_ref			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-line-add-new'   );
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-line-add-new'   );
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_value	('jky-purchase-number'	,				 the_row.purchase_number	);
	JKY.set_value	('jky-source-doc'		,				 the_row.source_doc			);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at			));
	JKY.set_date	('jky-expected-date'	, JKY.out_date	(the_row.expected_date		));
//	JKY.set_date	('jky-scheduled-date'	, JKY.out_time	(the_row.scheduled_at		));
	JKY.set_option	('jky-supplier-name'	,				 the_row.supplier_id		);
//	JKY.set_value	('jky-supplier-ref'		,				 the_row.supplier_ref		);
//	JKY.set_option	('jky-payment-term'		,				 the_row.payment_term		);

	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'  );
	JKY.disable_button('jky-action-close');

	JKY.set_value	('jky-purchase-number'	,  JKY.t('New'));
	JKY.set_value	('jky-source-doc'		, '');
	JKY.set_date	('jky-ordered-date'		,  JKY.out_time(JKY.get_now ()));
//	JKY.set_date	('jky-expected-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-scheduled-date'	, '');
	JKY.set_option	('jky-supplier-name'	, '');
//	JKY.set_value	('jky-supplier-ref'		, '');
//	JKY.set_option	('jky-payment-term'		, '');
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
//		+  ', scheduled_at=  ' + JKY.inp_time(JKY.get_value('jky-scheduled-value'	))
		+   ', supplier_id=  ' + my_supplier_id
//		+  ', supplier_ref=\'' + JKY.get_value	('jky-supplier-ref'		) + '\''
//		+  ', payment_term=\'' + JKY.get_value	('jky-payment-term'		) + '\''
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'PurchaseLines'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */

JKY.close_order = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'Purchases'
		, set		: 'status = \'Closed\''
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.Application.display_list);
}

/* -------------------------------------------------------------------------- */

JKY.generate_purchase = function() {
	JKY.active_purchase();
}

JKY.active_purchase = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'Purchases'
		, set		: 'status = \'Active\''
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.insert_incoming);
}

JKY.insert_incoming = function() {
	var my_invoice_date = JKY.row.expected_date;
	if (my_invoice_date == null) {
		my_invoice_date = JKY.get_date();
	}
	var my_set = ''
//		+          'order_id=  ' + JKY.row.order_id
		+       'supplier_id=  ' + JKY.row.supplier_id
		+    ', invoice_date=\'' + my_invoice_date + '\''
		+  ', invoice_weight=  ' + JKY.row.expected_weight
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Incomings'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.insert_batchin);
}

JKY.insert_batchin = function(response) {
	var my_rows = JKY.get_rows('PurchaseLines', JKY.row.id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		JKY.row = my_rows[i];
		var my_set = ''
			+       'incoming_id=  ' + response.id
			+       ', thread_id=  ' + JKY.row.thread_id
			+', purchase_line_id=  ' + JKY.row.id
			;
		var my_data =
			{ method	: 'insert'
			, table		: 'Batches'
			, set		:  my_set
			};
		JKY.ajax(false, my_data, JKY.connect_purchaseline);
	}
}

JKY.connect_purchaseline = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		: 'batch_id = ' + response.id
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Batch In row generated: ' + JKY.row.id);
	JKY.Application.display_row();
}
