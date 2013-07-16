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

	var my_checkin_boxes 	= 0;
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
		my_checkin_boxes 	= parseFloat(my_row.checkin_boxes	);
		my_labels_printed	= parseFloat(my_row.labels_printed	);
		var my_labels_unprinted	= my_checkin_boxes - my_labels_printed;
		var my_labels_to_print  = 16;
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		JKY.set_value('jky-boxes-checkin-boxes'		, my_checkin_boxes		);
		JKY.set_value('jky-boxes-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-boxes-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-boxes-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-boxes-location'			, '');
		JKY.set_focus('jky-boxes-labels-to-print');
		JKY.show_modal(my_layer);
	}


	function my_print() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-boxes-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-boxes-labels-to-print' ));
		var my_location			= JKY.get_value('jky-boxes-location').toUpperCase();
		if (my_labels_to_print <= 0 || my_location == '') {
			JKY.set_focus('jky-boxes-labels-to-print');
			return;
		}
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_data = '';
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_checkin_boxes);
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
/*
		var my_html = ''
			+ '<br>    Checkin Time: ' + my_checkin_at
			+ '<br>     Real Weight: ' + my_real_weight + ' Kg'
			+ '<br>     Composition: ' + my_composition
			+ '<br> Number of Cones: ' + my_number_of_cones
			+ '<br>    Batch Number: ' + my_batch_number
			+ '<br>     Thread Name: ' + my_thread_name
			+ '<br>   Supplier Name: ' + my_supplier_name
			+ '<br>Checkin Location: ' + my_checkin_location
			+ '<br>         Barcode: ' + my_barcode + '------------------'
			;
*/
		var my_html = ''
+ "\n" + '~NORMAL'
+ "\n" + '~NORMAL'
+ "\n" + '~PIOFF'
+ "\n" + '~DELETE LOGO;*ALL'
+ "\n" + '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 7;SLEW IPS 4'

+ "\n" + '~CREATE;CXFIOS;283'
+ "\n" + 'SCALE;DOT;203;203'

+ "\n" + '/PARTE FIXA'
+ "\n" + 'ISET;0'
+ "\n" + 'FONT;FACE 92250'
+ "\n" + 'ALPHA'
+ "\n" + 'INV;POINT;748;790;16;16;*NFe DL:*'
+ "\n" + 'INV;POINT;748;333;16;16;*NFe TM:*'
+ "\n" + 'INV;POINT;695;789;16;16;*DATA:*'
+ "\n" + 'INV;POINT;695;333;16;16;*PESO:*'
+ "\n" + 'INV;POINT;634;789;16;16;*COMP:*'
+ "\n" + 'INV;POINT;574;788;16;16;*CONES:*'
+ "\n" + 'INV;POINT;574;327;16;16;*LOTE:*'
+ "\n" + 'INV;POINT;519;788;14;14;*FIO:*'
+ "\n" + 'INV;POINT;445;789;22;22;*FORNEC:*'
+ "\n" + 'INV;POINT;351;789;32;33;*ESTOCAGEM:*'
+ "\n" + 'INV;POINT;269;788;22;22;*CAIXA:*'
+ "\n" + 'STOP'

+ "\n" + '/PARTE VARIAVEL'
+ "\n" + 'ISET;0'
+ "\n" + 'FONT;FACE 92250'
+ "\n" + 'ALPHA'
+ "\n" + 'INV;POINT;748;643;16;16;*' + my_nfe_dl			+ '*'
+ "\n" + 'INV;POINT;748;175;16;16;*' + my_nfe_tm			+ '*'
+ "\n" + 'INV;POINT;695;679;16;16;*' + my_checkin_at		+ '*'
+ "\n" + 'INV;POINT;695;216;16;16;*' + my_real_weight		+ ' KG*'
+ "\n" + 'INV;POINT;634;667;16;16;*' + my_composition		+ '*'
+ "\n" + 'INV;POINT;574;647;16;16;*' + my_number_of_cones	+ '*'
+ "\n" + 'INV;POINT;574;217;16;16;*' + my_batch_number		+ '*'
+ "\n" + 'INV;POINT;519;713;14;14;*' + my_thread_name		+ '*'
+ "\n" + 'INV;POINT;445;562;22;22;*' + my_supplier_name		+ '*'
+ "\n" + 'INV;POINT;351;296;32;33;*' + my_checkin_location	+ '*'
+ "\n" + 'INV;POINT;269;616;22;22;*' + my_number_of_boxes	+ '*'
+ "\n" + 'STOP'

+ "\n" + '/CODIGO DE BARRAS'
+ "\n" + 'BARCODE'
+ "\n" + 'C128C;INV;XRD7:7:14:14:21:21:28:28;H8;67;100'
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
		$(my_index).parent().parent().find('.jky-batch-labels-printed' ).val(my_labels_printed);
		JKY.hide_modal(my_layer);
	}

	return {
		  display		: function(the_index, the_id)	{		my_display(the_index, the_id);}
		, print			: function()					{		my_print();}
	};
}();