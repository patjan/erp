"use strict";

/**
 * loadouts.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'LoadOuts'
		, table_name	: 'LoadOuts'
		, specific		: ''
		, select		: JKY.loadout.select
		, filter		: ''
		, sort_by		: 'load_number'
		, sort_seq		: 'DESC'
		, focus			: 'jky-dyer-name'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-requested-value').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-loadout-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-returned-value'	).attr('data-format', JKY.Session.get_date_time	());
	$('#jky-requested-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-loadout-date'	).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-returned-date'	).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-tab-sales'		).click (function() {JKY.display_sales		();});
	$('#jky-sale-add-new'	).click (function() {JKY.insert_sale		();});

	$('#jky-boxes-print'	).click (function() {JKY.Batch.print()});
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);
	JKY.append_file('jky-load-color'	, '../JKY.Search.Color.html'	);
	JKY.append_file('jky-load-sale'		, '../JKY.Search.Sale.html'		);

	JKY.set_side_active('jky-dyers-loadouts');
	JKY.set_html('jky-app-select', JKY.set_options(JKY.loadout.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
	JKY.set_html('jky-color-name'	, JKY.set_table_options('Colors', 'color_name', '', ''));

	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer.load_data		);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color.load_data	);
	$('#jky-sale-filter'		).KeyUpDelay(JKY.Sale.load_data		);
}

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-loadout-number"	>' +				 the_row.load_number			+ '</td>'
		+  '<td class="jky-dyer-name"		>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-color-name"		>' + JKY.fix_null	(the_row.color_name			)	+ '</td>'
		+  '<td class="jky-requested-date"	>' + JKY.short_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-loadout-date"	>' + JKY.short_date	(the_row.loadout_at			)	+ '</td>'
		+  '<td class="jky-returned-date"	>' + JKY.short_date	(the_row.returned_at		)	+ '</td>'
		+  '<td class="jky-requested-pieces">' +				 the_row.requested_pieces		+ '</td>'
		+  '<td class="jky-loadout-pieces"	>' +				 the_row.loadout_pieces			+ '</td>'
		+  '<td class="jky-returned-pieces"	>' +				 the_row.returned_pieces		+ '</td>'
		;
	return my_html;
}

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Draft') {
//		JKY.enable_button ('jky-action-generate');
		JKY.enable_button ('jky-action-delete'  );
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
//		JKY.disable_button('jky-action-generate');
		JKY.disable_button('jky-action-delete'  );
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}

	JKY.set_html	('jky-status'			, JKY.t			(the_row.status			));
	JKY.set_value	('jky-loadout-number'	,				 the_row.load_number	);
	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id		);
	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name		);
	JKY.set_value	('jky-color-id'			,				 the_row.color_id		);
	JKY.set_value	('jky-color-name'		,				 the_row.color_name		);
	JKY.set_date	('jky-requested-date'	, JKY.out_time	(the_row.requested_at		));
	JKY.set_value	('jky-requested-pieces'	,				 the_row.requested_pieces	);
	JKY.set_value	('jky-requested-weight'	,				 the_row.requested_weight	);
	JKY.set_date	('jky-loadout-date'		, JKY.out_time	(the_row.loadout_at			));
	JKY.set_value	('jky-loadout-pieces'	,				 the_row.loadout_pieces		);
	JKY.set_value	('jky-loadout-weight'	,				 the_row.loadout_weight		);
	JKY.set_date	('jky-returned-date'	, JKY.out_time	(the_row.returned_at		));
	JKY.set_value	('jky-returned-pieces'	,				 the_row.returned_pieces	);
	JKY.set_value	('jky-returned-weight'	,				 the_row.returned_weight	);

//	JKY.set_calculated_color();
	JKY.display_sales();
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-loadout-number'	,  JKY.t('New'));
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_value	('jky-color-id'			, '');
	JKY.set_value	('jky-color-name'		, '');
	JKY.set_date	('jky-requested-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-requested-pieces'	,  0);
	JKY.set_value	('jky-requested-weight'	,  0);
	JKY.set_date	('jky-loadout-date'		, '');
	JKY.set_value	('jky-loadout-pieces'	,  0);
	JKY.set_value	('jky-loadout-weight'	,  0);
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-returned-pieces'	,  0);
	JKY.set_value	('jky-returned-weight'	,  0);
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
	var my_color_id		= JKY.get_value('jky-color-id'		);
	my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;
	my_color_id		= (my_color_id		== '') ? 'null' : my_color_id	;

	var my_set = ''
		+         '  dyer_id=  ' + my_dyer_id
		+        ', color_id=  ' + my_color_id
		+    ', requested_at=  ' + JKY.inp_time(JKY.get_value('jky-requested-value'	))
		+', requested_pieces=  ' +				JKY.get_value('jky-requested-pieces')
		+', requested_weight=  ' +				JKY.get_value('jky-requested-weight')
		+      ', loadout_at=  ' + JKY.inp_time(JKY.get_value('jky-loadout-value'	))
		+  ', loadout_pieces=  ' +				JKY.get_value('jky-loadout-pieces'	)
		+  ', loadout_weight=  ' +				JKY.get_value('jky-loadout-weight'	)
		+     ', returned_at=  ' + JKY.inp_time(JKY.get_value('jky-returned-value'	))
		+ ', returned_pieces=  ' +				JKY.get_value('jky-returned-pieces'	)
		+ ', returned_weight=  ' +				JKY.get_value('jky-returned-weight'	)
		;
	return my_set;
}

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'LoadSales'
		, where : 'LoadSales.loadout_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.get_color_id = function() {
	return JKY.get_value('jky-color-id');
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_requested_weight	= parseFloat(JKY.get_value('jky-requested-weight'	));
	var my_loadout_weight	= parseFloat(JKY.get_value('jky-loadout-weight'	));
	JKY.set_css('jky-loadout-weight', 'color', (my_requested_weight > my_loadout_weight) ? 'red' : 'black');
}
