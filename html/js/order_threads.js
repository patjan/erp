/*
 * display Order Threads -------------------------------------------------------
 */

JKY.display_threads = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'OrdThreads'
		, select	:  JKY.row.id
		, order_by  : 'OrdThreads.created_at DESC'
		};
	JKY.ajax(false, my_data, JKY.generate_threads);
}

JKY.generate_threads = function(response) {
	JKY.Order.set_ordered (0);
	JKY.Order.set_checkout(0);
	if (response.rows.length == 0) {
		JKY.insert_thread();
		JKY.display_threads();		//	***** recursive looping
	}
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_thread(my_row);
			JKY.Order.add_ordered (my_row.ordered_weight );
			JKY.Order.add_checkout(my_row.checkout_weight);
		}
	}
	JKY.set_html('jky-threads-body', my_html);
	JKY.update_thread_weight();
}

JKY.generate_thread = function(the_row) {
	JKY.display_trace('JKY.generate_thread: ' + the_row.id);
	var my_id = the_row.id;
//	var my_trash = (the_row.batchout_id == null) ? '<a onclick="JKY.delete_thread(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_trash = '';
	var my_thread = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-row-name' disabled onchange='JKY.update_thread(this, " + my_id + ")' value='" + the_row.thread_name + "' />"
//		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_batchin = ''
		+ "<input class='jky-batchin-row-id' type='hidden' value=" + the_row.batchin_id + " />"
		+ "<input class='jky-batchin-row-number' disabled onchange='JKY.update_thread(this, " + my_id + ")' value='" + the_row.batch_number + "' />"
		+ "<a href='#' onClick='JKY.BatchIn.display(this)'><i class='icon-share'></i></a>"
		;
	var my_needed_at = JKY.out_date(the_row.needed_at);
	if (my_needed_at == '') {
		my_needed_at = JKY.out_date(JKY.row.needed_at);
	}
	var my_html = ''
		+ '<tr order_thread_id=' + my_id + '>'
		+ '<td class="jky-action"				>' + my_trash	+ '</td>'
		+ '<td class="jky-td-thread-name"		>' + my_thread	+ '</td>'
		+ '<td class="jky-td-batchin-number"	>' + my_batchin	+ '</td>'
		+ '<td class="jky-td-thread-date"		><input class="jky-needed-date"			onchange="JKY.update_thread(this, ' + my_id + ')" value="' +						 my_needed_at	   + '"						/></td>'
		+ '<td class="jky-td-thread-date"		><input class="jky-checkout-date"		onchange="JKY.update_thread(this, ' + my_id + ')" value="' + JKY.short_date	(the_row.checkout_at	 ) + '" disabled	/></td>'
		+ '<td class="jky-td-thread-weight"		><input class="jky-ordered-weight"		onchange="JKY.update_thread(this, ' + my_id + ')" value="' + JKY.out_float	(the_row.ordered_weight  ) + '"						/></td>'
		+ '<td class="jky-td-thread-weight"		><input class="jky-checkout-weight"		onchange="JKY.update_thread(this, ' + my_id + ')" value="' + JKY.out_float	(the_row.checkout_weight ) + '" disabled	/></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_thread = function(id_name, the_id ) {
	var my_saved_ordered = parseFloat(JKY.get_value_by_id('OrdThreads', 'ordered_weight', the_id));

	var my_tr = $(id_name).parent().parent();
	var my_thread_id		= my_tr.find('.jky-thread-row-id').val();
	var my_batchin_id		= my_tr.find('.jky-batchin-row-id').val();
	var my_needed_at		= JKY.inp_date	(my_tr.find('.jky-needed-date'		).val());
	var my_ordered_weight	= parseFloat	(my_tr.find('.jky-ordered-weight'	).val());

	JKY.Order.add_ordered(my_ordered_weight - my_saved_ordered);

	var my_set = ''
		+         'thread_id = ' + my_thread_id
		+       ', needed_at = ' + my_needed_at
		+  ', ordered_weight = ' + my_ordered_weight
		;
	if (!isNaN(my_batchin_id)) {
		my_set += ', batchin_id = ' + my_batchin_id
	}
	var my_data =
		{ method	: 'update'
		, table		: 'OrdThreads'
		, set		:  my_set
		, where		: 'OrdThreads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_thread_success);
}

JKY.update_thread_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_thread_weight();
}

JKY.insert_thread = function() {
	var my_rows = JKY.get_rows('FTP_Threads', JKY.row.ftp_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		var my_set	= ''
					+ '  parent_id = ' + JKY.row.id
					+ ', thread_id = ' + my_row.thread_id
					;
		var my_data =
			{ method	: 'insert'
			, table		: 'OrdThreads'
			, set		:  my_set
			};
		JKY.ajax(false, my_data);
	}
}

JKY.delete_thread = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'OrdThreads'
		, where		: 'OrdThreads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_thread_success);
}

JKY.delete_thread_success = function(response) {
//	JKY.display_message(response.message)
	JKY.update_thread_weight();
}

JKY.update_thread_weight = function() {
	var my_ordered = JKY.set_decimal(JKY.Order.get_ordered(), 2);
	JKY.set_value('jky-ordered-weight'			, my_ordered);
	JKY.set_value('jky-threads-total-ordered'	, my_ordered);
	JKY.set_value('jky-threads-total-checkout'	, JKY.Order.get_checkout());
//	JKY.Order.update_ordered_weight(JKY.row.id);

	var my_data =
		{ method	: 'update'
		, table		: 'Orders'
		, set		: 'ordered_weight = ' + JKY.Order.get_ordered()
		, where		: 'Orders.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data);

}

JKY.print_threads = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'OrdThreads'
		, select	:  the_id
		, order_by  : 'OrdThreads.id'
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
