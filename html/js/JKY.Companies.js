"use strict";
var JKY = JKY || {};

/**
 * JKY.Companies
 */
JKY.Companies = function(the_program_name, the_specific) {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	:  the_program_name
		, table_name	: 'Contacts'
		, specific		:  the_specific
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
	$('#jky-action-gen-sale'		).click( function() {JKY.process_action('sales', JKY.row.id);});

	$('#jky-tab-address'			).click (function() {JKY.display_address		(JKY.row	);});
	$('#jky-tab-phones'				).click (function() {JKY.display_phones			(JKY.row	);});
	$('#jky-tab-contacts'			).click (function() {JKY.display_contacts		(JKY.row.id );});
	$('#jky-tab-restrictions'		).click (function() {JKY.display_restrictions	(JKY.row.id );});
	$('#jky-tab-remarks'			).click (function() {JKY.display_remarks		(JKY.row	);});
	$('#jky-tab-payments'			).click (function() {JKY.display_payments		(JKY.row	);});

	$('#jky-nick-name'				).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-full-name'				).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-position'				).change(function()	{if (JKY.row == null)	JKY.title_case(this);});
	$('#jky-website'				).change(function()	{						JKY.lower_case(this);});
	$('#jky-email'					).change(function()	{						JKY.lower_case(this);});
	$('#jky-zip'					).change(function() {						JKY.buscar_cep(this);});

	$('#jky-action-save-address'	).click (function() {JKY.save_address				();});
	$('#jky-action-save-phones'		).click (function() {JKY.save_phones				();});
	$('#jky-action-add-restriction'	).click (function() {JKY.insert_restriction			();});
	
	if (JKY.Session.get_value('user_role') == 'Admin'
	||  JKY.Session.get_value('user_role') == 'Support') {
		$('#jky-action-add-delivery'	).click (function() {JKY.insert_delivery			();});
		$('#jky-action-save-remarks'	).click (function() {JKY.save_remarks				();});
		$('#jky-action-save-payments'	).click (function() {JKY.save_payments				();});
	}else{
		$('#jky-action-add-delivery'	).css('display', 'none')
		$('#jky-action-save-remarks'	).css('display', 'none')
		$('#jky-action-save-payments'	).css('display', 'none')
	}
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.append_file('jky-load-head-office'	, '../JKY.Search.HeadOffice.html'	);
	JKY.append_file('jky-load-transport'	, '../JKY.Search.Transport.html'	);
	
	JKY.set_side_bar();
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
//	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies(JKY.App.get_prop('specific')), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND ' + JKY.App.get_prop('specific')), true));
	JKY.set_html('jky-contact-tag'		, JKY.set_configs ('Customer Tags'	, '', ''));
	JKY.set_html('jky-payment-type'		, JKY.set_configs ('Payment Types'	, '', ''));
	JKY.set_html('jky-state'			, JKY.set_configs ('States'			, '', ''));
	JKY.set_html('jky-country'			, JKY.set_configs ('Countries'		, '', ''));
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Inactive'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

	$('#jky-head-office-filter'	).KeyUpDelay(JKY.HeadOffice.load_data	);
	$('#jky-transport-filter'	).KeyUpDelay(JKY.Transport.load_data	);
	$('#jky-nick-name'			).change(function() {JKY.fix_name(this);});
	$('#jky-full-name'			).change(function() {JKY.fix_name(this);});
	$('#jky-is-company'			).click (function() {JKY.process_is_company(this);});

	$('#jky-nick-name'			).ForceName();
	$('#jky-full-name'			).ForceName();
	$('#jky-credit-limit'		).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_html = ''
		+  '<td class="jky-td-thumb"	>'	+ JKY.fix_thumb	(the_row.photo, the_row.id, 'contacts') + '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.fix_null	(the_row.nick_name	)	+ '</td>'
		+  '<td class="jky-td-name-l"	>'	+ JKY.fix_null	(the_row.full_name	)	+ '</td>'
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
	if (JKY.App.get_prop('specific') == 'is_customer') {
		JKY.show('jky-action-gen-sale');
	}else{
		JKY.hide('jky-action-gen-sale');
	}
	JKY.set_value	('jky-nick-name'		, the_row.nick_name		);
	JKY.set_value	('jky-full-name'		, the_row.full_name		);
	JKY.set_yes		('jky-is-company'		, the_row.is_company	);
	JKY.set_option	('jky-contact-company'	, the_row.company_id	);
