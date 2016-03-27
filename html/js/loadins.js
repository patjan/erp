"use strict";
var JKY = JKY || {};
/**
 * loadins.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'LoadIns'
		, table_name	: 'LoadOuts'
		, specific		: ''
		, select		: JKY.loadin.select
		, filter		: ''
		, sort_by		: 'loadout_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-dyer-name'
		, add_new		: 'display form'
		, class			: 'status'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-requested-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-checkout-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-returned-date		input').attr('data-format', JKY.Session.get_date_time());
	$('#jky-requested-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-checkout-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-returned-date'		).datetimepicker({language: JKY.Session.get_locale()});

	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-tab-quotations'		).click (function() {JKY.display_quotations		();});
	$('#jky-quotation-add-new'	).click (function() {JKY.insert_quotation		();});
	$('#jky-print-labels'		).click (function() {JKY.print_labels			();});
	$('#jky-action-checkin'		).click (function() {JKY.checkin_fabrics		();});

	JKY.set_side_active('jky-receiving-loadins');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-dyer'			, '../JKY.Search.Dyer.html'			);
	JKY.append_file('jky-load-dyeing'		, '../JKY.Search.Dyeing.html'		);
//	JKY.append_file('jky-load-color-un'		, '../JKY.Search.ColorUnloaded.html');
	JKY.append_file('jky-load-color'		, '../JKY.Search.Color.html'		);
	JKY.append_file('jky-load-recipe'		, '../JKY.Search.Recipe.html'		);
	JKY.append_file('jky-load-quotation'	, '../JKY.Search.Quotation.html'	);

	JKY.set_html('jky-app-select', JKY.set_options(JKY.loadout.select, 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.show	('jky-app-select-line');
//	JKY.set_html('jky-dyer-name'	, JKY.set_options_array('', JKY.get_companies('is_dyer'), true));
//	JKY.set_html('jky-color-name'	, JKY.set_table_options('Colors', 'color_name', '', ''));
	$('#jky-dyer-name'			).change(function() {JKY.process_dyer_name	(this);});
	$('#jky-dyeing-type'		).change(function() {JKY.process_dyeing_type(this);});
	$('#jky-color-name'			).change(function() {JKY.process_color_name	(this);});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks();});
	$('#jky-dyer-filter'		).KeyUpDelay(JKY.Dyer			.load_data);
//	$('#jky-color-un-filter'	).KeyUpDelay(JKY.ColorUnloaded	.load_data);
	$('#jky-color-filter'		).KeyUpDelay(JKY.Color			.load_data);
	$('#jky-quotation-filter'	).KeyUpDelay(JKY.Quotation		.load_data);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-number"	>' +				 the_row.loadout_number		+ '</td>'
		+  '<td class="jky-td-number"	>' + JKY.fix_null	(the_row.shipdyer_id	)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.dyer_name		)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.dyeing_type	)	+ '</td>'
		+  '<td class="jky-td-short"	>' + JKY.fix_null	(the_row.color_name		)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.requested_at	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.checkout_at	)	+ '</td>'
		+  '<td class="jky-td-date"		>' + JKY.out_date	(the_row.returned_at	)	+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.quoted_pieces		+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.checkout_pieces	+ '</td>'
//		+  '<td class="jky-td-pieces"	>' +				 the_row.returned_pieces	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.quoted_weight		+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.checkout_weight	+ '</td>'
		+  '<td class="jky-td-weight"	>' +				 the_row.returned_weight	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	if (the_row.status == 'Active') {
//		JKY.enable_button ('jky-action-generate');
		JKY.enable_delete_button();
		JKY.enable_button ('jky-lines-add-new'	);
	}else{
//		JKY.disable_button('jky-action-generate');
		JKY.disable_delete_button();
		JKY.disable_button('jky-lines-add-new'	);
	}
	if (the_row.status === 'Draft' || the_row.status === 'Active') {
		JKY.enable_button ('jky-action-close');
	}else{
		JKY.disable_button('jky-action-close');
	}

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-loadout-number'	,				 the_row.loadout_number		);
	JKY.set_value	('jky-labels-printed'	,				 the_row.labels_printed		);
	JKY.set_value	('jky-dyer-id'			,				 the_row.dyer_id			);
	JKY.set_value	('jky-dyer-name'		,				 the_row.dyer_name			);
	JKY.set_value	('jky-dyeing-type'		,				 the_row.dyeing_type		);
	JKY.set_value	('jky-color-id'			,				 the_row.color_id			);
	JKY.set_value	('jky-color-name'		,				 the_row.color_name			);
	JKY.set_value	('jky-recipe'			,				 the_row.recipe				);
	JKY.set_date	('jky-requested-date'	, JKY.out_time	(the_row.requested_at		));
	JKY.set_value	('jky-quoted-pieces'	,				 the_row.quoted_pieces		);
	JKY.set_value	('jky-quoted-weight'	,				 the_row.quoted_weight		);
	JKY.set_date	('jky-checkout-date'	, JKY.out_time	(the_row.checkout_at		));
	JKY.set_value	('jky-checkout-pieces'	,				 the_row.checkout_pieces	);
	JKY.set_value	('jky-checkout-weight'	,				 the_row.checkout_weight	);
	JKY.set_date	('jky-returned-date'	, JKY.out_time	(the_row.returned_at		));
	JKY.set_value	('jky-returned-pieces'	,				 the_row.returned_pieces	);
	JKY.set_value	('jky-returned-weight'	,				 the_row.returned_weight	);
	JKY.set_value	('jky-remarks'			, JKY.decode	(the_row.remarks			));
	setTimeout(function() {JKY.process_dyeing_type($('#jky-dyeing-type'));}, 100);

//	JKY.set_calculated_color();
	JKY.display_quotations();
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.hide_parent ('jky-status');
	JKY.set_value	('jky-loadout-number'	, JKY.t('New'));
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_value	('jky-dyeing-type'		, '');
	JKY.set_value	('jky-color-id'			, '');
	JKY.set_value	('jky-color-name'		, '');
	JKY.set_value	('jky-recipe'			, '');
	JKY.set_date	('jky-requested-date'	, JKY.out_time(JKY.get_now()));
	JKY.set_value	('jky-quoted-pieces'	, 0 );
	JKY.set_value	('jky-quoted-weight'	, 0 );
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_value	('jky-checkout-pieces'	, 0 );
	JKY.set_value	('jky-checkout-weight'	, 0 );
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-returned-pieces'	, 0 );
	JKY.set_value	('jky-returned-weight'	, 0 );

	JKY.set_value	('jky-remarks'			, '');
	setTimeout(function() {JKY.process_dyeing_type($('#jky-dyeing-type'));}, 100);
};

/**
 *	set replace
 */
