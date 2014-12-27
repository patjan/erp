/*
 * display Pieces --------------------------------------------------------------
 */

JKY.display_pieces = function() {
/*
SELECT Pieces.checkin_location	AS location
	 , MIN(Pieces.checkin_at)		AS checkin_at
	 , COUNT(*)						AS total_pieces
	 , SUM(Pieces.checkin_weight)	AS total_weight
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Pieces.status = "Check In"
   AND Orders.product_id = 101200
 GROUP BY Pieces.checkin_location
 ORDER BY Pieces.checkin_location
*/
//	JKY.loads = JKY.load_ids(JKY.row.id);
	var my_data =
		{ method	: 'get_index'
		, table		: 'PieceLocations'
		, select	:  JKY.row.product_id
		, order_by  : 'location'
		};
	JKY.ajax(false, my_data, JKY.generate_pieces);
}

JKY.generate_pieces = function(response) {
	var my_pieces_requested = parseInt(JKY.row.requested_pieces) - parseInt(JKY.row.checkout_pieces);
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			var my_pieces_checkin   = parseInt(my_row.total_pieces);
			var my_pieces_reserved  = 0;
/*
			if (my_pieces_requested > my_pieces_checkin) {
				my_pieces_reserved  = my_pieces_checkin;
			}else{
				my_pieces_reserved  = my_pieces_requested;
			}
*/
			my_pieces_requested -= my_pieces_reserved;

			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-td-action"	></td>'
				+ '<td class="jky-td-short"		><input class="jky-checkin-location"	value="' +				my_row.location		+ '" disabled	/></td>'
				+ '<td class="jky-td-date"		><input class="jky-checkin-date"		value="' + JKY.out_date(my_row.checkin_at)	+ '" disabled	/></td>'
				+ '<td class="jky-td-weight"	><input class="jky-checkin-weight"		value="' +				my_row.total_weight	+ '" disabled	/></td>'
				+ '<td class="jky-td-pieces"	><input class="jky-checkin-pieces"		value="' +				my_pieces_checkin	+ '" disabled	/></td>'
				+ '<td class="jky-td-pieces"	><input class="jky-reserved-pieces"		value="' +				my_pieces_reserved	+ '" onchange="JKY.update_pieces(this)"	/></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-pieces-body', my_html);
	$('.jky-reserved-pieces').ForceIntegerOnly();
	if (my_rows == '') {
//		JKY.insert_load();
	}

	if (JKY.row.status == 'Closed') {
		$('#jky-pieces-body input[changeable]').prop('disabled', true );
	}else{
		$('#jky-pieces-body input[changeable]').prop('disabled', false);
	}
}

JKY.update_pieces = function(the_id) {
	var my_reserved_pieces = 0;
	var my_trs = $('#jky-pieces-body tr');
	for(var i=0, max=my_trs.length; i<max; i++) {
		var my_tr = my_trs[i];
		my_reserved_pieces += parseInt($(my_tr).find('.jky-reserved-pieces').val());
	}
	JKY.set_value('jky-reserved-pieces', my_reserved_pieces);
}

