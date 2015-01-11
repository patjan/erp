"use strict";

/**
 * quotations.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Quotations'
		, table_name	: 'Quotations'
		, specific		: ''
		, select		: JKY.sales.select
		, filter		: ''
		, sort_by		: 'quotation_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-payments'
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
	$('#jky-quoted-date		input').attr('data-format', JKY.Session.get_date_time());
//	$('#jky-produced-date	input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-delivered-date	input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-quoted-date'	).datetimepicker({language: JKY.Session.get_locale()});
//	$('#jky-produced-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-delivered-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-gen-sale'	).click( function() {JKY.generate_sale		();});
	$('#jky-action-generate'	).click( function() {JKY.generate_osa		();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-lines-add-new'		).click (function()	{JKY.insert_line		();});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-action-product'		).click (function() {JKY.Product.display(this);});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-customer'		, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-contact'		, '../JKY.Search.Contact.html'	);
	JKY.append_file('jky-load-machine'		, '../JKY.Search.Machine.html'	);
	JKY.append_file('jky-load-dyer'			, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-product'		, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'	);
	JKY.append_file('jky-load-product-type'	, '../JKY.Search.ProdType.html'	);

	JKY.set_side_active('jky-sales-quotations');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.sales.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.show	('jky-action-print');

	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer	.load_data);
	$('#jky-contact-filter'		).KeyUpDelay(JKY.Contact	.load_data);
	$('#jky-machine-filter'		).KeyUpDelay(JKY.Machine	.load_data);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer		.load_data);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color		.load_data);
	$('#jky-prod-type-filter'	).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-advanced-amount'	).change(function() {JKY.update_sub_amount();});

//	$('#jky-weight'	).ForceIntegerOnly();
//	$('#jky-width'	).ForceIntegerOnly();
//	$('#jky-peso'	).ForceNumericOnly();
	$('#jky-advanced-amount').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.quotation_number	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
//		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name	)	+ '</td>'
//		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.dyer_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.quoted_at		)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.produced_date	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.delivered_date	)	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.quoted_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.produced_pieces	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.delivered_pieces	+ '</td>'
		+  '</tr>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_delete_button();
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_delete_button();
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status				));
	JKY.set_value	('jky-quotation-number'	,				 the_row.quotation_number	);
	JKY.set_date	('jky-quoted-date'		, JKY.out_time	(the_row.quoted_at			));
//	JKY.set_date	('jky-produced-date'	, JKY.out_date	(the_row.produced_date		));
	JKY.set_date	('jky-delivered-date'	, JKY.out_date	(the_row.delivered_date		));
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name 		);
	JKY.set_value	('jky-contact-id'		,				 the_row.contact_id			);
	JKY.set_value	('jky-contact-name'		,				 the_row.contact_name + ' : ' +	the_row.contact_mobile);
//	JKY.set_value	('jky-machine-id'		,				 the_row.machine_id			);
//	JKY.set_value	('jky-machine-name'		,				 the_row.machine_name		);
//	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id			);
//	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name			);
//	JKY.set_value	('jky-diameter'			,				 the_row.diameter			);
//	JKY.set_value	('jky-weight-from'		,				 the_row.weight_from		);
//	JKY.set_value	('jky-weight-to'		,				 the_row.weight_to			);
//	JKY.set_value	('jky-width-from'		,				 the_row.width_from			);
//	JKY.set_value	('jky-width-to'			,				 the_row.width_to			);
//	JKY.set_value	('jky-peso'				,				 the_row.peso				);
//	JKY.set_value	('jky-product-type'		,				 the_row.product_type		);

	var my_sub_amount = (the_row.quoted_amount - the_row.discount_amount - the_row.advanced_amount).toFixed(2);
	JKY.set_value	('jky-quoted-amount'	,				 the_row.quoted_amount		);
	JKY.set_value	('jky-discount-amount'	,				 the_row.discount_amount	);
	JKY.set_value	('jky-advanced-amount'	,				 the_row.advanced_amount	);
	JKY.set_value	('jky-sub-amount'		,				 my_sub_amount				);
	JKY.set_value	('jky-payments'			,				 the_row.payments			);
	JKY.set_value	('jky-remarks'			,				 JKY.row.remarks			);
	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-quotation-number'	,  JKY.t('New'));
	JKY.set_date	('jky-quoted-date'		,  JKY.out_time(JKY.get_now()));
//	JKY.set_date	('jky-produced-date'	, '');
	JKY.set_date	('jky-delivered-date'	, '');
	JKY.set_value	('jky-customer-id'		,  null);
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-contact-id'		,  null);
	JKY.set_value	('jky-contact-name'		, '');
//	JKY.set_value	('jky-machine-id'		,  null);
//	JKY.set_value	('jky-machine-name'		, '');
//	JKY.set_value	('jky-dyer-id'			,  null);
//	JKY.set_value	('jky-dyer-name'		, '');
//	JKY.set_value	('jky-diameter'			,  0);
//	JKY.set_value	('jky-weight-from'		,  0);
//	JKY.set_value	('jky-weight-to'		,  0);
//	JKY.set_value	('jky-width-from'		,  0);
//	JKY.set_value	('jky-width-to'			,  0);
//	JKY.set_value	('jky-peso'				, 12.5);
//	JKY.set_value	('jky-product-type'		, '');

	JKY.set_value	('jky-quoted-amount'	,  0);
	JKY.set_value	('jky-discount-amount'	,  0);
	JKY.set_value	('jky-advanced-amount'	,  0);
	JKY.set_value	('jky-total-estimaed'	,  0);
	JKY.set_value	('jky-payments'			, '');
	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_contact_id	= JKY.get_value('jky-contact-id'	);
//	var my_machine_id	= JKY.get_value('jky-machine-id'	);
//	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
		my_customer_id	= (my_customer_id	== '') ? 'null' : my_customer_id;
		my_contact_id	= (my_contact_id	== '') ? 'null' : my_contact_id	;
//		my_machine_id	= (my_machine_id	== '') ? 'null' : my_machine_id	;
//		my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;

	var my_set = ''
		+     '  customer_id=  ' + my_customer_id
		+      ', contact_id=  ' + my_contact_id
//		+      ', machine_id=  ' + my_machine_id
//		+         ', dyer_id=  ' + my_dyer_id
		+       ', quoted_at=  ' + JKY.inp_time	('jky-quoted-date'		)
//		+   ', produced_date=  ' + JKY.inp_date	('jky-produced-date'	)
		+  ', delivered_date=  ' + JKY.inp_date	('jky-delivered-date'	)
//		+        ', diameter=  ' + JKY.get_value('jky-diameter'			)
//		+     ', weight_from=  ' + JKY.get_value('jky-weight-from'		)
//		+       ', weight_to=  ' + JKY.get_value('jky-weight-to'		)
//		+      ', width_from=  ' + JKY.get_value('jky-width-from'		)
//		+        ', width_to=  ' + JKY.get_value('jky-width-to'			)
//		+            ', peso=  ' + JKY.get_value('jky-peso'				)
//		+    ', product_type=\'' + JKY.get_value('jky-product-type'		) + '\''

		+   ', quoted_amount=  ' + JKY.get_value('jky-quoted-amount'	)
		+ ', discount_amount=  ' + JKY.get_value('jky-discount-amount'	)
		+ ', advanced_amount=  ' + JKY.get_value('jky-advanced-amount'	)
		+        ', payments=\'' + JKY.get_value('jky-payments'			) + '\''
		+         ', remarks=\'' + JKY.get_value('jky-remarks'			) + '\''
		;
	return my_set;
};

JKY.zero_value = function(the_id, the_name) {
	JKY.App.process_change_input(the_id);
	$('#' + the_name).val('0');
}

JKY.display_list = function() {
	JKY.show('jky-action-print');
};

JKY.display_form = function() {
	JKY.show('jky-action-print');
	JKY.show('jky-action-copy');
};

JKY.process_copy = function(the_id, the_row) {
	var my_set	= '  quoted_at =\'' + JKY.get_now() + '\''
				+ ', quoted_pieces = ' + the_row.quoted_pieces
				;
	var my_data =
		{ method	: 'update'
		, table		: 'Quotations'
		, set		: my_set
		, where		: 'id = ' + the_id
		};
	JKY.ajax(true, my_data);
	JKY.copy_lines(the_row.id, the_id);
}

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
JKY.generate_sale = function() {
	var my_error = '';
	var my_customer_id = JKY.get_value('jky-customer-id');
	if (!my_customer_id)		my_error += '<br>' + JKY.t('Customer') + ' ' + JKY.t('is required');
	var my_quoted_pieces = JKY.get_value_by_id('Quotations', 'quoted_pieces', JKY.row.id);
	if (my_quoted_pieces <= 0)	my_error += '<br>' + JKY.t('there is not any Quoted Piece');

	if (!JKY.is_empty(my_error)) {
		JKY.display_message(JKY.t('Sale cannot be generated, because'));
		JKY.display_message(my_error);
		return;
	}

	var my_data =
		{ method	: 'generate'
		, table		: 'Sale'
		, id		:  JKY.row.id
		}
	JKY.ajax(false, my_data, function(the_response) {
		JKY.display_message('Sale row generated: ' + JKY.row.id);
		JKY.App.display_row();
	})
};

/* -------------------------------------------------------------------------- */
JKY.generate_osa = function() {
	var my_error = '';
	var my_customer_id = JKY.get_value('jky-customer-id');
	if (!my_customer_id)		my_error += '<br>' + JKY.t('Customer') + ' ' + JKY.t('is required');
	var my_quoted_pieces = JKY.get_value_by_id('Quotations', 'quoted_pieces', JKY.row.id);
	if (my_quoted_pieces <= 0)	my_error += '<br>' + JKY.t('there is not any Quoted Piece');

	if (!JKY.is_empty(my_error)) {
		JKY.display_message(JKY.t('OSA cannot be generated, because'));
		JKY.display_message(my_error);
		return;
	}

	var my_data =
		{ method	: 'generate'
		, table		: 'OSA'
		, id		:  JKY.row.id
		}
	JKY.ajax(false, my_data, function(the_response) {
		JKY.display_message('OSA row generated: ' + JKY.row.id);
		JKY.App.display_row();
	})
};

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'Quotations'
		, set	:  my_set
		, where : 'Quotations.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Remarks saved, ' + the_response.message);
		JKY.row = JKY.get_row('Quotations', JKY.row.id);
	})
};

