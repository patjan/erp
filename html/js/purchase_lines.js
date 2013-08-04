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
	JKY.Purchase.set_expected(0);
	JKY.Purchase.set_received(0);
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_row(my_row);
			JKY.Purchase.add_expected(my_row.expected_weight);
			JKY.Purchase.add_received(my_row.received_weight);
		}
	}
	JKY.set_html('jky-line-body', my_html );
	JKY.update_total_weight();
	if (my_rows == '') {
		JKY.insert_line();
	}
}

JKY.generate_row = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.batch_id == null) ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_line = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-row-name jky-form-value' readonly='readonly' onclick='JKY.update_line(this, " + my_id + ")' value='" + the_row.thread_name + "' />"
		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr purchase_line_id=' + my_id + '>'
		+ '<td class="jky-action"			>' + my_trash + '</td>'
		+ '<td class="jky-line-thread"		>' + my_line  + '</td>'
		+ '<td class="jky-line-value"		><input class="jky-line-expected-weight" text="text"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + JKY.out_float(the_row.expected_weight) + '"						/></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-expected-date"					onchange="JKY.update_line(this, ' + my_id + ')"	value="' + JKY.out_date	(the_row.expected_date	) + '"						/></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-received-weight" text="text"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + JKY.out_float(the_row.received_weight) + '" disabled="disabled"	/></td>'
		+ '<td class="jky-line-value"		><input class="jky-line-scheduled-at"					onchange="JKY.update_line(this, ' + my_id + ')"	value="' + JKY.out_time	(the_row.scheduled_at	) + '" disabled="disabled"	/></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_line = function(id_name, the_id ) {
	var my_saved_expected = parseFloat(JKY.get_value_by_id('PurchaseLines', 'expected_weight', the_id));

	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-thread-row-id').val();
	var my_expected_weight	= parseFloat(my_tr.find('.jky-line-expected-weight'	).val());
	var my_expected_date	= JKY.inp_date(my_tr.find('.jky-line-expected-date'	).val());

	var my_set = ''
		+        'thread_id = ' + my_thread_id
		+', expected_weight = ' + my_expected_weight
		+  ', expected_date = ' + my_expected_date
		;
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		:  my_set
		, where		: 'PurchaseLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_line_success);

	JKY.Purchase.add_expected(my_expected_weight - my_saved_expected);
}

JKY.update_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_total_weight();
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
	my_row.expected_date	= null;
	my_row.received_weight	=  0;
	my_row.scheduled_at		= null;

	var my_html = JKY.generate_row(my_row);
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
	JKY.update_total_weight();
}

JKY.update_total_weight = function() {
	JKY.set_html('jky-line-total-expected', JKY.Purchase.get_expected());
	JKY.set_html('jky-line-total-received', JKY.Purchase.get_received());
	JKY.Purchase.update_expected_weight(JKY.row.id);
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
