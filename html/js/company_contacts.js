/*
 * display address ---------------------------------------------------------
 */
JKY.display_address = function(the_row) {
	JKY.set_value	('jky-street1'	, the_row.street1	);
	JKY.set_value	('jky-st-number', the_row.st_number	);
	JKY.set_value	('jky-st-cpl'	, the_row.st_cpl	);
	JKY.set_value	('jky-street2'	, the_row.street2	);
	JKY.set_value	('jky-city'		, the_row.city		);
	JKY.set_value	('jky-zip'		, the_row.zip		);
	JKY.set_option	('jky-state'	, the_row.state		);
	JKY.set_option	('jky-country'	, the_row.country	);
	JKY.set_value	('jky-district'	, the_row.district	);
}

/*
 * display phones ---------------------------------------------------------
 */
JKY.display_phones = function(the_row) {
	JKY.set_value	('jky-phone'	, the_row.phone		);
	JKY.set_value	('jky-mobile'	, the_row.mobile	);
	JKY.set_value	('jky-fax'		, the_row.fax		);
	JKY.set_value	('jky-skype'	, the_row.skype		);
	JKY.set_value	('jky-nextel'	, the_row.nextel	);
}

/*
 * display contacts ---------------------------------------------------------
 */
JKY.display_contacts = function(the_id) {
	var my_data =
		{ method		: 'get_index'
		, table			: 'Contacts'
		, specific		: 'company'
		, specific_id	: the_id
		, select		: 'All'
		, order_by		: 'Contacts.full_name'
		};
	JKY.ajax(false, my_data, function(the_response) {
		var my_html  = '';
		var my_rows	 = the_response.rows;
		if (my_rows != '') {
			for(var i in my_rows) {
				var my_row = my_rows[i];
				my_html += JKY.generate_contact(my_row);
			}
		}
		JKY.set_html('jky-contacts-body', my_html);
	})
}

/*
 * display remarks ---------------------------------------------------------
 */
JKY.display_remarks = function(the_row) {
	JKY.set_value	('jky-remarks'	 , JKY.decode	(the_row.remarks	));
	JKY.set_value	('jky-extra-info',				 the_row.extra_info	 );
}

/*
 * display payments ---------------------------------------------------------
 */
JKY.display_payments = function(the_row) {
	JKY.set_radio	('jky-is-taxable'		, the_row.is_taxable	);
	JKY.set_radio	('jky-icms-exemption'	, the_row.icms_exemption);
	JKY.set_radio	('jky-deduct-cone'		, the_row.deduct_cone	);
	JKY.set_value	('jky-interest-rate'	, the_row.interest_rate	);
	JKY.set_value	('jky-payments'			, the_row.payments		);
	JKY.set_value	('jky-alert'			, the_row.alert			);

	$('#jky-interest-rate').ForceNumericOnly();
}

JKY.generate_contact = function(the_row) {
	var my_html = ''
		+ '<tr contact_id=' + the_row.id + '>'
		+ '<td class="jky-full-name"	>' + the_row.full_name	+ '</td>'
		+ '<td class="jky-user-role"	>' + the_row.user_role	+ '</td>'
		+ '<td class="jky-phone"		>' + the_row.phone		+ '</td>'
		+ '<td class="jky-mobile"		>' + the_row.mobile		+ '</td>'
		+ '<td class="jky-email"		>' + the_row.email		+ '</td>'
		+ '<td class="jky-user-name"	>' + the_row.user_name	+ '</td>'
		+ '</tr>'
		;
	return my_html;
}

JKY.verify_user_name = function() {
	JKY.display_trace('verify_user_name');
	var my_user_name = JKY.get_value('jky-user-name');
	var my_error = '';

	if (!JKY.is_empty(my_user_name)) {
		var my_user_id = JKY.get_user_id(my_user_name);
		if (!JKY.is_empty(my_user_id)								//	found user_name
		&& (JKY.row == null || my_user_id != JKY.row.user_id)) {	//	and not the same record
			my_error += JKY.set_already_taken('User Name');
		}
	}

	if (!JKY.is_empty(my_error)) {
		JKY.display_message(my_error);
		JKY.set_focus('jky-user-name', 100);
		return false;
	}else{
		return true;
	}
}

