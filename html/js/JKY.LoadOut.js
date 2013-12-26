"use strict";

/**
 * JKY.LoadOut - process all changes during one transaction
 */
JKY.LoadOut = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_dyer_id		= null;		//	external id that initiated the call
	var my_order_by		= 'LoadOuts.loadout_number';
	var my_filter		= 'jky-loadout-filter';
	var my_search_body	= 'jky-loadout-search-body';
	var my_layer		= 'jky-loadout-search';

	var my_quantity		= 0;
	var my_gross_weight	= 0;
	var my_net_weight	= 0;

	function my_display(the_id, the_dyer_id, the_dyer_name) {
		my_the_id	= the_id;
		my_dyer_id	= the_dyer_id;
		JKY.set_html('jky-search-dyer-name', the_dyer_name);
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'LoadOuts'
			, specific		: 'dyer'
			, specific_id	:  my_dyer_id
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
			my_html += '<tr onclick="JKY.LoadOut.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-loadout-number"	>' +				 my_row.loadout_number		+ '</td>'
					+  '<td class="jky-search-color-name"		>' + JKY.fix_null	(my_row.color_name		)	+ '</td>'
					+  '<td class="jky-search-requested-date"	>' + JKY.short_date	(my_row.requested_at	)	+ '</td>'
					+  '<td class="jky-search-requested-pieces"	>' +				 my_row.requested_pieces	+ '</td>'
					+  '<td class="jky-search-checkout-pieces"	>' +				 my_row.checkout_pieces		+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'shipdyer_id =' + JKY.row.id
			};
		JKY.ajax(true, my_data);

		var my_loadout = JKY.get_row('LoadOuts', the_id);
		var my_html = JKY.generate_loadout(my_loadout);
		JKY.append_html('jky-loadouts-body', my_html);




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
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'sold_weight =' + my_sold
			};
		JKY.ajax(true, my_data);
	}

	function my_update_checkout_weight(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'checkout_weight =' + my_checkout
			};
		JKY.ajax(true, my_data);
	}

	$(function() {
	});

	return {
		  display		: function(the_id, the_dyer_id, the_dyer_name)	{my_display(the_id, the_dyer_id, the_dyer_name);}
		, load_data		: function()					{my_load_data();}
		, click_row		: function(the_index, the_id)	{my_click_row(the_index, the_id);}
		, add_new		: function()					{my_add_new();}

		, set_dyer_id	: function(the_dyer_id)			{my_dyer_id		= the_dyer_id;}
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