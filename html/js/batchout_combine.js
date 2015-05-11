"use strict";
var JKY = JKY || {};
/*
 * display Combine -------------------------------------------------------------
 */

JKY.display_combine = function(the_row) {
    var my_where = ''
        + ' AND      BatchOuts.status       = \'Draft\''
        + ' AND DATE(CheckOuts.checkout_at) = DATE(\''  + the_row.checkout_at   + '\')'
        + ' AND      Machines.name          = \''       + the_row.machine_name  + '\''
        + ' AND      Threads.name           = \''       + the_row.thread_name   + '\''
        + ' AND      Batches.batch          = \''       + the_row.batch_code    + '\''
        ;
	var my_data =
		{ method		: 'get_index'
		, table			: 'BatchOuts'
		, where			:  my_where
		, order_by		: 'requested_at'
		};
	JKY.ajax(false, my_data, JKY.generate_combine);
};

JKY.generate_combine = function(the_response) {
	var my_html  = '';
	var my_rows  = the_response.rows;
	if (my_rows !== '') {
		for(var i in my_rows) {
			var my_row = my_rows[i];
			my_html  += ''
				+ '<tr data-id=' + my_row.id + '>'
				+ '<td class="jky-td-checkbox"	><input type="checkbox" checked="checked" /></td>'
				+ '<td class="jky-td-number"	><input disabled	class="jky-checkin-location"	value="' +				my_row.checkout_number	+ '" /></td>'
				+ '<td class="jky-td-date"		><input disabled	class="jky-checkin-date"		value="' + JKY.out_date(my_row.requested_at)	+ '" /></td>'
				+ '<td class="jky-td-weight"	><input disabled	class="jky-checkin-weight"		value="' +				my_row.requested_weight	+ '" /></td>'
				+ '<td class="jky-td-weight"	><input disabled	class="jky-checkin-weight"		value="' +				my_row.checkout_weight	+ '" /></td>'
				+ '<td class="jky-td-boxes"		><input disabled	class="jky-checkin-boxes"		value="' +				my_row.requested_boxes	+ '" /></td>'
				+ '<td class="jky-td-boxes"		><input disabled	class="jky-reserved-boxes"		value="' +				my_row.reserved_boxes	+ '" /></td>'
				+ '<td class="jky-td-boxes"		><input disabled	class="jky-reserved-boxes"		value="' +				my_row.checkout_boxes	+ '" /></td>'
				+ '</tr>'
				;
		}
	}
	JKY.set_html('jky-combine-body', my_html);

	if (JKY.row.status === 'Closed' || my_rows.length === 1) {
		$('#jky-button-combine').prop('disabled', true );
	}else{
		$('#jky-button-combine').prop('disabled', false);
	}
};

JKY.process_combine = function() {
	var my_table_name = 'BatchOuts';
	var my_minimum = 2;
	var my_count = $('#jky-combine-body .jky-td-checkbox input:checked').length;
	if (my_count < my_minimum) {
		JKY.d(my_count + ' ' + JKY.t('selected rows is less than the minimum of') + ' ' + my_minimum);
	}else{
		var my_row;
		var my_reserved_boxes	= 0;
		var my_requested_weight	= 0;
		var my_requested_boxes	= 0;
		var my_checkout_weight	= 0;
		var my_checkout_boxes	= 0;

		$('#jky-combine-body .jky-td-checkbox input:checked').each(function() {
			var my_id = $(this).parent().parent().data('id');
			my_row = JKY.get_row(my_table_name, my_id);
			my_requested_weight	+= parseFloat	(my_row.requested_weight);
			my_checkout_weight	+= parseFloat	(my_row.checkout_weight	);
			my_reserved_boxes	+= parseInt		(my_row.reserved_boxes	);
			my_requested_boxes	+= parseInt		(my_row.requested_boxes	);
			my_checkout_boxes	+= parseInt		(my_row.checkout_boxes	);
			JKY.d('Combine BatchOut: ' + my_id);
		});

		var my_set = ''
			+      ' checkout_id=  ' + my_row.checkout_id
			+       ', thread_id=  ' + my_row.thread_id
			+'      , batchin_id=  ' + my_row.batchin_id
			+' , order_thread_id=  ' + my_row.order_thread_id
			+'           , batch=\'' + my_row.batch + '\''
			+'      , unit_price=  ' + my_row.unit_price
			+'  , average_weight=  ' + my_row.average_weight
			+'  , reserved_boxes=  ' + my_reserved_boxes
			+', requested_weight=  ' + my_requested_weight
			+' , requested_boxes=  ' + my_requested_boxes
			+'  , checkout_boxes=  ' + my_checkout_boxes
			+' , checkout_weight=  ' + my_checkout_weight
			;
		var my_data =
			{ method: 'insert'
			, table :  my_table_name
			, set	:  my_set
			};
		JKY.ajax(false, my_data, function(the_response) {
			var my_parent_id = the_response.id;
			$('#jky-combine-body .jky-td-checkbox input:checked').each(function() {
				var my_id = $(this).parent().parent().data('id');
				var my_set = ''
					+	  ' status = \'Active\''
					+ ', parent_id = ' + my_parent_id
					;
				var my_data =
					{ method: 'update'
					, table :  my_table_name
					, set	:  my_set
					, where :  'id = ' + my_id
					};
				JKY.ajax(false, my_data);
			});
		});

		$('#jky-combine-body .jky-td-checkbox input:checked').each(function() {
			var my_id = $(this).parent().parent().data('id');
			my_row = JKY.get_row(my_table_name, my_id);
			var my_data =
				{ method: 'update'
				, table :  my_table_name
				, set	:  'status = \'History\''
				, where :  'id = ' + my_id
				};
			JKY.ajax(false, my_data);
		});

		setTimeout(function() {
			JKY.App.display_list();
		}, 1000);
	}
};