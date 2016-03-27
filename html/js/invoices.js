"use strict";
var JKY = JKY || {};
/**
 * sales.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Invoices'
		, table_name	: 'Sales'
		, specific		: ''
		, select		: JKY.sales.select
		, filter		: ''
		, sort_by		: 'sale_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-payments'
		, add_new		: 'display form'
		, class			: 'status'
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
//	$('#jky-needed-date			input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-sold-date			input').attr('data-format', JKY.Session.get_date	 ());
//	$('#jky-needed-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-sold-date'			).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-generate'	).click( function() {JKY.generate_checkout		();});
	$('#jky-action-invoice'		).click( function() {JKY.invoice_customer		();});
	$('#jky-action-receive'		).click( function() {JKY.receive_payments		();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-lines-add-new'		).click( function()	{JKY.insert_line			();});
	$('#jky-payments-save'		).click( function()	{JKY.save_payments			();});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-action-product'		).click (function() {JKY.Product.display(this);});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);

	JKY.set_side_active('jky-accounts-invoices');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-customer'		, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-salesman'		, '../JKY.Search.Salesman.html'	);
	JKY.append_file('jky-load-contact'		, '../JKY.Search.Contact.html'	);
	JKY.append_file('jky-load-transport'	, '../JKY.Search.Transport.html');
	JKY.append_file('jky-load-machine'		, '../JKY.Search.Machine.html'	);
	JKY.append_file('jky-load-dyer'			, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-product'		, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'	);
	JKY.append_file('jky-load-product-type'	, '../JKY.Search.ProdType.html'	);

	JKY.set_html('jky-app-select', JKY.set_options(JKY.sales.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Paid', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');

	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer	.load_data);
	$('#jky-salesman-filter'	).KeyUpDelay(JKY.Salesman	.load_data);
	$('#jky-contact-filter'		).KeyUpDelay(JKY.Contact	.load_data);
	$('#jky-transport-filter'	).KeyUpDelay(JKY.Transport	.load_data);
	$('#jky-machine-filter'		).KeyUpDelay(JKY.Machine	.load_data);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer		.load_data);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color		.load_data);
	$('#jky-prod-type-filter'	).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-customer-name'		).change(function() {JKY.update_customer_info		();});
	$('#jky-sold-amount'		).change(function() {JKY.update_sold_total			();});
	$('#jky-checkout-amount'	).change(function() {JKY.update_checkout_total		();});
	$('#jky-checkout-advanced'	).change(function() {JKY.update_checkout_advanced	();});
	$('#jky-interest-rate'		).change(function() {JKY.update_adjust_amount		();});

	$('#jky-checkout-advanced'	).ForceNumericOnly();
	$('#jky-interest-rate'		).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.sale_number		+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.po_number		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
//		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name	)	+ '</td>'
//		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.dyer_name		)	+ '</td>'
		+  '<td class="jky-td-amount"	>' +				 the_row.sold_amount		+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.needed_date	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.sold_date		)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.hold_date		)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.sent_date		)	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.sold_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.checkout_pieces	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.sold_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight	+ '</td>'
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
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_delete_button();
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status === 'Active') {
		JKY.enable_button ('jky-action-receive' );
	}else{
		JKY.disable_button('jky-action-receive' );
	}
	if (the_row.status === 'Draft' || the_row.status === 'Active' || the_row.status === 'Paid') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}
	if (the_row.invoice_date === null) {
		JKY.enable_button ('jky-action-invoice' );
	}else{
		JKY.disable_button('jky-action-invoice' );
	}

	JKY.is_enabled = (JKY.is_status('Draft') && the_row.invoice_date === null) ? true : false; 
	if (JKY.is_enabled) {
		JKY.enable_button ('jky-lines-add-new');
	}else{
		JKY.disable_button('jky-lines-add-new');
	}

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-sale-number'		,				 the_row.sale_number		);
	JKY.set_value	('jky-po-number'		,				 the_row.po_number			);
	JKY.set_value	('jky-quotation-number'	,				 the_row.quotation_number	);
//	JKY.set_date	('jky-needed-date'		, JKY.out_date	(the_row.needed_date		));
	JKY.set_date	('jky-sold-date'		, JKY.out_date	(the_row.sold_date			));
//	JKY.set_date	('jky-hold-date'		, JKY.out_date	(the_row.hold_date			));
//	JKY.set_date	('jky-sent-date'		, JKY.out_date	(the_row.sent_date			));
	JKY.set_value	('jky-salesman-id'		,				 the_row.salesman_id		);
	JKY.set_value	('jky-salesman-name'	,				 the_row.salesman_name 		);
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name 		);
	JKY.set_value	('jky-contact-id'		,				 the_row.contact_id			);
	JKY.set_value	('jky-contact-name'		,				 the_row.contact_name + ' : ' +	the_row.contact_mobile);
	JKY.set_value	('jky-transport-id'		,				 the_row.transport_id		);
	JKY.set_value	('jky-transport-name'	,				 the_row.transport_name 	);
	JKY.set_value	('jky-payments'			,				 the_row.payments			);

//	JKY.set_radio	('jky-is-taxable'		,				 the_row.is_taxable			);
//	JKY.set_radio	('jky-icms-exemption'	,				 the_row.icms_exemption		);
	JKY.set_radio	('jky-deduct-cone'		,				 the_row.deduct_cone		);

	var my_sold_total
		= parseFloat(the_row.sold_amount	)
		- parseFloat(the_row.sold_discount	)
		- parseFloat(the_row.advanced_amount)
		;
	var my_checkout_total
		= parseFloat(the_row.checkout_amount	)
		- parseFloat(the_row.checkout_discount	)
		- parseFloat(the_row.advanced_amount	)
		;
	JKY.set_value	('jky-interest-rate'	,				 the_row.interest_rate		);
	JKY.set_value	('jky-sold-amount'		,				 the_row.sold_amount		);
	JKY.set_value	('jky-sold-discount'	,				 the_row.sold_discount		);
	JKY.set_value	('jky-sold-advanced'	,				 the_row.advanced_amount	);
	JKY.set_value	('jky-sold-total'		,				 my_sold_total.toFixed(2)	);
	JKY.set_value	('jky-sold-weight'		,				 the_row.sold_weight		);
	JKY.set_value	('jky-sold-pieces'		,				 the_row.sold_pieces		);

	JKY.set_value	('jky-adjust-amount'	,				 the_row.adjust_amount		);
	JKY.set_value	('jky-checkout-amount'	,				 the_row.checkout_amount	);
	JKY.set_value	('jky-checkout-discount',				 the_row.checkout_discount	);
	JKY.set_value	('jky-checkout-advanced',				 the_row.advanced_amount	);
	JKY.set_value	('jky-checkout-total'	,				 my_checkout_total.toFixed(2));
	JKY.set_value	('jky-checkout-weight'	,				 the_row.checkout_weight	);
	JKY.set_value	('jky-checkout-pieces'	,				 the_row.checkout_pieces	);

	if (parseFloat(the_row.checkout_pieces) < parseFloat(the_row.sold_pieces)) {
		$('#jky-checkout-pieces').addClass('jky-error');
	}else{
		$('#jky-checkout-pieces').removeClass('jky-error');
	};
	if (parseFloat(the_row.checkout_weight) < parseFloat(the_row.sold_weight)) {
		$('#jky-checkout-weight').addClass('jky-error');
	}else{
		$('#jky-checkout-weight').removeClass('jky-error');
	};

	JKY.set_value	('jky-remarks'			, JKY.decode	(the_row.remarks			));
	JKY.display_lines();
	JKY.display_fabrics(the_row);

	var my_body = $('#jky-lines-body');
	my_body.find('.jky-sold-pieces'	).ForceIntegerOnly();
	my_body.find('.jky-sold-weight'	).ForceNumericOnly();
	my_body.find('.jky-sold-price'	).ForceNumericOnly();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-invoice' );
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-sale-number'		, JKY.t('New'));
	JKY.set_value	('jky-po-number'		, '');
	JKY.set_value	('jky-quotation-number'	, '');
//	JKY.set_date	('jky-needed-date'		, JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-sold-date'		, JKY.out_date(JKY.get_date()));
//	JKY.set_date	('jky-hold-date'		, '');
//	JKY.set_date	('jky-sent-date'		, '');
	JKY.set_value	('jky-customer-id'		, null);
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-salesman-id'		, JKY.Session.get_value('contact_id'));
	JKY.set_value	('jky-salesman-name'	, JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-contact-id'		, null);
	JKY.set_value	('jky-contact-name'		, '');
	JKY.set_value	('jky-transport-id'		, null);
	JKY.set_value	('jky-transport-name'	, '');
	JKY.set_value	('jky-payments'			, '');

	JKY.set_radio	('jky-is-taxable'		, 'Yes');
	JKY.set_radio	('jky-icms-exemption'	, 'No' );
	JKY.set_radio	('jky-deduct-cone'		, 'Yes');
	JKY.set_value	('jky-interest-rate'	, 0 );

	JKY.set_value	('jky-sold-amount'		, 0 );
	JKY.set_value	('jky-adjust-amount'	, 0 );
	JKY.set_value	('jky-sold-discount'	, 0 );
	JKY.set_value	('jky-checkout-advanced', 0 );
//	JKY.set_value	('jky-sub-amount'		, 0 );
	JKY.set_value	('jky-paid-amount'		, 0 );

	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	set replace
 */
