/*
 * display Batches -------------------------------------------------------------
 */

var my_checkout_id			= 0;
var my_old_checkin_weight	= 0;
var my_old_unit_price		= 0;
var my_new_checkin_weight	= 0;
var my_new_unit_price		= 0;
var my_row_batch			= null;

JKY.display_batches = function() {
	my_checkout_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'BatchOuts'
		, specific		: 'checkout'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'BatchOuts.batch'
		};
	JKY.ajax(false, my_data, JKY.generate_batches);
}

JKY.generate_batches = function(response) {
	var my_html		= '';
	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_batch(my_row);

			var my_percent = parseFloat(my_row.percent);
			my_total += my_percent;
		}
	}
	JKY.set_html('jky-batch-total', my_total);
	JKY.set_html('jky-batches-body', my_html);
	$('.jky-requested-weight').ForceNumericOnly();
	if (my_rows == '') {
		JKY.insert_batch();
	}

	if (JKY.row.status == 'Closed') {
		$('#jky-batches-body input[changeable]').prop('disabled', true );
	}else{
		$('#jky-batches-body input[changeable]').prop('disabled', false);
	}
}

JKY.generate_batch = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft' ) ? '<a onclick="JKY.delete_batch(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_share = JKY.is_status('Closed') ? '' : '<a class="jky-thread-icon"  href="#" onClick="JKY.Thread.display(this)"><i class="icon-share"></i></a>';
	var my_th	 = JKY.is_status('Closed') ? '' : '<a class="jky-purline-icon" href="#" onClick="JKY.BatchIn.display(this)"><i class="icon-th"></i></a>';
	var my_thread = ''
		+ "<input class='jky-thread-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-name' disabled onchange='JKY.update_batch(this, " + my_id + ")' value='" + JKY.fix_null(the_row.thread_name) + "' />"
		+ ' ' + my_share
		;
	var my_batchin = ''
		+ "<input class='jky-batchin-id' type='hidden' value=" + the_row.batchin_id + " />"
		+ "<input class='jky-batchin-number' disabled onchange='JKY.update_batch(this, " + my_id + ")' value='" + JKY.fix_null(the_row.batch_code) + "' />"
		+ ' ' + my_th
		;
	var my_html = ''
		+ '<tr batch_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-code"		><input changeable	class="jky-product-code" text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + JKY.fix_null(the_row.code)+ '" /></td>'
		+ '<td class="jky-td-thread"	>' + my_thread	+ '</td>'
		+ '<td class="jky-td-key"		>' + my_batchin	+ '</td>'
		+ '<td class="jky-td-weight"	><input  disabled	class="jky-average-weight"		value="' + the_row.average_weight	+ '" /></td>'
		+ '<td class="jky-td-weight"	><input  changeable	class="jky-requested-weight"	value="' + the_row.requested_weight + '" onchange="JKY.update_batch(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-weight"	><input  disabled	class="jky-checkout-weight"		value="' + the_row.checkout_weight	+ '" /></td>'
		+ '<td class="jky-td-boxes"		><input  disabled	class="jky-requested-boxes"		value="' + the_row.requested_boxes	+ '" /></td>'
		+ '<td class="jky-td-boxes"		><input  disabled	class="jky-checkout-boxes"		value="' + the_row.checkout_boxes	+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_batch = function(id_name, the_id ) {
	JKY.display_trace('update_batch');
	JKY.select_batch(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-thread-id'	).val();
	var my_batchin_id		= my_tr.find('.jky-batchin-id'	).val();
	var my_product_code		= my_tr.find('.jky-product-code').val();
//	var my_batch			= my_tr.find('.jky-batch-number').val();
//	var my_average_weight	= parseFloat(my_tr.find('.jky-average-weight'	).val());
//	var my_requested_boxes	= parseFloat(my_tr.find('.jky-requested-boxes'	).val());
	var my_requested_weight	= parseFloat(my_tr.find('.jky-requested-weight'	).val());

	var my_unit_price		= 0;
	var my_average_weight	= 0;
	var my_requested_boxes	= 0;
	if (!isNaN(my_batchin_id)) {
		my_row_batchin		= JKY.get_row('Batches', my_batchin_id);
		my_unit_price		= my_row_batchin.unit_price;
		my_average_weight	= my_row_batchin.average_weight;
		my_requested_boxes	= Math.round(my_requested_weight / my_average_weight + 0.5);
	}
	my_tr.find('.jky-average-weight' ).val(my_average_weight );
	my_tr.find('.jky-requested-boxes').val(my_requested_boxes);

	var my_set = ''
		+          'thread_id =  ' + my_thread_id
		+       ', batchin_id =  ' + my_batchin_id
		+             ', code =\'' + my_product_code	+ '\''
//		+            ', batch =\'' + my_batch_code		+ '\''
		+       ', unit_price =  ' + my_unit_price
		+   ', average_weight =  ' + my_average_weight
		+  ', requested_boxes =  ' + my_requested_boxes
		+ ', requested_weight =  ' + my_requested_weight
		;
	var my_data =
		{ method	: 'update'
		, table		: 'BatchOuts'
		, set		:  my_set
		, where		: 'BatchOuts.id = ' + the_id
		};
	my_new_requested_weight = my_requested_weight;
	JKY.ajax(true, my_data, JKY.update_batch_success);
}

JKY.update_batch_success = function(response) {
JKY.display_trace('update_batch_success');
//	JKY.display_message(response.message)
	JKY.update_checkout();
}

JKY.insert_batch = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'BatchOuts'
		, set		: 'BatchOuts.checkout_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_batch_success);
}

JKY.insert_batch_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.code				= '';
	my_row.batch			= '';
	my_row.thread_id		= null;
	my_row.batchin_id		= null;
	my_row.average_weight	= 0;
	my_row.requested_boxes	= 0;
	my_row.requested_weight	= 0;
	my_row.checkout_boxes	= 0;
	my_row.checkout_weight	= 0;

	var my_html = JKY.generate_batch(my_row);
	JKY.append_html('jky-batches-body', my_html);
}

JKY.delete_batch = function(id_name, the_id) {
	JKY.select_batch(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'BatchOuts'
		, where		: 'BatchOuts.id = ' + the_id
		};
	my_new_requested_weight = 0;
	JKY.ajax(true, my_data, JKY.delete_batch_success);
}

JKY.delete_batch_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_checkout();
}

JKY.select_batch = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'BatchOuts'
		, where		: 'BatchOuts.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_batch_success);
}

JKY.select_batch_success = function(response) {
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
		, where		: 'CheckOuts.id = ' + my_checkout_id
		};
	JKY.ajax(false, my_data, JKY.update_checkout_success);
}

JKY.update_checkout_success = function(response) {
JKY.display_trace('update_checkout_success');
//	JKY.display_message(response.message)
	var my_data =
		{ method	: 'get_row'
		, table		: 'CheckOuts'
		, where		: 'CheckOuts.id = ' + my_checkout_id
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

JKY.print_batches = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'BatchOuts'
		, select	:  the_id
		, order_by  : 'BatchOuts.id'
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
