/*
 * display TDyer Threads -------------------------------------------------------
 */

JKY.display_threads = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'TDyerThreads'
		, select	:  JKY.row.id
		, order_by  : 'TDyerThreads.created_at DESC'
		};
	JKY.ajax(false, my_data, JKY.generate_threads);
}

JKY.generate_threads = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_thread(my_row);
		}
	}
	JKY.set_html('jky-threads-body', my_html);
	$('.jky-ordered-weight').ForceNumericOnly();
	if (my_rows == '') {
		JKY.insert_thread();
	}
}

JKY.generate_thread = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_thread(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_thread = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + the_row.thread_id + " />"
		+ "<input class='jky-thread-row-name' disabled onchange='JKY.update_thread(this, " + my_id + ")' value='" + the_row.thread_name + "' />"
		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_batchin = ''
		+ "<input class='jky-batchin-row-id' type='hidden' value=" + the_row.batchin_id + " />"
		+ "<input class='jky-batchin-row-number' disabled onchange='JKY.update_thread(this, " + my_id + ")' value='" + the_row.batchin_number + "' />"
		+ "<a href='#' onClick='JKY.BatchIn.display(this)'><i class='icon-share'></i></a>"
		;
	var my_disabled = JKY.is_status('Draft') ? '' : ' disabled="disabled"';
	var my_html = ''
		+ '<tr tdyer_thread_id=' + my_id + '>'
		+ '<td class="jky-action"			>' + my_trash	+ '</td>'
		+ '<td class="jky-td-thread-name"	>' + my_thread	+ '</td>'
		+ '<td class="jky-td-thread-batchin">' + my_batchin	+ '</td>'
		+ '<td class="jky-td-color-name"><button class="btn btn-success" type="button" onclick="JKY.insert_color(this, ' + my_id + ')"' + my_disabled + '><span>Add Color</span></button></td>'
		+ '<td colspan="4"></td>'
		+ '</tr>'
		;
	var my_rows = JKY.get_rows('TDyerColors', my_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		my_html += JKY.generate_color(my_row);
	}
	return my_html;
}

JKY.update_thread = function(id_name, the_id) {
	var my_td = $(id_name).parent().parent();
	var my_thread_id  = my_td.find('.jky-thread-row-id').val();
	var my_batchin_id = my_td.find('.jky-batchin-row-id').val();
	var my_set = ''
		+       ' thread_id =  ' + my_thread_id
		+     ', batchin_id =  ' + my_batchin_id
		;
	var my_data =
		{ method	: 'update'
		, table		: 'TDyerThreads'
		, set		:  my_set
		, where		: 'TDyerThreads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_thread_success);
}

JKY.update_thread_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.insert_thread = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'TDyerThreads'
		, set		: 'TDyerThreads.parent_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_thread_success);
}

JKY.insert_thread_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.tdyer_number		= response.id;
	my_row.thread_id		= null;
	my_row.thread_name		= '';
	my_row.batchin_id		= null;
	my_row.batchin_number	= '';

	var my_html = JKY.generate_thread(my_row);
	JKY.append_html('jky-threads-body', my_html);
}

JKY.delete_thread = function(id_name, the_id) {
	var my_count = JKY.get_count_by_id('TDyerColors', the_id);
	if (my_count > 0) {
		JKY.display_message(JKY.t('Error, delete first all sub records'));
		return;
	}

	var my_tr = $(id_name).parent().parent();
	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'TDyerThreads'
		, where		: 'TDyerThreads.id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.delete_thread_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.verify_total_percent();
}

JKY.line_ids = function(the_id) {
	var my_rows = [];
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Threads'
		, select	:  the_id
		, order_by  : 'FTP_Threads.id'
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
//					my_rows = response.rows;
					for(var i=0; i<response.rows.length; i++) {
						var my_row = [];
						my_row.id	= response.rows[i].thread_id;
						my_row.name = response.rows[i].name;
						my_rows.push(my_row);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_rows;
}

JKY.get_name = function(the_id, the_array) {
	var my_name = '';
	for( var i=0; i<the_array.length; i++) {
		if (the_array[i].id == the_id) {
			my_name = the_array[i].name;
			break;
		}
	}
	return my_name;
}

JKY.print_threads = function(the_id) {
	JKY.lines = JKY.line_ids(the_id);
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'TDyerThreads'
		, select	:  the_id
		, order_by  : 'TDyerThreads.id'
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
						var my_input_from	= my_row.input_from;
						var my_input_upto	= my_row.input_upto;
						var my_thread_id_1	= my_row.thread_id_1;
						var my_thread_id_2	= my_row.thread_id_2;
						var my_thread_id_3	= my_row.thread_id_3;
						var my_thread_id_4	= my_row.thread_id_4;
						var my_remarks		= my_row.remarks;

						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_input_from	+ '</td>'
							+ '<td>' + my_input_upto	+ '</td>'
							+ '<td>Fio 1 = ' + JKY.get_name(my_thread_id_1, JKY.lines) + '</td>'
							+ '</tr>'
							;
						if (my_thread_id_2) {my_html += '<tr><td colspan="3"></td><td>Fio 2 = ' + JKY.get_name(my_thread_id_2, JKY.lines) + '</td></tr>';}
						if (my_thread_id_3) {my_html += '<tr><td colspan="3"></td><td>Fio 3 = ' + JKY.get_name(my_thread_id_3, JKY.lines) + '</td></tr>';}
						if (my_thread_id_4) {my_html += '<tr><td colspan="3"></td><td>Fio 4 = ' + JKY.get_name(my_thread_id_4, JKY.lines) + '</td></tr>';}
						my_html  += ''
							+ '<tr>'
							+ '<td colspan=3></td>'
							+ '<td><b>' + JKY.nl2br(my_remarks) + '</b></td>'
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
