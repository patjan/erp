"use strict";
/*
 * display Quotations ----------------------------------------------------------
 */

var my_saved_row = [];

JKY.display_quotations = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadQuotations'
		, specific		: 'loadout'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'Quotation.quotation_number, Product.product_name, Customer.nick_name'
		};
	JKY.ajax(false, my_data, JKY.generate_quotations);
}

JKY.generate_quotations = function(the_response) {
	var my_html	 = '';
	var my_rows  = the_response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_quotation(my_row);
		}
	}
	JKY.set_html('jky-quotations-body' , my_html);
	$('.jky-quoted-pieces').ForceIntegerOnly();
	$('.jky-quoted-weight').ForceNumericOnly();
	if (my_rows == '') {
		JKY.insert_quotation();
	}

	if (JKY.row.status == 'Closed') {
		$('#jky-quotations-body input[changeable]').prop('disabled', true );
	}else{
		$('#jky-quotations-body input[changeable]').prop('disabled', false);
	}
}

JKY.generate_quotation = function(the_row) {
	var my_id = the_row.id;
	var my_trash = JKY.is_status('Active') ? '<a onclick="JKY.delete_quotation(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_quotation = ''
		+ "<input class='jky-quot-color-id' type='hidden' value=" + the_row.quot_color_id + " />"
		+ "<input class='jky-quotation-number' disabled onchange='JKY.update_quotation(this, " + my_id + ")' value='" + JKY.fix_null(the_row.quotation_number) + "' />"
		+ " <a href='#' onClick='JKY.Quotation.display(this, JKY.get_color_id(), JKY.get_color_name())'><i class='icon-share'></i></a>"
		;
	var my_onchange = ' changeable onchange="JKY.update_quotation(this, ' + my_id + ')"';
	var my_disabled = ' disabled';
	var my_html = ''
		+ '<tr quotation_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-key"		>' + my_quotation + '</td>'
		+ '<td class="jky-td-text-l"	><input class="jky-product-name"	value="' + JKY.fix_null(the_row.product_name	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-text-s"	><input class="jky-customer-name"	value="' + JKY.fix_null(the_row.customer_name	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-pieces"	value="' + JKY.fix_null(the_row.quoted_pieces	) + '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-checkout-pieces"	value="' + JKY.fix_null(the_row.checkout_pieces	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-returned-pieces"	value="' + JKY.fix_null(the_row.returned_pieces	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-quoted-weight"	value="' + JKY.fix_null(the_row.quoted_weight	) + '"' + my_onchange + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-checkout-weight"	value="' + JKY.fix_null(the_row.checkout_weight	) + '"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-pieces"	><input class="jky-returned-weight"	value="' + JKY.fix_null(the_row.returned_weight	) + '"' + my_disabled + ' /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.select_row = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadQuotations'
		, where		: 'LoadQuotations.id = ' + the_id
		};
	JKY.ajax(false, my_data, function(the_response) {
		my_saved_row = the_response.row;
	})
}

JKY.update_quotation = function(the_this, the_id) {
	JKY.select_row(the_id);
	var my_tr = $(the_this).parent().parent();
	if (my_tr.find('.jky-quoted-pieces').val() == '')	my_tr.find('.jky-quoted-pieces').val(0);
	if (my_tr.find('.jky-quoted-weight').val() == '')	my_tr.find('.jky-quoted-weight').val(0);

	var my_quot_color_id =			  my_tr.find('.jky-quot-color-id').val();
	var my_quoted_pieces = parseFloat(my_tr.find('.jky-quoted-pieces').val());
	var my_quoted_weight = parseFloat(my_tr.find('.jky-quoted-weight').val());

	var my_set = ''
		+  ' quot_color_id = ' + my_quot_color_id
		+ ', quoted_pieces = ' + my_quoted_pieces
		+ ', quoted_weight = ' + my_quoted_weight
		;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadQuotations'
		, set		:  my_set
		, where		: 'LoadQuotations.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_delta_pieces = my_quoted_pieces - my_saved_row.quoted_pieces;
		var my_delta_weight = my_quoted_weight - my_saved_row.quoted_weight;
		JKY.update_parent(my_delta_pieces, my_delta_weight);
	})
}

JKY.insert_quotation = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'LoadQuotations'
		, set		: 'LoadQuotations.loadout_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, function(the_response) {
		my_saved_row = [];
		my_saved_row.id					= the_response.id;
		my_saved_row.status				= 'Draft';
		my_saved_row.quot_color_id		= null;
		my_saved_row.quotation_number	= '';
		my_saved_row.quoted_pieces		= 0;
		my_saved_row.checkout_pieces	= 0;
		my_saved_row.returned_pieces	= 0;
		my_saved_row.quoted_weight		= 0;
		my_saved_row.checkout_weight	= 0;
		my_saved_row.returned_weight	= 0;

		var my_html = JKY.generate_quotation(my_saved_row);
		JKY.append_html('jky-quotations-body', my_html);
		$('#jky-quotations-body tr:last a[onclick*="display"]').click();
	})
}

JKY.delete_quotation = function(the_this, the_id) {
	JKY.select_row(the_id);
	$(the_this).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'LoadQuotations'
		, where		: 'LoadQuotations.id = ' + the_id
		};
	JKY.ajax(true, my_data, function(the_response) {
		var my_delta_pieces = - my_saved_row.quoted_pieces;
		var my_delta_weight = - my_saved_row.quoted_weight;
		JKY.update_parent(my_delta_pieces, my_delta_weight);
	})
}


JKY.update_parent = function(the_delta_pieces, the_delta_weight) {
	var my_set	= '  quoted_pieces = quoted_pieces + ' + the_delta_pieces
				+ ', quoted_weight = quoted_weight + ' + the_delta_weight
				;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadOuts'
		, set		: my_set
		, where		: 'LoadOuts.id = ' + JKY.row.id
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_data =
			{ method	: 'get_row'
			, table		: 'LoadOuts'
			, where		: 'LoadOuts.id = ' + JKY.row.id
			};
		JKY.ajax(true, my_data, JKY.display_parent);
	})
}

JKY.display_parent = function(the_response) {
	JKY.set_value('jky-quoted-pieces', parseFloat(the_response.row.quoted_pieces));
	JKY.set_value('jky-quoted-weight', parseFloat(the_response.row.quoted_weight));
}

JKY.print_quotations = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'LoadQuotations'
		, select	:  the_id
		, order_by  : 'LoadQuotations.id'
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
