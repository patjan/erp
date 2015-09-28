/*
 * display Load Checkout --------------------------------------------------------
 */

JKY.display_checkouts = function(the_row) {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Pieces'
		, specific		: 'loadout'
		, specific_id	:  JKY.row.loadout_id
		, select		: 'Check Out'
		, order_by		: 'Pieces.number_of_pieces DESC'
		};
	JKY.ajax(false, my_data, JKY.generate_checkouts);
}

JKY.generate_checkouts = function(response) {
	var my_html	= '';
	var my_rows	= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			if (my_row.product_name == JKY.row.product_name) {
				my_html += JKY.generate_checkout(my_row);
			}
		}
	}
	JKY.set_html('jky-checkouts-body', my_html );
}

JKY.generate_checkout = function(the_row) {
	var my_id = the_row.id;
	var my_trash = '';

	var my_html = ''
		+ '<tr order_pieces_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash		+ '</td>'
		+ '<td class="jky-td-barcode"	>' + the_row.barcode+ '</td>'
		+ '<td class="jky-td-status"	>' + JKY.t(the_row.status) + '</td>'
		+ '<td class="jky-td-pieces"	><input class="jky-pieces-number-of-pieces"					onchange="JKY.update_pieces(this, ' + my_id + ')" value="' +				 the_row.number_of_pieces	 + '"						/></td>'
		+ '<td class="jky-td-name-s"	><input class="jky-pieces-produced-by"			text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' +				 the_row.produced_by		 + '"						/></td>'
		+ '<td class="jky-td-weight"	><input class="jky-pieces-checkin-weight"		text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.out_float	(the_row.checkin_weight		)+ '"						/></td>'
		+ '<td class="jky-td-shift"		><input class="jky-pieces-checkin-date"						onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.out_shift	(the_row.checkin_at			)+ '" disabled	/></td>'
		+ '<td class="jky-td-text-w"	><input class="jky-pieces-qualities"			text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.decode		(the_row.qualities			)+ '" disabled	/></td>'
		+ '<td class="jky-td-text-w"	><input class="jky-pieces-remarks"				text="text"	onchange="JKY.update_pieces(this, ' + my_id + ')" value="' + JKY.decode		(the_row.remarks			)+ '" disabled	/></td>'
		+ '</tr>'
		;
	return my_html;
}
