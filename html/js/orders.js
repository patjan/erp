"use strict";
var JKY = JKY || {};
/**
 * orders.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Orders'
		, table_name	: 'Orders'
		, specific		: ''
		, select		: JKY.planning.select
		, filter		: ''
		, sort_by		: 'order_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-ordered-pieces'
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
	$('#jky-produced-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-ordered-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-needed-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-produced-date'		).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-generate'	).click( function() {JKY.generate_checkout		();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
//	$('#jky-threads-add-new'	).click (function() {JKY.insert_thread			();});

//	$('#jky-tab-threads'		).click (function() {JKY.display_threads(JKY.row);});
//	$('#jky-tab-pieces'			).click (function() {JKY.display_pieces	(JKY.row);});

	$('#jky-pieces-display'		).click (function() {JKY.Changes.can_leave(function() {JKY.Pieces.display(this)});});
	$('#jky-pieces-print'		).click (function() {JKY.Pieces.print_label	(); JKY.display_pieces();});
	$('#jky-print-ftp'			).click (function() {JKY.Pieces.print_ftp	();});
	$('#jky-print-op'			).click (function() {JKY.Pieces.print_op	();});

	$('#jky-product-name'		).change(function() {JKY.process_change_product		();});
	$('#jky-ftp-number'			).change(function() {JKY.process_change_ftp			();});
	$('#jky-machine-name'		).change(function() {JKY.clear_produced_by ("machine");});
	$('#jky-partner-name'		).change(function() {JKY.clear_produced_by ("partner");});
	$('#jky-color-name'			).change(function() {JKY.clear_produced_by ("color"  );});

	JKY.set_side_active('jky-planning-orders');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-customer'		, '../JKY.Search.Customer.html'	);
//	JKY.append_file('jky-load-machine'		, '../JKY.Search.Machine.html'	);
	JKY.append_file('jky-load-partner'		, '../JKY.Search.Partner.html'	);
	JKY.append_file('jky-load-product'		, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'	);
	JKY.append_file('jky-load-ftp'			, '../JKY.Search.FTP.html'		);
	JKY.append_file('jky-load-thread'		, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-batchin'		, '../JKY.Search.BatchIn.html'	);

	JKY.set_html('jky-app-select', JKY.set_options(JKY.planning.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.hide	('jky-threads-add-new');

	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer	.load_data);
//	$('#jky-machine-filter'		).KeyUpDelay(JKY.Machine	.load_data);
	$('#jky-partner-filter'		).KeyUpDelay(JKY.Partner	.load_data);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color		.load_data);
	$('#jky-ftp-filter'  		).KeyUpDelay(JKY.FTP		.load_data);
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread		.load_data);
	$('#jky-batchin-filter'		).KeyUpDelay(JKY.BatchIn	.load_data);

	$('#jky-quoted-pieces'	).ForceIntegerOnly();
	$('#jky-ordered-pieces'	).ForceIntegerOnly();
	$('#jky-rejected-pieces').ForceIntegerOnly();
	$('#jky-produced-pieces').ForceIntegerOnly();
	$('#jky-quoted-weight'	).ForceNumericOnly();
	$('#jky-ordered-weight'	).ForceNumericOnly();
	$('#jky-rejected-weight').ForceNumericOnly();
	$('#jky-produced-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_machine_partner = the_row.machine_name;
	if(!my_machine_partner) {
		my_machine_partner = '<b>' + JKY.fix_null(the_row.partner_name) + '</b>';
	}

	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.order_number		+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
		+  '<td class="jky-td-text-s"	>' + JKY.fix_null	(the_row.product_name	)	+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.ftp_number		)	+ '</td>'
		+  '<td class="jky-td-short"	>' +				 my_machine_partner			+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.ordered_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.needed_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.produced_at	)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.quoted_weight		+ '</td>'
//		+  '<td class="jky-td-weight"	>' +				 the_row.ordered_weight		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.quoted_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.ordered_pieces		+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.rejected_pieces	+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.produced_pieces	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.revised_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.labels_printed		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status === 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_delete_button();
//		JKY.enable_button ('jky-threads-add-new');
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_delete_button();
//		JKY.disable_button('jky-threads-add-new');
	}
	if (the_row.status === 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status				));
	JKY.set_value	('jky-order-number'		,				 the_row.order_number		);
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name		);
	JKY.set_value	('jky-product-id'		,				 the_row.product_id			);
	JKY.set_value	('jky-product-name'		,				 the_row.product_name		);
	JKY.set_value	('jky-ftp-id'			,				 the_row.ftp_id				);
	JKY.set_value	('jky-ftp-number'		,				 the_row.ftp_number			);
	JKY.set_value	('jky-machine-id'		,				 the_row.machine_id			);
	JKY.set_value	('jky-machine-name'		,				 the_row.machine_name		);
	JKY.set_value	('jky-partner-id'		,				 the_row.partner_id			);
	JKY.set_value	('jky-partner-name'		,				 the_row.partner_name		);
	JKY.set_value	('jky-color-id'			,				 the_row.color_id			);
	JKY.set_value	('jky-color-name'		,				 the_row.color_name			);
	JKY.set_value	('jky-osa-number'		,				 the_row.osa_number			);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at			));
	JKY.set_date	('jky-needed-date'		, JKY.out_time	(the_row.needed_at			));
	JKY.set_date	('jky-produced-date'	, JKY.out_time	(the_row.produced_at		));
	JKY.set_value	('jky-quoted-pieces'	,				 the_row.quoted_pieces		);
	JKY.set_value	('jky-ordered-pieces'	,				 the_row.ordered_pieces		);
	JKY.set_value	('jky-checkout-pieces'	,				 the_row.checkout_pieces	);
	JKY.set_value	('jky-produced-pieces'	,				 the_row.produced_pieces	);
	JKY.set_value	('jky-rejected-pieces'	,				 the_row.rejected_pieces	);
	JKY.set_value	('jky-quoted-weight'	,				 the_row.quoted_weight		);
	JKY.set_value	('jky-ordered-weight'	,				 the_row.ordered_weight		);
	JKY.set_value	('jky-checkout-weight'	,				 the_row.checkout_weight	);
	JKY.set_value	('jky-produced-weight'	,				 the_row.produced_weight	);
	JKY.set_value	('jky-returned-weight'	,				 the_row.returned_weight	);
	JKY.set_value	('jky-quoted-units'		,				 the_row.quoted_units		);
	JKY.set_value	('jky-labels-printed'	,				 the_row.labels_printed		);
	JKY.set_value	('jky-ftps-printed'		,				 the_row.ftps_printed		);
	JKY.set_value	('jky-ops-printed'		,				 the_row.ops_printed		);
	JKY.set_value	('jky-location'			,				 the_row.location			);

	if (the_row.ftp_id) {
		JKY.display_threads	();
		JKY.display_pieces	(the_row);
	}else{
		JKY.set_html('jky-threads-body', '');
		JKY.set_html('jky-pieces-body' , '');
	}

	if (the_row.osa_line_id) {
		$('#jky-color-name').next().hide();
	}else{
		$('#jky-color-name').next().show();
	}
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-order-number'		,  JKY.t('New'));
	JKY.set_value	('jky-customer-id'		, '');
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-product-id'		, '');
	JKY.set_value	('jky-product-name'		, '');
	JKY.set_value	('jky-ftp-id'			, '');
	JKY.set_value	('jky-ftp-number'		, '');
	JKY.set_value	('jky-machine-id'		, '');
	JKY.set_value	('jky-machine-name'		, '');
	JKY.set_value	('jky-partner-id'		, '');
	JKY.set_value	('jky-partner-name'		, '');
	JKY.set_value	('jky-color-id'			, '');
	JKY.set_value	('jky-color-name'		, '');
	JKY.set_date	('jky-ordered-date'		,  JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-needed-date'		,  JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-produced-date'	, '');
	JKY.set_value	('jky-ordered-pieces'	,  0);
	JKY.set_value	('jky-checkout-pieces'	,  0);
	JKY.set_value	('jky-produced-pieces'	,  0);
	JKY.set_value	('jky-rejected-pieces'	,  0);
	JKY.set_value	('jky-ordered-weight'	,  0);
	JKY.set_value	('jky-checkout-weight'	,  0);
	JKY.set_value	('jky-returned-weight'	,  0);
	JKY.set_value	('jky-produced-weight'	,  0);
	JKY.set_value	('jky-quoted-units'		,  0);
	JKY.set_value	('jky-labels-printed'	,  0);
	JKY.set_value	('jky-ftps-printed'		,  0);
	JKY.set_value	('jky-ops-printed'		,  0);
	JKY.set_value	('jky-location'			, '');

	$('#jky-color-name').next().show();
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_product_id	= JKY.get_value('jky-product-id'	);
	var my_ftp_id		= JKY.get_value('jky-ftp-id'		);
	var my_machine_id	= JKY.get_value('jky-machine-id'	);
	var my_partner_id	= JKY.get_value('jky-partner-id'	);
	var my_color_id		= JKY.get_value('jky-color-id'		);
		my_customer_id	= (my_customer_id	=== '') ? 'null' : my_customer_id;
		my_machine_id	= (my_machine_id	=== '') ? 'null' : my_machine_id ;
		my_partner_id	= (my_partner_id	=== '') ? 'null' : my_partner_id ;
		my_color_id		= (my_color_id		=== '') ? 'null' : my_color_id	 ;
		my_product_id	= (my_product_id	=== '') ? 'null' : my_product_id ;
		my_ftp_id		= (my_ftp_id		=== '') ? 'null' : my_ftp_id	 ;

	var my_set = ''
		+       '  customer_id=  ' + my_customer_id
		+        ', product_id=  ' + my_product_id
		+            ', ftp_id=  ' + my_ftp_id
		+        ', machine_id=  ' + my_machine_id
		+        ', partner_id=  ' + my_partner_id
		+          ', color_id=  ' + my_color_id
		+        ', ordered_at=  ' + JKY.inp_time ('jky-ordered-date'		)
		+         ', needed_at=  ' + JKY.inp_time ('jky-needed-date'		)
		+       ', produced_at=  ' + JKY.inp_time ('jky-produced-date'		)
		+    ', ordered_pieces=  ' + JKY.get_value('jky-ordered-pieces'		)
		+   ', checkout_pieces=  ' + JKY.get_value('jky-checkout-pieces'	)
		+   ', produced_pieces=  ' + JKY.get_value('jky-produced-pieces'	)
		+   ', rejected_pieces=  ' + JKY.get_value('jky-rejected-pieces'	)
		+    ', ordered_weight=  ' + JKY.get_value('jky-ordered-weight'		)
		+   ', checkout_weight=  ' + JKY.get_value('jky-checkout-weight'	)
		+   ', produced_weight=  ' + JKY.get_value('jky-produced-weight'	)
		+   ', returned_weight=  ' + JKY.get_value('jky-returned-weight'	)
		+      ', quoted_units=  ' + JKY.get_value('jky-quoted-units'		)
		+    ', labels_printed=  ' + JKY.get_value('jky-labels-printed'		)
		+      ', ftps_printed=  ' + JKY.get_value('jky-ftps-printed'		)
		+       ', ops_printed=  ' + JKY.get_value('jky-ops-printed'		)
		+          ', location=\'' + JKY.get_value('jky-location'			) + '\''
		;
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-print'  );
};

JKY.display_form = function() {
	JKY.show('jky-action-print'  );
	JKY.show('jky-action-copy'   );
};

JKY.process_validation = function() {
	var my_error = '';
	my_error += JKY.Validation.is_required('jky-customer-id', 'Customer');
	my_error += JKY.Validation.is_required('jky-product-id'	, 'Product'	);
//	my_error += JKY.Validation.is_required('jky-ftp-id'		, 'FTP'		);
	return my_error;
};

JKY.process_copy = function(the_id, the_row) {
	var my_set	= ''
		+   '  checkout_pieces=  0'
		+   ', produced_pieces=  0'
		+   ', rejected_pieces=  0'
		+   ', checkout_weight=  0'
		+   ', produced_weight=  0'
		+   ', returned_weight=  0'
		+    ', labels_printed=  0'
		+      ', ftps_printed=  0'
		+       ', ops_printed=  0'
				;
	var my_data =
		{ method	: 'update'
		, table		: 'Orders'
		, set		: my_set
		, where		: 'id = ' + the_id
		};
	JKY.ajax(true, my_data);
	JKY.copy_threads(the_row.id, the_id);
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'OrdThreads'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */
JKY.generate_checkout = function() {
	var my_ordered_weight = JKY.get_value_by_id('Orders', 'ordered_weight', JKY.row.id);
	if (my_ordered_weight <= 0) {
		JKY.display_message('Check Out cannot be generated');
		JKY.display_message('because there is not any Ordered Weight');
		return;
	}

	var my_rows = JKY.get_rows('OrdThreads', JKY.row.id);
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
		, table		: 'CheckOut'
		, id		:  JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Check Out row generated: ' + JKY.row.id);
	JKY.App.display_row();
};