JKY.set_replace = function() {
	JKY.disable_button('jky-action-invoice' );
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.show_parent ('jky-status');
	JKY.set_html	('jky-status', JKY.set_options('', '', 'Draft', 'Active', 'Paid', 'Closed'));
	JKY.set_value	('jky-sale-number'		, '');
	JKY.set_value	('jky-po-number'		, '');
	JKY.set_value	('jky-quotation-number'	, '');
//	JKY.set_date	('jky-needed-date'		, '');
	JKY.set_date	('jky-sold-date'		, '');
//	JKY.set_date	('jky-hold-date'		, '');
//	JKY.set_date	('jky-sent-date'		, '');
	JKY.set_value	('jky-customer-id'		, null);
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-salesman-id'		, null);
	JKY.set_value	('jky-salesman-name'	, '');
	JKY.set_value	('jky-contact-id'		, null);
	JKY.set_value	('jky-contact-name'		, '');
	JKY.set_value	('jky-transport-id'		, null);
	JKY.set_value	('jky-transport-name'	, '');
	JKY.set_value	('jky-payments'			, '');

	JKY.set_radio	('jky-is-taxable'		, '');
	JKY.set_radio	('jky-icms-exemption'	, '');
	JKY.set_radio	('jky-deduct-cone'		, '');
	JKY.set_value	('jky-interest-rate'	, '');

	JKY.set_value	('jky-sold-amount'		, '');
	JKY.set_value	('jky-adjust-amount'	, '');
	JKY.set_value	('jky-sold-discount'	, '');
	JKY.set_value	('jky-checkout-advanced', '');
//	JKY.set_value	('jky-sub-amount'		, '');
	JKY.set_value	('jky-paid-amount'		, '');

	JKY.hide('jky-form-tabs');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_salesman_id	= JKY.get_value('jky-salesman-id'	);
	var my_contact_id	= JKY.get_value('jky-contact-id'	);
	var my_transport_id	= JKY.get_value('jky-transport-id'	);
	var my_interest_rate= JKY.get_value('jky-interest-rate'	);
		my_customer_id	= (my_customer_id	=== '') ? 'null' : my_customer_id	;
		my_salesman_id	= (my_salesman_id	=== '') ? 'null' : my_salesman_id	;
		my_contact_id	= (my_contact_id	=== '') ? 'null' : my_contact_id	;
		my_transport_id	= (my_transport_id	=== '') ? 'null' : my_transport_id	;
		my_interest_rate= (my_interest_rate	=== '') ? '0'    : my_interest_rate	;
	var my_set = ''
		+         'customer_id= '	+ my_customer_id
		+       ', salesman_id= '	+ my_salesman_id
		+        ', contact_id= '	+ my_contact_id
		+      ', transport_id= '	+ my_transport_id
		+         ', po_number=\''	+ JKY.get_value  ('jky-po-number'		) + '\''
//		+       ', needed_date= '	+ JKY.inp_date   ('jky-needed-date'		)
		+         ', sold_date= '	+ JKY.inp_date   ('jky-sold-date'		)
//		+         ', hold_date= '	+ JKY.inp_date   ('jky-hold-date'		)
//		+         ', sent_date= '	+ JKY.inp_date   ('jky-sent-date'		)
		+          ', payments=\''	+ JKY.get_value  ('jky-payments'		) + '\''
//		+        ', is_taxable=\''	+ JKY.get_checked('jky-is-taxable'		) + '\''
//		+    ', icms_exemption=\''	+ JKY.get_checked('jky-icms-exemption'	) + '\''
		+       ', deduct_cone=\''	+ JKY.get_checked('jky-deduct-cone'		) + '\''
		+     ', interest_rate= '	+ my_interest_rate
		+   ', advanced_amount= '	+ JKY.get_value  ('jky-checkout-advanced')
		;
	return my_set;
};

