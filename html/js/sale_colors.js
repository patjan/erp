"use strict";
/*
 * display Sale Colors ----------------------------------------------------
 */

JKY.generate_color = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_enabled ? '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_color = ''
		+ "<input class='jky-color-id'	 type='hidden' value=" + the_row.color_id   + " />"
		+ "<input class='jky-color-type' type='hidden' value=" + the_row.color_type + " />"
		+ "<input class='jky-color-name' disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ " <a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_onchange = JKY.is_enabled ? ' changeable onchange="JKY.update_color(this, ' + my_id + ')"'  : ' disabled="disabled"';
	var my_disabled = ' disabled';
	var my_sold_pieces		= parseFloat(the_row.sold_pieces	).toFixed(0);
	var my_checkout_pieces	= parseFloat(the_row.checkout_pieces).toFixed(0);
	var my_sold_weight		= parseFloat(the_row.sold_weight	).toFixed(2);
	var my_checkout_weight	= parseFloat(the_row.checkout_weight).toFixed(2);
	var my_sold_price		= parseFloat(the_row.sold_price		).toFixed(2);
	var my_sold_amount		= parseFloat(the_row.sold_amount	).toFixed(2);
	var my_checkout_amount	= parseFloat(the_row.checkout_amount).toFixed(2);
	var my_html = ''
		+ '<tr color_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td class="jky-td-action"	colspan="1" style="text-align:right !important;">' + my_trash + '</td>'
		+ '<td class="jky-td-key-m"		>' + my_color + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-sold-pieces"		value="' + my_sold_pieces		+ '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-checkout-pieces"	value="' + my_checkout_pieces	+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-sold-weight"		value="' + my_sold_weight		+ '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-checkout-weight"	value="' + my_checkout_weight	+ '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-sold-price"		value="' + my_sold_price		+ '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-sold-amount"		value="' + my_sold_amount		+ '"' + my_disabled	+ ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-checkout-amount"	value="' + my_checkout_amount	+ '"' + my_disabled	+ ' /></td>'
		+ '<td class="jky-td-price"		><input class="jky-discount"		value="' + the_row.discount		+ '"' + my_onchange + ' /></td>'
		+ '</tr>'
		;
	return my_html;
};

JKY.get_sold_price = function(my_product_id, my_color_type) {
	var my_where =		'ProdPrices.product_id = ' + my_product_id
				 + ' AND ProdPrices.color_type = \'' + my_color_type + '\''
				 + ' AND ProdPrices.current_price > 0'
				 ;
	var my_rows = JKY.get_rows_by_where('ProdPrices', my_where);

	if (my_rows.length == 0) {
//		default, get [Quoted Price] from [Color Type] = Unico		
		my_where =		'ProdPrices.product_id = ' + my_product_id
				 + ' AND ProdPrices.color_type = \'Unico\''
				 + ' AND ProdPrices.current_price > 0'
				 ;
		my_rows = JKY.get_rows_by_where('ProdPrices', my_where);
	};

	if (my_rows.length == 0) {
		return 0
	}else{
		return my_rows[0].current_price;
	};
};

JKY.calculate_net_weight = function(the_sale_id, the_product_id, the_sold_pieces, the_sold_weight) {
	var my_cone_weight = 0;
	var my_deduct_cone = JKY.get_value_by_id('Sales', 'deduct_cone', the_sale_id);
	if (my_deduct_cone === 'Yes') {
		var my_product_type	= JKY.get_value_by_id('Products', 'product_type', the_product_id);
		var my_config_value = JKY.get_config_value('Cone Types', my_product_type);
		if (my_config_value) {
			my_cone_weight = my_config_value / 1000;
		}
	}
	return the_sold_weight - (the_sold_pieces * my_cone_weight);
}

JKY.calculate_discount = function(the_sold_weight, the_sold_price, the_color_discount, the_line_discount) {
	var my_color_discount = the_color_discount.trim();
	if (my_color_discount === '')		{my_color_discount = the_line_discount.trim();}
	if (my_color_discount === '')		{return 0;}

	var my_discount_price = 0;
	var my_length = my_color_discount.length;
	if (my_color_discount.substr(my_length-1, 1) === '%') {
		my_color_discount = parseFloat(my_color_discount);
		if (!isNaN(my_color_discount)) {
			my_discount_price = the_sold_price * my_color_discount / 100;
		}
	}else{
		my_color_discount = parseFloat(my_color_discount);
		if (!isNaN(my_color_discount)) {
			my_discount_price = my_color_discount;
		}
	};

	return (the_sold_weight * my_discount_price).toFixed(2);
};

