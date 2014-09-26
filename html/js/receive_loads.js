/*
 * display Loads ---------------------------------------------------------------
 */

var my_old_received_weight	= 0;
var my_old_unit_price		= 0;
var my_new_received_weight	= 0;
var my_new_unit_price		= 0;

JKY.display_loads = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadIns'
		, specific		: 'receive'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'LoadIns.load'
		};
	JKY.ajax(false, my_data, JKY.generate_loads);
}

JKY.generate_loads = function(response) {
	var my_html		= '';
	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_load(my_row);

			var my_percent = parseFloat(my_row.percent);
			my_total += my_percent;
		}
	}
	JKY.set_html('jky-load-total', my_total);
	JKY.set_html('jky-loads-body', my_html);
	$('.jky-received-fabrics'	).ForceIntegerOnly();
	$('.jky-number-of-cones'	).ForceIntegerOnly();
	$('.jky-received-weight'	).ForceNumericOnly();
	$('.jky-unit-price'			).ForceNumericOnly();
	if (my_rows == '') {
		JKY.insert_load();
	}

	if (JKY.row.status == 'Closed') {
		$('#jky-loads-body input[changeable]').prop('disabled', true );
	}else{
		$('#jky-loads-body input[changeable]').prop('disabled', false);
	}
}

JKY.generate_load = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Closed') || the_row.labels_printed > 0 ? '' : '<a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a>';
	var my_share = JKY.is_status('Closed') ? '' : '<a class="jky-product-icon"  href="#" onClick="JKY.Product.display(this)"><i class="icon-share"></i></a>';
	var my_th	 = JKY.is_status('Closed') ? '' : '<a class="jky-purline-icon" href="#" onClick="JKY.PurLine.display(this, ' + JKY.row.dyer_id + ')"><i class="icon-th"></i></a>';
	var my_print = JKY.is_status('Closed') ? '' : '<a onclick="JKY.print_labels(this, ' + my_id + ')"><i class="icon-print"></i></a>';
	var my_product = ''
		+ "<input class='jky-product-id' type='hidden' value=" + the_row.product_id + " />"
		+ "<input class='jky-product-name' disabled onchange='JKY.update_load(this, " + my_id + ")' value='" + the_row.name + "' />"
		+ ' ' + my_share
		;
	var my_purline = ''
		+ "<input class='jky-purline-id' type='hidden' value=" + the_row.purchase_line_id + " />"
		+ "<input class='jky-purline-number' disabled onchange='JKY.update_load(this, " + my_id + ")' value='" + the_row.purchase_number + "' />"
		+ ' ' + my_th
		;
	var my_html = ''
		+ '<tr load_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-code"		><input  changeable	class="jky-load-code"	text="text" onchange="JKY.update_load(this, ' + my_id + ')" value="' + JKY.fix_null(the_row.code	) + '" /></td>'
		+ '<td class="jky-td-number"	><input  changeable	class="jky-load-number"	text="text" onchange="JKY.update_load(this, ' + my_id + ')" value="' + JKY.fix_null(the_row.load	) + '" /></td>'
		+ '<td class="jky-td-product"	>' + my_product  + '</td>'
		+ '<td class="jky-td-key"		>' + my_purline + '</td>'
		+ '<td class="jky-td-fabrics"	><input  changeable	class="jky-received-fabrics"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + the_row.received_fabrics	+ '" /></td>'
		+ '<td class="jky-td-key-s"		><input  disabled	class="jky-labels-printed"													    value="' + the_row.labels_printed	+ '" /> ' + my_print + '</td>'
		+ '<td class="jky-td-integer"	><input  changeable	class="jky-number-of-cones"		onchange="JKY.update_load(this, ' + my_id + ')" value="' + the_row.number_of_cones	+ '" /></td>'
		+ '<td class="jky-td-weight"	><input  changeable	class="jky-received-weight"		onchange="JKY.update_load(this, ' + my_id + ')" value="' + the_row.received_weight	+ '" /></td>'
		+ '<td class="jky-td-price"		><input  changeable	class="jky-unit-price"			onchange="JKY.update_load(this, ' + my_id + ')" value="' + the_row.unit_price		+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_load = function(id_name, the_id ) {
	JKY.display_trace('update_load');
	JKY.select_load(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_product_id		=			 my_tr.find('.jky-product-id'		).val() ;
	var my_purline_id		=			 my_tr.find('.jky-purline-id'		).val() ;
	var my_code				=			 my_tr.find('.jky-load-code'		).val() ;
	var my_load				=			 my_tr.find('.jky-load-number'		).val().toUpperCase();
	var my_received_fabrics	= parseFloat(my_tr.find('.jky-received-fabrics'	).val());
	var my_number_of_cones	= parseFloat(my_tr.find('.jky-number-of-cones'	).val());
	var my_received_weight	= parseFloat(my_tr.find('.jky-received-weight'	).val());
	var my_unit_price		= parseFloat(my_tr.find('.jky-unit-price'		).val());
	var my_average_weight	= 0;
	if (my_received_fabrics > 0) {
		my_average_weight	= my_received_weight / my_received_fabrics;
	}

	var my_set = ''
		+           'product_id =  ' + my_product_id
		+   ', purchase_line_id =  ' + my_purline_id
		+               ', code =\'' + my_code	+ '\''
		+               ', load =\'' + my_load	+ '\''
		+   ', received_fabrics =  ' + my_received_fabrics
		+    ', number_of_cones =  ' + my_number_of_cones
		+    ', received_weight =  ' + my_received_weight
		+         ', unit_price =  ' + my_unit_price
		+     ', average_weight =  ' + my_average_weight
		;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadIns'
		, set		:  my_set
		, where		: 'LoadIns.id = ' + the_id
		};
	my_new_received_weight	= my_received_weight;
	my_new_unit_price		= my_unit_price		;
	JKY.ajax(true, my_data, JKY.update_load_success);
}

