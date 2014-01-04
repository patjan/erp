/*
 * display Orders --------------------------------------------------------------
 */

var my_loadout_id			= 0;
var my_old_checkin_weight	= 0;
var my_old_unit_price		= 0;
var my_new_checkin_weight	= 0;
var my_new_unit_price		= 0;
var my_row_order				= null;

JKY.display_orders = function() {
	my_loadout_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadOrders'
		, specific		: 'loadout'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'LoadOut.loadout_number'
		};
	JKY.ajax(false, my_data, JKY.generate_orders);
}

JKY.generate_orders = function(response) {
	var my_html		= '';
	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_order(my_row);

			var my_percent = parseFloat(my_row.percent);
			my_total += my_percent;
		}
	}
	JKY.set_html('jky-order-total', my_total);
	JKY.set_html('jky-orders-body', my_html);
	if (my_rows == '') {
		JKY.insert_order();
	}
}

JKY.generate_order = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.status == 'Draft') ? '<a onclick="JKY.delete_order(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_order = ''
		+ "<input class='jky-row-order-id' type='hidden' value=" + the_row.order_id + " />"
		+ "<input class='jky-row-order-number' disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + JKY.fix_null(the_row.order_number) + "' />"
		+ " <a href='#' onClick='JKY.Order.display(this)'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr order_id=' + my_id + '>'
		+ '<td class="jky-action"				>' + my_trash	+ '</td>'
		+ '<td class="jky-td-order-number"		>' + my_order	+ '</td>'
		+ '<td class="jky-td-customer-name"		><input  class="jky-customer-name"		disabled value="' + JKY.fix_null	(the_row.customer_name	)	+ '" /></td>'
		+ '<td class="jky-td-product-name"		><input  class="jky-product-name"		disabled value="' + JKY.fix_null	(the_row.product_name	)	+ '" /></td>'
		+ '<td class="jky-td-pieces"			><input  class="jky-ordered-pieces"		disabled value="' + JKY.fix_null	(the_row.ordered_pieces	)	+ '" /></td>'
		+ '<td class="jky-td-pieces"			><input  class="jky-produced-pieces"	disabled value="' + JKY.fix_null	(the_row.produced_pieces)	+ '" /></td>'
		+ '<td class="jky-td-pieces"			><input  class="jky-loadout-pieces"		disabled value="' +					 the_row.loadout_pieces		+ '" /></td>'
		+ '<td class="jky-td-pieces"			><input  class="jky-requested-pieces"	onchange="JKY.update_order(this, ' + my_id + ')"  value="' + the_row.requested_pieces + '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_order = function(id_name, the_id ) {
	JKY.display_trace('update_order');
	JKY.select_order(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_order_line_id	= my_tr.find('.jky-thread-row-id'	).val();
	var my_orderin_id		= my_tr.find('.jky-orderin-row-id'	).val();
	var my_product_code		= my_tr.find('.jky-product-code'	).val();
//	var my_order			= my_tr.find('.jky-order-number'	).val();
//	var my_average_weight	= parseFloat(my_tr.find('.jky-average-weight'	).val());
//	var my_requested_boxes	= parseFloat(my_tr.find('.jky-requested-boxes'	).val());
	var my_requested_weight	= parseFloat(my_tr.find('.jky-requested-weight'	).val());

	var my_unit_price		= 0;
	var my_average_weight	= 0;
	var my_requested_boxes	= 0;
	if (!isNaN(my_orderin_id)) {
		my_row_orderin		= JKY.get_row('Sales', my_orderin_id);
		my_unit_price		= my_row_orderin.unit_price;
		my_average_weight	= my_row_orderin.average_weight;
		my_requested_boxes	= Math.round(my_requested_weight / my_average_weight + 0.5);
	}
	my_tr.find('.jky-average-weight' ).val(my_average_weight );
	my_tr.find('.jky-requested-boxes').val(my_requested_boxes);

	var my_set = ''
		+      'order_line_id =  ' + my_order_line_id
		+       ', orderin_id =  ' + my_orderin_id
		+             ', code =\'' + my_product_code	+ '\''
//		+           ', orders =\'' + my_orders_code		+ '\''
		+       ', unit_price =  ' + my_unit_price
		+   ', average_weight =  ' + my_average_weight
		+  ', requested_boxes =  ' + my_requested_boxes
		+ ', requested_weight =  ' + my_requested_weight
		;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadSales'
		, set		:  my_set
		, where		: 'LoadSales.id = ' + the_id
		};
	my_new_requested_weight = my_requested_weight;
	JKY.ajax(true, my_data, JKY.update_order_success);
}

JKY.update_order_success = function(response) {
JKY.display_trace('update_order_success');
//	JKY.display_message(response.message)
	JKY.update_checkout();
}

JKY.insert_order = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'LoadOrders'
		, set		: 'LoadOrders.loadout_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_order_success);
}

JKY.insert_order_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.order_line_id	= null;
	my_row.requested_pieces	= 0;
	my_row.loadout_pieces	= 0;
	my_row.returned_pieces	= 0;

	var my_html = JKY.generate_order(my_row);
	JKY.append_html('jky-orders-body', my_html);
}

JKY.delete_order = function(id_name, the_id) {
	JKY.select_order(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'LoadSales'
		, where		: 'LoadSales.id = ' + the_id
		};
	my_new_requested_weight = 0;
	JKY.ajax(true, my_data, JKY.delete_order_success);
}

JKY.delete_order_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_checkout();
}

JKY.select_order = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadSales'
		, where		: 'LoadSales.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_order_success);
}

JKY.select_order_success = function(response) {
	my_old_requested_weight = parseFloat(response.row.requested_weight);
}

JKY.update_checkout = function() {
JKY.display_trace('update_checkout');
	var my_delta_weight = (my_new_requested_weight - my_old_requested_weight);
	var my_set = ' requested_weight = requested_weight + ' + my_delta_weight;
	var my_data =
		{ method	: 'update'
		, table		: 'CheckOuts'
		, set		: my_set
		, where		: 'CheckOuts.id = ' + my_loadout_id
		};
	JKY.ajax(false, my_data, JKY.update_checkout_success);
}

JKY.update_checkout_success = function(response) {
JKY.display_trace('update_checkout_success');
//	JKY.display_message(response.message)
	var my_data =
		{ method	: 'get_row'
		, table		: 'CheckOuts'
		, where		: 'CheckOuts.id = ' + my_loadout_id
		};
	JKY.ajax(true, my_data, JKY.display_checkout_requested);
}

JKY.display_checkout_requested = function(response) {
JKY.display_trace('display_checkout_requested');
//	JKY.display_message(response.message)
	var my_requested_weight = parseFloat(response.row.requested_weight);
//	var my_requested_amount = parseFloat(response.row.requested_amount);
	JKY.set_value('jky-requested-weight', my_requested_weight);
//	JKY.set_value('jky-requested-amount', my_requested_amount);
	JKY.set_calculated_color();
}

JKY.print_orders = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'LoadOrders'
		, select	:  the_id
		, order_by  : 'LoadSales.id'
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
						var my_row			= my_rows[i];
						var my_name			= my_row.name;
						var my_supplier		= my_row.supplier;
						var my_percent		= parseFloat(my_row.percent);
						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_percent + '</td>'
							+ '<td>' + my_name    + '</td>'
							+ '<td>' + my_supplier+ '</td>'
							+ '</tr>'
							;
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}
