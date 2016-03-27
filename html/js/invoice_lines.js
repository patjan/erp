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
	if (my_rows == '') {
		JKY.insert_line();
	}
	JKY.enable_disable_lines();
}

JKY.generate_line = function(the_index, the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_enabled ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_product = ''
		+ "<input class='jky-product-id' type='hidden' value=" + the_row.product_id + " />"
		+ "<input class='jky-product-name' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.product_name + "' />"
		+ " <a href='#' onClick='JKY.Product.display		(this)'><i class='icon-share'		></i></a>"
		+ " <a href='#' onClick='JKY.Product.display_info	(this)'><i class='icon-info-sign'	></i></a>"
//		+ " <a href='#' onClick='JKY.Product.display(this)'><i class='icon-th'		></i></a>"
		;
	var my_disabled  = JKY.is_enabled ? '' : ' disabled="disabled"';
	var my_add_color = '<button class="btn btn-success" type="button" onclick="JKY.insert_color(this, ' + my_id + ')"' + my_disabled + '>' + JKY.t('Add Color') + '</button>';
	var my_copy	= (the_index == 0) ? '' : '<button class="btn btn-success" type="button" onclick="JKY.copy_previous_colors (this, ' + my_id + ')"' + my_disabled + '>' + JKY.t('Copy') + '</button>';
	var my_onchange = JKY.is_enabled ? ' changeable onchange="JKY.update_line(this, ' + my_id + ')"'  : ' disabled="disabled"';
	var my_disabled = ' disabled';
	var my_sold_pieces		= parseFloat(the_row.sold_pieces	).toFixed(0);
	var my_checkout_pieces	= parseFloat(the_row.checkout_pieces).toFixed(0);
	var my_sold_weight		= parseFloat(the_row.sold_weight	).toFixed(2);
	var my_checkout_weight	= parseFloat(the_row.checkout_weight).toFixed(2);
	var my_sold_amount		= parseFloat(the_row.sold_amount	).toFixed(2);
	var my_checkout_amount	= parseFloat(the_row.checkout_amount).toFixed(2);
	var my_html = ''
		+ '<tr class="jky-line" sale_line_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-key-w3"	>' + my_product + '</td>'
		+ '<td class="jky-td-key-m"		>' + my_add_color + '&nbsp;' + my_copy + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-sold-pieces"		value="' +  my_sold_pieces		+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-checkout-pieces"	value="' +  my_checkout_pieces	+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-sold-weight"		value="' +  my_sold_weight		+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-checkout-weight"	value="' +  my_checkout_weight	+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-price"		></td>'
		+ '<td class="jky-td-price"		><input class="jky-sold-amount"		value="' +  my_sold_amount		+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-checkout-amount"	value="' +  my_checkout_amount	+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-discount"		value="' + the_row.discount		+ '"' + my_onchange + ' /></td>'
		+ '</tr>'
		;
	var my_rows = JKY.get_rows('SaleColors', my_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		my_html += JKY.generate_color(my_row);
	}
	return my_html;
}

