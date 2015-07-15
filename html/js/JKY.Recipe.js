"use strict";
var JKY = JKY || {};
/**
 * JKY.Recipe - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 *		$(my_parent).find('.jky-recipe-name').val(my_name);
 */
JKY.Recipe = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_order_by		= 'dyeing_type';
	var my_filter		= 'jky-recipe-filter';
	var my_search_body	= 'jky-recipe-search-body';
	var my_layer		= 'jky-recipe-search';

	var my_display = function(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		var my_color_id = JKY.get_value('jky-color-id');
		my_load_data(my_color_id);
	}

	var my_load_data = function(the_color_id) {
		var my_data =
			{ method		: 'get_index'
			, table			: 'Recipes'
			, specific		: 'color'
			, specific_id	:  the_color_id
			, filter		:  JKY.get_value(my_filter)
//			, display		: '10'
			, order_by		:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	var my_load_data_success = function(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			my_html += '<tr onclick="JKY.Recipe.click_row(this)">'
					+  '<td class="jky-search-dyeing-type"	>' +				my_row.dyeing_type	+ '</td>'
					+  '<td class="jky-search-recipe"		>' +				my_row.recipe		+ '</td>'
					+  '<td class="jky-search-remarks"		>' + JKY.fix_null  (my_row.remarks)		+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	var my_click_row = function(the_this) {
		var my_name = $(the_this).find('.jky-search-recipe').html();
		var my_parent = $(my_the_id).parent();
		var my_dom_name = $('#jky-recipe');
		if (my_dom_name.length == 0) {
			my_dom_name = my_parent.find('.jky-recipe-name');
		}
		my_dom_name.val(my_name);
		my_dom_name.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	return {
		  display		: function(the_id)			{my_display(the_id);}
		, load_data		: function(the_color_id)	{my_load_data(the_color_id);}
		, click_row		: function(the_this)		{my_click_row(the_this);}
	};
}();