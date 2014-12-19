"use strict";

/**
 * JKY.Quotation - process all changes during one transaction
 */
JKY.Quotation = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_color_id		= null;		//	external id that initiated the call
	var my_order_by		= 'Quotation.quotation_number';
	var my_filter		= 'jky-quotation-filter';
	var my_search_body	= 'jky-quotation-search-body';
	var my_layer		= 'jky-quotation-search';

	var my_sold			= 0;
	var my_checkout		= 0;

	function my_display(the_id, the_color_id, the_color_name) {
		my_the_id	= the_id;
		my_color_id	= the_color_id;
		JKY.set_html('jky-search-color-name', the_color_name);
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'QuotUnloadeds'
			, specific		: 'color'
			, specific_id	:  my_color_id
			, select		: 'All'
			, filter		:  JKY.get_value(my_filter)
			, display		: '99'
			, order_by		:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			var my_quoted_pieces;
			var my_quoted_weight;
			if (my_row.units == 0) {
				my_quoted_pieces = Math.ceil(my_row.quoted_units/my_row.peso);
				my_quoted_weight = my_row.quoted_units;
			}else{
				my_quoted_pieces = my_row.quoted_units / my_row.units;
				my_quoted_weight = my_row.quoted_units * my_row.peso;
			}
			var my_assigned_pieces = my_row.assigned_pieces ? parseFloat(my_row.assigned_pieces) : 0;
			var my_assigned_weight = my_row.assigned_weight ? parseFloat(my_row.assigned_weight) : 0;

			var my_delta_pieces = my_quoted_pieces - my_assigned_pieces;
			var my_delta_weight = my_quoted_weight - my_assigned_weight;

			var my_color_pieces = 'black';
			var my_color_weight = 'black';

				 if (my_assigned_pieces == 0					 )	my_color_pieces = 'green';
			else if (my_quoted_pieces	==     my_assigned_pieces)	my_color_pieces = 'red'  ;
			else	 my_quoted_pieces += '/' + my_assigned_pieces;

				 if (my_assigned_weight == 0					 )	my_color_weight = 'green';
			else if (my_quoted_weight	==	   my_assigned_weight)	my_color_weight = 'red'  ;
			else	 my_quoted_weight += '/' + my_assigned_weight;

			my_html += '<tr onclick="JKY.Quotation.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-quotation-number"	>' + my_row.quotation_number+ '</td>'
					+  '<td class="jky-search-product-name"		>' + my_row.product_name	+ '</td>'
					+  '<td class="jky-search-customer-name"	>' + my_row.customer_name	+ '</td>'
					+  '<td class="jky-search-composition"		>' + my_row.composition		+ '</td>'
					+  '<td class="jky-search-quoted-date"		>' + JKY.short_date(my_row.quoted_at) + '</td>'
					+  '<td class="jky-search-quoted-pieces"	><span class="jky-search-delta-pieces">' + my_delta_pieces + '</span><span style="color:' + my_color_pieces + '">' + my_quoted_pieces + '</span></td>'
					+  '<td class="jky-search-quoted-weight"	><span class="jky-search-delta-weight">' + my_delta_weight + '</span><span style="color:' + my_color_weight + '">' + my_quoted_weight + '</span></td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_quotation_number	= $(the_index).find('.jky-search-quotation-number'	).html();
		var my_product_name		= $(the_index).find('.jky-search-product-name'		).html();
		var my_customer_id		= $(the_index).find('.jky-search-customer-id'		).html();
		var my_customer_name	= $(the_index).find('.jky-search-customer-name'		).html();
		var my_delta_pieces		= $(the_index).find('.jky-search-delta-pieces'		).html();
		var my_delta_weight		= $(the_index).find('.jky-search-delta-weight'		).html();
		var my_parent = $(my_the_id).parent().parent();

		var my_dom_id = $(my_parent).find('#jky-quot-color-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('.jky-quot-color-id');
		}
		my_dom_id.val(the_id);

		var my_dom_number = $(my_parent).find('#jky-quotation-number');
		if (my_dom_number.length == 0) {
			my_dom_number = $(my_parent).find('.jky-quotation-number');
		}
		my_dom_number.val(my_quotation_number);

		var my_dom_product = $(my_parent).find('#jky-product-name');
		if (my_dom_product.length == 0) {
			my_dom_product = $(my_parent).find('.jky-product-name');
		}
		my_dom_product.val(my_product_name);

		var my_dom_customer = $(my_parent).find('#jky-customer-name');
		if (my_dom_customer.length == 0) {
			my_dom_customer = $(my_parent).find('.jky-customer-name');
		}
		my_dom_customer.val(my_customer_name);

		var my_dom_quoted_pieces = $(my_parent).find('#jky-quoted-pieces');
		if (my_dom_quoted_pieces.length == 0) {
			my_dom_quoted_pieces = $(my_parent).find('.jky-quoted-pieces');
		}
		my_dom_quoted_pieces.val(my_delta_pieces);

		var my_dom_quoted_weight = $(my_parent).find('#jky-quoted-weight');
		if (my_dom_quoted_weight.length == 0) {
			my_dom_quoted_weight = $(my_parent).find('.jky-quoted-weight');
		}
		my_dom_quoted_weight.val(my_delta_weight);

		my_dom_number.change();		//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	function my_add_sold(the_weight) {
		if (the_weight != null) {
			my_sold += parseFloat(the_weight);
			my_sold  = Math.round(my_sold * 100) / 100;
		}
	}

	function my_add_checkout(the_weight) {
		if (the_weight != null) {
			my_checkout += parseFloat(the_weight);
			my_checkout  = Math.round(my_checkout * 100) / 100
		}
	}

	function my_update_sold_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadQuotations'
			, where		: 'id =' + the_id
			, set		: 'sold_weight =' + my_sold
			};
		JKY.ajax(true, my_data);
	}

	function my_update_checkout_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'Quotations'
			, where		: 'id =' + the_id
			, set		: 'checkout_weight =' + my_checkout
			};
		JKY.ajax(true, my_data);
	}

	$(function() {
	});

	return {
		  display		: function(the_id, the_color_id, the_color_name)	{my_display(the_id, the_color_id, the_color_name);}
		, load_data		: function()					{my_load_data();}
		, click_row		: function(the_index, the_id)	{my_click_row(the_index, the_id);}
		, add_new		: function()					{my_add_new();}

		, set_color_id	: function(the_color_id)		{my_color_id	= the_color_id;}
		, set_sold		: function(the_amount)			{my_sold		= the_amount;}
		, set_checkout	: function(the_amount)			{my_checkout	= the_amount;}

		, add_sold		: function(the_weight)			{my_add_sold	(the_weight);}
		, add_checkout	: function(the_weight)			{my_add_checkout(the_weight);}

		, get_sold		: function()			{return my_sold		;}
		, get_checkout	: function()			{return my_checkout	;}

		, update_sold_weight	: function(the_id)		{my_update_sold_weight		(the_id);}
		, update_checkout_weight: function(the_id)		{my_update_checkout_weight	(the_id);}
	};
}();