/*
 * display Prices --------------------------------------------------------------
 */
var my_color_prices = [];
var my_tr = null;

JKY.load_color_types = function() {
	my_color_prices = [];
	var my_rows = JKY.get_configs('Color Types');
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = [];
			my_row.color_type		= my_rows[i].name;
			my_row.id				= '';
			my_row.current_price	= '';
			my_row.new_price		= '';
			my_row.effective_date	= '';
			my_color_prices.push(my_row);
		}
	}
}();

JKY.display_prices = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'ProdPrices'
		, specific		: 'product'
		, specific_id	:  JKY.row.id
		, select		: 'Active'
		, order_by		: 'color_type'
		};
	JKY.ajax(false, my_data, JKY.generate_prices);
}

JKY.find_prod_price = function(the_color_type, the_rows) {
	for(var i in the_rows) {
		var my_row = the_rows[i];
		if (my_row.color_type == the_color_type) {
			return my_row;
		}
	}
	return false;
};

JKY.generate_prices = function(response) {
	for(var i in my_color_prices) {
		var my_row = JKY.find_prod_price(my_color_prices[i].color_type, response.rows);
		if (my_row) {
			my_color_prices[i].id				= my_row.id				;
			my_color_prices[i].current_price	= my_row.current_price	;
			my_color_prices[i].new_price		= my_row.new_price		;
			my_color_prices[i].effective_date	= my_row.effective_date	;
		}else{
			my_color_prices[i].id				= null;
			my_color_prices[i].current_price	= '0';
			my_color_prices[i].new_price		= '0';
			my_color_prices[i].effective_date	= null;
		}
	}

	var my_html  = '';
	var my_rows  = my_color_prices;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row	= my_rows[i];
			my_html += JKY.generate_price(my_row);
		}
	}
	JKY.set_html('jky-prices-body', my_html);
}

JKY.generate_price = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (my_id) ? '<a onclick="JKY.delete_prod_price(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '&nbsp;';

	var my_html  = ''
		+ '<tr prod_price_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-name"		><input  disabled	class="jky-color-type"		value="' +				the_row.color_type		+ '" /></td>'
		+ '<td class="jky-td-price"		><input  changeable	class="jky-current-price"	value="' +				the_row.current_price	+ '" onchange="JKY.change_price(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-price"		><input  changeable	class="jky-new-price"		value="' +				the_row.new_price		+ '" onchange="JKY.change_price(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-date"		><input  changeable	class="jky-effective-date"	value="' + JKY.out_date(the_row.effective_date)	+ '" onchange="JKY.change_price(this, ' + my_id + ')" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.change_price = function(the_this, the_id) {
	if (the_id) {
		JKY.update_prod_price(the_this, the_id);
	}else{
		JKY.insert_prod_price(the_this);
	};
}

JKY.update_prod_price = function(the_this, the_id) {
	my_tr = $(the_this).parent().parent();
	var my_color_type		= $(my_tr).find('.jky-color-type'		).val();
	var my_current_price	= $(my_tr).find('.jky-current-price'	).val();
	var my_new_price		= $(my_tr).find('.jky-new-price'		).val();
	var my_effective_date	= $(my_tr).find('.jky-effective-date'	).val();

	var my_set	= ''
				+    'current_price =  ' + my_current_price
				+      ', new_price =  ' + my_new_price
				+ ', effective_date =  ' + JKY.inp_date_value(my_effective_date)
				;
	var my_data =
		{ method	: 'update'
		, table		: 'ProdPrices'
		, set		:  my_set
		, where		: 'ProdPrices.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_prod_price_success);
}

JKY.update_prod_price_success = function(the_response) {
}

JKY.insert_prod_price = function(the_this) {
	my_tr = $(the_this).parent().parent();
	var my_color_type		= $(my_tr).find('.jky-color-type'		).val();
	var my_current_price	= $(my_tr).find('.jky-current-price'	).val();
	var my_new_price		= $(my_tr).find('.jky-new-price'		).val();
	var my_effective_date	= $(my_tr).find('.jky-effective-date'	).val();

	var my_set	= ''
				+       'product_id =  ' + JKY.row.id
				+     ', color_type =\'' + my_color_type + '\''
				+  ', current_price =  ' + my_current_price
				+      ', new_price =  ' + my_new_price
				+ ', effective_date =  ' + JKY.inp_date_value(my_effective_date)
				;
	var my_data =
		{ method	: 'insert'
		, table		: 'ProdPrices'
		, set		: my_set
		};
	JKY.ajax(true, my_data, JKY.insert_prod_price_success);
}

JKY.insert_prod_price_success = function(the_response) {
	var my_id = the_response.id;
	var my_trash = '<a onclick="JKY.delete_prod_price(this, ' + my_id + ')"><i class="icon-trash"></i></a>';
	$(my_tr).find('.jky-td-action'		).html(my_trash);
	$(my_tr).find('.jky-current-price'	).attr('onchange', 'JKY.change_price(this, ' + my_id + ')');
	$(my_tr).find('.jky-new-price'		).attr('onchange', 'JKY.change_price(this, ' + my_id + ')');
	$(my_tr).find('.jky-effective-date'	).attr('onchange', 'JKY.change_price(this, ' + my_id + ')');
}

JKY.delete_prod_price = function(the_this, the_id) {
	my_tr = $(the_this).parent().parent();
	$(my_tr).attr('prod_price_id', 'null');
	$(my_tr).find('.jky-current-price'	).val('0');
	$(my_tr).find('.jky-new-price'		).val('0');
	$(my_tr).find('.jky-effective-date'	).val('' );
	$(my_tr).find('.jky-current-price'	).attr('onchange', 'JKY.change_price(this, null)');
	$(my_tr).find('.jky-new-price'		).attr('onchange', 'JKY.change_price(this, null)');
	$(my_tr).find('.jky-effective-date'	).attr('onchange', 'JKY.change_price(this, null)');
	$(the_this).remove();
	var my_data =
		{ method	: 'update'
		, table		: 'ProdPrices'
		, set		: 'status = \'History\''
		, where		: 'ProdPrices.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_prod_price_success);
}

JKY.delete_prod_price_success = function(the_response) {
	JKY.display_message(the_response.message)
}