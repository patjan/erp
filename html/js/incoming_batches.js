/*
 * display Batches -------------------------------------------------------------
 */

JKY.display_batches = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'Batches'
		, select	:  JKY.row.id
		, order_by  : 'Batches.batch'
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

	var my_html = ''
		+ '<tr batch_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_batch(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td><input  class="jky-batch-code"			text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.code			+ '" /></td>'
		+ '<td><input  class="jky-batch-number"			text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.batch			+ '" /></td>'
		+ '<td>' + my_thread + '</td>'
		+ '<td><input  class="jky-batch-checkin-boxes"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.checkin_boxes	+ '" /></td>'
		+ '<td><input  class="jky-batch-checkin-weight"	text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.checkin_weight	+ '" /></td>'
		+ '<td><input  class="jky-batch-unit-price"		text="text" onchange="JKY.update_batch(this, ' + my_id + ')" value="' + the_row.unit_price		+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_batch = function(id_name, the_id ) {
	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-thread-row-id'	).val();
	var my_code				= my_tr.find('.jky-batch-code'		).val();
	var my_batch			= my_tr.find('.jky-batch-number'	).val();
	var my_checkin_boxes	= parseFloat(my_tr.find('.jky-batch-checkin-boxes'	).val());
	var my_checkin_weight	= parseFloat(my_tr.find('.jky-batch-checkin-weight'	).val());
	var my_unit_price		= parseFloat(my_tr.find('.jky-batch-unit-price'		).val());
	var my_set = ''
		+        'thread_id =  ' + my_thread_id
		+           ', code =\'' + my_code	+ '\''
		+          ', batch =\'' + my_batch	+ '\''
		+  ', checkin_boxes =  ' + my_checkin_boxes
		+ ', checkin_weight =  ' + my_checkin_weight
		+     ', unit_price =  ' + my_unit_price
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Batches'
		, set		:  my_set
		, where		: 'Batches.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_batch_success);
}

JKY.update_batch_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
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
	my_row.checkin_boxes	= 0;
	my_row.checkin_weight	= 0;
	my_row.unit_price		= 0;

	var my_html = JKY.generate_row(my_row);
	JKY.append_html('jky-batch-body', my_html);
}

JKY.delete_batch = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Batches'
		, where		: 'Batches.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_batch_success);
}

JKY.delete_batch_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.verify_total_percent = function() {
	var my_total = 0;
	$('#jky-batch-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-batch-percent' ).val());
		my_total += my_percent
	})
	JKY.set_html('jky-batch-total', my_total);
	if (my_total == 100) {
		$('#jky-batch-total').css('color', 'black');
	}else{
		$('#jky-batch-total').css('color', 'red');
		JKY.display_message(JKY.t('Total percent is not 100.'))
	}
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
