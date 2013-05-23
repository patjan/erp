"use strict";

/**
 * models.html
 */
var jky_program		= 'Models';
var jky_table		= 'Models';
var jky_select		= '';
var jky_focus		= 'jky-name';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'name';
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

var jky_count		=  0;
var jky_index		=  0;				//	0=Add New

JKY.rows		= [];
JKY.row 		= null;
JKY.materials	= [];
JKY.threads		= [];
JKY.loads		= [];
JKY.settings	= [];
JKY.languages	= [];
JKY.today		= JKY.get_now();

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

		$('#jky-comp-add-new'		).click (function() {JKY.insert_composition	();});
		$('#jky-thread-add-new'		).click (function() {JKY.insert_thread		();});
		$('#jky-load-add-new'		).click (function() {JKY.insert_load		();});

		$('#jky-tab-threads'		).click (function() {JKY.display_threads	();});
		$('#jky-tab-loads'			).click (function() {JKY.display_loads		();});
		$('#jky-tab-settings'		).click (function() {JKY.display_settings	();});

		$('#jky-action-product'		).click (function() {JKY.display_product	();});
		$('#jky-search-add-new'		).click (function()	{JKY.add_new_product	();});
		$('#jky-search-filter'		).KeyUpDelay(JKY.filter_product);

		$('#jky-start-date'			).datepicker();
		$('#jky-purchase-date'		).datepicker();
		$('#jky-repair-date'		).datepicker();
		$('#jky-return-date'		).datepicker();
		$('#jky-cylinder-add-new'	).click (function() {JKY.insert_cylinder	();});

		$('#jky-user-name'			).change(function() {JKY.verify_user_name	();});
		$('#jky-save-address'		).click (function() {JKY.save_address		();});
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
		JKY.set_menu_active('jky-menu-production');
		JKY.set_menu_active('jky-menu-help');
		JKY.set_menu_active('jky-menu-admin');
		JKY.set_menu_active('jky-menu-support');

		JKY.set_side_active('jky-sales-customers');
		JKY.set_side_active('jky-production-ftps');
		JKY.set_side_active('jky-production-threads');
		JKY.set_side_active('jky-production-machines');
		JKY.set_side_active('jky-production-products');
		JKY.set_side_active('jky-production-suppliers');
		JKY.set_side_active('jky-help-tickets');
		JKY.set_side_active('jky-admin-configs');
		JKY.set_side_active('jky-admin-contacts');
		JKY.set_side_active('jky-support-controls');
		JKY.set_side_active('jky-support-permissions');
		JKY.set_side_active('jky-support-templates');
		JKY.set_side_active('jky-support-translations');

		JKY.set_html('jky-app-select'		, JKY.set_group_set('Controls', jky_select, 'Ticket Status Codes', 'All'));

		JKY.set_html('jky-state'			, JKY.set_group_set('Configs', '', 'States'   ));
		JKY.set_html('jky-country'			, JKY.set_group_set('Configs', '', 'Countries'));
		JKY.set_html('jky-machine'			, JKY.set_table_options('Machines', 'name', '', ''));
		JKY.set_html('jky-machine-brand'	, JKY.set_group_set('Configs', '', 'Machine Brands'		));
		JKY.set_html('jky-machine-family'	, JKY.set_group_set('Configs', '', 'Machine Families'	));
		JKY.set_html('jky-machine-brand'	, JKY.set_group_set('Configs', '', 'Machine Brands'		));
		JKY.set_html('jky-status'			, JKY.set_group_set('Controls', 'Active', 'Status Codes' ));
		JKY.set_html('jky-user-role'		, JKY.set_group_set('Controls', '', 'User Roles'		));
		JKY.set_html('jky-user-resource'	, JKY.set_group_set('Controls', '', 'User Resources'	));
		JKY.set_html('jky-user-action'		, JKY.set_group_set('Controls', '', 'User Actions'	));
		JKY.set_html('jky-app-select'		, JKY.set_group_set('Configs' , jky_select, 'Root'));
		JKY.set_html('jky-status'			, JKY.set_group_set('Controls', 'Active', 'Status Codes' ));
		JKY.set_html('jky-user-role'		, JKY.set_group_set('Controls', '', 'User Roles'));
		JKY.set_html('jky-state'			, JKY.set_group_set('Configs' , '', 'States'	));
		JKY.set_html('jky-country'			, JKY.set_group_set('Configs' , '', 'Countries'	));
		JKY.set_html('jky-user-role'		, JKY.set_group_set('Controls', '', 'User Roles'	));
		JKY.set_html('jky-app-select'		, JKY.set_group_set(jky_table , jky_select, 'Root'));
		JKY.set_html('jky-status'			, JKY.set_group_set('Controls', 'Active', 'Status Codes' ));
		JKY.set_html('jky-user-role'		, JKY.set_group_set('Controls', '', 'User Roles'	));
		JKY.set_html('jky-user-resource'	, JKY.set_group_set('Controls', '', 'User Resources'));
		JKY.set_html('jky-user-action'		, JKY.set_group_set('Controls', '', 'User Actions'	));
		JKY.set_html('jky-priority'			, JKY.set_group_set('Controls', '', 'Priorities'			));
		JKY.set_html('jky-category'			, JKY.set_group_set('Controls', '', 'Ticket Categories'		));
		JKY.set_html('jky-thread-groups' , JKY.set_group_set('Configs', '', 'Thread Groups'		 , ''));
		JKY.set_html('jky-compositions'	 , JKY.set_group_set('Configs', '', 'Thread Compositions', ''));
		JKY.set_html('jky-app-breadcrumb', JKY.t(jky_program));
		JKY.display_list();
