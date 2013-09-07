"use strict";

/**
 * ftps.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Thread Dyers'
		, table_name	: 'TDyers'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'tdyer_number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-ordered-value'
		, add_new		: 'display form'
		});
	JKY.App.init();
};


JKY.materials	= [];
JKY.threads		= [];
JKY.loads		= [];
JKY.settings	= [];
JKY.suppliers	= [];

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-needed-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-checkout-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-returned-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-ordered-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-needed-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-checkout-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-returned-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-ordered-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-needed-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-checkout-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-returned-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-threads-add-new').click (function()	{JKY.insert_thread();});
	$('#jky-action-generate').click( function() {JKY.generate_checkout();})

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-save-remarks'		).click (function()	{JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-order'	, '../JKY.Search.Order.html'	);
	JKY.append_file('jky-load-customer'	, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-batchin'	, '../JKY.Search.BatchIn.html'	);
	JKY.append_file('jky-load-color'	, '../JKY.Search.Color.html'	);

	JKY.set_side_active('jky-planning-tdyers');
//	JKY.set_html('jky-ordered-name' , JKY.set_table_options('Machines', 'name', '', ''));
//	JKY.set_html('jky-customer-name', JKY.set_options_array('', JKY.get_companies('is_customer'), true));
//	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
	JKY.show('jky-action-print');
//	JKY.materials	= JKY.get_configs	('Materials'	);
//	JKY.threads		= JKY.get_ids		('Threads'		);
//	JKY.settings	= JKY.get_configs	('Settings'		);
//	JKY.suppliers	= JKY.get_companies	('is_supplier'	);

	$('#jky-order-filter'		).KeyUpDelay(JKY.Order.load_data );
	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer.load_data);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer.load_data );
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data);
	$('#jky-batchin-filter'		).KeyUpDelay(JKY.BatchIn.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data);
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-tdyer-number"	>' +				 the_row.tdyer_number			+ '</td>'
		+  '<td class="jky-order-number"	>' + JKY.fix_null	(the_row.order_number		)	+ '</td>'
		+  '<td class="jky-customer-name"	>' + JKY.fix_null	(the_row.customer_name		)	+ '</td>'
		+  '<td class="jky-dyer-name"		>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-ordered-date"	>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-needed-date"		>' + JKY.short_date	(the_row.needed_at			)	+ '</td>'
		+  '<td class="jky-checkout-date"	>' + JKY.short_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-returned-date"	>' + JKY.short_date	(the_row.returned_at		)	+ '</td>'
		+  '<td class="jky-ordered-weight"	>' +				 the_row.ordered_weight			+ '</td>'
		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-returned-weight"	>' +				 the_row.returned_weight		+ '</td>'
		+  '</tr>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
		if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_value	('jky-tdyer-number'		, the_row.tdyer_number	);
	JKY.set_value	('jky-order-id'			, the_row.order_id		);
	JKY.set_value	('jky-order-number'		, the_row.order_number	);
	JKY.set_value	('jky-customer-id'		, the_row.customer_id	);
	JKY.set_value	('jky-customer-name'	, the_row.customer_name	);
	JKY.set_value	('jky-dyer-id'			, the_row.dyer_id		);
	JKY.set_value	('jky-dyer-name'		, the_row.dyer_name		);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-needed-date'		, JKY.out_time(the_row.needed_at	));
	JKY.set_date	('jky-checkout-date'	, JKY.out_time(the_row.checkout_at	));
	JKY.set_date	('jky-returned-date'	, JKY.out_time(the_row.returned_at	));
	JKY.set_value	('jky-ordered-weight'	, the_row.ordered_weight	);
	JKY.set_value	('jky-checkout-weight'	, the_row.checkout_weight	);
	JKY.set_value	('jky-returned-weight'	, the_row.returned_weight	);
	JKY.set_value	('jky-remarks'			, JKY.row.remarks			);
	JKY.display_threads();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-tdyer-number'		, JKY.t('New'));
	JKY.set_value	('jky-order-id'			, '');
	JKY.set_value	('jky-order-number'		, '');
	JKY.set_value	('jky-customer-id'		, '');
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-needed-date'		, JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-ordered-weight'	, 0);
	JKY.set_value	('jky-checkout-weight'	, 0);
	JKY.set_value	('jky-returned-weight'	, 0);
	JKY.set_value	('jky-remarks'			, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_order_id		= JKY.get_value('jky-order-id'		);
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
		my_order_id		= (my_order_id		== '') ? 'null' : my_order_id	;
		my_customer_id	= (my_customer_id	== '') ? 'null' : my_customer_id;
		my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;

	var my_set = ''
		+          'order_id=  ' + my_order_id
		+     ', customer_id=  ' + my_customer_id
		+         ', dyer_id=  ' + my_dyer_id
		+      ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'	))
		+       ', needed_at=  ' + JKY.inp_time(JKY.get_value('jky-needed-value'	))
		+     ', checkout_at=  ' + JKY.inp_time(JKY.get_value('jky-checkout-value'	))
		+     ', returned_at=  ' + JKY.inp_time(JKY.get_value('jky-returned-value'	))
		+  ', ordered_weight=  ' + JKY.get_value	('jky-ordered-weight'	)
		+ ', checkout_weight=  ' + JKY.get_value	('jky-checkout-weight'	)
		+ ', returned_weight=  ' + JKY.get_value	('jky-returned-weight'	)
		+		  ', remarks=\'' + JKY.get_value	('jky-remarks'			) + '\''
		;
	return my_set;
}

JKY.display_list = function() {
	JKY.show('jky-action-print');
}

JKY.display_form = function() {
	JKY.show('jky-action-print');
	JKY.show('jky-action-copy');
}

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Sets'
		, where : 'ftp_id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method: 'delete_many'
		, table : 'FTP_Loads'
		, where : 'ftp_id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method: 'delete_many'
		, table : 'FTP_Threads'
		, where : 'ftp_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.display_message('print_row: ' + the_id);
	var my_names;
	var my_extension;
	var my_row = JKY.get_row(JKY.App.get('table_name'), the_id);

//window.print();
	var my_html = ''
		+ "<table><tr>"
		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + my_row.collection + "</td>"
		+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(my_row.start_date) + "</td>"
		+ "</tr></table>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>       Thread Dyer Number</span>:</td><td id='jky-print-tyder-number'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>                    Order</span>:</td><td id='jky-print-order-id'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>                 Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>                     Dyer</span>:</td><td id='jky-print-dyer-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"

		+ "<br>"
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>          Ordered Date</span>:</td><td id='jky-print-ordered-at'			class='jky-print-value'></td>"
		+ "<td class='jky-print-label1'><span>        Ordered Weight</span>:</td><td id='jky-print-ordered-weight'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>           Needed Date</span>:</td><td id='jky-print-needed-at'			class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>        Check Out Date</span>:</td><td id='jky-print-checkout-at'			class='jky-print-value'></td>"
		+ "<td class='jky-print-label1'><span>      Check Out Weight</span>:</td><td id='jky-print-checkout-weight'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>         Returned Date</span>:</td><td id='jky-print-returned-at'			class='jky-print-value'></td>"
		+ "<td class='jky-print-label1'><span>       Returned Weight</span>:</td><td id='jky-print-returned-weight'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>               Remarks</span>:</td><td id='jky-print-remarks'										></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Threads</span></td><td><span>Batch</span></td><td><span>Color</span></td><td><span>Supplier</span></td><tr><thead>"
		+ "<tbody id='jky-print-thread-body'></table>"
		+ "</table>"
		;
	JKY.set_html('jky-printable', my_html);
	JKY.t_tag	('jky-printable', 'span');

	JKY.set_html('jky-print-tyder-number'				, my_row.tdyer_number					);
	JKY.set_html('jky-print-order-id'					, my_row.order_id						);
	JKY.set_html('jky-print-customer-name'				, my_row.customer_name					);
	JKY.set_html('jky-print-dyer-name'					, my_row.dyer_name						);

	JKY.set_html('jky-print-ordered-at'					, my_row.ordered_at						);
	JKY.set_html('jky-print-ordered-weight'				, my_row.ordered_weight					);

	JKY.set_html('jky-print-needed-at'					, my_row.needed_at						);

	JKY.set_html('jky-print-checkout-at'				, my_row.checkout_at					);
	JKY.set_html('jky-print-checkout-weight'			, my_row.checkout_weight				);

	JKY.set_html('jky-print-returned-at'				, my_row.returned_at					);
	JKY.set_html('jky-print-returned-weight'			, my_row.returned_weight				);
	JKY.set_html('jky-print-remarks'					, my_row.remarks						);


	JKY.set_html('jky-print-thread-body'	, JKY.print_threads	(the_id));
//	JKY.set_html('jky-print-remarks-body'	, JKY.print_remarks	(the_id));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
}

JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'TDyers'
		, set	:  my_set
		, where : 'TDyers.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
}

JKY.save_remarks_success = function(response) {
	JKY.display_message('Remarks saved, ' + response.message);
}

/* -------------------------------------------------------------------------- */