//	JKY.set_option	('jky-parent-company'	, the_row.parent_id		);
	JKY.set_option	('jky-contact-tag'		, the_row.tags			);
	JKY.set_value	('jky-cnpj'				, the_row.cnpj			);
	JKY.set_value	('jky-ie'				, the_row.ie			);
	JKY.set_value	('jky-im'				, the_row.im			);
	JKY.set_value	('jky-credit-limit'		, the_row.credit_limit	);
	JKY.set_value	('jky-payment-type'		, the_row.payment_type	);
	JKY.set_value	('jky-website'			, the_row.website		);
	JKY.set_value	('jky-position'			, the_row.position		);
	JKY.set_value	('jky-email'			, the_row.email			);
	JKY.set_value	('jky-head-office-id'	, the_row.parent_id		);
	JKY.set_value	('jky-head-office-name'	, the_row.parent_name	);
	JKY.set_value	('jky-transport-id'		, the_row.transport_id	);
	JKY.set_value	('jky-transport-name'	, the_row.transport_name);
	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);

	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');

	JKY.display_address		(the_row);
	JKY.display_phones		(the_row);
	JKY.display_contacts	(the_row.id);
	JKY.display_restrictions(the_row.id);
	JKY.display_deliveries	(the_row.id);
	JKY.display_remarks		(the_row);
	JKY.display_payments	(the_row);
};

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.hide('jky-action-gen-sale');

	JKY.set_value	('jky-nick-name'		, '');
	JKY.set_value	('jky-full-name'		, '');
	JKY.set_yes		('jky-is-company'		, 'Yes');
	JKY.set_option	('jky-contact-company'	, '');
//	JKY.set_option	('jky-parent-company'	, '');
	JKY.set_option	('jky-contact-tag'		, '');
	JKY.set_value	('jky-cnpj'				, '');
	JKY.set_value	('jky-ie'				, '');
	JKY.set_value	('jky-im'				, '');
	JKY.set_value	('jky-credit-limit'		, '0');
	JKY.set_value	('jky-payment-type'		, '');
	JKY.set_value	('jky-website'			, '');
	JKY.set_value	('jky-position'			, '');
	JKY.set_value	('jky-email'			, '');
	JKY.set_value	('jky-head-office-id'	, null);
	JKY.set_value	('jky-head-office-name'	, '');
	JKY.set_value	('jky-transport-id'		, null);
	JKY.set_value	('jky-transport-name'	, '');
	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_head_office_id	= JKY.get_value('jky-head-office-id');
	var my_transport_id		= JKY.get_value('jky-transport-id'	);
		my_head_office_id	= (my_head_office_id	=== '') ? 'null' : my_head_office_id;
		my_transport_id		= (my_transport_id		=== '') ? 'null' : my_transport_id	;

	var my_set = ''
		+       'nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + JKY.get_yes_no	('jky-is-company'		) + '\''
		+    ', company_id=  ' + JKY.get_value	('jky-contact-company'	)
//		+     ', parent_id=  ' + JKY.get_value	('jky-parent-company'	)
		+          ', tags=\'' + JKY.get_value	('jky-contact-tag'		) + '\''
		+          ', cnpj=\'' + JKY.get_value	('jky-cnpj'				) + '\''
		+            ', ie=\'' + JKY.get_value	('jky-ie'				) + '\''
		+            ', im=\'' + JKY.get_value	('jky-im'				) + '\''
		+  ', credit_limit=  ' + JKY.get_value	('jky-credit-limit'		)
		+  ', payment_type=\'' + JKY.get_value	('jky-payment-type'		) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'			) + '\''
		+      ', position=\'' + JKY.get_value	('jky-position'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		+     ', parent_id=  ' + my_head_office_id
		+  ', transport_id=  ' + my_transport_id
		;
	return my_set;
};

JKY.display_form = function() {
	JKY.hide('jky-action-delete');
};

/**
 * only used on [Customers, Suppliers, Dyers, Partners, Transports]
 */
JKY.process_is_company = function(the_id) {
	if ($(the_id).is(':checked')) {
//		JKY.invisible	('jky-company');
		JKY.hide		('jky-company');
		JKY.show		('jky-parent');
		JKY.hide		('jky-position-line'	);
		JKY.show		('jky-website-line'		);
		JKY.set_html	('jky-cnpj-label','CNPJ');
		JKY.set_html	('jky-ie-label'  ,'IE'	);
		JKY.show		('jky-tab-contacts'		);
	}else{
//		JKY.visible		('jky-company');
		JKY.show		('jky-company');
		JKY.hide		('jky-parent');
		JKY.show		('jky-position-line'	);
		JKY.hide		('jky-website-line'		);
		JKY.set_html	('jky-cnpj-label','CPF'	);
		JKY.set_html	('jky-ie-label'  ,'RG'	);
		JKY.hide		('jky-tab-contacts'		);
		if ($('#jky-tab-contacts').hasClass('active')) {
			$('#jky-tab-address a').click();
		}
	}
};

JKY.process_insert = function(the_id) {
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
//	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
};

JKY.process_delete = function(the_id, the_row) {
//	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
//	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
}
