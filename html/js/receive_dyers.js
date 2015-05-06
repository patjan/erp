"use strict";

/**
 * receive_dyers.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Receive Dyers'
		, table_name	: 'ReceiveDyers'
		, specific		: ''
		, select		: JKY.receive.select
		, filter		: ''
		, sort_by		: 'receive_number'
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
	$('#jky-received-date	input').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-invoice-date	input').attr('data-format', JKY.Session.get_date		());
	$('#jky-received-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-invoice-date'	).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-batches-add-new').click (function() {JKY.insert_batch			();});

	$('#jky-boxes-print'	).click (function() {JKY.Batch.print()});

	JKY.set_side_active('jky-receiving-receive-dyers');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);
	JKY.append_file('jky-load-purline'	, '../JKY.Search.PurLine.html'	);

	JKY.show('jky-action-graph');

	JKY.set_html('jky-app-select', JKY.set_options(JKY.receive.select, 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.set_html('jky-dyer-name', JKY.set_options_array('', JKY.get_companies('is_dyer'), false));

	$('#jky-thread-filter'	).KeyUpDelay(JKY.Product.load_data);
	$('#jky-purline-filter'	).KeyUpDelay(JKY.PurLine.load_data);

	$('#jky-invoice-amount'	).ForceNumericOnly();
	$('#jky-invoice-weight'	).ForceNumericOnly();
	$('#jky-received-amount').ForceNumericOnly();
	$('#jky-received-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_invoice_weight	= parseFloat(the_row.invoice_weight	);
	var my_received_weight	= parseFloat(the_row.received_weight);
	var my_class = (my_invoice_weight == my_received_weight) ? '' : ' jky-error';

	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.receive_number		+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.dyer_name			+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.nfe_dl			)	+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.nfe_tm			)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.invoice_date	) 	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.short_date	(the_row.received_at	)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.invoice_weight		+ '</td>'
		+  '<td class="jky-td-weight'	+ my_class + '"	>' + the_row.received_weight	+ '</td>'
		;
	return my_html;
};

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
	JKY.set_value	('jky-receive-number'	,				 the_row.receive_number	);
	JKY.set_date	('jky-received-date'	, JKY.out_time	(the_row.received_at	));
	JKY.set_option	('jky-dyer-name'		,				 the_row.dyer_id		);
	JKY.set_value	('jky-nfe-dl'			,				 the_row.nfe_dl			);
	JKY.set_value	('jky-nfe-tm'			,				 the_row.nfe_tm			);
	JKY.set_date	('jky-invoice-date'		, JKY.out_date	(the_row.invoice_date	));
	JKY.set_value	('jky-invoice-weight'	,				 the_row.invoice_weight	);
	JKY.set_value	('jky-invoice-amount'	,				 the_row.invoice_amount	);
	JKY.set_value	('jky-received-weight'	,				 the_row.received_weight);
	JKY.set_value	('jky-received-amount'	,				 the_row.received_amount);

	JKY.set_calculated_color();
	JKY.display_loads();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-receive-number'	,  JKY.t('New'));
	JKY.set_date	('jky-received-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_option	('jky-dyer-name'	, '');
	JKY.set_value	('jky-nfe-dl'			, '');
	JKY.set_value	('jky-nfe-tm'			, '');
	JKY.set_date	('jky-invoice-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-invoice-weight'	,  0);
	JKY.set_value	('jky-invoice-amount'	,  0);
	JKY.set_value	('jky-received-weight'	,  0);
	JKY.set_value	('jky-received-amount'	,  0);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_dyer_id = JKY.get_value('jky-dyer-name');
	my_dyer_id = (my_dyer_id == '') ? 'null' : my_dyer_id;

	var my_set = ''
		+     'received_at=  ' + JKY.inp_time	('jky-received-date'	)
		+       ', dyer_id=  ' + my_dyer_id
		+		 ', nfe_dl=\'' + JKY.get_value	('jky-nfe-dl'			) + '\''
		+		 ', nfe_tm=\'' + JKY.get_value	('jky-nfe-tm'			) + '\''
		+  ', invoice_date=  ' + JKY.inp_date	('jky-invoice-date'		)
		+', invoice_weight=  ' + JKY.get_value	('jky-invoice-weight'	)
		+', invoice_amount=  ' + JKY.get_value	('jky-invoice-amount'	)
		;
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Batches'
		, where : 'receivedyer_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

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
//		, order_by	: 'invoice_date'
//		, group_by	: 'invoice_date'
		};
	JKY.ajax(false, my_data, JKY.display_graph_success);
}

JKY.display_graph_success = function(response) {
	var my_rows	= response.rows;

//	sum all [invoice_weight] by [invoice_date]
	var sum_by_invoice_date = d3.nest()
		.key	(function(d)	{return d.invoice_date ? d.invoice_date.substr(5,5) : 'unknown';})
		.sortKeys(d3.ascending)
		.rollup	(function(d)	{return	{invoice_weight:d3.sum(d, function(g)	{return +g.invoice_weight ;})};})
		.entries(my_rows)
		;
//	JKY.var_dump('sum_by_invoice_date', sum_by_invoice_date);

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
		var my_row = {'key':the_key, 'invoice_weight':0, 'received_weight':0};
		merged_array.splice(j, 0, my_row);
		return j;
	}

//	merge all [invoice_weight] by [invoice_date]
	for(var i in sum_by_invoice_date) {
		var my_row = sum_by_invoice_date[i];
		if (my_row.values.invoice_weight > 0) {
			var my_index = get_index(my_row.key);
			merged_array[my_index].invoice_weight += my_row.values.invoice_weight;
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

//	draw dual_bar chart with [invoice_weight] and [received_weight] by [date]
	$('#jky-graph-body').html('');
	JKY.Graph = JKY.D3;
	JKY.Graph.setArgs(
		{ id_name		: 'jky-graph-body'
		, graph_name	: 'dual_bar'
		, axis_name		: 'key'
		, var1_name		: 'invoice_weight'
		, var2_name		: 'received_weight'
		, round_up		: 200
		, chart_width	: 600
		, chart_height	:   0
		});
	JKY.Graph.draw(merged_array);
	JKY.hide('jky-loading');
}