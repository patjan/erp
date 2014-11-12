/*
 * display OSA Orders ----------------------------------------------------------
 */
var my_peso	= null;
var my_units= null;

JKY.generate_order = function(the_row, the_peso, the_units) {
	my_peso = the_peso ;
	my_units= the_units;
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_order(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_ftp = ''
		+ "<input class='jky-ftp-id'		type='hidden'	value="  + the_row.ftp_id		+ "  />"
		+ "<input class='jky-ftp-number'	disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + the_row.ftp_number		+ "' />"
		+ " <a href='#' onclick='JKY.FTP.display(this, null)'><i class='icon-share'></i></a>"
		;
	var my_machine = ''
		+ "<input class='jky-machine-id'	type='hidden'	value="  + the_row.machine_id	+ "  />"
		+ "<input class='jky-machine-name'	disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + JKY.fix_null(the_row.machine_name)	+ "' />"
		;
	var my_partner = ''
		+ "<input class='jky-partner-id'	type='hidden'	value="  + the_row.partner_id	+ "  />"
		+ "<input class='jky-partner-name'	disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + JKY.fix_null(the_row.partner_name)	+ "' />"
		+ " <a href='#' onClick='JKY.Partner.display(this)'><i class='icon-share'></i></a>"
		;
	var my_quoted_pieces = the_row.quoted_pieces;
	var my_quoted_weight = my_peso * my_units * my_quoted_pieces;
	var my_html = ''
		+ '<tr jky_order_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td class="jky-td-action"	style="text-align:right !important;">' + my_trash + '</td>'
		+ '<td class="jky-td-number"	><input class="jky-number"	disabled	value="' + the_row.order_number + '" /></td>'
		+ '<td class="nowrap" >' + my_ftp		+ '</td>'
		+ '<td class="jky-td-name-s"	>' + my_machine	+ '</td>'
		+ '<td class="nowrap jky-td-name-l"	>' + my_partner	+ '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-pieces"	onchange="JKY.update_order(this, ' + my_id + ')" value="' + my_quoted_pieces + '" /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-quoted-weight"	disabled										 value="' + my_quoted_weight + '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_order = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	var my_ftp_id		= my_tr.find('.jky-ftp-id'		).val();
	var my_machine_id	= my_tr.find('.jky-machine-id'	).val();
	var my_partner_id	= my_tr.find('.jky-partner-id'	).val();
	var my_quoted_pieces= parseInt(my_tr.find('.jky-quoted-pieces').val());

	var my_line	= JKY.get_prev_dom(my_tr, 'osa_line_id');
	var my_line_peso	= my_line.find('.jky-product-peso' ).val();
	var my_line_units	= my_line.find('.jky-product-units').val();
	var my_quoted_weight= my_line_peso * my_line_units * my_quoted_pieces;
	my_tr.find('.jky-quoted-weight').val(my_quoted_weight);
/*
	var my_line_pieces		= parseInt(my_line_pieces_id.val());
	var my_units			= parseInt(my_line_id.find('.jky-product-units').val());

	var my_new_units		= my_line_units + my_diff_units;
	var my_new_pieces		= Math.ceil(my_new_units / my_units);
	var my_diff_pieces		= my_new_pieces - my_line_pieces;

	my_line_units_id .val(my_new_units );
	my_line_pieces_id.val(my_new_pieces);

//	JKY.update_quoted_units(my_line_id, my_diff_units, my_diff_pieces);
*/
	var	my_quoted_pieces	= parseFloat(my_tr.find('.jky-quoted-pieces').val());
	var my_set = ''
		+            'ftp_id =  ' + my_ftp_id
		+      ', machine_id =  ' + my_machine_id
		+      ', partner_id =  ' + my_partner_id
		+   ', quoted_pieces =  ' + my_quoted_pieces
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Orders'
		, set		:  my_set
		, where		: 'Orders.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_order_success);
}

JKY.update_order_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.insert_order = function(the_id, the_osa_line_id, the_product_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_set = ''
		+     '  customer_id=  ' + $('#jky-customer-id').val()
		+     ',  product_id=  ' + the_product_id
		+     ', osa_line_id=  ' + the_osa_line_id
		+      ', osa_number=\'' + $('#jky-osa-number' ).val() + '\''
//		+    ', product_peso=  ' + JKY.line.tr.find('.jky-product-peso').val()
//		+   ', product_units=  ' + JKY.line.tr.find('.jky-product-units').val()
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Orders'
		, set		:  my_set
		};
	JKY.ajax(true, my_data, JKY.insert_order_success);
}

JKY.insert_order_success = function(response) {
	var my_row = JKY.get_row('Orders', response.id);
	var my_html = JKY.generate_order(my_row, my_peso, my_units);
	JKY.line_tr.after(my_html);
	var my_tr = JKY.line_tr.next();
	my_tr.find('.jky-quoted-units'	).focus().select();
	my_tr.find('.jky-quoted-units'	).ForceIntegerOnly();
	my_tr.find('.jky-quoted-price'	).ForceNumericOnly();
//	my_tr.find('.jky-punho-price'	).ForceNumericOnly();
//	my_tr.find('.jky-gola-price'	).ForceNumericOnly();
//	my_tr.find('.jky-galao-price'	).ForceNumericOnly();
}

