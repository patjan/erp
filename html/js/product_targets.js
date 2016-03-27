/*
 * display Targets -------------------------------------------------------------
 */
JKY.display_targets = function() {
	var my_where  = 'AND ProdColors.product_id = ' + JKY.row.id;
	if (JKY.row.parent_id) {
		my_where += ' OR ProdColors.product_id = ' + JKY.row.parent_id;
	}
	var my_data =
		{ method		: 'get_index'
		, table			: 'ProdColors'
		, where			:  my_where
		, select		: 'All'
		, order_by		: 'color_name'
		};
	JKY.ajax(false, my_data, JKY.generate_targets);
}

JKY.generate_targets = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row	= my_rows[i];
			my_html += JKY.generate_target(my_row);
		}
	}
	JKY.set_html('jky-targets-body', my_html);
}

JKY.generate_target = function(the_row) {
	var my_id = the_row.id;
	var my_trash = '<a onclick="JKY.delete_color(this, ' + my_id + ')"><i class="icon-trash"></i></a>';
	var my_color = ''
		+ "<input class='jky-color-id'	 type='hidden' value=" + the_row.color_id   + " />"
		+ "<input class='jky-color-name' disabled onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.color_name + "' />"
		+ " <a href='#' onClick='JKY.Color.display(this)'><i class='icon-share'></i></a>"
		;
	var my_target = ''
		+ "<input class='jky-target' onchange='JKY.update_color(this, " + my_id + ")' value='" + the_row.target + "' />"
		;

	var my_html  = ''
		+ '<tr target_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-name-w"	>' + my_color	+ '</td>'
		+ '<td class="jky-td-pieces"	>' + my_target	+ '</td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_color = function(the_this, the_id) {
	var my_tr = $(the_this).parent().parent();
	var my_color_id	= my_tr.find('.jky-color-id').val();
	var my_target	= my_tr.find('.jky-target'  ).val();
	var my_set = ''
		+ 'color_id = ' + my_color_id
		+ ', target = ' + my_target
		;
	var my_data =
		{ method	: 'update'
		, table		: 'ProdColors'
		, set		:  my_set
		, where		: 'ProdColors.id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

JKY.insert_color = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'ProdColors'
		, set		: 'ProdColors.product_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data,function(the_response) {
		var my_row = [];
		my_row.id = the_response.id;
		my_row.color_id = null;
		my_row.color_name = '';
		my_row.target = 0;
		var my_html = JKY.generate_target(my_row);
		JKY.append_html('jky-targets-body', my_html);
	});
}

JKY.delete_color = function(the_this, the_id) {
	$(the_this).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'ProdColors'
		, where		: 'ProdColors.id = ' + the_id
		};
	JKY.ajax(true, my_data);
}

