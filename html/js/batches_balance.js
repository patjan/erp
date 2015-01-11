/*
 * display Balance -------------------------------------------------------------
 */

var my_thread_id			= 0;
var my_old_checkin_weight	= 0;
var my_old_unit_price		= 0;
var my_new_checkin_weight	= 0;
var my_new_unit_price		= 0;
var my_row_batch			= null;

JKY.display_balance = function() {
	my_thread_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'BatchesBalance'
		, specific		: 'thread'
		, specific_id	:  my_thread_id
		, select		: 'All'
		, order_by		: 'invoice_date, batch, checkin_location'
		};
	JKY.ajax(false, my_data, JKY.generate_batches);
}

JKY.generate_batches = function(response) {
	var my_rows	= response.rows;
	var my_html = '';
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_batch(my_row);
		}
	}
	JKY.set_html('jky-balance-body', my_html);
}

JKY.generate_batch = function(the_row) {
	var my_html = '<tr>'
				+ '<td class="jky-td-batch"		>' + the_row.batch				+ '</td>'
				+ '<td class="jky-td-date"		>' + JKY.short_date(the_row.invoice_date) + '</td>'
				+ '<td class="jky-td-boxes"		>' + the_row.balance_boxes		+ '</td>'
				+ '<td class="jky-td-weight"	>' + the_row.balance_weight		+ '</td>'
				+ '<td class="jky-td-weight"	>' + the_row.checkin_weight		+ '</td>'
				+ '<td class="jky-td-location"	>' + the_row.checkin_location	+ '</td>'
				+ '<td class="jky-td-name-s"	>' + the_row.supplier_name		+ '</td>'
				+ '</tr>'
				;
	return my_html;
}