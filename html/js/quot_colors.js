/*
 * display Quotation Colors ----------------------------------------------------
 */

JKY.generate_color = function(the_row, the_units) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_color = ''
		+ "<input class='jky-color-id'	 type='hidden' value=" + the_row.color_id   + " />"
		+ "<input class='jky-color-type' type='hidden' value=" + the_row.color_type + " />"
		+ "<input class='jky-color-name' disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ "<a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_dyer	 = ''
		+ "<input class='jky-dyer-id'	type='hidden'	value=" + the_row.dyer_id	+ " />"
		+ "<input class='jky-dyer-name'	disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.dyer_name + "' />"
		+ "<a href='#' onClick='JKY.Dyer.display(this)'><i class='icon-share'></i></a>"
		;
	var my_unit = (the_units == 0) ? 'weight' : 'piece';
	var my_html = ''
		+ '<tr color_id=' + my_id + '>'
		+ '<td></td>'
		+ '<td class="jky-td-action"	colspan="3" style="text-align:right !important;">' + my_trash + '</td>'
		+ '<td class="jky-td-key-m"		>' + my_color + '</td>'
		+ '<td class="jky-td-key"		>' + my_dyer  + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-units"				onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.quoted_units	+ '" /></td>'
		+ '<td class="jky-td-units"		>' + '(' + JKY.t(my_unit) + ')' + '</td>'
		+ '<td class="jky-td-price"		><input class="jky-quoted-price	jky-td-price"	onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.quoted_price	+ '" /></td>'
		+ '<td class="jky-td-units"		>($/Kg)</td>'
		+ '<td class="jky-td-price"		><input class="jky-discount		jky-td-price"	onchange="JKY.update_color(this, ' + my_id + ')" value="' + the_row.discount		+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.get_quoted_price = function(my_product_id, my_color_type) {
	var my_where =		'ProdPrices.product_id = ' + my_product_id
				 + ' AND ProdPrices.color_type = \'' + my_color_type + '\''
				 + ' AND ProdPrices.current_price > 0'
				 ;
	var my_rows = JKY.get_rows_by_where('ProdPrices', my_where);

	if (my_rows.length == 0) {
		my_where =		'ProdPrices.product_id = ' + my_product_id
				 + ' AND ProdPrices.color_type = \'Unico\''
				 + ' AND ProdPrices.current_price > 0'
				 ;
		my_rows = JKY.get_rows_by_where('ProdPrices', my_where);
	}

	if (my_rows.length == 0) {
		return 0
	}else{
		return my_rows[0].current_price;
	}
}

