"use strict";

/**
 * requests.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Requests'
		, table_name	: 'Requests'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-source-doc'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-requested-value').attr('data-format', JKY.Session.get_date		());
	$('#jky-scheduled-value').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-ordered-at'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-requested-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-at'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-planning-requests');
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
		+  '<td class="jky-source-doc"		>' +				 the_row.source_doc				+ '</td>'
		+  '<td class="jky-ordered-at"		>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.out_date	(the_row.requested_date		)	+ '</td>'
		+  '<td class="jky-scheduled-at"	>' + JKY.short_date	(the_row.scheduled_at		)	+ '</td>'
		+  '<td class="jky-requested-weight">' +				 the_row.requested_weight		+ '</td>'
		+  '<td class="jky-checkout-weight"	>' +				 the_row.checkout_weight		+ '</td>'
		+  '<td class="jky-machine-name"	>' + JKY.fix_null	(the_row.machine_name		)	+ '</td>'
		+  '<td class="jky-supplier-name"	>' + JKY.fix_null	(the_row.supplier_name		)	+ '</td>'
		+  '<td class="jky-supplier-ref"	>' +				 the_row.supplier_ref			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-number'			, the_row.number		);
	JKY.set_value	('jky-source-doc'		, the_row.source_doc	);
	JKY.set_date	('jky-ordered-at'		, JKY.out_time(the_row.ordered_at	));
	JKY.set_date	('jky-requested-date'	, JKY.out_date(the_row.requested_date));
	JKY.set_date	('jky-scheduled-at'		, JKY.out_time(the_row.scheduled_at	));
	JKY.set_option	('jky-machine-name'		, the_row.machine_id	);
	JKY.set_option	('jky-supplier-name'	, the_row.supplier_id	);
	JKY.set_value	('jky-supplier-ref'		, the_row.supplier_ref	);

	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-number'			,  JKY.t('New'));
	JKY.set_value	('jky-source-doc'		, '');
	JKY.set_date	('jky-ordered-at'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-requested-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-scheduled-at'		, '');
	JKY.set_option	('jky-machine-name'		, '');
	JKY.set_option	('jky-supplier-name'	, '');
	JKY.set_value	('jky-supplier-ref'		, '');
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
		+      'source_doc=\'' + JKY.get_value	('jky-source-doc'		) + '\''
		+    ', ordered_at=  ' + JKY.inp_time(JKY.get_value('jky-ordered-value'		))
		+ ', requested_date= ' + JKY.inp_date(JKY.get_value('jky-requested-value'	))
		+  ', scheduled_at=  ' + JKY.inp_time(JKY.get_value('jky-scheduled-value'	))
		+    ', machine_id=  ' + my_machine_id
		+   ', supplier_id=  ' + my_supplier_id
		+  ', supplier_ref=\'' + JKY.get_value	('jky-supplier-ref'		) + '\''
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'ReqLines'
		, where : 'request_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};