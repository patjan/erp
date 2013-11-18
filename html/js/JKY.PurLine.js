"use strict";

/**
 * JKY.PurLine - process all changes during one transaction
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-purline-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-purline-row-name').val(my_name);
 */
JKY.PurLine = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_supplier_id	= null;		//	the current supplier id
	var my_order_by		= 'expected_date DESC';
	var my_filter		= 'jky-purline-filter';
	var my_search_body	= 'jky-purline-search-body';
	var my_layer		= 'jky-purline-search';

	function my_display(the_id, the_supplier_id) {
		var my_tr = $(the_id).parent().parent();
		var my_received_weight = parseFloat($(my_tr).find('.jky-received-weight').val());
		if (my_received_weight != 0) {
			JKY.display_message(JKY.t('To change Purchase Number, <br>the Received Weight must be set to zero'));
			return;
		}
		my_the_id = the_id;
		my_supplier_id = the_supplier_id;
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'PurchaseLines'
			, specific		: 'supplier'
			, specific_id	:  my_supplier_id
			, select		: 'All'
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
			my_html += '<tr onclick="JKY.PurLine.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-purline-search-purchase-number"	>' + my_row.purchase_number	+ '</td>'
					+  '<td class="jky-purline-search-thread-name"		>' + my_row.thread_name		+ '</td>'
					+  '<td class="jky-purline-search-expected-date"	>' + my_row.expected_date	+ '</td>'
					+  '<td class="jky-purline-search-expected-weight"	>' + my_row.expected_weight	+ '</td>'
					+  '<td class="jky-purline-search-received-weight"	>' + my_row.received_weight	+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_number = $(the_index).find('.jky-purline-search-purchase-number').html();
		var my_parent = $(my_the_id).parent();
		$(my_parent).find('.jky-purline-row-id'    ).val(the_id	  );
		$(my_parent).find('.jky-purline-row-number').val(my_number);
		$(my_parent).find('.jky-purline-row-number').change();		//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	return {
		  display		: function(the_id, the_supplier_id)		{		my_display(the_id, the_supplier_id);}
		, load_data		: function()							{		my_load_data();}
		, click_row		: function(the_index, the_id)			{		my_click_row(the_index, the_id);}
		, add_new		: function()							{		my_add_new();}
	};
}();