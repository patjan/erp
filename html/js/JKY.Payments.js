"use strict";

/**
 * JKY.Payments - process all payments for one sale
 *
 * require:	JKY.Utils.js(JKY.display_confirm)
 *
 * 		$(my_parent).find('.jky-pieces-id'  ).val(the_id );
 *		$(my_parent).find('.jky-pieces-name').val(my_name);
 */
JKY.Payments = function() {
	var my_layer = 'jky-payments-layer';

	function my_display(the_checkout_total, the_adjust_amount, the_payments) {
		var my_payment_types = JKY.set_configs ('Payment Types'	, '', '');
		var my_total_amount = parseFloat(the_checkout_total) + parseFloat(the_adjust_amount);
		$('#jky-total-payment').html(my_total_amount.toFixed(2));
		var my_payments = the_payments.trim() || '0';
		var my_payments = my_payments.split(' ').filter(function(item) {return item !== '';});
		var my_length = my_payments.length;
		var my_amount = JKY.set_decimal(my_total_amount / my_length);
		var my_html = '';
		for(var i=1; i <= my_length; i++) {
			var my_days = parseInt(my_payments[i-1]);
			var my_time = new Date(new Date().getTime() + my_days * 24*60*60*1000);
			var my_year	= my_time.getFullYear();
			var my_month= my_time.getMonth()+1;	if (my_month < 10)	my_month= '0' + my_month;
			var my_day	= my_time.getDate ();	if (my_day   < 10)	my_day	= '0' + my_day	;
			var my_yyyymmdd = my_year + '-' + my_month + '-' + my_day;
			if (i === my_length)	{my_amount = my_total_amount.toFixed(2);}
			my_html += ''
				+ '<tr>'
				+ '<td class="jky-td-date"		>' + JKY.out_date(my_yyyymmdd) + '</td>'
				+ '<td class="jky-td-amount"	>' + my_amount	+ '</td>'
//				+ '<td class="jky-td-document"	><input class="jky-document" /></td>'
				+ '<td class="jky-td-document"	>'
				+ '<select class="jky-payment-type">' + my_payment_types + '</select>'
				+ '</td>'
				+ '</tr>'
				;
			my_total_amount -= my_amount;
		}
		$('#jky-payments-body').html(my_html);
		JKY.show_modal(my_layer);
setTimeout(function() {
		$('#jky-payments-body').find('input:first').focus();
}, 1000)		
	}

	function my_get_payments() {
		var $my_payments = $('#jky-payments-body tr');
		var my_rows = [];
	
		$.each($my_payments, function(my_index, my_tr) {
			var $my_tr = $(my_tr);
			var my_date		= $my_tr.find('.jky-td-date'		).html();
			var my_amount	= $my_tr.find('.jky-td-amount'		).html();
			var my_document	= $my_tr.find('.jky-payment-type'	).val ();
//			if (my_document != '') {
				var my_row =
					{ date		: JKY.inp_date_value(my_date)
					, amount	: my_amount
					, document	: my_document
					};
				my_rows.push(my_row);
//			}
		});

//		if( my_rows.length === $my_payments.length) {
			JKY.hide_modal(my_layer);
			return my_rows;
//		}else{
//			JKY.display_message(JKY.t('Payments cannot be received'));
//			JKY.display_message(JKY.t('because there is missing document'));
//		}
//		return [];
	}

	return {
		  display		  : function		(the_checkout_total, the_adjust_amount, the_payments) {
								my_display	(the_checkout_total, the_adjust_amount, the_payments);
							}
		, get_payments	  : function()		{return my_get_payments();}
	};
}();