/**
 *	get replace set
 */
JKY.get_replace_set = function() {
	var my_set = '';
	if (!JKY.is_empty(JKY.get_value('jky-status'			)))	{my_set +=            ', status=\''	+ JKY.get_value('jky-status'			) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-po-number'			)))	{my_set +=         ', po_number=\''	+ JKY.get_value('jky-po-number'			) + '\'';}
//	if (!JKY.is_empty(JKY.inp_date ('jky-needed-date'		)))	{my_set +=       ', needed_date=  ' + JKY.inp_date ('jky-needed-date'		);}
	if (!JKY.is_empty(JKY.get_value('jky-payments'			)))	{my_set +=          ', payments=\''	+ JKY.get_value('jky-payments'			) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-interest-rate'		)))	{my_set +=     ', interest_rate=  '	+ JKY.get_value('jky-interest-rate'		);}
//	if (!JKY.is_empty(JKY.get_value('jky-advanced-amount'	)))	{my_set +=   ', advanced_amount=  '	+ JKY.get_value('jky-checkout-advanced'	);}
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-print'  );
	if (JKY.Session.get_value('user_role') == 'Admin'
	||  JKY.Session.get_value('user_role') == 'Support') {
		JKY.show('jky-action-replace');
	}
};

JKY.display_form = function() {
	JKY.show('jky-action-print'  );
//	JKY.show('jky-action-copy'   );
	JKY.hide('jky-action-delete' );
};

JKY.zero_value = function(the_id, the_name) {
	JKY.App.process_change_input(the_id);
	$('#' + the_name).val('0');
};

JKY.process_start = function(the_id) {
	JKY.App.process_add_new();
	JKY.set_value('jky-customer-id', the_id);
	JKY.update_customer_info();
};

JKY.process_update = function(the_id, the_row) {
	$('#jky-lines-body').find('.jky-sold-price').change();
}

JKY.process_copy = function(the_id, the_row) {
	var my_set	= '  sold_date =\'' + JKY.get_now() + '\''
				+ ', sold_pieces = ' + the_row.sold_pieces
				;
	var my_data =
		{ method: 'update'
		, table	: 'Sales'
		, set	: my_set
		, where	: 'id = ' + the_id
		};
	JKY.ajax(true, my_data);
	JKY.copy_lines(the_row.id, the_id);
};

JKY.process_delete = function(the_id, the_row) {
	var my_data = '';
	var my_rows = JKY.get_rows('QuotLines', the_id);

	for(var i in my_rows) {
		my_data =
			{ method: 'delete_many'
			, table : 'QuotColors'
			, where : 'parent_id = ' + my_rows[i].id
			};
		JKY.ajax(true, my_data);
	}

	my_data =
		{ method: 'delete_many'
		, table : 'QuotLines'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */
JKY.generate_checkout = function() {
	var my_error = '';

	var my_customer_id = JKY.get_value('jky-customer-id');
	if(!my_customer_id)			{my_error += '<br>' + JKY.t('because there is not Customer selected');}

//	var my_transport_id = JKY.get_value('jky-transport-id');
//	if(!my_transport_id)		{my_error += '<br>' + JKY.t('because there is not Transport selected');}

	var my_sold_amount = JKY.get_value_by_id('Sales', 'sold_amount', JKY.row.id);
	if (my_sold_amount == 0)	{my_error += '<br>' + JKY.t('because there is not Sold Amount defined');}

	if (my_error != '') {
		JKY.display_message(JKY.t('Sale Out cannot be generated'));
		JKY.display_message(my_error);
		return;
	}
/*
	var my_rows = JKY.get_rows('SaleLines', JKY.row.id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		if (my_row.batchin_id == null) {
			JKY.display_message('Sale Out cannot be generated');
			JKY.display_message('because there is unselected Thread Batch');
			return;
		}
	}
*/
	var my_data =
		{ method: 'generate'
		, table	: 'SaleOuts'
		, id	:  JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Sale Out row generated: ' + JKY.row.id);
	JKY.App.display_row();
};

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'Sales'
		, set	:  my_set
		, where : 'Sales.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Remarks saved, ' + the_response.message);
		JKY.row = JKY.get_row('Sales', JKY.row.id);
	});
};

