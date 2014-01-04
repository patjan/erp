/*
 * display Boxes -------------------------------------------------------------
 */

JKY.display_boxes = function() {
//	JKY.loads = JKY.load_ids(JKY.row.id);
	var my_data =
		{ method	: 'get_index'
		, table		: 'CheckinLocations'
		, select	:  JKY.row.batchin_id
		, order_by  : 'location'
		};
	JKY.ajax(false, my_data, JKY.generate_boxes);
}

JKY.generate_boxes = function(response) {
	var my_boxes_requested = parseInt(JKY.row.requested_boxes) - parseInt(JKY.row.checkout_boxes);
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			var my_boxes_checkin   = parseInt(my_row.total_boxes);
			var my_boxes_reserved  = 0;
/*
			if (my_boxes_requested > my_boxes_checkin) {
				my_boxes_reserved  = my_boxes_checkin;
			}else{
				my_boxes_reserved  = my_boxes_requested;
			}
*/
			my_boxes_requested -= my_boxes_reserved;

			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-td-action"	></td>'
				+ '<td class="jky-td-location"	><input class="jky-checkin-location"	value="' +				my_row.location		+ '" disabled	/></td>'
				+ '<td class="jky-td-date"		><input class="jky-checkin-date"		value="' + JKY.out_date(my_row.checkin_at)	+ '" disabled	/></td>'
				+ '<td class="jky-td-weight"	><input class="jky-checkin-weight"		value="' +				my_row.total_weight	+ '" disabled	/></td>'
				+ '<td class="jky-td-boxes"		><input class="jky-checkin-boxes"		value="' +				my_boxes_checkin	+ '" disabled	/></td>'
				+ '<td class="jky-td-boxes"		><input class="jky-reserved-boxes"		value="' +				my_boxes_reserved	+ '" onchange="JKY.update_boxes(this)"	/></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-boxes-body', my_html);
	$('.jky-reserved-boxes').ForceIntegerOnly();
	if (my_rows == '') {
//		JKY.insert_load();
	}
}

JKY.update_boxes = function(the_id) {
	var my_reserved_boxes = 0;
	var my_trs = $('#jky-boxes-body tr');
	for(var i=0, max=my_trs.length; i<max; i++) {
		var my_tr = my_trs[i];
		my_reserved_boxes += parseInt($(my_tr).find('.jky-reserved-boxes').val());
	}
	JKY.set_value('jky-reserved-boxes', my_reserved_boxes);
}