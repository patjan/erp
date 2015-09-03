"use strict";

/**
 * JKY.LoadOut - process all changes during one transaction
 */
var my_sold			= 0;
var my_checkout		= 0;
var my_total_pieces = 0;
var my_total_weight = 0;
var my_configs		= JKY.get_configs('Finishing Types');

JKY.LoadOut = function() {
	var my_the_id		= null;		//	external id that initiated the call
	var my_dyer_id		= null;		//	external id that initiated the call
	var my_order_by		= 'LoadOuts.loadout_number';
	var my_filter		= 'jky-loadout-filter';
	var my_search_body	= 'jky-loadout-search-body';
	var my_layer		= 'jky-loadout-search';

	var my_quantity		= 0;
	var my_gross_weight	= 0;
	var my_net_weight	= 0;

	var my_display = function(the_id, the_dyer_id, the_dyer_name) {
		if (the_dyer_id) {
			my_the_id	= the_id;
			my_dyer_id	= the_dyer_id;
			JKY.set_html('jky-search-dyer-name', the_dyer_name);
			JKY.set_focus(my_filter);
			my_load_data();
		}else{
			JKY.d('Select a Dyer first');
		}
	}

	var my_load_data = function() {
		var my_data =
			{ method		: 'get_index'
			, table			: 'LoadOuts'
			, specific		: 'dyer'
			, specific_id	:  my_dyer_id
			, select		: 'All'
			, filter		:  JKY.get_value(my_filter)
//			, display		: '999'
			, order_by		:  my_order_by
			};
		JKY.ajax(false, my_data, my_load_data_success);
	}

	var my_load_data_success = function(response) {
		var my_rows	= response.rows;
		var my_html = '';
		for(var i=0; i<my_rows.length; i++) {
			var my_row = my_rows[i];
			my_html += '<tr onclick="JKY.LoadOut.click_row(this, ' + my_row.id + ')">'
					+  '<td class="jky-search-loadout-number"	>' +				 my_row.loadout_number		+ '</td>'
					+  '<td class="jky-search-color-name"		>' + JKY.fix_null	(my_row.color_name		)	+ '</td>'
					+  '<td class="jky-search-requested-date"	>' + JKY.out_date	(my_row.requested_at	)	+ '</td>'
					+  '<td class="jky-search-quoted-pieces"	>' +				 my_row.quoted_pieces		+ '</td>'
					+  '<td class="jky-search-checkout-pieces"	>' +				 my_row.checkout_pieces		+ '</td>'
					+  '</tr>'
					;
		}
		JKY.set_html(my_search_body, my_html);
		JKY.show_modal(my_layer);
	}

	var my_click_row = function(the_index, the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'shipdyer_id =' + JKY.row.id
			};
		JKY.ajax(true, my_data);

		var my_loadout = JKY.get_row('LoadOuts', the_id);
		var my_html = JKY.generate_loadout(my_loadout);
		JKY.append_html('jky-loadouts-body', my_html);

		JKY.hide_modal(my_layer);
	}

	var my_add_new = function() {
		JKY.display_message('add_new');
	}

	var my_add_sold = function(the_weight) {
		if (the_weight != null) {
			my_sold += parseFloat(the_weight);
			my_sold  = Math.round(my_sold * 100) / 100;
		}
	}

	var my_add_checkout = function(the_weight) {
		if (the_weight != null) {
			my_checkout += parseFloat(the_weight);
			my_checkout  = Math.round(my_checkout * 100) / 100
		}
	}

	var my_update_sold_weight = function(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'sold_weight =' + my_sold
			};
		JKY.ajax(true, my_data);
	}

	var my_update_checkout_weight= function(the_id) {
		var my_data =
			{ method	: 'update'
			, table		: 'LoadOuts'
			, where		: 'id =' + the_id
			, set		: 'checkout_weight =' + my_checkout
			};
		JKY.ajax(true, my_data);
	}

	/**
	 *	 print SD
	 */
	var my_print_sd = function() {
		JKY.show('jky-loading');
		var my_html = '';

		var my_loadouts = JKY.get_rows_by_where('LoadOuts', 'shipdyer_id=' + JKY.row.id);
		var my_count_i = my_loadouts.length;
		for(var i=0; i<my_count_i; i++) {
			var my_loadout = my_loadouts[i];
			my_html += my_print_loadout_header(my_loadout, true);

			var my_loadquots = JKY.get_rows_by_where('LoadQuotations', 'loadout_id=' + my_loadout.id);
			var my_count_j = my_loadquots.length;
			for(var j=0; j<my_count_j; j++) {
				var my_loadquot = my_loadquots[j];
				my_html += my_print_loadquot(my_loadquot, false);

				my_html += '<table cellspacing=0 style="width:700px;">'
						+ '<tr style="line-height:20px;">'
						+ '<th class="jky-print-barcode"><span>Piece</span></th>'
						+ '<th class="jky-print-weight" ><span>Peso </span></th>'
						+ '<th class="jky-print-filler" ></th>'
						+ '<th class="jky-print-barcode"><span>Piece</span></th>'
						+ '<th class="jky-print-weight" ><span>Peso </span></th>'
						+ '</tr>'
						;
				var my_pieces = JKY.get_rows_by_where('Pieces', 'Pieces.load_quot_id=' + my_loadquot.id);
				var my_count_k = my_pieces.length;
				var my_floor_k = Math.floor(my_count_k / 2);
				var my_ceil_k  = Math.ceil (my_count_k / 2);
				for(var k=0; k<my_ceil_k; k++) {
					my_html += '<tr>';
					var my_piece = my_pieces[k];
					if (my_piece) {
						my_html += ''
								+ '<td class="jky-print-barcode">' + my_piece.barcode			+ '</td>'
								+ '<td class="jky-print-weight" >' + my_piece.checkin_weight	+ '</td>'
								;
					}
					var my_piece = my_pieces[k+my_ceil_k];
					if (my_piece) {
						my_html += ''
								+ '<th class="jky-print-filler" ></th>'
								+ '<td class="jky-print-barcode">' + my_piece.barcode			+ '</td>'
								+ '<td class="jky-print-weight" >' + my_piece.checkin_weight	+ '</td>'
								;
					}
					my_html += '</tr>';
				}
				my_html += '</table>';
				my_html += '<br>';
			}
			my_html += my_print_loadout_footer(my_loadout, true);
			if (i < (my_count_i-1)) {
				my_html += '<div style="page-break-before:always;"></div>';
			}
//			my_html += '<table cellspacing=0 style="width:700px;">';
//			my_html += '</table>';
		}

		var my_sds_printed = parseFloat(JKY.row.sds_printed);
		my_sds_printed ++;

		var my_data =
			{ method	: 'update'
			, table		: 'ShipDyers'
			, set		: 'sds_printed = ' + my_sds_printed
			, where		: 'ShipDyers.id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.row.sds_printed = my_sds_printed;
		JKY.set_value('jky-sds-printed', JKY.row.sds_printed);

		JKY.set_html('jky-printable', my_html);
		JKY.t_tag	('jky-printable', 'span');

//		JKY.show('jky-printable');
		$("#jky-printable").print();

		JKY.display_message('SD printed');
		JKY.hide('jky-loading');
	}

	/**
	 *	 print SI
	 */
	var my_print_si = function() {
		JKY.show('jky-loading');
		var my_html = '';

		var my_loadouts = JKY.get_rows_by_where('LoadOuts', 'shipdyer_id=' + JKY.row.id);
		var my_count_i = my_loadouts.length;
		for(var i=0; i<my_count_i; i++) {
			var my_loadout = my_loadouts[i];
			my_html += my_print_loadout_header(my_loadout, false);

			var my_loadquots = JKY.get_rows_by_where('LoadQuotations', 'loadout_id=' + my_loadout.id);
			var my_count_j = my_loadquots.length;
			for(var j=0; j<my_count_j; j++) {
				var my_loadquot = my_loadquots[j];
				my_html += my_print_loadquot(my_loadquot, true);

				my_html += '<table cellspacing=0 style="width:700px;">'
						+ '<tr style="line-height:20px;">'
						+ '<th class="jky-print-machine"><span>Machine	</span></th>'
						+ '<th class="jky-print-barcode"><span>Piece	</span></th>'
						+ '<th class="jky-print-weight" ><span>Peso		</span></th>'
						+ '<th class="jky-print-filler" ></th>'
						+ '<th class="jky-print-machine"><span>Machine	</span></th>'
						+ '<th class="jky-print-barcode"><span>Piece	</span></th>'
						+ '<th class="jky-print-weight" ><span>Peso		</span></th>'
						+ '</tr>'
						;
				var my_pieces = JKY.get_rows_by_where('Pieces', 'Pieces.load_quot_id=' + my_loadquot.id);
				var my_count_k = my_pieces.length;
				var my_floor_k = Math.floor(my_count_k / 2);
				var my_ceil_k  = Math.ceil (my_count_k / 2);
				for(var k=0; k<my_ceil_k; k++) {
					my_html += '<tr>';
					var my_piece = my_pieces[k];
					if (my_piece) {
						my_html += ''
								+ '<td class="jky-print-barcode">' + my_piece.produced_by		+ '</td>'
								+ '<td class="jky-print-barcode">' + my_piece.barcode			+ '</td>'
								+ '<td class="jky-print-weight" >' + my_piece.checkin_weight	+ '</td>'
								;
					}
					var my_piece = my_pieces[k+my_ceil_k];
					if (my_piece) {
						my_html += ''
								+ '<th class="jky-print-filler" ></th>'
								+ '<td class="jky-print-barcode">' + my_piece.produced_by		+ '</td>'
								+ '<td class="jky-print-barcode">' + my_piece.barcode			+ '</td>'
								+ '<td class="jky-print-weight" >' + my_piece.checkin_weight	+ '</td>'
								;
					}
					my_html += '</tr>';
				}
				my_html += '</table>';
				my_html += '<br>';
			}
			my_html += my_print_loadout_footer(my_loadout, false);
			if (i < (my_count_i-1)) {
				my_html += '<div style="page-break-before:always;"></div>';
			}
//			my_html += '<table cellspacing=0 style="width:700px;">';
//			my_html += '</table>';
		}

		var my_sis_printed = parseFloat(JKY.row.sis_printed);
		my_sis_printed ++;

		var my_data =
			{ method	: 'update'
			, table		: 'ShipDyers'
			, set		: 'sis_printed = ' + my_sis_printed
			, where		: 'ShipDyers.id=' + JKY.row.id
			};
		JKY.ajax(false, my_data);

		JKY.row.sis_printed = my_sis_printed;
		JKY.set_value('jky-sis-printed', JKY.row.sis_printed);

		JKY.set_html('jky-printable', my_html);
		JKY.t_tag	('jky-printable', 'span');

//		JKY.show('jky-printable');
		$("#jky-printable").print();

		JKY.display_message('SI printed');
		JKY.hide('jky-loading');
	}

	var my_print_loadout_header = function(the_loadout, print_address) {
		var my_html = '';
		var my_dyer = JKY.get_row('Contacts', the_loadout.dyer_id);
		var my_color= JKY.fix_null(the_loadout.color_id) + ' ' + JKY.fix_null(the_loadout.color_name);
		my_total_pieces = 0;
		my_total_weight = 0;

		my_html += ''
//			+ '<h3 class=jky-print-center><span>Ship Dyer</span> # ' + JKY.row.id + '</h3>'
			+ '<h3 class=jky-print-center><span>Ship Dyer</span> # ' + the_loadout.loadout_number + '</h3>'
			+ '<table>'
			+ '<tr>'
//			+ '<td class=jky-print-label><span> Load Out</span>:</td><td class=jky-print-col1>' + the_loadout.loadout_number		+ '</td>'
			+ '<td class=jky-print-label>						</td><td class=jky-print-col1>' + 'Tecno Malhas Ltda'				+ '</td>'
			+ '<td class=jky-print-label><span>     Date</span>:</td><td class=jky-print-col2>' + JKY.out_date(JKY.get_now())		+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label>						</td><td class=jky-print-col1>'										+ '</td>'
			+ '<td class=jky-print-label><span>   Dyeing</span>:</td><td class=jky-print-col2><b>' + the_loadout.dyeing_type		+ '</b></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label><span>     Dyer</span>:</td><td class=jky-print-col1>' + my_dyer.full_name					+ '</td>'
//			+ '<td class=jky-print-label><span>	   Color</span>:</td><td class=jky-print-col2>' + my_color							+ '</td>'
			+ '<td class=jky-print-label><span>	  Recipe</span>:</td><td class=jky-print-col2><b>' + JKY.fix_null(the_loadout.recipe)	+ '</b></td>'
			+ '</tr>'
			;
		if (print_address) {
			my_html += JKY.full_address(my_dyer);
		}
		my_html += ''
			+ '</table>'
			;
		return my_html;
	}

	var my_print_loadout_footer = function(the_loadout, print_address) {
		var my_html = '';

		my_html += ''
			+ '<hr>'
			+ '<table>'
			+ '<tr>'
			+ '<td class=jky-print-label>		 Total do romaneio:</td><td class=jky-print-col1><b>' + my_total_pieces + '<b> (<span>pieces</span>)</td>'
			+ '<td class=jky-print-label><span>Total Weight</span>:</td><td class=jky-print-col2><b>' + (my_total_weight).toFixed(2) + '<b> (Kg)</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label><span>  Remarks</span>:</td><td class=jky-print-col3 colspan="3">' + JKY.decode(the_loadout.remarks) + '</td>'
			+ '</tr>'
			+ '</table>'
			;
		return my_html;
	}

	var my_print_loadquot = function(the_loadquot, print_customer) {
		if (JKY.is_empty(the_loadquot.quot_color_id))		return '';

		var my_html = '';
		var my_ftp_id		= JKY.get_id	('QuotColorFTPs', 'QuotColors.id=' + the_loadquot.quot_color_id);
		var my_quot_color	= JKY.get_row	('QuotColors'	, the_loadquot.quot_color_id);
		var my_color		= JKY.get_row	('Colors'		, my_quot_color.color_id);
		var my_quot_line	= JKY.get_row	('QuotLines'	, my_quot_color.parent_id);
		var my_product		= JKY.get_row	('Products'		, my_quot_line.product_id);
		var my_ftp			= JKY.get_row	('FTPs'			, my_ftp_id);
/*
		var my_threads		= JKY.get_rows	('FTP_Threads'	, my_ftp_id);
		var my_wirings	= '';
		for(var i=0; i<my_threads.length; i++) {
			var my_name = JKY.get_value_by_id('Threads', 'name', my_threads[i].thread_id);
			my_wirings += my_name + ' (' + my_threads[i].supplier + ')<br>';
		}
*/
		var my_wirings	= '';
if (my_ftp_id != null) {
		var my_order_id = JKY.get_order_id(the_loadquot.id);
		if (!my_order_id)	my_order_id = null;

		var my_data =
			{ method	: 'get_index'
			, table		: 'FTP_Ord_Threads'
			, ftp_id	:  my_ftp_id
			, order_id	:  my_order_id
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
						var my_rows = response.rows;
						for(var i in my_rows) {
							var my_row = my_rows[i];
							my_wirings	+= my_row.thread_name + ' ('
										+  my_row.supplier_name + ') '
										+  my_row.batch + '<br>'
								;
						}
					}else{
						JKY.display_message(response.message);
					}
				}
			}
		)
}
		var my_product_finishings = JKY.get_value_by_id('Products', 'finishings', the_loadquot.product_id);
		var my_finishings = '';
		for(var i = 0, max = my_configs.length; i < max; i++) {
			var my_config = my_configs[i];
			if (my_product_finishings.indexOf(my_config.name) > -1) {
				var my_finishing = (JKY.is_empty(my_config.value) ? my_config.name : my_config.value);
				my_finishings += my_finishing.toUpperCase() + ' / ';
			}
		}

		my_total_pieces += parseInt  (the_loadquot.checkout_pieces);
		my_total_weight += parseFloat(the_loadquot.checkout_weight);

		my_html += ''
			+ '<hr>'
			+ '<table>'
			;
		if (print_customer) {
			my_html += ''
			+ '<tr>'
			+ '<td class=jky-print-label><span>    Customer</span>:</td><td class=jky-print-col1><b>' + the_loadquot.customer_name + '</b></td>'
			+ '</tr>'
			;
		}
		my_html += ''
			+ '<tr>'
			+ '<td class=jky-print-label><span>      Fabric</span>:</td><td class=jky-print-col1>'    + the_loadquot.product_id + ' - ' + the_loadquot.product_name + '</td>'
			+ '<td class=jky-print-label><span>   Quotation</span>:</td><td class=jky-print-col2><b>' + the_loadquot.quotation_number + '</b></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label><span>       Color</span>:</td><td class=jky-print-col1>'    + my_color.id + ' - <b>' + my_color.color_name + '</b></td>'
			+ '<td class=jky-print-label><span>       Width</span>:</td><td class=jky-print-col2><b>' + my_product.width_dyer + '</b> (cm)</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label><span> Composition</span>:</td><td class=jky-print-col1><b>' + my_ftp.composition + '</b></td>'
			+ '<td class=jky-print-label><span>      Weight</span>:</td><td class=jky-print-col2><b>' + my_product.weight_dyer + '</b> (gr)</td>'
			+ '</tr>'
			;
		if (print_customer) {
			my_html += ''
			+ '<tr>'
			+ '<td class=jky-print-label><span>     Wirings</span>:</td><td class=jky-print-col3 colspan="3"><b>' + my_wirings + '</b></td>'
			+ '</tr>'
			;
		}
		my_html += ''
			+ '<tr>'
			+ '<td class=jky-print-label><span>Instructions</span>:</td><td class="jky-print-col3 jky-print-finishings" colspan="3"><b>' + my_finishings + '</b></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class=jky-print-label>	       Total do artigo:</td><td class=jky-print-col1><b>' + the_loadquot.checkout_pieces + '<b> (<span>pieces</span>)</td>'
			+ '<td class=jky-print-label><span>Total Weight</span>:</td><td class=jky-print-col2><b>' + the_loadquot.checkout_weight + '<b> (Kg)</td>'
			+ '</tr>'
			+ '</table>'
			;
		return my_html;
	}

	return {
		  display		: function(the_id, the_dyer_id, the_dyer_name)	{my_display(the_id, the_dyer_id, the_dyer_name);}
		, load_data		: function()					{my_load_data();}
		, click_row		: function(the_index, the_id)	{my_click_row(the_index, the_id);}
		, add_new		: function()					{my_add_new();}

		, set_dyer_id	: function(the_dyer_id)			{my_dyer_id		= the_dyer_id;}
		, set_sold		: function(the_amount)			{my_sold		= the_amount;}
		, set_checkout	: function(the_amount)			{my_checkout	= the_amount;}

		, add_sold		: function(the_weight)			{my_add_sold	(the_weight);}
		, add_checkout	: function(the_weight)			{my_add_checkout(the_weight);}

		, get_sold		: function()			{return my_sold		;}
		, get_checkout	: function()			{return my_checkout	;}

		, update_sold_weight	: function(the_id)		{my_update_sold_weight		(the_id);}
		, update_checkout_weight: function(the_id)		{my_update_checkout_weight	(the_id);}

		, print_sd		: function()					{my_print_sd();}
		, print_si		: function()					{my_print_si();}
	};
}();