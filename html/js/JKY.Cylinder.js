"use strict";

/**
 * JKY.Cylinder - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-cylinder-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-cylinder-row-name').val(my_name);
 */
JKY.Cylinder = function() {
	var my_data			= null;
	var my_the_id		= null;		//	external id that initiated the call
	var my_order_by		= 'name';
	var my_filter		= 'jky-cylinder-filter';
	var my_search_body	= 'jky-cylinder-search-body';
	var my_layer		= 'jky-cylinder-search';

	function my_display(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		my_display_data()
	}

	function my_display_data() {
		var my_html = '';
		for(var i=0, max=my_data.length; i<max; i++) {
			var my_row = my_data[i];
			my_html += '<tr onclick="JKY.Cylinder.click_row(this)">'
					+  '<td class="jky-cylinder-search-name">' + my_row.name + '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index) {
		var my_name = $(the_index).find('.jky-cylinder-search-name').html();
		var my_parent = $(my_the_id).parent();
		$(my_parent).find('.jky-cylinder-row-name').val(my_name);
		$(my_parent).find('.jky-cylinder-row-name').change();		//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	$(function() {
		my_data = JKY.get_configs('Cylinders');
	});

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, click_row		: function(the_index)			{		my_click_row(the_index);}
		, add_new		: function()					{		my_add_new();}
	};
}();