JKY.update_line = function(the_this, the_id) {
	var my_tr = $(the_this).parent().parent();
	var my_product_id	= my_tr.find('.jky-product-id'	).val();
	var my_discount		= my_tr.find('.jky-discount'	).val();

	var my_total_sold_amount		= 0;
	var my_total_sold_discount		= 0;
	var my_total_checkout_amount	= 0;
	var my_total_checkout_discount	= 0;
	var my_colors = JKY.get_rows('SaleColors', the_id);
	for(var i=0, max=my_colors.length; i<max; i++) {
		var my_color = my_colors[i];

		var my_net_weight		= JKY.calculate_net_weight(JKY.row.id, my_product_id, my_color.sold_pieces		, my_color.sold_weight		);
		var my_sold_amount		= (my_net_weight * my_color.sold_price).toFixed(2);
		var my_sold_discount	= JKY.calculate_discount(my_net_weight, my_color.sold_price, my_color.discount	, my_discount				);

		var my_net_weight		= JKY.calculate_net_weight(JKY.row.id, my_product_id, my_color.checkout_pieces	, my_color.checkout_weight	);
		var my_checkout_amount	= (my_net_weight * my_color.sold_price).toFixed(2);
		var my_checkout_discount= JKY.calculate_discount(my_net_weight, my_color.sold_price, my_color.discount	, my_discount				);

		my_total_sold_amount		+= parseFloat(my_sold_amount		);
		my_total_sold_discount		+= parseFloat(my_sold_discount		);
		my_total_checkout_amount	+= parseFloat(my_checkout_amount	);
		my_total_checkout_discount	+= parseFloat(my_checkout_discount	);
		
		var my_set = ''
			+         'sold_amount = ' + my_sold_amount
			+     ', sold_discount = ' + my_sold_discount
			+   ', checkout_amount = ' + my_checkout_amount
			+ ', checkout_discount = ' + my_checkout_discount
			;
		my_data =
			{ method	: 'update'
			, table		: 'SaleColors'
			, set		:  my_set
			, where		: 'SaleColors.id = ' + my_color.id
			};
		JKY.ajax(true, my_data);
	}

	var my_prev_sold_amount			= JKY.get_value_by_id('SaleLines', 'sold_amount'		, the_id);
	var my_prev_sold_discount		= JKY.get_value_by_id('SaleLines', 'sold_discount'		, the_id);
	var my_prev_checkout_amount		= JKY.get_value_by_id('SaleLines', 'checkout_amount'	, the_id);
	var my_prev_checkout_discount	= JKY.get_value_by_id('SaleLines', 'checkout_discount'	, the_id);
	var my_diff_sold_amount			= my_total_sold_amount		- my_prev_sold_amount		;
	var my_diff_sold_discount		= my_total_sold_discount	- my_prev_sold_discount		;
	var my_diff_checkout_amount		= my_total_checkout_amount	- my_prev_checkout_amount	;
	var my_diff_checkout_discount	= my_total_checkout_discount- my_prev_checkout_discount	;

	var my_set = ''
		+          'product_id = '	+ my_product_id
		+       ', sold_amount = '	+ my_total_sold_amount
		+     ', sold_discount = '	+ my_total_sold_discount
		+   ', checkout_amount = '	+ my_total_checkout_amount
		+ ', checkout_discount = '	+ my_total_checkout_discount
		+          ', discount =\''	+ my_discount + '\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'SaleLines'
		, set		:  my_set
		, where		: 'SaleLines.id = ' + the_id
		};
	JKY.ajax(true, my_data);

	var my_set = ''
		+         'sold_amount = sold_amount + '		+ my_diff_sold_amount
		+     ', sold_discount = sold_discount + '		+ my_diff_sold_discount
		+   ', checkout_amount = checkout_amount + '	+ my_diff_checkout_amount
		+ ', checkout_discount = checkout_discount + '	+ my_diff_checkout_discount
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Sales'
		, set		:  my_set
		, where		: 'Sales.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_sold_amount		= JKY.get_value_by_id('Sales', 'sold_amount'		, JKY.row_id);
		var my_sold_discount	= JKY.get_value_by_id('Sales', 'sold_discount'		, JKY.row_id);
		var my_checkout_amount	= JKY.get_value_by_id('Sales', 'checkout_amount'	, JKY.row_id);
		var my_checkout_discount= JKY.get_value_by_id('Sales', 'checkout_discount'	, JKY.row_id);

		$('#jky-sold-discount'		).val(my_sold_discount		);
		$('#jky-sold-amount'		).val(my_sold_amount		);
		$('#jky-sold-amount'		).change();		//	to activate change event

		$('#jky-checkout-discount'	).val(my_checkout_discount	);
		$('#jky-checkout-amount'	).val(my_checkout_amount	);
		$('#jky-checkout-amount'	).change();		//	to activate change event
	});
};

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'SaleLines'
		, set		: 'SaleLines.parent_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_row = [];
		my_row.id					= the_response.id;
		my_row.order_id				= null;
		my_row.product_id			= null;
		my_row.product_name			= '';
		my_row.sold_pieces			= 0;
		my_row.sold_weight			= 0;
		my_row.sold_amount			= 0;
		my_row.sold_diiscount		= 0;
		my_row.checkout_pieces		= 0;
		my_row.checkout_weight		= 0;
		my_row.checkout_amount		= 0;
		my_row.checkout_diiscount	= 0;
		my_row.discount				= '';

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
						var my_set	=          '  parent_id =   ' + the_to
									+      ',  sale_line_id = NULL'
									+         ', product_id =   ' + my_row.product_id
									+        ', sold_pieces =   ' + my_row.sold_pieces
									+        ', sold_weight =   ' + my_row.sold_weight
									+        ', sold_amount =   ' + my_row.sold_amount
									+      ', sold_discount =   ' + my_row.sold_discount
									+    ', checkout_pieces =   ' + my_row.checkout_pieces
									+    ', checkout_weight =   ' + my_row.checkout_weight
									+    ', checkout_amount =   ' + my_row.checkout_amount
									+  ', checkout_discount =   ' + my_row.checkout_discount
									+           ', discount = \'' + my_row.discount	+ '\''
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
			var my_pieces = $(this).find('.jky-product-pieces');
			if ($(this).next().attr('color_id')) {
				my_pieces.prop('disabled'	, true	);
				my_pieces.prop('changeable'	, false	);
			}else{
				my_pieces.prop('disabled'	, false	);
				my_pieces.prop('changeable'	, true	);
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
							+ '<td class="jky-print-name"	>' +			 my_row.product_name	+ '</td>'
							+ '<td></td>'
							+ '<td class="jky-print-pieces"	>' +			 my_row.sold_pieces		+ '</td>'
							+ '<td class="jky-print-weight"	>' +			 my_row.sold_weight		+ '</td>'
							+ '<td class="jky-print-price"	>' +			 my_row.sold_amount		+ '</td>'
							+ '<td class="jky-print-price"	>' +			 my_row.discount		+ '</td>'
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
