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
		, program_name	: 'Thread Dyers'
		, table_name	: 'TDyers'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'tdyer_number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-ordered-value'
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
	$('#jky-ordered-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-needed-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-checkout-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-returned-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-ordered-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-needed-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-checkout-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-returned-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-ordered-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-needed-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-checkout-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-returned-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-threads-add-new').click (function()	{JKY.insert_thread();});

	$('#jky-action-product'		).click (function() {JKY.display_product	();});
	$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
	$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-order'	, '../JKY.Search.Order.html'	);
	JKY.append_file('jky-load-customer'	, '../JKY.Search.Customer.html'	);
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-batchin'	, '../JKY.Search.BatchIn.html'	);
	JKY.append_file('jky-load-color'	, '../JKY.Search.Color.html'	);

	JKY.set_side_active('jky-planning-tdyers');
//	JKY.set_html('jky-ordered-name' , JKY.set_table_options('Machines', 'name', '', ''));
//	JKY.set_html('jky-customer-name', JKY.set_options_array('', JKY.get_companies('is_customer'), true));
//	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
	JKY.show('jky-action-print');
//	JKY.materials	= JKY.get_configs	('Materials'	);
//	JKY.threads		= JKY.get_ids		('Threads'		);
//	JKY.settings	= JKY.get_configs	('Settings'		);
//	JKY.suppliers	= JKY.get_companies	('is_supplier'	);

	$('#jky-order-filter'		).KeyUpDelay(JKY.Order.load_data );
	$('#jky-customer-filter'	).KeyUpDelay(JKY.Customer.load_data);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer.load_data );
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data);
	$('#jky-batchin-filter'		).KeyUpDelay(JKY.BatchIn.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data);
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-tdyer-number"	>' +				 the_row.tdyer_number			+ '</td>'
		+  '<td class="jky-order-number"	>' + JKY.fix_null	(the_row.order_number		)	+ '</td>'
		+  '<td class="jky-customer-name"	>' + JKY.fix_null	(the_row.customer_name		)	+ '</td>'
		+  '<td class="jky-dyer-name"		>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-ordered-date"	>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-needed-date"		>' + JKY.short_date	(the_row.needed_at			)	+ '</td>'
		+  '<td class="jky-checkout-date"	>' + JKY.short_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-returned-date"	>' + JKY.short_date	(the_row.returned_at		)	+ '</td>'
		+  '<td class="jky-ordered-weight"	>' +				 the_row.ordered_weight			+ '</td>'
		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-returned-weight"	>' +				 the_row.returned_weight		+ '</td>'
		+  '</tr>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-tdyer-number'		, the_row.tdyer_number	);
	JKY.set_value	('jky-order-id'			, the_row.order_id		);
	JKY.set_value	('jky-order-number'		, the_row.order_number	);
	JKY.set_value	('jky-customer-id'		, the_row.customer_id	);
	JKY.set_value	('jky-customer-name'	, the_row.customer_name	);
	JKY.set_value	('jky-dyer-id'			, the_row.dyer_id		);
	JKY.set_value	('jky-dyer-name'		, the_row.dyer_name		);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-needed-date'		, JKY.out_time(the_row.needed_at	));
	JKY.set_date	('jky-checkout-date'	, JKY.out_time(the_row.checkout_at	));
	JKY.set_date	('jky-returned-date'	, JKY.out_time(the_row.returned_at	));
	JKY.set_value	('jky-ordered-weight'	, the_row.ordered_weight	);
	JKY.set_value	('jky-checkout-weight'	, the_row.checkout_weight	);
	JKY.set_value	('jky-returned-weight'	, the_row.returned_weight	);
	JKY.set_value	('jky-remarks'			, JKY.row.remarks			);
	JKY.display_threads();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-tdyer-number'		, JKY.t('New'));
	JKY.set_value	('jky-order-id'			, '');
	JKY.set_value	('jky-order-number'		, '');
	JKY.set_value	('jky-customer-id'		, '');
	JKY.set_value	('jky-customer-name'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_date	('jky-ordered-date'		, JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-needed-date'		, JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-ordered-weight'	, 0);
	JKY.set_value	('jky-checkout-weight'	, 0);
	JKY.set_value	('jky-returned-weight'	, 0);
	JKY.set_value	('jky-remarks'			, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_order_id		= JKY.get_value('jky-order-id'		);
	var my_customer_id	= JKY.get_value('jky-customer-id'	);
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
		my_order_id		= (my_order_id		== '') ? 'null' : my_order_id	;
		my_customer_id	= (my_customer_id	== '') ? 'null' : my_customer_id;
		my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;

	var my_set = ''
		+          'order_id=  ' + my_order_id
		+     ', customer_id=  ' + my_customer_id
		+         ', dyer_id=  ' + my_dyer_id
		+      ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'	))
		+       ', needed_at=  ' + JKY.inp_time(JKY.get_value('jky-needed-value'	))
		+     ', checkout_at=  ' + JKY.inp_time(JKY.get_value('jky-checkout-value'))
		+     ', returned_at=  ' + JKY.inp_time(JKY.get_value('jky-returned-value'))
		+  ', ordered_weight=  ' + JKY.get_value	('jky-ordered-weight'	)
		+ ', checkout_weight=  ' + JKY.get_value	('jky-checkout-weight'	)
		+ ', returned_weight=  ' + JKY.get_value	('jky-returned-weight'	)
		+		  ', remarks=\'' + JKY.get_value	('jky-remarks'			) + '\''
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
