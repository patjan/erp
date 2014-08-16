"use strict";

/**
 * JKY.Product - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-product-id'  ).val(the_id );
 *		$(my_parent).find('.jky-product-name').val(my_name);
 */
JKY.Product = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_the_type		= null;		//	selected product type: Punho, Gola, Galao
	var my_order_by		= 'product_name';
	var my_filter		= 'jky-product-filter';
	var my_search_body	= 'jky-product-search-body';
	var my_layer		= 'jky-product-search';
	var my_cookie		= null;

	function my_display(the_id, the_type) {
		my_the_id	= the_id;
		if (the_type == null) {
			my_the_type	= 'All';
		}else{
			my_the_type	= the_type;
		}
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method	: 'get_index'
			, table		: 'Products'
			, select	:  my_the_type
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
			my_html += '<tr onclick="JKY.Product.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-product-name"		>' + my_row.product_name	+ '</td>'
					+  '<td class="jky-search-product-type"		>' + my_row.product_type	+ '</td>'
					+  '<td class="jky-search-product-peso"		>' + my_row.peso			+ '</td>'
					+  '<td class="jky-search-product-units"	>' + my_row.units			+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	function my_click_row(the_index, the_id) {
		var my_name		= $(the_index).find('.jky-search-product-name' ).html();
		var my_type		= $(the_index).find('.jky-search-product-type' ).html();
		var my_peso		= $(the_index).find('.jky-search-product-peso' ).html();
		var my_units	= $(the_index).find('.jky-search-product-units').html();
		var my_parent	= $(my_the_id).parent().parent();

//		var my_dom_id = $(my_parent).find('#jky-product-id');
		var my_dom_id = $('#jky-parent-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $('#jky-product-id');
			if (my_dom_id.length == 0) {
				my_dom_id = $(my_parent).find('.jky-product-id');
			}
		}
		my_dom_id.val(the_id );

//		var my_dom_name = $(my_parent).find('#jky-product-name');
		var my_dom_name = $('#jky-product-base');
		if (my_dom_name.length == 0) {
			my_dom_name = $('#jky-product-name');
			if (my_dom_name.length == 0) {
				my_dom_name = $(my_parent).find('.jky-product-name');
			}
		}
		my_dom_name.val(my_name);
		my_dom_name.change();		//	to activate change event

		var my_dom_type = $('#jky-product-type');
		if (my_dom_type.length == 0) {
			my_dom_type = $(my_parent).find('.jky-product-type');
		}
		my_dom_type.find('input').prop('checked', false);								//	jquery 2.0.3
		my_dom_type.find('input:radio[value=' + my_type + ']').prop('checked', true);	//	jquery 2.0.3
		my_dom_type.change();		//	to activate change event

		var my_dom_peso = $('#jky-peso');
		if (my_dom_peso.length == 0) {
			my_dom_peso = $(my_parent).find('.jky-product-peso');
		}
		my_dom_peso.val(my_peso);
		my_dom_peso.change();		//	to activate change event

		var my_dom_units = $('#jky-units');
		if (my_dom_units.length == 0) {
			my_dom_units = $(my_parent).find('.jky-product-units');
		}
		my_dom_units.val(my_units);
		my_dom_units.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	$(function() {
		my_cookie = $.cookie(my_layer);
	});

	return {
		  display		: function(the_id, the_type)	{		my_display(the_id, the_type);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}
	};
}();