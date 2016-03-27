"use strict";

/**
 * products.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Products'
		, table_name	: 'Products'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'product_name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, sort_false	: 1						//	thumb
		, focus			: 'jky-product-name'
		, add_new		: 'display form'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Products'
		, directory		: 'products'
		, field_name	: 'photo'
		, title			: 'Photo files'
		, extensions	: 'jpg,gif,png'
		, button_id		: 'jky-upload-photo'
		, filename_id	: 'jky-upload-name'
		, percent_id	: 'jky-upload-percent'
		, progress_id	: 'jky-upload-progress'
		, img_id		: 'jky-photo-img'
		, download_id	: 'jky-download-photo'
		});
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-start-date	input'	).attr('data-format', JKY.Session.get_date_time());
	$('#jky-start-date'			).datetimepicker({language:JKY.Session.get_locale()});

	$('#jky-product-name'		).change(function()	{if (JKY.row == null)	JKY.title_case(this);});

//	$('#jky-ftp-add-new'		).click (function() {JKY.insert_product	();});
	$('#jky-tab-prices'			).click (function() {JKY.display_prices	();});
	$('#jky-tab-finishings'		).click (function()	{JKY.Finishings.display(JKY.row.finishings	);});
	$('#jky-tab-washings'		).click (function()	{JKY.Washings  .display(JKY.row.washings	);});
	$('#jky-tab-ftps'			).click (function() {JKY.display_ftps	();});
	$('#jky-tab-targets'		).click (function() {JKY.display_targets();});
	$('#jky-tab-history'		).click (function() {JKY.History.display();});
	$('#jky-targets-add-new'	).click (function()	{JKY.insert_color	();});
	$('#jky-action-save-remarks').click (function()	{JKY.App.save_remarks	();});

	JKY.set_side_active('jky-sales-products');
	JKY.set_side_active('jky-planning-products');
	JKY.set_side_active('jky-production-products');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-color' , '../JKY.Search.Color.html' );
	JKY.append_file('jky-load-family', '../JKY.Search.Family.html');

	JKY.set_html('jky-product-type'		, JKY.set_radios_array('jky-product-type', JKY.get_configs('Product Types')));
	JKY.set_html('jky-app-select'		, JKY.set_configs('Product Types', JKY.App.get_prop('select'), 'All'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Type'));
	JKY.show('jky-app-select-line');
//	select the last option type as default
	$('#jky-app-select option:last-child').prop('selected', true);
	$('#jky-app-select').change();

	
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data);
	$('#jky-family-filter'		).KeyUpDelay(JKY.Family.load_data);
	$('#jky-family-add-new'		).click (function() {JKY.Family.add_new();});

	$('#jky-peso'		).ForceNumericOnly();
	$('#jky-units'		).ForceIntegerOnly();
	$('#jky-yield'		).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-thumb"	>' + JKY.fix_thumb	(the_row.photo, the_row.id, 'products') + '</td>'
		+  '<td class="jky-td-name-w"	>' +				 the_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null	(the_row.parent_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.product_type		+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.out_count	(the_row.finishings		)	+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.peso				+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.units				+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.start_at		)	+ '</td>'
		+  '<td class="jky-td-status"	>' +				 the_row.status				+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-product-name'		,				 the_row.product_name		);
	JKY.set_value	('jky-parent-id'		,				 the_row.parent_id			);
	JKY.set_value	('jky-product-base'		,				 the_row.parent_name		);
	JKY.set_value	('jky-family-id'		,				 the_row.family_id			);
	JKY.set_value	('jky-family-name'		,				 the_row.family_name		);
	JKY.set_radio	('jky-product-type'		,				 the_row.product_type		);
	JKY.set_date	('jky-start-date'		, JKY.out_time	(the_row.start_at			));
	JKY.set_value	('jky-peso'				,				 the_row.peso				);
	JKY.set_value	('jky-units'			,				 the_row.units				);
	JKY.set_value	('jky-yield'			,				 the_row.yield				);
	JKY.set_value	('jky-ncm'				,				 the_row.ncm				);
	JKY.set_value	('jky-weight-customer'	,				 the_row.weight_customer	);
	JKY.set_value	('jky-weight-dyer'		,				 the_row.weight_dyer		);
	JKY.set_value	('jky-width-customer'	,				 the_row.width_customer		);
	JKY.set_value	('jky-width-dyer'		,				 the_row.width_dyer			);
	JKY.set_value	('jky-remarks'			, JKY.decode	(the_row.remarks			));

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	if ($('#jky-tab-prices'		).hasClass('active'))	JKY.display_prices();
	if ($('#jky-tab-finishings'	).hasClass('active'))	JKY.Finishings	.display(the_row.finishings	);
	if ($('#jky-tab-washings'	).hasClass('active'))	JKY.Washings	.display(the_row.washings	);
	if ($('#jky-tab-ftps'		).hasClass('active'))	JKY.display_ftps();
	if ($('#jky-tab-targets'	).hasClass('active'))	JKY.display_targets();
	if ($('#jky-tab-history'	).hasClass('active'))	JKY.History		.display();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-product-name'		, '');
	JKY.set_value	('jky-parent-id'		, '');
	JKY.set_value	('jky-product-base'		, '');
	JKY.set_value	('jky-family-id'		, '');
	JKY.set_value	('jky-family-name'		, '');
	JKY.set_radio	('jky-product-type'		,  JKY.t('Tubular'));
	JKY.set_date	('jky-start-date'		,  JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-peso'				, '0');
	JKY.set_value	('jky-units'			, '1');
	JKY.set_value	('jky-yield'			, '0');
	JKY.set_value	('jky-ncm'				, '' );
	JKY.set_value	('jky-weight-customer'	, '');
	JKY.set_value	('jky-weight-dyer'		, '');
	JKY.set_value	('jky-width-customer'	, '');
	JKY.set_value	('jky-width-dyer'		, '');
	JKY.set_value	('jky-finishings'		, '');
	JKY.set_value	('jky-washings'			, '');
	JKY.set_value	('jky-remarks'			, '');
};


/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_parent_id = JKY.get_value('jky-parent-id');
//	to clean up Product Base, just select Product Base = Product Name
	if (JKY.row != null && my_parent_id == JKY.row.id)	my_parent_id = null;
	if (my_parent_id == '')								my_parent_id = null;
	var my_family_id = JKY.get_value('jky-family-id');
	if (my_family_id == '')								my_family_id = null;

	var my_set = ''
		+      'product_name=\'' + JKY.get_value	('jky-product-name'		) + '\''
		+       ', parent_id=  ' + my_parent_id
		+       ', family_id=  ' + my_family_id
		+    ', product_type=\'' + JKY.get_checked	('jky-product-type'		) + '\''
		+        ', start_at=  ' + JKY.inp_time		('jky-start-date'		)
		+		     ', peso=  ' + JKY.get_value	('jky-peso'				)
		+		    ', units=  ' + JKY.get_value	('jky-units'			)
		+           ', yield=  ' + JKY.get_value	('jky-yield'			)
		+             ', ncm=\'' + JKY.get_value	('jky-ncm'				) + '\''
		+ ', weight_customer=\'' + JKY.get_value	('jky-weight-customer'	) + '\''
		+     ', weight_dyer=\'' + JKY.get_value	('jky-weight-dyer'		) + '\''
		+  ', width_customer=\'' + JKY.get_value	('jky-width-customer'	) + '\''
		+      ', width_dyer=\'' + JKY.get_value	('jky-width-dyer'		) + '\''
		;
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-sign'	);
	JKY.show('jky-action-label'	);
};

JKY.display_form = function() {
	JKY.show('jky-action-sign'	);
	JKY.show('jky-action-label'	);
};

JKY.reset_product_base = function() {
	var my_parent_id = JKY.get_value('jky-parent-id');
	if (JKY.is_empty(my_parent_id))		return;
	JKY.set_value('jky-parent-id'	, '');
	JKY.set_value('jky-product-base', '');
	$('#jky-product-base').change();	//	to activate change event
}

JKY.reset_family_name = function() {
}

JKY.process_validation = function() {
	var my_error = '';
	if (JKY.get_value('jky-peso') < 0.01)		my_error += JKY.set_is_invalid('Peso');
	return my_error;
}

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.show('jky-loading');
	JKY.display_message('print_row: ' + the_id);
	var my_names;
	var my_extension;
	var my_row = JKY.get_row(JKY.App.get_prop('table_name'), the_id);

//window.print();
	var my_html = ''
		+ "<table class='jky-print-box'><tbody>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>Quotation Number</span>:</td><td id='jky-print-quotation-number'	class='jky-print-name' ></td>"
		+ "<td class='jky-print-label'><span>            Date</span>:</td><td id='jky-print-quoted-date'		class='jky-print-value'></td>"
		+ "</tr>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'		class='jky-print-name' ></td>"
		+ "<td class='jky-print-label'></td>"
		+ "</tr>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>         Contact</span>:</td><td id='jky-print-contact-name'		class='jky-print-name' ></td>"
//		+ "<td class='jky-print-label'><span>   Expected Date</span>:</td><td id='jky-print-expected-date'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label'><span> Production From</span>:</td><td id='jky-print-produce-from-date'	class='jky-print-value'></td>"
		+ "</tr>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>        Payments</span>:</td><td id='jky-print-payments'			class='jky-print-name' ></td>"
//		+ "<td class='jky-print-label'><span>  Delivered Date</span>:</td><td id='jky-print-delivered-date'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label'><span>   Production To</span>:</td><td id='jky-print-produce-to-date'	class='jky-print-value'></td>"
		+ "</tr>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>  Purchase Order</span>:</td><td id='jky-print-purchase-order'		class='jky-print-name' ></td>"
		+ "<td class='jky-print-label'><span> Advanced Amount</span>:</td><td id='jky-print-advanced-amount'	class='jky-print-value'></td>"
		+ "</tr>"

		+ "</tbody></table>"
		+ "<br>"

		+ "<table class='jky-print-box'>"
		+ "<tbody id='jky-print-lines-body'></body>"
		+ "</table>"
		+ "<br>"

		+ "<div class='jky-print-box'>"
		+ "<div id='jky-print-customers'></div>"
		+ "</div>"
		+ "<br>"

		+ "<div class='jky-print-box'>"
		+ "<div id='jky-print-remarks'></div>"
		+ "</div>"
		;
	var my_remarks	= JKY.get_config_value('Remarks', 'Quotation');

	JKY.set_html('jky-printable', my_html);

	JKY.set_html('jky-print-quotation-number'	, my_row.quotation_number);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name);
	JKY.set_html('jky-print-contact-name'		, JKY.fix_null(my_row.contact_name) + ' : ' + JKY.fix_null(my_row.contact_mobile));
	JKY.set_html('jky-print-payments'			, JKY.fix_null(my_row.payments));
	JKY.set_html('jky-print-purchase-order'		, JKY.fix_null(my_row.purchase_order));

	JKY.set_html('jky-print-quoted-date'		, JKY.out_date(my_row.quoted_at			));
	JKY.set_html('jky-print-produce-from-date'	, JKY.out_date(my_row.produce_from_date	));
	JKY.set_html('jky-print-produce-to-date'	, JKY.out_date(my_row.produce_to_date	));
	JKY.set_html('jky-print-advanced-amount'	, my_row.advanced_amount);

	JKY.set_html('jky-print-lines-body'			, JKY.print_lines(the_id));

	JKY.set_html('jky-print-customers'			, JKY.nl2br(my_row.customers));
	JKY.set_html('jky-print-remarks'			, JKY.nl2br(my_remarks));
	JKY.t_tag	('jky-printable', 'span');

//	JKY.show('jky-printable');
	$("#jky-printable").print();
	JKY.hide('jky-loading');
};

/**
 * sign row
 */