JKY.update_color = function(id_name, the_id) {
	var my_tr_id = $(id_name).parent().parent();

	var my_line_id			= JKY.get_prev_dom(my_tr_id, 'quot_line_id');
	var my_product_id		= my_line_id.find('.jky-product-id'		).val();
	var my_line_units_id	= my_line_id.find('.jky-quoted-units'	);
	var my_line_pieces_id	= my_line_id.find('.jky-quoted-pieces'	);
	var my_line_units		= parseFloat(my_line_units_id .val());
	var my_line_pieces		= parseInt	(my_line_pieces_id.val());
	var my_peso				= parseFloat(my_line_id.find('.jky-product-peso' ).val());
	var my_units			= parseInt	(my_line_id.find('.jky-product-units').val());

	var my_color_units;
	var my_prev_units;
	var my_diff_weight;
	if (my_units == 0) {
		var my_color_peso	= parseFloat(my_tr_id.find('.jky-quoted-units').val());
		var my_prev_peso	= parseFloat(JKY.get_value_by_id('QuotColors', 'quoted_units', the_id));
		my_color_units		= Math.ceil(my_color_peso / my_peso);
		my_prev_units		= Math.ceil(my_prev_peso  / my_peso);
		my_diff_weight		= my_color_peso - my_prev_peso;
	}else{
		my_color_units		= parseInt(my_tr_id.find('.jky-quoted-units').val());
		my_prev_units		= parseInt(JKY.get_value_by_id('QuotColors', 'quoted_units', the_id));
		my_diff_weight		= (my_color_units - my_prev_units) * my_peso;
	}
	var	my_diff_units		= my_color_units - my_prev_units ;

	var my_new_units		= my_line_units + my_diff_units;
	var my_new_pieces		= (my_units == 0 ) ? my_new_units : Math.ceil(my_new_units / my_units);
	var my_diff_pieces		= my_new_pieces - my_line_pieces;

	my_line_units_id .val(my_new_units );
	my_line_pieces_id.val(my_new_pieces);

	JKY.update_quoted_units(my_line_id, my_diff_weight, my_diff_units, my_diff_pieces);

	var my_color_id			= my_tr_id.find('.jky-color-id'  ).val();
		my_color_id			= (my_color_id == '') ? 'null' : my_color_id;
	var my_color_type		= my_tr_id.find('.jky-color-type').val();
	var my_dyer_id			= my_tr_id.find('.jky-dyer-id'  ).val();
		my_dyer_id			= (my_dyer_id == '') ? 'null' : my_dyer_id;
	var	my_quoted_units		= parseFloat(my_tr_id.find('.jky-quoted-units'	).val());
	var my_quoted_price		= parseFloat(my_tr_id.find('.jky-quoted-price'	).val());
	var my_discount			=			 my_tr_id.find('.jky-discount'		).val() ;

	if (my_quoted_price == 0) {
		my_quoted_price = JKY.get_quoted_price(my_product_id, my_color_type);
		my_tr_id.find('.jky-quoted-price').val(my_quoted_price);
	}

	var my_set = ''
		+          'color_id =  ' + my_color_id
		+      ', color_type =\'' + my_color_type + '\''
		+         ', dyer_id =  ' + my_dyer_id
		+    ', quoted_units =  ' + my_quoted_units
		+    ', quoted_price =  ' + my_quoted_price
		+        ', discount =\'' + my_discount + '\''
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
	JKY.update_quotation_amount();
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
	var my_units = parseInt(JKY.line_tr.find('.jky-product-units').val());
	var my_row = [];
	my_row.id				= response.id;
	my_row.color_id			= null;
	my_row.color_name		= '';
	my_row.color_type		= '';
	my_row.dyer_id			= null;
	my_row.dyer_name		= '';
	my_row.quoted_units		= 0;
	my_row.quoted_price		= 0;
	my_row.discount			= '';
//	my_row.punho_price		= 0;
//	my_row.gola_price		= 0;
//	my_row.galao_price		= 0;
	var my_html = JKY.generate_color(my_row, my_units);
	JKY.line_tr.after(my_html);
	var my_tr = JKY.line_tr.next();
	my_tr.find('.jky-quoted-units'	).focus().select();
//	my_tr.find('.jky-quoted-units'	).ForceNumericOnly();
	my_tr.find('.jky-quoted-price'	).ForceNumericOnly();
//	my_tr.find('.jky-punho-price'	).ForceNumericOnly();
//	my_tr.find('.jky-gola-price'	).ForceNumericOnly();
//	my_tr.find('.jky-galao-price'	).ForceNumericOnly();

}

JKY.delete_color = function(id_name, the_id) {
	var my_tr_id = $(id_name).parent().parent();

	var my_line_id			= JKY.get_prev_dom(my_tr_id, 'quot_line_id');
	var my_line_units_id	=			 my_line_id.find('.jky-quoted-units'	);
	var my_line_pieces_id	=			 my_line_id.find('.jky-quoted-pieces'	);
	var my_line_units		= parseInt	(my_line_units_id .val());
	var my_line_pieces		= parseInt	(my_line_pieces_id.val());
	var my_peso				= parseFloat(my_line_id.find('.jky-product-peso' ).val());
	var my_units			= parseInt	(my_line_id.find('.jky-product-units').val());

	var my_prev_units;
	var my_diff_weight;
	if (my_units == 0) {
		var my_prev_peso	= parseFloat(JKY.get_value_by_id('QuotColors', 'quoted_units', the_id));
		my_prev_units		= Math.ceil(my_prev_peso  / my_peso);
		my_diff_weight		= - my_prev_peso;
	}else{
		my_prev_units		= parseFloat(JKY.get_value_by_id('QuotColors', 'quoted_units', the_id));
		my_diff_weight		= (- my_prev_units) * my_peso;
	}
	var	my_diff_units		= - my_prev_units;

	var my_new_units		= my_line_units + my_diff_units;
	var my_new_pieces		= (my_units == 0 ) ? my_new_units : Math.ceil(my_new_units / my_units);
	var my_diff_pieces		= my_new_pieces - my_line_pieces;

	my_line_units_id .val(my_new_units );
	my_line_pieces_id.val(my_new_pieces);

	JKY.update_quoted_units(my_line_id, my_diff_weight, my_diff_units, my_diff_pieces);

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
	JKY.update_quotation_amount();
}

