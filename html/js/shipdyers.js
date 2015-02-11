"use strict";

/**
 * shipdyers.js
 */

/**
 * start program
 */
JKY.start_program = function() {
/*
SELECT ShipDyers.*
,      Dyer.nick_name		AS      dyer_name
, Transport.nick_name		AS transport_name
  FROM ShipDyers
  LEFT JOIN    Contacts AS Dyer			ON      Dyer.id	=		 ShipDyers.dyer_id
  LEFT JOIN    Contacts AS Transport	ON Transport.id	=		 ShipDyers.transport_id
 WHERE ShipDyers.status IN ("Draft","Active")
 ORDER BY shipdyer_number DESC
*/
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Ship Dyers'
		, table_name	: 'ShipDyers'
		, specific		: ''
		, select		: JKY.shipdyer.select
		, filter		: ''
		, sort_by		: 'shipdyer_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-dyer-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-shipped-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-delivered-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-shipped-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-delivered-date'		).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-invoice'		).click( function() {JKY.invoice_dyer			();});
	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-tab-loadouts'		).click (function() {JKY.display_loadouts		();});
	$('#jky-loadout-add-new'	).click (function() {JKY.LoadOut.display(null, JKY.get_dyer_id(), JKY.get_dyer_name());});

	$('#jky-print-sd'			).click (function() {JKY.LoadOut.print_sd		();});
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-transport', '../JKY.Search.Transport.html');
	JKY.append_file('jky-load-loadout'	, '../JKY.Search.LoadOut.html'	);

	JKY.set_side_active('jky-dyers-shipdyers');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.shipdyer.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.set_html('jky-dyer-name'		, JKY.set_options_array('', JKY.get_companies('is_dyer'		), true));
	JKY.set_html('jky-transport-name'	, JKY.set_options_array('', JKY.get_companies('is_transport'), true));

	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer.load_data		);
	$('#jky-transport-filter'	).KeyUpDelay(JKY.Transport.load_data);
	$('#jky-loadout-filter'		).KeyUpDelay(JKY.LoadOut.load_data	);

	$('#jky-quantity'		).ForceIntegerOnly();
	$('#jky-gross-weight'	).ForceNumericOnly();
	$('#jky-net-weight'		).ForceNumericOnly();
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.shipdyer_number		+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.invoice_number		)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.transport_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.shipped_at			)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.delivered_at		)	+ '</td>'
		+  '<td class="jky-td-code"		>' +				 the_row.batch_code				+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.quantity				+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.gross_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.net_weight				+ '</td>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-invoice'	);
		JKY.enable_delete_button();
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
		JKY.disable_button('jky-action-invoice'	);
		JKY.disable_delete_button();
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status			));
	JKY.set_value	('jky-shipdyer-number'	,				 the_row.shipdyer_number);
	JKY.set_value	('jky-invoice-number'	,				 the_row.invoice_number	);
	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id		);
	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name		);
	JKY.set_value	('jky-transport-id'		,				 the_row.transport_id	);
	JKY.set_value	('jky-transport-name'	,				 the_row.transport_name	);
	JKY.set_value	('jky-truck-license'	,				 the_row.truck_license	);
	JKY.set_date	('jky-shipped-date'		, JKY.out_time	(the_row.shipped_at		));
	JKY.set_date	('jky-delivered-date'	, JKY.out_time	(the_row.delivered_at	));
	JKY.set_value	('jky-unit-name'		,				 the_row.unit_name		);
	JKY.set_value	('jky-brand-name'		,				 the_row.brand_name		);
	JKY.set_value	('jky-batch-code'		,				 the_row.batch_code		);
	JKY.set_value	('jky-quantity'			,				 the_row.quantity		);
	JKY.set_value	('jky-gross-weight'		,				 the_row.gross_weight	);
	JKY.set_value	('jky-net-weight'		,				 the_row.net_weight		);
	JKY.set_value	('jky-sds-printed'		,				 the_row.sds_printed	);

