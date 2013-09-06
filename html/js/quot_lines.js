/*
 * display Quotation Lines -----------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'QuotLines'
		, select	:  JKY.row.id
		, order_by  : 'QuotLines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_line(my_row);
		}
	}
	JKY.set_html('jky-lines-body', my_html);
	if (my_rows == '') {
		JKY.insert_line();
	}
}

JKY.generate_line = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.order_id == null) ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_product = ''
		+ "<input class='jky-product-row-id' type='hidden' value=" + the_row.product_id + " />"
		+ "<input class='jky-product-row-name' readonly='readonly' onclick='JKY.update_line(this, " + my_id + ")' value='" + the_row.product_name + "' />"
		+ "<a href='#' onClick='JKY.Product.display(this)'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr class="jky-line" quot_line_id=' + my_id + '>'
		+ '<td class="jky-action"		>' + my_trash	+ '</td>'
		+ '<td class="jky-product-name"	>' + my_product	+ '</td>'
		+ '<td class="jky-color-pieces"><input class="jky-quoted-pieces" disabled="disabled" value="' + the_row.quoted_pieces + '" /></td>'
		+ '<td class="jky-add-color"><a class="btn btn-success" type="button" href="#" onclick="JKY.insert_color(this, ' + my_id + ')"><span>Add Color</span></a></td>'
		+ '<td colspan="4"></td>'
		+ '</tr>'
		;
	var my_rows = JKY.get_rows('QuotColors', my_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		my_html += JKY.generate_color(my_row);
	}
	return my_html;
}

JKY.update_line = function(id_name, the_id) {
	var my_td = $(id_name).parent();
	var my_product_id = my_td.find('.jky-product-row-id').val();
	var my_set = ''
		+       'product_id =  ' + my_product_id
		;
	var my_data =
		{ method	: 'update'
		, table		: 'QuotLines'
		, set		:  my_set
		, where		: 'QuotLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_line_success);
}

JKY.update_line_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'QuotLines'
		, set		: 'QuotLines.quotation_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_line_success);
}

JKY.insert_line_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.order_id			= null;
	my_row.product_id		= null;
	my_row.product_name		= '';
	my_row.quoted_pieces	= 0;

	var my_html = JKY.generate_line(my_row);
	JKY.append_html('jky-lines-body', my_html);
}

JKY.delete_line = function(id_name, the_id) {
	var my_count = JKY.get_count_by_id('QuotColors', the_id);
	if (my_count > 0) {
		JKY.display_message(JKY.t('Error, delete first all sub records'));
		return;
	}

	var my_tr = $(id_name).parent().parent();
	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'QuotLines'
		, where		: 'QuotLines.id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.delete_line_success = function(response) {
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

JKY.print_lines = function(the_id) {
	JKY.lines = JKY.line_ids(the_id);
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'QuotLines'
		, select	:  the_id
		, order_by  : 'QuotLines.id'
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
