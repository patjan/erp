"use strict";
var JKY = JKY || {};
/**
 * osas.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'OSAs'
		, table_name	: 'OSAs'
		, specific		: ''
		, select		: JKY.osas.select
		, filter		: ''
		, sort_by		: 'osa_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-weight'
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
	$('#jky-ordered-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-produce-from-date	input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-produce-to-date		input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-produced-date		input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-delivered-date		input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-ordered-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-produce-from-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-produce-to-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-produced-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-delivered-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-generate'	).click( function() {JKY.gen_order			();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-lines-add-new'		).click (function()	{JKY.insert_line		();});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-action-product'		).click (function() {JKY.Product.display(this);});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);

	JKY.set_side_active('jky-sales-osas');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-customer'		, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-salesman'		, '../JKY.Search.Salesman.html'	);
	JKY.append_file('jky-load-machine'		, '../JKY.Search.Machine.html'	);
	JKY.append_file('jky-load-partner'		, '../JKY.Search.Partner.html'	);
	JKY.append_file('jky-load-product'		, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'	);
	JKY.append_file('jky-load-ftp'			, '../JKY.Search.FTP.html'		);
	JKY.append_file('jky-load-product-type'	, '../JKY.Search.ProdType.html'	);

	JKY.set_html('jky-app-select', JKY.set_options(JKY.sales.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.show	('jky-action-print'   );
	JKY.show	('jky-action-approve' );

	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer	.load_data);
	$('#jky-salesman-filter'	).KeyUpDelay(JKY.Salesman	.load_data);
	$('#jky-machine-filter'		).KeyUpDelay(JKY.Machine	.load_data);
	$('#jky-partner-filter'		).KeyUpDelay(JKY.Partner	.load_data);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color		.load_data);
	$('#jky-prod-type-filter'	).KeyUpDelay(JKY.Product	.load_data);

	$('#jky-weight'	).ForceIntegerOnly();
	$('#jky-width'	).ForceIntegerOnly();
	$('#jky-peso'	).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.osa_number			+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.quotation_number	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.salesman_name	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.ordered_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.produced_date	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.delivered_date	)	+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.quoted_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.ordered_pieces		+ '</td>'
		+  '</tr>'
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
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status				));
	JKY.set_value	('jky-osa-number'		,				 the_row.osa_number			);
	JKY.set_value	('jky-quotation-number'	,				 the_row.quotation_number	);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at			));
	JKY.set_date	('jky-produce-from-date', JKY.out_time	(the_row.produce_from_date	));
	JKY.set_date	('jky-produce-to-date'	, JKY.out_date	(the_row.produce_to_date	));
	JKY.set_date	('jky-produced-date'	, JKY.out_date	(the_row.produced_date		));
	JKY.set_date	('jky-delivered-date'	, JKY.out_date	(the_row.delivered_date		));
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name 		);
	JKY.set_value	('jky-salesman-id'		,				 the_row.salesman_id		);
	JKY.set_value	('jky-salesman-name'	,				 the_row.salesman_name		);
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

	JKY.set_value	('jky-osa-number'		,  JKY.t('New'));
	JKY.set_date	('jky-ordered-date'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-produce-from-date', '');
	JKY.set_date	('jky-produce-to-date'	, '');
	JKY.set_date	('jky-produced-date'	, '');
	JKY.set_date	('jky-delivered-date'	, '');
	JKY.set_value	('jky-customer-id'		,  null);
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-salesman-id'		,  null);
	JKY.set_value	('jky-salesman-name'	, '');
	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_salesman_id	= JKY.get_value('jky-salesman-id'	);
		my_customer_id	= (my_customer_id	=== '') ? 'null' : my_customer_id;
		my_salesman_id	= (my_salesman_id	=== '') ? 'null' : my_salesman_id;

	var my_set = ''
		+       '  customer_id=  ' + my_customer_id
		+       ', salesman_id=  ' + my_salesman_id
		+        ', ordered_at=  ' + JKY.inp_time	('jky-ordered-date'		)
//		+ ', produce_from_date=  ' + JKY.inp_date	('jky-produce-from-date')
//		+   ', produce_to_date=  ' + JKY.inp_date	('jky-produce-to-date'	)
		+     ', produced_date=  ' + JKY.inp_date	('jky-produced-date'	)
		+    ', delivered_date=  ' + JKY.inp_date	('jky-delivered-date'	)
		+           ', remarks=\'' + JKY.get_value	('jky-remarks'			) + '\''
		;
	return my_set;
};

JKY.zero_value = function(the_id, the_name) {
	JKY.App.process_change_input(the_id);
	$('#' + the_name).val('0');
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-print'  );
	JKY.show('jky-action-approve');
};

JKY.display_form = function() {
	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-print'  );
	JKY.show('jky-action-approve');
	JKY.show('jky-action-copy'   );
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
JKY.gen_order = function() {
	var my_ordered_pieces = JKY.get_value_by_id('OSAs', 'ordered_pieces', JKY.row.id);
	if (my_ordered_pieces <= 0) {
		JKY.display_message('Order cannot be generated');
		JKY.display_message('because there is not any Quoted Piece');
		return;
	}

	var my_data =
		{ method	: 'generate'
		, table		: 'Order'
		, id		:  JKY.row.id
		};
	JKY.ajax(false, my_data, function(the_response) {
		JKY.display_message('Order row generated: ' + JKY.row.id);
		JKY.App.display_row();
	});
};

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'OSAs'
		, set	:  my_set
		, where : 'OSAs.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Remarks saved, ' + the_response.message);
		JKY.row = JKY.get_row('OSAs', JKY.row.id);
	});
};

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.display_message('print_row: ' + the_id);
	var my_row = JKY.get_row(JKY.App.get('table_name'), the_id);

//window.print();
	var my_html = ''
		+ "<table><tr>"
		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><spa	n>Date</span>: " + JKY.out_date(my_row.ordered_at) + "</td>"
		+ "</tr></table>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>      OSA Number</span>:</td><td id='jky-print-osa-number'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Salesman</span>:</td><td id='jky-print-salesman-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"
		+ "<br>"
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "</div>"
		+ "<br>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	'<td								><span>Product				</span></td>'
		+	'<td								><span>  Extra				</span></td>'
		+	'<td class="jky-print-pieces"		><span>   Peso<br>Kg/Piece	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Units		</span></td>'
		+	'<td class="jky-print-pieces"		><span>  Units<br>/Piece	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Pieces	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Weight	</span></td>'
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

	JKY.set_html('jky-print-osa-number'			, my_row.osa_number			);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name		);
	JKY.set_html('jky-print-salesman-name'		, my_row.salesman_name		);
	JKY.set_html('jky-print-lines-body'			, JKY.approve_lines(the_id));

	JKY.set_html('jky-print-remarks'			, JKY.nl2br(my_row.remarks));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
};

/**
 * approve row
 */
