"use strict";

/**
 * JKY.Thread - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-thread-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-thread-row-name').val(my_name);
 */
JKY.Thread = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_order_by		= 'name';
	var my_filter		= 'jky-thread-filter';
	var my_search_body	= 'jky-thread-search-body';
	var my_layer		= 'jky-thread-search';

	function my_display(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method	: 'get_index'
			, table		: 'Threads'
			, select	: 'All'
			, filter	:  JKY.get_value(my_filter)
			, display	: '10'
			, order_by	:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			my_html += '<tr onclick="JKY.Thread.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-thread-search-name"			>' + my_row.name			+ '</td>'
					+  '<td class="jky-thread-search-group"			>' + my_row.thread_group	+ '</td>'
					+  '<td class="jky-thread-search-composition"	>' + my_row.composition		+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index, the_id) {
		var my_name = $(the_index).find('.jky-thread-search-name').html();
		var my_parent = $(my_the_id).parent();
		$(my_parent).find('.jky-thread-row-id'  ).val(the_id );
		$(my_parent).find('.jky-thread-row-name').val(my_name);
		$(my_parent).find('.jky-thread-row-name').click();
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