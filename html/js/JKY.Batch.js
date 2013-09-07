"use strict";

/**
 * JKY.Batch - process all changes during one transaction
 *			   control save into private array [my_appraisals]
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-thread-row-id'  ).val(the_id );
 *		$(my_parent).find('.jky-thread-row-name').val(my_name);
 */
JKY.Batch = function() {
	var my_index 	= null;		//	external id that initiated the call
	var my_id		= null;
	var my_layer	= 'jky-boxes-layer';
	var my_row		= null;

	var my_received_boxes 	= 0;
	var my_labels_printed	= 0;

	function my_display(the_index, the_id) {
		my_index = the_index;
		my_id	 = the_id;
		my_load_data(my_id);
	}

	function my_load_data(the_id) {
		var my_data =
			{ method	: 'get_row'
			, table		: 'Batches'
			, where		: 'Batches.id=' + the_id
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		my_row = response.row;
		my_received_boxes 	= parseFloat(my_row.received_boxes	);
		my_labels_printed	= parseFloat(my_row.labels_printed	);
		var my_labels_unprinted	= my_received_boxes - my_labels_printed;
		var my_labels_to_print  = 16;
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_average_weight = my_row.average_weight;

		JKY.set_value('jky-boxes-received-boxes'	, my_received_boxes		);
		JKY.set_value('jky-boxes-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-boxes-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-boxes-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-boxes-location'			, '');
		JKY.set_value('jky-boxes-average-weight'	, my_row.average_weight	);

		if (my_average_weight < 20.00
		||  my_average_weight > 40.00) {
			JKY.set_css('jky-boxes-average-weight', 'color', '#CC0000');
		}else{
			JKY.set_css('jky-boxes-average-weight', 'color', '#51A351');
		}

		JKY.set_focus('jky-boxes-labels-to-print');
		JKY.show_modal(my_layer);
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
		var my_batch_number		= my_row.batch				;
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
+ "\n" + 'INV;POINT;324;248;16;16;*' + my_batch_number		+ '*'
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
		  display		: function(the_index, the_id)	{		my_display(the_index, the_id);}
		, print			: function()					{		my_print();}
	};
}();