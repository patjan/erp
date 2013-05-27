/**
 * process select thread
 */
JKY.thread_the_id;

JKY.display_thread = function(the_id) {
	JKY.thread_the_id = the_id;
	JKY.set_focus('jky-thread-filter');
	JKY.load_thread();
}

JKY.thread_filter = function() {
	JKY.load_thread();
}

JKY.load_thread = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'Threads'
		, filter	:  JKY.get_value('jky-thread-filter')
		, display	: '10'
		, order_by	: 'name'
		};
	JKY.ajax(false, my_data, JKY.process_load_thread_success);
}

JKY.process_load_thread_success = function(response) {
	JKY.display_trace('process_load_thread_success');
	var my_rows	= response.rows;
	var my_html = '';
	for(var i=0; i<my_rows.length; i++) {
		var my_row = my_rows[i];
		my_html += '<tr onclick="JKY.thread_select(this, ' + my_row.id + ')">'
				+  '<td class="jky-thread-search-name"			>' + my_row.name			+ '</td>'
				+  '<td class="jky-thread-search-group"			>' + my_row.thread_group	+ '</td>'
				+  '<td class="jky-thread-search-composition"	>' + my_row.composition		+ '</td>'
				+  '</tr>'
				;
	}
	JKY.set_html('jky-thread-search-body', my_html );
	JKY.show_modal('jky-thread-search');
}


JKY.thread_add_new = function() {
	JKY.display_message('thread_add_new');
}

JKY.thread_select = function(the_index, the_id) {
	var my_name = $(the_index).find('.jky-thread-search-name').html();
//	JKY.display_message('id: ' + the_id + ', name: ' + my_name);
	var my_parent = $(JKY.thread_the_id).parent();
	$(my_parent).find('.jky-thread-row-id'  ).val(the_id );
	$(my_parent).find('.jky-thread-row-name').val(my_name);
	$(my_parent).find('.jky-thread-row-name').click();
	JKY.hide_modal('jky-thread-search');
}