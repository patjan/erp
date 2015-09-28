"use strict";

/**
 * pieces.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Pieces'
		, table_name	: 'Pieces'
		, specific		: ''
		, select		: ''
		, filter		: ''
		, sort_by		: 'barcode'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-checkin-location'
		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
//	$('#jky-tab-lines'		).click (function() {JKY.display_lines	();});
//	$('#jky-line-add-new'	).click (function() {JKY.insert_line	();});
//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Thread.load_data);

	JKY.set_side_active('jky-planning-pieces');
	JKY.set_side_active('jky-production-pieces');
	JKY.set_side_active('jky-dyers-pieces');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-product'	, '../JKY.Search.Product.html'	);
	JKY.append_file('jky-load-order'	, '../JKY.Search.Order.html'	);

	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Check In', 'Check Out', 'Return'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	$('#jky-product-filter'	).KeyUpDelay(JKY.Product.load_data);
	$('#jky-order-filter'	).KeyUpDelay(JKY.Order	.load_data);

	$('#jky-checkin-weight' ).ForceNumericOnly();
	$('#jky-returned-weight').ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_order_number = the_row.order_number + ' <a href="#" onclick="JKY.open_new_tab(event, \'Planning/Orders/' + the_row.order_number + '\')"><i class="icon-pencil"></i></a>';
	var my_html = ''
		+  '<td class="jky-td-barcode"	>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.updated_at			)	+ '</td>'
		+  '<td class="jky-td-number"	>' +					  my_order_number			+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.product_name			+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.produced_by			+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.number_of_pieces		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkin_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.returned_weight		+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkin_location	)	+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkout_location	)	+ '</td>'
		+  '<td class="jky-td-remarks"	>' + JKY.decode		(the_row.remarks			)	+ '</td>'
		+  '<td class="jky-td-status"	>' + JKY.t			(the_row.status				)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-barcode'				,				 the_row.barcode			);
	JKY.set_value	('jky-loadout-number'		,				 the_row.loadout_number		);
	JKY.set_value	('jky-order-id'				,				 the_row.order_id			);
	JKY.set_value	('jky-order-number'			,				 the_row.order_number		);
	JKY.set_value	('jky-product-name'			,				 the_row.product_name		);
	JKY.set_value	('jky-produced-by'			,				 the_row.produced_by		);
	JKY.set_value	('jky-number-of-pieces'		,				 the_row.number_of_pieces	);
	JKY.set_value	('jky-checkin-weight'		,				 the_row.checkin_weight		);
	JKY.set_value	('jky-returned-weight'		,				 the_row.returned_weight	);
	JKY.set_value	('jky-checkin-location'		,				 the_row.checkin_location	);
	JKY.set_value	('jky-checkout-location'	,				 the_row.checkout_location	);
	JKY.set_value	('jky-qualities'			,				 the_row.qualities			);
	JKY.set_value	('jky-remarks'				, JKY.decode	(the_row.remarks			));
//	JKY.display_lines();
};

/**
 *	set add new row (hidden)
 */
JKY.set_add_new_row = function() {
	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-loadout-number'		, '');
	JKY.set_value	('jky-order-id'				, 0 );
	JKY.set_value	('jky-order-number'			, '');
	JKY.set_value	('jky-product-name'			, '');
	JKY.set_value	('jky-produced-by'			, '');
	JKY.set_value	('jky-number-of-pieces'		, 0 );
	JKY.set_value	('jky-checkin-weight'		, 0 );
	JKY.set_value	('jky-returned-weight'		, 0 );
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-qualities'			, '');
	JKY.set_value	('jky-remarks'				, '');
}

/**
 *	set replace
 */
JKY.set_replace = function() {
	var my_first = $('#jky-table-body .jky-td-checkbox input:checked').first();
	var my_product_name = my_first.parent().parent().find('.jky-td-name-l').html();
	var my_product_id = JKY.get_id('Products', 'Products.product_name=\'' + my_product_name + '\'');

	JKY.show_parent ('jky-status');
	JKY.set_html	('jky-status', JKY.set_options('', '', 'Active', 'Check In', 'Check Out', 'Return'));
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-loadout-number'		, '');
	JKY.set_value	('jky-order-id'				, null);
	JKY.set_value	('jky-order-number'			, '');
	JKY.set_value	('jky-product-id'			, null);
	JKY.set_value	('jky-product-name'			, '');
	JKY.set_value	('jky-produced-by'			, '');
	JKY.set_value	('jky-number-of-pieces'		, '');
	JKY.set_value	('jky-checkin-weight'		, '');
	JKY.set_value	('jky-returned-weight'		, '');
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-qualities'			, '');
	JKY.set_value	('jky-remarks'				, '');

	JKY.hide('jky-form-tabs');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+          '  order_id=  ' +			JKY.get_value('jky-order-id'			)
		+      ', product_name=\'' +			JKY.get_value('jky-product-name'		)	+ '\''
		+       ', produced_by=\'' +			JKY.get_value('jky-produced-by'			)	+ '\''
		+  ', number_of_pieces=  ' +			JKY.get_value('jky-number-of-pieces'	)
		+    ', checkin_weight=  ' +			JKY.get_value('jky-checkin-weight'		)
		+   ', returned_weight=  ' +			JKY.get_value('jky-returned-weight'		)
		+  ', checkin_location=\'' +			JKY.get_value('jky-checkin-location'	).toUpperCase() + '\''
		+ ', checkout_location=\'' +			JKY.get_value('jky-checkout-location'	).toUpperCase() + '\''
		+         ', qualities=\'' +			JKY.get_value('jky-qualities'			)	+ '\''
		+           ', remarks=\'' + JKY.encode(JKY.get_value('jky-remarks'				))	+ '\''
		;
	return my_set;
};

/**
 *	get replace set
 */
JKY.get_replace_set = function() {
	var my_set = '';
	if (!JKY.is_empty(JKY.get_value('jky-status'			)))	{my_set +=            ', status=\''	+ JKY.get_value('jky-status'			) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-order-id'			)))	{my_set +=          ', order_id=  '	+ JKY.get_value('jky-order-id'			);}
	if (!JKY.is_empty(JKY.get_value('jky-product-name'		)))	{my_set +=      ', product_name=\''	+ JKY.get_value('jky-product-name'		) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-produced-by'		)))	{my_set +=       ', produced_by=\''	+ JKY.get_value('jky-produced-by'		) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-number-of-pieces'	)))	{my_set +=  ', number_of_pieces=  '	+ JKY.get_value('jky-number-of-pieces'	);}
	if (!JKY.is_empty(JKY.get_value('jky-checkin-weight'	)))	{my_set +=    ', checkin_weight=  '	+ JKY.get_value('jky-checkin-weight'	);}
	if (!JKY.is_empty(JKY.get_value('jky-returned-weight'	)))	{my_set +=   ', returned_weight=  '	+ JKY.get_value('jky-returned-weight'	);}
	if (!JKY.is_empty(JKY.get_value('jky-checkin-location'	)))	{my_set +=  ', checkin_location=\''	+ JKY.get_value('jky-checkin-location'	).toUpperCase() + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-checkout-location'	)))	{my_set += ', checkout_location=\''	+ JKY.get_value('jky-checkout-location'	).toUpperCase() + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-qualities'			)))	{my_set +=         ', qualities=\''	+ JKY.get_value('jky-qualities'			) + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-remarks'			)))	{my_set +=           ', remarks=\''	+ JKY.encode(JKY.get_value('jky-remarks')) + '\'';}
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