//		JKY.display_form(1);
		JKY.hide('jky-action-export'	);
		JKY.show('jky-side-sales'		);
		JKY.show('jky-side-production'	);
		JKY.show('jky-side-help'		);
		JKY.show('jky-side-admin'		);
		JKY.show('jky-side-support'		);
		JKY.show('jky-app-header'		);
		setTimeout(function() {JKY.set_option('jky-app-select', jky_select);}, 100);
		JKY.materials	= JKY.get_configs('Materials');
		JKY.threads		= JKY.get_ids	 ('Threads'  );
		JKY.settings	= JKY.get_configs('Settings' );
		JKY.languages	= JKY.get_controls('Languages');
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
		var my_start_date   = JKY.fix_ymd2dmy(my_row.start_date);
		var my_created_date = JKY.short_date(my_row.created_at);
		var my_updated_date = JKY.short_date(my_row.updated_at);
		var my_opened_date = JKY.short_date(my_row.opened_at);
		var my_worked_hour = (my_row.worked_hour > 0) ? my_row.worked_hour : '';
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"		>' + my_checkbox			+ '</td>'
				+  '<td class="jky-sequence"		>' + my_row.sequence		+ '</td>'
				+  '<td class="jky-name"			>' + my_row.name			+ '</td>'
				+  '<td class="jky-value"			>' + my_row.value			+ '</td>'
				+  '<td class="jky-status"			>' + my_row.status			+ '</td>'

				+  '<td class="jky-full-name"		>' + my_row.full_name		+ '</td>'
				+  '<td class="jky-phone"			>' + my_row.phone			+ '</td>'
				+  '<td class="jky-mobile"			>' + my_row.mobile			+ '</td>'
				+  '<td class="jky-email"			>' + my_row.email			+ '</td>'

				+  '<td class="jky-number"			>' + my_row.number			+ '</td>'
				+  '<td class="jky-product"			>' + my_row.product			+ '</td>'
				+  '<td class="jky-machine"			>' + my_row.machine			+ '</td>'
				+  '<td class="jky-composition"		>' + my_row.composition		+ '</td>'
				+  '<td class="jky-product-type"	>' + my_row.product_type	+ '</td>'

				+  '<td class="jky-name"			>' + my_row.name			+ '</td>'
				+  '<td class="jky-diameter"		>' + my_row.diameter		+ '</td>'
				+  '<td class="jky-width"			>' + my_row.width			+ '</td>'
				+  '<td class="jky-density"			>' + my_row.density			+ '</td>'
				+  '<td class="jky-inputs"			>' + my_row.inputs			+ '</td>'
				+  '<td class="jky-lanes"			>' + my_row.lanes			+ '</td>'

				+  '<td class="jky-code"			>' + my_row.code			+ '</td>'
				+  '<td class="jky-name"			>' + my_row.name			+ '</td>'
				+  '<td class="jky-thread_group"	>' + my_row.thread_group	+ '</td>'
				+  '<td class="jky-thread_color"	>' + my_row.thread_color	+ '</td>'
				+  '<td class="jky-composition"		>' + my_row.composition		+ '</td>'

				+  '<td class="jky-user-role"		>' + my_row.user_role		+ '</td>'
				+  '<td class="jky-user-resource"	>' + my_row.user_resource	+ '</td>'
				+  '<td class="jky-user-action"		>' + my_row.user_action		+ '</td>'
				+  '<td class="jky-status"			>' + my_row.status			+ '</td>'

				+  '<td class="jky-full-name"		>' + my_row.full_name		+ '</td>'
				+  '<td class="jky-mobile"			>' + my_row.mobile			+ '</td>'
				+  '<td class="jky-email"			>' + my_row.email			+ '</td>'
				+  '<td class="jky-user-name"		>' + my_row.user_name		+ '</td>'
				+  '<td class="jky-user-role"		>' + my_row.user_role		+ '</td>'

				+  '<td class="jky-sentence"		>' + my_row.sentence		+ '</td>'
				+  '<td class="jky-start-date"		>' + my_start_date			+ '</td>'
				+  '<td class="jky-created-at"		>' + my_created_date		+ '</td>'
				+  '<td class="jky-updated-at"		>' + my_updated_date		+ '</td>'
				+  '<td class="jky-status"			>' + my_row.status			+ '</td>'

				+  '<td class="jky-opened-at"		>' + my_opened_date			+ '</td>'
				+  '<td class="jky-worked-hour"		>' + my_worked_hour			+ '</td>'
				+  '<td class="jky-priority"		>' + my_row.priority		+ '</td>'
				+  '<td class="jky-category"		>' + my_row.category		+ '</td>'
				+  '<td class="jky-description"		>' + my_row.description		+ '</td>'
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
	JKY.show('jky-action-copy'		);
	JKY.show('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
	JKY.hide('jky-app-upload'		);
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
		my_html = '<a href="' + 'jky_download.php?file_name=contacts/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/contacts/' + JKY.row.id + '.' + JKY.row.photo + '" class="the_icon" />';
				+ '</a>'
				;
		my_html = '<a href="' + 'jky_download.php?file_name=ftp_photos/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + JKY.row.id + '.' + JKY.row.photo + '?' + my_time + '" class="the_icon" />';
				+ '</a>'
				;
		my_html = '<a href="' + 'jky_download.php?file_name=tickets/' + JKY.row.id + '.' + JKY.row.photo + '">'
				+ '<img id="jky-photo-img"    src="/uploads/tickets/' + JKY.row.id + '.' + JKY.row.photo + '?' + my_time + '" class="the_icon" />';
				+ '</a>'
				;
	}
	JKY.set_html('jky-download-photo', my_html);

	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress', 'width', '0%');

	JKY.set_option	('jky-status'			, JKY.row.status		);
	JKY.set_value	('jky-sequence'			, JKY.row.sequence		);
	JKY.set_value	('jky-name'				, JKY.row.name			);
	JKY.set_value	('jky-value'			, JKY.row.value			);

	JKY.set_value	('jky-first-name'		, JKY.row.first_name	);
	JKY.set_value	('jky-last-name'		, JKY.row.last_name		);
	JKY.set_value	('jky-mobile'			, JKY.row.mobile		);
	JKY.set_value	('jky-email'			, JKY.row.email			);

	JKY.set_value	('jky-full-name'		, JKY.row.full_name		);
	JKY.set_yes		('jky-is-company'		, JKY.row.is_company	);
	JKY.set_option	('jky-company-name'		, JKY.row.company_name	);
	JKY.set_option	('jky-company-tag'		, JKY.row.company_tag	);
	JKY.set_value	('jky-user-name'		, JKY.row.user_name		);
	JKY.set_value	('jky-user-role'		, JKY.row.user_role		);
	JKY.set_photo	('jky-photo-src'		, JKY.row.photo			);

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

	JKY.set_value	('jky-number'			, JKY.row.number		);
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

	JKY.set_value	('jky-name'				, JKY.row.name			);
	JKY.set_radio	('jky-machine-type'		, JKY.row.machine_type	);
	JKY.set_radio	('jky-product-type'		, JKY.row.product_type	);
	JKY.set_option	('jky-machine-family'	, JKY.row.machine_family);
	JKY.set_option	('jky-machine-brand'	, JKY.row.machine_brand	);
	JKY.set_value	('jky-serial-number'	, JKY.row.serial_number	);
	JKY.set_value	('jky-diameter'			, JKY.row.diameter		);
	JKY.set_value	('jky-width'			, JKY.row.width			);
	JKY.set_value	('jky-density'			, JKY.row.density		);
	JKY.set_value	('jky-inputs'			, JKY.row.inputs		);
	JKY.set_value	('jky-lanes'			, JKY.row.lanes			);
	JKY.set_value	('jky-purchase-value'	, JKY.fix_ymd2dmy(JKY.row.purchase_date	));
	JKY.set_value	('jky-repair-value'		, JKY.fix_ymd2dmy(JKY.row.repair_date	));
	JKY.set_value	('jky-return-value'		, JKY.fix_ymd2dmy(JKY.row.return_date	));
	JKY.set_value	('jky-start-value'		, JKY.fix_ymd2dmy(JKY.row.start_date	));

	JKY.set_value	('jky-code'				, JKY.row.code			);
	JKY.set_radio	('jky-machine-type'		, JKY.row.machine_type	);
	JKY.set_option	('jky-machine-brand'	, JKY.row.machine_brand	);
	JKY.set_value	('jky-name'				, JKY.row.name			);
	JKY.set_option	('jky-thread-groups'	, JKY.row.thread_group	);
	JKY.set_value	('jky-thread-color'		, JKY.row.thread_color	);
	JKY.set_option	('jky-compositions'		, JKY.row.composition	);

	JKY.set_option	('jky-status'			, JKY.row.status		);
	JKY.set_value	('jky-user-role'		, JKY.row.user_role		);
	JKY.set_value	('jky-user-resource'	, JKY.row.user_resource	);
	JKY.set_value	('jky-user-action'		, JKY.row.user_action	);

	JKY.set_value	('jky-opened-at'		, JKY.short_date(JKY.row.opened_at));
	JKY.set_value	('jky-opened-by'		, JKY.row.opened_name	);
	JKY.set_value	('jky-assigned-at'		, JKY.short_date(JKY.row.assigned_at));
	JKY.set_value	('jky-assigned-to'		, JKY.row.assigned_name	);
	JKY.set_value	('jky-closed-at'		, JKY.short_date(JKY.row.closed_at));
	JKY.set_value	('jky-closed-by'		, JKY.row.closed_name	);
	JKY.set_value	('jky-worked-hour'		, JKY.row.worked_hour	);
	JKY.set_value	('jky-priority'			, JKY.row.priority		);
	JKY.set_value	('jky-category'			, JKY.row.category		);
	JKY.set_value	('jky-description'		, JKY.row.description	);
	JKY.set_value	('jky-resolution'		, JKY.row.resolution	);

	setTimeout(function() {JKY.display_company($('#jky-is-company'));}, 100);

	if (JKY.is_empty(JKY.row.user_id)) {
		JKY.hide('jky-action-reset');
	}else{
		JKY.show('jky-action-reset');
	}

	if (jky_select == 'Root' && JKY.row.name == 'Root') {
		JKY.hide('jky-action-save'		);
		JKY.hide('jky-action-copy'		);
		JKY.hide('jky-action-delete'	);
		JKY.hide('jky-action-cancel'	);
	}else{
		JKY.show('jky-action-save'		);
		JKY.show('jky-action-copy'		);
		JKY.show('jky-action-delete'	);
		JKY.show('jky-action-cancel'	);
	}

	var my_rows = JKY.get_rows(jky_table, JKY.rows[index-1]['id']);
	var my_html = '';
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale   = JKY.languages[l].name ;
		var my_language = JKY.languages[l].value;
		var my_sentence = '';
		for(var n=0; n<my_rows.length; n++) {
			var my_row = my_rows[n];
			if (my_row.locale == 'en_us') {
				JKY.row_id = my_row.id;
				JKY.set_option('jky_status', my_row.status);
			}
			if (my_row.locale == my_locale) {
				my_sentence = my_row.sentence;
			}
		}
		my_html += '<div class="jky-form-line">'
				+  '<div class="jky-form-label">' + my_language + ':</div>'
				+  '<div class="jky-form-value"><input id="' + my_locale + '" value="' + my_sentence + '" /></div>'
				+  '</div>'
				;
	}
	JKY.set_html('jky-locales', my_html);
	JKY.set_focus(jky_focus);
	JKY.display_composition();
	JKY.display_threads();
	JKY.display_loads();
	JKY.display_settings();
	JKY.display_cylinders();
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
	JKY.set_value	('jky-sequence'			, 50);
	JKY.set_value	('jky-name'				, '');
	JKY.set_value	('jky-value'			, '');

	JKY.set_value	('jky-first-name'		, '');
	JKY.set_value	('jky-last-name'		, '');
	JKY.set_value	('jky-mobile'			, '');
	JKY.set_value	('jky-email'			, '');

	JKY.set_value	('jky-full-name'		, '');
	JKY.set_yes		('jky-is-company'		, 'No');
	JKY.set_option	('jky-company-name'		, '');
	JKY.set_option	('jky-company-tag'		, '');
	JKY.set_value	('jky-user-name'		, '');
	JKY.set_value	('jky-user-role'		, '');

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

	JKY.set_value	('jky-number'			,  JKY.t('New'));
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

	JKY.set_value	('jky-name'				, '' );
	JKY.set_radio	('jky-machine-type'		,  JKY.t('Circular'));
	JKY.set_radio	('jky-product-type'		,  JKY.t('Tubular'));
	JKY.set_option	('jky-machine-family'	, '' );
	JKY.set_option	('jky-machine-brand'	, '' );
	JKY.set_value	('jky-serial-number'	, '' );
	JKY.set_value	('jky-diameter'			, '0');
	JKY.set_value	('jky-width'			, '0');
	JKY.set_value	('jky-density'			, '0');
	JKY.set_value	('jky-inputs'			, '0');
	JKY.set_value	('jky-lanes'			, '0');
	JKY.set_value	('jky-start-value'		, '' );
	JKY.set_value	('jky-purchase-value'	, '' );
	JKY.set_value	('jky-repair-value'		, '' );
	JKY.set_value	('jky-return-value'		, '' );

	JKY.set_value	('jky-code'				, '' );
	JKY.set_value	('jky-name'				, '' );
	JKY.set_option	('jky-thread-groups'	, '' );
	JKY.set_value	('jky-thread-color'		, '0');
	JKY.set_option	('jky-compositions'		, '0');

	JKY.set_value	('jky-user-role'		, '');
	JKY.set_value	('jky-user-resource'	, '');
	JKY.set_value	('jky-user-action'		, '');

	JKY.set_option	('jky-status'			, 'Open');
	JKY.set_value	('jky-opened-by'		, JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-opened-value'		, JKY.get_now());
	JKY.set_value	('jky-worked-hour'		, 0 );
//	JKY.set_value	('jky-priority'			, 'Normal');
//	JKY.set_option	('jky-category'			, '');
	JKY.set_value	('jky-description'		, '');
	JKY.set_value	('jky-resolution'		, '');

	setTimeout(function() {JKY.display_company($('#jky-is-company'));}, 100);

	var my_html = '';
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale   = JKY.languages[l].name ;
		var my_language = JKY.languages[l].value;
		var my_sentence = '';
		my_html += '<div class="jky-form-line">'
				+  '<div class="jky-form-label">' + my_language + ':</div>'
				+  '<div class="jky-form-value"><input id="' + my_locale + '" value="' + my_sentence + '" /></div>'
				+  '</div>'
				;
	}
	JKY.set_html('jky-locales', my_html);

	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_machine = JKY.get_value('jky-machine');
	my_machine = (my_machine == '') ? 'null' : my_machine;

	var my_set = ''
		+       'group_set=\'' + jky_select + '\''
		+        ', status=\'' + JKY.get_value	('jky-status'			) + '\''
		+      ', sequence=  ' + JKY.get_value	('jky-sequence'			)
		+          ', name=\'' + JKY.get_value	('jky-name'				) + '\''
		+         ', value=\'' + JKY.get_value	('jky-value'			) + '\''

		+      'first_name=\'' + JKY.get_value	('jky-first-name'		) + '\''
		+     ', last_name=\'' + JKY.get_value	('jky-last-name'		) + '\''
		+        ', mobile=\'' + JKY.get_value	('jky-mobile'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-first-name') + ' ' + JKY.get_value('jky-last-name') +'\''
		+       'full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + JKY.get_value	('jky-is-company'		) + '\''
//		+  ', company_name=\'' + JKY.get_value	('jky-company-name'		) + '\''
//		+   ', company_tag=\'' + JKY.get_value	('jky-company-tag'		) + '\''
		+       'user_name=\'' + JKY.get_value	('jky-user-name'		) + '\''
		+     ', user_role=\'' + JKY.get_value	('jky-user-role'		) + '\''

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

		+            'name=\'' + JKY.get_value	('jky-name'				) + '\''
		+  ', machine_type=\'' + JKY.get_checked('jky-machine-type'		) + '\''
		+  ', product_type=\'' + JKY.get_checked('jky-product-type'		) + '\''
		+ ', machine_family=\'' + JKY.get_value	('jky-machine-family'	) + '\''
		+ ', machine_brand=\'' + JKY.get_value	('jky-machine-brand'	) + '\''
		+ ', serial_number=\'' + JKY.get_value	('jky-serial-number'	) + '\''
		+      ', diameter=\'' + JKY.get_value	('jky-diameter'			) + '\''
		+         ', width=\'' + JKY.get_value	('jky-width'			) + '\''
		+       ', density=\'' + JKY.get_value	('jky-density'			) + '\''
		+        ', inputs=\'' + JKY.get_value	('jky-inputs'			) + '\''
		+	      ', lanes=\'' + JKY.get_value	('jky-lanes'			) + '\''

		+            'code=\'' + JKY.get_value	('jky-code'				) + '\''
		+          ', name=\'' + JKY.get_value	('jky-name'				) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread-groups'	) + '\''
		+  ', thread_color=\'' + JKY.get_value	('jky-thread-color'		) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-compositions'		) + '\''

		+          'status=\'' + JKY.get_value	('jky-status'			) + '\''
		+     ', user_role=\'' + JKY.get_value	('jky-user-role'		) + '\''
		+ ', user_resource=\'' + JKY.get_value	('jky-user-resource'	) + '\''
		+   ', user_action=\'' + JKY.get_value	('jky-user-action'		) + '\''

		+          'status=\'' + JKY.get_value	('jky-status'			) + '\''
		+        ', locale=\'' +				 'en_us'				  + '\''
		+      ', sentence=\'' + JKY.get_value	('en_us'				) + '\''

		+          'status=\'' + JKY.get_value	('jky-status'				) + '\''
		+        ', locale=\'' +				 'en_us'					  + '\''
		+      ', sentence=\'' + JKY.get_value	('en_us'					) + '\''

		+     'worked_hour=  ' + JKY.get_value	('jky-worked-hour'		)
		+      ', priority=\'' + JKY.get_value	('jky-priority'			) + '\''
		+      ', category=\'' + JKY.get_value	('jky-category'			) + '\''
		+   ', description=\'' + JKY.get_value	('jky-description'		) + '\''
		+    ', resolution=\'' + JKY.get_value	('jky-resolution'		) + '\''
		;
	my_set +=    ', start_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-start-value'	));
	my_set += ', purchase_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-purchase-value'	));
	my_set +=   ', repair_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-repair-value'	));
	my_set +=   ', return_date = ' + JKY.fix_dmy2ymd(JKY.get_value('jky-return-value'	));
	return my_set;
}

