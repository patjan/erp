"use strict";
var JKY = JKY || {};
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
 * 		$(my_parent).find('.jky-ftp-id'  ).val(the_id );
 *		$(my_parent).find('.jky-ftp-name').val(my_name);
 */
JKY.FTP = function() {
	var my_this			= null;		//	external this that initiated the call
	var my_product_id	= null;		//	external product id that initiated the call
	var my_order_by		= 'ftp_number';
	var my_filter		= 'jky-ftp-filter';
	var my_search_body	= 'jky-ftp-search-body';
	var my_layer		= 'jky-ftp-search';

	function my_display(the_this, the_product_id) {
		my_this = the_this;
		if (the_product_id) {
			my_product_id = the_product_id;
		}else{
			var my_curr_tr = $(the_this).parent().parent();
			while(true){
				my_curr_tr = my_curr_tr.prev();
				var my_osa_line_id	= my_curr_tr.attr('osa_line_id');
				if (my_osa_line_id) {
					break;
				}
			};
			my_product_id = my_curr_tr.find('.jky-product-id').val();
		}
		JKY.set_focus(my_filter);
		my_load_data();
	}

	function my_load_data() {
		var my_parent_id = JKY.get_value_by_id('Products', 'parent_id', my_product_id);
		var my_where = 'AND FTPs.product_id = ' + my_product_id;
		if (my_parent_id) {
			my_where += ' OR FTPs.product_id = ' + my_parent_id;
		}
		var my_data =
			{ method		: 'get_index'
			, table			: 'FTPs'
			, where			:  my_where
			, select		: 'All'
			, order_by		:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			var my_ftp_number = my_row.ftp_number + ' <a href="#" onclick="JKY.open_new_tab(event, \'Production/FTPs/' + my_row.ftp_number + '\')"><i class="icon-pencil"></i></a>';
			my_html += '<tr onclick="JKY.FTP.click_row(this, ' + my_row.id + ', ' + my_row.machine_id + ')">'
					+  '<td class="jky-search-ftp-number"	>' + my_ftp_number			+ '</td>'
					+  '<td class="jky-search-product-name"	>' + my_row.product_name	+ '</td>'
					+  '<td class="jky-search-machine-name"	>' + my_row.machine_name	+ '</td>'
					+  '<td class="jky-search-nick-name-s"	>' + my_row.nick_name		+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}


	function my_click_row(the_index, the_id, the_machine_id) {
		var my_number		= $(the_index).find('.jky-search-ftp-number'	).html();
		var my_machine		= $(the_index).find('.jky-search-machine-name'	).html();
		var my_parent		= $(my_this).parent().parent();

//		this reverse sequence is needed to avoid out sequence on DB update
//		keep only the last change event

		var my_dom_machine_id = $('#jky-machine-id');
		if (my_dom_machine_id.length == 0) {
			my_dom_machine_id = my_parent.find('.jky-machine-id');
		}
		my_dom_machine_id.val(the_machine_id );

		var my_dom_machine_name = $('#jky-machine-name');
		if (my_dom_machine_name.length == 0) {
			my_dom_machine_name = my_parent.find('.jky-machine-name');
		}
		my_dom_machine_name.val(my_machine);

		var my_dom_ftp_id = $('#jky-ftp-id');
		if (my_dom_ftp_id.length == 0) {
			my_dom_ftp_id = my_parent.find('.jky-ftp-id');
		}
		my_dom_ftp_id.val(the_id );

		var my_dom_ftp_number = $('#jky-ftp-number');
		if (my_dom_ftp_number.length == 0) {
			my_dom_ftp_number = my_parent.find('.jky-ftp-number');
		}
		my_dom_ftp_number.val(my_number);

		my_dom_ftp_number.change();			//	to activate change event
		JKY.hide_modal(my_layer);
	}

	function my_add_new() {
		JKY.display_message('add_new');
	}

	return {
		  display		:	function		(the_this, the_product_id) {
								my_display	(the_this, the_product_id);
							}
		, load_data		:	function()		{my_load_data();}

		, click_row		:	function		(the_index, the_id, the_machine_id) {
								my_click_row(the_index, the_id, the_machine_id);
							}
		, add_new		:	function()		{my_add_new();}
	};
}();