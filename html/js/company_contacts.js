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
	JKY.ajax(false, my_data, JKY.generate_contacts);
}

JKY.generate_contacts = function(response) {
	var my_html		= '';
	var my_rows		= response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html += JKY.generate_row(my_row);

		}
	}
	JKY.set_html('jky-contacts-body', my_html);
}

JKY.generate_row = function(the_row) {
	var my_id = the_row.id;
/*
	var my_thread = ''
		+ "<input class='jky-thread-row-id' type='hidden' value=" + my_thread_id + " />"
		+ "<input class='jky-thread-row-name jky-form-value' readonly='readonly' onclick='JKY.update_thread(this, " + my_id + ")' value='" + my_name + "' />"
		+ "<a href='#' onClick='JKY.Thread.display(this)'><i class='icon-share'></i></a>"
		;
*/
	var my_html = ''
		+ '<tr contact_id=' + my_id + '>'
		+ '<td class="jky-full-name"	>' + the_row.full_name	+ '</td>'
		+ '<td class="jky-mobile"		>' + the_row.mobile		+ '</td>'
		+ '<td class="jky-email"		>' + the_row.email		+ '</td>'
		+ '<td class="jky-user-name"	>' + the_row.user_name	+ '</td>'
		+ '<td class="jky-user-role"	>' + the_row.user_role	+ '</td>'
		+ '</tr>'
		;
	return my_html;
}


/*
 * display address ---------------------------------------------------------
 */
JKY.display_address = function(the_row) {
	JKY.set_value	('jky-street1'	, the_row.street1	);
	JKY.set_value	('jky-street2'	, the_row.street2	);
	JKY.set_value	('jky-city'		, the_row.city		);
	JKY.set_value	('jky-zip'		, the_row.zip		);
	JKY.set_option	('jky-state'	, the_row.state		);
	JKY.set_option	('jky-country'	, the_row.country	);
}

/*
 * display phones ---------------------------------------------------------
 */
JKY.display_phones = function(the_row) {
	JKY.set_value	('jky-phone'	, the_row.phone		);
	JKY.set_value	('jky-mobile'	, the_row.mobile	);
	JKY.set_value	('jky-fax'		, the_row.fax		);
}

JKY.verify_user_name = function() {
	JKY.display_trace('verify_user_name');
	var my_user_name = JKY.get_value('jky-user-name');
	var my_error = '';

	if (!JKY.is_empty(my_user_name)) {
		var my_user_id = JKY.get_user_id(my_user_name);
//	JKY.display_message('my_user_id: ' + my_user_id + ', JKY.row.user_id: ' + JKY.row.user_id);
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
//	JKY.display_message('my_user_id: ' + my_user_id + ', JKY.row.user_id: ' + JKY.row.user_id);
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

JKY.save_address = function() {
//	JKY.display_message('JKY.save_address');
	var my_set  =   'street1 = \'' + JKY.get_value('jky-street1') + '\''
				+ ', street2 = \'' + JKY.get_value('jky-street2') + '\''
				+    ', city = \'' + JKY.get_value('jky-city'	) + '\''
				+   ', state = \'' + JKY.get_value('jky-state'	) + '\''
				+     ', zip = \'' + JKY.get_value('jky-zip'	) + '\''
				+ ', country = \'' + JKY.get_value('jky-country') + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, JKY.save_address_success);
}

JKY.save_address_success = function(response) {
//	JKY.display_trace('save_address_success');
	JKY.display_message('Address saved, ' + response.message);
}

JKY.save_phones = function() {
//	JKY.display_message('JKY.save_phones');
	var my_set  =     'phone = \'' + JKY.get_value('jky-phone'	) + '\''
				+  ', mobile = \'' + JKY.get_value('jky-mobile'	) + '\''
				+     ', fax = \'' + JKY.get_value('jky-fax'	) + '\''
				;
	var my_where = 'id = ' + JKY.row.id;
	var my_data =
		{ method: 'update'
		, table : 'Contacts'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(true, my_data, JKY.save_phones_success);
}

JKY.save_phones_success = function(response) {
//	JKY.display_trace('save_phones_success');
	JKY.display_message('Phones saved, ' + response.message);
}