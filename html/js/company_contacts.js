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