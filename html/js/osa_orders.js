"use strict";
/*
 * display OSA Orders ----------------------------------------------------------
 */

var my_saved_row = [];
var my_peso	= null;
var my_units= null;

JKY.generate_order = function(the_row, the_peso, the_units) {
	my_peso  = the_peso ;
	my_units = the_units;
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_order(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_color = ''
		+ "<input class='jky-color-id'		type='hidden' value=" + the_row.color_id   + " />"
		+ "<input class='jky-color-type'	type='hidden' value=" + the_row.color_type + " />"
		+ "<input class='jky-color-name'	disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ "<a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_ftp = ''
		+ "<input class='jky-ftp-id'		type='hidden'	value="  + the_row.ftp_id		+ "  />"
		+ "<input class='jky-ftp-number'	disabled onchange='JKY.update_order(this, " + my_id + ")' value='" + the_row.ftp_number	+ "' />"
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
	var my_ordered_pieces = the_row.ordered_pieces;
	var my_ordered_weight = (my_units == 0) ? the_row.ordered_weight : my_peso * my_units * my_ordered_pieces;
	var my_disabled		  = (my_units == 0) ? '' : ' disabled';
	var my_html = ''
		+ '<tr jky_order_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td class="jky-td-action" style="text-align:right !important;">' + my_trash + '</td>'
		+ '<td class="jky-td-number"		><input class="jky-number"	disabled	value="' + the_row.order_number + '" /></td>'
		+ '<td class="nowrap" colspan=2		>' + my_color	+ '</td>'
		+ '<td class="nowrap"				>' + my_ftp		+ '</td>'
		+ '<td class="jky-td-name-s"		>' + my_machine	+ '</td>'
		+ '<td class="nowrap jky-td-name-s"	>' + my_partner	+ '</td>'
		+ '<td class="jky-td-pieces"		><input class="jky-ordered-pieces"	onchange="JKY.update_order(this, ' + my_id + ')" value="' + my_ordered_pieces + '" /></td>'
		+ '<td class="jky-td-weight"		><input class="jky-ordered-weight"	onchange="JKY.update_order(this, ' + my_id + ')" value="' + my_ordered_weight + '" ' + my_disabled + '/></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.select_row = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'Orders'
		, where		: 'Orders.id = ' + the_id
		};
	JKY.ajax(false, my_data, function(the_response) {
		my_saved_row = the_response.row;
	})
}

JKY.update_order = function(the_this, the_id) {
	JKY.select_row(the_id);
	var my_tr = $(the_this).parent().parent();
	if (my_tr.find('.jky-ordered-pieces').val() == '')		my_tr.find('.jky-ordered-pieces').val(0);
	if (my_tr.find('.jky-ordered-weight').val() == '')		my_tr.find('.jky-ordered-weight').val(0);

	var my_color_id			= my_tr.find('.jky-color-id'	).val();
	var my_ftp_id			= my_tr.find('.jky-ftp-id'		).val();
	var my_machine_id		= my_tr.find('.jky-machine-id'	).val();
	var my_partner_id		= my_tr.find('.jky-partner-id'	).val();

	var my_line_id		= JKY.get_prev_dom(my_tr, 'osa_line_id');
	var my_line_peso	= my_line_id.find('.jky-product-peso' ).val();
	var my_line_units	= my_line_id.find('.jky-product-units').val();

	var my_ordered_pieces = parseInt  (my_tr.find('.jky-ordered-pieces').val());
	var my_ordered_weight;
	if (my_line_units == 0) {
		my_ordered_weight = parseFloat(my_tr.find('.jky-ordered-weight').val());
	}else{
		my_ordered_weight = my_line_peso * my_line_units * my_ordered_pieces;
		my_tr.find('.jky-ordered-weight').val(my_ordered_weight);
	}

	var my_set = ''
		+          'color_id =  ' + my_color_id
		+          ', ftp_id =  ' + my_ftp_id
		+      ', machine_id =  ' + my_machine_id
		+      ', partner_id =  ' + my_partner_id
		+   ', quoted_weight =  ' + my_ordered_weight
		+   ', quoted_pieces =  ' + my_ordered_pieces
		+  ', ordered_pieces =  ' + my_ordered_pieces
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Orders'
		, set		:  my_set
		, where		: 'Orders.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_delta_pieces = my_ordered_pieces - my_saved_row.quoted_pieces;
		var my_delta_weight = my_ordered_weight - my_saved_row.quoted_weight;
		JKY.update_osa_line(my_line_id, my_delta_pieces, my_delta_weight);
	})
}