JKY.check_availability = function(the_this, the_product_id, the_color_id, the_sold_pieces) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'FabricCounters'
		, where		: 'product_id=' + the_product_id + ' AND color_id=' + the_color_id
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_available = 0;
		if (the_response.row) {
			my_available = parseInt(the_response.row.climate) + parseInt(the_response.row.stock);
		}
		if (my_available >= the_sold_pieces) {
			$(the_this).css('background-color', '#eeeeee');
		}else{
			$(the_this).css('background-color', 'red');
			if (my_available === 0) {
				JKY.display_message(JKY.t('There is not any piece available on stock'));
			}else{
				JKY.display_message(JKY.t('Stock has only') + ' ' + my_available + ' ' + JKY.t('pieces available'));
			}
		}
	});
}

JKY.update_color = function(the_this, the_id) {
	var my_tr = $(the_this).parent().parent();
	if (my_tr.find('.jky-sold-price'		).val() == '')	my_tr.find('.jky-sold-price'		).val(0);
	if (my_tr.find('.jky-sold-pieces'		).val() == '')	my_tr.find('.jky-sold-pieces'		).val(0);
	if (my_tr.find('.jky-sold-weight'		).val() == '')	my_tr.find('.jky-sold-weight'		).val(0);
	if (my_tr.find('.jky-sold-amount'		).val() == '')	my_tr.find('.jky-sold-amount'		).val(0);
	if (my_tr.find('.jky-checkout-pieces'	).val() == '')	my_tr.find('.jky-checkout-pieces'	).val(0);
	if (my_tr.find('.jky-checkout-weight'	).val() == '')	my_tr.find('.jky-checkout-weight'	).val(0);
	if (my_tr.find('.jky-checkout-amount'	).val() == '')	my_tr.find('.jky-checkout-amount'	).val(0);

	var my_line_id		= JKY.get_prev_dom(my_tr, 'sale_line_id');
	var my_product_id	= my_line_id.find('.jky-product-id'	).val();
	var my_line_discount= my_line_id.find('.jky-discount'	).val();

	var my_color_id		= my_tr.find('.jky-color-id'  ).val();
		my_color_id		= (my_color_id == '') ? 'null' : my_color_id;
	var my_color_type	= my_tr.find('.jky-color-type').val();

	var my_sold_price		= parseFloat(my_tr.find('.jky-sold-price'		).val()).toFixed(2);
	var	my_sold_pieces		= parseFloat(my_tr.find('.jky-sold-pieces'		).val()).toFixed(0);
	var	my_sold_weight		= parseFloat(my_tr.find('.jky-sold-weight'		).val()).toFixed(2);
	var	my_checkout_pieces	= parseFloat(my_tr.find('.jky-checkout-pieces'	).val()).toFixed(0);
	var	my_checkout_weight	= parseFloat(my_tr.find('.jky-checkout-weight'	).val()).toFixed(2);
	var my_color_discount	=			 my_tr.find('.jky-discount'			).val();

	var $my_line = $(my_tr).prevAll('.jky-line');
	var my_product_id = $my_line.find('.jky-product-id').val();
	JKY.check_availability(the_this, my_product_id, my_color_id, my_sold_pieces);

	if (my_sold_price == 0) {
		my_sold_price = JKY.get_sold_price(my_product_id, my_color_type);
	};

	if (my_sold_weight == 0) {
		my_sold_weight = (my_sold_pieces * JKY.get_config_value('System Controls', 'Average Weight by Fabric')).toFixed(2);
	};

	var my_net_weight		= JKY.calculate_net_weight(JKY.row.id, my_product_id, my_sold_pieces	, my_sold_weight	);
	var my_sold_amount		= (my_net_weight * my_sold_price).toFixed(2);
	var my_sold_discount	= JKY.calculate_discount(my_net_weight, my_sold_price, my_color_discount, my_line_discount	);

	var my_net_weight		= JKY.calculate_net_weight(JKY.row.id, my_product_id, my_checkout_pieces, my_checkout_weight);
	var my_checkout_amount	= (my_net_weight * my_sold_price).toFixed(2);
	var my_checkout_discount= JKY.calculate_discount(my_net_weight, my_sold_price, my_color_discount, my_line_discount	);

	var my_color = JKY.get_row('SaleColors', the_id);
	var	my_diff_sold_pieces			= my_sold_pieces		- my_color.sold_pieces		;
	var	my_diff_sold_weight			= my_sold_weight		- my_color.sold_weight		;
	var	my_diff_sold_amount			= my_sold_amount		- my_color.sold_amount		;
	var	my_diff_sold_discount		= my_sold_discount		- my_color.sold_discount	;
	var	my_diff_checkout_pieces		= my_checkout_pieces	- my_color.checkout_pieces	;
	var	my_diff_checkout_weight		= my_checkout_weight	- my_color.checkout_weight	;
	var	my_diff_checkout_amount		= my_checkout_amount	- my_color.checkout_amount	;
	var	my_diff_checkout_discount	= my_checkout_discount	- my_color.checkout_discount;

	my_tr.find('.jky-sold-price'		).val(my_sold_price		);
	my_tr.find('.jky-sold-pieces'		).val(my_sold_pieces	);
	my_tr.find('.jky-sold-weight'		).val(my_sold_weight	);
	my_tr.find('.jky-sold-amount'		).val(my_sold_amount	);
	my_tr.find('.jky-checkout-pieces'	).val(my_checkout_pieces);
	my_tr.find('.jky-checkout-weight'	).val(my_checkout_weight);
	my_tr.find('.jky-checkout-amount'	).val(my_checkout_amount);

	var my_set = ''
		+            'color_id =  ' + my_color_id
		+        ', color_type =\'' + my_color_type + '\''
		+        ', sold_price =  ' + my_sold_price
		+       ', sold_pieces =  ' + my_sold_pieces
		+       ', sold_weight =  ' + my_sold_weight
		+       ', sold_amount =  ' + my_sold_amount
		+     ', sold_discount =  ' + my_sold_discount
		+   ', checkout_pieces =  ' + my_checkout_pieces
		+   ', checkout_weight =  ' + my_checkout_weight
		+   ', checkout_amount =  ' + my_checkout_amount
		+ ', checkout_discount =  ' + my_checkout_discount
		+        ', discount =\'' + my_color_discount + '\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'SaleColors'
		, set		:  my_set
		, where		: 'SaleColors.id = ' + the_id
		};
	JKY.ajax(true, my_data, function() {
//		JKY.update_sale_amount();
	});
	JKY.update_delta(my_line_id
		, my_diff_sold_pieces    , my_diff_sold_weight    , my_diff_sold_amount    , my_diff_sold_discount
		, my_diff_checkout_pieces, my_diff_checkout_weight, my_diff_checkout_amount, my_diff_checkout_discount
		);
};

