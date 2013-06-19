"use strict";

/**
 * suppliers.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Suppliers'
		, table_name	: 'Contacts'
		, specific		: 'is_supplier'
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'nick_name'
		, sort_seq		: 'ASC'
		, focus			: 'jky-nick-name'
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
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_menu_active('jky-menu-production');
	JKY.set_side_active('jky-production-suppliers');
	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-contact-tag'		, JKY.set_configs ('Customer Tags'	, '', ''));
	JKY.set_html('jky-state'			, JKY.set_configs ('States'			, '', ''));
	JKY.set_html('jky-country'			, JKY.set_configs ('Countries'		, '', ''));
	JKY.show('jky-side-production'	);
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-nick-name"		>' + the_row.nick_name		+ '</td>'
		+  '<td class="jky-phone"			>' + the_row.phone			+ '</td>'
		+  '<td class="jky-mobile"			>' + the_row.mobile			+ '</td>'
		+  '<td class="jky-email"			>' + the_row.email			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_value	('jky-nick-name'		, the_row.nick_name		);
	JKY.set_value	('jky-full-name'		, the_row.full_name		);
	JKY.set_yes		('jky-is-company'		, the_row.is_company	);
	JKY.set_option	('jky-contact-company'	, the_row.company_id	);
	JKY.set_option	('jky-contact-tag'		, the_row.tags			);
	JKY.set_value	('jky-street1'			, the_row.street1		);
	JKY.set_value	('jky-street2'			, the_row.street2		);
	JKY.set_value	('jky-city'				, the_row.city			);
	JKY.set_value	('jky-zip'				, the_row.zip			);
	JKY.set_option	('jky-state'			, the_row.state			);
	JKY.set_option	('jky-country'			, the_row.country		);
	JKY.set_value	('jky-website'			, the_row.website		);
	JKY.set_value	('jky-cnpj'				, the_row.cnpj			);
	JKY.set_value	('jky-ie'				, the_row.ie			);
	JKY.set_value	('jky-position'			, the_row.position		);
	JKY.set_value	('jky-phone'			, the_row.phone			);
	JKY.set_value	('jky-mobile'			, the_row.mobile		);
	JKY.set_value	('jky-fax'				, the_row.fax			);
	JKY.set_value	('jky-email'			, the_row.email			);
	setTimeout(function() {JKY.App.process_is_company($('#jky-is-company'));}, 100);

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
	JKY.set_value	('jky-nick-name'		, '');
	JKY.set_value	('jky-full-name'		, '');
	JKY.set_yes		('jky-is-company'		, 'No');
	JKY.set_option	('jky-contact-company'	, '');
	JKY.set_option	('jky-contact-tag'		, '');
	JKY.set_value	('jky-street1'			, '');
	JKY.set_value	('jky-street2'			, '');
	JKY.set_value	('jky-city'				, '');
	JKY.set_value	('jky-zip'				, '');
	JKY.set_option	('jky-state'			, 'SP');
	JKY.set_option	('jky-country'			, 'BR');
	JKY.set_value	('jky-website'			, '');
	JKY.set_value	('jky-cnpj'				, '');
	JKY.set_value	('jky-ie'				, '');
	JKY.set_value	('jky-position'			, '');
	JKY.set_value	('jky-phone'			, '');
	JKY.set_value	('jky-mobile'			, '');
	JKY.set_value	('jky-fax'				, '');
	JKY.set_value	('jky-email'			, '');
	setTimeout(function() {JKY.App.process_is_company($('#jky-is-company'));}, 100);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+       'nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + JKY.get_yes_no	('jky-is-company'		) + '\''
		+    ', company_id=  ' + JKY.get_value	('jky-contact-company'	)
		+          ', tags=\'' + JKY.get_value	('jky-contact-tag'		) + '\''
		+          ', cnpj=\'' + JKY.get_value	('jky-cnpj'				) + '\''
		+            ', ie=\'' + JKY.get_value	('jky-ie'				) + '\''
		+       ', street1=\'' + JKY.get_value	('jky-street1'			) + '\''
		+       ', street2=\'' + JKY.get_value	('jky-street2'			) + '\''
		+          ', city=\'' + JKY.get_value	('jky-city'				) + '\''
		+           ', zip=\'' + JKY.get_value	('jky-zip'				) + '\''
		+         ', state=\'' + JKY.get_value	('jky-state'			) + '\''
		+       ', country=\'' + JKY.get_value	('jky-country'			) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'			) + '\''
		+      ', position=\'' + JKY.get_value	('jky-position'			) + '\''
		+         ', phone=\'' + JKY.get_value	('jky-phone'			) + '\''
		+        ', mobile=\'' + JKY.get_value	('jky-mobile'			) + '\''
		+           ', fax=\'' + JKY.get_value	('jky-fax'				) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		;
	return my_set;
};

JKY.display_form = function() {
	JKY.hide('jky-action-delete');
};
