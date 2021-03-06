"use strict";
var JKY = JKY || {};
/**
 * JKY.ColorUnloaded - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-color-id'  ).val(the_id );
 *		$(my_parent).find('.jky-color-name').val(my_name);
 */
JKY.ColorUnloaded = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_the_type		= null;		//	selected color type: Punho, Gola, Galao
	var my_order_by		= 'Color.color_name';
	var my_filter		= 'jky-color-un-filter';
	var my_search_body	= 'jky-color-un-search-body';
	var my_layer		= 'jky-color-un-search';

	var my_display = function(the_id, the_type) {
		my_the_id = the_id;
		if (typeof the_type	== 'undefined') {
			my_the_type	= 'All';
		}else{
			my_the_type	= the_type;
		}
		JKY.set_focus(my_filter);
		my_load_data();
	}

	var my_load_data = function() {
		var my_data =
			{ method	: 'get_index'
			, table		: 'ColorUnloadeds'
			, select	:  my_the_type
			, filter	:  JKY.get_value(my_filter)
//			, display	: '10'
			, order_by	:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	var my_load_data_success = function(response) {
		var my_rows	= response.rows;
		var my_color_name = '';
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			var my_quoted_weight;
			if (my_row.units == 0) {
				my_quoted_weight = my_row.quoted_units;
			}else{
				my_quoted_weight = my_row.quoted_units * my_row.peso;
			}
			var my_assigned_weight = my_row.assigned_weight ? parseFloat(my_row.assigned_weight) : 0;
			if (my_quoted_weight > my_assigned_weight) {
				if (my_color_name != my_row.color_name) {
					my_color_name  = my_row.color_name
					my_html += '<tr onclick="JKY.ColorUnloaded.click_row(this, ' + my_row.color_id + ')">'
							+  '<td class="jky-search-color-name"	>' + my_row.color_name	+ '</td>'
							+  '<td class="jky-search-color-type"	>' + my_row.color_type	+ '</td>'
							+  '</tr>'
							;
				}
			}
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	var my_click_row = function(the_index, the_id) {
		var my_type = $(the_index).find('.jky-search-color-type').html();
		var my_name = $(the_index).find('.jky-search-color-name').html();
		var my_parent = $(my_the_id).parent();

//		var my_dom_id = $(my_parent).find('#jky-color-id');
		var my_dom_id = $('#jky-color-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('.jky-color-id');
		}
		my_dom_id.val(the_id );

		var my_dom_type = $('#jky-color-type');
		if (my_dom_type.length == 0) {
			my_dom_type = $(my_parent).find('.jky-color-type');
		}
		my_dom_type.val(my_type);

//		var my_dom_name = $(my_parent).find('#jky-color-name');
		var my_dom_name = $('#jky-color-name');
		if (my_dom_name.length == 0) {
			my_dom_name = $(my_parent).find('.jky-color-name');
		}
		my_dom_name.val(my_name);
		my_dom_name.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	var my_add_new = function() {
		JKY.display_message('add_new');
	}

	return {
		  display		: function(the_id, the_type)	{		my_display(the_id, the_type);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}
	};
}();