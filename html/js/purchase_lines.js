/*
 * display Purchase Lines -------------------------------------------------------------
 */

JKY.display_lines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'PurchaseLines'
		, select	:  JKY.row.id
		, order_by  : 'PurchaseLines.id'
		};
	JKY.ajax(false, my_data, JKY.generate_lines);
}

JKY.generate_lines = function(response) {
	var my_html  = '';
	var my_total =  0;
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row			= my_rows[i];
			var my_id			= my_row.id;
			var my_line_id		= my_row.line_id;
			var my_name			= my_row.name;
			var my_supplier_id	= my_row.supplier_id;
			var my_percent		= parseFloat(my_row.percent);

			my_total += my_percent;

			var my_line = ''
				+ "<input class='jky-line-row-id' type='hidden' value=" + my_line_id + " />"
				+ "<input class='jky-line-row-name jky-form-value' readonly='readonly' onclick='JKY.update_line(this, " + my_id + ")' value='" + my_name + "' />"
				+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
				;

			my_html  += ''
				+ '<tr purchase_line_id=' + my_id + '>'
				+ '<td class="jky-action"><a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
				+ '<td class="jky-line-value"		><input  class="jky-line-percent" text="text" onchange="JKY.update_line(this, ' + my_id + ')" value="' + my_percent + '" /></td>'
//				+ '<td class="jky-line-label"		><select class="jky-line-name"				onchange="JKY.update_line(this, ' + my_id + ')">' + JKY.set_options_array(my_name		  , JKY.lines	 , true) + '</select></td>'
				+ '<td class="jky-line-label"		>' + my_line + '</td>'
				+ '<td class="jky-line-label"		><select class="jky-line-supplier"			onchange="JKY.update_line(this, ' + my_id + ')">' + JKY.set_options_array(my_supplier_id, JKY.suppliers, true) + '</select></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-line-total', my_total);
	JKY.set_html('jky-line-body' , my_html );
	if (my_rows == '') {
		JKY.insert_line();
	}
}

JKY.update_line = function(id_name, the_id ) {
	var my_tr = $(id_name).parent().parent();
	var my_percent			= parseFloat(my_tr.find('.jky-line-percent').val());
	var my_line_id		= my_tr.find('.jky-line-row-id'	).val();
	var my_supplier_id		= my_tr.find('.jky-line-supplier'	).val();
	var my_set = ''
		+     'line_id = ' + my_line_id
		+ ', supplier_id = ' + my_supplier_id
		+     ', percent = ' + my_percent
		;
	var my_data =
		{ method	: 'update'
		, table		: 'PurchaseLines'
		, set		:  my_set
		, where		: 'PurchaseLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.update_line_success);
}

JKY.update_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.insert_line = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'PurchaseLines'
		, set		: 'PurchaseLines.ftp_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_line_success);
}

JKY.insert_line_success = function(response) {
	var my_id = response.id;
	var my_percent	= 0;
	var my_line_id= null;
	var my_name		= '';
	var my_supplier	= '';
	var my_line = ''
		+ "<input class='jky-line-row-id' type='hidden' value=" + my_line_id + " />"
		+ "<input class='jky-line-row-name jky-form-value' readonly='readonly' onclick='JKY.update_line(this, " + my_id + ")' value='" + my_name + "' />"
		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
	var	my_html = ''
		+ '<tr ftp_line_id=' + my_id + '>'
		+ '<td class="jky-action"><a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a></td>'
		+ '<td class="jky-line-value"><input  class="jky-line-percent"  text="text"	onchange="JKY.update_line(this, ' + my_id + ')" value="' + my_percent + '" /></td>'
//		+ '<td class="jky-line-label"><select class="jky-line-name"					onchange="JKY.update_line(this, ' + my_id + ')">' + JKY.set_options_array(my_name		, JKY.lines	, true) + '</select></td>'
		+ '<td class="jky-line-label"		>' + my_line + '</td>'
		+ '<td class="jky-line-label"><select class="jky-line-supplier"				onchange="JKY.update_line(this, ' + my_id + ')">' + JKY.set_options_array(my_supplier	, JKY.suppliers	, true) + '</select></td>'
		+ '</tr>'
		;
	JKY.append_html('jky-line-body', my_html);
}

JKY.delete_line = function(id_name, the_id) {
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'delete'
		, table		: 'PurchaseLines'
		, where		: 'PurchaseLines.id = ' + the_id
		};
	JKY.ajax(true, my_data, JKY.delete_line_success);
}

JKY.delete_line_success = function(response) {
//	JKY.display_message(response.message)
	JKY.verify_total_percent();
}

JKY.verify_total_percent = function() {
	var my_total = 0;
	$('#jky-line-body tr').each(function() {
		var my_percent  = parseFloat($(this).find('.jky-line-percent' ).val());
		my_total += my_percent
	})
	JKY.set_html('jky-line-total', my_total);
	if (my_total == 100) {
		$('#jky-line-total').css('color', 'black');
	}else{
		$('#jky-line-total').css('color', 'red');
		JKY.display_message(JKY.t('Total percent is not 100.'))
	}
}

JKY.print_lines = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'PurchaseLines'
		, select	:  the_id
		, order_by  : 'PurchaseLines.id'
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					var my_rows = response.rows;
					for(var i in my_rows) {
						var my_row			= my_rows[i];
						var my_name			= my_row.name;
						var my_supplier		= my_row.supplier;
						var my_percent		= parseFloat(my_row.percent);
						my_html  += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_percent + '</td>'
							+ '<td>' + my_name    + '</td>'
							+ '<td>' + my_supplier+ '</td>'
							+ '</tr>'
							;
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}
