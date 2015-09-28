"use strict";

/**
 * loadsales.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'LoadSales'
		, table_name	: 'LoadQuotations'
		, specific		: ''
		, select		: JKY.loadsale.select
		, filter		: ''
		, sort_by		: 'LoadOut.loadout_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-quoted-pieces'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	$('#jky-action-generate').click( function() {JKY.generate_loadset();});
	$('#jky-action-close'	).click( function() {JKY.App.close_row(JKY.row.id);});

	JKY.set_side_active('jky-dyers-loadsales');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-dyer'		, '../JKY.Search.Dyer.html'		);

	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.loadsale.select, 'All', 'Draft + Active', 'Draft', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
	$('#jky-dyer-name').change(function()	{JKY.process_dyer_name(this);});

	$('#jky-quoted-weight'	).ForceNumericOnly();
	$('#jky-quoted-pieces'	).ForceIntegerOnly();
	$('#jky-reserved-pieces').ForceIntegerOnly();
	$('#jky-checkout-pieces').ForceIntegerOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.loadout_number			+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.quotation_number	)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.dyer_name			)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.color_name			)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.customer_name		)	+ '</td>'
		+  '<td class="jky-td-text-s"	>' + JKY.fix_null	(the_row.product_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.requested_at		)	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.quoted_weight			+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.quoted_pieces			+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.reserved_pieces		+ '</td>'
		+  '<td class="jky-td-pieces"	>' +				 the_row.checkout_pieces		+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	var my_quoted_pieces	= parseInt(the_row.quoted_pieces	);
	var my_reserved_pieces	= parseInt(the_row.reserved_pieces	);
	var my_checkout_pieces	= parseInt(the_row.checkout_pieces	);

	if (the_row.status == 'Draft') {
		JKY.enable_button ('jky-action-generate');
		JKY.enable_delete_button();
	}else{
		JKY.disable_button('jky-action-generate');
		JKY.disable_delete_button();
	}
	if (the_row.status == 'Active') {
		JKY.enable_button ('jky-action-close'	);
	}else{
		JKY.disable_button('jky-action-close'	);
	}

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-loadout-number'		,				 the_row.loadout_number		);
	JKY.set_value	('jky-dyer-name'			,				 the_row.dyer_name			);
	JKY.set_value	('jky-color-name'			,				 the_row.color_name			);
	JKY.set_value	('jky-quotation-number'		,				 the_row.quotation_number	);
	JKY.set_value	('jky-customer-name'		,				 the_row.customer_name		);
	JKY.set_value	('jky-product-name'			,				 the_row.product_name		);
	JKY.set_date	('jky-requested-date'		, JKY.out_time	(the_row.requested_at		));
	JKY.set_value	('jky-quoted-weight'		,				 the_row.quoted_weight		);
	JKY.set_value	('jky-quoted-pieces'		,				 the_row.quoted_pieces		);
	JKY.set_value	('jky-reserved-pieces'		,				 the_row.reserved_pieces	);
	JKY.set_value	('jky-checkout-pieces'		,				 the_row.checkout_pieces	);
	JKY.set_calculated_color();

	if (the_row.product_id) {
		JKY.display_pieces();
		JKY.display_checkouts();
	}
};

/**
 *	set add new row (hidden)
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-product-code'			, '');
	JKY.set_value	('jky-thread-name'			, '');
	JKY.set_value	('jky-batch-number'			, '');
	JKY.set_value	('jky-machine-name'			, '');
	JKY.set_value	('jky-supplier-name'		, '');
	JKY.set_value	('jky-quoted-weight'		, 0 );
	JKY.set_value	('jky-quoted-pieces'		, '');
	JKY.set_value	('jky-reserved-pieces'		, '');
	JKY.set_value	('jky-unit-price'			, 0 );
	JKY.set_value	('jky-average-weight'		, 0 );
	JKY.set_value	('jky-checkout-weight'		, 0 );
	JKY.set_value	('jky-checkout-pieces'		, '');
};

/**
 *	set replace
 */
JKY.set_replace = function() {
	JKY.disable_button('jky-action-generate');
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

//	var my_first = $('#jky-table-body .jky-td-checkbox input:checked').first();
//	var my_product_name = my_first.parent().parent().find('.jky-td-name-l').html();
//	var my_product_id = JKY.get_id('Products', 'Products.product_name=\'' + my_product_name + '\'');

	JKY.show_parent ('jky-status');
	JKY.set_html	('jky-status', JKY.set_options('', '', 'Draft', 'Active', 'Closed'));
	JKY.set_value	('jky-product-code'			, '');
	JKY.set_value	('jky-thread-name'			, '');
	JKY.set_value	('jky-batch-number'			, '');
	JKY.set_value	('jky-machine-name'			, '');
	JKY.set_value	('jky-supplier-name'		, '');
	JKY.set_value	('jky-quoted-weight'		, '');
	JKY.set_value	('jky-quoted-pieces'		, '');
	JKY.set_value	('jky-reserved-pieces'		, '');
	JKY.set_value	('jky-unit-price'			, '');
	JKY.set_value	('jky-average-weight'		, '');
	JKY.set_value	('jky-checkout-weight'		, '');
	JKY.set_value	('jky-checkout-pieces'		, '');

	JKY.hide('jky-form-tabs');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
//		+              '  code=\'' + JKY.get_value('jky-product-code'		) + '\''
//		+             ', batch=\'' + JKY.get_value('jky-batch-number'		) + '\''
//		+        ', unit_price=  ' + JKY.get_value('jky-unit-price'			)
		+     '  quoted_weight=  ' + JKY.get_value('jky-quoted-weight'		)
		+     ', quoted_pieces=  ' + JKY.get_value('jky-quoted-pieces'		)
//		+   ', reserved_pieces=  ' + JKY.get_value('jky-reserved-pieces'	)
//		+    ', average_weight=  ' + JKY.get_value('jky-average-weight'		)
//		+   ', checkout_weight=  ' + JKY.get_value('jky-checkout-weight'	)
//		+   ', checkout_pieces=  ' + JKY.get_value('jky-checkout-pieces'	)
		;
	return my_set;
};

