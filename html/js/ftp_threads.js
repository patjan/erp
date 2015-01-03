/*
 * display Threads -------------------------------------------------------------
 */

JKY.display_threads = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Threads'
		, select	:  JKY.row.id
		, order_by  : 'FTP_Threads.id'
		};
	JKY.ajax(false, my_data, JKY.generate_threads);
}

JKY.generate_threads = function(response) {
	var my_html		= '';
	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_thread(my_row);

			var my_percent		= parseFloat(my_row.percent);
			my_total += my_percent;
		}
	}
	JKY.set_value('jky-thread-total', my_total);
	JKY.set_html('jky-threads-body' , my_html );
	$('.jky-thread-percent').ForceIntegerOnly();
	if (my_rows == '') {
		JKY.insert_thread();
	}
}

JKY.generate_thread = function(the_row) {
	var my_id				=			 the_row.id;
	var my_thread_id		=			 the_row.thread_id;
	var my_name				=			 the_row.name;
	var my_supplier_id		=			 the_row.supplier_id;
	var my_percent			= parseFloat(the_row.percent);

	var my_thread = ''
		+ "<input class='jky-thread-id' type='hidden' value=" + my_thread_id + " />"
		+ "<input class='jky-thread-name' disabled onchange='JKY.update_thread(this, " + my_id + ")' value='" + my_name + "' />"
		+ " <a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;

	var my_html = ''
		+ '<tr ftp_thread_id=' + my_id + '>'
		+ '<td class="jky-td-action"	><a onclick="JKY.delete_thread(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-td-filler"	>&nbsp;</div>'
		+ '<td class="jky-td-percent"	><input  class="jky-thread-percent"		onchange="JKY.update_thread(this, ' + my_id + ')" value="' + my_percent + '" /></td>'
		+ '<td class="jky-td-key-w"		>' + my_thread + '</td>'
		+ '<td							><select class="jky-thread-supplier"	onchange="JKY.update_thread(this, ' + my_id + ')">' + JKY.set_options_array(my_supplier_id, JKY.suppliers, true) + '</select></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_thread = function(id_name, the_id ) {
	var my_tr = $(id_name).parent().parent();
	var my_thread_id		=			 my_tr.find('.jky-thread-id'		).val() ;
	var my_percent			= parseFloat(my_tr.find('.jky-thread-percent'	).val());
	var my_supplier_id		=			 my_tr.find('.jky-thread-supplier'	).val() ;
	var my_set = ''
		+        'thread_id =   ' + my_thread_id
		+    ', supplier_id = ' + my_supplier_id
		+        ', percent = ' + my_percent
		;
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Threads'
		, set		:  my_set
		, where		: 'FTP_Threads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_thread_success);
}

JKY.update_thread_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.insert_thread = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Threads'
		, set		: 'FTP_Threads.parent_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_thread_success);
}

JKY.insert_thread_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.percent			=  0;
	my_row.thread_id		= null;
	my_row.name				= '';
	my_row.supplier			= '';

	var my_html = JKY.generate_thread(my_row);
	JKY.append_html('jky-threads-body', my_html);
}

JKY.copy_threads = function(the_source, the_to) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_rows'
		, table		: 'FTP_Threads'
		, where		: 'FTP_Threads.parent_id = ' + the_source
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
					var my_rows = response.rows;
					for(var i in my_rows) {
						var my_row	= my_rows[i];
						var my_set	=   '  parent_id = ' + the_to
									+ ',   thread_id = ' + my_row.thread_id
									+ ', supplier_id = ' + my_row.supplier_id
									+ ',     percent = ' + my_row.percent
									;
						var	my_data =
							{ method	: 'insert'
							, table		: 'FTP_Threads'
							, set		:  my_set
							};
						JKY.ajax(true, my_data);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}

JKY.delete_threads = function(the_id) {
	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Threads'
		, where : 'parent_id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.delete_thread = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'FTP_Threads'
		, where		: 'FTP_Threads.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_thread_success);
}

JKY.delete_thread_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.verify_total_percent = function() {
	var my_total = 0;
	$('#jky-threads-body tr').each(function() {
		var my_percent = parseFloat($(this).find('.jky-thread-percent').val());
		my_total += my_percent
	})
	JKY.set_html('jky-thread-total', my_total);
	if (my_total == 100) {
		$('#jky-thread-total').css('color', 'black');
	}else{
		$('#jky-thread-total').css('color', 'red');
		JKY.display_message(JKY.t('Total percent is not 100.'))
	}
}

JKY.print_ftp_threads = function(the_id) {
	var my_html  = '';
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
