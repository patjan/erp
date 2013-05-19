"use strict";

/**
 * ftps.html
 */
var jky_program		= 'FTPs';
var jky_table		= 'FTPs';
var jky_select		= '';
var jky_focus		= 'jky-diameter';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'code';
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

var jky_count		=  0;
var jky_index		=  0;				//	0=Add New

JKY.rows		= [];
JKY.row 		= null;
JKY.materials	= [];
JKY.threads		= [];
JKY.loads		= [];
JKY.settings	= [];

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

		$('#jky-comp-add-new'		).click (function() {JKY.insert_composition	();});
		$('#jky-thread-add-new'		).click (function() {JKY.insert_thread		();});
		$('#jky-load-add-new'		).click (function() {JKY.insert_load		();});

		$('#jky-tab-threads'		).click (function() {JKY.display_threads	();});
		$('#jky-tab-loads'			).click (function() {JKY.display_loads		();});
		$('#jky-tab-settings'		).click (function() {JKY.display_settings	();});

		$('#jky-action-product'		).click (function() {JKY.display_product	();});
		$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
		$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);
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
		JKY.set_menu_active('jky-menu-production');
		JKY.set_side_active('jky-production-ftps');
		JKY.set_html('jky-machine'			, JKY.set_table_options('Machines', 'name', '', ''));
		JKY.set_html('jky-app-breadcrumb', JKY.t(jky_program));
		JKY.display_list();
