/*
 * display FTPs ----------------------------------------------------------------
 */

JKY.display_ftps = function() {
	var my_where = 'AND FTPs.product_id = ' + JKY.row.id;
	if (JKY.row.parent_id) {
		my_where += ' OR FTPs.product_id = ' + JKY.row.parent_id;
	}
	var my_data =
		{ method		: 'get_index'
		, table			: 'FTPs'
		, where			:  my_where
		, select		: 'All'
		, order_by		: 'ftp_number'
		};
	JKY.ajax(false, my_data, JKY.generate_ftps);
}

JKY.generate_ftps = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row	= my_rows[i];
			my_html += JKY.generate_ftp(my_row);
		}
	}
	JKY.set_html('jky-ftps-body' , my_html);
}

JKY.generate_ftp = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (false) ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';

	var my_html  = ''
		+ '<tr ftp_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash + '</td>'
		+ '<td class="jky-td-number"	>' + the_row.ftp_number		+ '</td>'
		+ '<td class="jky-td-name-l"	>' + the_row.composition	+ '</td>'
		+ '<td class="jky-td-name-s"	>' + the_row.machine_name	+ '</td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.set_current = function(id_name, the_id ) {
	JKY.unset_current();

	var my_data =
		{ method	: 'update'
		, table		: 'Cylinders'
		, set		: 'is_current = \'Yes\''
		, where		: 'Cylinders.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.set_current_success);
}

JKY.set_current_success = function(response) {
	JKY.display_message(response.message)
}

JKY.unset_current = function(id_name, the_id ) {
	var my_where = ''
		+ 'Cylinders.machine_id = ' + JKY.row.id
		+ ' AND Cylinders.is_current = \'Yes\''
		;
	var my_data =
		{ method	: 'update'
		, table		: 'Cylinders'
		, set		: 'is_current = \'No\''
		, where		:  my_where
		};
	JKY.ajax(true, my_data, JKY.unset_current_success);
}

JKY.unset_current_success = function(response) {
	JKY.display_message(response.message)
}

JKY.update_name = function(id_name, the_id ) {
//	var my_tr = $(id_name).parent().parent();
//	var my_name	= my_tr.find('.jky-cylinder-name').val();
	var my_name	= $(id_name).val();
	var my_data =
		{ method	: 'update'
		, table		: 'Cylinders'
		, set		: 'name = \'' + my_name	 + '\''
		, where		: 'Cylinders.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_name_success);

}

JKY.update_name_success = function(response) {
	JKY.display_message(response.message)
}

JKY.insert_cylinder = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'Cylinders'
		, set		: 'Cylinders.machine_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_cylinder_success);
}

JKY.insert_cylinder_success = function(response) {
	var my_id = response.id;
	var my_name		= '';
	var my_checked	= '';
	var	my_html = ''
		+ '<tr cylinder_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_cylinder(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-cylinder-value"><input name="jky-cylinder-current" type="radio" onchange="JKY.set_current(this, ' + my_id + ')"'		 + my_checked + ' /></td>'
		+ '<td class="jky-cylinder-label"><input class="jky-cylinder-name"   text="text"  onchange="JKY.update_name(this, ' + my_id + ')" value="'	+ my_name + '" /></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-cylinder-body', my_html);
}

JKY.delete_cylinder = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'Cylinders'
		, where		: 'Cylinders.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_cylinder_success);
}

JKY.delete_cylinder_success = function(response) {
	JKY.display_message(response.message)
}