/*
 * display Sale Fabrics --------------------------------------------------------
 */

JKY.display_fabrics = function(the_row) {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Fabrics'
		, specific		: 'sale'
		, specific_id	:  the_row.id
		, select		: 'All'
		, order_by		: 'Fabrics.barcode'
		};
	JKY.ajax(false, my_data, JKY.generate_fabrics);
}

JKY.generate_fabrics = function(response) {
//	JKY.Order.set_requested(0);
//	JKY.Order.set_checkout (0);
	var my_html	= '';
	var my_rows	= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_fabric(my_row);
//			JKY.Order.add_requested(my_row.requested_weight);
//			JKY.Order.add_checkout (my_row.checkout_weight );
		}
	}
	JKY.set_html('jky-fabrics-body', my_html );
//	JKY.update_pieces_weight();
//	if (my_rows == '') {
//		JKY.insert_fabrics();
//	}
}

JKY.generate_fabric = function(the_row) {
	var my_id = the_row.id;
//	var my_trash = (the_row.batch_id == null) ? '<a onclick="JKY.delete_fabrics(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_trash = '';
/*
	var my_fabrics = ''
		+ "<input class='jky-fabrics-id' type='hidden' value=" + the_row.fabrics_id + " />"
		+ "<input class='jky-fabrics-name' disabled onchange='JKY.update_fabrics(this, " + my_id + ")' value='" + the_row.fabrics_name + "' />"
		+ " <a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_needed_at = JKY.out_date(the_row.needed_at);
	if (my_needed_at == '') {
		my_needed_at = JKY.out_date(JKY.row.needed_at);
	}
*/
	var my_html = ''
		+ '<tr sale_fabrics_id=' + my_id + '>'
		+ '<td class="jky-tdaction"		>' + my_trash		+ '</td>'
		+ '<td class="jky-td-barcode"	>' + the_row.barcode+ '</td>'
		+ '<td class="jky-td-status"	>' + JKY.t(the_row.status) + '</td>'
		+ '<td class="jky-td-weight"	><input class="jky-fabrics-checkin-weight"		text="text"	disabled value="' + JKY.set_decimal	(the_row.checkin_weight ) + '" /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-fabrics-checkout-weight"		text="text"	disabled value="' + JKY.set_decimal	(the_row.checkout_weight) + '" /></td>'
		+ '<td class="jky-td-date"		><input class="jky-fabrics-checkout-date"					disabled value="' + JKY.short_date	(the_row.checkout_at	) + '" /></td>'
		+ '<td class="jky-td-date"		><input class="jky-fabrics-shipout-date"					disabled value="' + JKY.short_date	(the_row.shipout_at		) + '" /></td>'
		+ '<td class="jky-td-text-w"	><input class="jky-fabrics-product-name"		text="text" disabled value="' +					 the_row.product_name	  + '" /></td>'
		+ '<td class="jky-td-text-s"	><input class="jky-fabrics-color-name"			text="text"	disabled value="' +					 the_row.color_name		  + '" /></td>'
		+ '</tr>'
		;
	return my_html;
}
JKY.update_fabrics = function(id_name, the_id ) {
	var my_saved_requested = parseFloat(JKY.get_value_by_id('Fabrics', 'requested_weight', the_id));

	var my_tr = $(id_name).parent().parent();
	var my_fabrics_id		=					 my_tr.find('.jky-fabrics-id'				).val() ;
	var my_batchin_id		=					 my_tr.find('.jky-batchin-id'				).val() ;
	var my_needed_at		= JKY.inp_date_value(my_tr.find('.jky-fabrics-needed-date'		).val());
	var my_requested_weight	= parseFloat		(my_tr.find('.jky-fabrics-requested-weight'	).val());

	var my_set = ''
		+         'fabrics_id = ' + my_fabrics_id
		+       ', needed_at = ' + my_needed_at
		+', requested_weight = ' + my_requested_weight
		;
	if (!isNaN(my_batchin_id)) {
		my_set += ', batchin_id = ' + my_batchin_id
	}
	var my_data =
		{ method	: 'update'
		, table		: 'Fabrics'
		, set		:  my_set
		, where		: 'Fabrics.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_fabrics_success);

//	JKY.Order.add_requested(my_requested_weight - my_saved_requested);
}

JKY.update_fabrics_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.update_fabrics_weight();
}

JKY.insert_fabrics = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Fabrics'
		, set		: 'Fabrics.order_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_fabrics_success);
}

JKY.insert_fabrics_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.order_number		= response.id;
	my_row.fabrics_id		= null;
	my_row.fabrics_name		= '';
	my_row.batchin_id		= null;
	my_row.batchin_code		= '';
	my_row.needed_at		= null;
	my_row.checkout_at		= null;
	my_row.requested_weight	=  0;
	my_row.checkout_weight	=  0;

	var my_html = JKY.generate_fabric(my_row);
	JKY.append_html('jky-fabrics-body', my_html);
	var my_tr_id = $('#jky-fabrics-body tr[sale_fabrics_id="' + response.id + '"]');
	my_tr_id.find('.jky-fabrics-requested-weight').focus().select();
}

JKY.delete_fabrics = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Fabrics'
		, where		: 'Fabrics.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_fabrics_success);
}

JKY.delete_fabrics_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.update_fabrics_weight();
}

JKY.update_fabrics_weight = function() {
	JKY.set_html('jky-fabrics-total-requested', JKY.Order.get_requested());
	JKY.set_html('jky-fabrics-total-checkout' , JKY.Order.get_checkout ());
//	JKY.Order.update_requested_weight(JKY.row.id);
}

JKY.print_fabrics = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method		: 'get_index'
		, table			: 'Fabrics'
		, specific		: 'order'
		, specific_id	:  the_id
		, select		: 'All'
		, order_by		: 'Fabrics.id'
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
