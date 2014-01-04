/*
 * display Sales -------------------------------------------------------------
 */

var my_loadout_id			= 0;
var my_old_requested_pieces	= 0;
var my_new_requested_pieces	= 0;

JKY.display_sales = function() {
	my_loadout_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadSales'
		, specific		: 'loadout'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'LoadOut.loadout_number'
		};
	JKY.ajax(false, my_data, JKY.generate_sales);
}

JKY.generate_sales = function(response) {
	var my_html		= '';
//	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_sale(my_row);

//			var my_percent = parseFloat(my_row.percent);
//			my_total += my_percent;
		}
	}
//	JKY.set_html('jky-sale-total', my_total);
	JKY.set_html('jky-sales-body' , my_html);
	$('.jky-requested-pieces').ForceIntegerOnly();
	if (my_rows == '') {
		JKY.insert_sale();
	}
}

JKY.generate_sale = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.status == 'Draft') ? '<a onclick="JKY.delete_sale(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_sale = ''
		+ "<input class='jky-row-sale-color-id' type='hidden' value=" + the_row.sale_color_id + " />"
		+ "<input class='jky-row-sale-number' disabled onchange='JKY.update_sale(this, " + my_id + ")' value='" + JKY.fix_null(the_row.sale_number) + "' />"
		+ " <a href='#' onClick='JKY.Sale.display(this, JKY.get_color_id(), JKY.get_color_name())'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr sale_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-key"		>' + my_sale	+ '</td>'
		+ '<td class="jky-td-text-s"	><input class="jky-customer-name"		value="' + JKY.fix_null	(the_row.customer_name	)	+ '" disabled /></td>'
		+ '<td class="jky-td-text-l"	><input class="jky-product-name"		value="' + JKY.fix_null	(the_row.product_name	)	+ '" disabled /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-sold-pieces"			value="' + JKY.fix_null	(the_row.sold_pieces	)	+ '" disabled /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-checkout-pieces"		value="' + JKY.fix_null	(the_row.checkout_pieces)	+ '" disabled /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-requested-pieces"	value="' +				 the_row.requested_pieces	+ '" onchange="JKY.update_sale(this, ' + my_id + ')"  /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_sale = function(id_name, the_id) {
	JKY.display_trace('update_sale');
	JKY.select_sale(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_sale_color_id	= my_tr.find('.jky-row-sale-color-id'	).val();
	var my_requested_pieces	= parseFloat(my_tr.find('.jky-requested-pieces'	).val());

	var my_set = ''
		+      'sale_color_id =  ' + my_sale_color_id
		+ ', requested_pieces =  ' + my_requested_pieces
		;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadSales'
		, set		:  my_set
		, where		: 'LoadSales.id = ' + the_id
		};
	my_new_requested_pieces = my_requested_pieces;
	JKY.ajax(true, my_data, JKY.update_sale_success);
}

JKY.update_sale_success = function(response) {
JKY.display_trace('update_sale_success');
//	JKY.display_message(response.message)
	JKY.update_loadout();
}

JKY.insert_sale = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'LoadSales'
		, set		: 'LoadSales.loadout_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_sale_success);
}

JKY.insert_sale_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.status			= 'Draft';
	my_row.sale_color_id	= null;
	my_row.requested_pieces	= 0;
	my_row.checkout_pieces	= 0;
	my_row.returned_pieces	= 0;

	var my_html = JKY.generate_sale(my_row);
	JKY.append_html('jky-sales-body', my_html);
	$('#jky-sales-body tr:last a[onclick*="display"]').click();
}

JKY.delete_sale = function(id_name, the_id) {
	JKY.select_sale(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'LoadSales'
		, where		: 'LoadSales.id = ' + the_id
		};
	my_new_requested_pieces = 0;
	JKY.ajax(true, my_data, JKY.delete_sale_success);
}

JKY.delete_sale_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_loadout();
}

JKY.select_sale = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadSales'
		, where		: 'LoadSales.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_sale_success);
}

JKY.select_sale_success = function(response) {
	my_old_requested_pieces = parseFloat(response.row.requested_pieces);
}

JKY.update_loadout = function() {
JKY.display_trace('update_loadout');
	var my_delta_pieces = (my_new_requested_pieces - my_old_requested_pieces);
	var my_set = ' requested_pieces = requested_pieces + ' + my_delta_pieces;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadOuts'
		, set		: my_set
		, where		: 'LoadOuts.id = ' + my_loadout_id
		};
	JKY.ajax(false, my_data, JKY.update_loadout_success);
}

JKY.update_loadout_success = function(response) {
JKY.display_trace('update_loadout_success');
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadOuts'
		, where		: 'LoadOuts.id = ' + my_loadout_id
		};
	JKY.ajax(true, my_data, JKY.display_loadout_requested);
}

JKY.display_loadout_requested = function(response) {
JKY.display_trace('display_loadout_requested');
	var my_requested_pieces = parseFloat(response.row.requested_pieces);
//	var my_requested_amount = parseFloat(response.row.requested_amount);
	JKY.set_value('jky-requested-pieces', my_requested_pieces);
//	JKY.set_value('jky-requested-amount', my_requested_amount);
//	JKY.set_calculated_color();
}

JKY.print_sales = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'LoadSales'
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
