"use strict";
/*
 * display Sale Lines -----------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'SaleLines'
		, select		:  JKY.row.id
		, order_by		: 'SaleLines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(the_response) {
	var my_html  = '';
	var my_rows	 = the_response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_line(i, my_row);
		}
	}
	JKY.set_html('jky-lines-body', my_html);
	$('.jky-product-peso'	).ForceNumericOnly();
	$('.jky-product-units'	).ForceIntegerOnly();
	$('.jky-quoted-units'	).ForceNumericOnly();
	$('.jky-quoted-price'	).ForceNumericOnly();
	if (my_rows == '') {
		JKY.insert_line();
	}
	JKY.enable_disable_lines();
}

JKY.generate_line = function(the_index, the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_product = ''
		+ "<input class='jky-product-id' type='hidden' value=" + the_row.product_id + " />"
		+ "<input class='jky-product-name' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.product_name + "' />"
		+ " <a href='#' onClick='JKY.Product.display		(this)'><i class='icon-share'		></i></a>"
		+ " <a href='#' onClick='JKY.Product.display_info	(this)'><i class='icon-info-sign'	></i></a>"
//		+ " <a href='#' onClick='JKY.Product.display(this)'><i class='icon-th'		></i></a>"
		;
	var my_machine = ''
		+ "<input class='jky-machine-id' type='hidden' value=" + the_row.machine_id + " />"
		+ "<input class='jky-machine-name' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.machine_name + "' />"
		+ " <a href='#' onClick='JKY.Machine.display(this)'><i class='icon-share'	></i></a>"
		;
	var my_disabled = JKY.is_status('Draft') ? '' : ' disabled="disabled"';
	var my_add_color = '<button class="btn btn-success" type="button" onclick="JKY.insert_color(this, ' + my_id + ')"' + my_disabled + '>' + JKY.t('Add Color') + '</button>';
	var my_copy	= (the_index == 0) ? '' : '<button class="btn btn-success" type="button" onclick="JKY.copy_previous_colors (this, ' + my_id + ')"' + my_disabled + '>' + JKY.t('Copy') + '</button>';
	var my_onchange = ' changeable onchange="JKY.update_line(this, ' + my_id + ')"';
	var my_disabled = ' disabled';
	var my_html = ''
		+ '<tr class="jky-line" sale_line_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-key-w3"	>' + my_product + '</td>'
		+ '<td class="jky-td-key"		>' + my_machine + '</td>'
		+ '<td class="jky-td-name-s"	><input class="jky-remarks"			value="' + JKY.fix_null(the_row.remarks			) + '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-key-m"		>' + my_add_color + '&nbsp;' + my_copy + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-product-peso"	value="' + JKY.fix_null(the_row.peso			) + '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-units"	value="' + JKY.fix_null(the_row.quoted_units	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-units"		><input class="jky-product-units"	value="' + JKY.fix_null(the_row.units			) + '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-pieces"	value="' + JKY.fix_null(the_row.quoted_pieces	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-units"></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-discount"		value="' + JKY.fix_null(the_row.discount		) + '"' + my_onchange + ' /></td>'
		+ '</tr>'
		;
	var my_rows = JKY.get_rows('SaleColors', my_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		my_html += JKY.generate_color(my_row, the_row.units);
	}
	return my_html;
}

JKY.update_line = function(the_this, the_id) {
	var my_tr = $(the_this).parent().parent();
	var my_product_id	= my_tr.find('.jky-product-id'		).val();
	var my_machine_id	= my_tr.find('.jky-machine-id'		).val();
	var my_remarks		= my_tr.find('.jky-remarks'			).val();
	var my_peso			= my_tr.find('.jky-product-peso'	).val();
	var my_quoted_units	= my_tr.find('.jky-quoted-units'	).val();
	var my_units		= my_tr.find('.jky-product-units'	).val();
	var my_quoted_pieces= my_tr.find('.jky-quoted-pieces'	).val();
	var my_discount		= my_tr.find('.jky-discount'		).val();
/*
	if (my_units < 1) {
		JKY.display_message(JKY.set_value_is_under('Units/Piece', 1));
		my_tr.find('.jky-product-units').select();
		my_tr.find('.jky-product-units').focus();
		return false;
	}
*/
	var my_new_pieces	= (my_units == 0 ) ? my_quoted_units : Math.ceil(my_quoted_units / my_units);
	var my_diff_pieces	= my_new_pieces - my_quoted_pieces;

	var my_line_pieces_id	= my_tr.find('.jky-quoted-pieces');
	my_line_pieces_id.val(my_new_pieces);

	var my_set = ''
		+    '  product_id =  ' + my_product_id
		+    ', machine_id =  ' + my_machine_id
		+       ', remarks =\'' + my_remarks + '\''
		+          ', peso =  ' + my_peso
		+         ', units =  ' + my_units
		+ ', quoted_pieces =  ' + my_new_pieces
		+      ', discount =\'' + my_discount + '\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'SaleLines'
		, set		:  my_set
		, where		: 'SaleLines.id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method	: 'update'
		, table		: 'Sales'
		, where		: 'Sales.id = ' + JKY.row.id
		, set		: 'sold_pieces = sold_pieces + ' + my_diff_pieces
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.update_sale_amount();
	})
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'SaleLines'
		, set		: 'SaleLines.parent_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_row = [];
		my_row.id				= the_response.id;
		my_row.order_id			= null;
		my_row.product_id		= null;
		my_row.product_name		= '';
		my_row.machine_id		= null;
		my_row.machine_name		= '';
		my_row.remarks			= '';
		my_row.peso				= 0;
		my_row.quoted_units		= 0;
		my_row.units			= 0;
		my_row.quoted_pieces	= 0;
		my_row.discount			= '';

		var my_count = JKY.get_count_by_id('SaleLines', JKY.row.id);
		var my_html = JKY.generate_line(my_count-1, my_row);
		JKY.append_html('jky-lines-body', my_html);
	})
}