JKY.delete_order = function(id_name, the_id) {
	var my_tr_id	= $(id_name).parent().parent();
	var my_order_units		= parseInt(my_tr_id.find('.jky-quoted-units').val());
	var my_diff_units		= - my_order_units;

	var my_line_id			= JKY.get_prev_dom(my_tr_id, 'quot_line_id');
	var my_line_units_id	= my_line_id.find('.jky-quoted-units' );
	var my_line_pieces_id	= my_line_id.find('.jky-quoted-pieces');
	var my_line_units		= parseInt(my_line_units_id .val());
	var my_line_pieces		= parseInt(my_line_pieces_id.val());
	var my_units			= parseInt(my_line_id.find('.jky-product-units').val());

	var my_new_units		= my_line_units + my_diff_units;
	var my_new_pieces		= Math.ceil(my_new_units / my_units);
	var my_diff_pieces		= my_new_pieces - my_line_pieces;

	my_line_units_id .val(my_new_units );
	my_line_pieces_id.val(my_new_pieces);

	JKY.update_quoted_units(my_line_id, my_diff_units, my_diff_pieces);

	my_tr_id.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Orders'
		, where		: 'Orders.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_order_success);
}

JKY.delete_order_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.updated_total_pieces();
}

JKY.copy_orders = function(the_id, the_osa_line_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_curr_tr	= JKY.line.tr;
	var my_orders	= [];
	do {
		my_curr_tr = my_curr_tr.prev();
		var my_quot_line_id	= my_curr_tr.attr('quot_line_id');
		if (my_quot_line_id) {
			break;
		}
		var my_quot_order_id	= my_curr_tr.attr('order_id'	);
		if (my_quot_order_id) {
			var my_order_id		= my_curr_tr.find('.jky-order-id'	).val();
			var my_order_name	= my_curr_tr.find('.jky-order-name'	).val();
			var my_order = [];
			my_order.order_id	= my_order_id	;
			my_order.order_name = my_order_name	;
			my_orders.push(my_order);
		}
	} while(my_quot_line_id || my_quot_order_id);

	JKY.display_message(my_orders.length + ' orders copied');
	if (my_orders.length > 0) {
		for(var i=my_orders.length-1; i>=0; i--) {
			var my_order = my_orders[i];
			var my_set = ''
				+       'osa_line_id =  ' + the_osa_line_id
				+        ', order_id =  ' + my_order.order_id
				;
			var my_data =
				{ method	: 'insert'
				, table		: 'Orders'
				, set		:  my_set
				};
			JKY.ajax(true, my_data, JKY.copy_order_success);
		}
	}
}

JKY.copy_order_success = function(response) {
	var my_row  = JKY.get_row('Orders', response.id);
	var my_html = JKY.generate_order(my_row, my_peso, my_units);
	JKY.line_tr.after(my_html);
	var my_tr = JKY.line_tr.next();
//	my_tr.find('.jky-quoted-units'	).focus().select();
	my_tr.find('.jky-quoted-units'	).ForceIntegerOnly();
	my_tr.find('.jky-quoted-price'	).ForceNumericOnly();
}

JKY.update_quoted_units = function(the_line_id, the_diff_units, the_diff_pieces) {
	var my_data =
		{ method	: 'update'
		, table		: 'Orders'
		, where		: 'Orders.id = ' + the_line_id.attr('quot_line_id')
		, set		: 'quoted_units  = quoted_units  + ' + the_diff_units
				  + ', quoted_pieces = quoted_pieces + ' + the_diff_pieces
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method	: 'update'
		, table		: 'Quotations'
		, where		: 'Quotations.id = ' + JKY.row.id
		, set		: 'quoted_pieces = quoted_pieces + ' + the_diff_pieces
		};
	JKY.ajax(true, my_data);
}

JKY.order_ids = function(the_id) {
	var my_rows = [];
	var my_data =
		{ method	: 'get_index'
		, table		: 'Orders'
		, select	:  the_id
		, order_by  : 'Orders.id'
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
					for(var i=0; i<response.rows.length; i++) {
						var my_row = [];
						my_row.id	= response.rows[i].order_id;
						my_row.name = response.rows[i].order_name;
						my_rows.push(my_row);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_rows;
}

JKY.get_name = function(the_id, the_array) {
	var my_name = '';
	for( var i=0; i<the_array.length; i++) {
		if (the_array[i].id == the_id) {
			my_name = the_array[i].name;
			break;
		}
	}
	return my_name;
}

JKY.print_orders = function(the_id) {
	JKY.orders = JKY.order_ids(the_id);
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'Orders'
		, select	:  the_id
		, order_by  : 'Orders.id'
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
							+ '<td class="jky-print-order-name"	>' + my_row.order_name		+ '</td>'
							+ '<td></td>'
							+ '<td class="jky-print-pieces"		>' + my_row.quoted_units	+ '</td>'
							+ '<td class="jky-print-pieces"		>' + my_row.quoted_price	+ '</td>'
							+ '<td								>' + '($/Kg)'				+ '</td>'
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
