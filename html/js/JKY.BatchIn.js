"use strict";

/**
 * JKY.BatchIn - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-batchin-id'  ).val(the_id );
 *		$(my_parent).find('.jky-batchin-number').val(my_number);
 */
JKY.BatchIn = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_thread_id	= null;		//	external id that initiated the call
	var my_order_by		= 'invoice_date, checkin_location';
	var my_filter		= 'jky-batchin-filter';
	var my_search_body	= 'jky-batchin-search-body';
	var my_layer		= 'jky-batchin-search';

	function my_display(the_id) {
		my_the_id = the_id;
		var my_dom_id = $('#jky-thread-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(the_id).parent().parent().find('.jky-thread-id');
		}
		my_thread_id = my_dom_id.val();
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		if (my_thread_id) {
			var my_data =
				{ method		: 'get_index'
				, table			: 'BatchesBalance'
				, specific		: 'thread'
				, specific_id	:  my_thread_id
				, select		: 'All'
				, filter		:  JKY.get_value(my_filter)
//				, display		: '10'
				, order_by		:  my_order_by
				};
			JKY.ajax(false, my_data, my_load_data_success);
		}
	}

	function my_load_data_success(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
/*
			var my_boxes	= parseInt(my_row.checkin_boxes)
							+ parseInt(my_row.returned_boxes)
							- parseInt(my_row.checkout_boxes)
							;
			var my_balance  = parseFloat(my_row.checkin_weight)
							+ parseFloat(my_row.returned_weight)
							- parseFloat(my_row.checkout_weight)
							;
			my_balance = Math.round(my_balance * 100) / 100;
*/
//			display only batches with balance
//	balance > 0 is moved to backend selection
//			if (my_balance > 0 ) {
				my_html += '<tr onclick="JKY.BatchIn.click_row(this, ' + my_row.id + ')">'
						+  '<td class="jky-search-batch"		>' + my_row.batch			+ '</td>'
//						+  '<td class="jky-search-date"			>' + JKY.short_date(my_row.updated_at) + '</td>'
						+  '<td class="jky-search-date"			>' + JKY.short_date(my_row.invoice_date) + '</td>'
						+  '<td class="jky-search-boxes"		>' + my_row.balance_boxes	+ '</td>'
						+  '<td class="jky-search-weight"		>' + my_row.balance_weight	+ '</td>'
						+  '<td class="jky-search-weight"		>' + my_row.checkin_weight	+ '</td>'
//						+  '<td class="jky-search-weight"		>' + my_row.returned_weight	+ '</td>'
//						+  '<td class="jky-search-weight"		>' + my_row.checkout_weight	+ '</td>'
						+  '<td class="jky-search-location"		>' + my_row.checkin_location+ '</td>'
						+  '<td class="jky-search-supplier-name">' + my_row.supplier_name	+ '</td>'
						+  '</tr>'
						;
//			}
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_batch = $(the_index).find('.jky-search-batch').html();
		var my_parent = $(my_the_id).parent();

		var my_dom_id = $('#jky-batchin-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('.jky-batchin-id');
		}
		my_dom_id.val(the_id );

		var my_dom_number = $('#jky-batchin-number');
		if (my_dom_number.length == 0) {
			my_dom_number = $(my_parent).find('.jky-batchin-number');
		}
		my_dom_number.val(my_batch );
		my_dom_number.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}
	};
}();