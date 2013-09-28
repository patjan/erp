/*
 * display TDyer Colors --------------------------------------------------------
 */

JKY.generate_color = function(the_row) {
	var my_id = the_row.id;
//	var my_trash = (the_row.order_id == null) ? '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_trash = '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>';
	var my_color = ''
		+ "<input class='jky-color-row-id' type='hidden' value=" + the_row.color_id + " />"
		+ "<input class='jky-color-row-name' disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ "<a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr color_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td></td>'
		+ '<td class="jky-action" style="text-align:right !important;">' + my_trash	+ '</td>'
		+ '<td class="jky-td-color-name"	>' + my_color + '</td>'
		+ '<td class="jky-td-color-weight"	><input class="jky-ordered-weight"	onchange="JKY.update_color(this, ' + my_id + ')" value="' +				 the_row.ordered_weight	  + '" /></td>'
		+ '<td class="jky-td-color-weight"	><input class="jky-checkout-weight"	onchange="JKY.update_color(this, ' + my_id + ')" value="' +				 the_row.checkout_weight  + '" disabled /></td>'
		+ '<td class="jky-td-color-date"	><input class="jky-needed-date"		onchange="JKY.update_color(this, ' + my_id + ')" value="' + JKY.out_date(the_row.needed_at		) + '" /></td>'
		+ '<td class="jky-td-color-date"	><input class="jky-checkout-date"	onchange="JKY.update_color(this, ' + my_id + ')" value="' + JKY.out_date(the_row.checkout_at	) + '" disabled /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_color = function(id_name, the_id) {
	var my_tr_id = $(id_name).parent().parent();

	var my_color_weight		= parseFloat(my_tr_id.find('.jky-ordered-weight').val());
	var my_prev_weight		= JKY.get_value_by_id('TDyerColors', 'ordered_weight', the_id);
	var my_diff_weight		= my_color_weight - my_prev_weight;
	var my_ordered_weight	= parseFloat(JKY.get_value('jky-ordered-weight'));
	JKY.set_value('jky-ordered-weight', my_ordered_weight + my_diff_weight);
	JKY.update_ordered_weight(JKY.row.id, my_diff_weight);

	var my_color_id			= my_tr_id.find('.jky-color-row-id').val();
		my_color_id			= (my_color_id == '') ? 'null' : my_color_id;
		my_ordered_weight	= parseFloat	(my_tr_id.find('.jky-ordered-weight'	).val());
	var	my_needed_at		= JKY.inp_time	(my_tr_id.find('.jky-needed-date'		).val());
	var my_set = ''
		+          'color_id =  ' + my_color_id
		+  ', ordered_weight =  ' + my_ordered_weight
		+       ', needed_at =  ' + my_needed_at
		;
	var my_data =
		{ method	: 'update'
		, table		: 'TDyerColors'
		, set		:  my_set
		, where		: 'TDyerColors.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_color_success);
}

JKY.update_color_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.insert_color = function(the_id, the_parent_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_data =
		{ method	: 'insert'
		, table		: 'TDyerColors'
		, set		: 'TDyerColors.parent_id = ' + the_parent_id
		};
	JKY.ajax(true, my_data, JKY.insert_color_success);
}

JKY.insert_color_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.color_id			= null;
	my_row.color_name		= '';
	my_row.needed_at		= JKY.row.needed_at;
	my_row.checkout_at		= null;
	my_row.ordered_weight	= 0;
	my_row.checkout_weight	= 0;

	var my_html = JKY.generate_color(my_row);
	JKY.line_tr.after(my_html);
	JKY.line_tr.next().find('.jky-ordered-weight').focus().select();
}

JKY.delete_color = function(id_name, the_id) {
	var my_tr_id	= $(id_name).parent().parent();

	var my_color_weight		= parseFloat(my_tr_id.find('.jky-ordered-weight').val());
	var my_diff_weight		= - my_color_weight;
	var my_ordered_weight	= parseFloat(JKY.get_value('jky-ordered-weight'));
	JKY.set_value('jky-ordered-weight', my_ordered_weight + my_diff_weight);
	JKY.update_ordered_weight(JKY.row.id, my_diff_weight);

	my_tr_id.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'TDyerColors'
		, where		: 'TDyerColors.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_color_success);
}

JKY.delete_color_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.updated_total_weight();
}

JKY.update_ordered_weight = function(the_id, the_diff_weight) {
	var my_data =
		{ method	: 'update'
		, table		: 'TDyers'
		, where		: 'TDyers.id = ' + the_id
		, set		: 'ordered_weight = ordered_weight + ' + the_diff_weight
		};
	JKY.ajax(true, my_data);
}

JKY.color_ids = function(the_id) {
	var my_rows = [];
	var my_data =
		{ method	: 'get_index'
		, table		: 'TDyerColors'
		, select	:  the_id
		, order_by  : 'TDyerColors.id'
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
					for(var i=0; i<response.rows.length; i++) {
						var my_row = [];
						my_row.id	= response.rows[i].color_id;
						my_row.name = response.rows[i].color_name;
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

JKY.print_colors = function(the_id) {
	JKY.colors = JKY.color_ids(the_id);
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
						var my_color_id		= my_row.color_id;

						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>Fio 1 = ' + JKY.get_name(my_color_id, JKY.colors) + '</td>'
							+ '</tr>'
							;
						if (my_thread_id_2) {my_html += '<tr><td colspan="3"></td><td>Fio 2 = ' + JKY.get_name(my_thread_id_2, JKY.colors) + '</td></tr>';}
						if (my_thread_id_3) {my_html += '<tr><td colspan="3"></td><td>Fio 3 = ' + JKY.get_name(my_thread_id_3, JKY.colors) + '</td></tr>';}
						if (my_thread_id_4) {my_html += '<tr><td colspan="3"></td><td>Fio 4 = ' + JKY.get_name(my_thread_id_4, JKY.colors) + '</td></tr>';}
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