JKY.process_save = function() {
	var my_name = JKY.get_value	('jky-name');
	if (JKY.is_empty(my_name)) {
		JKY.display_message(JKY.set_is_required('Name'));
		return;
	}

	if (jky_index == 0) {
		JKY.process_insert();
	}else{
		JKY.process_update();
	}
}

JKY.process_insert = function() {
	var my_set  = ', is_customer = \'Yes\'';
	var my_set  = ', is_supplier = \'Yes\'';
	var my_data =
		{ method: 'insert'
		, table :  jky_table
		, set	:  JKY.get_form_set() + my_set
		};
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
	var my_data =
		{ method: 'update'
		, table :  jky_table
		, set	: 'parent_id = ' + response.id
		, where :        'id = ' + response.id
		};
	JKY.ajax(false, my_data);
	JKY.process_update_more(response.id);			//	only used on [Translations]
	JKY.refresh_select(jky_select);					//	only used on [Configs and Controls]
	JKY.insert_user(response.id);	//	only used on [Contacts]
	JKY.process_update_more(response.id);			//	only used on [Translations]
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
	JKY.refresh_select(jky_select);					//	only used on [Configs and Controls]
	JKY.update_user(response.id, JKY.row.user_id);	//	only used on [Contacts]
	JKY.process_update_more(response.id);			//	only used on [Translations]
	JKY.rows[jky_index-1] = JKY.get_row(jky_table, JKY.rows[jky_index-1]['id']);
//	JKY.display_next();
	JKY.display_row(jky_index);
}

