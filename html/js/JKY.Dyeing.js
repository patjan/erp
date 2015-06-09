"use strict";
var JKY = JKY || {};
/**
 * JKY.Dyeing - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 *		$(my_parent).find('.jky-dyeing-name').val(my_name);
 */
JKY.Dyeing = function() {
	var my_rows			= null;
	var my_the_id		= null;		//	external id that initiated the call
	var my_filter		= 'jky-dyeing-filter';
	var my_search_body	= 'jky-dyeing-search-body';
	var my_layer		= 'jky-dyeing-search';

	var my_display = function(the_id) {
		my_the_id = the_id;
		JKY.set_focus(my_filter);
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			my_html += '<tr onclick="JKY.Dyeing.click_row(this)">'
					+  '<td class="jky-search-dyeing-name">' + my_row.name + '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	var my_click_row = function(the_index) {
		var my_name = $(the_index).find('.jky-search-dyeing-name').html();
		var my_parent = $(my_the_id).parent();
		var my_dom_name = $('#jky-dyeing-type');
		if (my_dom_name.length == 0) {
			my_dom_name = my_parent.find('.jky-dyeing-name');
		}
		my_dom_name.val(my_name);
		my_dom_name.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	$(function() {
		my_rows = JKY.get_configs('Dyeing Types');
	});

	return {
		  display		: function(the_this)	{	my_display(the_this);}
		, load_data		: function()			{	my_load_data();}
		, click_row		: function(the_index)	{	my_click_row(the_index);}
	};
}();