/**
 *	get replace set
 */
JKY.get_replace_set = function() {
	var my_set = '';
	if (!JKY.is_empty(JKY.get_value('jky-status'			)))	{my_set +=            ', status=\''	+ JKY.get_value('jky-status'			) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-quoted-weight'		)))	{my_set +=     ', quoted_weight=  '	+ JKY.get_value('jky-quoted-weight'		);}
	if (!JKY.is_empty(JKY.get_value('jky-quoted-pieces'		)))	{my_set +=     ', quoted_pieces=  '	+ JKY.get_value('jky-quoted-pieces'		);}
	return my_set;
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
	if (JKY.Session.get_value('user_role') == 'Admin'
	||  JKY.Session.get_value('user_role') == 'Support') {
		JKY.show('jky-action-replace');
	}
};

JKY.display_form = function() {
	JKY.hide('jky-action-add-new');
};

/**
 *
 */
JKY.process_dyer_name = function(the_id) {
	var my_dyer_id 	= JKY.get_value('jky-dyer-id');
	my_dyer_id		= (my_dyer_id == '') ? 'null' : my_dyer_id;

	var my_set	= 'dyer_id = ' + my_dyer_id;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadOuts'
		, set		: my_set
		, where		: 'LoadOuts.id = ' + JKY.row.loadout_id
		};
	JKY.ajax(true, my_data);
};

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_quoted_weight	= parseFloat(JKY.get_value('jky-quoted-weight'	));
	var my_checkout_weight	= parseFloat(JKY.get_value('jky-checkout-weight'));
	JKY.set_css('jky-checkout-weight', 'color', ((my_quoted_weight - my_checkout_weight) > 0.001) ? 'red' : 'black');

	var my_quoted_pieces	= parseInt(JKY.get_value('jky-quoted-pieces'	));
	var my_checkout_pieces	= parseInt(JKY.get_value('jky-checkout-pieces'	));
	JKY.set_css('jky-checkout-pieces', 'color', (my_quoted_pieces > my_checkout_pieces) ? 'red' : 'black');

	var my_reserved_pieces	= parseInt(JKY.get_value('jky-reserved-pieces'	));
	JKY.set_css('jky-reserved-pieces', 'color', (my_reserved_pieces < 0) ? 'red' : 'black');
};

/* -------------------------------------------------------------------------- */
JKY.generate_loadset = function() {
	var my_quoted_pieces	= JKY.get_value('jky-quoted-pieces'	 );
	var my_reserved_pieces  = JKY.get_value('jky-reserved-pieces');
	if (my_quoted_pieces !=  my_reserved_pieces) {
		JKY.display_message(JKY.t('Load Set cannot be generated'));
		JKY.display_message(JKY.t('because Reserved Pieces is not equal to Quoted Pieces'));
		return;
	}

	JKY.insert_load_sets();
};

/* -------------------------------------------------------------------------- */
JKY.close_row = function(the_id) {
	var my_data =
		{ method	: 'update'
		, table		: 'LoadSets'
		, set		: 'status = \'Closed\''
		, where		: 'load_quot_id = ' + the_id
		};
	JKY.ajax(false, my_data);
};

JKY.insert_load_sets = function() {
	var my_data;
	var my_trs = $('#jky-pieces-body tr');
	for(var i=0, max=my_trs.length; i<max; i++) {
		var my_tr = my_trs[i];
		var my_reserved_pieces = parseInt($(my_tr).find('.jky-reserved-pieces').val());
		if (my_reserved_pieces > 0) {
			var my_checkin_location	=					 $(my_tr).find('.jky-checkin-location'	).val().toUpperCase();
			var my_checkin_machine	=					 $(my_tr).find('.jky-checkin-machine'	).val();
			var my_checkin_date		= JKY.inp_date_value($(my_tr).find('.jky-checkin-date'		).val());
			var my_checkin_weight	= parseFloat		($(my_tr).find('.jky-checkin-weight'	).val());
			var my_checkin_pieces	= parseInt			($(my_tr).find('.jky-checkin-pieces'	).val());
			var my_set = ''
				+       'load_quot_id=  ' + JKY.row.id
				+     ', machine_name=\'' + my_checkin_machine + '\''
				+ ', checkin_location=\'' + my_checkin_location + '\''
				+     ', checkin_date=  ' + my_checkin_date
				+   ', checkin_weight=  ' + my_checkin_weight
				+   ', checkin_pieces=  ' + my_checkin_pieces
				+  ', reserved_weight=  ' + my_reserved_pieces * (my_checkin_weight / my_checkin_pieces)
				+  ', reserved_pieces=  ' + my_reserved_pieces
				;
			my_data =
				{ method	: 'insert'
				, table		: 'LoadSets'
				, set		:  my_set
				};
			JKY.ajax(false, my_data);

			my_data =
				{ method	: 'update'
				, table		: 'LoadQuotations'
				, set		: 'reserved_pieces = reserved_pieces + ' + my_reserved_pieces
				, where		: 'id = ' + JKY.row.id
				};
			JKY.ajax(false, my_data);
		}
	}

	my_data =
		{ method	: 'update'
		, table		: 'LoadQuotations'
		, set		: 'status = \'Active\''
		, where		: 'id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.refresh_form);
};

JKY.refresh_form = function(response) {
	JKY.display_message('Load row generated: ' + JKY.row.id);
	JKY.App.display_row();
};