/*
 * display Request Lines -------------------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'ReqLines'
		, select	:  JKY.row.id
		, order_by  : 'ReqLines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(response) {
	JKY.Request.set_requested(0);
	JKY.Request.set_checkout (0);
	var my_html	= '';
	var my_rows	= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_row(my_row);
			JKY.Request.add_requested(my_row.requested_weight);
			JKY.Request.add_checkout (my_row.checkout_weight );
		}
	}
	JKY.set_html('jky-lines-body', my_html );
	JKY.update_total_weight();
	if (my_rows == '') {
		JKY.insert_line();
	}
}

JKY.generate_row = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.batch_id == null) ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_thread = ''
		+ "<input class='jky-thread-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-name' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.thread_name + "' />"
		+ " <a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_batchin = ''
		+ "<input class='jky-batchin-id' type='hidden' value=" + the_row.batchin_id + " />"
		+ "<input class='jky-batchin-code' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.batch_code + "' />"
		+ " <a href='#' onClick='JKY.BatchIn.display(this)'><i class='icon-share'></i></a>"
		;
	var my_requested_date =	JKY.out_date(the_row.requested_date);
	if (my_requested_date == '') {
		my_requested_date = JKY.out_date(JKY.row.requested_date);
	}
	var my_html = ''
		+ '<tr request_line_id=' + my_id + '>'
		+ '<td class="jky-action"			>' + my_trash	+ '</td>'
		+ '<td class="jky-td-thread-name"	>' + my_thread	+ '</td>'
		+ '<td class="jky-td-batchin-code"	>' + my_batchin	+ '</td>'
		+ '<td class="jky-td-line-weight"	><input class="jky-requested-weight"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + JKY.out_float(the_row.requested_weight) + '"						/></td>'
		+ '<td class="jky-td-line-date"		><input class="jky-requested-date"		onchange="JKY.update_line(this, ' + my_id + ')"	value="' +					  my_requested_date	   + '"						/></td>'
		+ '<td class="jky-td-line-weight"	><input class="jky-checkout-weight"		onchange="JKY.update_line(this, ' + my_id + ')" value="' + JKY.out_float(the_row.checkout_weight ) + '" disabled	/></td>'
		+ '<td class="jky-td-line-date"		><input class="jky-scheduled-date"		onchange="JKY.update_line(this, ' + my_id + ')"	value="' + JKY.out_time	(the_row.scheduled_at	 ) + '" disabled	/></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_line = function(id_name, the_id ) {
	var my_saved_requested = parseFloat(JKY.get_value_by_id('ReqLines', 'requested_weight', the_id));

	var my_tr = $(id_name).parent().parent();
	var my_thread_id		=					 my_tr.find('.jky-thread-id'		).val() ;
	var my_batchin_id		=					 my_tr.find('.jky-batchin-id'		).val() ;
	var my_requested_weight	= parseFloat		(my_tr.find('.jky-requested-weight'	).val());
	var my_requested_date	= JKY.inp_date_value(my_tr.find('.jky-requested-date'	).val());

	var my_set = ''
		+         'thread_id = ' + my_thread_id
		+', requested_weight = ' + my_requested_weight
		+  ', requested_date = ' + my_requested_date
		;
	if (!isNaN(my_batchin_id)) {
		my_set += ', batchin_id = ' + my_batchin_id
	}
	var my_data =
		{ method	: 'update'
		, table		: 'ReqLines'
		, set		:  my_set
		, where		: 'ReqLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_line_success);

	JKY.Request.add_requested(my_requested_weight - my_saved_requested);
}

JKY.update_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_total_weight();
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'ReqLines'
		, set		: 'ReqLines.request_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_line_success);
}

JKY.insert_line_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.thread_id		= null;
	my_row.name				= '';
	my_row.requested_weight	=  0;
	my_row.requested_date	= null;
	my_row.checkout_weight	=  0;
	my_row.scheduled_at		= null;

	var my_html = JKY.generate_row(my_row);
	JKY.append_html('jky-lines-body', my_html);
}

JKY.delete_line = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'ReqLines'
		, where		: 'ReqLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_line_success);
}

JKY.delete_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_total_weight();
}

JKY.update_total_weight = function() {
	JKY.set_html('jky-line-total-requested', JKY.Request.get_requested());
	JKY.set_html('jky-line-total-checkout' , JKY.Request.get_checkout ());
	JKY.Request.update_requested_weight(JKY.row.id);
}

JKY.print_lines = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'ReqLines'
		, select	:  the_id
		, order_by  : 'ReqLines.id'
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
