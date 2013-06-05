/*
 * display Settings ------------------------------------------------------------
 */

JKY.display_settings = function() {
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Sets'
		, select	:  JKY.row.id
		};
	JKY.ajax(false, my_data, JKY.generate_settings);
}

JKY.generate_settings = function(response) {
	var my_html  = '';
	var my_rows  = response.rows;
	if (my_rows != '') {
		for(var i in my_rows) {
			var my_row			= my_rows[i];
			var my_id			= my_row.id;
			var my_setting		= my_row.setting;
			var my_name			= my_row.name;
			var my_value		= (my_row.value == null) ? 0 : my_row.value;

			var my_onchange = '';
			if (my_row.value == null) {
				my_onchange = 'JKY.insert_setting(this, ' + my_setting + ')';
			}else{
				my_onchange = 'JKY.update_setting(this, ' + my_setting + ', ' + my_id + ')';
			}

			my_html  += ''
				+ '<tr>'
				+ '<td class="jky-set-label">' + my_name  + '</td>'
				+ '<td class="left" ><input class="jky-set-value" text="text" onchange="' + my_onchange + '" value="' + my_value + '" /></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-set-body', my_html);
}

JKY.insert_setting = function(index, setting) {
	var my_set  = 'ftp_id = ' + JKY.row.id + ', setting_id = ' + setting + ',value = \'' + $(index).val() + '\'';
	var my_data =
		{ method	: 'insert'
		, table		: 'FTP_Sets'
		, set		:  my_set
		};
	JKY.ajax(true, my_data, JKY.insert_settings_success);
	jky_set_index	= index;
	jky_set_setting	= setting;
}

JKY.insert_settings_success = function(response) {
//	JKY.display_message(response.message)
	$(jky_set_index).attr('onchange', 'JKY.update_setting(this, ' + jky_set_setting + ', ' + response.id + ')');
}

JKY.update_setting = function(index, setting, id) {
	var my_set  = 'ftp_id = ' + JKY.row.id + ', setting_id = ' + setting + ',value = \'' + $(index).val() + '\'';
	var my_data =
		{ method	: 'update'
		, table		: 'FTP_Sets'
		, set		:  my_set
		, where		: 'id = ' + id
		};
	JKY.ajax(true, my_data, JKY.update_settings_success);
}

JKY.update_settings_success = function(response) {
//	JKY.display_message(response.message)
}

JKY.print_settings = function(the_id) {
	var my_html  = '';
	var my_data =
		{ method	: 'get_index'
		, table		: 'FTP_Sets'
		, select	:  the_id
		};
	var my_object = {};
	my_object.data = JSON.stringify(my_data);
	$.ajax(
		{ url		: JKY.AJAX_URL
		, data		: my_object
		, type		: 'post'
		, dataType	: 'json'
		, async		: false
		, success	: function(response) {
				if (response.status == 'ok') {
					var my_rows  = response.rows;
					var my_count = my_rows.length;
					var my_half  = Math.ceil(my_count/2);
					for(var i=0; i<my_half; i++) {
						var my_row1		= my_rows[i];
						var my_name1	= my_row1.name;
						var my_value1	= (my_row1.value == null) ? 0 : my_row1.value;

						var my_row2		= '';
						var my_name2	= '';
						var my_value2	= '';

						var j=i+my_half;
						if (j<my_count) {
							my_row2		= my_rows[j];
							my_name2	= my_row2.name;
							my_value2	= (my_row2.value == null) ? 0 : my_row2.value;
						}

						my_html += ''
							+ '<tr>'
							+ '<td></td>'
							+ '<td>' + my_name1  + '</td>'
							+ '<td>' + my_value1 + '</td>'
							+ '<td>' + my_name2  + '</td>'
							+ '<td>' + my_value2 + '</td>'
							+ '</tr>'
							;
					}
				}else{
					JKY.display_message(response.message);
				}
			}
		}
	)
	return my_html;
}