JKY.update_sub_amount = function() {
	if (JKY.is_empty($('#jky-advanced-amount').val()))		JKY.set_value('jky-advanced-amount', 0);
	var my_quoted_amount	= parseFloat($('#jky-quoted-amount'		).val());
	var my_discount_amount	= parseFloat($('#jky-discount-amount'	).val());
	var my_advanced_amount	= parseFloat($('#jky-advanced-amount'	).val());
	var my_sub_amount		= my_quoted_amount - my_discount_amount - my_advanced_amount;
	JKY.set_value('jky-sub-amount', my_sub_amount.toFixed(2));
}

/**
 * re-calculate amounts
 */
JKY.update_quotation_amount = function() {
	var my_quoted_amount	= 0;
	var my_discount_amount	= 0;
	var my_line_peso		= 0;
	var my_line_units		= 0;
	var my_line_discount	= '';
	var my_color_units		= 0;
	var my_color_price		= 0;
	var my_color_discount	= '';
	var my_color_amount		= 0;
	$('#jky-lines-body tr').each(function() {
		var my_quot_line_id = $(this).attr('quot_line_id');
		if (my_quot_line_id) {
			my_line_peso		= parseFloat($(this).find('.jky-product-peso'	).val());
			my_line_units		= parseInt	($(this).find('.jky-product-units'	).val());
			my_line_discount	=			 $(this).find('.jky-discount'		).val()	;
			if (my_line_units == 0)		my_line_peso = 1;
		}else{
			my_color_units		= parseFloat($(this).find('.jky-quoted-units'	).val());
			my_color_price		= parseFloat($(this).find('.jky-quoted-price'	).val());
			my_color_discount	=			 $(this).find('.jky-discount'		).val() ;

			my_color_amount		=  my_line_peso * my_color_units * my_color_price;
			my_quoted_amount	+= my_color_amount;

			if (my_color_discount == '')		my_color_discount = my_line_discount;
			my_color_discount = my_color_discount.trim();
			var my_length = my_color_discount.length;
			if (my_color_discount.substr(my_length-1, 1) == '%') {
				my_color_discount = parseFloat(my_color_discount);
				if (!isNaN(my_color_discount)) {
					my_discount_amount += my_color_amount * my_color_discount / 100;
				}
			}else{
				my_color_discount = parseFloat(my_color_discount);
				if (!isNaN(my_color_discount)) {
					my_discount_amount += my_line_peso * my_color_units * my_color_discount;
				}
			}
		}
	});
	var my_advanced_amount	= parseFloat($('#jky-advanced-amount').val());
	var my_sub_amount		= my_quoted_amount - my_discount_amount - my_advanced_amount;
	JKY.set_value('jky-quoted-amount'	, my_quoted_amount  .toFixed(2));
	JKY.set_value('jky-discount-amount'	, my_discount_amount.toFixed(2));
	JKY.set_value('jky-sub-amount'		, my_sub_amount		.toFixed(2));

	var my_set	=     'quoted_amount = ' + my_quoted_amount
				+ ', discount_amount = ' + my_discount_amount
				;
	var my_data =
		{ method: 'update'
		, table : 'Quotations'
		, set	:  my_set
		, where : 'Quotations.id = ' + JKY.row.id
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
//		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:250px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><spa	n>Date</span>: " + JKY.out_date(my_row.quoted_at) + "</td>"
		+ "</tr></table>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Quotation Number</span>:</td><td id='jky-print-quotation-number'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>         Contact</span>:</td><td id='jky-print-contact-name'		class='jky-form-value'></td></tr>"
//		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>			Machine</span>:</td><td id='jky-print-machine-name'		class='jky-form-value'></td></tr>"
//		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>			   Dyer</span>:</td><td id='jky-print-dyer-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "<td width=40%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>  Quoted Amount</span>:</td><td id='jky-print-quoted-amount'		class='jky-print-amount'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Discount Amount</span>:</td><td id='jky-print-discount-amount'	class='jky-print-amount'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Advanced Amount</span>:</td><td id='jky-print-advanced-amount'	class='jky-print-amount'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>     Sub Amount</span>:</td><td id='jky-print-sub-amount'		class='jky-print-amount'></td></tr>"
//		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>			  Dyer</span>:</td><td id='jky-print-dyer-name'			class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"
		+ "<br>"
/*
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>  Punho</span>:</td>"
		+	"<td id='jky-print-punho-percent'	class='jky-print-value'></td>"
		+	"<td id='jky-print-punho-units'		class='jky-print-value'></td>"
		+	"<td id='jky-print-punho-name'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>   Gola</span>:</td>"
		+	"<td id='jky-print-gola-percent'	class='jky-print-value'></td>"
		+	"<td id='jky-print-gola-units'		class='jky-print-value'></td>"
		+	"<td id='jky-print-gola-name'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>  Galao</span>:</td>"
		+	"<td id='jky-print-galao-percent'	class='jky-print-value'></td>"
		+	"<td id='jky-print-galao-units'		class='jky-print-value'></td>"
		+	"<td id='jky-print-galao-name'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"
*/
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
//		+ "<tr><td class='jky-print-label'><span>    Diameter</span>:</td><td id='jky-print-diameter'		class='jky-print-value'></td></tr>"
//		+ "<tr><td class='jky-print-label'><span>      Weight</span>:</td><td id='jky-print-weight'			class='jky-print-value'></td></tr>"
//		+ "<tr><td class='jky-print-label'><span>       Width</span>:</td><td id='jky-print-width'			class='jky-print-value'></td></tr>"
//		+ "<tr><td class='jky-print-label'><span>        Peso</span>:</td><td id='jky-print-peso'			class='jky-print-value'></td></tr>"
//		+ "<tr><td class='jky-print-label'><span>Product Type</span>:</td><td id='jky-print-product-type'	class='jky-print-value'></td></tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	'<td								><span> Product				</span></td>'
		+	'<td								><span>   Extra				</span></td>'
		+	'<td								><span>   Color				</span></td>'
		+	'<td class="jky-print-pieces"		><span>    Peso<br>Kg/peça	</span></td>'
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
	JKY.set_html('jky-printable', my_html);
	JKY.t_tag	('jky-printable', 'span');

	JKY.set_html('jky-print-quotation-number'	, my_row.quotation_number	);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name		);
	JKY.set_html('jky-print-contact-name'		, my_row.contact_name	+ ' : ' + my_row.contact_mobile	);
//	JKY.set_html('jky-print-machine-name'		, my_row.machine_name		);
//	JKY.set_html('jky-print-dyer-name'			, my_row.dyer_name			);

	var my_sub_amount = (my_row.quoted_amount - my_row.discount_amount - my_row.advanced_amount).toFixed(2);
	JKY.set_html('jky-print-quoted-amount'		, my_row.quoted_amount		);
	JKY.set_html('jky-print-discount-amount'	, my_row.discount_amount	);
	JKY.set_html('jky-print-advanced-amount'	, my_row.advanced_amount	);
	JKY.set_html('jky-print-sub-amount'			, my_sub_amount				);
/*
	JKY.set_html('jky-print-punho-percent'		, my_row.punho_percent		);
	JKY.set_html('jky-print-punho-units'		, my_row.punho_units		);
	JKY.set_html('jky-print-punho-name'			, my_row.punho_name			);
	JKY.set_html('jky-print-gola-percent'		, my_row.gola_percent		);
	JKY.set_html('jky-print-gola-units'			, my_row.gola_units			);
	JKY.set_html('jky-print-gola-name'			, my_row.gola_name			);
	JKY.set_html('jky-print-galao-percent'		, my_row.galao_percent		);
	JKY.set_html('jky-print-galao-units'		, my_row.galao_units		);
	JKY.set_html('jky-print-galao-name'			, my_row.galao_name			);
*/
//	JKY.set_html('jky-print-diameter'			, my_row.diameter		+ ' (pol)'	);
//	JKY.set_html('jky-print-weight'				, my_row.weight_from	+ ' - ' + my_row.weight_to	+ ' (gr)'	);
//	JKY.set_html('jky-print-width'				, my_row.width_from		+ ' - '	+ my_row.width_to	+ ' (cm)'	);
//	JKY.set_html('jky-print-peso'				, my_row.peso			+ ' (Kg/peça)'	);
//	JKY.set_html('jky-print-product-type'		, JKY.t(my_row.product_type));

	JKY.set_html('jky-print-lines-body'			, JKY.print_lines(the_id));

	var my_remarks = JKY.get_config_value('Remarks', 'Quotation');
	JKY.set_html('jky-print-remarks'			, JKY.nl2br(my_remarks));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
};
