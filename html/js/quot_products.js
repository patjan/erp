"use strict";
var JKY = JKY || {};
/**
 * quot_products.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Products Quoted'
		, table_name	: 'QuotProducts'
		, specific		: ''
		, select		: JKY.sales.select
		, filter		: ''
		, sort_by		: 'Quotation.quotation_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[3, 1]]
		, focus			: 'jky-weight'
		, add_new		: 'display form'
		, class			: 'status'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-quoted-date			input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-produced-date		input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-delivered-date		input').attr('data-format', JKY.Session.get_date	 ());
	$('#jky-quoted-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-produced-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-delivered-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	JKY.set_side_active('jky-sales-quot-products');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_html('jky-app-select', JKY.set_options(JKY.sales.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.show	('jky-action-print'   );

	JKY.hide	('jky-action-approve');
	JKY.hide	('jky-action-form');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_units		= parseFloat(the_row.units		 );
	var my_peso			= parseFloat(the_row.peso		 );
	var my_quoted_units = parseFloat(the_row.quoted_units);

	var my_quoted_pieces= 0;
	var my_quoted_weight= 0;
	if (my_units == 0) {
		my_quoted_pieces	= Math.ceil(my_quoted_units / my_peso );
		my_quoted_weight	= my_quoted_units;
	}else{
		my_quoted_pieces	= Math.ceil(my_quoted_units / my_units);
		my_quoted_weight	= my_quoted_units * my_peso;
	}

	var my_html = ''
		+  '<td class="jky-td-name-s"	>' +				 the_row.product_name		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.color_name			+ '</td>'
		+  '<td class="jky-td-number"	>' +				 the_row.quotation_number	+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.loadout_number	)	+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.osa_number		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.customer_name	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.quoted_at		)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.produced_date	)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.delivered_date	)	+ '</td>'
		+  '<td class="jky-td-pieces"	>' + my_quoted_pieces							+ '</td>'
		+  '<td class="jky-td-weight"	>' + my_quoted_weight.toFixed(2)				+ '</td>'
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
//	JKY.set_date	('jky-produced-date'	, JKY.out_date	(the_row.produced_date		));
//	JKY.set_date	('jky-delivered-date'	, JKY.out_date	(the_row.delivered_date		));
	JKY.set_value	('jky-customer-id'		,				 the_row.customer_id		);
	JKY.set_value	('jky-customer-name'	,				 the_row.customer_name		);
	JKY.set_value	('jky-salesman-id'		,				 the_row.salesman_id		);
	JKY.set_value	('jky-salesman-name'	,				 the_row.salesman_name		);
	JKY.set_value	('jky-remarks'			,				 the_row.remarks			);
	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-osa-number'		, JKY.t('New'));
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-produce-from-date', '');
	JKY.set_date	('jky-produce-to-date'	, '');
//	JKY.set_date	('jky-produced-date'	, '');
//	JKY.set_date	('jky-delivered-date'	, '');
	JKY.set_value	('jky-customer-id'		, null);
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-salesman-id'		, null);
	JKY.set_value	('jky-salesman-name'	, '');
	JKY.set_value	('jky-remarks'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_salesman_id	= JKY.get_value('jky-salesman-id'	);
		my_customer_id	= (my_customer_id	=== '') ? 'null' : my_customer_id	;
		my_salesman_id	= (my_salesman_id	=== '') ? 'null' : my_salesman_id	;

	var my_set = ''
		+       '  customer_id=  ' + my_customer_id
		+       ', salesman_id=  ' + my_salesman_id
		+        ', ordered_at=  ' + JKY.inp_time ('jky-ordered-date'		)
//		+ ', produce_from_date=  ' + JKY.inp_date ('jky-produce-from-date'	)
//		+   ', produce_to_date=  ' + JKY.inp_date ('jky-produce-to-date'	)
//		+     ', produced_date=  ' + JKY.inp_date ('jky-produced-date'		)
//		+    ', delivered_date=  ' + JKY.inp_date ('jky-delivered-date'		)
		+           ', remarks=\'' + JKY.get_value('jky-remarks'			) + '\''
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
JKY.generate_order = function() {
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
	var my_set	= 'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
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
