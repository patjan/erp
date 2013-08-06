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
 * 		$(my_parent).find('.jky-batchin-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-batchin-row-name').val(my_name);
 */
JKY.BatchIn = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_thread_id	= null;		//	external id that initiated the call
	var my_order_by		= 'batch';
	var my_filter		= 'jky-batchin-filter';
	var my_search_body	= 'jky-batchin-search-body';
	var my_layer		= 'jky-batchin-search';

	function my_display(the_id) {
		my_the_id = the_id;
		my_thread_id = $(the_id).parent().parent().find('.jky-thread-row-id').val();
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'Batches'
			, specific		: 'thread'
			, specific_id	:  my_thread_id
			, filter		:  JKY.get_value(my_filter)
			, display		: '10'
			, order_by		:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			var my_balance  = parseFloat(my_row.checkin_weight)
							+ parseFloat(my_row.returned_weight)
							- parseFloat(my_row.checkout_weight)
							;
			my_html += '<tr onclick="JKY.BatchIn.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-batchin-search-batch"		>' + my_row.batch			+ '</td>'
					+  '<td class="jky-batchin-search-created-date"	>' + JKY.short_date(my_row.created_at) + '</td>'
					+  '<td class="jky-batchin-search-balance"		>' + my_balance				+ '</td>'
					+  '<td class="jky-batchin-search-checkin"		>' + my_row.checkin_weight	+ '</td>'
					+  '<td class="jky-batchin-search-returned"		>' + my_row.returned_weight	+ '</td>'
					+  '<td class="jky-batchin-search-checkout"		>' + my_row.checkout_weight	+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index, the_id) {
		var my_batch = $(the_index).find('.jky-batchin-search-batch').html();
		var my_parent = $(my_the_id).parent();
		$(my_parent).find('.jky-batchin-row-id'  ).val(the_id );
		$(my_parent).find('.jky-batchin-row-batch').val(my_batch);
		$(my_parent).find('.jky-batchin-row-batch').click();
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