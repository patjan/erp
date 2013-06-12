/**
 * process select product
 */
JKY.display_product = function(the_id) {
	JKY.set_focus('jky-search-filter');
	JKY.load_product();
}

JKY.filter_product = function() {
	JKY.load_product();
}

JKY.load_product = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'Products'
		, filter	:  JKY.get_value('jky-search-filter')
		, select	: 'All'
		, display	: '10'
		, order_by	: 'product_name'
		};
	JKY.ajax(false, my_data, JKY.process_load_product_success);
}

JKY.process_load_product_success = function(response) {
	JKY.display_trace('process_load_product_success');
	var my_rows	= response.rows;
	var my_html = '';
	for(var i=0; i<my_rows.length; i++) {
		var my_row = my_rows[i];
		my_html += '<tr onclick="JKY.select_product(this, ' + my_row.id + ')">'
				+  '<td class="jky-search-product-name"	>' + my_row.product_name	+ '</td>'
				+  '<td class="jky-search-product-type"	>' + my_row.product_type	+ '</td>'
				+  '<td class="jky-search-start-date"	>' + JKY.fix_ymd2dmy(my_row.start_date) + '</td>'
				+  '</tr>'
				;
	}
	JKY.set_html('jky-search-body', my_html );
	JKY.show_modal('jky-search-product');
}


JKY.add_new_product = function() {
	JKY.display_message('add_new_product');
}

JKY.select_product = function(the_index, the_id) {
	var my_product_name = $(the_index).find('.jky-search-product-name').html();
	JKY.set_value('jky-product-id', the_id);
	JKY.set_value('jky-product', my_product_name);
	JKY.hide_modal('jky-search-product');
	JKY.Changes.increment();
}