JKY.generate_checkout = function() {
	JKY.active_tdyer();
}

JKY.active_tdyer = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'TDyers'
		, set		: 'status = \'Active\''
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.insert_checkout);
}

JKY.insert_checkout = function() {
	var my_requested_date = JKY.row.needed_at;
	if (my_requested_date == null) {
		my_requested_date = JKY.get_date();
	}
	var my_set = ''
//		+          'order_id=  ' + JKY.row.order_id
		+           'dyer_id=  ' + JKY.row.dyer_id
		+          ', nfe_dl=\'' + '' + '\''
		+          ', nfe_tm=\'' + '' + '\''
		+    ', requested_at=\'' + my_requested_date + '\''
		+', requested_weight=  ' + JKY.row.ordered_weight
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'CheckOuts'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.insert_batchout);
}

JKY.insert_batchout = function(response) {
	var my_rows = JKY.get_rows('TDyerThreads', JKY.row.id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		JKY.row = my_rows[i];
		var my_batch = JKY.get_row('Batches', JKY.row.batchin_id);
		var my_weight= JKY.get_sum_by_id('TDyerColors', 'ordered_weight', JKY.row.batchin_id);
		var my_requested_boxes = Math.round(my_weight / my_batch.average_weight + 0.5);
		var my_set = ''
			+     '  checkout_id=  ' + response.id
			+       ', thread_id=  ' + JKY.row.thread_id
			+      ', batchin_id=  ' + JKY.row.batchin_id
			+     ', req_line_id=  ' + JKY.row.id
			+            ', code=\'' + '' + '\''
			+           ', batch=\'' + my_batch.number + '\''
			+      ', unit_price=  ' + my_batch.unit_price
			+  ', average_weight=  ' + my_batch.average_weight
			+', requested_weight=  ' + my_weight
			+ ', requested_boxes=  ' + my_requested_boxes
			;
		var my_data =
			{ method	: 'insert'
			, table		: 'BatchOuts'
			, set		:  my_set
			};
		JKY.ajax(false, my_data, JKY.connect_batchout);
	}
}

JKY.connect_batchout = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'TdyerThreads'
		, set		: 'batchout_id = ' + response.id
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Check Out row generated: ' + JKY.row.id);
	JKY.Application.display_row();
}