JKY.approve_row = function(the_id) {
	JKY.display_message('approve_row: ' + the_id);
	var my_row = JKY.get_row(JKY.App.get('table_name'), the_id);

//window.print();
	var my_html = ''
		+ "<table><tr>"
		+ "<td style='width:250px; font-weight:bold;'>" + JKY.Session.get_value('company_name') + "</td>"
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><spa	n>Date</span>: " + JKY.out_date(my_row.ordered_at) + "</td>"
		+ "</tr></table>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>      OSA Number</span>:</td><td id='jky-print-osa-number'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>        Salesman</span>:</td><td id='jky-print-salesman-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"
		+ "<br>"
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "</div>"
		+ "<br>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	'<td								><span>Product				</span></td>'
		+	'<td								><span>  Extra				</span></td>'
		+	'<td class="jky-print-pieces"		><span>   Peso<br>Kg/Piece	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Units		</span></td>'
		+	'<td class="jky-print-pieces"		><span>  Units<br>/Piece	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Pieces	</span></td>'
		+	'<td class="jky-print-pieces"		><span> Quoted<br>Weight	</span></td>'
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

	JKY.set_html('jky-print-osa-number'			, my_row.osa_number			);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name		);
	JKY.set_html('jky-print-salesman-name'		, my_row.salesman_name		);
	JKY.set_html('jky-print-lines-body'			, JKY.print_lines(the_id));

	JKY.set_html('jky-print-remarks'			, JKY.nl2br(my_row.remarks));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
};
