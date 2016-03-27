"use strict";
var JKY = JKY || {};
/**
 * tdyer.js
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
		, select		: JKY.planning.select
		, filter		: ''
		, sort_by		: 'tdyer_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-ordered-value'
		, add_new		: 'display form'
		, class			: 'status'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-needed-date			input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-checkout-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-returned-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-ordered-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-needed-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-checkout-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-returned-date'		).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-threads-add-new'	).click (function() {JKY.insert_thread			();});
	$('#jky-action-generate'	).click( function() {JKY.generate_tdyer			();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
//	$('#jky-search-add-new'		).click (function() {JKY.add_new_product	();});
	$('#jky-action-save-remarks').click (function() {JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);

	JKY.set_side_active('jky-planning-tdyers');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-order'		, '../JKY.Search.Order.html'	);
	JKY.append_file('jky-load-customer'		, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-dyer'			, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-thread'		, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-batchin'		, '../JKY.Search.BatchIn.html'	);
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'	);

	JKY.set_html('jky-app-select', JKY.set_options(JKY.planning.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');

	$('#jky-order-filter'		).KeyUpDelay(JKY.Order		.load_data);
	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer	.load_data);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer		.load_data);
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread		.load_data);
	$('#jky-batchin-filter'		).KeyUpDelay(JKY.BatchIn	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color		.load_data);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.tdyer_number		+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.order_number	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.dyer_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.ordered_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.needed_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.checkout_at	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.returned_at	)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.ordered_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.returned_weight	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status === 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-threads-add-new');
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-threads-add-new');
	}
	if (the_row.status === 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_value	('jky-tdyer-number'		,				 the_row.tdyer_number		);
	JKY.set_value	('jky-order-id'			,				 the_row.order_id			);
	JKY.set_value	('jky-order-number'		,				 the_row.order_number		);
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name		);
	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id			);
	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name			);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at			));
	JKY.set_date	('jky-needed-date'		, JKY.out_time	(the_row.needed_at			));
	JKY.set_date	('jky-checkout-date'	, JKY.out_time	(the_row.checkout_at		));
	JKY.set_date	('jky-returned-date'	, JKY.out_time	(the_row.returned_at		));
	JKY.set_value	('jky-ordered-weight'	,				 the_row.ordered_weight		);
	JKY.set_value	('jky-checkout-weight'	,				 the_row.checkout_weight	);
	JKY.set_value	('jky-returned-weight'	,				 the_row.returned_weight	);
	JKY.set_value	('jky-remarks'			, JKY.decode	(the_row.remarks			));
	JKY.display_threads();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-tdyer-number'		, JKY.t('New'));
	JKY.set_value	('jky-order-id'			, '');
	JKY.set_value	('jky-order-number'		, '');
	JKY.set_value	('jky-customer-id'		, '');
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-needed-date'		, JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-ordered-weight'	, 0);
	JKY.set_value	('jky-checkout-weight'	, 0);
	JKY.set_value	('jky-returned-weight'	, 0);
	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_order_id		= JKY.get_value('jky-order-id'		);
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
		my_order_id		= (my_order_id		=== '') ? 'null' : my_order_id		;
		my_customer_id	= (my_customer_id	=== '') ? 'null' : my_customer_id	;
		my_dyer_id		= (my_dyer_id		=== '') ? 'null' : my_dyer_id		;

	var my_set = ''
		+          '  order_id=  ' + my_order_id
		+       ', customer_id=  ' + my_customer_id
		+           ', dyer_id=  ' + my_dyer_id
		+        ', ordered_at=  ' +			JKY.inp_time ('jky-ordered-date'	)
		+         ', needed_at=  ' +			JKY.inp_time ('jky-needed-date'		)
		+       ', checkout_at=  ' +			JKY.inp_time ('jky-checkout-date'	)
		+       ', returned_at=  ' +			JKY.inp_time ('jky-returned-date'	)
		+    ', ordered_weight=  ' +			JKY.get_value('jky-ordered-weight'	)
		+   ', checkout_weight=  ' +			JKY.get_value('jky-checkout-weight'	)
		+   ', returned_weight=  ' +			JKY.get_value('jky-returned-weight'	)
		+           ', remarks=\'' + JKY.encode(JKY.get_value('jky-remarks'			))	+ '\''
		;
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-print'  );
};

JKY.display_form = function() {
	JKY.show('jky-action-print'  );
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Sets'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method: 'delete_many'
		, table : 'FTP_Loads'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method: 'delete_many'
		, table : 'FTP_Threads'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'TDyers'
		, set	:  my_set
		, where : 'TDyers.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
};

JKY.save_remarks_success = function(response) {
	JKY.display_message('Remarks saved, ' + response.message);
	JKY.row = JKY.get_row('TDyers', JKY.row.id);
};

/* -------------------------------------------------------------------------- */
JKY.generate_tdyer = function() {
	var my_dyer_id = JKY.get_value_by_id('TDyers', 'dyer_id', JKY.row.id);
	if (my_dyer_id == null) {
		JKY.display_message('Check Out cannot be generated');
		JKY.display_message('because Dyer is not selected');
		return;
	}

	var my_ordered_weight = JKY.get_value_by_id('TDyers', 'ordered_weight', JKY.row.id);
	if (my_ordered_weight <= 0) {
		JKY.display_message('Check Out cannot be generated');
		JKY.display_message('because there is not any Ordered Weight');
		return;
	}

	var my_rows = JKY.get_rows('TDyerThreads', JKY.row.id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		if (my_row.batchin_id == null) {
			JKY.display_message('Check Out cannot be generated');
			JKY.display_message('because there is unselected Thread Batch');
			return;
		}
	}

	var my_data =
		{ method	: 'generate'
		, table		: 'TDyers'
		, id		:  JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Check Out row generated: ' + JKY.row.id);
	JKY.App.display_row();
};

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.display_message('print_row: ' + the_id);
	var my_names;
	var my_extension;
	var my_row = JKY.get_row(JKY.App.get_prop('table_name'), the_id);

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
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Thread Dyer Number</span>:</td><td id='jky-print-tyder-number'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>           Order</span>:</td><td id='jky-print-order-id'			class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>            Dyer</span>:</td><td id='jky-print-dyer-name'		class='jky-form-value'></td></tr>"
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

	JKY.set_html('jky-print-tyder-number'		, my_row.tdyer_number		);
	JKY.set_html('jky-print-order-id'			, my_row.order_id			);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name		);
	JKY.set_html('jky-print-dyer-name'			, my_row.dyer_name			);

	JKY.set_html('jky-print-ordered-at'			, my_row.ordered_at			);
	JKY.set_html('jky-print-ordered-weight'		, my_row.ordered_weight		);

	JKY.set_html('jky-print-needed-at'			, my_row.needed_at			);

	JKY.set_html('jky-print-checkout-at'		, my_row.checkout_at		);
	JKY.set_html('jky-print-checkout-weight'	, my_row.checkout_weight	);

	JKY.set_html('jky-print-returned-at'		, my_row.returned_at		);
	JKY.set_html('jky-print-returned-weight'	, my_row.returned_weight	);
	JKY.set_html('jky-print-remarks'			, JKY.nl2br(JKY.decode(my_row.remarks)));


	JKY.set_html('jky-print-thread-body'		, JKY.print_threads	(the_id));
//	JKY.set_html('jky-print-remarks-body'		, JKY.print_remarks	(the_id));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
};