JKY.set_replace = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.show_parent ('jky-status');
	JKY.set_html	('jky-status', JKY.set_options('', '', 'Active', 'Closed'));
	JKY.set_value	('jky-loadout-number'	, '');
	JKY.set_value	('jky-dyer-id'			, '');
	JKY.set_value	('jky-dyer-name'		, '');
	JKY.set_value	('jky-dyeing-type'		, '');
	JKY.set_value	('jky-color-id'			, '');
	JKY.set_value	('jky-color-name'		, '');
	JKY.set_value	('jky-recipe'			, '');
	JKY.set_date	('jky-requested-date'	, '');
	JKY.set_value	('jky-quoted-pieces'	, '');
	JKY.set_value	('jky-quoted-weight'	, '');
	JKY.set_date	('jky-checkout-date'	, '');
	JKY.set_value	('jky-checkout-pieces'	, '');
	JKY.set_value	('jky-checkout-weight'	, '');
	JKY.set_date	('jky-returned-date'	, '');
	JKY.set_value	('jky-returned-pieces'	, '');
	JKY.set_value	('jky-returned-weight'	, '');

	JKY.hide('jky-form-tabs');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_dyer_id		= JKY.get_value('jky-dyer-id'		);
	var my_color_id		= JKY.get_value('jky-color-id'		);
	my_dyer_id		= (my_dyer_id		== '') ? 'null' : my_dyer_id	;
	my_color_id		= (my_color_id		== '') ? 'null' : my_color_id	;

	var my_set = ''
		+           '  dyer_id=  ' + my_dyer_id
		+       ', dyeing_type=\'' +			JKY.get_value('jky-dyeing-type'		)	+ '\''
		+          ', color_id=  ' + my_color_id
		+            ', recipe=\'' +			JKY.get_value('jky-recipe'			)	+ '\''
		+      ', requested_at=  ' +			JKY.inp_time ('jky-requested-date'	)
		+     ', quoted_pieces=  ' +			JKY.get_value('jky-quoted-pieces'	)
		+     ', quoted_weight=  ' +			JKY.get_value('jky-quoted-weight'	)
		+       ', checkout_at=  ' +			JKY.inp_time ('jky-checkout-date'	)
		+   ', checkout_pieces=  ' +			JKY.get_value('jky-checkout-pieces'	)
		+   ', checkout_weight=  ' +			JKY.get_value('jky-checkout-weight'	)
		+       ', returned_at=  ' +			JKY.inp_time ('jky-returned-date'	)
		+   ', returned_pieces=  ' +			JKY.get_value('jky-returned-pieces'	)
		+   ', returned_weight=  ' +			JKY.get_value('jky-returned-weight'	)
		;
	return my_set;
};

