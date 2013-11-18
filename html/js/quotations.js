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
		, program_name	: 'Quotations'
		, table_name	: 'Quotations'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'quotation_number'
		, sort_seq		: 'DESC'
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
	$('#jky-quoted-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-produced-value'	).attr('data-format', JKY.Session.get_date		());
	$('#jky-delivered-value').attr('data-format', JKY.Session.get_date		());
	$('#jky-quoted-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-produced-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-delivered-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-punho-name'			).change( function()	{JKY.App.process_change_input(this);});
	$('#jky-gola-name'			).change( function()	{JKY.App.process_change_input(this);});
	$('#jky-galao-name'			).change( function()	{JKY.App.process_change_input(this);});

	$('#jky-lines-add-new'		).click (function()	{JKY.insert_line		();});

//	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-action-product'		).click (function() {JKY.Product.display(this);});
//	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-save-remarks'		).click (function()	{JKY.save_remarks		();});
//	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-product'	, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-color'	, '../JKY.Search.Color.html'	);

	JKY.set_side_active('jky-sales-quotations');
	JKY.set_html('jky-customer-name', JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
	JKY.show('jky-action-print');
//	JKY.materials	= JKY.get_configs	('Materials'	);
//	JKY.threads		= JKY.get_ids		('Threads'		);
//	JKY.settings	= JKY.get_configs	('Settings'		);
//	JKY.suppliers	= JKY.get_companies	('is_supplier'	);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product.load_data	);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data	);
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-quotation-number">' +				 the_row.quotation_number		+ '</td>'
		+  '<td class="jky-customer-name"	>' + JKY.fix_null	(the_row.customer_name		)	+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-dyer-name"		>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-quoted-date"		>' + JKY.short_date	(the_row.quoted_at			)	+ '</td>'
		+  '<td class="jky-produced-date"	>' + JKY.out_date	(the_row.produced_date		)	+ '</td>'
		+  '<td class="jky-delivered-date"	>' + JKY.out_date	(the_row.delivered_date		)	+ '</td>'
		+  '<td class="jky-quoted-pieces"	>' +				 the_row.quoted_pieces			+ '</td>'
		+  '<td class="jky-produced-pieces"	>' +				 the_row.produced_pieces		+ '</td>'
		+  '<td class="jky-delivered-pieces">' +				 the_row.delivered_pieces		+ '</td>'
		+  '</tr>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-quotation-number'	, the_row.quotation_number	);
	JKY.set_date	('jky-quoted-date'		, JKY.out_time(the_row.quoted_at		));
	JKY.set_date	('jky-produced-date'	, JKY.out_date(the_row.produced_date	));
	JKY.set_date	('jky-delivered-date'	, JKY.out_date(the_row.delivered_date	));
	JKY.set_option	('jky-customer-name'	, the_row.customer_id	);
	JKY.set_option	('jky-machine-name'		, the_row.machine_id	);
	JKY.set_option	('jky-dyer-name'		, the_row.dyer_id		);
