"use strict";

/**
 * tickets.html
 */
var jky_program		= 'History';
var jky_table		= 'History';
var jky_select		= '';
var jky_focus		= 'jky-description';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'created_at';
var jky_sort_seq	=  -1;				//	0=ASC, -1=DESC

var jky_count		=  0;
var jky_index		=  0;				//	0=Add New

JKY.rows		= [];
JKY.row 		= null;

/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_all_events(jky_program);
	JKY.set_initial_values(jky_program);
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function(jky_program) {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-app-select'			).change(function() {JKY.change_select  (this);});
		$('#jky-app-filter'			).change(function() {JKY.change_filter  (this);});
		$('#jky-action-add-new'		).click (function() {JKY.process_add_new	();});
		$('#jky-action-print'		).click (function() {JKY.process_print		();});
		$('#jky-action-save'		).click (function() {JKY.process_save		();});
		$('#jky-action-delete'		).click (function() {JKY.process_delete		();});
		$('#jky-action-cancel'		).click (function() {JKY.process_cancel		();});
		$('#jky-action-export'		).click (function() {JKY.process_export		();});
		$('#jky-action-publish'		).click (function() {JKY.process_publish	();});
		$('#jky-action-prev'		).click (function() {JKY.display_prev		();});
		$('#jky-action-next'		).click (function() {JKY.display_next		();});
		$('#jky-action-list'		).click (function() {JKY.display_list		();});
		$('#jky-action-form'		).click (function() {JKY.display_form	   (1);});
		$('#jky-action-comment'		).click (function() {JKY.process_comment	();});	// not done
		$('#jky-check-all'			).click (function() {JKY.set_all_check  (this);});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function(jky_program) {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		JKY.set_menu_active('jky-menu-admin');
		JKY.set_side_active('jky-admin-history');
		JKY.set_html('jky-app-breadcrumb'	, JKY.t(jky_program));
		JKY.set_html('jky-app-select'		, JKY.set_controls('Ticket Status Codes', jky_select, 'All'));
		JKY.set_html('jky-priority'			, JKY.set_controls('Priorities', '', ''));
		JKY.set_html('jky-category'			, JKY.set_controls('Ticket Categories', '', ''));
		JKY.display_list();
//		JKY.display_form(1);
		JKY.show('jky-side-admin'		);
		JKY.show('jky-app-header'		);
//		setTimeout(function() {JKY.set_option('jky-app-select', jky_select);}, 100);
		JKY.set_option('jky-app-select', jky_select);
		JKY.set_value ('jky-app-filter', jky_filter);
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.change_select = function(event){
	jky_select = event.value;
	JKY.display_trace('change_select: ' + jky_select);
	JKY.display_list();
}

JKY.change_filter = function(event){
	jky_filter = event.value;
	JKY.display_trace('change_filter: ' + jky_filter);
	JKY.display_list();
}

JKY.display_prev = function() {
	jky_index = (jky_index == 1) ? jky_count : (jky_index-1);
	JKY.display_row(jky_index);
}

JKY.display_next = function() {
	jky_index = (jky_index == jky_count) ? 1 : (jky_index+1);
	JKY.display_row(jky_index);
}

JKY.set_all_check = function(the_index) {
	if ($(the_index).is(':checked')) {
		$('#jky-table-body .jky-checkbox input').each(function() {$(this).attr('checked', 'checked');})
	}else{
		$('#jky-table-body .jky-checkbox input').each(function() {$(this).removeAttr('checked');})
	}
}

JKY.set_checkbox = function(the_index) {
	JKY.skip_form = true;
}

JKY.display_list = function() {
//	JKY.show('jky-app-filter'		);
	JKY.show('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.show('jky-action-add-new'	);
	JKY.hide('jky-action-print'		);
	JKY.hide('jky-action-save'		);
	JKY.hide('jky-action-copy'		);
	JKY.hide('jky-action-delete'	);
	JKY.hide('jky-action-cancel'	);
//	JKY.show('jky-action-publish'	);
	JKY.show('jky-app-table'		);
	JKY.hide('jky-app-form'			);
	JKY.load_table();
}

JKY.load_table = function() {
	JKY.show('jky-loading');
	var my_order_by = jky_sort_by + ' ' + (jky_sort_seq == 0 ? 'ASC' : 'DESC');
	var my_data =
		{ method	: 'get_index'
		, table		: jky_table
		, select	: jky_select
		, filter	: jky_filter
		, specific	: jky_specific
		, order_by	: my_order_by
		};
	JKY.ajax(false, my_data, JKY.process_load_success);
}

JKY.process_load_success = function(response) {
	JKY.display_trace('process_load_success');
	JKY.rows	= response.rows;
	jky_count	= JKY.rows.length;
	jky_index	= 1;
	var my_html = '';
	for(var i=0; i<jky_count; i++) {
		var my_row = JKY.rows[i];
		var my_checkbox = '<input type="checkbox" onclick="JKY.set_checkbox(this)" row_id=' + my_row.id + ' />';
		var my_opened_date = JKY.short_date(my_row.opened_at);
		var my_worked_hour = (my_row.worked_hour > 0) ? my_row.worked_hour : '';
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"		>' + my_checkbox			+ '</td>'
				+  '<td class="jky-opened-at"		>' + my_row.id			+ '</td>'
				+  '<td class="jky-worked-hour"		>' + my_row.created_by		+ '</td>'
				+  '<td class="jky-priority"		>' + my_row.created_at		+ '</td>'
				+  '<td class="jky-category"		>' + my_row.parent_name		+ '</td>'
				+  '<td class="jky-description"		>' + my_row.parent_id		+ '</td>'
				+  '<td class="jky-description"		>' + my_row.method		+ '</td>'
				+  '<td class="jky-description"		>' + my_row.history		+ '</td>'
				+  '</tr>'
				;
	}
	JKY.set_html('jky-app-index', jky_index);
	JKY.set_html('jky-app-count', jky_count);
	JKY.set_html('jky-table-body', my_html );
	JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
	JKY.hide('jky-loading');
}

JKY.display_form = function(index) {
	if (JKY.skip_form) {
		JKY.skip_form = false;
		return;
	}
//	JKY.show('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.show('jky-action-add-new'	);
	JKY.hide('jky-action-print'		);
	JKY.show('jky-action-save'		);
	JKY.show('jky-action-copy'		);
	JKY.show('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
	JKY.show('jky-app-upload'		);
	JKY.display_row(index);
}

JKY.display_row = function(index) {
	JKY.show('jky-form-tabs');
	jky_index = index;
	JKY.row = JKY.get_row(jky_table, JKY.rows[index-1]['id']);
	JKY.rows[index-1] = JKY.row;
	JKY.set_html('jky-app-index', index);
	var my_time = JKY.get_time();

	var my_html = '';
	if (JKY.row.photo == null) {
		my_html = '<img id="jky-photo-img" src="/img/placeholder.png" class="the_icon" />';
	}else{
		my_html = '<a href="' + 'jky_download.php?file_name=tickets/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/tickets/' + JKY.row.id + '.' + JKY.row.photo + '?' + my_time + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-photo', my_html);

	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress', 'width', '0%');

	JKY.set_value	('jky-id'				, JKY.row.id);
	JKY.set_value	('jky-created-by'		, JKY.row.created_by);
	JKY.set_value	('jky-created-at'		, JKY.row.created_at);
	JKY.set_value	('jky-parent-name'		, JKY.row.parent_name);
	JKY.set_value	('jky-parent-id'		, JKY.row.parent_id);
	JKY.set_value	('jky-method'			, JKY.row.method);
	JKY.set_value	('jky-history'			, JKY.row.history);
	JKY.set_focus(jky_focus);
}

JKY.process_add_new = function() {
	JKY.hide('jky-form-tabs');
//	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.show('jky-app-add-new'		);
	JKY.hide('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.hide('jky-action-print'		);
	JKY.show('jky-action-save'		);
	JKY.hide('jky-action-copy'		);
	JKY.hide('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
	JKY.hide('jky-app-upload'		);
	JKY.display_new();
}

JKY.display_new = function() {
	jky_index = 0;
	JKY.set_option	('jky-status'			, 'Open');
	JKY.set_value	('jky-opened-by'		, JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-opened-value'		, JKY.get_now());
	JKY.set_value	('jky-worked-hour'		, 0 );
//	JKY.set_value	('jky-priority'			, 'Normal');
//	JKY.set_option	('jky-category'			, '');
	JKY.set_value	('jky-description'		, '');
	JKY.set_value	('jky-resolution'		, '');
	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_status		= JKY.get_value('jky-status');
	var my_worked_hour	= JKY.get_value('jky-worked-hour');
	var my_extra_set	= '';
	if (my_status != 'Closed' && my_worked_hour > 0) {
		my_extra_set = ''
				+    ', status = \'Closed\''
				+ ', closed_by = ' + JKY.Session.get_value('user_id')
				+ ', closed_at = NOW()'
				;
	}
	var my_set = ''
		+     'worked_hour=  ' + JKY.get_value	('jky-worked-hour'		)
		+      ', priority=\'' + JKY.get_value	('jky-priority'			) + '\''
		+      ', category=\'' + JKY.get_value	('jky-category'			) + '\''
		+   ', description=\'' + JKY.get_value	('jky-description'		) + '\''
		+    ', resolution=\'' + JKY.get_value	('jky-resolution'		) + '\''
		+ my_extra_set
		;
	return my_set;
}

JKY.process_save = function() {
	if (jky_index == 0) {
		JKY.process_insert();
	}else{
		JKY.process_update();
	}
}

JKY.process_insert = function() {
	var my_data =
		{ method: 'insert'
		, table :  jky_table
		, set	:  JKY.get_form_set()
		};
	JKY.ajax(false, my_data, JKY.process_insert_success);
}

JKY.process_insert_success = function(response) {
	JKY.display_trace('process_insert_success');
	JKY.display_message(response.message);
	JKY.load_table();
	JKY.display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
//	JKY.process_add_new();
}

JKY.process_update = function() {
	var my_where = 'id = ' + JKY.rows[jky_index-1]['id'];
	var my_data =
		{ method: 'update'
		, table :  jky_table
		, set	:  JKY.get_form_set()
		, where :  my_where
		};
	JKY.ajax(false, my_data, JKY.process_update_success);
}

JKY.process_update_success = function(response) {
	JKY.display_trace('process_update_success');
	JKY.display_message(response.message);
	JKY.rows[jky_index-1] = JKY.get_row(jky_table, JKY.rows[jky_index-1]['id']);
//	JKY.display_next();
	JKY.display_row(jky_index);
}

JKY.process_delete = function() {
	JKY.display_confirm(JKY.delete_confirmed, null, 'Delete', 'You requested to <b>delete</b> this record. <br>Are you sure?', 'Yes', 'No');
}

JKY.delete_confirmed = function() {
	var my_id = JKY.row.id;

	var my_data =
		{ method: 'delete'
		, table :  jky_table
		, where : 'id = ' + my_id
		};
	JKY.ajax(false, my_data, JKY.process_delete_success);
}

JKY.process_delete_success = function(response) {
	JKY.display_trace('process_delete_success');
	JKY.display_message(response.message);
	JKY.display_list();
}

JKY.process_cancel = function() {
	JKY.display_list();
}

/**
 * process print
 */
JKY.process_print = function() {
	if ($('#jky-app-form').css('display') == 'block') {
		JKY.print_row(JKY.row.id);
	}else{
		$('#jky-table-body .jky-checkbox input:checked').each(function() {
			JKY.print_row($(this).attr('row_id'));
		})
	}
};

JKY.print_row = function(the_id) {
	JKY.display_message('print_row: ' + the_id);
}

/**
 * process export
 */
JKY.process_export = function() {
	var my_sort_by = jky_sort_by;
	if (jky_sort_seq < 0 ) {
		my_sort_by += ' DESC';
	}
	JKY.run_export(jky_table, jky_select, jky_filter, jky_specific, my_sort_by);
};

$( function() {
//	upload photo -------------------------------------------------------------
	JKY.photo = new plupload.Uploader(
		{ browse_button	: 'jky-upload-photo'
		, runtimes		: 'html5,flash'
		, url			: 'plupload.php'
		, flash_swf_url	: 'swf/plupload.flash.swf'
		, filters		:[{title:"Photo files", extensions:"jpg,gif,png"}]
		}
	);

	JKY.photo.bind('Init', function(up, params) {});

	JKY.photo.bind('FilesAdded', function(up, files) {
		JKY.show('jky_loading');
		$.each(files, function(i, file) {
			JKY.set_html('jky-upload-name', file.name);
			JKY.saved_name = file.name;
			file.name = 'tickets.' + JKY.row.id + '.' + JKY.saved_name;
		});
		up.refresh();			//	reposition Flash/Silverlight
		setTimeout('JKY.photo.start()', 100);
	});

	JKY.photo.bind('UploadProgress', function(up, file) {
		JKY.set_html('jky-upload-percent', file.percent + '%');
		JKY.set_css ('jky-upload-progress', 'width', file.percent + '%');
	});

	JKY.photo.bind('FileUploaded', function(up, file) {
		JKY.display_message('File ' + JKY.saved_name + ' uploaded');
		JKY.set_html('jky-upload-percent', '100%');

		var my_file_name = $('#jky-upload-name').text();
		var my_file_size = file.size;
		var my_data = {command:'file_uploaded', file_name:my_file_name, file_size:my_file_size};
//		$.ajax({async:false, cache:true, type:'post', dataType:'json', url:'fuploads/ajax', data:my_data}).success(function(data) {});

		var my_data = {command:'end_upload'};
//		$.ajax({async:true , cache:true, type:'post', dataType:'json', url:'fuploads/ajax', data:my_data}).success(function(data) {});

		var my_file_type = JKY.get_file_type(JKY.saved_name);
		JKY.saved_name = JKY.row.id + '.' + my_file_type;
		var my_time = new Date();
		var my_html = '<a href="' + 'jky_download.php?file_name=tickets/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-photo-img"    src="/uploads/tickets/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
					;
		JKY.set_html('jky-download-photo', my_html);

		var my_data =
			{ method: 'update'
			, table :  jky_table
			, set	:  'photo=\'' + my_file_type + '\''
			, where :  'id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.hide('jky_loading');
	});

	JKY.photo.bind('Error', function(up, error) {
		JKY.show('jky_loading');
		JKY.display_message('error: ' + error.code + '<br>message: ' + error.message + (error.file ? '<br> file: ' + error.file.name : ''));
		up.refresh();			//	reposition Flash/Silverlight
	});

	JKY.photo.init();
});