JKY.process_update_more = function(row_id) {
	for(var l=0; l<JKY.languages.length; l++) {
		var my_locale = JKY.languages[l].name ;
		if (my_locale != 'en_us') {
			var my_where = '  parent_id='   + row_id
						 + ' AND locale=\'' + my_locale + '\''
						;
			var my_id = JKY.get_id(jky_table, my_where);
			if (my_id) {
				var my_set  = '  sentence=\'' + JKY.get_value(my_locale) + '\'';
				var my_data = {method:'update', table:jky_table, set:my_set, where:'id=' + my_id};
				JKY.ajax(true, my_data);
			}else{
				var my_set  = ' parent_id='   + row_id
							+ ',   locale=\'' + my_locale + '\''
							+ ', sentence=\'' + JKY.get_value(my_locale) +'\''
							;
				var my_data = {method:'insert', table:jky_table, set:my_set};
				JKY.ajax(true, my_data);
			}
		}
	}
};

JKY.process_delete = function() {
	JKY.display_confirm(JKY.delete_confirmed, null, 'Delete', 'You requested to <b>delete</b> this record. <br>Are you sure?', 'Yes', 'No');
}

JKY.delete_confirmed = function() {
	var my_id = JKY.row.id;
	var my_id = JKY.rows[jky_index-1]['id'];

	if (JKY.row.group_set == 'Root') {
		var my_data =
			{ method: 'delete_many'
			, table :  jky_table
			, where : 'group_set = "' + JKY.row.name + '"'
			};
		JKY.ajax(true, my_data);
	}

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
		{ method: 'delete_many'
		, table : 'Cylinders'
		, where : 'machine_id = ' + my_id
		, where : 'product_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete'
		, table :  jky_table
		, where : 'id = ' + my_id
		, where : 'parent_id = ' + my_id
		};
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
	JKY.refresh_select(jky_select);					//	only used on [Configs and Controls]
	JKY.delete_user(response.id, JKY.row.user_id);	//	only used on [Contacts]
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

/**
 * only used on [Configs and Controls]
 */
JKY.refresh_select = function(selected) {
	if (selected == 'Root') {
		JKY.set_html('jky-app-select', JKY.set_group_set(jky_table , jky_select, 'Root'));
	}
}

/**
 * only used on [Translations]
 */
JKY.process_publish = function() {
	var my_data =
		{ method: 'publish'
		, table :  jky_table
		};
	JKY.ajax(false, my_data, JKY.process_publish_success);
};

JKY.process_publish_success = function(response) {
	JKY.display_trace('process_publish_success');
	JKY.display_message(response.message);
}

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
			file.name = 'contacts.' + JKY.row.id + '.' + JKY.saved_name;
			file.name = 'ftp_photos.' + JKY.row.id + '.' + JKY.saved_name;
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
		var my_html = '<a href="' + 'jky_download.php?file_name=contacts/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-photo-img"    src="/uploads/contacts/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
					;
		var my_html = '<a href="' + 'jky_download.php?file_name=ftp_photos/' + JKY.row.id + '.' + my_file_type + '">'
					+ '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + JKY.row.id + '.' + my_file_type + '?time=' + my_time.getTime() + '" class="the_icon" />';
					+ '</a>'
					;
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
	var my_row = JKY.get_row(jky_table, the_id);
//window.print();
	var my_html = ''
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<tr>"

		+ "<td width=60%><table>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'>FTP  <span>Number</span>:</td><td id='jky-print-number'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Product</span>:</td><td id='jky-print-product'		class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Composition</span>:</td><td id='jky-print-composition'	class='jky-form-value'></td></tr>"
		+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Machine</span>:</td><td id='jky-print-machine'		class='jky-form-value'></td></tr>"
		+ "</table></td>"

		+ "<td id='jky-print-drawing' width=20%></td>"
		+ "<td id='jky-print-photo'   width=20%></td>"

		+ "</tr>"
		+ "</table>"

		+ "<br>"
		+ "<div style='width:700px; border:1px solid black;'>"
		+ "<table>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span> Diameter</span>:</td><td id='jky-print-diameter'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>    Turns</span>:</td><td id='jky-print-turns'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span>    Yield</span>:</td><td id='jky-print-yield'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>  Density</span>:</td><td id='jky-print-density'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>   Weight</span>:</td><td id='jky-print-weight'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span> Needling</span>:</td><td id='jky-print-needling'		class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>   Inputs</span>:</td><td id='jky-print-inputs'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>    Width</span>:</td><td id='jky-print-width'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span>     Peso</span>:</td><td id='jky-print-peso'			class='jky-print-value'></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td class='jky-print-label1'><span>    Speed</span>:</td><td id='jky-print-speed'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label2'><span>    Lanes</span>:</td><td id='jky-print-lanes'		class='jky-print-value'></td>"
		+ "<td class='jky-print-label3'><span>Has Break</span>?</td><td id='jky-print-has-break'	class='jky-print-value'></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Threads</span></td><td><span>Percent</span></td><td><span>Thread</span></td><tr><thead>"
		+ "<tbody id='jky-print-thread-body'></table>"
		+ "</table>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Loads</span></td><td><span>First</span></td><td><span>Thread</span></td><td><span>Second</span></td><td><span>Thread</span></td><tr><thead>"
		+ "<tbody id='jky-print-load-body'></table>"
		+ "</table>"
		+ "<br>"
		+ "<table style='width:700px; border:1px solid black;'>"
		+ "<thead><tr class='jky-print-head'><td><span>Settings</span></td><td><span>Name</span></td><td><span>Value</span></td><td><span>Name</span></td><td><span>Value</span></td><tr><thead>"
		+ "<tbody id='jky-print-setting-body'></table>"
		+ "</table>"
		;
	JKY.set_html('jky-printable', my_html);
	JKY.t_tag	('jky-printable', 'span');

	JKY.set_html('jky-print-number'			, my_row.number			);
	JKY.set_html('jky-print-product'		, my_row.product		);
	JKY.set_html('jky-print-composition'	, my_row.composition	);
	JKY.set_html('jky-print-machine'		, my_row.machine		);

	JKY.set_html('jky-print-drawing'		, '<img id="jky-drawing-img"  src="/uploads/ftp_draws/'  + the_id + '.' + my_row.draw  + '" />');
	JKY.set_html('jky-print-photo'			, '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + the_id + '.' + my_row.photo + '" />');

	JKY.set_html('jky-print-diameter'		, my_row.diameter		+ ' (cm)'	);
	JKY.set_html('jky-print-turns'			, my_row.turns						);
	JKY.set_html('jky-print-yield'			, my_row.yield			+ ' (%)'	);
	JKY.set_html('jky-print-density'		, my_row.density					);
	JKY.set_html('jky-print-weight'			, my_row.weight			+ ' (gr)'	);
	JKY.set_html('jky-print-needling'		, my_row.needling					);
	JKY.set_html('jky-print-inputs'			, my_row.inputs			+ ' (cones)');
	JKY.set_html('jky-print-width'			, my_row.width			+ ' (cm)'	);
	JKY.set_html('jky-print-peso'			, my_row.peso			+ ' (Kg)'	);
	JKY.set_html('jky-print-speed'			, my_row.speed			+ ' (rpm)'	);
	JKY.set_html('jky-print-lanes'			, my_row.lanes						);
	JKY.set_html('jky-print-has-break'		, JKY.t(my_row.has_break));

	JKY.set_html('jky-print-thread-body'	, JKY.print_threads	(the_id));
	JKY.set_html('jky-print-load-body'		, JKY.print_loads	(the_id));
	JKY.set_html('jky-print-setting-body'	, JKY.print_settings(the_id));

	$("#jky-printable").print();
}
