/*
 * display Deliveries --------------------------------------------------------
 */

JKY.display_deliveries = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Addresses'
		, specific		: 'customer'
		, specific_id	:  JKY.row.id
		, order_by		: 'Addresses.street1'
		};
	JKY.ajax(false, my_data, JKY.generate_deliveries);
}

JKY.generate_deliveries = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_delivery(my_row);
		}
	}
	JKY.set_html('jky-deliveries-body', my_html);
	if (my_rows == '') {
//		JKY.insert_delivery();
	}

//	$('.jky-amount').ForceNumericOnly();
}

JKY.generate_delivery = function(the_row) {
	var my_disabled = ' disabled';
	if (JKY.Session.get_value('user_role') == 'Admin'
	||  JKY.Session.get_value('user_role') == 'Support') {
		my_disabled = '';
	}

	var my_id = the_row.id;
	var my_trash = (my_id && my_disabled === '') ? '<a onclick="JKY.delete_delivery(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '&nbsp;';

	var my_html = ''
		+ '<tr delivery_id=' + my_id + '>'
		+ '<td class="jky-td-action">' + my_trash + '</td>'
		+ '<td class="jky-td-normal"><input changeable class="jky-cnpj"			value="' + the_row.cnpj		+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-text-l"><input changeable class="jky-street1"		value="' + the_row.street1	+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-text-s"><input changeable class="jky-street2"		value="' + the_row.street2	+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-normal"><input changeable class="jky-city"			value="' + the_row.city		+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-state"	><input changeable class="jky-state"		value="' + the_row.state	+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-ref"	><input changeable class="jky-zip"			value="' + the_row.zip		+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '<td class="jky-td-ref"	><input changeable class="jky-district"		value="' + the_row.district	+ '" onchange="JKY.change_delivery(this, ' + my_id + ')"' + my_disabled + ' /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.change_delivery = function(the_this, the_id ) {
	var my_tr = $(the_this).parent().parent();
	var my_set = ''
		+            'cnpj=\'' + my_tr.find('.jky-cnpj'		).val() + '\''
		+       ', street1=\'' + my_tr.find('.jky-street1'	).val() + '\''
		+       ', street2=\'' + my_tr.find('.jky-street2'	).val() + '\''
		+          ', city=\'' + my_tr.find('.jky-city'		).val() + '\''
		+         ', state=\'' + my_tr.find('.jky-state'	).val() + '\''
		+           ', zip=\'' + my_tr.find('.jky-zip'		).val() + '\''
		+      ', district=\'' + my_tr.find('.jky-district'	).val() + '\''
		;

	var my_data =
		{ method	: 'update'
		, table		: 'Addresses'
		, set		:  my_set
		, where		: 'Addresses.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.change_delivery_success);
}

JKY.change_delivery_success = function(the_response) {
}

JKY.insert_delivery = function() {
	var my_set = ''
		+ '  Addresses.parent_name = \'Contact\''
		+ ', Addresses.parent_id = ' + JKY.row.id
		;
	var my_data =
		{ method	: 'insert'
		, table		: 'Addresses'
		, set		:  my_set
		};
	JKY.ajax(true, my_data, JKY.insert_delivery_success);
}

JKY.insert_delivery_success = function(response) {
	var my_row = [];
	my_row.id = response.id;
	my_row.cnpj		= '';
	my_row.street1	= '';
	my_row.street2	= '';
	my_row.city		= '';
	my_row.state	= '';
	my_row.zip		= '';
	my_row.district	= '';

	var	my_html = JKY.generate_delivery(my_row);
	JKY.append_html('jky-deliveries-body', my_html);
}

JKY.delete_delivery = function(id_name, the_id) {
	var my_tr = $(id_name).parent().parent();
	my_tr.remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Addresses'
		, where		: 'Addresses.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_delivery_success);
}

JKY.delete_delivery_success = function(response) {
	JKY.display_message(response.message)
}