/**
 *	get replace set
 */
JKY.get_replace_set = function() {
	var my_set = '';
	if (!JKY.is_empty(JKY.get_value('jky-status'			)))	{my_set +=            ', status=\''	+ JKY.get_value('jky-status'			) + '\'';}
	if (!JKY.is_empty(JKY.inp_date ('jky-requested-date'	)))	{my_set +=      ', requested_at=  ' + JKY.inp_date ('jky-requested-date'	);}
	if (!JKY.is_empty(JKY.inp_date ('jky-checkout-date'		)))	{my_set +=       ', checkout_at=  ' + JKY.inp_date ('jky-checkout-date'		);}
	if (!JKY.is_empty(JKY.inp_date ('jky-returned-date'		)))	{my_set +=       ', returned_at=  ' + JKY.inp_date ('jky-returned-date'		);}
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-print'  );
	if (JKY.Session.get_value('user_role') == 'Admin'
	||  JKY.Session.get_value('user_role') == 'Support') {
		JKY.show('jky-action-replace');
	}
};

JKY.display_form = function() {
	JKY.show('jky-action-copy'   );
};

/**
 *
 */
JKY.process_dyer_name = function(the_id) {
	$('#jky-recipe').val('');
};

/**
 *
 */
JKY.process_dyeing_type = function(the_id) {
	if ($(the_id).val() === '' || $(the_id).val() === 'Lavar') {
		JKY.set_value('jky-color-id', null);
		JKY.set_value('jky-color-name', '');
		JKY.process_color_name($('#jky-color-name'));
		$(the_id).parent().next().find('a').css('display', 'none');
	}else{
		$(the_id).parent().next().find('a').css('display', 'inline-block');
	}
};

/**
 *
 */
JKY.process_color_name = function(the_id) {
	if ($(the_id).val() === '') {
		JKY.set_value('jky-recipe', '');
		JKY.process_recipe($('#jky-recipe'));
		$(the_id).parent().next().find('a').css('display', 'none');
	}else{
		$(the_id).parent().next().find('a').css('display', 'inline-block');
	}
};

/**
 *
 */
JKY.process_recipe = function(the_id) {
	if ($(the_id).val() === '') {
		$(the_id).parent().next().find('a').css('display', 'none');
	}else{
		$(the_id).parent().next().find('a').css('display', 'inline-block');
	}
};

JKY.process_copy = function(the_id, the_row) {
/*
	var my_set	= '  quoted_at =\'' + JKY.get_now() + '\''
				+ ', quoted_pieces = ' + the_row.quoted_pieces
				;
	var my_data =
		{ method	: 'update'
		, table		: 'Quotations'
		, set		: my_set
		, where		: 'id = ' + the_id
		};
	JKY.ajax(true, my_data);
*/
	JKY.copy_quotations(the_row.id, the_id);
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'LoadQuotations'
		, where : 'LoadQuotations.loadout_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	= 'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'LoadOuts'
		, set	:  my_set
		, where : 'LoadOuts.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Remarks saved, ' + the_response.message);
		JKY.row = JKY.get_row('LoadOuts', JKY.row.id);
	});
};

JKY.get_color_id = function() {
	return JKY.get_value('jky-color-id');
}

JKY.get_color_name = function() {
	return JKY.get_value('jky-color-name');
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_quoted_weight	= parseFloat(JKY.get_value('jky-quoted-weight'	));
	var my_checkout_weight	= parseFloat(JKY.get_value('jky-checkout-weight'));
	JKY.set_css('jky-checkout-weight', 'color', (my_quoted_weight > my_checkout_weight) ? 'red' : 'black');
};

/**
 *	 print Labels
 */
