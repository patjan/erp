/*
 * display Boxes -------------------------------------------------------------
 */

JKY.display_boxes = function() {
//	JKY.loads = JKY.load_ids(JKY.row.id);
	var my_data =
		{ method	: 'get_index'
		, table		: 'CheckinLocations'
		, select	:  JKY.row.batchin_id
		, order_by  : 'location'
		};
	JKY.ajax(false, my_data, JKY.generate_boxes);
}

JKY.generate_boxes = function(response) {
	var my_boxes_requested = parseInt(JKY.row.requested_boxes) - parseInt(JKY.row.checkout_boxes);
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			var my_boxes_checkin   = parseInt(my_row.total_boxes);
			var my_boxes_reserved  = 0;
/*
			if (my_boxes_requested > my_boxes_checkin) {
				my_boxes_reserved  = my_boxes_checkin;
			}else{
				my_boxes_reserved  = my_boxes_requested;
			}
*/
			my_boxes_requested -= my_boxes_reserved;

			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-action"></td>'
				+ '<td class="jky-boxes-location"	><input class="jky-checkin-location"	value="' +				my_row.location		+ '" disabled	/></td>'
				+ '<td class="jky-boxes-date-in"	><input class="jky-checkin-date"		value="' + JKY.out_date(my_row.checkin_at)	+ '" disabled	/></td>'
				+ '<td class="jky-boxes-weight"		><input class="jky-checkin-weight"		value="' +				my_row.total_weight	+ '" disabled	/></td>'
				+ '<td class="jky-boxes-checkin"	><input class="jky-checkin-boxes"		value="' +				my_boxes_checkin	+ '" disabled	/></td>'
				+ '<td class="jky-boxes-reserved"	><input class="jky-reserved-boxes"		value="' +				my_boxes_reserved	+ '" onchange="JKY.update_boxes(this, ' + my_boxes_reserved + ')"	/></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-boxes-body', my_html);
	if (my_rows == '') {
//		JKY.insert_load();
	}
}

JKY.update_boxes = function(the_id, the_boxes_reserved) {
	var my_boxes_reserved = parseInt($(the_id).val());
	var my_reserved_boxes = parseInt(JKY.get_value('jky-reserved-boxes'));
	my_reserved_boxes += (my_boxes_reserved - the_boxes_reserved);
	JKY.set_value('jky-reserved-boxes', my_reserved_boxes);
}

JKY.Xupdate_load_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.Xinsert_load = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Loads'
		, set		: 'FTP_Loads.ftp_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_load_success);
}

JKY.Xinsert_load_success = function(response) {
	var my_id = response.id;
	var my_input_from	=  0;
	var my_input_upto	=  0;
	var my_thread_id_1	=  0;
	var my_thread_id_2	=  0;
	var my_thread_id_3	=  0;
	var my_thread_id_4	=  0;
	var my_remarks		= '';
	var	my_html = ''
		+ '<tr ftp_load_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-load-input-from"		><input  class="jky-load-input-from" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_input_from + '" /></td>'
		+ '<td class="jky-load-input-upto"		><input  class="jky-load-input-upto" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_input_upto + '" /></td>'
		+ '<td class="jky-load-thread-name-1"	><select class="jky-load-thread-name-1"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_1, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-thread-name-2"	><select class="jky-load-thread-name-2"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_2, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-thread-name-3"	><select class="jky-load-thread-name-3"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_3, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-thread-name-4"	><select class="jky-load-thread-name-4"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_4, JKY.loads, true) + '</select></td>'
		+ '</tr>'
		+ '<tr>'
		+ '<td></td>'
		+ '<td colspan=2 class="jky-load-label-remarks"><span>Remarks</span>:</td>'
		+ '<td colspan=4 class="jky-load-remarks"><textarea  class="jky-load-remarks"				onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_remarks + '" /></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-load-body', my_html);
}

JKY.Xdelete_load = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	my_tr.next().remove();
	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'FTP_Loads'
		, where		: 'FTP_Loads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_load_success);
}

JKY.Xdelete_load_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.Xload_ids = function(the_id) {
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

JKY.print_loads = function(the_id) {
	JKY.loads = JKY.load_ids(the_id);
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Loads'
		, select	:  the_id
		, order_by  : 'FTP_Loads.id'
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
							+ '<td>Fio 1 = ' + JKY.get_name(my_thread_id_1, JKY.loads) + '</td>'
							+ '</tr>'
							;
						if (my_thread_id_2) {my_html += '<tr><td colspan="3"></td><td>Fio 2 = ' + JKY.get_name(my_thread_id_2, JKY.loads) + '</td></tr>';}
						if (my_thread_id_3) {my_html += '<tr><td colspan="3"></td><td>Fio 3 = ' + JKY.get_name(my_thread_id_3, JKY.loads) + '</td></tr>';}
						if (my_thread_id_4) {my_html += '<tr><td colspan="3"></td><td>Fio 4 = ' + JKY.get_name(my_thread_id_4, JKY.loads) + '</td></tr>';}
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
