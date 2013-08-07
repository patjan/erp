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
		, select		: ''
		, filter		: ''
		, sort_by		: 'number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-machine-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-checkout-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-requested-value').attr('data-format', JKY.Session.get_date		());
	$('#jky-checkout-time'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-requested-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-checkout-time'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});
	$('#jky-requested-date'	).on('changeDate', function()	{JKY.Application.process_change_input(this);});

	$('#jky-tab-batches'	).click (function() {JKY.display_batches	();});
	$('#jky-batch-add-new'	).click (function() {JKY.insert_batch		();});
	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	$('#jky-boxes-print'	).click (function() {JKY.Batch.print()});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-threads-checkouts');
	JKY.set_html('jky-machine-name' , JKY.set_table_options('Machines', 'name', '', ''));
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), true));
//	JKY.set_html('jky-app-select-label', JKY.t('Type'));
//	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-number"			>' +				 the_row.number					+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.out_date	(the_row.requested_date		)	+ '</td>'
		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-checkout-time"	>' + JKY.short_date	(the_row.checkout_at		)	+ '</td>'
		+  '<td class="jky-checkout-weight"	>' + JKY.fix_null	(the_row.checkout_weight	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-number'			, the_row.number		);
	JKY.set_date	('jky-checkout-time'	, JKY.out_time(the_row.checkout_at));
	JKY.set_option	('jky-machine-name'		, the_row.machine_id	);
	JKY.set_option	('jky-supplier-name'	, the_row.supplier_id	);
	JKY.set_value	('jky-nfe-dl'			, the_row.nfe_dl);
	JKY.set_value	('jky-nfe-tm'			, the_row.nfe_tm);
	JKY.set_date	('jky-requested-date'	, JKY.out_date(the_row.requested_date));
	JKY.set_value	('jky-requested-weight'	, the_row.requested_weight);
//	JKY.set_value	('jky-requested-amount'	, the_row.requested_amount);
	JKY.set_value	('jky-checkout-weight'	, the_row.checkout_weight);
//	JKY.set_value	('jky-checkout-amount'	, the_row.checkout_amount);

	JKY.set_calculated_color();
	JKY.display_batches();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-number'			,  JKY.t('New'));
	JKY.set_date	('jky-checkout-time'	,  JKY.out_time(JKY.get_now()));
	JKY.set_option	('jky-machine-name'		, '');
	JKY.set_option	('jky-supplier-name'	, '');
	JKY.set_value	('jky-nfe-dl'			, '');
	JKY.set_value	('jky-nfe-tm'			, '');
	JKY.set_date	('jky-requested-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-requested-weight'	,  0);
//	JKY.set_value	('jky-requested-amount'	,  0);
	JKY.set_value	('jky-checkout-weight'	,  0);
//	JKY.set_value	('jky-checkout-amount'	,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_machine_id  = JKY.get_value('jky-machine-name' );
	var my_supplier_id = JKY.get_value('jky-supplier-name');
	my_machine_id  = (my_machine_id  == '') ? 'null' : my_machine_id ;
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+       'checkout_at=  ' + JKY.inp_time(JKY.get_value('jky-checkout-value'	))
		+      ', machine_id=  ' + my_machine_id
		+     ', supplier_id=  ' + my_supplier_id
		+          ', nfe_dl=\'' +				JKY.get_value('jky-nfe-dl'			) + '\''
		+          ', nfe_tm=\'' +				JKY.get_value('jky-nfe-tm'			) + '\''
		+  ', requested_date=  ' + JKY.inp_date(JKY.get_value('jky-requested-value'	))
		+', requested_weight=  ' +				JKY.get_value('jky-requested-weight')
//		+', requested_amount=  ' +				JKY.get_value('jky-requested-amount')
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'BatchOuts'
		, where : 'BatchOuts.checkout_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_requested_weight	= parseFloat(JKY.get_value('jky-requested-weight'	));
//	var my_requested_amount	= parseFloat(JKY.get_value('jky-requested-amount'	));
	var my_checkout_weight	= parseFloat(JKY.get_value('jky-checkout-weight'	));
//	var my_checkout_amount	= parseFloat(JKY.get_value('jky-checkout-amount'	));
	JKY.set_css('jky-requested-weight', 'color', (my_requested_weight == my_checkout_weight) ? 'black' : 'red');
//	JKY.set_css('jky-requested-amount', 'color', (my_requested_amount == my_checkout_amount) ? 'black' : 'red');
}