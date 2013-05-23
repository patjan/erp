"use strict";

/**
 * customers.html
 */
var jky_program		= 'Customers';
var jky_table		= 'Contacts';
var jky_select		= '';
var jky_focus		= 'jky-full-name';
var jky_filter		= '';
var jky_specific	= 'is_customer';
var jky_sort_by		= 'full_name';
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

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
		$('#jky-action-reset'		).click (function() {JKY.reset_user			();});
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

		$('#jky-is-company'			).click	(function() {JKY.display_company(this);});
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
		JKY.set_menu_active('jky-menu-sales');
		JKY.set_side_active('jky-sales-customers');
		JKY.set_html('jky-state'			, JKY.set_group_set('Configs', '', 'States'   ));
		JKY.set_html('jky-country'			, JKY.set_group_set('Configs', '', 'Countries'));
		JKY.set_html('jky-app-breadcrumb', JKY.t(jky_program));
		JKY.display_list();
//		JKY.display_form(1);
		JKY.hide('jky-action-export'	);
		JKY.show('jky-side-sales'		);
		JKY.show('jky-app-header'		);
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
//	JKY.hide('jky-action-copy'		);
//	JKY.hide('jky-action-delete'	);
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
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"		>' + my_checkbox			+ '</td>'
				+  '<td class="jky-full-name"		>' + my_row.full_name		+ '</td>'
				+  '<td class="jky-phone"			>' + my_row.phone			+ '</td>'
				+  '<td class="jky-mobile"			>' + my_row.mobile			+ '</td>'
				+  '<td class="jky-email"			>' + my_row.email			+ '</td>'
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
	JKY.hide('jky-action-reset'		);
	JKY.hide('jky-action-copy'		);
	JKY.hide('jky-action-delete'	);
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

	var my_html = '';
	if (JKY.row.photo == null) {
		my_html = '<img id="jky-photo-img" src="/img/placeholder.png" class="the_icon" />';
	}else{
		my_html = '<a href="' + 'jky_download.php?file_name=products/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/products/' + JKY.row.id + '.' + JKY.row.photo + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-photo', my_html);

	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress', 'width', '0%');

	JKY.set_value	('jky-full-name'		, JKY.row.full_name		);
	JKY.set_yes		('jky-is-company'		, JKY.row.is_company	);
	JKY.set_option	('jky-company-name'		, JKY.row.company_name	);
	JKY.set_option	('jky-company-tag'		, JKY.row.company_tag	);

	JKY.set_value	('jky-street1'			, JKY.row.street1		);
	JKY.set_value	('jky-street2'			, JKY.row.street2		);
	JKY.set_value	('jky-city'				, JKY.row.city			);
	JKY.set_value	('jky-zip'				, JKY.row.zip			);
	JKY.set_option	('jky-state'			, JKY.row.state			);
	JKY.set_option	('jky-country'			, JKY.row.country		);
	JKY.set_value	('jky-website'			, JKY.row.website		);
	JKY.set_value	('jky-cnpj'				, JKY.row.cnpj			);
	JKY.set_value	('jky-ie'				, JKY.row.ie			);

	JKY.set_value	('jky-position'			, JKY.row.position		);
	JKY.set_value	('jky-phone'			, JKY.row.phone			);
	JKY.set_value	('jky-mobile'			, JKY.row.mobile		);
	JKY.set_value	('jky-fax'				, JKY.row.fax			);
	JKY.set_value	('jky-email'			, JKY.row.email			);

	setTimeout(function() {JKY.display_company($('#jky-is-company'));}, 100);
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
	JKY.hide('jky-action-reset'		);
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
	JKY.set_option	('jky-status'			, 'Active');
	JKY.set_value	('jky-full-name'		, '');
	JKY.set_yes		('jky-is-company'		, 'No');
	JKY.set_option	('jky-company-name'		, '');
	JKY.set_option	('jky-company-tag'		, '');

	JKY.set_value	('jky-street1'			, '');
	JKY.set_value	('jky-street2'			, '');
	JKY.set_value	('jky-city'				, '');
	JKY.set_value	('jky-zip'				, '');
	JKY.set_option	('jky-state'			, 'SP');
	JKY.set_option	('jky-country'			, 'Brasil');
	JKY.set_value	('jky-website'			, '');
	JKY.set_value	('jky-cnpj'				, '');
	JKY.set_value	('jky-ie'				, '');

	JKY.set_value	('jky-position'			, '');
	JKY.set_value	('jky-phone'			, '');
	JKY.set_value	('jky-mobile'			, '');
	JKY.set_value	('jky-fax'				, '');
	JKY.set_value	('jky-email'			, '');

	setTimeout(function() {JKY.display_company($('#jky-is-company'));}, 100);
	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_set = ''
		+       'full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + JKY.get_value	('jky-is-company'		) + '\''
//		+  ', company_name=\'' + JKY.get_value	('jky-company-name'		) + '\''
//		+   ', company_tag=\'' + JKY.get_value	('jky-company-tag'		) + '\''

		+       ', street1=\'' + JKY.get_value	('jky-street1'			) + '\''
		+       ', street2=\'' + JKY.get_value	('jky-street2'			) + '\''
		+          ', city=\'' + JKY.get_value	('jky-city'				) + '\''
		+           ', zip=\'' + JKY.get_value	('jky-zip'				) + '\''
		+         ', state=\'' + JKY.get_value	('jky-state'			) + '\''
		+       ', country=\'' + JKY.get_value	('jky-country'			) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'			) + '\''
		+       ', cnpj=\''	   + JKY.get_value	('jky-cnpj'				) + '\''
		+       ', ie=\''	   + JKY.get_value	('jky-ie'				) + '\''

		+      ', position=\'' + JKY.get_value	('jky-position'			) + '\''
		+         ', phone=\'' + JKY.get_value	('jky-phone'			) + '\''
		+        ', mobile=\'' + JKY.get_value	('jky-mobile'			) + '\''
		+           ', fax=\'' + JKY.get_value	('jky-fax'				) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
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
	var my_set  = ', is_customer = \'Yes\'';
	var my_data =
		{ method: 'insert'
		, table :  jky_table
		, set	:  JKY.get_form_set() + my_set
		};
	JKY.ajax(false, my_data, JKY.process_insert_success);
}

JKY.process_insert_success = function(response) {
	JKY.display_trace('process_insert_success');
	JKY.display_message(response.message);
	JKY.load_table();
//	JKY.display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
	JKY.process_add_new();
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
 * process export
 */
JKY.process_export = function() {
	var my_sort_by = jky_sort_by;
	if (jky_sort_seq < 0 ) {
		my_sort_by += ' DESC';
	}
	JKY.run_export(jky_table, jky_select, jky_filter, jky_specific, my_sort_by);
};

/**
 * only used on [Contacts]
 */
JKY.display_company = function(the_id) {
	if ($(the_id).is(':checked')) {
		JKY.hide('jky-company-name' );
		JKY.hide('jky-position-line');
		JKY.show('jky-website-line' );
		JKY.show('jky-cnpj-line'	);
		JKY.hide('jky-ie-line'		);

	}else{
		JKY.show('jky-company-name' );
		JKY.show('jky-position-line');
		JKY.hide('jky-website-line' );
		JKY.hide('jky-cnpj-line'	);
		JKY.show('jky-ie-line'		);
	}
}

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
			file.name = 'products.' + JKY.row.id + '.' + JKY.saved_name;
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
		var my_html = '<a href="' + 'jky_download.php?file_name=products/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-photo-img"    src="/uploads/products/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
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
