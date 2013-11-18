JKY.process_change_product = function() {
	var my_product_id	= JKY.get_value('jky-product-id');
	var my_ftp_id		= JKY.get_value('jky-ftp-id'	);
	if (my_ftp_id.length > 0) {
		var my_ftp = JKY.get_row('FTPs', my_ftp_id);
		if (my_ftp.product_id != my_product_id) {
			JKY.display_confirm(JKY.clear_current_ftp, JKY.Product.load_data, 'Product', 'The current FTP does not match the new Product. <br>Do you want to <b>clear</b> the current FTP setting?', 'Yes', 'No');
		}
	}
}

JKY.clear_current_ftp = function() {
	JKY.set_value('jky-ftp-id'		, '');
	JKY.set_value('jky-ftp-number'	, '');
	JKY.FTP.display(JKY.get_value('jky-product-id'));
}

JKY.process_change_ftp = function() {
	var my_ftp_id = JKY.get_value('jky-ftp-id');

	if (JKY.row) {
		var my_data =
			{ method: 'delete_many'
			, table : 'OrdThreads'
			, where : 'parent_id = ' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		var my_rows = JKY.get_rows('FTP_Threads', my_ftp_id);
		for(var i=0, max=my_rows.length; i<max; i++) {
			var my_row = my_rows[i];
			var my_set	= ''
						+ '  parent_id = ' + JKY.row.id
						+ ', thread_id = ' + my_row.thread_id
						;
			var my_data =
				{ method	: 'insert'
				, table		: 'OrdThreads'
				, set		:  my_set
				};
			JKY.ajax(false, my_data);
		}
		JKY.display_threads();
	}

	var my_ftp = JKY.get_row('FTPs', my_ftp_id);
	JKY.set_value('jky-machine-id'  , my_ftp.machine_id  );
	JKY.set_value('jky-machine-name', my_ftp.machine_name);
	JKY.set_value('jky-partner-id'	, null);
	JKY.set_value('jky-partner-name', '');
	JKY.set_focus('jky-ordered-value');
}

JKY.clear_produced_by = function(the_name) {
	if (the_name != 'machine') {
		JKY.set_value('jky-machine-id', null);
		JKY.set_value('jky-machine-name', '');
	}
	if (the_name != 'partner') {
		JKY.set_value('jky-partner-id', null);
		JKY.set_value('jky-partner-name', '');
	}
	JKY.set_focus('jky-ordered-value');
}

