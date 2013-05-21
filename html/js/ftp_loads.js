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
			var my_first_number	= my_row.first_number;
			var my_first_name	= my_row.first_name;
			var my_second_number= my_row.second_number;
			var my_second_name	= my_row.second_name;

			my_html  += ''
				+ '<tr ftp_load_id=' + my_id + '>'
				+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-load-first-value"		><input  class="jky-load-first-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_first_number  + '" /></td>'
				+ '<td class="jky-load-first-select"	><select class="jky-load-first-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_first_name , JKY.loads, true) + '</select></td>'
				+ '<td class="jky-load-second-value"	><input  class="jky-load-second-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_second_number + '" /></td>'
				+ '<td class="jky-load-second-select"	><select class="jky-load-second-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_second_name, JKY.loads, true) + '</select></td>'
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
	var my_first_number		= parseFloat(my_tr.find('.jky-load-first-number' ).val());
	var my_first_thread_id	= my_tr.find('.jky-load-first-name' ).val();
	var my_second_number	= parseFloat(my_tr.find('.jky-load-second-number').val());
	var my_second_thread_id	= my_tr.find('.jky-load-second-name').val();
	var my_set = ''
		+       'first_number = ' + my_first_number
		+  ', first_thread_id = ' + my_first_thread_id
		+    ', second_number = ' + my_second_number
		+ ', second_thread_id = ' + my_second_thread_id
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
	JKY.display_message(response.message)
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
	var my_first_number	=  0;
	var my_first_name	= '';
	var my_second_number=  0;
	var my_second_name	= '';
	var	my_html = ''
		+ '<tr ftp_load_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_load(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-load-first-value"		><input  class="jky-load-first-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_first_number  + '" /></td>'
		+ '<td class="jky-load-first-select"	><select class="jky-load-first-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_first_name , JKY.loads, true) + '</select></td>'
		+ '<td class="jky-load-second-value"	><input  class="jky-load-second-number" text="text"	onchange="JKY.update_load(this, ' + my_id + ')" value="' + my_second_number + '" /></td>'
		+ '<td class="jky-load-second-select"	><select class="jky-load-second-name"				onchange="JKY.update_load(this, ' + my_id + ')">' + JKY.set_options_array(my_second_name, JKY.loads, true) + '</select></td>'
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
					my_rows = response.rows;
					for(var i in my_rows) {
						var my_row			= my_rows[i];
						var my_first_number	= my_row.first_number;
						var my_first_name	= my_row.first_name;
						var my_second_number= my_row.second_number;
						var my_second_name	= my_row.second_name;

						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_first_number  + '</td>'
							+ '<td>' + my_first_name	+ '</td>'
							+ '<td>' + my_second_number + '</td>'
							+ '<td>' + my_second_name	+ '</td>'
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

