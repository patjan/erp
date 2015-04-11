/*
 * display Restrictions --------------------------------------------------------
 */

JKY.display_restrictions = function() {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Restrictions'
		, specific		: 'customer'
		, specific_id	:  JKY.row.id
		, order_by		: 'Restrictions.issued_dt DESC'
		};
	JKY.ajax(false, my_data, JKY.generate_restrictions);
}

JKY.generate_restrictions = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_restriction(my_row);
		}
	}
	JKY.set_html('jky-restrictions-body' , my_html );
	if (my_rows == '') {
//		JKY.insert_restriction();
	}

	$('.jky-amount').ForceNumericOnly();
}

JKY.generate_restriction = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (my_id) ? '<a onclick="JKY.delete_restriction(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '&nbsp;';

	var my_html = ''
		+ '<tr restriction_id=' + my_id + '>'
		+ '<td class="jky-td-action">' + my_trash + '</td>'
		+ '<td class="jky-td-date"	><input changeable class="jky-issued"	value="' + the_row.issued_dt+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-ref"	><input changeable class="jky-document" value="' + the_row.document	+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-ref"	><input changeable class="jky-bank"		value="' + the_row.bank_name+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-ref"	><input changeable class="jky-number"	value="' + the_row.number	+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-price"	><input changeable class="jky-amount"	value="' + the_row.amount	+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '<td class="jky-td-text-l"><input changeable class="jky-motive"	value="' + the_row.motive	+ '" onchange="JKY.change_restriction(this, ' + my_id + ')" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.change_restriction = function(the_this, the_id ) {
	var my_tr = $(the_this).parent().parent();
	var my_set = ''
		+       'issued_dt=\'' + my_tr.find('.jky-issued'	).val() + '\''
		+      ', document=\'' + my_tr.find('.jky-document'	).val() + '\''
		+     ', bank_name=\'' + my_tr.find('.jky-bank'		).val() + '\''
		+        ', number=\'' + my_tr.find('.jky-number'	).val() + '\''
		+        ', amount=  ' + parseFloat(my_tr.find('.jky-amount').val())
		+        ', motive=\'' + my_tr.find('.jky-motive'	).val() + '\''
		;

	var my_data =
		{ method	: 'update'
		, table		: 'Restrictions'
		, set		:  my_set
		, where		: 'Restrictions.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.change_restriction_success);
}

JKY.change_restriction_success = function(the_response) {
}

JKY.insert_restriction = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Restrictions'
		, set		: 'Restrictions.customer_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_restriction_success);
}

JKY.insert_restriction_success = function(response) {
	var my_row = [];
	my_row.id = response.id;
	my_row.issued_dt	= '';
	my_row.document		= '';
	my_row.bank_name	= '';
	my_row.number		= '';
	my_row.amount		= '0';
	my_row.motive		= '';

	var	my_html = JKY.generate_restriction(my_row);
	JKY.append_html('jky-restrictions-body', my_html);
}

JKY.delete_restriction = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Restrictions'
		, where		: 'Restrictions.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_restriction_success);
}

JKY.delete_restriction_success = function(response) {
	JKY.display_message(response.message)
}