"use strict";

/**
 * JKY.LoadOut - process all changes during one transaction
 */
var my_sold		= 0;
var my_checkout	= 0;

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
/*
SELECT LoadOuts.*
,      Dyer.nick_name		AS      dyer_name
,      Color.color_name		AS     color_name
  FROM LoadOuts
  LEFT JOIN    Contacts AS Dyer		ON      Dyer.id	=		  LoadOuts.dyer_id
  LEFT JOIN      Colors AS Color	ON     Color.id	=		  LoadOuts.color_id
 WHERE LoadOuts.shipdyer_id = 8000000001
 ORDER BY LoadOuts.loadout_number
*/
		var my_data =
			{ method		: 'get_index'
			, table			: 'LoadOuts'
			, specific		: 'dyer'
			, specific_id	:  my_dyer_id
			, select		: 'All'
			, filter		:  JKY.get_value(my_filter)
			, display		: '10'
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
					+  '<td class="jky-search-requested-date"	>' + JKY.short_date	(my_row.requested_at	)	+ '</td>'
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
		var my_html = '';

		var my_loadouts = JKY.get_rows_by_where('LoadOuts', 'shipdyer_id=' + JKY.row.id);
		var my_count_i = my_loadouts.length;
		for(var i=0; i<my_count_i; i++) {
			var my_loadout = my_loadouts[i];
			my_html += my_print_loadout(my_loadout);

			var my_loadquots = JKY.get_rows_by_where('LoadQuotations', 'loadout_id=' + my_loadout.id);
			var my_count_j = my_loadquots.length;
			for(var j=0; j<my_count_j; j++) {
				var my_loadquot = my_loadquots[j];
				my_html += my_print_loadquot(my_loadquot);

				my_html += '<table cellspacing=0 style="width:700px;">'
						+ '<tr style="line-height:20px;">'
						+ '<th class="jky-print-barcode">Barcode</th>'
						+ '<th class="jky-print-weight" >Weight	</th>'
						+ '<th class="jky-print-filler" ></th>'
						+ '<th class="jky-print-barcode">Barcode</th>'
						+ '<th class="jky-print-weight" >Weight	</th>'
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
			my_html += '<div style="page-break-before:always;"></div>';
			my_html += '<table cellspacing=0 style="width:700px;">';
			my_html += '</table>';
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
	}

	var my_print_loadout= function(the_loadout) {
		return ''
			+ '<table>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>Load Out Number</span>: </td><td style="width:300px;">' + the_loadout.loadout_number	+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>           Date</span>: </td><td style="width:100px;">' + JKY.out_date(JKY.get_now())	+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>           Dyer</span>: </td><td style="width:300px;">' + the_loadout.dyer_name		+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>          Color</span>: </td><td style="width:100px;">' + the_loadout.color_name		+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>        Remarks</span>: </td><td style="width:550px;" colspan="2">' + the_loadout.remarks + '</td>'
			+ '</tr>'
			+ '</table>'
			+ '<hr>'
			;
	}

	var my_print_loadquot = function(the_loadquot) {
		var my_ftp_id	= JKY.get_id('QuotColorFTPs', 'QuotColors.id=' + the_loadquot.quot_color_id);
		var my_ftp		= JKY.get_row('FTPs', my_ftp_id);

		return ''
			+ '<table>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>    Sale Number</span>: </td><td style="width:300px;">' + the_loadquot.quotation_number	+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>          Width</span>: </td><td style="width:100px;">' + my_ftp.width				+ ' (m)</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>       Customer</span>: </td><td style="width:300px;">' + the_loadquot.customer_name	+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>         Weight</span>: </td><td style="width:100px;">' + my_ftp.weight				+ ' (gr)</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>        Product</span>: </td><td style="width:300px;">' + the_loadquot.product_name	+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>   Total Pieces</span>: </td><td style="width:100px;">' + the_loadquot.checkout_pieces+ ' (pieces)</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>    Composition</span>: </td><td style="width:300px;">' + my_ftp.composition			+ '</td>'
			+ '<td style="width:150px; font-weight:bold; text-align:right;"><span>   Total Weight</span>: </td><td style="width:100px;">' + the_loadquot.checkout_weight+ ' (Kg)</td>'
			+ '</tr>'
			+ '</table>'
			+ '<br>'
			;
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
	};
}();