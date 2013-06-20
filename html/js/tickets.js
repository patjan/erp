"use strict";

/**
 * tickets.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Tickets'
		, table_name	: 'Tickets'
		, specific		: ''
		, select		: 'Open'
		, filter		: ''
		, sort_by		: 'category, description'
		, sort_seq		: 'ASC'
		, focus			: 'jky-description'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Tickets'
		, directory		: 'tickets'
		, field_name	: 'photo'
		, title			: 'Photo files'
		, extensions	: 'jpg,gif,png'
		, button_id		: 'jky-upload-photo'
		, filename_id	: 'jky-upload-name'
		, percent_id	: 'jky-upload-percent'
		, progress_id	: 'jky-upload-progress'
		, img_id		: 'jky-photo-img'
		, download_id	: 'jky-download-photo'
		});
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-help');
	JKY.set_side_active('jky-help-tickets');
	JKY.set_html('jky-app-select'		, JKY.set_controls('Ticket Status Codes', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-priority'			, JKY.set_controls('Priorities', '', ''));
	JKY.set_html('jky-category'			, JKY.set_controls('Ticket Categories', '', ''));
	JKY.set_html('jky-app-select-label', JKY.t('Status'));
	JKY.set_value ('jky-app-filter', JKY.App.get('filter'));
	JKY.show('jky-side-help');
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-opened-at"		>' + the_row.opened_at		+ '</td>'
		+  '<td class="jky-worked-hour"		>' + the_row.worked_hour	+ '</td>'
		+  '<td class="jky-priority"		>' + the_row.priority		+ '</td>'
		+  '<td class="jky-category"		>' + the_row.category		+ '</td>'
		+  '<td class="jky-description"		>' + the_row.description	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-status'			, JKY.row.status);
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

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_option	('jky-status'			, 'Open');
	JKY.set_value	('jky-opened-by'		, JKY.Session.get_value('full_name'));
	JKY.set_value	('jky-opened-value'		, JKY.get_now());
	JKY.set_value	('jky-worked-hour'		, 0 );
//	JKY.set_value	('jky-priority'			, 'Normal');
//	JKY.set_option	('jky-category'			, '');
	JKY.set_value	('jky-description'		, '');
	JKY.set_value	('jky-resolution'		, '');
};

/**
 *	get form set
 */
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
};
