/*
 * display Batches -------------------------------------------------------------
 */

var my_checkout_id			= 0;
var my_old_checkin_weight	= 0;
var my_old_unit_price		= 0;
var my_new_checkin_weight	= 0;
var my_new_unit_price		= 0;

JKY.display_batches = function() {
	my_checkout_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'BatchOuts'
		, specific		: 'checkout'
		, specific_id	:  JKY.row.id
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
			my_html += JKY.generate_row(my_row);

			var my_percent = parseFloat(my_row.percent);
			my_total += my_percent;
		}
	}
	JKY.set_html('jky-batch-total', my_total);
	JKY.set_html('jky-batch-body' , my_html );
	if (my_rows == '') {
		JKY.insert_batch();
	}
}

JKY.generate_row = function(the_row) {
	var my_id = the_row.id;
	var my_thread = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-row-name jky-form-value' readonly='readonly' onclick='JKY.update_batch(this, " + my_id + ")' value='" + the_row.thread_name + "' />"
		+ "<a class='jky-thread-row-icon href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_batchin = ''
		+ "<input class='jky-batchin-row-id' type='hidden' value=" + the_row.batchin_id + " />"
		+ "<input class='jky-batchin-row-batch jky-form-value' readonly='readonly' onclick='JKY.update_batch(this, " + my_id + ")' value='" + the_row.batch_number + "' />"
		+ "<a href='#' onClick='JKY.BatchIn.display(this)'><i class='icon-share'></i></a>"
		;
	var my_print = (the_row.received_boxes == the_row.labels_printed) ? '' : '<a onclick="JKY.Batch.display(this, ' + my_id + ')"><i class="icon-print"></i></a>';
	var my_html = ''
		+ '<tr batch_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_batch(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td ><input  class="jky-batch-code"				text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.code			+ '" /></td>'
		+ '<td class="jky-thread-row-name"		>' + my_thread	+ '</td>'
		+ '<td class="jky-line-batchin"			>' + my_batchin	+ '</td>'
		+ '<td ><input  class="jky-batch-average-weight"	text="text"								 disabled="disabled" value="' + the_row.average_weight	+ '" /></td>'
		+ '<td ><input  class="jky-batch-requested-weight"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.requested_weight+ '" /></td>'
		+ '<td ><input  class="jky-batch-requested-boxes"	text="text"								 disabled="disabled" value="' + the_row.requested_boxes	+ '" /></td>'
		+ '<td class="jky-batch-labels-print"	>' + my_print + '</td>'
		+ '<td ><input  class="jky-batch-checkout-weight"	text="text"								 disabled="disabled" value="' + the_row.checkout_weight	+ '" /></td>'
		+ '<td ><input  class="jky-batch-checkout-boxes"	text="text"								 disabled="disabled" value="' + the_row.checkout_boxes	+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_batch = function(id_name, the_id ) {
	JKY.display_trace('update_batch');
	JKY.select_batch(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-thread-row-id'	).val();
	var my_code				= my_tr.find('.jky-batch-code'		).val();
	var my_batch			= my_tr.find('.jky-batch-number'	).val();
	var my_average_weight	= parseFloat(my_tr.find('.jky-batch-average-weight'		).val());
	var my_requested_boxes	= parseFloat(my_tr.find('.jky-batch-requested-boxes'	).val());
	var my_requested_weight	= parseFloat(my_tr.find('.jky-batch-requested-weight'	).val());

	var my_set = ''
		+          'thread_id =  ' + my_thread_id
		+             ', code =\'' + my_code	+ '\''
		+            ', batch =\'' + my_batch	+ '\''
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
	my_row.average_weight	= 0;
	my_row.requested_boxes	= 0;
	my_row.requested_weight	= 0;
	my_row.checkout_boxes	= 0;
	my_row.checkout_weight	= 0;

	var my_html = JKY.generate_row(my_row);
	JKY.append_html('jky-batch-body', my_html);
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
	var my_set = ' real_weight = real_weight + ' + my_delta_weight;
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
	JKY.ajax(true, my_data, JKY.display_checkout_real);
}

JKY.display_checkout_real = function(response) {
JKY.display_trace('display_checkout_real');
//	JKY.display_message(response.message)
	var my_real_weight = parseFloat(response.row.real_weight);
	var my_real_amount = parseFloat(response.row.real_amount);
	JKY.set_value('jky-real-weight', my_real_weight);
	JKY.set_value('jky-real-amount', my_real_amount);
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
