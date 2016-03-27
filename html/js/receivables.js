"use strict";
var JKY = JKY || {};
var my_Timeout;

/**
 * receivables.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Receivables'
		, table_name	: 'Receivables'
		, specific		: 'credit_amount'	//	> 0	
		, select		: 'All'
		, filter		: ''
		, sort_by		: 'transaction_date'
		, sort_seq		: 'ASC'
		, sort_list		: [[1, 0], [3, 0]]
		, sort_false	: 8				//	Reversal button
//		, focus			: 'jky-customer-name'
//		, add_new		: 'display form'
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-action-clear'		).click	(function() {JKY.process_clear_screen	();});
	$('#jky-action-confirm'		).click	(function() {JKY.process_confirm_screen	();});
	$('#jky-action-print'		).click (function() {JKY.process_print_screen	();});
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
	JKY.set_side_active('jky-accounts-receivables');
	JKY.set_html('jky-app-select'		, JKY.set_options(JKY.App.get_prop('select'), 'All', 'Active', 'Closed'));
	JKY.set_html('jky-app-select-label'	, JKY.t('Status'));
	JKY.show('jky-app-select-line');

//	select the first option as default
//	$('#jky-app-select option').eq(1).prop('selected', true);
//	$('#jky-app-select').change();

//	JKY.process_clear_screen();
//	JKY.show('jky-action-clear'  );
//	JKY.show('jky-action-confirm');
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
	var my_reversal = '';
	if (the_row.status === 'Closed' && parseFloat(the_row.credit_amount) > 0) {
		my_reversal = '<button onclick="JKY.process_reversal(this)" row_id=' + the_row.id + ' class="btn" type="button">' + JKY.t('Reversal') + '</button>';
	}

	var my_html = ''
		+  '<td class="jky-td-date"		>'	+ JKY.out_date	(the_row.transaction_date	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.t			(the_row.transaction_type	)	+ '</td>'
		+  '<td class="jky-td-name-s"	>'	+ JKY.fix_null	(the_row.customer_name		)	+ '</td>'
		+  '<td class="jky-td-number"	>'	+ JKY.fix_null	(the_row.sale_number		)	+ '</td>'
		+  '<td class="jky-td-number"	>'	+ JKY.fix_null	(the_row.po_number			)	+ '</td>'
		+  '<td class="jky-td-amount"	>'	+ JKY.fix_null	(the_row.debit_amount		)	+ '</td>'
		+  '<td class="jky-td-amount"	>'	+ JKY.fix_null	(the_row.credit_amount		)	+ '</td>'
		+  '<td class="jky-td-reversal"	>'	+					  my_reversal				+ '</td>'
		+  '<td class="jky-td-document"	>'	+ JKY.fix_null	(the_row.document			)	+ '</td>'
		+  '<td class="jky-td-remarks"	>'	+ JKY.fix_null	(the_row.remarks			)	+ '</td>'
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
	JKY.set_option	('jky-parent-company'	, the_row.parent_id		);
	JKY.set_option	('jky-contact-tag'		, the_row.tags			);
	JKY.set_value	('jky-cnpj'				, the_row.cnpj			);
	JKY.set_value	('jky-ie'				, the_row.ie			);
	JKY.set_value	('jky-im'				, the_row.im			);
	JKY.set_value	('jky-credit-limit'		, the_row.credit_limit	);
	JKY.set_value	('jky-payment-type'		, the_row.payment_type	);
	JKY.set_value	('jky-website'			, the_row.website		);
	JKY.set_value	('jky-position'			, the_row.position		);
	JKY.set_value	('jky-email'			, the_row.email			);
	JKY.set_value	('jky-transport-id'		, the_row.transport_id	);
	JKY.set_value	('jky-transport-name'	, the_row.transport_name);
	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);
/*
	JKY.Photo.set_row_id(the_row.id);
	JKY.set_html('jky-download-photo'	, JKY.Photo.out_photo(the_row.photo));
	JKY.set_html('jky-upload-name'		, '');
	JKY.set_html('jky-upload-percent'	, '');
	JKY.set_css ('jky-upload-progress'	, 'width', '0%');
*/
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
	JKY.set_option	('jky-parent-company'	, '');
	JKY.set_option	('jky-contact-tag'		, '');
	JKY.set_value	('jky-cnpj'				, '');
	JKY.set_value	('jky-ie'				, '');
	JKY.set_value	('jky-im'				, '');
	JKY.set_value	('jky-credit-limit'		, '0');
	JKY.set_value	('jky-payment-type'		, '');
	JKY.set_value	('jky-website'			, '');
	JKY.set_value	('jky-position'			, '');
	JKY.set_value	('jky-email'			, '');
	JKY.set_value	('jky-transport-id'		, null);
	JKY.set_value	('jky-transport-name'	, '');
	setTimeout(function() {JKY.process_is_company($('#jky-is-company'));}, 100);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_transport_id	= JKY.get_value('jky-transport-id'	);
		my_transport_id	= (my_transport_id	=== '') ? 'null' : my_transport_id	;

	var my_set = ''
		+       'nick_name=\'' + JKY.get_value	('jky-nick-name'		) + '\''
		+     ', full_name=\'' + JKY.get_value	('jky-full-name'		) + '\''
		+    ', is_company=\'' + JKY.get_yes_no	('jky-is-company'		) + '\''
		+    ', company_id=  ' + JKY.get_value	('jky-contact-company'	)
		+     ', parent_id=  ' + JKY.get_value	('jky-parent-company'	)
		+          ', tags=\'' + JKY.get_value	('jky-contact-tag'		) + '\''
		+          ', cnpj=\'' + JKY.get_value	('jky-cnpj'				) + '\''
		+            ', ie=\'' + JKY.get_value	('jky-ie'				) + '\''
		+            ', im=\'' + JKY.get_value	('jky-im'				) + '\''
		+  ', credit_limit=  ' + JKY.get_value	('jky-credit-limit'		)
		+  ', payment_type=\'' + JKY.get_value	('jky-payment-type'		) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'			) + '\''
		+      ', position=\'' + JKY.get_value	('jky-position'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'			) + '\''
		+  ', transport_id=  ' + my_transport_id
		;
	return my_set;
};