//	JKY.set_calculated_transport();
	JKY.display_loadouts();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-invoice'	);
	JKY.disable_button('jky-action-close'	);
	JKY.disable_button('jky-action-delete'	);

	JKY.set_value	('jky-shipdyer-number'	,  JKY.t('New'));
	JKY.set_value	('jky-invoice-number'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_value	('jky-transport-id'		, '');
	JKY.set_value	('jky-transport-name'	, '');
	JKY.set_value	('jky-truck-license'	, '');
	JKY.set_date	('jky-shipped-date'		,  JKY.out_time(JKY.get_now()));
	JKY.set_date	('jky-delivered-date'	, '');
	JKY.set_value	('jky-unit-name'		, 'pecas');
	JKY.set_value	('jky-brand-name'		, 'tecido');
	JKY.set_value	('jky-batch-code'		, '');
	JKY.set_value	('jky-quantity'			,  0);
	JKY.set_value	('jky-gross-weight'		,  0);
	JKY.set_value	('jky-net-weight'		,  0);
	JKY.set_value	('jky-sds-printed'		,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
	var my_transport_id	= JKY.get_value('jky-transport-id'	);
	my_dyer_id			= (my_dyer_id		== '') ? 'null' : my_dyer_id		;
	my_transport_id		= (my_transport_id	== '') ? 'null' : my_transport_id	;

	var my_set = ''
		+          '  dyer_id=  ' + my_dyer_id
		+     ', transport_id=  ' + my_transport_id
		+    ', truck_license=\'' + JKY.get_value	('jky-truck-license'	) + '\''
		+       ', shipped_at=  ' + JKY.inp_time	('jky-shipped-date'		)
		+     ', delivered_at=  ' + JKY.inp_time	('jky-delivered-date'	)
		+        ', unit_name=\'' + JKY.get_value	('jky-unit-name'		) + '\''
		+       ', brand_name=\'' +	JKY.get_value	('jky-brand-name'		) + '\''
		+       ', batch_code=\'' +	JKY.get_value	('jky-batch-code'		) + '\''
		+         ', quantity=  ' +	JKY.get_value	('jky-quantity'			)
		+     ', gross_weight=  ' +	JKY.get_value	('jky-gross-weight'		)
		+       ', net_weight=  ' +	JKY.get_value	('jky-net-weight'		)
		+      ', sds_printed=  ' + JKY.get_value	('jky-sds-printed'		)
		;
	return my_set;
}

JKY.get_dyer_id = function() {
	return JKY.get_value('jky-dyer-id');
}

JKY.get_dyer_name = function() {
	return JKY.get_value('jky-dyer-name');
}

/**
 *	set calculated transport
 */
JKY.set_calculated_transport = function() {
	var my_gross_weight	= parseFloat(JKY.get_value('jky-gross-weight'	));
	var my_net_weight	= parseFloat(JKY.get_value('jky-net-weight'		));
	JKY.set_css('jky-net-weight', 'color', (my_gross_weight > my_net_weight) ? 'red' : 'black');
}

JKY.display_form = function() {
	JKY.show('jky-action-print');
};

/* -------------------------------------------------------------------------- */
JKY.invoice_dyer = function() {
	var my_error = '';

	var my_dyer_id = JKY.get_value('jky-dyer-id');
	if(!my_dyer_id)			my_error += '<br>' + JKY.t('because there is not Dyer selected');

	var my_transport_id = JKY.get_value('jky-transport-id');
	if(!my_transport_id)	my_error += '<br>' + JKY.t('because there is not Transporter selected');

	var my_quantity = JKY.get_value_by_id('ShipDyers', 'quantity', JKY.row.id);
	if (my_quantity <= 0)	my_error += '<br>' + JKY.t('because there is not Quantity defined');

	if (my_error != '') {
		JKY.display_message(JKY.t('Invoice cannot be generated'));
		JKY.display_message(my_error);
		return;
	}

	var my_data =
		{ method	: 'invoice'
		, table		: 'Dyer'
		, id		:  JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.refresh_form = function(response) {
	JKY.display_message('Invoice row generated: ' + JKY.row.id);
	JKY.App.display_row();
}

/**
 * print row
 */
JKY.print_row = function(the_id) {
	JKY.display_message('print_row: ' + the_id);
return;
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
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span> FTP Number</span>:</td><td id='jky-print-ftp-number'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Product</span>:</td><td id='jky-print-product-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Composition</span>:</td><td id='jky-print-composition'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Machine</span>:</td><td id='jky-print-machine-name'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	 Nick Name</span>:</td><td id='jky-print-nick-name'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

//		+ "<td id='jky-print-drawing' width=20%></td>"
//		+ "<td id='jky-print-photo'   width=20%></td>"

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

	JKY.set_html('jky-print-ftp-number'		, my_row.ftp_number		);
	JKY.set_html('jky-print-start-date'		, my_row.start_date		);
	JKY.set_html('jky-print-product-name'	, my_row.product_name	);
	JKY.set_html('jky-print-composition'	, my_row.composition	);
	JKY.set_html('jky-print-machine-name'	, my_row.machine_name	);
	JKY.set_html('jky-print-collection'		, my_row.collections	);
	JKY.set_html('jky-print-nick-name'		, my_row.nick_name		);
/*
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
*/
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
