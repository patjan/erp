/*
 * display Order Pieces --------------------------------------------------------
 */

JKY.display_pieces = function(the_row) {
//JKY.d('display_pieces: ' + the_row.ftp_id);
	if (the_row.ftp_id) {
		var my_data =
			{ method		: 'get_index'
			, table			: 'Pieces'
			, specific		: 'order'
			, specific_id	:  the_row.id
			, select		: 'All'
			, order_by		: 'Pieces.number_of_pieces DESC'
			};
		JKY.ajax(false, my_data, JKY.generate_pieces);
	}else{
		JKY.set_html('jky-pieces-body', '');
	}
}

JKY.generate_pieces = function(response) {
//	JKY.Order.set_requested(0);
//	JKY.Order.set_checkout (0);
	var my_html	= '';
	var my_rows	= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_piece(my_row);
//			JKY.Order.add_requested(my_row.requested_weight);
//			JKY.Order.add_checkout (my_row.checkout_weight );
		}
	}
	JKY.set_html('jky-pieces-body', my_html );
//	JKY.update_pieces_weight();
//	if (my_rows == '') {
//		JKY.insert_pieces();
//	}
}

JKY.generate_piece = function(the_row) {
	var my_id = the_row.id;
//	var my_trash = (the_row.batch_id == null) ? '<a onclick="JKY.delete_pieces(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_trash = '';
/*
	var my_pieces = ''
		+ "<input class='jky-pieces-id' type='hidden' value=" + the_row.pieces_id + " />"
		+ "<input class='jky-pieces-name' disabled onchange='JKY.update_pieces(this, " + my_id + ")' value='" + the_row.pieces_name + "' />"
		+ " <a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var my_needed_at = JKY.out_date(the_row.needed_at);
	if (my_needed_at == '') {
		my_needed_at = JKY.out_date(JKY.row.needed_at);
	}
*/
	var my_html = ''
		+ '<tr order_pieces_id=' + my_id + '>'
		+ '<td class="jky-tdaction"		>' + my_trash		+ '</td>'
		+ '<td class="jky-td-barcode"	>' + the_row.barcode+ '</td>'
		+ '<td class="jky-td-status"	>' + JKY.t(the_row.status) + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-pieces-number-of-pieces"					onchange="JKY.update_pieces(this, ' + my_id + ')" value="' +				 the_row.number_of_pieces	 + '"						/></td>'
		+ '<td class="jky-td-name-s"	><input class="jky-pieces-produced-by"			text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' +				 the_row.produced_by		 + '"						/></td>'
		+ '<td class="jky-td-weight"	><input class="jky-pieces-checkin-weight"		text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.out_float	(the_row.checkin_weight		)+ '"						/></td>'
		+ '<td class="jky-td-date"		><input class="jky-pieces-checkin-date"						onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.short_date	(the_row.checkin_at			)+ '" disabled	/></td>'
		+ '<td class="jky-td-text-w"	><input class="jky-pieces-remarks"				text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.fix_null	(the_row.remarks			)+ '" disabled	/></td>'
		+ '</tr>'
		;
	return my_html;
}
JKY.update_pieces = function(id_name, the_id ) {
	var my_saved_requested = parseFloat(JKY.get_value_by_id('Pieces', 'requested_weight', the_id));

	var my_tr = $(id_name).parent().parent();
	var my_pieces_id		=					 my_tr.find('.jky-pieces-id'				).val() ;
	var my_batchin_id		=					 my_tr.find('.jky-batchin-id'				).val() ;
	var my_needed_at		= JKY.inp_date_value(my_tr.find('.jky-pieces-needed-date'		).val());
	var my_requested_weight	= parseFloat		(my_tr.find('.jky-pieces-requested-weight'	).val());

	var my_set = ''
		+         'pieces_id = ' + my_pieces_id
		+       ', needed_at = ' + my_needed_at
		+', requested_weight = ' + my_requested_weight
		;
	if (!isNaN(my_batchin_id)) {
		my_set += ', batchin_id = ' + my_batchin_id
	}
	var my_data =
		{ method	: 'update'
		, table		: 'Pieces'
		, set		:  my_set
		, where		: 'Pieces.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_pieces_success);

//	JKY.Order.add_requested(my_requested_weight - my_saved_requested);
}

JKY.update_pieces_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.update_pieces_weight();
}

JKY.insert_pieces = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Pieces'
		, set		: 'Pieces.order_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_pieces_success);
}

JKY.insert_pieces_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.order_number		= response.id;
	my_row.pieces_id		= null;
	my_row.pieces_name		= '';
	my_row.batchin_id		= null;
	my_row.batchin_code		= '';
	my_row.needed_at		= null;
	my_row.checkout_at		= null;
	my_row.requested_weight	=  0;
	my_row.checkout_weight	=  0;

	var my_html = JKY.generate_piece(my_row);
	JKY.append_html('jky-pieces-body', my_html);
	var my_tr_id = $('#jky-pieces-body tr[order_pieces_id="' + response.id + '"]');
	my_tr_id.find('.jky-pieces-requested-weight').focus().select();
}

JKY.delete_pieces = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Pieces'
		, where		: 'Pieces.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_pieces_success);
}

JKY.delete_pieces_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.update_pieces_weight();
}

JKY.update_pieces_weight = function() {
	JKY.set_html('jky-pieces-total-requested', JKY.Order.get_requested());
	JKY.set_html('jky-pieces-total-checkout' , JKY.Order.get_checkout ());
//	JKY.Order.update_requested_weight(JKY.row.id);
}

JKY.print_pieces = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method		: 'get_index'
		, table			: 'Pieces'
		, specific		: 'order'
		, specific_id	:  the_id
		, select		: 'All'
		, order_by		: 'Pieces.id'
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
