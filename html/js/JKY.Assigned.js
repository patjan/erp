"use strict";

/**
 * JKY.Assigned - process all layer functions
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-contact-id'  ).val(the_id );
 *		$(my_parent).find('.jky-contact-name').val(my_name);
 */
JKY.Assigned = function() {
	var my_callback		= null;
	var my_search_body	= 'jky-assigned-search-body';
	var my_layer		= 'jky-assigned-search';
	var my_rows			= [];

	function my_get_id(the_user_role, the_callback) {
		my_callback = the_callback;
		if (my_rows.length > 0) {
			JKY.show_modal(my_layer);
		}else{
			my_load_data(the_user_role);
		}
	}

	function my_load_data(the_user_role) {
		var my_data =
			{ method	: 'get_index'
			, table		: 'Contacts'
			, specific	: 'is_contact'
			, select	:  the_user_role
			, order_by  : 'nick_name ASC'

			}
		JKY.ajax(false, my_data, function(the_response) {
			my_rows = the_response.rows;
			var my_html = '';
			for(var i=0; i<my_rows.length; i++) {
				var my_row = my_rows[i];
				my_html += '<tr>'
						+  '<td class="jky-search-assigned-name">' + my_row.nick_name + '</td>'
						+  '<td class="jky-search-assigned-pin"	>'
						+  '<input type="password" onchange="JKY.Assigned.process_pin(this, ' + my_row.id + ', \'' + my_row.pin + '\', \'' + my_row.nick_name + '\')" />'
						+  '</td>'
						+  '</tr>'
						;
			}
			JKY.set_html(my_search_body, my_html);
			JKY.show_modal(my_layer);
		})
	}

	function my_process_pin(the_this, the_id, the_pin, the_name) {
		var my_pin = $(the_this).val();
		$(the_this).val('');
		if (my_pin !== the_pin) {
			JKY.display_message(JKY.t('The pin provided is invalid'));
		}else{
			JKY.hide_modal(my_layer);
			my_callback(the_id, the_name);
		}
	}

	return {
		  get_id		:	function(the_user_role, the_callback)		{my_get_id(the_user_role, the_callback);}
		, process_pin	:	function(the_this, the_id, the_name)		{my_process_pin(the_this, the_id, the_name);}
	};
}();