JKY.insert_color = function(the_id, the_parent_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_data =
		{ method	: 'insert'
		, table		: 'SaleColors'
		, set		: 'SaleColors.parent_id = ' + the_parent_id
		};
	JKY.ajax(true, my_data,function(the_response) {
		var my_row = [];
		my_row.id				= the_response.id;
		my_row.color_id			= null;
		my_row.color_name		= '';
		my_row.color_type		= '';
		my_row.sold_price		= 0;
		my_row.sold_pieces		= 0;
		my_row.sold_weight		= 0;
		my_row.sold_amount		= 0;
		my_row.sold_discount	= 0;
		my_row.checkout_pieces	= 0;
		my_row.checkout_weight	= 0;
		my_row.checkout_amount	= 0;
		my_row.checkout_discount= 0;
		my_row.discount			= '';
		var my_html = JKY.generate_color(my_row);
		JKY.line_tr.after(my_html);
		var my_tr = JKY.line_tr.next();
		my_tr.find('.jky-sold-price'	).ForceNumericOnly();
		my_tr.find('.jky-sold-pieces'	).ForceIntegerOnly();
		my_tr.find('.jky-sold-weight'	).ForceNumericOnly();
		JKY.enable_disable_lines();
	});
};

JKY.copy_colors = function(the_source, the_to) {
	var my_data =
		{ method	: 'get_rows'
		, table		: 'SaleColors'
		, where		: 'SaleColors.parent_id = ' + the_source
		, order_by  : 'SaleColors.id'
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
						var my_set	= '          parent_id =   ' + the_to
									+ ',          color_id =   ' + my_row.color_id
									+ ',        color_type = \'' + my_row.color_type + '\''
									+ ',        sold_price =   ' + my_row.sold_price
									+ ',       sold_pieces =   ' + my_row.sold_pieces
									+ ',       sold_weight =   ' + my_row.sold_weight
									+ ',       sold_amount =   ' + my_row.sold_amount
									+ ',     sold_discount =   ' + my_row.sold_discount
									+ ',   checkout_pieces =   ' + my_row.checkout_pieces
									+ ',   checkout_weight =   ' + my_row.checkout_weight
									+ ',   checkout_amount =   ' + my_row.checkout_amount
									+ ', checkout_discount =   ' + my_row.checkout_discount
									+ ',          discount = \'' + my_row.discount	+ '\''
									;
						var	my_data =
							{ method	: 'insert'
							, table		: 'SaleColors'
							, set		:  my_set
							};
						JKY.ajax(false, my_data, function(the_response) {
						})
					}
				}else{
					JKY.display_message(the_response.message);
				}
			}
		}
	);
};