//		JKY.display_form(1);
		JKY.show('jky-side-production'	);
		JKY.show('jky-app-header'		);
		JKY.materials	= JKY.get_configs('Materials');
		JKY.threads		= JKY.get_ids	 ('Threads'  );
		JKY.settings	= JKY.get_configs('Settings' );
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
	JKY.show('jky-action-print'		);
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
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"		>' + my_checkbox			+ '</td>'
				+  '<td class="jky-code"			>' + my_row.code			+ '</td>'
				+  '<td class="jky-product"			>' + my_row.product			+ '</td>'
				+  '<td class="jky-machine"			>' + my_row.machine			+ '</td>'
				+  '<td class="jky-composition"		>' + my_row.composition		+ '</td>'
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
	JKY.show('jky-action-print'		);
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
	if (JKY.row.draw == null) {
		my_html = '<img id="jky-drawing-img" src="/img/placeholder.png" class="the_icon" />';
	}else{
		my_html = '<a href="' + 'jky_download.php?file_name=ftp_draws/' + JKY.row.id + '.' + JKY.row.draw + '">'
				+ '<img id="jky-drawing-img"  src="/uploads/ftp_draws/' + JKY.row.id + '.' + JKY.row.draw + '?' + my_time + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-drawing', my_html);

	if (JKY.row.photo == null) {
		my_html = '<img id="jky-photo-img" src="/img/placeholder.png" class="the_icon" />';
	}else{
		my_html = '<a href="' + 'jky_download.php?file_name=ftp_photos/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + JKY.row.id + '.' + JKY.row.photo + '?' + my_time + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-photo', my_html);

	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress', 'width', '0%');

	JKY.set_value	('jky-code'				, JKY.row.code			);
	JKY.set_value	('jky-product-id'		, JKY.row.product_id	);
	JKY.set_value	('jky-product'			, JKY.row.product		);
	JKY.set_value	('jky-composition'		, JKY.row.composition	);
	JKY.set_option	('jky-machine'			, JKY.row.machine_id	);
	JKY.set_value	('jky-diameter'			, JKY.row.diameter		);
	JKY.set_value	('jky-density'			, JKY.row.density		);
	JKY.set_value	('jky-inputs'			, JKY.row.inputs		);
	JKY.set_value	('jky-speed'			, JKY.row.speed			);
	JKY.set_value	('jky-turns'			, JKY.row.turns			);
	JKY.set_value	('jky-weight'			, JKY.row.weight		);
	JKY.set_value	('jky-width'			, JKY.row.width			);
	JKY.set_value	('jky-lanes'			, JKY.row.lanes			);
	JKY.set_value	('jky-yield'			, JKY.row.yield			);
	JKY.set_value	('jky-needling'			, JKY.row.needling		);
	JKY.set_value	('jky-peso'				, JKY.row.peso			);
	JKY.set_radio	('jky-has-break'		, JKY.row.has_break		);
	JKY.set_focus(jky_focus);
	JKY.display_composition();
	JKY.display_threads();
	JKY.display_loads();
	JKY.display_settings();
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
	JKY.set_value	('jky-code'				,  JKY.t('New'));
	JKY.set_value	('jky-product-id'		,  0);
	JKY.set_value	('jky-product'			, '');
	JKY.set_value	('jky-composition'		, '');
	JKY.set_option	('jky-machine'			,  null);
	JKY.set_value	('jky-diameter'			, '0');
	JKY.set_value	('jky-density'			, '0');
	JKY.set_value	('jky-inputs'			, '0');
	JKY.set_value	('jky-speed'			, '0');
	JKY.set_value	('jky-turns'			, '0');
	JKY.set_value	('jky-weight'			, '0');
	JKY.set_value	('jky-width'			, '0');
	JKY.set_value	('jky-lanes'			, '0');
	JKY.set_value	('jky-yield'			, '0');
	JKY.set_value	('jky-needling'			, '0');
	JKY.set_value	('jky-peso'				, '12.5');
	JKY.set_radio	('jky-has-break'		, 'No');
	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_machine = JKY.get_value('jky-machine');
	my_machine = (my_machine == '') ? 'null' : my_machine;

	var my_set = ''
		+      'product_id=  ' + JKY.get_value	('jky-product-id'		)
		+    ', machine_id=  ' + my_machine
		+      ', diameter=  ' + JKY.get_value	('jky-diameter'			)
		+       ', density=  ' + JKY.get_value	('jky-density'			)
		+        ', inputs=  ' + JKY.get_value	('jky-inputs'			)
		+         ', speed=  ' + JKY.get_value	('jky-speed'			)
		+         ', turns=  ' + JKY.get_value	('jky-turns'			)
		+        ', weight=  ' + JKY.get_value	('jky-weight'			)
		+         ', width=  ' + JKY.get_value	('jky-width'			)
		+         ', lanes=  ' + JKY.get_value	('jky-lanes'			)
		+         ', yield=  ' + JKY.get_value	('jky-yield'			)
		+      ', needling=  ' + JKY.get_value	('jky-needling'			)
		+		   ', peso=  ' + JKY.get_value	('jky-peso'				)
		+     ', has_break=\'' + JKY.get_checked('jky-has-break'		) + '\''
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
		{ method: 'delete_many'
		, table : 'FTP_Sets'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Loads'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Threads'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

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
//window.print();
	var my_html = ''
		+ "<table id='jky-form-data'>"
		+ "<tr class='jky-form-line'><td class='jky-form-label'><span>			  Code</span>:</td><td><input  id='jky-code'			class='jky-form-value'									readonly='readonly'	/></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-form-label'><span>          Product</span>:</td>"
		+ "<td><input  id='jky-product-id' type='hidden' />"
		+ "<input  id='jky-product' class='jky-form-value' placeholder='Product Name' readonly='readonly' />"
		+ "<a id='jky-action-product'><i class='icon-share'></i></a>"
		+ "</td>"
		+ "</tr>"
		+ "<tr class='jky-form-line'><td class='jky-form-label'><span>      Composition</span>:</td><td><input  id='jky-composition'	class='jky-form-value'									readonly='readonly'	/></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-form-label'><span>          Machine</span>:</td><td><select id='jky-machine'></select></td></tr>"
		+ "<tr class='jky-form-line'>&nbsp;</tr>"
		+ "<tr class='jky-form-line'>&nbsp;</tr>"
		+ "</table>"
		+ "<table class='jky-left'>"
		+ "<tr class='jky-left'>"
		+ "<td id='jky-download-drawing'></td>"
		+ "<td><a id='jky-upload-drawing'><span>Upload Drawing</span></a></td>"
		+ "</tr>"
		+ "<tr class='jky-left'>"
		+ "<td id='jky-download-photo'  ></td>"
		+ "<td><a id='jky-upload-photo'  ><span>Upload Photo  </span></a></td>"
		+ "</tr>"
		+ "<tr class='jky-clear'></tr>"
		+ "<tr>"
		+ "<td>"
		+ "<span>Progress</span>:"
		+ "<span id='jky-upload-percent'></span>"
		+ "<span id='jky-upload-name'></span>"
		+ "</td>"
		+ "<td class='progress progress-striped active'></td><td id='jky-upload-progress' class='bar'></td>"
		+ "</tr>"
		+ "</table>"
		;
	JKY.set_html('jky-printable', my_html);
	$("#jky-printable").print();
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
//	upload drawing -------------------------------------------------------------
	JKY.drawing = new plupload.Uploader(
		{ browse_button	: 'jky-upload-drawing'
		, runtimes		: 'html5,flash'
		, url			: 'plupload.php'
		, flash_swf_url	: 'swf/plupload.flash.swf'
		, filters		:[{title:"Drawing files", extensions:"avi,jpg,gif,png,xls"}]
		}
	);

	JKY.drawing.bind('Init', function(up, params) {});

	JKY.drawing.bind('FilesAdded', function(up, files) {
		JKY.show('jky_loading');
		$.each(files, function(i, file) {
			JKY.set_html('jky-upload-name', file.name);
			JKY.saved_name = file.name;
			file.name = 'ftp_draws.' + JKY.row.id + '.' + JKY.saved_name;
		});
		up.refresh();			//	reposition Flash/Silverlight
		setTimeout('JKY.drawing.start()', 100);
	});

	JKY.drawing.bind('UploadProgress', function(up, file) {
		JKY.set_html('jky-upload-percent', file.percent + '%');
		JKY.set_css ('jky-upload-progress', 'width', file.percent + '%');
	});

	JKY.drawing.bind('FileUploaded', function(up, file) {
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
		var my_html = '<a href="' + 'jky_download.php?file_name=ftp_draws/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-drawing-img"  src="/uploads/ftp_draws/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
		JKY.set_html('jky-download-drawing', my_html);

		var my_data =
			{ method: 'update'
			, table :  jky_table
			, set	:  'draw=\'' + my_file_type + '\''
			, where :  'id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.hide('jky_loading');
	});

	JKY.drawing.bind('Error', function(up, error) {
		JKY.show('jky_loading');
		JKY.display_message('error: ' + error.code + '<br>message: ' + error.message + (error.file ? '<br> file: ' + error.file.name : ''));
		up.refresh();			//	reposition Flash/Silverlight
	});

	JKY.drawing.init();

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
			file.name = 'ftp_photos.' + JKY.row.id + '.' + JKY.saved_name;
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
		var my_html = '<a href="' + 'jky_download.php?file_name=ftp_photos/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
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
