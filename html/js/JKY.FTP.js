"use strict";

/**
 * JKY.FTP - process all changes during one transaction
 *				 control save into private array [my_appraisals]
 *
 * method:	display(the_id)
 * 			load_data()
 *			click_row(the_index, the_id)
 *			add_new()
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-ftp-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-ftp-row-name').val(my_name);
 */
JKY.FTP = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_the_type		= null;		//	selected ftp type: Punho, Gola, Galao
	var my_order_by		= 'ftp_number';
	var my_filter		= 'jky-ftp-filter';
	var my_search_body	= 'jky-ftp-search-body';
	var my_layer		= 'jky-ftp-search';

	function my_display(the_id, the_type) {
		my_the_id	= the_id;
		if (typeof the_type	== 'undefined') {
			my_the_type	= 'All';
		}else{
			my_the_type	= the_type;
		}
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'FTPs'
			, specific		: 'product'
			, specific_id	:  my_the_id
			, select		:  my_the_type
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
			my_html += '<tr onclick="JKY.FTP.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-ftp-number"	>' + my_row.ftp_number		+ '</td>'
					+  '<td class="jky-search-product-name"	>' + my_row.product_name	+ '</td>'
					+  '<td class="jky-search-machine-name"	>' + my_row.machine_name	+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index, the_id) {
		var my_product		= $(the_index).find('.jky-search-product-name').html();
		var my_number		= $(the_index).find('.jky-search-ftp-number'  ).html();
		var my_parent		= $(my_the_id).parent();

//		var my_dom_id = $(my_parent).find('#jky-ftp-id');
		var my_dom_id = $('#jky-ftp-id');
		if (my_dom_id.length == 0) {
			my_dom_id = $(my_parent).find('.jky-ftp-row-id');
		}
		my_dom_id.val(the_id );

		JKY.set_value('jky-product-name', my_product);

//		var my_dom_number = $(my_parent).find('#jky-ftp-number');
		var my_dom_number = $('#jky-ftp-number');
		if (my_dom_number.length == 0) {
			my_dom_number = $(my_parent).find('.jky-ftp-row-number');
		}
		my_dom_number.val(my_number);
		my_dom_number.change();		//	to activate change event

		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	return {
		  display		: function(the_id, the_type)	{		my_display(the_id, the_type);}
		, load_data		: function()					{		my_load_data();}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, add_new		: function()					{		my_add_new();}
	};
}();