JKY.delete_color = function(the_this, the_id) {
	var my_tr = $(the_this).parent().parent();

	var my_line_id = JKY.get_prev_dom(my_tr, 'sale_line_id');

	var my_color = JKY.get_row('SaleColors', the_id);
	var	my_diff_sold_pieces			= - my_color.sold_pieces;
	var	my_diff_sold_weight			= - my_color.sold_weight;
	var	my_diff_sold_amount			= - my_color.sold_amount;
	var	my_diff_sold_discount		= - my_color.sold_discount;
	var	my_diff_checkout_pieces		= - my_color.checkout_pieces;
	var	my_diff_checkout_weight		= - my_color.checkout_weight;
	var	my_diff_checkout_amount		= - my_color.checkout_amount;
	var	my_diff_checkout_discount	= - my_color.checkout_discount;
	my_tr.remove();

	var my_data =
		{ method	: 'delete'
		, table		: 'SaleColors'
		, where		: 'SaleColors.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
//		JKY.update_sale_amount();
		JKY.enable_disable_lines();
	});
	JKY.update_delta(my_line_id
		, my_diff_sold_pieces    , my_diff_sold_weight    , my_diff_sold_amount    , my_diff_sold_discount
		, my_diff_checkout_pieces, my_diff_checkout_weight, my_diff_checkout_amount, my_diff_checkout_discount
		);
};

JKY.copy_previous_colors = function(the_id, the_parent_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_curr_tr	= JKY.line_tr;
	var my_colors	= [];
	do {
		my_curr_tr = my_curr_tr.prev();
		var my_sale_line_id	= my_curr_tr.attr('sale_line_id');
		if (my_sale_line_id) {
			break;
		}
		var my_sale_color_id	= my_curr_tr.attr('color_id');
		if (my_sale_color_id) {
			var my_color = [];
			var my_color_id		= my_curr_tr.find('.jky-color-id'	).val();
			var my_color_name	= my_curr_tr.find('.jky-color-name'	).val();
			my_color.color_id	= my_color_id	;
			my_color.color_name = my_color_name	;
			my_colors.push(my_color);
		}
	} while(my_sale_line_id || my_sale_color_id);

	JKY.display_message(my_colors.length + ' colors copied');
	if (my_colors.length > 0) {
		for(var i = my_colors.length-1; i >= 0; i--) {
//	to ensure to copy in the same sequence as origin with 100 ms of delay
setTimeout(function(x) { return function() {
			var my_color = my_colors[x];
			var my_set = ''
				+  'parent_id = ' + the_parent_id
				+ ', color_id = ' + my_color.color_id
				;
			var my_data =
				{ method	: 'insert'
				, table		: 'SaleColors'
				, set		:  my_set
				};
			JKY.ajax(true, my_data, function(the_response) {
				var my_row  = JKY.get_row('SaleColors', the_response.id);
				var my_html = JKY.generate_color(my_row);
				JKY.line_tr.after(my_html);
				var my_tr = JKY.line_tr.next();
				my_tr.find('.jky-sold-pieces'	).ForceIntegerOnly();
				my_tr.find('.jky-sold-weight'	).ForceNumericOnly();
				my_tr.find('.jky-sold-price'	).ForceNumericOnly();
			})
}; }(i), 100);
		}
		setTimeout(function() {
			JKY.enable_disable_lines();
		}, 500);
	};
};