JKY.sign_row = function(the_id) {
	JKY.show('jky-loading');
	JKY.display_message('sign_row: ' + the_id);

//window.print();
	var my_html = ''
		+ "<table class='jky-sign-box'><tbody>"

		+ "<tr><td id='jky-sign-product' class='jky-sign-product'></td></tr>"

		+ "<tr><td id='jky-sign-threads' class='jky-sign-threads'></td></tr>"

		+ "<tr><td class='jky-sign-line'>"
		+ "<span>   Width</span> : &nbsp; <span id='jky-sign-width'		class='jky-sign-bold'></span><br>"
		+ "<span>Grammage</span> : &nbsp; <span id='jky-sign-weight'	class='jky-sign-bold'></span><br>"
		+ "<span>   Yield</span> : &nbsp; <span id='jky-sign-yield'		class='jky-sign-bold'></span>"
		+ "</td></tr>"

		+ "<tr><td class='jky-sign-line'> <span id='jky-sign-type'		class='jky-sign-bold'></span>:</td></tr>"

//		+ "<tr><td class='jky-sign-line'>R$ &nbsp; <span id='jky-sign-price' class='jky-sign-price'></span> &nbsp; Kg</td></tr>"
		+ "<tr><td><br></td></tr>"
		+ "<tr><td><br></td></tr>"
		+ "<tr><td><br></td></tr>"
		+ "<tr><td><br></td></tr>"

		+ "</tbody></table>"
		;
	JKY.set_html('jky-printable', my_html);

	var my_row  = JKY.get_row(JKY.App.get_prop('table_name'), the_id);
	JKY.set_html('jky-sign-product'	, my_row.product_name	);
	JKY.set_html('jky-sign-width'	, my_row.width_customer	.replace('-', 'a') + ' Cms');
	JKY.set_html('jky-sign-weight'	, my_row.weight_customer.replace('-', 'a') + ' Grs');
	JKY.set_html('jky-sign-yield'	, my_row.yield			.replace('.', ',') + ' Mts / Kg');

	var my_where = 'AND FTPs.product_id = ' + my_row.id;
	if (my_row.parent_id) {
		my_where += ' OR FTPs.product_id = ' + my_row.parent_id;
	}
	var my_data =
		{ method		: 'get_index'
		, table			: 'FTPs'
		, where			:  my_where
		, select		: 'All'
		, order_by		: 'ftp_number'
		};
	var my_composition = null;
	JKY.ajax(false, my_data, function(response) {
		var my_rows  = response.rows;
		if (my_rows != '') {
			for(var i in my_rows) {
				var my_row	= my_rows[i];
				if (my_row.is_current == 'Yes') {
					my_composition = my_row.composition;
				}
			}
		}
		if (my_composition) {
			var my_threads = my_composition.split(', ');
			var my_html = '';
			for(var i in my_threads) {
				var my_thread = my_threads[i];
				my_html += my_thread.replace(' ', '% ') + '<br>';
			}
			JKY.set_html('jky-sign-threads', my_html);
		}
	});
/*
	var my_data =
		{ method		: 'get_index'
		, table			: 'ProdPrices'
		, specific		: 'product'
		, specific_id	:  my_row.id
		, select		: 'Active'
		, order_by		: 'color_type'
		};
	JKY.ajax(false, my_data, function(the_data) {
		var my_price = the_data.rows[0];
		var my_price_type = JKY.t((my_price.color_type === 'Unico') ? 'Unique Price' : 'Price From');
		JKY.set_html('jky-sign-type'	, my_price_type);
		JKY.set_html('jky-sign-price'	, my_price.current_price.replace('.', ','));
	});
*/
	JKY.set_html('jky-sign-type', JKY.t('Price From'));

	setTimeout(function() {
		JKY.t_tag	('jky-printable', 'span');
	//	JKY.show('jky-printable');
		$("#jky-printable").print();
		JKY.hide('jky-loading');
	}, 1000);
};

/**
 * label row
 */
JKY.label_row = function(the_id) {
	var my_data =
		{ method	: 'print_labels'
		, table		: 'Products'
		, id		:  the_id
		}
	JKY.ajax(false, my_data, function(the_data) {
		JKY.display_message(JKY.t('Label Printed') + ' ' + the_id);
	});
}
