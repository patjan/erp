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
		, focus			: 'jky-diameter'
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
	$('#jky-quoted-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-produced-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-delivered-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-punho-name'			).click( function()	{JKY.Application.process_change_input(this);});
	$('#jky-gola-name'			).click( function()	{JKY.Application.process_change_input(this);});
	$('#jky-galao-name'			).click( function()	{JKY.Application.process_change_input(this);});

	$('#jky-lines-add-new'		).click (function()	{JKY.insert_line		();});

	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-save-remarks'		).click (function()	{JKY.save_remarks		();});
	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
	$('#jky-product-filter'		).KeyUpDelay(JKY.Product.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data);
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-sales-quotations');
	JKY.set_html('jky-customer-name', JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
	JKY.show('jky-action-print');
//	JKY.materials	= JKY.get_configs	('Materials'	);
//	JKY.threads		= JKY.get_ids		('Threads'		);
//	JKY.settings	= JKY.get_configs	('Settings'		);
//	JKY.suppliers	= JKY.get_companies	('is_supplier'	);
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
	JKY.set_value	('jky-diameter'			, the_row.diameter		);
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
	JKY.set_value	('jky-diameter'			, '');
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
		my_customer_id	= (my_customer_id	== '') ? 'null' : my_customer_id;
	var my_machine_id	= JKY.get_value('jky-machine-name'	);
		my_machine_id	= (my_machine_id	== '') ? 'null' : my_machine_id	;
	var my_dyer_id		= JKY.get_value('jky-dyer-name'		);
		my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;
	var my_punho_id		= JKY.get_value('jky-punho-id'		);
		my_punho_id		= (my_punho_id		== '') ? 'null' : my_punho_id	;
	var my_gola_id		= JKY.get_value('jky-gola-id'		);
		my_gola_id		= (my_gola_id		== '') ? 'null' : my_gola_id	;
	var my_galao_id		= JKY.get_value('jky-galao-id'		);
		my_galao_id		= (my_galao_id		== '') ? 'null' : my_galao_id	;

	var my_set = ''
		+     'customer_id=  ' + my_customer_id
		+    ', machine_id=  ' + my_machine_id
		+       ', dyer_id=  ' + my_dyer_id
		+     ', quoted_at=  ' + JKY.inp_time(JKY.get_value('jky-quoted-value'		))
		+ ', produced_date=  ' + JKY.inp_date(JKY.get_value('jky-produced-value'	))
		+', delivered_date=  ' + JKY.inp_date(JKY.get_value('jky-delivered-value'	))
		+      ', diameter=  ' + JKY.get_value	('jky-diameter'			)
		+        ', weight=  ' + JKY.get_value	('jky-weight'			)
		+         ', width=  ' + JKY.get_value	('jky-width'			)
		+		   ', peso=  ' + JKY.get_value	('jky-peso'				)
		+     ', has_break=\'' + JKY.get_checked('jky-has-break'		) + '\''
		+	 ', punho_perc=  ' + JKY.get_value	('jky-punho-perc'		)
		+	  ', gola_perc=  ' + JKY.get_value	('jky-gola-perc'		)
		+	 ', galao_perc=  ' + JKY.get_value	('jky-galao-perc'		)
		+	   ', punho_id=  ' + my_punho_id
		+	    ', gola_id=  ' + my_gola_id
		+	   ', galao_id=  ' + my_galao_id
		+		', remarks=\'' + JKY.get_value	('jky-remarks'			) + '\''
		;
	return my_set;
}

JKY.display_list = function() {
	JKY.show('jky-action-print');
};

JKY.display_form = function() {
	JKY.show('jky-action-print');
	JKY.show('jky-action-copy');
};

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
};

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
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span> FTP Number</span>:</td><td id='jky-print-number'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Product</span>:</td><td id='jky-print-product'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Composition</span>:</td><td id='jky-print-composition'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Machine</span>:</td><td id='jky-print-machine'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	 Nick Name</span>:</td><td id='jky-print-nick-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "<td id='jky-print-drawing' width=20%></td>"
		+ "<td id='jky-print-photo'   width=20%></td>"

		+ "</tr>"
		+ "</table>"

		+ "<br>"
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>  Diameter</span>:</td><td id='jky-print-diameter'	class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>     Turns</span>:</td><td id='jky-print-turns'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label1'><span>     Speed</span>:</td><td id='jky-print-speed'		class='jky-print-value'></td>"
//		+ "<td class='jky-print-label3'><span>Elasticity</span>:</td><td id='jky-print-elasticity'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>   Density</span>:</td><td id='jky-print-density'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>    Weight</span>:</td><td id='jky-print-weight'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span>      Peso</span>:</td><td id='jky-print-peso'		class='jky-print-value'></td>"
//		+ "<td class='jky-print-label3'><span>  Needling</span>:</td><td id='jky-print-needling'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>    Inputs</span>:</td><td id='jky-print-inputs'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>     Width</span>:</td><td id='jky-print-width'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span>     Break</span>?</td><td id='jky-print-has-break'	class='jky-print-value'></td>"
		+ "</tr>"
