"use strict";

/**
 * JKY.BatchIns
 *
 */
JKY.BatchIns = function() {
	var my_index 	= null;		//	external id that initiated the call
	var my_id		= null;
	var my_layer	= 'jky-boxes-layer';
	var my_row		= null;

	var my_received_boxes 	= 0;
	var my_labels_printed	= 0;

	function my_display() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'Batches'
			, specific		: 'thread'
			, specific_id	:  JKY.row.id
			, select		: 'All'
			, display		:  20
			, order_by		: 'invoice_date DESC, supplier_name'
			};
		JKY.ajax(false, my_data, function(the_response) {
			var my_html = '';
			if (the_response.rows != '') {
				for(var i in the_response.rows) {
					var my_row = the_response.rows[i];
					my_html += my_generate_row(my_row);
				}
			}
			JKY.set_html('jky-batchins-body', my_html);
		})
	}

	function my_generate_row(the_row) {
		var my_amount = (the_row.checkin_weight * the_row.unit_price).toFixed(2);
		var my_html = '<tr>'
					+ '<td class="jky-td-date"		>' + JKY.out_date(the_row.invoice_date) + '</td>'
					+ '<td class="jky-td-date"		>' + JKY.out_date(the_row.received_at ) + '</td>'
					+ '<td class="jky-td-name-s"	>' + the_row.supplier_name	+ '</td>'
					+ '<td class="jky-td-number"	>' + JKY.fix_null(the_row.nfe_dl)		+ '</td>'
					+ '<td class="jky-td-number"	>' + JKY.fix_null(the_row.nfe_tm)		+ '</td>'
					+ '<td class="jky-td-boxes"		>' + the_row.checkin_boxes	+ '</td>'
					+ '<td class="jky-td-weight"	>' + the_row.checkin_weight	+ '</td>'
//					+ '<td class="jky-td-amount"	>' + my_amount				+ '</td>'
					+ '<td class="jky-td-amount"	>' + the_row.unit_price		+ '</td>'
					+ '</tr>'
					;
		return my_html;
	}

	function my_print() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-boxes-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-boxes-labels-to-print' ));
		var my_location			= JKY.get_value('jky-boxes-location').toUpperCase();
		if (isNaN(my_labels_to_print)
		||  my_labels_to_print < 1
		||	my_labels_to_print > 100
		||  my_location == '') {
			JKY.display_message(JKY.t('Info is invalid'));
			JKY.set_focus('jky-boxes-labels-to-print');
			return;
		}
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_data = '';
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_received_boxes);
			var my_set = ''
					+          ' batch_id =  ' + my_id
					+  ', number_of_boxes =  ' + my_labels_printed
					+  ', number_of_cones =  ' + my_row.number_of_cones
					+   ', average_weight =  ' + my_row.average_weight
					+ ', checkin_location =\'' + my_location + '\''
					+       ', checkin_by =  ' + JKY.Session.get_value('user_id')
					+       ', checkin_at =\'' + JKY.get_now() + '\''
					;
			my_data =
				{ method	: 'insert'
				, table		: 'Boxes'
				, set		: my_set
				}
			JKY.ajax(false, my_data, my_insert_boxes_success);
		}
		my_data =
			{ method	: 'update'
			, table		: 'Batches'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Batches.id=' + my_id
			};
		JKY.ajax(false, my_data, my_update_data_success);
	}

	function my_insert_boxes_success(response) {
return;
		var my_data =
			{ method	: 'get_row'
			, table		: 'Boxes'
			, where		: 'Boxes.id = ' + response.id
			}
		JKY.ajax(false, my_data, my_get_row_boxes_success);
	}

	function my_get_row_boxes_success(response) {
		var my_row = response.row;
		var my_thread_id		= JKY.get_value_by_id('Batches'		, 'thread_id'	, my_row.batch_id	);
		var my_incoming_id		= JKY.get_value_by_id('Batches'		, 'incoming_id'	, my_row.batch_id	);
		var my_nfe_dl			= JKY.get_value_by_id('Incomings'	, 'nfe_dl'		, my_incoming_id	);
		var my_nfe_tm			= JKY.get_value_by_id('Incomings'	, 'nfe_tm'		, my_incoming_id	);
		var my_supplier_id		= JKY.get_value_by_id('Incomings'	, 'supplier_id'	, my_incoming_id	);
		var my_composition		= JKY.get_value_by_id('Threads'		, 'composition'	, my_thread_id		);
		var my_thread_name		= JKY.get_value_by_id('Threads'		, 'name'		, my_thread_id		);
		var my_supplier_name	= JKY.get_value_by_id('Contacts'	, 'nick_name'	, my_supplier_id	);

		var my_checkin_at		= JKY.out_time	(my_row.checkin_at		);
		var my_average_weight	= parseFloat	(my_row.average_weight	);
		var my_real_weight		= parseFloat	(my_row.real_weight		);
		if (my_real_weight == 0) {
			my_real_weight = my_average_weight;
		}
		var my_number_of_boxes	= my_row.number_of_boxes	;
		var my_number_of_cones	= my_row.number_of_cones	;
		var my_batch_code		= my_row.batch				;
		var my_checkin_location	= my_row.checkin_location	;
		var my_barcode			= my_row.barcode			;

		var my_thread_name1 = my_thread_name;
		var my_thread_name2 = '';
		if (my_thread_name.length > 28) {
			var i = 28;
			for(; i>0; i--) {
				if (my_thread_name[i] == ' ') {
					break;
				}
			}
			if (i == 0) {
				my_thread_name1 = my_thread_name.substr(0, 28);
				my_thread_name2 = my_thread_name.substr(28);
			}else{
				my_thread_name1 = my_thread_name.substr(0, i);
				my_thread_name2 = my_thread_name.substr(i+1);
			}
		}

		var my_html = ''
+ "\n" + '~NORMAL'
+ "\n" + '~NORMAL'
+ "\n" + '~PIOFF'
+ "\n" + '~DELETE LOGO;*ALL'
+ "\n" + '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 6;SLEW IPS 4'

+ "\n" + '~CREATE;CXFIOS;226'
+ "\n" + 'SCALE;DOT;203;203'

+ "\n" + '/PARTE FIXA'
+ "\n" + 'ISET;0'
+ "\n" + 'FONT;FACE 92250'
+ "\n" + 'ALPHA'
+ "\n" + 'INV;POINT;597;788;16;16;*FIO:*'
+ "\n" + 'INV;POINT;482;789;16;16;*FORNEC:*'
+ "\n" + 'INV;POINT;428;789;16;16;*COMP:*'
+ "\n" + 'INV;POINT;377;789;16;16;*PESO:*'
+ "\n" + 'INV;POINT;324;788;16;16;*CONES:*'
+ "\n" + 'INV;POINT;324;358;16;16;*LOTE:*'
+ "\n" + 'INV;POINT;242;789;16;16;*ESTOCAGEM:*'

+ "\n" + 'STOP'

+ "\n" + '/PARTE VARIAVEL'
+ "\n" + 'ISET;0'
+ "\n" + 'FONT;FACE 92250'
+ "\n" + 'ALPHA'

+ "\n" + 'INV;POINT;597;710;16;16;*' + my_thread_name1		+ '*'
+ "\n" + 'INV;POINT;547;710;16;16;*' + my_thread_name2		+ '*'
+ "\n" + 'INV;POINT;482;562;22;22;*' + my_supplier_name		+ '*'
+ "\n" + 'INV;POINT;428;667;16;16;*' + my_composition		+ '*'
+ "\n" + 'INV;POINT;377;671;16;16;*' + my_real_weight		+ ' KG*'
+ "\n" + 'INV;POINT;324;647;16;16;*' + my_number_of_cones	+ '*'
+ "\n" + 'INV;POINT;324;248;16;16;*' + my_batch_code		+ '*'
+ "\n" + 'INV;POINT;242;296;32;32;*' + my_checkin_location	+ '*'

+ "\n" + 'STOP'

+ "\n" + '/CODIGO DE BARRAS'
+ "\n" + 'BARCODE'
+ "\n" + 'C128C;INV;XRD7:7:14:14:21:21:28:28;H8;46;122'
+ "\n" + '*' + my_barcode + '*'
+ "\n" + 'PDF;B'
+ "\n" + 'STOP'

+ "\n" + '/FIM DO PROGRAMA'
+ "\n" + 'END'
+ "\n" + '~EXECUTE;CXFIOS;1'

+ "\n" + '~NORMAL'
			;
		JKY.display_message(my_html);
	}

	function my_update_data_success(response) {
		var my_data =
			{ method	: 'print_labels'
			, table		: 'Boxes'
			}
		JKY.ajax(false, my_data, my_print_labels_success);
	}

	function my_print_labels_success(response) {
		$(my_index).parent().parent().find('.jky-action' ).html('');
		$(my_index).parent().parent().find('.jky-labels-printed' ).val(my_labels_printed);
		JKY.hide_modal(my_layer);
		JKY.display_message(response.message);
	}

	return {
		  display		: function()		{my_display();}
		, print			: function()		{my_print();}
	};
}();