"use strict";
/**
 * JKY.History -
 */
JKY.History = function() {

	var my_display = function() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'History'
			, specific		:  'parent_id'
			, specific_id	:  JKY.row.id
			, select		:  JKY.App.get_prop('table_name')
			, display		: '100'
			, order_by		: 'History.updated_at DESC'
			};
		JKY.ajax(false, my_data, my_display_rows);

	}

	var my_display_rows = function(the_response) {
		var my_html  = '';
		var my_rows  = the_response.rows;
		if (my_rows != '') {
			for(var i in my_rows) {
				var my_row	= my_rows[i];
				my_html += my_display_row(my_row);
			}
		}
		JKY.set_html('jky-history-body', my_html);
	}

	var my_display_row = function(the_row) {
		var my_html = ''
			+ '<tr>'
			+ '<td class="jky-td-datetime"	>' + the_row.updated_at		+ '</td>'
			+ '<td class="jky-td-name-s"	>' + the_row.updated_name	+ '</td>'
			+ '<td class="jky-td-name-s"	>' + the_row.method			+ '</td>'
//			+ '<td class="jky-td-name-w"	>' + the_row.history.replace( /, /g, "<br>"	) + '</td>'
			+ '<td class="jky-td-name-w"	>' + the_row.history		+ '</td>'
			+ '</tr>'
			;
		return my_html;
	}

	return {
		  display		: function()					{my_display			();}
	};
}();