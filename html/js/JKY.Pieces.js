"use strict";

/**
 * JKY.Pieces - process all changes during one transaction
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-pieces-id'  ).val(the_id );
 *		$(my_parent).find('.jky-pieces-name').val(my_name);
 */
JKY.Pieces = function() {
	var my_index		=  null;		//	external id that initiated the call
	var my_the_id		=  null;
	var my_id			=  null;
	var my_layer		= 'jky-pieces-layer';
	var my_row			=  null;

	var my_ordered_pieces 	= 0;
	var my_rejected_pieces 	= 0;
	var my_labels_printed	= 0;

	function my_display(the_id) {
		my_the_id = the_id;
		my_load_data(JKY.row.id);
	}

	function my_load_data(the_id) {
		my_id = the_id;
		var my_data =
			{ method	: 'get_row'
			, table		: 'Orders'
			, where		: 'Orders.id=' + the_id
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	function my_load_data_success(response) {
		my_row = response.row;
		my_ordered_pieces 	= parseFloat(my_row.ordered_pieces	);
		my_rejected_pieces 	= parseFloat(my_row.rejected_pieces	);
		my_labels_printed	= parseFloat(my_row.labels_printed	);
		var my_labels_unprinted	= my_ordered_pieces + my_rejected_pieces - my_labels_printed;
		var my_labels_to_print	= my_labels_unprinted > 100 ? 100 : my_labels_unprinted;
//		var my_machine_name = JKY.get_value('jky-machine-name');
//		var my_partner_name = JKY.get_value('jky-partner-name');
//		var my_produced_by	= my_machine_name == '' ? my_partner_name : my_machine_name;
		var my_machine_name = my_row.machine_name;
		var my_partner_name = my_row.partner_name;
		var my_produced_by	= my_machine_name == null ? my_partner_name : my_machine_name;

		JKY.set_value('jky-pieces-ordered-pieces'	, my_ordered_pieces		);
		JKY.set_value('jky-pieces-labels-printed'	, my_labels_printed		);
		JKY.set_value('jky-pieces-labels-unprinted'	, my_labels_unprinted	);
		JKY.set_value('jky-pieces-labels-to-print'	, my_labels_to_print	);
		JKY.set_value('jky-pieces-produced-by'		, my_produced_by		);

		JKY.set_focus('jky-pieces-labels-to-print');
		JKY.show_modal(my_layer);
	}

	function my_print_label() {
		var my_labels_unprinted	= parseFloat(JKY.get_value('jky-pieces-labels-unprinted'));
		var my_labels_to_print	= parseFloat(JKY.get_value('jky-pieces-labels-to-print' ));
		var my_produced_by		= JKY.get_value('jky-pieces-produced-by');
		var my_product_name		= JKY.get_value('jky-product-name');
		if (isNaN(my_labels_to_print)
		||  my_labels_to_print < 1
//		||	my_labels_to_print > 100
		||  my_produced_by == '') {
			JKY.display_message(JKY.t('Info is invalid'));
			JKY.set_focus('jky-pieces-labels-to-print');
			return;
		}
		if (my_labels_to_print > my_labels_unprinted) {
			my_labels_to_print = my_labels_unprinted;
		}
		var my_data = '';
		for(var i=0; i<my_labels_to_print; i++) {
			my_labels_printed ++;
JKY.display_message('Printed label: ' + my_labels_printed + ' of ' + my_ordered_pieces);
			var my_set = ''
					+          ' order_id =  ' + my_id
					+ ', number_of_pieces =  ' + my_labels_printed
					+      ', produced_by =\'' + my_produced_by  + '\''
					+     ', product_name =\'' + my_product_name + '\''
//					+       ', checkin_by =  ' + JKY.Session.get_value('user_id')
//					+       ', checkin_at =\'' + JKY.get_now() + '\''
					;
			my_data =
				{ method	: 'insert'
				, table		: 'Pieces'
				, set		: my_set
				}
			JKY.ajax(false, my_data, my_insert_pieces_success);
		}
		my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'labels_printed = labels_printed + ' + my_labels_to_print
			, where		: 'Orders.id=' + my_id
			};
		JKY.ajax(false, my_data, my_update_data_success);
	}

	function my_insert_pieces_success(response) {
		return;
	}

	function my_update_data_success(response) {
		var my_data =
			{ method	: 'print_labels'
			, table		: 'Pieces'
			}
		JKY.ajax(false, my_data, my_print_labels_success);
	}

	function my_print_labels_success(response) {
		JKY.set_value('jky-labels-printed', my_labels_printed);
		JKY.hide_modal(my_layer);
		JKY.display_message(response.message);
	}

	/**
	 *	 print FTP
	 */
	function my_print_ftp() {
		var my_ftps_printed = parseFloat(JKY.row.ftps_printed);
		my_ftps_printed ++;

		var my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'ftps_printed = ' + my_ftps_printed
			, where		: 'Orders.id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.row.ftps_printed = my_ftps_printed;
		JKY.set_value('jky-ftps-printed', JKY.row.ftps_printed);

		var my_row = JKY.get_row('FTPs', JKY.row.ftp_id);
		var my_machine_label = JKY.row.machine_name ? 'Machine' : 'Partner';
		var my_machine_name	 = JKY.row.machine_name ? JKY.row.machine_name : JKY.row.partner_name;

//window.print();
		var my_html = ''
			+ "<table><tr>"
			+ "<td style='width:250px; font-weight:bold;'><span>Order Number</span>: " + JKY.row.order_number	+ "#" + JKY.row.ftps_printed + "</td>"
			+ "<td style='width:330px; font-weight:bold;'><span>    Customer</span>: " + JKY.row.customer_name	+ "</td>"
			+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(JKY.get_now())	+ "</td>"
			+ "</tr></table>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<tr>"

			+ "<td width=60%><table>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span> FTP Number</span>:</td><td id='jky-print-ftp-number'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Product</span>:</td><td id='jky-print-product-name'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Composition</span>:</td><td id='jky-print-composition'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>" + my_machine_label + "</span>:</td><td id='jky-print-machine-name'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	 Nick Name</span>:</td><td id='jky-print-nick-name'		class='jky-form-value'></td></tr>"
			+ "</table></td>"

//			+ "<td id='jky-print-drawing' width=20%></td>"
//			+ "<td id='jky-print-photo'   width=20%></td>"

			+ "</tr>"
			+ "</table>"

			+ "<br>"
			+ "<div style='width:700px; border:1px solid black;'>"
			+ "<table>"
			+ "<tr>"
			+ "<td class='jky-print-label1'><span>  Diameter</span>:</td><td id='jky-print-diameter'	class='jky-print-value'></td>"
			+ "<td class='jky-print-label2'><span>     Turns</span>:</td><td id='jky-print-turns'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label3'><span>     Speed</span>:</td><td id='jky-print-speed'		class='jky-print-value'></td>"
//			+ "<td class='jky-print-label3'><span>Elasticity</span>:</td><td id='jky-print-elasticity'	class='jky-print-value'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td class='jky-print-label1'><span>   Density</span>:</td><td id='jky-print-density'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label2'><span> Gramatura</span>:</td><td id='jky-print-weight'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label3'><span>      Peso</span>:</td><td id='jky-print-peso'		class='jky-print-value'></td>"
//			+ "<td class='jky-print-label3'><span>  Needling</span>:</td><td id='jky-print-needling'	class='jky-print-value'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td class='jky-print-label1'><span>    Inputs</span>:</td><td id='jky-print-inputs'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label2'><span>     Width</span>:</td><td id='jky-print-width'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label3'><span>     Break</span>?</td><td id='jky-print-has-break'	class='jky-print-value'></td>"
//			+ "<td class='jky-print-label2'><span>     Lanes</span>:</td><td id='jky-print-lanes'		class='jky-print-value'></td>"
			+ "</tr>"
			+ "</table>"
			+ "</div>"

			+ "<br>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<thead><tr class='jky-print-head'>"
			+		"<td><span>Threads</span></td>"
			+		"<td><span>Percent</span></td>"
			+		"<td><span>Thread</span></td>"
			+		"<td><span>Batch</span></td>"
			+		"<td><span>Supplier</span></td>"
			+ "</tr></thead>"
			+ "<tbody id='jky-print-thread-body'></tbody>"
			+ "</table>"

			+ "<br>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<thead><tr class='jky-print-head'>"
			+		"<td><span>Loads</span></td>"
			+		"<td><span>From</span></td>"
			+		"<td><span>Upto</span></td>"
			+		"<td style='width:70%'></td>"
			+ "</tr></thead>"
			+ "<tbody id='jky-print-load-body'></tbody>"
			+ "</table>"

			+ "<br>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<thead><tr class='jky-print-head'><td><span>Settings</span></td><td><span>Name</span></td><td><span>Value</span></td><td><span>Name</span></td><td><span>Value</span></td><tr><thead>"
			+ "<tbody id='jky-print-setting-body'></table>"
			+ "</table>"

			+ "<br>"
			;
		JKY.set_html('jky-printable', my_html);
		JKY.t_tag	('jky-printable', 'span');

		JKY.set_html('jky-print-ftp-number'		, my_row.ftp_number		);
		JKY.set_html('jky-print-start-date'		, my_row.start_date		);
		JKY.set_html('jky-print-product-name'	, my_row.product_name	);
		JKY.set_html('jky-print-composition'	, my_row.composition	);
		JKY.set_html('jky-print-machine-name'	,	  my_machine_name	);
		JKY.set_html('jky-print-collection'		, my_row.collections	);
		JKY.set_html('jky-print-nick-name'		, my_row.nick_name		);
/*
		if (JKY.is_empty(my_row.draw)) {
			JKY.set_html('jky-print-drawing', '<img id="jky-drawing-img"  src="/img/placeholder.png" />');
		}else{
			my_names = my_row.draw.split(',');
			my_extension = JKY.get_file_type(my_names[0]);
			JKY.set_html('jky-print-drawing', '<img id="jky-drawing-img"  src="/uploads/ftp_draws/'  + my_row.id + '.' + my_extension  + '" />');
		}

		if (JKY.is_empty(my_row.photo)) {
			JKY.set_html('jky-print-photo'	, '<img id="jky-photo-img"  src="/img/placeholder.png" />');
		}else{
			my_names = my_row.photo.split(',');
			my_extension = JKY.get_file_type(my_names[0]);
			JKY.set_html('jky-print-photo'	, '<img id="jky-photo-img"    src="/uploads/ftp_photos/' + my_row.id + '.' + my_extension + '" />');
		}
*/
		JKY.set_html('jky-print-diameter'		, my_row.diameter		+ ' (pol)'	);
		JKY.set_html('jky-print-turns'			, my_row.turns						);
		JKY.set_html('jky-print-speed'			, my_row.speed			+ ' (rpm)'	);
//		JKY.set_html('jky-print-elasticity'		, my_row.elasticity					);
		JKY.set_html('jky-print-density'		, my_row.density					);
		JKY.set_html('jky-print-weight'			, my_row.weight			+ ' (gr)'	);
		JKY.set_html('jky-print-peso'			, my_row.peso			+ ' (Kg)'	);
//		JKY.set_html('jky-print-needling'		, my_row.needling					);
		JKY.set_html('jky-print-inputs'			, my_row.inputs						);
		JKY.set_html('jky-print-width'			, my_row.width			+ ' (cm)'	);
//		JKY.set_html('jky-print-lanes'			, my_row.lanes						);
		JKY.set_html('jky-print-has-break'		, JKY.t((my_row.has_break == 'No') ? 'Without' : 'With'));

		JKY.set_html('jky-print-thread-body'	, JKY.print_ftp_threads	(JKY.row.ftp_id));
		JKY.set_html('jky-print-load-body'		, JKY.print_ftp_loads	(JKY.row.ftp_id));
		JKY.set_html('jky-print-setting-body'	, JKY.print_ftp_settings(JKY.row.ftp_id));

//		JKY.show('jky-printable');
		$("#jky-printable").print();

		JKY.display_message('FTP printed');
	}

	/**
	 *	 print OP
	 */
/*
	function my_print_op() {
		var my_data =
			{ method	: 'get_rows'
			, table		: 'Pieces'
			, where		: 'order_id=' + JKY.row.id
			, order_by	: 'barcode'
			};
		JKY.ajax(false, my_data, my_load_pieces_success);
	}

	function my_load_pieces_success(response) {
		var my_ops_printed = parseFloat(JKY.row.ops_printed);
		my_ops_printed ++;

		var my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'ops_printed = ' + my_ops_printed
			, where		: 'Orders.id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.row.ops_printed = my_ops_printed;
		JKY.set_value('jky-ops-printed', JKY.row.ops_printed);

//window.print();
		var my_html = '';
		my_html += my_print_header(JKY.row.customer_name, JKY.row.order_number, JKY.row.ops_printed);
		my_html += "<table cellspacing=0 style='width:700px;'>";

		var my_rows	= response.rows;
		var my_count= my_rows.length;
		for(var i=1; i<=my_count; i++) {
			var my_row = my_rows[i-1];
			my_html += ''
				+ "<tr style='line-height:16px;'>"
				+ "<td class='jky-print-sequence'	>" + i				+ "</td>"
				+ "<td class='jky-print-barcode'	>" + my_row.barcode	+ "</td>"
				+ "<td class='jky-print-time'		></td>"
				+ "<td class='jky-print-name'		></td>"
				+ "<td class='jky-print-remarks'	></td>"
				+ "</tr>"
				;
			if (i % 10 == 0) {
				my_html += "</table>";
				if (i % 40 == 0 && i < my_count) {
					my_html += "<div style='page-break-before:always;'></div>";
					my_html += my_print_header(JKY.row.customer_name, JKY.row.order_number, JKY.row.ops_printed);
				}else{
					my_html += "<br>";
				}
			}
			my_html += "<table cellspacing=0 style='width:700px;'>";
		}

		my_html += "</table>";
		JKY.set_html('jky-printable', my_html);
		JKY.t_tag	('jky-printable', 'span');

//		JKY.show('jky-printable');
		$("#jky-printable").print();

		JKY.display_message('OP printed');
	}

	function my_print_header(the_customer_name, the_order_number, the_ops_printed) {
		return ""
			+ "<table><tr>"
			+ "<td style='width:250px; font-weight:bold;'><span>Order Number</span>: " + the_order_number	+ "#" + the_ops_printed + "</td>"
			+ "<td style='width:330px; font-weight:bold;'><span>    Customer</span>: " + the_customer_name	+ "</td>"
			+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(JKY.get_now())+ "</td>"
			+ "</tr></table>"

			+ "<table cellspacing=0 style='width:700px;'>"
			+ "<tr style='line-height:20px;'>"
			+ "<td class='jky-print-sequence'	><span>Sequence	</span></td>"
			+ "<td class='jky-print-barcode'	><span>Barcode	</span></td>"
			+ "<td class='jky-print-time'		><span>Time		</span></td>"
			+ "<td class='jky-print-name'		><span>Name		</span></td>"
			+ "<td class='jky-print-remarks'	><span>Remarks	</span></td>"
			+ "</tr>"
			+ "</table>"
			+ "<br>"
			;
	}
*/

	/**
	 *	 print OP
	 */
	function my_print_op() {
		var my_ops_printed = parseFloat(JKY.row.ops_printed);
		my_ops_printed ++;

		var my_data =
			{ method	: 'update'
			, table		: 'Orders'
			, set		: 'ops_printed = ' + my_ops_printed
			, where		: 'Orders.id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.row.ops_printed = my_ops_printed;
		JKY.set_value('jky-ops-printed', JKY.row.ops_printed);

		var my_row = JKY.get_row('FTPs', JKY.row.ftp_id);
		var my_machine_label = JKY.row.machine_name ? 'Machine' : 'Partner';
		var my_machine_name	 = JKY.row.machine_name ? JKY.row.machine_name : JKY.row.partner_name;

//window.print();
		var my_html = ''
			+ "<table><tr>"
			+ "<td style='width:250px; font-weight:bold;'><span>Order Number</span>: " + JKY.row.order_number	+ "#" + JKY.row.ftps_printed + "</td>"
			+ "<td style='width:330px; font-weight:bold;'><span>    Customer</span>: " + JKY.row.customer_name	+ "</td>"
			+ "<td style='width:120px; text-align:right;'><span>Date</span>: " + JKY.out_date(JKY.get_now())	+ "</td>"
			+ "</tr></table>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<tr>"

			+ "<td width=60%><table>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span> FTP Number</span>:</td><td id='jky-print-ftp-number'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	   Product</span>:</td><td id='jky-print-product-name'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>Composition</span>:</td><td id='jky-print-composition'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>" + my_machine_label + "</span>:</td><td id='jky-print-machine-name'	class='jky-form-value'></td></tr>"
			+ "<tr class='jky-form-line'><td class='jky-print-label'><span>	 Nick Name</span>:</td><td id='jky-print-nick-name'		class='jky-form-value'></td></tr>"
			+ "</table></td>"

			+ "</tr>"
			+ "</table>"

			+ "<br>"
			+ "<div style='width:700px; border:1px solid black;'>"
			+ "<table>"
			+ "<tr>"
			+ "<td class='jky-print-label1'><span> Gramatura</span>:</td><td id='jky-print-weight'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label2'><span>     Turns</span>:</td><td id='jky-print-turns'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label3'><span>      Peso</span>:</td><td id='jky-print-peso'		class='jky-print-value'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td class='jky-print-label1'><span>     Width</span>:</td><td id='jky-print-width'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label2'><span>     Speed</span>:</td><td id='jky-print-speed'		class='jky-print-value'></td>"
			+ "<td class='jky-print-label3'><span>     Break</span>?</td><td id='jky-print-has-break'	class='jky-print-value'></td>"
			+ "</tr>"
			+ "</table>"
			+ "</div>"

			+ "<br>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<thead><tr class='jky-print-head'>"
			+		"<td><span>Threads</span></td>"
			+		"<td><span>Percent</span></td>"
			+		"<td><span>Thread</span></td>"
			+		"<td><span>Batch</span></td>"
			+		"<td><span>Supplier</span></td>"
			+ "<tr><thead>"
			+ "<tbody id='jky-print-thread-body'></table>"
			+ "</table>"

			+ "<br>"
			+ "<table style='width:700px; border:1px solid black;'>"
			+ "<thead><tr class='jky-print-head'><td><span>Remarks</span>:</td><tr><thead>"
			+ "<tbody id='jky-print-remarks-body'></table>"
			+ "</table>"

			+ "<br>"
			;
		JKY.set_html('jky-printable', my_html);
		JKY.t_tag	('jky-printable', 'span');

		JKY.set_html('jky-print-ftp-number'		, my_row.ftp_number		);
		JKY.set_html('jky-print-start-date'		, my_row.start_date		);
		JKY.set_html('jky-print-product-name'	, my_row.product_name	);
		JKY.set_html('jky-print-composition'	, my_row.composition	);
		JKY.set_html('jky-print-machine-name'	,	  my_machine_name	);
		JKY.set_html('jky-print-collection'		, my_row.collections	);
		JKY.set_html('jky-print-nick-name'		, my_row.nick_name		);

		JKY.set_html('jky-print-weight'			, my_row.weight			+ ' (gr)'	);
		JKY.set_html('jky-print-turns'			, my_row.turns						);
		JKY.set_html('jky-print-peso'			, my_row.peso			+ ' (Kg)'	);
		JKY.set_html('jky-print-width'			, my_row.width			+ ' (cm)'	);
		JKY.set_html('jky-print-speed'			, my_row.speed			+ ' (rpm)'	);
		JKY.set_html('jky-print-has-break'		, JKY.t((my_row.has_break == 'No') ? 'Without' : 'With'));
		JKY.set_html('jky-print-thread-body'	, JKY.print_ftp_threads	(JKY.row.ftp_id));

		var my_counter_threads = $('#jky-print-thread-body').find('tr').length;
		var my_remarks = '';
		for(var i=0, max=6-my_counter_threads; i<max; i++) {
			my_remarks += '<tr><td>&nbsp;</td></tr>';
		}
		JKY.set_html('jky-print-remarks-body', my_remarks);
//		JKY.show('jky-printable');
//		duplicate the OP printing
		my_html = $("#jky-printable").html();
		JKY.append_html('jky-printable', '<br>' + my_html);
		$("#jky-printable").print();

		JKY.display_message('OP printed');
	}

	return {
		  display		: function(the_id)				{		my_display(the_id);}
		, print_label	: function()					{		my_print_label	();}
		, print_ftp		: function()					{		my_print_ftp	();}
		, print_op		: function()					{		my_print_op		();}
	};
}();