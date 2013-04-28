JKY.verify_user_name = function() {
//	JKY.display_message('JKY.verify_user_name');
	var my_error = '';
	var my_user_name = JKY.get_value('jky-user-name');
	var my_user_role = JKY.get_value('jky-user-role');

	if (JKY.is_empty(my_error) && JKY.is_empty(my_user_name)) {
		my_error += JKY.set_is_required('User Name');
	}
	if (JKY.is_empty(my_error)) {
		var my_where = 'user_name = \'' + my_user_name + '\'';
		var my_user_id = JKY.get_id('JKY_Users', my_where);
//	JKY.display_message('my_user_id: ' + my_user_id + ', JKY.row.user_id: ' + JKY.row.user_id);
		if (!JKY.is_empty(my_user_id)			//	found user_name
		&&  my_user_id != JKY.row.user_id) {	//	but not the same record
			my_error += JKY.set_already_taken('User Name [' + my_user_name + ']');
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

JKY.insert_user = function(contact_id, user_id) {
	var my_user_name = JKY.get_value('jky-user-name');
	var my_user_role = JKY.get_value('jky-user-role');
	if (JKY.is_empty(my_user_name)) {
		return;
	}
	if (!JKY.is_empty(user_id)) {
		JKY.update_user(contact_id, user_id);
		return;
	}
	JKY.display_message('JKY.insert_user');
	var my_set  =  'contact_id =   ' + contact_id
				+ ', user_name = \'' + my_user_name + '\''
				+ ', user_role = \'' + my_user_role + '\''
				;
	var my_data =
		{ method: 'insert'
		, table : 'JKY_Users'
		, set	: my_set
		};
	JKY.ajax(false, my_data, JKY.insert_user_success);
}

JKY.insert_user_success = function(response) {
	JKY.display_trace('insert_user_success');
	JKY.display_message(response.message);
}

JKY.update_user = function(contact_id, user_id) {
	var my_user_name = JKY.get_value('jky-user-name');
	var my_user_role = JKY.get_value('jky-user-role');
	if (JKY.is_empty(my_user_name)) {
		return;
	}
	if (JKY.is_empty(user_id)) {
		JKY.insert_user(contact_id, user_id);
		return;
	}
	JKY.display_message('JKY.update_user: ' + contact_id + ' : ' + user_id);
	var my_set  =  'contact_id =   ' + contact_id
				+ ', user_name = \'' + my_user_name + '\''
				+ ', user_role = \'' + my_user_role + '\''
				;
	var my_where = 'id = ' + user_id;
	var my_data =
		{ method: 'update'
		, table : 'JKY_Users'
		, set	: my_set
		, where : my_where
		};
	JKY.ajax(false, my_data, JKY.update_user_success);
}

JKY.update_user_success = function(response) {
	JKY.display_trace('update_user_success');
	JKY.display_message(response.message);
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