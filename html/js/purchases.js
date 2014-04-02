"use strict";

/**
 * purchases.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Purchases'
		, table_name	: 'Purchases'
		, specific		: ''
		, select		: JKY.purchase.select
		, filter		: ''
		, sort_by		: 'purchase_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-source-doc'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-ordered-date	input').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-expected-date	input').attr('data-format', JKY.Session.get_date		());
	$('#jky-scheduled-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-ordered-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-expected-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-scheduled-date'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-generate').click( function() {JKY.generate_purchase		();});
	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-lines-add-new'	).click (function() {JKY.insert_line			();});

	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);

	JKY.show('jky-action-graph');

	JKY.set_side_active('jky-threads-purchases');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.purchase.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.set_html('jky-supplier-name', JKY.set_options_array('', JKY.get_companies('is_supplier'), false));
//	JKY.set_html('jky-payment-term'	, JKY.set_configs('Payment Terms', '', ''));
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.purchase_number	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.source_doc			+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.ordered_at		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.expected_date	)	+ '</td>'
//		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.scheduled_at	)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.expected_weight	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.received_weight	+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.supplier_name		+ '</td>'
//		+  '<td class="jky-td-name-s"	>' +				 the_row.supplier_ref		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status			));
	JKY.set_value	('jky-purchase-number'	,				 the_row.purchase_number);
	JKY.set_value	('jky-source-doc'		,				 the_row.source_doc		);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at		));
	JKY.set_date	('jky-expected-date'	, JKY.out_date	(the_row.expected_date	));
//	JKY.set_date	('jky-scheduled-date'	, JKY.out_time	(the_row.scheduled_at	));
	JKY.set_option	('jky-supplier-name'	,				 the_row.supplier_id	);
//	JKY.set_value	('jky-supplier-ref'		,				 the_row.supplier_ref	);
//	JKY.set_option	('jky-payment-term'		,				 the_row.payment_term	);
	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-purchase-number'	,  JKY.t('New'));
	JKY.set_value	('jky-source-doc'		, '');
	JKY.set_date	('jky-ordered-date'		,  JKY.out_time(JKY.get_now ()));
//	JKY.set_date	('jky-expected-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-scheduled-date'	, '');
	JKY.set_option	('jky-supplier-name'	, '');
//	JKY.set_value	('jky-supplier-ref'		, '');
//	JKY.set_option	('jky-payment-term'		, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_supplier_id = JKY.get_value('jky-supplier-name');
	my_supplier_id = (my_supplier_id == '') ? 'null' : my_supplier_id;

	var my_set = ''
		+    '  source_doc=\'' + JKY.get_value	('jky-source-doc'		) + '\''
		+    ', ordered_at=  ' + JKY.inp_time	('jky-ordered-date'		)
		+ ', expected_date=  ' + JKY.inp_date	('jky-expected-date'	)
//		+  ', scheduled_at=  ' + JKY.inp_time	('jky-scheduled-date'	)
		+   ', supplier_id=  ' + my_supplier_id
//		+  ', supplier_ref=\'' + JKY.get_value('jky-supplier-ref'		) + '\''
//		+  ', payment_term=\'' + JKY.get_value('jky-payment-term'		) + '\''
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'PurchaseLines'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/* -------------------------------------------------------------------------- */
JKY.generate_purchase = function() {
	var my_supplier_id = JKY.get_value_by_id('Purchases', 'supplier_id', JKY.row.id);
	if (my_supplier_id == null) {
		JKY.display_message('Incoming cannot be generated');
		JKY.display_message('because Supplier is not selected');
		return;
	}

	var my_expected_weight = JKY.get_value_by_id('Purchases', 'expected_weight', JKY.row.id);
	if (my_expected_weight <= 0) {
		JKY.display_message('Incoming cannot be generated');
		JKY.display_message('because there is not any Expected Weight');
		return;
	}

	var my_rows = JKY.get_rows('PurchaseLines', JKY.row.id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		if (my_row.thread_id == null) {
			JKY.display_message('Incoming cannot be generated');
			JKY.display_message('because there is unselected Thread');
			return;
		}
	}

	var my_data =
		{ method	: 'generate'
		, table		: 'Purchase'
		, id		: JKY.row.id
		}
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Purchase row generated: ' + JKY.row.id);
	JKY.App.display_row();
};

JKY.display_graph = function() {
	JKY.show('jky-loading');
	var my_data =
		{ method	: 'get_index'
		, table		: JKY.App.get('table_name')
		, specific	: JKY.App.get('specific')
		, select	: JKY.App.get('select')
		, filter	: JKY.App.get('filter')
		, display	: JKY.App.get('display')
		, order_by	: 'expected_date'
		, group_by	: 'expected_date'
		};
	JKY.ajax(false, my_data, JKY.display_graph_success);
}

/**
JKY.display_graph_success = function(response) {
	$('#jky-graph-body').html('');
	JKY.Graph = JKY.D3;
	JKY.Graph.setArgs(
		{ id_name		: 'jky-graph-body'
		, graph_name	: 'dual_bar'
		, axis_name		: 'expected_date'
		, var1_name		: 'expected_weight'
		, var2_name		: 'received_weight'
		, round_up		: 200
		, chart_width	: 500
		, chart_height	:   0
		});
	JKY.Graph.draw(response.rows);
	JKY.hide('jky-loading');
}
**/

JKY.display_graph_success = function(response) {
    $('#jky-graph-body').html('');
    JKY.Graph = JKY.D3;
    JKY.Graph.setArgs(
        { id_name		: 'jky-graph-body'
            , graph_name	: 'donut'
            , axis_name		: 'expected_date'
            , var1_name		: 'expected_weight'
            , var2_name		: 'received_weight'
            , round_up		: 200
            , chart_width	: 960
            , chart_height	: 500
        });
    JKY.Graph.draw(response.rows);
    JKY.hide('jky-loading');
}