//		+ "<tr>"
//		+ "<td class='jky-print-label2'><span>     Lanes</span>:</td><td id='jky-print-lanes'		class='jky-print-value'></td>"
//		+ "</tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Threads</span></td><td><span>Percent</span></td><td><span>Thread</span></td><td><span>Supplier</span></td><tr><thead>"
		+ "<tbody id='jky-print-thread-body'></table>"
		+ "</table>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Loads</span></td><td><span>From</span></td><td><span>Upto</span></td><td></td><tr><thead>"
		+ "<tbody id='jky-print-load-body'></table>"
		+ "</table>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Settings</span></td><td><span>Name</span></td><td><span>Value</span></td><td><span>Name</span></td><td><span>Value</span></td><tr><thead>"
		+ "<tbody id='jky-print-setting-body'></table>"
		+ "</table>"
		;
	JKY.set_html('jky-printable', my_html);
	JKY.t_tag	('jky-printable', 'span');

	JKY.set_html('jky-print-number'			, my_row.number			);
	JKY.set_html('jky-print-start-date'		, my_row.start_date		);
	JKY.set_html('jky-print-product'		, my_row.product		);
	JKY.set_html('jky-print-composition'	, my_row.composition	);
	JKY.set_html('jky-print-machine'		, my_row.machine		);
	JKY.set_html('jky-print-collection'		, my_row.collections	);
	JKY.set_html('jky-print-nick-name'		, my_row.nick_name		);

	if (JKY.is_empty(my_row.draw)) {
		JKY.set_html('jky-print-drawing', '<img id="jky-drawing-img"  src="/img/placeholder.png" />');
	}else{
		my_names = my_row.draw.split(',');
		my_extension = JKY.get_file_type(my_names[0]);
		JKY.set_html('jky-print-drawing', '<img id="jky-drawing-img"  src="/uploads/ftp_draws/'  + my_row.id + '.' + my_extension  + '" />');
	}

	if (JKY.is_empty(my_row.photo)) {
		JKY.set_html('jky-print-photo'	, '<img id="jky-photo-img"  src="/img/placeholder.png" />');
	}else{
		my_names = my_row.photo.split(',');
		my_extension = JKY.get_file_type(my_names[0]);
		JKY.set_html('jky-print-photo'	, '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + my_row.id + '.' + my_extension + '" />');
	}

	JKY.set_html('jky-print-diameter'		, my_row.diameter		+ ' (pol)'	);
	JKY.set_html('jky-print-turns'			, my_row.turns						);
	JKY.set_html('jky-print-speed'			, my_row.speed			+ ' (rpm)'	);
//	JKY.set_html('jky-print-elasticity'		, my_row.elasticity					);
	JKY.set_html('jky-print-density'		, my_row.density					);
	JKY.set_html('jky-print-weight'			, my_row.weight			+ ' (gr)'	);
	JKY.set_html('jky-print-peso'			, my_row.peso			+ ' (Kg)'	);
//	JKY.set_html('jky-print-needling'		, my_row.needling					);
	JKY.set_html('jky-print-inputs'			, my_row.inputs						);
	JKY.set_html('jky-print-width'			, my_row.width			+ ' (cm)'	);
//	JKY.set_html('jky-print-lanes'			, my_row.lanes						);
	JKY.set_html('jky-print-has-break'		, JKY.t((my_row.has_break == 'No') ? 'Without' : 'With'));

	JKY.set_html('jky-print-thread-body'	, JKY.print_threads	(the_id));
	JKY.set_html('jky-print-load-body'		, JKY.print_loads	(the_id));
	JKY.set_html('jky-print-setting-body'	, JKY.print_settings(the_id));

//	JKY.show('jky-printable');
	$("#jky-printable").print();
}

JKY.save_remarks = function() {
//	JKY.display_message('JKY.save_remarks');
	var my_set  =   'remarks = \'' + JKY.get_value('jky-remarks') + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Quotations'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
}

JKY.save_remarks_success = function(response) {
//	JKY.display_trace('save_remarks_success');
	JKY.display_message('Remarks saved, ' + response.message);
}
