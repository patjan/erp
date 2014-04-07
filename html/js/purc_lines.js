"use strict";

/**
 * purc_lines.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Purchase Lines'
		, table_name	: 'PurchaseLines'
		, specific		: ''
		, select		: JKY.purchase.select
		, filter		: ''
		, sort_by		: 'expected_date'
		, sort_seq		: 'ASC'
		, sort_list		: [[5, 0]]
		, focus			: 'jky-scheduled-value'
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
	$('#jky-received-date	input').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-scheduled-date	input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-ordered-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-expected-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-received-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-scheduled-date'	).datetimepicker({language: JKY.Session.get_locale()});

//	$('#jky-action-batch'	).click( function() {JKY.generate_batch();})
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.show('jky-action-graph');
	JKY.set_side_active('jky-threads-purc-lines');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.purchase.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');

	JKY.hide	('jky-action-form');

	$('#jky-expected-weight').ForceNumericOnly();
	$('#jky-received-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.purchase_number		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.supplier_name			+ '</td>'
		+  '<td class="jky-td-name-l"	>' + JKY.fix_null   (the_row.thread_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.ordered_at			)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.expected_date		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.received_at		) 	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.scheduled_at		)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.expected_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' + JKY.fix_null	(the_row.received_weight	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.disable_button('jky-action-delete'  );

	JKY.set_value	('jky-purchase-number'	,				 the_row.purchase_number);
	JKY.set_value	('jky-supplier-name'	,				 the_row.supplier_name	);
	JKY.set_value	('jky-thread-name'		,				 the_row.thread_name	);
	JKY.set_date	('jky-ordered-date'		, JKY.out_time	(the_row.ordered_at		));
	JKY.set_date	('jky-expected-date'	, JKY.out_date	(the_row.expected_date	));
	JKY.set_date	('jky-received-date'	, JKY.out_time	(the_row.received_at	));
	JKY.set_date	('jky-scheduled-date'	, JKY.out_time	(the_row.scheduled_at	));
	JKY.set_value	('jky-expected-weight'	,				 the_row.expected_weight);
	JKY.set_value	('jky-received-weight'	,				 the_row.received_weight);
//	JKY.display_lines();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-purchase-number'	,  JKY.t('New'));
	JKY.set_value	('jky-supplier-name'	, '');
	JKY.set_value	('jky-thread-name'		, '');
	JKY.set_date	('jky-ordered-date'		,  JKY.out_time(JKY.get_now ()));
	JKY.set_date	('jky-expected-date'	,  JKY.out_date(JKY.get_date()));
	JKY.set_date	('jky-received-date'	, '');
	JKY.set_date	('jky-scheduled-date'	, '');
	JKY.set_value	('jky-expected-weight'	, '');
	JKY.set_value	('jky-received-weight'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
//		+       'source_doc=\'' + JKY.get_value('jky-source-doc'		) + '\''
//		+     ', ordered_at=  ' + JKY.inp_time ('jky-ordered-date'		)
		+   ' expected_date=  ' + JKY.inp_date ('jky-expected-date'		)
		+', expected_weight=  ' + JKY.get_value('jky-expected-weight'	)
		+   ', scheduled_at=  ' + JKY.inp_time ('jky-scheduled-date'	)
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

JKY.Xgenerate_batch = function() {
	JKY.insert_incoming();
}

JKY.Xinsert_incoming = function() {
	var my_invoice_date = JKY.row.expected_date;
	if (my_invoice_date == null) {
		my_invoice_date = JKY.get_date();
	}
	var my_set = ''
		+   '  supplier_id=  ' + JKY.row.supplier_id
		+        ', nfe_dl=\'' + '' + '\''
		+        ', nfe_tm=\'' + '' + '\''
		+  ', invoice_date=\'' + my_invoice_date + '\''
		+', invoice_weight=  ' + JKY.row.expected_weight
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Incomings'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.insert_batch);
}

JKY.Xinsert_batch = function(response) {
	var my_set = ''
		+     '  incoming_id=  ' + response.id
		+       ', thread_id=  ' + JKY.row.thread_id
		+', purchase_line_id=  ' + JKY.row.id
		+            ', code=\'' + '' + '\''
		+           ', batch=\'' + '' + '\''
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Batches'
		, set		:  my_set
		};
	JKY.ajax(false, my_data, JKY.connect_batch);
}

JKY.Xconnect_batch = function(response) {
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		: 'batch_id = ' + response.id
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
}

JKY.Xrefresh_form = function(response) {
	JKY.display_message('Batch row generated');
	JKY.App.display_row();
}

JKY.display_graph = function() {
	JKY.show('jky-loading');
	var my_data =
		{ method	: 'get_index'
		, table		: JKY.App.get('table_name')
		, specific	: JKY.App.get('specific')
		, select	: JKY.App.get('select')
		, filter	: JKY.App.get('filter')
		, display	: JKY.App.get('display')
//		, order_by	: 'expected_date'
//		, group_by	: 'expected_date'
		};
	JKY.ajax(false, my_data, JKY.display_graph_success);
}

JKY.display_graph_success = function(response) {
	var my_rows	= response.rows;

//	sum all [expected_weight] by [expected_date]
	var sum_by_expected_date = d3.nest()
		.key	(function(d)	{return d.expected_date ? d.expected_date.substr(5,5) : 'unknown';})
		.sortKeys(d3.ascending)
		.rollup	(function(d)	{return	{expected_weight:d3.sum(d, function(g)	{return +g.expected_weight ;})};})
		.entries(my_rows)
		;
//	JKY.var_dump('sum_by_expected_date', sum_by_expected_date);

//	sum all [received_weight] by [received_date]
	var sum_by_received_date = d3.nest()
		.key	(function(d)	{return d.received_at ? d.received_at.substr(5,5) : 'unknown';})
		.sortKeys(d3.ascending)
		.rollup	(function(d) 	{return	{received_weight:d3.sum(d, function(g)	{return +g.received_weight;})};})
		.entries(my_rows)
		;
//	JKY.var_dump('sum_by_received_date', sum_by_received_date);

	var merged_array = [];
	var get_index = function(the_key) {
		var j = merged_array.length;
		if (j > 0) {
			for(j in merged_array) {
				var my_key = merged_array[j].key;
				if (my_key == the_key)		{return j;}
				if (my_key >  the_key)	 	{j=parseInt(j)-1; break;}
			}
			j=parseInt(j)+1;
		}
		var my_row = {'key':the_key, 'expected_weight':0, 'received_weight':0};
		merged_array.splice(j, 0, my_row);
		return j;
	}

//	merge all [expected_weight] by [expected_date]
	for(var i in sum_by_expected_date) {
		var my_row = sum_by_expected_date[i];
		if (my_row.values.expected_weight > 0) {
			var my_index = get_index(my_row.key);
			merged_array[my_index].expected_weight += my_row.values.expected_weight;
		}
	}

//	merge all [received_weight] by [received_date]
	for(var i in sum_by_received_date) {
		var my_row = sum_by_received_date[i];
		if (my_row.values.received_weight > 0) {
			var my_index = get_index(my_row.key);
			merged_array[my_index].received_weight += my_row.values.received_weight;
		}
	}
//	JKY.var_dump('merged_array', merged_array);

//	draw dual_bar chart with [expected_weight] and [received_weight] by [date]
	$('#jky-graph-body').html('');
	JKY.Graph = JKY.D3;
	JKY.Graph.setArgs(
		{ id_name		: 'jky-graph-body'
		, graph_name	: 'dual_bar'
		, axis_name		: 'key'
		, var1_name		: 'expected_weight'
		, var2_name		: 'received_weight'
		, round_up		: 200
		, chart_width	: 600
		, chart_height	:   0
		});
	JKY.Graph.draw(merged_array);
	JKY.hide('jky-loading');
}
