/*
 * display Load Outs -------------------------------------------------------------
 */

var my_shipdyer_id			= 0;
var my_old_quoted_pieces	= 0;
var my_new_quoted_pieces	= 0;

JKY.display_loadouts = function() {
/*
SELECT LoadOuts.*
,      Dyer.nick_name		AS      dyer_name
,     Color.color_name		AS     color_name
  FROM LoadOuts
  LEFT JOIN    Contacts AS Dyer		ON      Dyer.id	=		  LoadOuts.dyer_id
  LEFT JOIN      Colors AS Color	ON     Color.id	=		  LoadOuts.color_id
 WHERE LoadOuts.dyer_id = 200001
   AND LoadOuts.shipdyer_id IS NULL
 ORDER BY LoadOuts.loadout_number
 LIMIT 10
*/
	my_shipdyer_id = JKY.row.id;
	var my_data =
		{ method		: 'get_index'
		, table			: 'LoadOuts'
		, specific		: 'shipdyer'
		, specific_id	:  JKY.row.id
		, select		: 'All'
		, order_by		: 'LoadOuts.loadout_number'
		};
	JKY.ajax(false, my_data, JKY.generate_loadouts);
}

JKY.generate_loadouts = function(response) {
	var my_html		= '';
//	var my_total	=  0;
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_loadout(my_row);

//			var my_percent = parseFloat(my_row.percent);
//			my_total += my_percent;
		}
	}
//	JKY.set_html('jky-loadout-total', my_total);
	JKY.set_html('jky-loadouts-body' , my_html);
//	$('.jky-quoted-pieces').ForceIntegerOnly();
	if (my_rows == '') {
//		JKY.insert_loadout();
	}
}

JKY.generate_loadout = function(the_row) {
	var my_id = the_row.id;
	var my_trash = (the_row.status == 'Draft') ? '<a onclick="JKY.delete_loadout(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_loadout = ''
		+ "<input class='jky-loadout-color-id' type='hidden' value=" + the_row.loadout_color_id + " />"
		+ "<input class='jky-loadout-number' disabled onchange='JKY.update_loadout(this, " + my_id + ")' value='" + JKY.fix_null(the_row.loadout_number) + "' />"
		+ " <a href='#' onClick='JKY.LoadOut.display(this, JKY.get_dyer_id(), JKY.get_dyer_name())'><i class='icon-share'></i></a>"
		;
	var my_html = ''
		+ '<tr loadout_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-key-m"		>' + my_loadout	+ '</td>'
		+ '<td class="jky-td-text-l"	><input	disabled value="' + JKY.fix_null	(the_row.color_name			) + '" /></td>'
		+ '<td class="jky-td-date"		><input disabled value="' + JKY.short_date	(the_row.requested_at		) + '" /></td>'
		+ '<td class="jky-td-date"		><input disabled value="' + JKY.short_date	(the_row.checkout_at		) + '" /></td>'
		+ '<td class="jky-td-pieces"	><input disabled value="' + JKY.fix_null	(the_row.quoted_pieces		) + '" /></td>'
		+ '<td class="jky-td-pieces"	><input disabled value="' +	JKY.fix_null	(the_row.checkout_pieces	) + '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.update_loadout = function(id_name, the_id) {
	JKY.display_trace('update_loadout');
	JKY.select_loadout(the_id);
	var my_tr = $(id_name).parent().parent();
	var my_loadout_color_id	=			 my_tr.find('.jky-loadout-color-id'	).val() ;
	var my_quoted_pieces	= parseFloat(my_tr.find('.jky-quoted-pieces'	).val());

	var my_set = ''
		+   'quot_color_id =  ' + my_loadout_color_id
		+ ', quoted_pieces =  ' + my_quoted_pieces
		;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadQuotations'
		, set		:  my_set
		, where		: 'LoadQuotations.id = ' + the_id
		};
	my_new_quoted_pieces = my_quoted_pieces;
	JKY.ajax(true, my_data, JKY.update_loadout_success);
}

JKY.update_loadout_success = function(response) {
JKY.display_trace('update_loadout_success');
//	JKY.display_message(response.message)
	JKY.update_loadout();
}

JKY.insert_loadout = function() {
	var my_data =
		{ method	: 'insert'
		, table		: 'LoadSales'
		, set		: 'LoadSales.shipdyer_id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.insert_loadout_success);
}

JKY.insert_loadout_success = function(response) {
	var my_row = [];
	my_row.id				= response.id;
	my_row.status			= 'Draft';
	my_row.loadout_color_id	= null;
	my_row.quoted_pieces	= 0;
	my_row.checkout_pieces	= 0;
	my_row.returned_pieces	= 0;

	var my_html = JKY.generate_loadout(my_row);
	JKY.append_html('jky-loadouts-body', my_html);
	$('#jky-loadouts-body tr:last a[onclick*="display"]').click();
}

JKY.delete_loadout = function(id_name, the_id) {
	JKY.select_loadout(the_id);
	$(id_name).parent().parent().remove();
	var my_data =
		{ method	: 'update'
		, table		: 'LoadOuts'
		, where		: 'LoadOuts.id = ' + the_id
		, set		: 'LoadOuts.shipdyer_id = NULL'
		};
	my_new_quoted_pieces = 0;
	JKY.ajax(true, my_data, JKY.delete_loadout_success);
}

JKY.delete_loadout_success = function(response) {
//	JKY.display_message(response.message)
//	JKY.update_loadout();
}

JKY.select_loadout = function(the_id) {
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadSales'
		, where		: 'LoadSales.id = ' + the_id
		};
	JKY.ajax(false, my_data, JKY.select_loadout_success);
}

JKY.select_loadout_success = function(response) {
	my_old_quoted_pieces = parseFloat(response.row.quoted_pieces);
}

JKY.update_loadout = function() {
JKY.display_trace('update_loadout');
	var my_delta_pieces = (my_new_quoted_pieces - my_old_quoted_pieces);
	var my_set = ' quoted_pieces = quoted_pieces + ' + my_delta_pieces;
	var my_data =
		{ method	: 'update'
		, table		: 'LoadOuts'
		, set		: my_set
		, where		: 'LoadOuts.id = ' + my_shipdyer_id
		};
	JKY.ajax(false, my_data, JKY.update_loadout_success);
}

JKY.update_loadout_success = function(response) {
JKY.display_trace('update_loadout_success');
	var my_data =
		{ method	: 'get_row'
		, table		: 'LoadOuts'
		, where		: 'LoadOuts.id = ' + my_shipdyer_id
		};
	JKY.ajax(true, my_data, JKY.display_loadout_quoted);
}

JKY.display_loadout_quoted = function(response) {
JKY.display_trace('display_loadout_quoted');
	var my_quoted_pieces = parseFloat(response.row.quoted_pieces);
//	var my_quoted_amount = parseFloat(response.row.quoted_amount);
	JKY.set_value('jky-quoted-pieces', my_quoted_pieces);
//	JKY.set_value('jky-quoted-amount', my_quoted_amount);
//	JKY.set_calculated_color();
}

JKY.print_loadouts = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'LoadSales'
		, select	:  the_id
		, order_by  : 'LoadSales.id'
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
