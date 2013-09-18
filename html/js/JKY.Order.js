"use strict";

/**
 * JKY.Order - process all changes during one transaction
 */
JKY.Order = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_thread_id	= null;		//	external id that initiated the call
	var my_order_by		= 'order_number';
	var my_filter		= 'jky-order-filter';
	var my_search_body	= 'jky-order-search-body';
	var my_layer		= 'jky-order-search';

	var my_ordered		= 0;
	var my_checkout		= 0;

	function my_display(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'Orders'
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
			my_html += '<tr onclick="JKY.Order.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-order-number"		>' +				 my_row.order_number	+ '</td>'
					+  '<td class="jky-search-customer-name"	>' +				 my_row.customer_name	+ '</td>'
					+  '<td class="jky-search-product-name"		>' +				 my_row.product_name	+ '</td>'
					+  '<td class="jky-search-ordered-date"		>' + JKY.short_date	(my_row.ordered_at	  ) + '</td>'
					+  '<td class="jky-search-ordered-pieces"	>' +				 my_row.ordered_pieces	+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_number = $(the_index).find('.jky-search-order-number').html();
		var my_parent = $(my_the_id).parent();

		var my_dom_id = $(my_parent).find('#jky-order-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('.jky-order-row-id');
		}
		my_dom_id.val(the_id );

		var my_dom_number = $(my_parent).find('#jky-order-number');
		if (my_dom_number.length == 0) {
			my_dom_number = $(my_parent).find('.jky-order-row-number');
		}
		my_dom_number.val(my_number);
		my_dom_number.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	function my_add_ordered(the_weight) {
		if (the_weight != null) {
			my_ordered += parseFloat(the_weight);
			my_ordered  = Math.round(my_ordered);
		}
	}

	function my_add_checkout(the_weight) {
		if (the_weight != null) {
			my_checkout += parseFloat(the_weight);
			my_checkout  = Math.round(my_checkout * 100) / 100
		}
	}

	function my_update_ordered_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, where		: 'id =' + the_id
			, set		: 'ordered_weight =' + my_ordered
			};
		JKY.ajax(true, my_data);
	}

	function my_update_checkout_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, where		: 'id =' + the_id
			, set		: 'checkout_weight =' + my_checkout
			};
		JKY.ajax(true, my_data);
	}

	$(function() {
	});

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}

		, set_ordered	: function(the_amount)	{my_ordered   = the_amount;}
		, set_checkout	: function(the_amount)	{my_checkout  = the_amount;}

		, add_ordered	: function(the_weight)	{my_add_ordered (the_weight);}
		, add_checkout	: function(the_weight)	{my_add_checkout(the_weight);}

		, get_ordered	: function()			{return my_ordered ;}
		, get_checkout	: function()			{return my_checkout;}

		, update_ordered_weight  : function(the_id)		{my_update_ordered_weight (the_id);}
		, update_checkout_weight : function(the_id)		{my_update_checkout_weight(the_id);}
	};
}();