/*
 * display Loads -------------------------------------------------------------
 */

JKY.display_loads = function() {
	JKY.loads = JKY.load_ids(JKY.row.id);
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Loads'
		, select	:  JKY.row.id
		, order_by  : 'FTP_Loads.id'
		};
	JKY.ajax(false, my_data, JKY.generate_loads);
}

JKY.generate_loads = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row			= my_rows[i];
			var my_id			= my_row.id;
			my_html  += ''
				+ '<tr ftp_load_id=' + my_id + '>'
				+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-load-input-from"		><input  class="jky-load-input-from" type="number"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_row.input_from + '" /></td>'
				+ '<td class="jky-load-input-upto"		><input  class="jky-load-input-upto" type="number"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_row.input_upto + '" /></td>'
				+ '<td class="jky-load-thread-name-1"	><select class="jky-load-thread-name-1"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_row.thread_id_1, JKY.loads, true) + '</select></td>'
				+ '<td class="jky-load-thread-name-2"	><select class="jky-load-thread-name-2"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_row.thread_id_2, JKY.loads, true) + '</select></td>'
				+ '<td class="jky-load-thread-name-3"	><select class="jky-load-thread-name-3"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_row.thread_id_3, JKY.loads, true) + '</select></td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td></td>'
				+ '<td></td>'
				+ '<td></td>'
				+ '<td class="jky-load-remarks" colspan=3><textarea  class="jky-load-remarks"					onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_row.remarks + '" /></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-load-body', my_html);
	if (my_rows == '') {
		JKY.insert_load();
	}

}

JKY.update_load = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	var my_input_from	= parseFloat(my_tr.find('td .jky-load-input-from').val());
	var my_input_upto	= parseFloat(my_tr.find('td .jky-load-input-upto').val());
	var my_thread_id_1	= my_tr.find('td .jky-load-thread-name-1').val();
	var my_thread_id_2	= my_tr.find('td .jky-load-thread-name-2').val();
	var my_thread_id_3	= my_tr.find('td .jky-load-thread-name-3').val();
	var my_remarks		= my_tr.find('td .jky-load-remarks').val();
	var my_set = ''
		+       'input_from =  ' + my_input_from
		+     ', input_upto =  ' + my_input_upto
		+    ', thread_id_1 =  ' + my_thread_id_1
		+    ', thread_id_2 =  ' + my_thread_id_2
		+    ', thread_id_3 =  ' + my_thread_id_3
		+        ', remarks =\'' + my_remarks + '\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Loads'
		, set		:  my_set
		, where		: 'FTP_Loads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_load_success);
}

JKY.update_load_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.insert_load = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Loads'
		, set		: 'FTP_Loads.ftp_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_load_success);
}

JKY.insert_load_success = function(response) {
	var my_id = response.id;
	var my_input_from	=  0;
	var my_input_upto	=  0;
	var my_thread_id_1	=  0;
	var my_thread_id_2	=  0;
	var my_thread_id_3	=  0;
	var my_remarks		= '';
	var	my_html = ''
		+ '<tr ftp_load_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-load-input-from"		><input  class="jky-load-input-from" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_input_from + '" /></td>'
		+ '<td class="jky-load-input-upto"		><input  class="jky-load-input-upto" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_input_upto + '" /></td>'
		+ '<td class="jky-load-thread-name-1"	><select class="jky-load-thread-name-1"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_1, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-thread-name-2"	><select class="jky-load-thread-name-2"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_2, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-thread-name-3"	><select class="jky-load-thread-name-3"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_thread_id_3, JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-remarks"			><input  class="jky-load-remarks"					onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_remarks + '" /></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-load-body', my_html);
}

JKY.delete_load = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'FTP_Loads'
		, where		: 'FTP_Loads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_load_success);
}

JKY.delete_load_success = function(response) {
	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.load_ids = function(the_id) {
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

JKY.print_loads = function(the_id) {
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
						var my_remarks		= my_row.remarks;

						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_input_from	+ '</td>'
							+ '<td>' + my_input_upto	+ '</td>'
							+ '<td>' + my_thread_id_1	+ '</td>'
							+ '<td>' + my_thread_id_2	+ '</td>'
							+ '<td>' + my_thread_id_3	+ '</td>'
							+ '<td>' + my_remarks		+ '</td>'
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