JKY.get_main_contact = function(the_id) {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Contacts'
		, specific		: 'company'
		, specific_id	: the_id
		, select		: 'Active'
		, display		: 1
		, order_by		: 'Contacts.nick_name'
		};
	var my_row = [];
		my_row.id = null;
		my_row.full_name = '';
	JKY.ajax(false, my_data, function(the_response) {
		if (the_response.rows !== '') {
			my_row = the_response.rows[0];
		};
	});
	return my_row;
};

JKY.update_customer_info = function() {
	var my_id  = JKY.get_value('jky-customer-id');
	var my_row = JKY.get_row('Contacts' , my_id );
	JKY.set_value('jky-customer-name'	, my_row.nick_name		);
	JKY.set_value('jky-payments'		, my_row.payments		);
	JKY.set_radio('jky-is-taxable'		, my_row.is_taxable		);
	JKY.set_radio('jky-icms-exemption'	, my_row.icms_exemption	);
	JKY.set_radio('jky-deduct-cone'		, my_row.deduct_cone	);
	JKY.set_value('jky-interest-rate'	, my_row.interest_rate	);
	var my_contact = JKY.get_main_contact(my_id);
	if (my_contact) {
		JKY.set_value('jky-contact-id'		, my_contact.id			);
		JKY.set_value('jky-contact-name'	, my_contact.nick_name	);
	}
	var my_transport = JKY.get_row('Contacts', my_row.transport_id);
	if (my_transport) {
		JKY.set_value('jky-transport-id'	, my_transport.id		);
		JKY.set_value('jky-transport-name'	, my_transport.nick_name);
	}
};

