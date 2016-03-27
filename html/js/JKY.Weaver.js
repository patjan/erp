"use strict";
var JKY = JKY || {};
/**
 * JKY.Weaver - process all changes during one transaction
 */
JKY.Weaver = function() {
	var $my_this		= null;
	var my_shift_code	= null;
	var my_machine_id	= null;
	var my_weavers		= [];
	var my_filter		= 'jky-weaver-filter';
	var my_search_body	= 'jky-weaver-search-body';
	var my_layer		= 'jky-weaver-search';

	function my_display(the_this) {
		$my_this = $(the_this);
		my_shift_code = $my_this.data('shift-code');
		my_machine_id = $my_this.parent().parent().data('machine-id');
		$('#jky-weaver-shift').html(my_shift_code);

		JKY.set_focus(my_filter);
		my_load_data();
		my_display_search();
		JKY.show_modal(my_layer);
	}

	function my_load_data() {
		if (my_weavers.length === 0) {
			var my_data =
				{ method		: 'get_index'
				, table			: 'Contacts'
				, specific		: 'is_weaver'
				, specific_id	: '100003'			//	Company = DL
				, select		: 'All'
				, order_by		: 'Contacts.nick_name'
				};
			JKY.ajax(false, my_data, function(the_response) {
				the_response.rows.forEach(function(the_row) {
					var my_row = {};
					my_row.id = the_row.id;
					my_row.nick_name = the_row.nick_name;
					my_row.user_shift = the_row.user_shift;
					my_weavers.push(my_row);
				});
			});
		}
	}
		
	function my_display_search() {
		var my_filter = $('#jky-weaver-filter').val();
		var my_html = '';
		my_weavers.forEach(function(the_weaver) {
			if (the_weaver.user_shift === my_shift_code
			&& (JKY.is_empty(my_filter) || the_weaver.nick_name.indexOf(my_filter) > -1)) {
				my_html += '<tr onclick="JKY.Weaver.click_row(this, ' + the_weaver.id + ')">'
						+  '<td class="jky-weaver-search-name"	>' + the_weaver.nick_name + '</td>'
						+  '</tr>'
						;
			}
		});
		JKY.set_html(my_search_body, my_html);
	}

	function my_click_row(the_index, the_id) {
		var my_name = $(the_index).find('.jky-weaver-search-name').html();
		var $my_parent = $my_this.parent();
		var my_shift_id = $my_parent.find('.jky-shift-id').val();
		$my_parent.find('.icon-trash').css('visibility', 'visible');
		$my_parent.find('.jky-weaver-id'  ).val(the_id );
		$my_parent.find('.jky-weaver-name').val(my_name);
		JKY.hide_modal(my_layer);

		var my_set = ''
			+  'schedule_id = ' + JKY.row.id
			+ ', shift_code =\'' + my_shift_code + '\''
			+ ', machine_id = ' + my_machine_id
			+  ', weaver_id = ' + the_id
			;
		var my_data = '';
		if (my_shift_id === '') {
			my_data = { method:'insert', table:'Shifts', set:my_set };
		}else{
			my_data = { method:'update', table:'Shifts', set:my_set, where: 'id = ' + my_shift_id };
		}
		JKY.ajax(false, my_data);
	}

	function my_delete_row(the_this) {
		$my_this = $(the_this);
		var $my_parent = $my_this.parent();
		var my_shift_id = $my_parent.find('.jky-shift-id').val();
		if (JKY.is_empty(my_shift_id))	{return;}
		
		$my_parent.find('.icon-trash').css('visibility', 'hidden');
		$my_parent.find('.jky-shift-id').val('');
		$my_parent.find('.jky-weaver-name').val('');

		var my_data = { method:'delete', table:'Shifts', where: 'id = ' + my_shift_id };
		JKY.ajax(false, my_data);
	}

	JKY.append_file('jky-load-weaver', '../JKY.Search.Weaver.html');
	$('#jky-weaver-filter').KeyUpDelay(my_display_search);

	return {
		  display		: function(the_this)			{		my_display(the_this);}
		, click_row		: function(the_index, the_id)	{		my_click_row(the_index, the_id);}
		, delete_row	: function(the_this)			{		my_delete_row(the_this);}
	};
}();