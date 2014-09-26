"use strict";

/**
 * checkouts.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'CheckOuts'
		, table_name	: 'CheckOuts'
		, specific		: ''
		, select		: JKY.checkout.select
		, filter		: ''
		, sort_by		: 'number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-machine-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-requested-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-checkout-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-requested-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-checkout-date'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-tab-batches'	).click (function() {JKY.display_batches	();});
	$('#jky-batches-add-new').click (function() {JKY.insert_batch		();});

	$('#jky-boxes-print'	).click (function() {JKY.Batch.print()});

	$('#jky-machine-name'	).change(function() {JKY.clear_produced_by("machine"	);});
	$('#jky-partner-name'	).change(function() {JKY.clear_produced_by("partner"	);});
	$('#jky-supplier-name'	).change(function() {JKY.clear_produced_by("supplier"	);});
	$('#jky-dyer-name'		).change(function() {JKY.clear_produced_by("dyer"		);});
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-machine'	, '../JKY.Search.Machine.html'	);
	JKY.append_file('jky-load-partner'	, '../JKY.Search.Partner.html'	);
	JKY.append_file('jky-load-supplier'	, '../JKY.Search.Supplier.html'	);
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-batchin'	, '../JKY.Search.BatchIn.html'	);

	JKY.set_side_active('jky-threads-checkouts');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.checkout.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
//	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
//	JKY.set_html('jky-partner-name' , JKY.set_options_array('', JKY.get_companies('is_partner'	), true));
//	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'	), true));
//	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'		), true));

	$('#jky-machine-filter'		).KeyUpDelay(JKY.Machine.load_data	);
	$('#jky-partner-filter'		).KeyUpDelay(JKY.Partner.load_data	);
	$('#jky-supplier-filter'	).KeyUpDelay(JKY.Supplier.load_data	);
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer.load_data		);
	$('#jky-thread-filter'		).KeyUpDelay(JKY.Thread.load_data	);
	$('#jky-batchin-filter'		).KeyUpDelay(JKY.BatchIn.load_data	);

	$('#jky-requested-weight').ForceNumericOnly();
	$('#jky-checkout-weight' ).ForceNumericOnly();
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.number					+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.partner_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-td-weight"	>' + JKY.fix_null	(the_row.checkout_weight	)	+ '</td>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
		JKY.enable_delete_button();
		JKY.enable_button ('jky-batches-add-new');
	}else{
		JKY.disable_button('jky-action-close'	);
		JKY.disable_delete_button();
		JKY.disable_button('jky-batches-add-new');
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status			));
	JKY.set_value	('jky-checkout-number'	,				 the_row.number			);
	JKY.set_value	('jky-machine-id'		,				 the_row.machine_id		);
	JKY.set_value	('jky-machine-name'		,				 the_row.machine_name	);
	JKY.set_value	('jky-partner-id'		,				 the_row.partner_id		);
	JKY.set_value	('jky-partner-name'		,				 the_row.partner_name	);
	JKY.set_value	('jky-supplier-id'		,				 the_row.supplier_id	);
	JKY.set_value	('jky-supplier-name'	,				 the_row.supplier_name	);
	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id		);
	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name		);
	JKY.set_value	('jky-nfe-dl'			,				 the_row.nfe_dl);
	JKY.set_value	('jky-nfe-tm'			,				 the_row.nfe_tm);
	JKY.set_date	('jky-requested-date'	, JKY.out_time	(the_row.requested_at		));
	JKY.set_value	('jky-requested-weight'	,				 the_row.requested_weight	);
//	JKY.set_value	('jky-requested-amount'	,				 the_row.requested_amount	);
	JKY.set_date	('jky-checkout-date'	, JKY.out_time(the_row.checkout_at			));
	JKY.set_value	('jky-checkout-weight'	,				 the_row.checkout_weight	);
//	JKY.set_value	('jky-checkout-amount'	,				 the_row.checkout_amount	);

	JKY.set_calculated_color();
	JKY.display_batches();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-checkout-number'	,  JKY.t('New'));
	JKY.set_value	('jky-machine-id'		, '');
	JKY.set_value	('jky-machine-name'		, '');
	JKY.set_value	('jky-partner-id'		, '');
	JKY.set_value	('jky-partner-name'		, '');
	JKY.set_value	('jky-supplier-id'		, '');
	JKY.set_value	('jky-supplier-name'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_value	('jky-nfe-dl'			, '');
	JKY.set_value	('jky-nfe-tm'			, '');
	JKY.set_date	('jky-requested-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-requested-weight'	,  0);
//	JKY.set_value	('jky-requested-amount'	,  0);
	JKY.set_date	('jky-checkout-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-checkout-weight'	,  0);
//	JKY.set_value	('jky-checkout-amount'	,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_machine_id	= JKY.get_value('jky-machine-id'	);
	var my_partner_id	= JKY.get_value('jky-partner-id'	);
	var my_supplier_id	= JKY.get_value('jky-supplier-id'	);
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
	my_machine_id	= (my_machine_id	== '') ? 'null' : my_machine_id	;
	my_partner_id	= (my_partner_id	== '') ? 'null' : my_partner_id	;
	my_supplier_id	= (my_supplier_id	== '') ? 'null' : my_supplier_id;
	my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;

	var my_set = ''
		+      '  machine_id=  ' + my_machine_id
		+      ', partner_id=  ' + my_partner_id
		+     ', supplier_id=  ' + my_supplier_id
		+         ', dyer_id=  ' + my_dyer_id
		+          ', nfe_dl=\'' + JKY.get_value('jky-nfe-dl'			) + '\''
		+          ', nfe_tm=\'' + JKY.get_value('jky-nfe-tm'			) + '\''
		+    ', requested_at=  ' + JKY.inp_time	('jky-requested-date'	)
		+     ', checkout_at=  ' + JKY.inp_time ('jky-checkout-date'	)
//		+', requested_weight=  ' + JKY.get_value('jky-requested-weight'	)
//		+', requested_amount=  ' + JKY.get_value('jky-requested-amount'	)
		;
	return my_set;
}

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'BatchOuts'
		, where : 'BatchOuts.checkout_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.clear_produced_by = function(the_name) {
	if (the_name != 'machine') {
		JKY.set_value('jky-machine-id', null);
		JKY.set_value('jky-machine-name', '');
	}
	if (the_name != 'partner') {
		JKY.set_value('jky-partner-id', null);
		JKY.set_value('jky-partner-name', '');
	}
	if (the_name != 'supplier') {
		JKY.set_value('jky-supplier-id', null);
		JKY.set_value('jky-supplier-name', '');
	}
	if (the_name != 'dyer') {
		JKY.set_value('jky-dyer-id', null);
		JKY.set_value('jky-dyer-name', '');
	}
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_requested_weight	= parseFloat(JKY.get_value('jky-requested-weight'	));
	var my_checkout_weight	= parseFloat(JKY.get_value('jky-checkout-weight'	));
	JKY.set_css('jky-checkout-weight', 'color', (my_requested_weight > my_checkout_weight) ? 'red' : 'black');
}