JKY.update_sold_total = function() {
	var my_sold_amount		= parseFloat($('#jky-sold-amount'		).val());
	var my_sold_discount	= parseFloat($('#jky-sold-discount'		).val());
	var my_sold_advanced	= parseFloat($('#jky-sold-advanced'		).val());
	var my_sold_total		= my_sold_amount - my_sold_discount - my_sold_advanced;
	JKY.set_value('jky-sold-total', my_sold_total.toFixed(2));
};

JKY.update_checkout_total = function() {
	var my_checkout_amount	= parseFloat($('#jky-checkout-amount'	).val());
	var my_checkout_discount= parseFloat($('#jky-checkout-discount'	).val());
	var my_checkout_advanced= parseFloat($('#jky-checkout-advanced'	).val());
	var my_checkout_total	= my_checkout_amount - my_checkout_discount - my_checkout_advanced;
	JKY.set_value('jky-checkout-total', my_checkout_total.toFixed(2));
	JKY.update_adjust_amount();
};

JKY.update_checkout_advanced = function() {
//	if (JKY.is_empty($('#jky-checkout-advanced').val()))		{JKY.set_value('jky-checkout-advanced', 0);}
	var my_checkout_advanced= parseFloat($('#jky-checkout-advanced'	).val());
	JKY.set_value('jky-sold-advanced'    , my_checkout_advanced.toFixed(2));
	JKY.set_value('jky-checkout-advanced', my_checkout_advanced.toFixed(2));
	JKY.update_sold_total();
	JKY.update_checkout_total();
};