JKY.update_delta = function(the_line_id
	, the_diff_sold_pieces    , the_diff_sold_weight    , the_diff_sold_amount    , the_diff_sold_discount
	, the_diff_checkout_pieces, the_diff_checkout_weight, the_diff_checkout_amount, the_diff_checkout_discount) {
	var my_sold_pieces		= (parseFloat(the_line_id.find('.jky-sold-pieces'		).val()) + the_diff_sold_pieces		).toFixed(0);
	var my_sold_weight		= (parseFloat(the_line_id.find('.jky-sold-weight'		).val()) + the_diff_sold_weight		).toFixed(2);
	var my_sold_amount		= (parseFloat(the_line_id.find('.jky-sold-amount'		).val()) + the_diff_sold_amount		).toFixed(2);
	var my_checkout_pieces	= (parseFloat(the_line_id.find('.jky-checkout-pieces'	).val()) + the_diff_checkout_pieces	).toFixed(0);
	var my_checkout_weight	= (parseFloat(the_line_id.find('.jky-checkout-weight'	).val()) + the_diff_checkout_weight	).toFixed(2);
	var my_checkout_amount	= (parseFloat(the_line_id.find('.jky-checkout-amount'	).val()) + the_diff_checkout_amount	).toFixed(2);

	the_line_id.find('.jky-sold-pieces'		).val(my_sold_pieces	); 
	the_line_id.find('.jky-sold-weight'		).val(my_sold_weight	);
	the_line_id.find('.jky-sold-amount'		).val(my_sold_amount	);
	the_line_id.find('.jky-checkout-pieces'	).val(my_checkout_pieces); 
	the_line_id.find('.jky-checkout-weight'	).val(my_checkout_weight);
	the_line_id.find('.jky-checkout-amount'	).val(my_checkout_amount);

	var my_sale_line_id = the_line_id.attr('sale_line_id')
	var my_set = ''
		+         'sold_pieces = sold_pieces + '		+ the_diff_sold_pieces
		+       ', sold_weight = sold_weight + '		+ the_diff_sold_weight
		+       ', sold_amount = sold_amount + '		+ the_diff_sold_amount
		+     ', sold_discount = sold_discount + '		+ the_diff_sold_discount
		+   ', checkout_pieces = checkout_pieces + '	+ the_diff_checkout_pieces
		+   ', checkout_weight = checkout_weight + '	+ the_diff_checkout_weight
		+   ', checkout_amount = checkout_amount + '	+ the_diff_checkout_amount
		+ ', checkout_discount = checkout_discount + '	+ the_diff_checkout_discount
		;
	var my_data =
		{ method	: 'update'
		, table		: 'SaleLines'
		, set		:  my_set
		, where		: 'SaleLines.id = ' + my_sale_line_id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_line_amount = JKY.get_value_by_id('SaleLines', 'sold_amount', my_sale_line_id);
		the_line_id.find('.jky-sold-amount'	).val(my_line_amount);
	});

	my_set = ''
		+         'sold_pieces = sold_pieces + '		+ the_diff_sold_pieces
		+       ', sold_weight = sold_weight + '		+ the_diff_sold_weight
		+       ', sold_amount = sold_amount + '		+ the_diff_sold_amount
		+     ', sold_discount = sold_discount + '		+ the_diff_sold_discount
		+   ', checkout_pieces = checkout_pieces + '	+ the_diff_checkout_pieces
		+   ', checkout_weight = checkout_weight + '	+ the_diff_checkout_weight
		+   ', checkout_amount = checkout_amount + '	+ the_diff_checkout_amount
		+ ', checkout_discount = checkout_discount + '	+ the_diff_checkout_discount
		;
	my_data =
		{ method	: 'update'
		, table		: 'Sales'
		, set		:  my_set
		, where		: 'sales.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.row = JKY.get_row('Sales', JKY.row_id)
		$('#jky-sold-discount'		).val(JKY.row.sold_discount		);
		$('#jky-sold-amount'		).val(JKY.row.sold_amount		);
		$('#jky-sold-amount'		).change();		//	to activate change event
		$('#jky-checkout-discount'	).val(JKY.row.checkout_discount	);
		$('#jky-checkout-amount'	).val(JKY.row.checkout_amount	);
		$('#jky-checkout-amount'	).change();		//	to activate change event
		$('#jky-sold-pieces'		).val(JKY.row.sold_pieces);
		$('#jky-sold-weight'		).val(JKY.row.sold_weight);
		JKY.Changes.reset();
	});
};

JKY.print_colors = function(the_id) {
	var my_html = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'SaleColors'
		, select	:  the_id
		, order_by  : 'SaleColors.id'
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
							+ '<tr>'
							+ '<td></td>'
							+ '<td></td>'
							+ '<td class="jky-print-color-name"	>' + my_row.color_name	+ '</td>'
							+ '<td></td>'
							+ '<td class="jky-print-pieces"		>' + my_row.sold_pieces	+ '</td>'
							+ '<td class="jky-print-weight"		>' + my_row.sold_weight	+ '</td>'
							+ '<td class="jky-print-price"		>' + my_row.sold_price	+ '</td>'
							+ '<td class="jky-print-price"		>' + my_row.sold_amount + '</td>'
							+ '<td class="jky-print-price"		>' + my_row.discount	+ '</td>'
							+ '</tr>'
							;
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	);
	return my_html;
};
