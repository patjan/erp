"use strict";

/**
 * incomings.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Incomings'
		, table_name	: 'Incomings'
		, specific		: ''
		, select		: JKY.incoming.select
		, filter		: ''
		, sort_by		: 'incoming_number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-supplier-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-received-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-invoice-value'	).attr('data-format', JKY.Session.get_date		());
	$('#jky-received-time'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-invoice-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-batches-add-new').click (function() {JKY.insert_batch		();});
	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	$('#jky-boxes-print'	).click (function() {JKY.Batch.print()});
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-incomings');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.incoming.select, 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_invoice_weight	= parseFloat(the_row.invoice_weight	);
	var my_received_weight	= parseFloat(the_row.received_weight);
	var my_class = (my_invoice_weight == my_received_weight) ? '' : ' jky-error';

	var my_html = ''
		+  '<td class="jky-incoming-number"	>' +				 the_row.incoming_number	+ '</td>'
		+  '<td class="jky-supplier-name"	>' +				 the_row.supplier_name		+ '</td>'
		+  '<td class="jky-nfe-dl"			>' + JKY.fix_null	(the_row.nfe_dl			)	+ '</td>'
		+  '<td class="jky-nfe-tm"			>' + JKY.fix_null	(the_row.nfe_tm			)	+ '</td>'
		+  '<td class="jky-invoice-date"	>' + JKY.out_date	(the_row.invoice_date	) 	+ '</td>'
		+  '<td class="jky-received-date"	>' + JKY.short_date	(the_row.received_at	)	+ '</td>'
		+  '<td class="jky-invoice-weight"	>' +				 the_row.invoice_weight		+ '</td>'
		+  '<td class="jky-received-weight' + my_class + '"	>' + the_row.received_weight	+ '</td>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-batches-add-new');
	}else{
		JKY.disable_button('jky-action-close'	);
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-batches-add-new');
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status			));
	JKY.set_value	('jky-incoming-number'	,				 the_row.incoming_number);
	JKY.set_date	('jky-received-date'	, JKY.out_time	(the_row.received_at	));
	JKY.set_option	('jky-supplier-name'	,				 the_row.supplier_id	);
	JKY.set_value	('jky-nfe-dl'			,				 the_row.nfe_dl			);
	JKY.set_value	('jky-nfe-tm'			,				 the_row.nfe_tm			);
	JKY.set_date	('jky-invoice-date'		, JKY.out_date	(the_row.invoice_date	));
	JKY.set_value	('jky-invoice-weight'	,				 the_row.invoice_weight	);
	JKY.set_value	('jky-invoice-amount'	,				 the_row.invoice_amount	);
	JKY.set_value	('jky-received-weight'	,				 the_row.received_weight);
	JKY.set_value	('jky-received-amount'	,				 the_row.received_amount);

	JKY.set_calculated_color();
	JKY.display_batches();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-incoming-number'	,  JKY.t('New'));
	JKY.set_date	('jky-received-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_option	('jky-supplier-name'	, '');
	JKY.set_value	('jky-nfe-dl'			, '');
	JKY.set_value	('jky-nfe-tm'			, '');
	JKY.set_date	('jky-invoice-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-invoice-weight'	,  0);
	JKY.set_value	('jky-invoice-amount'	,  0);
	JKY.set_value	('jky-received-weight'	,  0);
	JKY.set_value	('jky-received-amount'	,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_supplier_id = JKY.get_value('jky-supplier-name');
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+     'received_at=  ' + JKY.inp_time(JKY.get_value('jky-received-value'	))
		+   ', supplier_id=  ' + my_supplier_id
		+		 ', nfe_dl=\'' +			  JKY.get_value('jky-nfe-dl'			) + '\''
		+		 ', nfe_tm=\'' +			  JKY.get_value('jky-nfe-tm'			) + '\''
		+  ', invoice_date=  ' + JKY.inp_date(JKY.get_value('jky-invoice-value'		))
		+', invoice_weight=  ' +			  JKY.get_value('jky-invoice-weight'	)
		+', invoice_amount=  ' +			  JKY.get_value('jky-invoice-amount'	)
		;
	return my_set;
}

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Batches'
		, where : 'incoming_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_invoice_weight	= parseFloat(JKY.get_value('jky-invoice-weight'	));
	var my_invoice_amount	= parseFloat(JKY.get_value('jky-invoice-amount'	));
	var my_received_weight	= parseFloat(JKY.get_value('jky-received-weight'));
	var my_received_amount	= parseFloat(JKY.get_value('jky-received-amount'));
	JKY.set_css('jky-received-amount', 'color', (Math.abs(my_invoice_amount - my_received_amount) > 0.021) ? 'red' : 'black');
	JKY.set_css('jky-received-weight', 'color', (Math.abs(my_invoice_weight - my_received_weight) > 0.021) ? 'red' : 'black');
}