JKY.copy_colors = function(the_id, the_parent_id) {
	JKY.line_tr = $(the_id).parent().parent();
	var my_curr_tr	= JKY.line_tr;
	var my_colors	= [];
	do {
		my_curr_tr = my_curr_tr.prev();
		var my_quot_line_id	= my_curr_tr.attr('quot_line_id');
		if (my_quot_line_id) {
			break;
		}
		var my_quot_color_id	= my_curr_tr.attr('color_id');
		if (my_quot_color_id) {
			var my_color = [];
			var my_color_id		= my_curr_tr.find('.jky-color-id'	).val();
			var my_color_name	= my_curr_tr.find('.jky-color-name'	).val();
			my_color.color_id	= my_color_id	;
			my_color.color_name = my_color_name	;
			var my_dyer_id		= my_curr_tr.find('.jky-dyer-id'	).val();
			var my_dyer_name	= my_curr_tr.find('.jky-dyer-name'	).val();
			my_color.dyer_id	= my_dyer_id	;
			my_color.dyer_name	= my_dyer_name	;
			my_colors.push(my_color);
		}
	} while(my_quot_line_id || my_quot_color_id);

	JKY.display_message(my_colors.length + ' colors copied');
	if (my_colors.length > 0) {
		for(var i=my_colors.length-1; i>=0; i--) {
//	to ensure to copy in the same sequence as origin with 100 ms of delay
setTimeout(function(x) { return function() {
			var my_color = my_colors[x];
			var my_set = ''
				+         'parent_id =  ' + the_parent_id
				+        ', color_id =  ' + my_color.color_id
				+         ', dyer_id =  ' + my_color.dyer_id
				;
			var my_data =
				{ method	: 'insert'
				, table		: 'QuotColors'
				, set		:  my_set
				};
			JKY.ajax(true, my_data, JKY.copy_color_success);
}; }(i), 100);
		}
	}
}

JKY.copy_color_success = function(response) {
	var my_units = parseInt(JKY.line_tr.find('.jky-product-units').val());
	var my_row  = JKY.get_row('QuotColors', response.id);
	var my_html = JKY.generate_color(my_row, my_units);
	JKY.line_tr.after(my_html);
	var my_tr = JKY.line_tr.next();
//	my_tr.find('.jky-quoted-units'	).focus().select();
	my_tr.find('.jky-quoted-units'	).ForceNumericOnly();
	my_tr.find('.jky-quoted-price'	).ForceNumericOnly();
}

JKY.update_quoted_units = function(the_line_id, the_diff_weight, the_diff_units, the_diff_pieces) {
	var my_data =
		{ method	: 'update'
		, table		: 'QuotLines'
		, where		: 'QuotLines.id = ' + the_line_id.attr('quot_line_id')
		, set		: 'quoted_weight = quoted_weight + ' + the_diff_weight
				  + ', quoted_units  = quoted_units  + ' + the_diff_units
				  + ', quoted_pieces = quoted_pieces + ' + the_diff_pieces
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
							+ '<td></td>'
							+ '<td class="jky-print-color-name"	>' + my_row.color_name		+ '</td>'
							+ '<td></td>'
							+ '<td class="jky-print-pieces"		>' + my_row.quoted_units	+ '</td>'
							+ '<td class="jky-print-pieces"		>' + '($/Kg)'				+ '</td>'
							+ '<td class="jky-print-pieces"		>' + my_row.quoted_price	+ '</td>'
							+ '<td class="jky-print-pieces"		>' + my_row.discount		+ '</td>'
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