JKY.update_adjust_amount = function() {
	var my_interest_rate	= parseFloat($('#jky-interest-rate'	).val());
	var my_checkout_total	= parseFloat($('#jky-checkout-total').val());
	var my_adjust_amount	= my_checkout_total * (my_interest_rate / 100);
	JKY.set_value('jky-adjust-amount', my_adjust_amount.toFixed(2));
	var my_set	= ''
		+   'interest_rate = ' + JKY.get_value('jky-interest-rate')
		+ ', adjust_amount = ' + JKY.get_value('jky-adjust-amount')
		;
	var my_data =
		{ method: 'update'
		, table : 'Sales'
		, set	:  my_set
		, where : 'Sales.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data);
}

/**
 * re-calculate amounts
 */
JKY.Xupdate_sale_amount = function() {
	var my_sold_amount		= 0;
	var my_sold_discount	= 0;
//	var my_line_peso		= 0;
	var my_line_pieces		= 0;
	var my_line_discount	= '';
	var my_color_pieces		= 0;
	var my_color_weight		= 0;
	var my_color_price		= 0;
	var my_color_discount	= '';
	var my_color_amount		= 0;
	$('#jky-lines-body tr').each(function() {
		var my_sale_line_id = $(this).attr('sale_line_id');
		if (my_sale_line_id) {
//			my_line_peso		= parseFloat($(this).find('.jky-product-peso'	).val());
//			my_line_pieces		= parseInt	($(this).find('.jky-product-pieces'	).val());
			my_line_discount	=			 $(this).find('.jky-discount'		).val()	;
//			if (my_line_pieces === 0)		{my_line_peso = 1;}
		}else{
			my_color_pieces		= parseFloat($(this).find('.jky-sold-pieces'	).val());
//			my_color_weight		= parseFloat($(this).find('.jky-sold-weight'	).val());
			my_color_price		= parseFloat($(this).find('.jky-sold-price'		).val());
			my_color_discount	=			 $(this).find('.jky-discount'		).val() ;

//			my_color_amount		=  my_line_peso * my_color_pieces * my_color_price;
			my_color_amount		=  my_color_pieces * my_color_price;
			my_sold_amount	+= my_color_amount;

			if (my_color_discount === '')		{my_color_discount = my_line_discount;}
			my_color_discount = my_color_discount.trim();
			var my_length = my_color_discount.length;
			if (my_color_discount.substr(my_length-1, 1) === '%') {
				my_color_discount = parseFloat(my_color_discount);
				if (!isNaN(my_color_discount)) {
					my_sold_discount += my_color_amount * my_color_discount / 100;
				}
			}else{
				my_color_discount = parseFloat(my_color_discount);
				if (!isNaN(my_color_discount)) {
//					my_sold_discount += my_line_peso * my_color_pieces * my_color_discount;
					my_sold_discount += my_color_pieces * my_color_discount;
				}
			}
		}
	});
	var my_advanced_amount	= parseFloat($('#jky-checkout-advanced').val());
//	var my_sub_amount		= my_sold_amount - my_sold_discount - my_advanced_amount;
	JKY.set_value('jky-sold-amount'		, my_sold_amount	.toFixed(2));
	JKY.set_value('jky-sold-discount'	, my_sold_discount	.toFixed(2));
//	JKY.set_value('jky-sub-amount'		, my_sub_amount		.toFixed(2));

	var my_set	=       'sold_amount = ' + my_sold_amount
				+ ', sold_discount = ' + my_sold_discount
				;
	var my_data =
		{ method: 'update'
		, table : 'Sales'
		, set	:  my_set
		, where : 'Sales.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */
JKY.invoice_customer = function() {
	var my_error = '';

	var my_customer_id = JKY.get_value('jky-customer-id');
	if(!my_customer_id)				{my_error += '<br>' + JKY.t('because there is not Customer selected');}

	var my_transport_id = JKY.get_value('jky-transport-id');
	if(!my_transport_id)			{my_error += '<br>' + JKY.t('because there is not Transport selected');}

	var my_checkout_amount = JKY.get_value_by_id('Sales', 'checkout_amount', JKY.row.id);
	if (my_checkout_amount == 0)	{my_error += '<br>' + JKY.t('because there is not Checkout Amount defined');}

	if (my_error != '') {
		JKY.display_message(JKY.t('Invoice cannot be generated'));
		JKY.display_message(my_error);
		return;
	}

	var my_data =
		{ method: 'invoice'
		, table	: 'Customers'
		, id	:  JKY.row.id
		}
	JKY.ajax(false, my_data);

	JKY.row.invoice_date = JKY.get_now();
	var my_data =
		{ method: 'update'
		, table	: 'Sales'
		, set	: 'invoice_date =\'' + JKY.row.invoice_date + '\''
		, where	: 'Sales.id = ' + JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

/* -------------------------------------------------------------------------- */
JKY.receive_payments = function() {
	var my_error = '';

	var my_customer_id = JKY.get_value('jky-customer-id');
	if(!my_customer_id)			{my_error += '<br>' + JKY.t('because there is not Customer selected');}

	var my_checkout_total = JKY.get_value('jky-checkout-total');
	if (my_checkout_total == 0)	{my_error += '<br>' + JKY.t('because there is not Total Amount defined');}

	if (my_error != '') {
		JKY.display_message(JKY.t('Payments cannot be received'));
		JKY.display_message(my_error);
		return;
	}

	var my_adjust_amount = JKY.get_value('jky-adjust-amount');
	var my_payments		 = JKY.get_value('jky-payments'		);
	JKY.Payments.display(my_checkout_total, my_adjust_amount, my_payments);
};

/* -------------------------------------------------------------------------- */
JKY.save_payments = function() {
	var my_payments = JKY.Payments.get_payments();
	if (my_payments.length == 0)	{return;}

	var my_set = ''
		+       ' customer_id =  ' + JKY.row.customer_id  
		+          ', sale_id =  ' + JKY.row.id
		+ ', transaction_date =\'' + JKY.get_now() + '\''
		;
	var my_data =
		{ method: 'insert'
		, table	: 'Receivables'
		, set	: my_set + ', transaction_type =\'Sale\', debit_amount = ' + JKY.row.checkout_amount
		}
	JKY.ajax(false, my_data);

	if (JKY.row.checkout_discount > 0) {
		my_data =
			{ method: 'insert'
			, table	: 'Receivables'
			, set	:  my_set + ', transaction_type =\'Discount\', debit_amount = -' + JKY.row.checkout_discount
			}
		JKY.ajax(false, my_data);
	}

	if (JKY.row.advanced_amount > 0) {
		my_data =
			{ method: 'insert'
			, table	: 'Receivables'
			, set	:  my_set + ', transaction_type =\'Advanced\', credit_amount = ' + JKY.row.advanced_amount
			}
		JKY.ajax(false, my_data);
	}

	if (JKY.row.adjust_amount > 0) {
		my_data =
			{ method: 'insert'
			, table	: 'Receivables'
			, set	:  my_set + ', transaction_type =\'Interest\', debit_amount = ' + JKY.row.adjust_amount
			}
		JKY.ajax(false, my_data);
	}

	my_payments.forEach(function(my_payment) {
		var my_status = my_payment.document === '' ? 'Active' : 'Closed';
		var my_set = ''
			+			'  status =\'' + my_status + '\''
			+      ', customer_id =  ' + JKY.row.customer_id  
			+          ', sale_id =  ' + JKY.row.id
			+ ', transaction_date =  ' + my_payment.date
			+ ', transaction_type =\'' + 'Payment' + '\''
			+    ', credit_amount =  ' + my_payment.amount
			+         ', document =\'' + my_payment.document + '\''
			;
		var my_data =
			{ method: 'insert'
			, table	: 'Receivables'
			, set	:  my_set
			}
		JKY.ajax(false, my_data);
	})

	var my_paid_amount = my_payments.reduce(function(my_acumulator, my_payment) {
		return my_acumulator + parseFloat(my_payment.amount); 
	}, 0);

	my_set = ''
		+       ' status =\'' + 'Paid' + '\''
		+ ', paid_amount =  ' + my_paid_amount
		;
	my_data =
		{ method: 'update'
		, table	: 'Sales'
		, set	:  my_set
		, where	: 'id = ' + JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

/* -------------------------------------------------------------------------- */
JKY.close_sale = function() {
	var my_error = '';

	var my_customer_id = JKY.get_value('jky-customer-id');
	if(!my_customer_id)			{my_error += '<br>' + JKY.t('because there is not Customer selected');}

	var my_transport_id = JKY.get_value('jky-transport-id');
	if(!my_transport_id)		{my_error += '<br>' + JKY.t('because there is not Transport selected');}

	var my_sold_amount = JKY.get_value_by_id('Sales', 'sold_amount', JKY.row.id);
	if (my_sold_amount == 0)	{my_error += '<br>' + JKY.t('because there is not Sold Amount defined');}

	if (my_error != '') {
		JKY.display_message(JKY.t('Invoice cannot be generated'));
		JKY.display_message(my_error);
		return;
	}

	var my_data =
		{ method: 'invoice'
		, table	: 'Customers'
		, id	:  JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Invoice row generated: ' + JKY.row.id);
	JKY.App.display_row();
}

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
		+ "<table class='jky-print-box'>"
		+ "<tr>"
//		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:250px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(my_row.sold_date) + "</td>"
		+ "</tr>"
		+ "</table>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>     Sale Number</span>:</td><td id='jky-print-sale-number'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>         Contact</span>:</td><td id='jky-print-contact-name'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>       Transport</span>:</td><td id='jky-print-transport-name'	class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "<td width=40%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>  Quoted Amount</span>:</td><td id='jky-print-sold-amount'		class='jky-print-amount'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Discount Amount</span>:</td><td id='jky-print-sold-discount'		class='jky-print-amount'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Advanced Amount</span>:</td><td id='jky-print-advanced-amount'	class='jky-print-amount'></td></tr>"
//		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>     Sub Amount</span>:</td><td id='jky-print-sub-amount'		class='jky-print-amount'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"

		+ "<br>"

		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"

		+ "</table>"
		+ "</div>"
		+ "<br>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	'<td								><span> Product				</span></td>'
		+	'<td								><span>   Extra				</span></td>'
		+	'<td								><span>   Color				</span></td>'
		+	'<td class="jky-print-pieces"		><span>    Peso<br>Kg/Piece	</span></td>'
		+	'<td class="jky-print-pieces"		><span>  Quoted<br>Units	</span></td>'
		+	'<td class="jky-print-pieces"		><span>  Quoted<br>Pieces	</span></td>'
		+	'<td class="jky-print-pieces"		><span>Discount<br>$ or %	</span></td>'
		+ "<tr><thead>"
		+ "<tbody id='jky-print-lines-body'></table>"
		+ "</table>"
		+ "<br>"

		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<div class='jky-print-label'><span>Remarks</span>:</div>"
		+ "<div id='jky-print-remarks'></div>"
		+ "</div>"
		;
	var my_remarks = JKY.get_config_value('Remarks', 'Sale');

	JKY.set_html('jky-printable', my_html);

	JKY.set_html('jky-print-sale-number'		, my_row.sale_number);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name);
	JKY.set_html('jky-print-contact-name'		, JKY.fix_null(my_row.contact_name) + ' : ' + JKY.fix_null(my_row.contact_mobile));
	JKY.set_html('jky-print-transport-name'		, my_row.transport_name);

//	var my_sub_amount = (my_row.sold_amount - my_row.sold_discount - my_row.advanced_amount).toFixed(2);

	JKY.set_html('jky-print-sold-amount'		, my_row.sold_amount	);
	JKY.set_html('jky-print-sold-discount'		, my_row.sold_discount	);
	JKY.set_html('jky-print-advanced-amount'	, my_row.advanced_amount);
//	JKY.set_html('jky-print-sub-amount'			, my_sub_amount);

	JKY.set_html('jky-print-lines-body'			, JKY.print_lines(the_id));

	JKY.set_html('jky-print-remarks'			, JKY.nl2br(my_remarks));
	JKY.t_tag	('jky-printable', 'span');

//	JKY.show('jky-printable');
	$("#jky-printable").print();
};
