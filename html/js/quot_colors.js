/*
 * display Quotation Colors ----------------------------------------------------
 */

JKY.generate_color = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_color = ''
		+ "<input class='jky-color-row-id' type='hidden' value=" + the_row.color_id + " />"
		+ "<input class='jky-color-row-name' disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ "<a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr color_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td class="jky-action" style="text-align:right !important;">' + my_trash	+ '</td>'
		+ '<td class="jky-td-color-pieces"	><input class="jky-quoted-pieces"	onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.quoted_pieces	+ '" /></td>'
		+ '<td class="jky-td-color-name"	>' + my_color + '</td>'
		+ '<td class="jky-td-color-price"	><input class="jky-fabric-price"	onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.fabric_price	+ '" /></td>'
		+ '<td class="jky-td-color-price"	><input class="jky-punho-price"		onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.punho_price		+ '" /></td>'
		+ '<td class="jky-td-color-price"	><input class="jky-gola-price"		onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.gola_price		+ '" /></td>'
		+ '<td class="jky-td-color-price"	><input class="jky-galao-price"		onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.galao_price		+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_color = function(id_name, the_id) {
	var my_tr_id = $(id_name).parent().parent();

	var my_color_pieces		= parseInt(my_tr_id.find('.jky-quoted-pieces').val());
	var my_prev_pieces		= JKY.get_value_by_id('QuotColors', 'quoted_pieces', the_id);
	var my_diff_pieces		= my_color_pieces - my_prev_pieces;
	var my_line_id			= JKY.get_prev_dom(my_tr_id, 'quot_line_id');
	var my_pieces_id		= my_line_id.find('.jky-quoted-pieces');
	var my_line_pieces		= parseInt(my_pieces_id.val());
	my_pieces_id.val(my_line_pieces + my_diff_pieces);
	JKY.update_quoted_pieces(my_line_id, my_diff_pieces);

	var my_color_id			= my_tr_id.find('.jky-color-row-id').val();
		my_color_id			= (my_color_id == '') ? 'null' : my_color_id;
	var	my_quoted_pieces	= parseFloat(my_tr_id.find('.jky-quoted-pieces'	).val());
	var my_fabric_price		= parseFloat(my_tr_id.find('.jky-fabric-price'	).val());
	var my_punho_price		= parseFloat(my_tr_id.find('.jky-punho-price'	).val());
	var my_gola_price		= parseFloat(my_tr_id.find('.jky-gola-price'	).val());
	var my_galao_price		= parseFloat(my_tr_id.find('.jky-galao-price'	).val());
	var my_set = ''
		+          'color_id =  ' + my_color_id
		+   ', quoted_pieces =  ' + my_quoted_pieces
		+    ', fabric_price =  ' + my_fabric_price
		+     ', punho_price =  ' + my_punho_price
		+      ', gola_price =  ' + my_gola_price
		+     ', galao_price =  ' + my_galao_price
		;
	var my_data =
		{ method	: 'update'
		, table		: 'QuotColors'
		, set		:  my_set
		, where		: 'QuotColors.id = ' + the_id
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
		, table		: 'QuotColors'
		, set		: 'QuotColors.parent_id = ' + the_parent_id
		};
	JKY.ajax(true, my_data, JKY.insert_color_success);
}

JKY.insert_color_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.color_id			= null;
	my_row.color_name		= '';
	my_row.quoted_pieces	= 0;
	my_row.fabric_price		= 0;
	my_row.punho_price		= 0;
	my_row.gola_price		= 0;
	my_row.galao_price		= 0;
	var my_html = JKY.generate_color(my_row);
	JKY.line_tr.after(my_html);
	var my_tr = JKY.line_tr.next();
	my_tr.find('.jky-quoted-pieces'	).focus().select();
	my_tr.find('.jky-quoted-pieces'	).ForceIntegerOnly();
	my_tr.find('.jky-fabric-price'	).ForceNumericOnly();
	my_tr.find('.jky-punho-price'	).ForceNumericOnly();
	my_tr.find('.jky-gola-price'	).ForceNumericOnly();
	my_tr.find('.jky-galao-price'	).ForceNumericOnly();

}

JKY.delete_color = function(id_name, the_id) {
	var my_tr_id	= $(id_name).parent().parent();

	var my_color_pieces		= parseInt(my_tr_id.find('.jky-quoted-pieces').val());
	var my_diff_pieces		= - my_color_pieces;
	var my_line_id			= JKY.get_prev_dom(my_tr_id, 'quot_line_id');
	var my_pieces_id		= my_line_id.find('.jky-quoted-pieces');
	var my_line_pieces		= parseInt(my_pieces_id.val());
	my_pieces_id.val(my_line_pieces + my_diff_pieces);
	JKY.update_quoted_pieces(my_line_id, my_diff_pieces);

	my_tr_id.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'QuotColors'
		, where		: 'QuotColors.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_color_success);
}

JKY.delete_color_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.updated_total_pieces();
}

JKY.update_quoted_pieces = function(the_line_id, the_diff_pieces) {
	var my_data =
		{ method	: 'update'
		, table		: 'QuotLines'
		, where		: 'QuotLines.id = ' + the_line_id.attr('quot_line_id')
		, set		: 'quoted_pieces = quoted_pieces + ' + the_diff_pieces
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method	: 'update'
		, table		: 'Quotations'
		, where		: 'Quotations.id = ' + JKY.row.id
		, set		: 'quoted_pieces = quoted_pieces + ' + the_diff_pieces
		};
	JKY.ajax(true, my_data);
}

JKY.color_ids = function(the_id) {
	var my_rows = [];
	var my_data =
		{ method	: 'get_index'
		, table		: 'QuotColors'
		, select	:  the_id
		, order_by  : 'QuotColors.id'
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
		, table		: 'QuotColors'
		, select	:  the_id
		, order_by  : 'QuotColors.id'
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
						var my_row = my_rows[i];
						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_row.quoted_pieces + '</td>'
							+ '<td>' + my_row.color_name	+ '</td>'
							+ '<td>' + my_row.fabric_price	+ '</td>'
							+ '<td>' + my_row.punho_price	+ '</td>'
							+ '<td>' + my_row.gola_price	+ '</td>'
							+ '<td>' + my_row.galao_price	+ '</td>'
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