JKY.display_list = function() {
	JKY.show('jky-action-clear'  );
	JKY.show('jky-action-confirm');
	JKY.show('jky-action-print'  );
};
/*
JKY.display_form = function() {
	JKY.hide('jky-action-delete');
};

JKY.process_insert = function(the_id) {
	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
};

JKY.process_delete = function(the_id, the_row) {
	JKY.set_html('jky-contact-company'	, JKY.set_options_array('', JKY.get_companies('is_customer'), true));
	JKY.set_html('jky-parent-company'	, JKY.set_options_array('', JKY.get_companies('parent_id IS NULL AND is_customer'), true));
};
*/
JKY.process_reversal = function(the_this) {
	var $my_this = $(the_this);
	var my_data =
		{ method	: 'update'
		, table		: 'Receivables'
		, set		: 'status = \'Active\''
		, where		: 'id = ' + $my_this.attr('row_id')
		}
	$my_this.parent().html('');

	JKY.ajax(false, my_data, function(the_response) {
		JKY.display_message(JKY.t('Reversed, transaction') + ': ' + the_response.id);
		JKY.refresh_screen(1000);	//	manual interaction
	});
}; 

JKY.process_clear_screen = function() {
	$('#jky-check-all').removeAttr('checked');
	$('#jky-table-body .jky-td-checkbox input').removeAttr('checked');
}

/**
 * confirm screen
 */
JKY.process_confirm_screen = function() {
	$('#jky-check-all').removeAttr('checked');
	$('#jky-table-body .jky-td-checkbox input:checked').each(function() {
		JKY.confirm_row(this, $(this).attr('row_id'));
	});
}

/**
 * confirm row
 */
JKY.confirm_row = function(the_id, the_transaction_id) {
	var my_data =
		{ method	: 'update'
		, table		: 'Receivables'
		, set		: 'status=\'Closed\''
		, where		: 'id = ' + the_transaction_id
		};
	JKY.ajax(false, my_data, function(the_response) {
		JKY.display_message(JKY.t('Confirmed, transaction') + ': ' + the_response.id);
		JKY.refresh_screen(200);	//	ajax interaction
	});
}

/**
 * refresh screen 
 */
JKY.refresh_screen = function(the_delay) {
	if (my_Timeout)	{clearTimeout(my_Timeout);}		// clear pendent display_list
	my_Timeout = setTimeout(function() {
		clearTimeout(my_Timeout);
		JKY.App.display_list();
	}, the_delay);
}

/**
 * print screen
 */
JKY.process_print_screen = function() {
	JKY.show('jky-loading');
//window.print();
//	var my_html = $('#jky-app-body').html();
/*
	var my_html = ''
		+ "<table class='jky-print-box'><tbody>"

		+ "<tr>"
		+ "<td class='jky-print-label'><span>     Customer</span>:</td><td id='jky-print-customer-name'		class='jky-print-customer'	></td>"
		+ "<td class='jky-print-label'><span>    Quotation</span>:</td><td id='jky-print-quotation-number'	class='jky-print-quotation'	></td>"
		+ "<td class='jky-print-label'>						 PC:</td><td id='jky-print-produce-to-date'	class='jky-print-date'		></td>"
		+ "<td class='jky-print-space'></td>"
		+ "<td class='jky-print-label'><span>         Date</span>:</td><td id='jky-print-quoted-date'		class='jky-print-date'		></td>"
		+ "</tr>"

		+ "</tbody></table>"
		+ "<br>"

		+ "<table><tbody id='jky-print-body'></tbody></table>"

		+ "<br>"
		;
*/
//	JKY.set_html('jky-printable', my_html);

/*
	JKY.set_html('jky-print-customer-name'	,				my_row.customer_name	);
	JKY.set_html('jky-print-quotation-number'	,				my_row.quotation_number	);
	JKY.set_html('jky-print-produce-to-date'	, JKY.out_date (my_checkout_at)			);
	JKY.set_html('jky-print-quoted-date'		, JKY.out_date (my_row.quoted_at)		);
*/
//	my_html = $('#jky-table-body').html();

	var my_html = '';
	var $my_rows = $('#jky-table-body tr');
	$my_rows.each(function() {
		var $my_row = $(this);
		var $my_fields = $my_row.find('td');
		my_html += ''
			+ '<tr>'
			+ '<td class="jky-print-date"		>' + $($my_fields[1]).html()
			+ '<td class="jky-print-type"		>' + $($my_fields[2]).html()
			+ '<td class="jky-print-name"		>' + $($my_fields[3]).html()
			+ '<td class="jky-print-number"		>' + $($my_fields[4]).html()
			+ '<td class="jky-print-number"		>' + $($my_fields[5]).html()
			+ '<td class="jky-print-amount"		>' + $($my_fields[6]).html()
			+ '<td class="jky-print-amount"		>' + $($my_fields[7]).html()
			+ '<td class="jky-print-document"	>' + $($my_fields[9]).html()
			+ '</tr>'
			;
	})
	JKY.set_html('jky-print-body', my_html);
//	JKY.t_tag('jky-printable', 'span');

//	JKY.show('jky-printable');
	$("#jky-printable").print();
	JKY.hide('jky-loading');
};