JKY.print_labels = function() {
	var my_data =
		{ method		: 'get_pieces'
		, specific		: 'loadout_id'
		, specific_id	:  JKY.row.id
		, select		: 'Check Out'
		, order_by		: 'barcode'
		};
	JKY.ajax(false, my_data, function(the_data) {
		var my_pieces = [];
		var my_count = the_data.rows.length;
		
		if (my_count === 0) {
			JKY.display_message(JKY.t('You cannot print labels because there is not any piece associated to this load'));
			return;
		}
		
		JKY.show('jky-loading');
		for(var i=0; i<my_count; i++) {
			var my_row = the_data.rows[i];
			my_pieces.push(my_row.id);

			var my_set = ''
					+     '  order_id =  ' + my_row.order_id
					+ ', load_quot_id =  ' + my_row.load_quot_id
					+  ', produced_by =\'' + my_row.produced_by	 + '\''
					+ ', product_name =\'' + my_row.product_name + '\''
					+   ', product_id =  ' + my_row.product_id
					+       ', ftp_id =  ' + my_row.ftp_id
					+   ', loadout_id =  ' + JKY.row.id
					;
/*					
			if (my_row.load_quot_id) {
				var my_data =
					{ method		: 'get_color_by_load_quot_id'
					, specific_id	:  my_row.load_quot_id
					};
				JKY.ajax(false, my_data, function(the_data) {
					var my_loadquote = the_data.row;
					my_set += ''
						+   ', color_name =\'' + my_loadquote['color_name'	] + '\''
						+     ', color_id =  ' + my_loadquote['id'			]
						+   ', loadout_id =  ' + my_loadquote['loadout_id'	]
						;
				});
			}
*/
			var my_color_id = JKY.get_value('jky-color-id');
			if (my_color_id) {
				my_set += ''
					+   ', color_name =\'' + JKY.get_value('jky-color-name'	) + '\''
					+     ', color_id =  ' + JKY.get_value('jky-color-id'	)
					;
			}else{
				my_set += ''
					+   ', color_name =\'' + my_row.color_name + '\''
					+     ', color_id =  ' + my_row.color_id
					;
			}
			var my_data = '';
			if (JKY.get_value_by_id('Fabrics', 'id', my_row.id)) {
				my_data =
					{ method	: 'update'
					, table		: 'Fabrics'
					, set		:  my_set
					, where		: 'Fabrics.id=' + my_row.id
					}
			}else{
				my_data =
					{ method	: 'insert'
					, table		: 'Fabrics'
					, set		:  my_set
					, id		:  my_row.id
					}
			}
			JKY.ajax(false, my_data);
		}

		var my_data =
			{ method	: 'print_labels'
			, table		: 'Fabrics'
			, ids		: my_pieces.join(',')
			};
		JKY.ajax(false, my_data, function(the_data) {
			var my_labels_printed = parseInt(JKY.get_value('jky-labels-printed')) + my_count;
			JKY.set_value('jky-labels-printed', my_labels_printed);
			JKY.display_message(JKY.t('Labels Printed') + ' ' + my_count);

			var my_data =
				{ method	: 'update'
				, table		: 'LoadOuts'
				, set		: 'labels_printed = ' + my_labels_printed
				, where		: 'LoadOuts.id=' + JKY.row.id
				};
			JKY.ajax(false, my_data);
			JKY.hide('jky-loading');
		});
	});
};

/**
 *	 check in fabrics
 */
JKY.checkin_fabrics = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadQuotations'
		, specific		: 'loadout'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		};
	JKY.ajax(false, my_data, function(the_data) {
		var my_count = the_data.rows.length;
		
		if (my_count === 0) {
			JKY.display_message(JKY.t('You cannot check in because there is not any fabric associated to this load'));
			return;
		}
	
		var my_total = 0;
		JKY.show('jky-loading');
		for(var i=0; i<my_count; i++) {
			var my_row = the_data.rows[i];

			my_data =
				{ method	: 'get_index'
				, table		: 'Fabrics'
				, where		: 'AND Fabrics.load_quot_id=' + my_row.id + ' AND Fabrics.status=\'Active\''
				};
			JKY.ajax(false, my_data, function(the_data) {
				for(var j=0, max=the_data.rows.length; j<max; j++) {
					var my_fabric = the_data.rows[j];

					my_data =
						{ method	: 'update'
						, table		: 'Fabrics'
						, set		: 'status=\'Check In\''
						, where		: 'barcode = ' + my_fabric.barcode
						};
					JKY.ajax(false, my_data, function() {
						JKY.display_message(JKY.t('Fabric') + ' ' + my_fabric.barcode + ' ' + JKY.t('is check in'));
						my_total ++;
					});
				}
			});
		}
		JKY.display_message(JKY.t('Total of') + ' ' + my_total + ' ' + JKY.t('fabrics') + ' ' + JKY.t('is check in'));
		JKY.hide('jky-loading');
	});
};