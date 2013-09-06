"use strict";

/**
 * contacts.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Contacts'
		, table_name	: 'Contacts'
		, specific		: 'is_contact'
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'full_name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-nick-name'
		, add_new		: 'display form'
		});
	JKY.App.init();

	JKY.Photo = JKY.Upload(
		{ object_name	: 'JKY.Photo'
		, table_name	: 'Contacts'
		, directory		: 'contacts'
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
	$('#jky-action-reset').click(function()	{JKY.reset_user  ();});
	$('#jky-save-address').click(function()	{JKY.save_address();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-admin-contacts');
	JKY.set_html('jky-user-role'		, JKY.set_controls('User Roles'		, ''	));
	JKY.set_html('jky-state'			, JKY.set_configs ('States'			, '', ''));
	JKY.set_html('jky-country'			, JKY.set_configs ('Countries'		, '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_controls('User Roles', JKY.App.get('select'), 'All'));
	JKY.set_html('jky-app-select-label'	, JKY.t('User Role'));
	JKY.show('jky-app-select-line');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-nick-name"		>' + JKY.fix_null	(the_row.nick_name	)	+ '</td>'
		+  '<td class="jky-mobile"			>' +				 the_row.mobile			+ '</td>'
		+  '<td class="jky-email"			>' +				 the_row.email			+ '</td>'
		+  '<td class="jky-user-name"		>' + JKY.fix_null	(the_row.user_name	)	+ '</td>'
		+  '<td class="jky-user-role"		>' + JKY.fix_null	(the_row.user_role	)	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-nick-name'		, the_row.nick_name		);
	JKY.set_value	('jky-first-name'		, the_row.first_name	);
	JKY.set_value	('jky-last-name'		, the_row.last_name		);
	JKY.set_value	('jky-mobile'			, the_row.mobile		);
	JKY.set_value	('jky-email'			, the_row.email			);
	JKY.set_option	('jky-company-name'		, the_row.company_name	);
	JKY.set_value	('jky-user-name'		, the_row.user_name		);
	JKY.set_value	('jky-user-role'		, the_row.user_role		);
	JKY.set_value	('jky-street1'			, the_row.street1		);
	JKY.set_value	('jky-street2'			, the_row.street2		);
	JKY.set_value	('jky-city'				, the_row.city			);
	JKY.set_value	('jky-zip'				, the_row.zip			);
	JKY.set_option	('jky-state'			, the_row.state			);
	JKY.set_option	('jky-country'			, the_row.country		);
	JKY.set_value	('jky-website'			, the_row.website		);

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	if (JKY.is_empty(the_row.user_id)) {
		JKY.hide('jky-action-reset');
	}else{
		JKY.show('jky-action-reset');
	}
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-nick-name'		, '');
	JKY.set_value	('jky-first-name'		, '');
	JKY.set_value	('jky-last-name'		, '');
	JKY.set_value	('jky-mobile'			, '');
	JKY.set_value	('jky-email'			, '');
	JKY.set_option	('jky-company-name'		, '');
	JKY.set_value	('jky-user-name'		, '');
	JKY.set_value	('jky-user-role'		, '');
	JKY.set_value	('jky-street1'			, '');
	JKY.set_value	('jky-street2'			, '');
	JKY.set_value	('jky-city'				, '');
	JKY.set_value	('jky-zip'				, '');
	JKY.set_option	('jky-state'			, 'SP');
	JKY.set_option	('jky-country'			, 'BR');
	JKY.set_value	('jky-website'			, '');
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+       'nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+    ', first_name=\'' + JKY.get_value	('jky-first-name'		) + '\''
		+     ', last_name=\'' + JKY.get_value	('jky-last-name'		) + '\''
		+        ', mobile=\'' + JKY.get_value	('jky-mobile'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-first-name') + ' ' + JKY.get_value('jky-last-name') +'\''
		;
	return my_set;
};

JKY.process_insert = function(the_id) {
	JKY.insert_user(the_id);
};

JKY.process_update = function(the_id, the_row) {
	JKY.update_user(the_id, the_row.user_id);
};

JKY.process_delete = function(the_id, the_row) {
	JKY.delete_user(the_id, the_row.user_id);
};