//	JKY.set_value	('jky-diameter'			, the_row.diameter		);
	JKY.set_value	('jky-weight'			, the_row.weight		);
	JKY.set_value	('jky-width'			, the_row.width			);
	JKY.set_value	('jky-peso'				, the_row.peso			);
	JKY.set_radio	('jky-has-break'		, the_row.has_break		);
	JKY.set_value	('jky-punho-perc'		, the_row.punho_perc	);
	JKY.set_value	('jky-gola-perc'		, the_row.gola_perc		);
	JKY.set_value	('jky-galao-perc'		, the_row.galao_perc	);
	JKY.set_value	('jky-punho-name'		, the_row.punho_name	);
	JKY.set_value	('jky-gola-name'		, the_row.gola_name		);
	JKY.set_value	('jky-galao-name'		, the_row.galao_name	);
	JKY.set_value	('jky-remarks'			, JKY.row.remarks		);
	JKY.display_lines();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-quotation-number'	,  JKY.t('New'));
	JKY.set_date	('jky-quoted-date'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-produced-date'	, '');
	JKY.set_date	('jky-delivered-date'	, '');
	JKY.set_option	('jky-customer-name'	,  null);
	JKY.set_option	('jky-machine-name'		,  null);
	JKY.set_option	('jky-dyer-name'		,  null);
//	JKY.set_value	('jky-diameter'			, '');
	JKY.set_value	('jky-weight'			, '');
	JKY.set_value	('jky-width'			, '');
	JKY.set_value	('jky-peso'				, '12.5');
	JKY.set_radio	('jky-has-break'		, 'No');
	JKY.set_value	('jky-punho-perc'		, '0');
	JKY.set_value	('jky-gola-perc'		, '0');
	JKY.set_value	('jky-galao-perc'		, '0');
	JKY.set_value	('jky-punho-name'		, '');
	JKY.set_value	('jky-gola-name'		, '');
	JKY.set_value	('jky-galao-name'		, '');
	JKY.set_value	('jky-remarks'			, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_customer_id	= JKY.get_value('jky-customer-name'	);
	var my_machine_id	= JKY.get_value('jky-machine-name'	);
	var my_dyer_id		= JKY.get_value('jky-dyer-name'		);
	var my_punho_id		= JKY.get_value('jky-punho-id'		);
	var my_gola_id		= JKY.get_value('jky-gola-id'		);
	var my_galao_id		= JKY.get_value('jky-galao-id'		);
		my_customer_id	= (my_customer_id	== '') ? 'null' : my_customer_id;
		my_machine_id	= (my_machine_id	== '') ? 'null' : my_machine_id	;
		my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;
		my_punho_id		= (my_punho_id		== '') ? 'null' : my_punho_id	;
		my_gola_id		= (my_gola_id		== '') ? 'null' : my_gola_id	;
		my_galao_id		= (my_galao_id		== '') ? 'null' : my_galao_id	;

	var my_set = ''
		+       'customer_id=  ' + my_customer_id
		+      ', machine_id=  ' + my_machine_id
		+         ', dyer_id=  ' + my_dyer_id
		+       ', quoted_at=  ' + JKY.inp_time(JKY.get_value('jky-quoted-value'	))
		+   ', produced_date=  ' + JKY.inp_date(JKY.get_value('jky-produced-value'	))
		+  ', delivered_date=  ' + JKY.inp_date(JKY.get_value('jky-delivered-value'	))
//		+        ', diameter=  ' + JKY.get_value	('jky-diameter'		)
		+          ', weight=  ' + JKY.get_value	('jky-weight'		)
		+           ', width=  ' + JKY.get_value	('jky-width'		)
		+            ', peso=  ' + JKY.get_value	('jky-peso'			)
		+       ', has_break=\'' + JKY.get_checked	('jky-has-break'	) + '\''
		+      ', punho_perc=  ' + JKY.get_value	('jky-punho-perc'	)
		+       ', gola_perc=  ' + JKY.get_value	('jky-gola-perc'	)
		+      ', galao_perc=  ' + JKY.get_value	('jky-galao-perc'	)
		+        ', punho_id=  ' + my_punho_id
		+         ', gola_id=  ' + my_gola_id
		+        ', galao_id=  ' + my_galao_id
		+         ', remarks=\'' + JKY.get_value	('jky-remarks'		) + '\''
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
		, table : 'QuotColors'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method: 'delete_many'
		, table : 'QuotLines'
		, where : 'parent_id = ' + the_id
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
		+ "<td style='width:330px; font-weight:bold;'>" + "</td>"
		+ "<td style='width:120px; text-align:right;'><spa	n>Date</span>: " + JKY.out_date(my_row.quoted_at) + "</td>"
		+ "</tr></table>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Quotation Number</span>:</td><td id='jky-print-quotation-number'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	       Customer</span>:</td><td id='jky-print-customer-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>			Machine</span>:</td><td id='jky-print-machine-name'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>			   Dyer</span>:</td><td id='jky-print-dyer-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "</tr>"
		+ "</table>"
		+ "<br>"

		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>  Punho</span>:</td>"
		+	"<td id='jky-print-punho-perc'	class='jky-print-value'></td>"
		+	"<td id='jky-print-punho-name'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>   Gola</span>:</td>"
		+	"<td id='jky-print-gola-perc'	class='jky-print-value'></td>"
		+	"<td id='jky-print-gola-name'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+	"<td class='jky-print-label'><span>  Galao</span>:</td>"
		+	"<td id='jky-print-galao-perc'	class='jky-print-value'></td>"
		+	"<td id='jky-print-galao-name'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"

		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
//		+ "<tr><td class='jky-print-label'><span>  Diameter</span>:</td><td id='jky-print-diameter'		class='jky-print-value'></td></tr>"
		+ "<tr><td class='jky-print-label'><span>    Weight</span>:</td><td id='jky-print-weight'		class='jky-print-value'></td></tr>"
		+ "<tr><td class='jky-print-label'><span>     Width</span>:</td><td id='jky-print-width'		class='jky-print-value'></td></tr>"
		+ "<tr><td class='jky-print-label'><span>      Peso</span>:</td><td id='jky-print-peso'			class='jky-print-value'></td></tr>"
		+ "<tr><td class='jky-print-label'><span>     Break</span>?</td><td id='jky-print-has-break'	class='jky-print-value'></td></tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"

		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-lines'>"
		+	"<td><span>Product</span></td>"
		+	"<td><span>Quoted<br>Pieces</span></td>"
		+	"<td><span>Color</span></td>"
		+	"<td><span>Fabric<br>$/Kg</span></td>"
		+	"<td><span>Punho<br>$/Kg</span></td>"
		+	"<td><span>Gola<br>$/Kg</span></td>"
		+	"<td><span>Galao<br>$/Kg</span></td>"
		+ "<tr><thead>"
		+ "<tbody id='jky-print-lines-body'></table>"
		+ "</table>"
		+ "<br>"
		;
	JKY.set_html('jky-printable', my_html);
	JKY.t_tag	('jky-printable', 'span');

	JKY.set_html('jky-print-quotation-number'	, my_row.quotation_number	);
	JKY.set_html('jky-print-customer-name'		, my_row.customer_name		);
	JKY.set_html('jky-print-machine-name'		, my_row.machine_name		);
	JKY.set_html('jky-print-dyer-name'			, my_row.dyer_name			);

	JKY.set_html('jky-print-punho-perc'			, my_row.punho_perc			);
	JKY.set_html('jky-print-punho-name'			, my_row.punho_name			);
	JKY.set_html('jky-print-gola-perc'			, my_row.gola_perc			);
	JKY.set_html('jky-print-gola-name'			, my_row.gola_name			);
	JKY.set_html('jky-print-galao-perc'			, my_row.galao_perc			);
	JKY.set_html('jky-print-galao-name'			, my_row.galao_name			);

//	JKY.set_html('jky-print-diameter'			, my_row.diameter		+ ' (pol)'	);
	JKY.set_html('jky-print-weight'				, my_row.weight			+ ' (gr)'	);
	JKY.set_html('jky-print-width'				, my_row.width			+ ' (cm)'	);
	JKY.set_html('jky-print-peso'				, my_row.peso			+ ' (Kg)'	);
	JKY.set_html('jky-print-has-break'			, JKY.t((my_row.has_break == 'No') ? 'Without' : 'With'));

	JKY.set_html('jky-print-lines-body'			, JKY.print_lines(the_id));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
}

JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'Quotations'
		, set	:  my_set
		, where : 'Quotations.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
}

JKY.save_remarks_success = function(response) {
	JKY.display_message('Remarks saved, ' + response.message);
	JKY.row = JKY.get_row('Quotations', JKY.row.id);
}