JKY.copy_lines = function(the_source, the_to) {
	var my_data =
		{ method	: 'get_rows'
		, table		: 'SaleLines'
		, where		: 'SaleLines.parent_id = ' + the_source
		, order_by  : 'SaleLines.id'
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(the_response) {
				if (the_response.status == 'ok') {
					var my_rows = the_response.rows;
					for(var i in my_rows) {
						var my_row	= my_rows[i];
						var my_set	= '      parent_id =   ' + the_to
									+ ',  sale_line_id = NULL'
									+ ',    product_id =   ' + my_row.product_id
									+ ',    machine_id =   ' + my_row.machine_id
									+ ',          peso =   ' + my_row.peso
									+ ', quoted_weight =   ' + my_row.quoted_weight
									+ ',  quoted_units =   ' + my_row.quoted_units
									+ ', quoted_pieces =   ' + my_row.quoted_pieces
									+ ',         units =   ' + my_row.units
									+ ',      discount = \'' + my_row.discount	+ '\''
									+ ',       remarks = \'' + my_row.remarks	+ '\''
									;
						var	my_data =
							{ method	: 'insert'
							, table		: 'SaleLines'
							, set		:  my_set
							};
						JKY.ajax(false, my_data, function(the_response) {
							JKY.copy_colors(my_row.id, the_response.id);
						})
					}
				}else{
					JKY.display_message(the_response.message);
				}
			}
		}
	)
}

JKY.delete_line = function(the_this, the_id) {
	var my_count = JKY.get_count_by_id('SaleColors', the_id);
	if (my_count > 0) {
		JKY.display_message(JKY.t('Error, delete first all sub records'));
		return;
	}

	$(the_this).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'SaleLines'
		, where		: 'SaleLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
//		JKY.verify_total_percent();
	})
}

JKY.enable_disable_lines = function() {
	$('#jky-lines-body tr').each(function() {
		if ($(this).hasClass('jky-line')) {
			var my_peso  = $(this).find('.jky-product-peso' );
			var my_units = $(this).find('.jky-product-units');
			if ($(this).next().attr('color_id')) {
				my_peso .prop('disabled'	, true	);
				my_units.prop('disabled'	, true	);
				my_peso .prop('changeable'	, false	);
				my_units.prop('changeable'	, false	);
			}else{
				my_peso .prop('disabled'	, false	);
				my_units.prop('disabled'	, false	);
				my_peso .prop('changeable'	, true	);
				my_units.prop('changeable'	, true	);
			}
		}
	});
}

JKY.print_lines = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'SaleLines'
		, select	:  the_id
		, order_by  : 'SaleLines.id'
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					var my_rows = response.rows;
					for(var i in my_rows) {
						var my_row = my_rows[i];
						my_html  += ''
							+ '<tr class="jky-bold">'
							+ '<td class="jky-print-name"	>' + my_row.product_name	+ '</td>'
							+ '<td class="jky-print-name-s"	>' + my_row.remarks			+ '</td>'
							+ '<td></td>'
							+ '<td class="jky-print-pieces"	>' + my_row.peso			+ '</td>'
							+ '<td class="jky-print-pieces"	>' + my_row.quoted_units	+ '</td>'
							+ '<td class="jky-print-pieces"	>' + my_row.quoted_pieces	+ '</td>'
							+ '<td class="jky-print-pieces"	>' + my_row.discount		+ '</td>'
							+ '</tr>'
							;
						my_html  += JKY.print_colors(my_row.id);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}
