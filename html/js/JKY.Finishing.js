"use strict";

/**
 * JKY.Finishing - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 *		$(my_parent).find('.jky-finishing-name').val(my_name);
 */
JKY.Finishing = function() {
	var my_data			= null;
	var my_the_id		= null;		//	external id that initiated the call
	var my_order_by		= 'name';
	var my_filter		= 'jky-finishing-filter';
	var my_search_body	= 'jky-finishing-search-body';
	var my_layer		= 'jky-finishing-search';

	function my_display(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		my_display_data()
	}

	function my_display_data() {
		var my_html = '';
		for(var i=0, max=my_data.length; i<max; i++) {
			var my_row = my_data[i];
			my_html += '<tr onclick="JKY.Finishing.click_row(this)">'
					+  '<td class="jky-search-finishing-name">' + my_row.name + '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index) {
		var my_name = $(the_index).find('.jky-search-finishing-name').html();

		var my_dom_name = $('#jky-finishing');
		if (my_dom_name.length == 0) {
			my_dom_name = $(my_parent).find('.jky-finishing');
		}
		my_dom_name.val(my_name);
		my_dom_name.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	$(function() {
		my_data = JKY.get_configs('Finishing Types');
		JKY.append_file('jky-load-finishing', '../JKY.Search.Finishing.html');
	});

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, click_row		: function(the_index)			{		my_click_row(the_index);}
		, add_new		: function()					{		my_add_new();}
	};
}();