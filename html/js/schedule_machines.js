"use strict";
var JKY = JKY || {};
/*
 * display machines -------------------------------------------------------------
 */
JKY.display_machines = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'Machines'
		, select	: 'All'
		, order_by	: 'Machines.name'
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_rows = the_response.rows;
		var my_html	= '';
		my_rows.forEach(function(the_row) {
			if (the_row.status === 'Active') {
				var my_shift_1 = ''
					+ '<a href="#" data-shift-code="1T" onclick="JKY.Weaver.delete_row(this)"><i class="icon-trash"></i></a>'
					+ '<input class="jky-shift-id" type="hidden" value="">'
					+ '<input class="jky-weaver-name" disabled="" placeholder="Tecelão" value="">'
					+ '<a href="#" data-shift-code="1T" onclick="JKY.Weaver.display(this)"><i class="icon-share"></i></a>'
					;
				var my_shift_2 = ''
					+ '<a href="#" data-shift-code="2T" onclick="JKY.Weaver.delete_row(this)"><i class="icon-trash"></i></a>'
					+ '<input class="jky-shift-id" type="hidden" value="">'
					+ '<input class="jky-weaver-name" disabled="" placeholder="Tecelão" value="">'
					+ '<a href="#" data-shift-code="2T" onclick="JKY.Weaver.display(this)"><i class="icon-share"></i></a>'
					;
				var my_shift_3 = ''
					+ '<a href="#" data-shift-code="3T" onclick="JKY.Weaver.delete_row(this)"><i class="icon-trash"></i></a>'
					+ '<input class="jky-shift-id" type="hidden" value="">'
					+ '<input class="jky-weaver-name" disabled="" placeholder="Tecelão" value="">'
					+ '<a href="#" data-shift-code="3T" onclick="JKY.Weaver.display(this)"><i class="icon-share"></i></a>'
					;
			   my_html += ''
				   + '<tr data-machine-id=' + the_row.id+ '>'
				   + '<td></td>'
				   + '<td class="jky-td-machine"	>' + the_row.name	+ '</td>'
				   + '<td class="jky-td-shift-1T"	>' + my_shift_1		+ '</td>'
				   + '<td class="jky-td-shift-2T"	>' + my_shift_2		+ '</td>'
				   + '<td class="jky-td-shift-3T"	>' + my_shift_3		+ '</td>'
				   + '</tr>'
				   ;
			   }
		});
		JKY.set_html('jky-shifts-body', my_html);
	});
};
