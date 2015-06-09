"use strict";

/**
 * JKY.Division - process all changes during one transaction
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-division-id'  ).val(the_id );
 *		$(my_parent).find('.jky-division-name').val(my_name);
 */
JKY.Division = function() {
	var my_tr		=  null;		//	external tr that initiated the call
	var my_layer	= 'jky-division-layer';

	function my_display(the_this) {
		my_tr = $(the_this).parent().parent();

		var my_average_weight	= my_tr.find('.jky-average-weight'	).val();
		var my_requested_weight	= my_tr.find('.jky-requested-weight').val();
		var my_scheduled_date	= my_tr.find('.jky-scheduled-date'	).val();
		var my_requested_boxes	= my_tr.find('.jky-requested-boxes'	).val();

		var my_divide_max = parseInt(my_requested_boxes);
		if (my_divide_max > 20) {
			my_divide_max = 20;
		}

		JKY.set_value('jky-division-average-weight'		, my_average_weight		);
		JKY.set_value('jky-division-requested-weight'	, my_requested_weight	);
		JKY.set_value('jky-division-scheduled-date'		, my_scheduled_date		);
		JKY.set_value('jky-division-requested-boxes'	, my_requested_boxes	);
		JKY.set_value('jky-division-divide-in'			, my_divide_max			);
		JKY.set_value('jky-division-divide-max'			, my_divide_max			);

		JKY.set_focus('jky-division-divide-in');
		JKY.show_modal(my_layer);
	}

	function my_divide_thread() {
		var my_divide_in  = parseInt(JKY.get_value('jky-division-divide-in'			));
		var my_divide_max = parseInt(JKY.get_value('jky-division-divide-max'		));
		if (isNaN(my_divide_in)
		||  my_divide_in < 2
		||  my_divide_in > my_divide_max) {
			JKY.display_message(JKY.t('Divide In') + ' ' + JKY.t('is invalid'));
			JKY.set_focus('jky-division-divide-in');
			return false;
		}

		var my_requested_boxes	= parseInt	(JKY.get_value('jky-division-requested-boxes'	));
		var my_requested_weight	= parseFloat(JKY.get_value('jky-division-requested-weight'	));
		var my_each_boxes		= Math.floor(my_requested_boxes  / my_divide_in);
		var my_each_weight		= Math.floor(my_requested_weight / my_divide_in);

		var my_batch_id = my_tr.attr('batch_id');
		var my_row = JKY.get_row('BatchOuts', my_batch_id);

		var my_sql = ''
			+          'parent_id =  ' + my_row.parent_id
			+      ', checkout_id =  ' + my_row.checkout_id
			+        ', thread_id =  ' + my_row.thread_id
			+      ', supplier_id =  ' + my_row.supplier_id
			+       ', batchin_id =  ' + my_row.batchin_id
			+      ', req_line_id =  ' + my_row.req_line_id
			+  ', tdyer_thread_id =  ' + my_row.tdyer_thread_id
			+  ', order_thread_id =  ' + my_row.order_thread_id
//			+   ', scheduled_date =  ' + my_row.scheduled_date
			+             ', code =\'' + my_row.code  + '\''
			+            ', batch =\'' + my_row.batch + '\''
			+       ', unit_price =  ' + my_row.unit_price
			+   ', average_weight =  ' + my_row.average_weight
			+  ', requested_boxes =  ' + my_each_boxes
			+ ', requested_weight =  ' + my_each_weight
			;
		for(var i=1; i<my_divide_in; i++) {
			my_requested_weight -= my_each_weight;
			my_requested_boxes  -= my_each_boxes ;
			var my_set = my_sql
				+ ', scheduled_date = DATE_ADD(\'' + my_row.scheduled_date + '\', INTERVAL ' + i + ' DAY)'
				;
			var my_data =
				{ method	: 'insert'
				, table		: 'BatchOuts'
				, set		:  my_set
				};
			JKY.ajax(true, my_data, function(the_response) {
				JKY.display_message(the_response.message);
			});
		}

		var my_set = ''
			+  '  requested_boxes =  ' + my_requested_boxes
			+ ', requested_weight =  ' + my_requested_weight
			;
		var my_data =
			{ method	: 'update'
			, table		: 'BatchOuts'
			, set		:  my_set
			, where		: 'BatchOuts.id = ' + my_batch_id
			};
		JKY.ajax(true, my_data, function(the_response) {
			JKY.display_message(the_response.message);
		});

		JKY.hide_modal(my_layer);
		return true;
	}

	return {
		  display		: function(the_this)	{		my_display			(the_this);}
		, divide_thread	: function()			{return my_divide_thread			();}
	};
}();