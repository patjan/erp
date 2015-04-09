"use strict";

/**
 * companies.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Companies'
		, table_name	: 'Contacts'
		, specific		: 'is_company'
		, select		: ''
		, filter		: ''
		, sort_by		: 'nick_name'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0]]
		, sort_false	: 1						//	thumb
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
	$('#jky-action-change'			).click( function() {JKY.App.change_status(JKY.row.id);});
	$('#jky-tab-payments'			).click (function() {JKY.display_payments(JKY.row	 );});
	$('#jky-tab-address'			).click (function() {JKY.display_address (JKY.row	 );});
	$('#jky-tab-phones'				).click (function() {JKY.display_phones	 (JKY.row	 );});
	$('#jky-tab-contacts'			).click (function() {JKY.display_contacts(JKY.row.id );});
	$('#jky-tab-remarks'			).click (function() {JKY.display_remarks (JKY.row	 );});

	$('#jky-nick-name'				).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-full-name'				).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-website'				).change(function()	{						JKY.lower_case(this);});
	$('#jky-email'					).change(function()	{						JKY.lower_case(this);});
	$('#jky-zip'					).change(function() {						JKY.buscar_cep(this);});

	$('#jky-action-save-payments'	).click (function() {JKY.save_payments				();});
	$('#jky-action-save-address'	).click (function() {JKY.save_address				();});
	$('#jky-action-save-phones'		).click (function() {JKY.save_phones				();});
	$('#jky-action-save-remarks'	).click (function() {JKY.save_remarks				();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-admin-companies');
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
	JKY.set_html('jky-contact-tag'		, JKY.set_configs ('Customer Tags'	, '', ''));
	JKY.set_html('jky-payment-type'		, JKY.set_configs ('Payment Types'	, '', ''));
	JKY.set_html('jky-state'			, JKY.set_configs ('States'			, '', ''));
	JKY.set_html('jky-country'			, JKY.set_configs ('Countries'		, '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get('select'), 'All', 'Active', 'Inactive'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();
	JKY.show('jky-tab-payments');
	$('#jky-tab-payments'	).addClass('active');
	$('#jky-pane-payments'	).addClass('active');

	$('#jky-credit-limit'	).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-thumb"	>'	+ JKY.fix_thumb	(the_row.photo, the_row.id, 'contacts') + '</td>'
		+  '<td class="jky-td-name-l"	>'	+ JKY.fix_null	(the_row.nick_name	)	+ '</td>'
		+  '<td class="jky-td-yes-no"	>'	+				 the_row.is_customer	+ '</td>'
		+  '<td class="jky-td-yes-no"	>'	+				 the_row.is_supplier	+ '</td>'
		+  '<td class="jky-td-yes-no"	>'	+				 the_row.is_dyer		+ '</td>'
		+  '<td class="jky-td-yes-no"	>'	+				 the_row.is_partner		+ '</td>'
		+  '<td class="jky-td-yes-no"	>'	+				 the_row.is_transport	+ '</td>'
		+  '<td class="jky-td-phone"	>'	+ JKY.fix_null	(the_row.phone		)	+ '</td>'
		+  '<td class="jky-td-phone"	>'	+ JKY.fix_null	(the_row.mobile		)	+ '</td>'
		+  '<td class="jky-td-email"	>'	+				 the_row.email			+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.set_html	('jky-status'			, JKY.t(the_row.status	));
	JKY.set_value	('jky-nick-name'		, the_row.nick_name		);
	JKY.set_value	('jky-full-name'		, the_row.full_name		);
	JKY.set_yes		('jky-is-customer'		, the_row.is_customer	);
	JKY.set_yes		('jky-is-supplier'		, the_row.is_supplier	);
	JKY.set_yes		('jky-is-dyer'			, the_row.is_dyer		);
	JKY.set_yes		('jky-is-partner'		, the_row.is_partner	);
	JKY.set_yes		('jky-is-transport'		, the_row.is_transport	);
//	JKY.set_option	('jky-contact-company'	, the_row.company_id	);
	JKY.set_option	('jky-parent-company'	, the_row.parent_id		);
	JKY.set_option	('jky-contact-tag'		, the_row.tags			);
	JKY.set_value	('jky-cnpj'				, the_row.cnpj			);
	JKY.set_value	('jky-ie'				, the_row.ie			);
	JKY.set_value	('jky-im'				, the_row.im			);
	JKY.set_value	('jky-credit-limit'		, the_row.credit_limit	);
	JKY.set_value	('jky-payment-type'		, the_row.payment_type	);
	JKY.set_value	('jky-website'			, the_row.website		);
	JKY.set_value	('jky-email'			, the_row.email			);
//	JKY.disable_button('jky-is-company');
//	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	JKY.display_payments(the_row);
	JKY.display_address (the_row);
	JKY.display_phones  (the_row);
	JKY.display_contacts(the_row.id);
	JKY.display_remarks (the_row);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.set_value	('jky-nick-name'		, '');
	JKY.set_value	('jky-full-name'		, '');
	JKY.set_yes		('jky-is-customer'		, 'No');
	JKY.set_yes		('jky-is-supplier'		, 'No');
	JKY.set_yes		('jky-is-dyer'			, 'No');
	JKY.set_yes		('jky-is-partner'		, 'No');
	JKY.set_yes		('jky-is-transport'		, 'No');
//	JKY.set_option	('jky-contact-company'	, '');
	JKY.set_option	('jky-parent-company'	, '');
	JKY.set_option	('jky-contact-tag'		, '');
	JKY.set_value	('jky-cnpj'				, '');
	JKY.set_value	('jky-ie'				, '');
	JKY.set_value	('jky-im'				, '');
	JKY.set_value	('jky-credit-limit'		, '0');
	JKY.set_value	('jky-payment-type'		, '');
	JKY.set_value	('jky-website'			, '');
	JKY.set_value	('jky-email'			, '');

//	JKY.disable_button('jky-is-company');
//	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_set = ''
		+       'nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + 'Yes' + '\''
		+   ', is_customer=\'' + JKY.get_yes_no	('jky-is-customer'		) + '\''
		+   ', is_supplier=\'' + JKY.get_yes_no	('jky-is-supplier'		) + '\''
		+       ', is_dyer=\'' + JKY.get_yes_no	('jky-is-dyer'			) + '\''
		+    ', is_partner=\'' + JKY.get_yes_no	('jky-is-partner'		) + '\''
		+  ', is_transport=\'' + JKY.get_yes_no	('jky-is-transport'		) + '\''
//		+    ', company_id=  ' + JKY.get_value	('jky-contact-company'	)
		+     ', parent_id=  ' + JKY.get_value	('jky-parent-company'	)
		+          ', tags=\'' + JKY.get_value	('jky-contact-tag'		) + '\''
		+          ', cnpj=\'' + JKY.get_value	('jky-cnpj'				) + '\''
		+            ', ie=\'' + JKY.get_value	('jky-ie'				) + '\''
		+            ', im=\'' + JKY.get_value	('jky-im'				) + '\''
		+  ', credit_limit=  ' + JKY.get_value	('jky-credit-limit'		)
		+  ', payment_type=\'' + JKY.get_value	('jky-payment-type'		) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		;
	return my_set;
};

JKY.process_insert = function(the_id) {
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
};

JKY.process_delete = function(the_id, the_row) {
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
}