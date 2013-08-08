/*
 * display Batches -------------------------------------------------------------
 */

var my_old_received_weight	= 0;
var my_old_unit_price		= 0;
var my_new_received_weight	= 0;
var my_new_unit_price		= 0;

JKY.display_batches = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Batches'
		, specific		: 'incoming'
		, specific_id	:  JKY.row.id
		, order_by		: 'Batches.batch'
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
		+ "<input class='jky-thread-row-name jky-form-value' readonly='readonly' onclick='JKY.update_batch(this, " + my_id + ")' value='" + the_row.name + "' />"
		+ "<a class='jky-thread-row-icon href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_print = (the_row.received_boxes == the_row.labels_printed) ? '' : '<a onclick="JKY.Batch.display(this, ' + my_id + ')"><i class="icon-print"></i></a>';
	var my_html = ''
		+ '<tr batch_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_batch(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td ><input  class="jky-batch-code"				text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.code			+ '" /></td>'
		+ '<td ><input  class="jky-batch-number"			text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.batch			+ '" /></td>'
		+ '<td class="jky-thread-row-name"		>' + my_thread + '</td>'
		+ '<td ><input  class="jky-batch-received-boxes"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.received_boxes	+ '" /></td>'
		+ '<td ><input  class="jky-batch-labels-printed"	text="text"								 disabled="disabled" value="' + the_row.labels_printed	+ '" /></td>'
		+ '<td class="jky-batch-labels-print"	>' + my_print + '</td>'
		+ '<td ><input  class="jky-batch-number-of-cones"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.number_of_cones	+ '" /></td>'
		+ '<td ><input  class="jky-batch-received-weight"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.received_weight	+ '" /></td>'
		+ '<td ><input  class="jky-batch-unit-price"		text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.unit_price		+ '" /></td>'
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
	var my_received_boxes	= parseFloat(my_tr.find('.jky-batch-received-boxes'		).val());
	var my_received_weight	= parseFloat(my_tr.find('.jky-batch-received-weight'	).val());
	var my_number_of_cones	= parseFloat(my_tr.find('.jky-batch-number-of-cones'	).val());
	var my_unit_price		= parseFloat(my_tr.find('.jky-batch-unit-price'			).val());
	var my_average_weight	= 0;
	if (my_received_boxes > 0) {
		my_average_weight	= my_received_weight / my_received_boxes;
	}

	var my_set = ''
		+            'thread_id	=  ' + my_thread_id
		+               ', code	=\'' + my_code	+ '\''
		+              ', batch	=\'' + my_batch	+ '\''
		+     ', received_boxes	=  ' + my_received_boxes
		+    ', received_weight	=  ' + my_received_weight
		+    ', number_of_cones	=  ' + my_number_of_cones
		+         ', unit_price	=  ' + my_unit_price
		+     ', average_weight	=  ' + my_average_weight
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Batches'
		, set		:  my_set
		, where		: 'Batches.id = ' + the_id
		};
	my_new_received_weight	= my_received_weight;
	my_new_unit_price		= my_unit_price		;
	JKY.ajax(true, my_data, JKY.update_batch_success);
}

JKY.update_batch_success = function(response) {
JKY.display_trace('update_batch_success');
//	JKY.display_message(response.message)
	JKY.update_incoming(response.id);
}

JKY.insert_batch = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Batches'
		, set		: 'Batches.incoming_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_batch_success);
}

JKY.insert_batch_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.code				= '';
	my_row.batch			= '';
	my_row.thread_id		= null;
	my_row.received_boxes	= 0;
	my_row.received_weight	= 0;
	my_row.number_of_cones	= 0;
	my_row.unit_price		= 0;

	var my_html = JKY.generate_row(my_row);
	JKY.append_html('jky-batch-body', my_html);
}

JKY.delete_batch = function(id_name, the_id) {
	JKY.select_batch(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Batches'
		, where		: 'Batches.id = ' + the_id
		};
	my_new_received_weight	= 0;
	my_new_unit_price		= 0;
	JKY.ajax(true, my_data, JKY.delete_batch_success);
}

JKY.delete_batch_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_incoming(response.id);
}

JKY.select_batch = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'Batches'
		, where		: 'Batches.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_batch_success);
}

JKY.select_batch_success = function(response) {
	my_old_received_weight	= parseFloat(response.row.received_weight);
	my_old_unit_price		= parseFloat(response.row.unit_price	 );
}

JKY.update_incoming = function(the_batch_id) {
	JKY.display_trace('update_incoming');
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
		, table		: 'Incomings'
		, set		:  my_set
		, where		: 'Incomings.id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.update_incoming_success);

	var my_purchase_line_id = JKY.get_value_by_id('Batches', 'purchase_line_id', the_batch_id);
	if (my_purchase_line_id) {
		my_set  = 'received_weight = received_weight + ' + my_delta_weight;
		my_data =
			{ method	: 'update'
			, table		: 'PurchaseLines'
			, set		:  my_set
			, where		: 'PurchaseLines.id = ' + my_purchase_line_id
			};
		JKY.ajax(false, my_data);
		var my_purchase_id = JKY.get_value_by_id('PurchaseLines', 'purchase_id', my_purchase_line_id);
		my_data =
			{ method	: 'update'
			, table		: 'Purchases'
			, set		:  my_set
			, where		: 'Purchases.id = ' + my_purchase_id
			};
		JKY.ajax(false, my_data);
	}
}

JKY.update_incoming_success = function(response) {
	JKY.display_trace('update_incoming_success');
	var my_data =
		{ method	: 'get_row'
		, table		: 'Incomings'
		, where		: 'Incomings.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.display_incoming_received);
}

JKY.display_incoming_received = function(response) {
	JKY.display_trace('display_incoming_received');
	var my_received_weight = parseFloat(response.row.received_weight);
	var my_received_amount = parseFloat(response.row.received_amount);
	JKY.set_value('jky-received-weight', my_received_weight);
	JKY.set_value('jky-received-amount', my_received_amount);
	JKY.set_calculated_color();
}

JKY.print_batches = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'Batches'
		, select	:  the_id
		, order_by  : 'Batches.id'
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