JKY.verify_input = function() {
	JKY.display_trace('verify_input');
	var my_first_name= JKY.get_value('jky-first-name');
	var my_last_name = JKY.get_value('jky-last-name');
	var my_email	 = JKY.get_value('jky-email'	);
	var my_user_name = JKY.get_value('jky-user-name');
	var my_error = '';

	if (JKY.is_empty(my_first_name)) {
		my_error += JKY.set_is_required('First Name');
	}
	if (JKY.is_empty(my_last_name)) {
		my_error += JKY.set_is_required('Last Name');
	}
	if (!JKY.is_empty(my_email) && !JKY.is_email(my_email)) {
		my_error += JKY.set_is_invalid('Email');
	}
	if (!JKY.is_empty(my_user_name)) {
		var my_user_id = JKY.get_user_id(my_user_name);
		if (!JKY.is_empty(my_user_id)								//	found user_name
		&& (JKY.row == null || my_user_id != JKY.row.user_id)) {	//	and not the same record
			my_error += JKY.set_already_taken('User Name');
		}
	}

	if (!JKY.is_empty(my_error)) {
		JKY.display_message(my_error);
		JKY.set_focus('jky-user-name', 100);
		return false;
	}else{
		return true;
	}
}

JKY.buscar_cep = function(the_id) {
	JKY.show('jky-loading');
	var my_data =
		{ method	: 'buscar_cep'
		, zip		: JKY.get_value('jky-zip'		)
		, state		: JKY.get_value('jky-state'		)
		, city		: JKY.get_value('jky-city'		)
		, street2	: JKY.get_value('jky-street2'	)
		, street1	: JKY.get_value('jky-street1'	)
		, district	: JKY.get_value('jky-district'	)
		, country	: JKY.get_value('jky-country'	)
		};
	JKY.ajax(false, my_data, function(the_row) {
		JKY.set_value	('jky-street1'	, the_row.street1	);
		JKY.set_value	('jky-street2'	, the_row.street2	);
		JKY.set_value	('jky-city'		, the_row.city		);
		JKY.set_value	('jky-zip'		, the_row.zip		);
		JKY.set_option	('jky-state'	, the_row.state		);
		JKY.set_option	('jky-country'	, the_row.country	);
		JKY.set_value	('jky-district'	, the_row.district	);
		JKY.hide('jky-loading');
	})
}

JKY.save_address = function() {
	var my_set  =     'street1 = \'' + JKY.get_value('jky-street1'	) + '\''
				+ ', st_number = \'' + JKY.get_value('jky-st-number') + '\''
				+    ', st_cpl = \'' + JKY.get_value('jky-st-cpl'	) + '\''
				+   ', street2 = \'' + JKY.get_value('jky-street2'	) + '\''
				+      ', city = \'' + JKY.get_value('jky-city'		) + '\''
				+     ', state = \'' + JKY.get_value('jky-state'	) + '\''
				+       ', zip = \'' + JKY.get_value('jky-zip'		) + '\''
				+   ', country = \'' + JKY.get_value('jky-country'	) + '\''
				+  ', district = \'' + JKY.get_value('jky-district'	) + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Address saved, ' + the_response.message);
		JKY.row = JKY.get_row('Contacts', JKY.row.id);
	})
}

JKY.save_phones = function() {
	var my_set  =     'phone = \'' + JKY.get_value('jky-phone'	) + '\''
				+  ', mobile = \'' + JKY.get_value('jky-mobile'	) + '\''
				+     ', fax = \'' + JKY.get_value('jky-fax'	) + '\''
				+   ', skype = \'' + JKY.get_value('jky-skype'	) + '\''
				+  ', nextel = \'' + JKY.get_value('jky-nextel'	) + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Phones saved, ' + the_response.message);
		JKY.row = JKY.get_row('Contacts', JKY.row.id);
	})
}

JKY.save_remarks = function() {
	var my_set  =      'remarks = \'' + JKY.get_value('jky-remarks'		) + '\''
				+ ', extra_info = \'' + JKY.get_value('jky-extra-info'	) + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Remarks saved, ' + the_response.message);
		JKY.row = JKY.get_row('Contacts', JKY.row.id);
	})
}

JKY.save_payments = function() {
	var my_interest_rate = JKY.get_value('jky-interest-rate');
	if (my_interest_rate == '') {
		my_interest_rate = 'null';
	}
	var my_set  =       'is_taxable = \'' + JKY.get_checked('jky-is-taxable'	) + '\''
				+ ', icms_exemption = \'' + JKY.get_checked('jky-icms-exemption') + '\''
				+    ', deduct_cone = \'' + JKY.get_checked('jky-deduct-cone'	) + '\''
				+  ', interest_rate =   ' +					 my_interest_rate
				+       ', payments = \'' + JKY.get_value  ('jky-payments'		) + '\''
				+          ', alert = \'' + JKY.get_value  ('jky-alert'			) + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, function(the_response) {
		JKY.display_message('Payments saved, ' + the_response.message);
		JKY.row = JKY.get_row('Contacts', JKY.row.id);
	})
}