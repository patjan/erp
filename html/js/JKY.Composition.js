"use strict";

/**
 * JKY.Composition
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-composition-id'  ).val(the_id );
 *		$(my_parent).find('.jky-composition-name').val(my_name);
 */
JKY.Composition = function() {
	var my_data			= null;
	var my_the_id		= null;		//	external id that initiated the call
	var my_filter		= 'jky-composition-filter';
	var my_search_body	= 'jky-composition-search-body';
	var my_layer		= 'jky-composition-search';

	function my_display(the_id) {
		if (typeof the_id != 'undefined') {
			my_the_id = the_id;
		}
		var my_filter_text = JKY.get_value(my_filter).toLowerCase();
		var my_html = '';
		for(var i=0, max=my_data.length; i<max; i++) {
			var my_row = my_data[i];
			if (my_filter_text == ''
			||  my_row.name.indexOf(my_filter_text) >= 0) {
				my_html += '<tr onclick="JKY.Composition.click_row(this)">'
						+  '<td class="jky-search-composition-name"	>' + my_row.name	+ '</td>'
						+  '<td class="jky-search-count"			>' + my_row.count	+ '</td>'
						+  '</tr>'
						;
			}
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
		JKY.set_focus(my_filter);
	}

	function my_click_row(the_index) {
		var my_name = $(the_index).find('.jky-search-composition-name').html();
		var my_parent = $(my_the_id).parent();
		$(my_parent).find('.jky-composition-name').val(my_name);
		$(my_parent).find('.jky-composition-name').change();		//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	$(function() {
		my_data = JKY.get_configs('Compositions');//	JKY.loads = JKY.load_ids(JKY.row.id);
		var my_request =
			{ method	: 'get_index'
			, table		: 'Compositions'
			, order_by  : 'FTPs.composition'
			};
		JKY.ajax(false, my_request, function(the_response) {
			my_data = the_response.rows;
			for(var i=0, max=my_data.length; i<max; i++) {
				my_data[i].name = my_data[i].name.toLowerCase();
			}
		});
	});

	return {
		  display			:	function(the_id)			{		my_display(the_id);}
		, click_row			:	function(the_index)			{		my_click_row(the_index);}
		, add_new			:	function()					{		my_add_new();}
	};
}();