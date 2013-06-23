/*
 * display Purchase Lines -------------------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'PurchaseLines'
		, select	:  JKY.row.id
		, order_by  : 'PurchaseLines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(response) {
	var my_html		= '';
	var my_expected =  0;
	var my_received =  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_row(my_row);

			my_expected += parseFloat(my_row.expected_weight);
			my_received	+= parseFloat(my_row.received_weight);
		}
	}
	JKY.set_html('jky-line-total-expected', my_expected);
	JKY.set_html('jky-line-total-received', my_received);
	JKY.set_html('jky-line-body', my_html );
	if (my_rows == '') {
		JKY.insert_line();
	}
}

JKY.generate_row = function(the_row) {
	var my_id				=			 the_row.id;
	var my_thread_id		=			 the_row.thread_id;
	var my_name				=			 the_row.name;
	var my_expected_weight	= parseFloat(the_row.expected_weight);
	var my_received_weight	= parseFloat(the_row.received_weight);
	var my_expected_date	=			 the_row.expected_date;
	var my_scheduled_at		=			 the_row.scheduled_at;

	var my_line = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + my_thread_id + " />"
		+ "<input class='jky-thread-row-name jky-form-value' readonly='readonly' onclick='JKY.update_line(this, " + my_id + ")' value='" + my_name + "' />"
		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;

	var my_html = ''
		+ '<tr purchase_line_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-line-thread"		>' + my_line + '</td>'
		+ '<td class="jky-line-value"		><input class="jky-line-expected-weight" text="text"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + my_expected_weight	+ '" /></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-received-weight" text="text"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + my_received_weight	+ '" /></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-expected-date"					onchange="JKY.update_line(this, ' + my_id + ')"	value="' + my_expected_date		+ '" /></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-scheduled-at"					onchange="JKY.update_line(this, ' + my_id + ')"	value="' + my_scheduled_at		+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_line = function(id_name, the_id ) {
	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-tread-row-id').val();
alert('my_thread_id: ' + my_thread_id);
	var my_expected_weight	= parseFloat(my_tr.find('.jky-line-expected-weight'	).val());
	var my_received_weight	= parseFloat(my_tr.find('.jky-line-received-weight'	).val());
	var my_expected_date	= my_tr.find('.jky-line-expected-date'	).val();
	var my_scheduled_at		= my_tr.find('.jky-line-scheduled-at'	).val();
	var my_set = ''
		+         'thread_id =   ' + my_thread_id
		+ ', expected_weight =   ' + my_expected_weight
		+ ', received_weight =   ' + my_received_weight
		+   ', expected_date = \'' + my_expected_date	+ '\''
		+    ', scheduled_at = \'' + my_scheduled_at	+ '\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		:  my_set
		, where		: 'PurchaseLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_line_success);
}

JKY.update_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'PurchaseLines'
		, set		: 'PurchaseLines.purchase_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_line_success);
}

JKY.insert_line_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.thread_id		= null;
	my_row.name				= '';
	my_row.expected_weight	=  0;
	my_row.received_weight	=  0;
	my_row.expected_date	= null;
	my_row.scheduled_at		= null;

	my_html = JKY.generate_row(my_row);
	JKY.append_html('jky-line-body', my_html);
}

JKY.delete_line = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'PurchaseLines'
		, where		: 'PurchaseLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_line_success);
}

JKY.delete_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.verify_total_percent = function() {
	var my_total = 0;
	$('#jky-line-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-line-percent' ).val());
		my_total += my_percent
	})
	JKY.set_html('jky-line-total', my_total);
	if (my_total == 100) {
		$('#jky-line-total').css('color', 'black');
	}else{
		$('#jky-line-total').css('color', 'red');
		JKY.display_message(JKY.t('Total percent is not 100.'))
	}
}

JKY.print_lines = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'PurchaseLines'
		, select	:  the_id
		, order_by  : 'PurchaseLines.id'
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
