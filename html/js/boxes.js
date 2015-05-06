"use strict";

/**
 * boxes.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Boxes'
		, table_name	: 'Boxes'
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

	JKY.set_side_active('jky-threads-boxes');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-batchin', '../JKY.Search.BatchIn.html');

	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Check In', 'Check Out', 'Return'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	$('#jky-batchin-filter'	).KeyUpDelay(JKY.BatchIn.load_data);

	$('#jky-number-of-boxes').ForceIntegerOnly();
	$('#jky-number-of-cones').ForceIntegerOnly();
	$('#jky-average-weight' ).ForceNumericOnly();
	$('#jky-real-weight'	).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-barcode"	>' +				 the_row.barcode				+ '</td>'
		+  '<td class="jky-td-status"	>' + JKY.t			(the_row.status				)	+ '</td>'
		+  '<td class="jky-td-name-l"	>' +				 the_row.thread_name			+ '</td>'
		+  '<td class="jky-td-name-s"	>' +				 the_row.supplier_name			+ '</td>'
		+  '<td class="jky-td-code"		>' +				 the_row.batch_code				+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.number_of_boxes		+ '</td>'
		+  '<td class="jky-td-integer"	>' +				 the_row.number_of_cones		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.average_weight			+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.real_weight			+ '</td>'
		+  '<td class="jky-td-location"	>' +				 the_row.checkin_location		+ '</td>'
		+  '<td class="jky-td-location"	>' + JKY.fix_null	(the_row.checkout_location	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'				, JKY.t(the_row.status		));
	JKY.set_value	('jky-barcode'				, the_row.barcode			);
	JKY.set_value	('jky-thread-id'			, the_row.thread_id			);
	JKY.set_value	('jky-batchin-id'			, the_row.batch_id			);
	JKY.set_value	('jky-batchin-code'			, the_row.batch_code		);
	JKY.set_value	('jky-number-of-boxes'		, the_row.number_of_boxes	);
	JKY.set_value	('jky-number-of-cones'		, the_row.number_of_cones	);
	JKY.set_value	('jky-average-weight'		, the_row.average_weight	);
	JKY.set_value	('jky-real-weight'			, the_row.real_weight		);
	JKY.set_value	('jky-checkin-location'		, the_row.checkin_location	);
	JKY.set_value	('jky-checkout-location'	, the_row.checkout_location	);
	JKY.set_value	('jky-returned-location'	, the_row.returned_location	);
//	JKY.display_lines();
};

/**
 *	set add new row (hidden)
 */
JKY.set_add_new_row = function() {
	JKY.set_html	('jky-status'				, '');
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-thread-id'			,  0);
	JKY.set_value	('jky-batchin-id'			,  0);
	JKY.set_value	('jky-batchin-code'			, '');
	JKY.set_value	('jky-number-of-boxes'		,  0);
	JKY.set_value	('jky-number-of-cones'		,  0);
	JKY.set_value	('jky-average-weight'		,  0);
	JKY.set_value	('jky-real-weight'			,  0);
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-returned-location'	, '');
}

/**
 *	set replace
 */
JKY.set_replace = function() {
	var my_first = $('#jky-table-body .jky-td-checkbox input:checked').first();
	var my_thread_name = my_first.parent().parent().find('.jky-td-name-l').html();
	var my_thread_id = JKY.get_id('Threads', 'Threads.name=\'' + my_thread_name + '\'');
	JKY.set_value	('jky-thread-id'			, my_thread_id);
	JKY.set_value	('jky-barcode'				, '');
	JKY.set_value	('jky-batchin-code'			, '');
	JKY.set_value	('jky-number-of-boxes'		, '');
	JKY.set_value	('jky-number-of-cones'		, '');
	JKY.set_value	('jky-average-weight'		, '');
	JKY.set_value	('jky-real-weight'			, '');
	JKY.set_value	('jky-checkin-location'		, '');
	JKY.set_value	('jky-checkout-location'	, '');
	JKY.set_value	('jky-returned-location'	, '');
}

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+          '  batch_id=  '	+ JKY.get_value('jky-batchin-id'		)
		+   ', number_of_boxes=  '	+ JKY.get_value('jky-number-of-boxes'	)
		+   ', number_of_cones=  '	+ JKY.get_value('jky-number-of-cones'	)
		+    ', average_weight=  '	+ JKY.get_value('jky-average-weight'	)
		+       ', real_weight=  '	+ JKY.get_value('jky-real-weight'		)
		+  ', checkin_location=\''	+ JKY.get_value('jky-checkin-location'	).toUpperCase() + '\''
		+ ', checkout_location=\''	+ JKY.get_value('jky-checkout-location'	).toUpperCase() + '\''
		+ ', returned_location=\''	+ JKY.get_value('jky-returned-location'	).toUpperCase() + '\''
	return my_set;
};

/**
 *	get replace set
 */
JKY.get_replace_set = function() {
	var my_set = '';
	if (!JKY.is_empty(JKY.get_value('jky-batchin-id'		)))	{my_set +=          ', batch_id=  '	+ JKY.get_value('jky-batchin-id'		);}
	if (!JKY.is_empty(JKY.get_value('jky-number-of-boxes'	)))	{my_set +=   ', number_of_boxes=  '	+ JKY.get_value('jky-number-of-boxes'	);}
	if (!JKY.is_empty(JKY.get_value('jky-number-of-cones'	)))	{my_set +=   ', number_of_cones=  '	+ JKY.get_value('jky-number-of-cones'	);}
	if (!JKY.is_empty(JKY.get_value('jky-average-weight'	)))	{my_set +=    ', average_weight=  '	+ JKY.get_value('jky-average-weight'	);}
	if (!JKY.is_empty(JKY.get_value('jky-real-weight'		)))	{my_set +=       ', real_weight=  '	+ JKY.get_value('jky-real-weight'		);}
	if (!JKY.is_empty(JKY.get_value('jky-checkin-location'	)))	{my_set +=  ', checkin_location=\''	+ JKY.get_value('jky-checkin-location'	).toUpperCase() + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-checkout-location'	)))	{my_set += ', checkout_location=\''	+ JKY.get_value('jky-checkout-location'	).toUpperCase() + '\'';}
	if (!JKY.is_empty(JKY.get_value('jky-returned-location'	)))	{my_set += ', returned_location=\''	+ JKY.get_value('jky-returned-location'	).toUpperCase() + '\'';}
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
	JKY.hide('jky-action-update');
};
