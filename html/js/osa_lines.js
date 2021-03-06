"use strict";
var JKY = JKY || {};
/*
 * display OSA Lines -----------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'OSA_Lines'
		, select	:  JKY.row.id
		, order_by  : 'OSA_Lines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_line(i, my_row);
		}
	}
	JKY.set_html('jky-lines-body', my_html);
	if (my_rows == '') {
		JKY.insert_line();
	}
	$('.jky-product-peso'	).ForceNumericOnly();
	$('.jky-quoted-units'	).ForceIntegerOnly();
	$('.jky-product-units'	).ForceIntegerOnly();
	$('.jky-quoted-pieces'	).ForceIntegerOnly();
	$('.jky-quoted-weight'	).ForceNumericOnly();
}

JKY.generate_line = function(the_index, the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_product = ''
		+ "<input class='jky-product-id' type='hidden' value=" + the_row.product_id + " />"
		+ "<input class='jky-product-name' disabled onchange='JKY.update_line(this, " + my_id + ")' value='" + the_row.product_name + "' />"
		+ " <a href='#' onClick='JKY.Product.display(this)'><i class='icon-share'	></i></a>"
		+ " <a href='#' onClick='JKY.Product.display(this)'><i class='icon-signal'	></i></a>"
		+ " <a href='#' onClick='JKY.Product.display(this)'><i class='icon-th'		></i></a>"
		;
	var my_disabled = JKY.is_status('Draft') ? '' : ' disabled="disabled"';
	var my_add_color = '<button class="btn btn-success" type="button" onclick="JKY.insert_color(this, ' + my_id + ', ' + the_row.product_id + ')"' + my_disabled + '>' + JKY.t('Add Color') + '</button>';
	var my_html = ''
		+ '<tr class="jky-line" osa_line_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash			+ '</td>'
		+ '<td class="nowrap"			>' + my_product			+ '</td>'
		+ '<td class="jky-td-extra"		><input class="jky-remarks"			onchange="JKY.update_line(this, ' + my_id + ')"	value="' + JKY.decode(the_row.remarks) + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-product-peso"	onchange="JKY.update_line(this, ' + my_id + ')"	value="' + the_row.peso			 + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-units"	onchange="JKY.update_line(this, ' + my_id + ')"	value="' + the_row.quoted_units	 + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-product-units"	onchange="JKY.update_line(this, ' + my_id + ')"	value="' + the_row.units		 + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-pieces"	disabled										value="' + the_row.quoted_pieces + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-weight"	disabled										value="' + the_row.quoted_weight + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-ordered-pieces"	disabled										value="' + the_row.ordered_pieces + '" /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-ordered-weight"	disabled										value="' + the_row.ordered_weight + '" /></td>'
		+ '</tr>'

		+ '<tr class="jky-line" Xosa_line_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + '&nbsp;'			+ '</td>'
		+ '<td class="jky-td-action"	>' + '&nbsp;'			+ '</td>'
		+ '<td class="jky-td-extra"		>' + my_add_color		+ '</td>'
		+ '<td class="nowrap" colspan=2	>' + JKY.t('Color')		+ '</td>'
		+ '<td class="nowrap"			>' + JKY.t('FTP')		+ '</td>'
		+ '<td class="jky-td-name-s"	>' + JKY.t('Machine')	+ '</td>'
		+ '<td class="nowrap"			>' + JKY.t('Partner')	+ '</td>'
		+ '<td class="jky-td-pieces"	>' + JKY.t('Pieces'	)	+ '</td>'
		+ '<td class="jky-td-weight"	>' + JKY.t('Weight'	)	+ '</td>'
		+ '</tr>'
		;
	var my_rows = JKY.get_rows_by_where('OSA_Colors', 'OSA_Colors.parent_id = ' + my_id);
	for(var i=0, max=my_rows.length; i<max; i++) {
		var my_row = my_rows[i];
		my_html += JKY.generate_color(my_row, the_row.peso, the_row.units);
	}
	return my_html;
}

JKY.update_line = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	if (my_tr.find('.jky-product-peso'	).val() == '')	my_tr.find('.jky-product-peso'	).val(0);
	if (my_tr.find('.jky-product-units'	).val() == '')	my_tr.find('.jky-product-units'	).val(0);
	if (my_tr.find('.jky-quoted-units'	).val() == '')	my_tr.find('.jky-quoted-units'	).val(0);

	var my_product_id	= my_tr.find('.jky-product-id'		).val();
	var my_remarks		= my_tr.find('.jky-remarks'			).val();
	var my_peso			= my_tr.find('.jky-product-peso'	).val();
	var my_quoted_units	= my_tr.find('.jky-quoted-units'	).val();
	var my_units		= my_tr.find('.jky-product-units'	).val();
	var my_quoted_pieces= my_tr.find('.jky-quoted-pieces'	).val();

	if (my_units < 0) {
		JKY.display_message(JKY.set_value_is_under('Units/Piece', 0));
		my_tr.find('.jky-product-units').select();
		my_tr.find('.jky-product-units').focus();
		return false;
	}

	var my_new_pieces		= (my_units == 0) ? my_quoted_units : Math.ceil(my_quoted_units / my_units);
	var my_new_weight		= my_quoted_units * my_peso;
	var my_diff_pieces		= my_new_pieces - my_quoted_pieces;

	var my_line_pieces_id	= my_tr.find('.jky-quoted-pieces');
	my_line_pieces_id.val(my_new_pieces);

	var my_set = ''
		+    '  product_id =  ' + my_product_id
		+       ', remarks =\'' + my_remarks + '\''
		+          ', peso =  ' + my_peso
		+  ', quoted_units =  ' + my_quoted_units
		+         ', units =  ' + my_units
		+ ', quoted_pieces =  ' + my_quoted_pieces
		;
	var my_data =
		{ method	: 'update'
		, table		: 'OSA_Lines'
		, set		:  my_set
		, where		: 'OSA_Lines.id = ' + the_id
		};
	JKY.ajax(true, my_data);

	my_data =
		{ method	: 'update'
		, table		: 'OSAs'
		, where		: 'OSAs.id = ' + JKY.row.id
		, set		: 'quoted_pieces = quoted_pieces + ' + my_diff_pieces
		};
	JKY.ajax(true, my_data, function(the_response) {
//		JKY.display_message(response.message)
	})
	my_tr.find('.jky-quoted-pieces').val(my_new_pieces);
	my_tr.find('.jky-quoted-weight').val(my_new_weight);
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'OSA_Lines'
		, set		: 'OSA_Lines.parent_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_row = [];
		my_row.id				= the_response.id;
		my_row.product_id		= null;
		my_row.product_name		= '';
		my_row.peso				= 0;
		my_row.quoted_units		= 0;
		my_row.units			= 0;
		my_row.quoted_pieces	= 0;
		my_row.remarks			= '';

		var my_html = JKY.generate_line(null, my_row);
		JKY.append_html('jky-lines-body', my_html);
	})
}

JKY.delete_line = function(id_name, the_id) {
	var my_count = JKY.get_count_by_where('Orders', 'osa_line_id = ' + the_id);
	if (my_count > 0) {
		JKY.display_message(JKY.t('Error, delete first all sub records'));
		return;
	}

	var my_tr = $(id_name).parent().parent();
	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'OSA_Lines'
		, where		: 'OSA_Lines.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
//		JKY.display_message(response.message)
//		JKY.verify_total_percent();
	})
}

JKY.print_lines = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'OSA_Lines'
		, select	:  the_id
		, order_by  : 'OSA_Lines.id'
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
							+ '<tr class="jky-bold">'
							+ '<td								><b>' +				 my_row.product_name	+ '</b></td>'
							+ '<td class="jky-print-name-s"		><b>' + JKY.decode	(my_row.remarks)		+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.peso			+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_units	+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.units			+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_pieces	+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_weight	+ '</b></td>'
							+ '</tr>'
							;
						my_html  += JKY.print_colors(my_row.id);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}

JKY.approve_lines = function(the_osa_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'OSA_Lines'
		, select	:  the_osa_id
		, order_by  : 'OSA_Lines.id'
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
						var my_dyer = '<br>Gram: ' + my_row.weight_dyer
									+	', Larg: ' + my_row.width_dyer
									;
						my_html  += ''
							+ '<tr class="jky-bold">'
							+ '<td class="jky-print-product"	><b>' +				 my_row.product_name	+ '</b>' + my_dyer + '</td>'
							+ '<td class="jky-print-name-s"		><b>' + JKY.decode	(my_row.remarks)		+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.peso			+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_units	+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.units			+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_pieces	+ '</b></td>'
							+ '<td class="jky-print-pieces"		><b>' +				 my_row.quoted_weight	+ '</b></td>'
							+ '</tr>'
							;
						my_html  += JKY.approve_colors(my_row.id);
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}