JKY.update_load_success = function(response) {
JKY.display_trace('update_load_success');
//	JKY.display_message(response.message)
	JKY.update_receive(response.id);
}

JKY.insert_load = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'LoadIns'
		, set		: 'LoadIns.receivedyer_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_load_success);
}

JKY.insert_load_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.code				= '';
	my_row.load			= '';
	my_row.product_id		= null;
	my_row.purchase_line_id	= null;
	my_row.received_fabrics	= 0;
	my_row.labels_printed	= 0;
	my_row.number_of_cones	= 0;
	my_row.received_weight	= 0;
	my_row.unit_price		= 0;

	var my_html = JKY.generate_load(my_row);
	JKY.append_html('jky-loads-body', my_html);
}

JKY.delete_load = function(id_name, the_id) {
	JKY.select_load(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'LoadIns'
		, where		: 'LoadIns.id = ' + the_id
		};
	my_new_received_weight	= 0;
	my_new_unit_price		= 0;
	JKY.ajax(true, my_data, JKY.delete_load_success);
}

JKY.delete_load_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_receive(response.id);
}

JKY.select_load = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadIns'
		, where		: 'LoadIns.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_load_success);
}

JKY.select_load_success = function(response) {
	my_old_received_weight	= parseFloat(response.row.received_weight);
	my_old_unit_price		= parseFloat(response.row.unit_price	 );
}

JKY.update_receive = function(the_load_id) {
	JKY.display_trace('update_receive');
	var my_delta_weight = (my_new_received_weight - my_old_received_weight);
	var my_delta_amount = (my_new_received_weight * my_new_unit_price)
						- (my_old_received_weight * my_old_unit_price)
						;
	var my_set = ''
		+  ' received_weight = received_weight + ' + my_delta_weight
		+ ', received_amount = received_amount + ' + Math.round(my_delta_amount * 100) / 100
		;
	var my_data =
		{ method	: 'update'
		, table		: 'ReceiveDyers'
		, set		:  my_set
		, where		: 'receivedyer.id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.update_receive_success);

	var my_purchase_line_id = JKY.get_value_by_id('LoadIns', 'purchase_line_id', the_load_id);
	if (my_purchase_line_id) {
		my_set  = 'received_weight = received_weight + ' + my_delta_weight;
		my_data =
			{ method	: 'update'
			, table		: 'PurchaseLines'
			, set		:  my_set
			, where		: 'PurchaseLines.id = ' + my_purchase_line_id
			};
		JKY.ajax(false, my_data);
		var my_parent_id = JKY.get_value_by_id('PurchaseLines', 'parent_id', my_purchase_line_id);
		my_data =
			{ method	: 'update'
			, table		: 'Purchases'
			, set		:  my_set
			, where		: 'Purchases.id = ' + my_parent_id
			};
		JKY.ajax(false, my_data);
	}
}

JKY.update_receive_success = function(response) {
	JKY.display_trace('update_receive_success');
	var my_data =
		{ method	: 'get_row'
		, table		: 'ReceiveDyers'
		, where		: 'receivedyer.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.display_receive_received);
}

JKY.display_receive_received = function(response) {
	JKY.display_trace('display_receive	_received');
	var my_received_weight = parseFloat(response.row.received_weight);
	var my_received_amount = parseFloat(response.row.received_amount);
	JKY.set_value('jky-received-weight', my_received_weight);
	JKY.set_value('jky-received-amount', my_received_amount);
	JKY.set_calculated_color();
}

JKY.print_loads = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'LoadIns'
		, select	:  the_id
		, order_by  : 'LoadIns.id'
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
						var my_dyer			= my_row.dyer;
						var my_percent		= parseFloat(my_row.percent);
						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_percent	+ '</td>'
							+ '<td>' + my_name		+ '</td>'
							+ '<td>' + my_dyer		+ '</td>'
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

JKY.print_labels = function(the_index, the_id) {
	var my_invoice_weight	= parseFloat(JKY.get_value('jky-invoice-weight'	));
	var my_received_weight	= parseFloat(JKY.get_value('jky-received-weight'));
	if (my_invoice_weight == my_received_weight) {
		JKY.Batch.display(the_index, the_id);
	}else{
		JKY.display_message('You cannot print labels because [Received Weight] does not match to [Invoice Weight]');
	}
}