JKY.insert_order = function(the_id, the_osa_line_id, the_product_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_set = ''
		+     '  customer_id=  ' + $('#jky-customer-id').val()
		+     ',  product_id=  ' + the_product_id
		+     ', osa_line_id=  ' + the_osa_line_id
		+      ', osa_number=\'' + $('#jky-osa-number' ).val() + '\''
		+	   ', ordered_at=\'' + JKY.row.ordered_at + '\''
		+	    ', needed_at=\'' + JKY.row.needed_at + '\''
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Orders'
		, set		:  my_set
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_row		= JKY.get_row('Orders', the_response.id);
		var my_line_tr	= JKY.line_tr.prev();
		var my_peso		= my_line_tr.find('.jky-product-peso' ).val();
		var my_units	= my_line_tr.find('.jky-product-units').val();
		var my_html		= JKY.generate_order(my_row, my_peso, my_units);
		JKY.line_tr.after(my_html);
		var my_tr = JKY.line_tr.next();
		my_tr.find('.jky-ordered-pieces').ForceIntegerOnly();
		my_tr.find('.jky-ordered-weight').ForceNumericOnly();
	})
}

JKY.delete_order = function(the_this, the_id) {
//	JKY.select_row(the_id);
	var my_tr	= $(the_this).parent().parent();
	var my_line_id	= JKY.get_prev_dom(my_tr, 'osa_line_id');
	var my_delta_pieces	= - parseInt  (my_tr.find('.jky-ordered-pieces').val());
	var my_delta_weight	= - parseFloat(my_tr.find('.jky-ordered-weight').val());

	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Orders'
		, where		: 'Orders.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.update_osa_line(my_line_id, my_delta_pieces, my_delta_weight);
	})
}

JKY.Xcopy_orders = function(the_id, the_osa_line_id) {
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
			JKY.ajax(true, my_data, function(the_response) {
				var my_row  = JKY.get_row('Orders', the_response.id);
				var my_html = JKY.generate_order(my_row, my_peso, my_units);
				JKY.line_tr.after(my_html);
				var my_tr = JKY.line_tr.next();
				my_tr.find('.jky-quoted-units'	).ForceIntegerOnly();
				my_tr.find('.jky-quoted-price'	).ForceNumericOnly();
			})
		}
	}
}

JKY.update_osa_line = function(the_line_id, the_delta_pieces, the_delta_weight) {
	var my_data =
		{ method	: 'update'
		, table		: 'OSA_Lines'
		, where		: 'OSA_Lines.id = ' + the_line_id.attr('osa_line_id')
		, set		: 'ordered_pieces = ordered_pieces + ' + the_delta_pieces
				  + ', ordered_weight = ordered_weight + ' + the_delta_weight
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_line_pieces_id	= the_line_id.find('.jky-ordered-pieces');
		var my_line_weight_id	= the_line_id.find('.jky-ordered-weight' );
		var my_line_pieces		= parseInt  (my_line_pieces_id.val());
		var my_line_weight		= parseFloat(my_line_weight_id.val());
		my_line_pieces_id.val(my_line_pieces + the_delta_pieces);
		my_line_weight_id.val(my_line_weight + the_delta_weight);
	});

	my_data =
		{ method	: 'update'
		, table		: 'OSAs'
		, where		: 'OSAs.id = ' + JKY.row.id
		, set		: 'ordered_pieces = ordered_pieces + ' + the_delta_pieces
		};
	JKY.ajax(true, my_data);
}

JKY.print_orders = function(the_id) {
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
