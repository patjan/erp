"use strict";

/**
 * receive_nfes.js
 */

/**
 * start program
 */
JKY.start_program = function() {
	JKY.App = JKY.Application;
	JKY.App.set(
		{ object_name	: 'JKY.App'
		, program_name	: 'Receive NFEs'
		, table_name	: 'NFEs'
		, specific		: ''
		, select		: ''
		, filter		: '*.xml'
		, sort_by		: 'nfe_number'
		, sort_seq		: 'DESC'
		, sort_list		: [[1, 1]]
		, focus			: 'jky-vendor-name'
		, add_new		: ''
		});
	JKY.App.init();
};

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	$('#jky-received-date	input').attr('data-format', JKY.Session.get_date_time	());
	$('#jky-invoice-date	input').attr('data-format', JKY.Session.get_date		());
	$('#jky-bill-date		input').attr('data-format', JKY.Session.get_date		());
	$('#jky-received-date'		).datetimepicker({language: JKY.Session.get_locale()});
	$('#jky-invoice-date'		).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});
	$('#jky-bill-date'			).datetimepicker({language: JKY.Session.get_locale(), pickTime: false});

	$('#jky-action-insert'		).click( function() {JKY.App.process_insert	();});
	$('#jky-action-update'		).click( function() {JKY.App.process_update	();});

	$('#jky-action-close'		).click( function() {JKY.App.close_row(JKY.row.id);});
	$('#jky-batches-add-new'	).click (function() {JKY.insert_batch		();});

	$('#jky-boxes-print'		).click (function() {JKY.Batch.print		()});
	$('#jky-action-save-remarks').click (function()	{JKY.save_remarks		();});

	JKY.set_side_active('jky-receiving-receive-nfes');
};

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function() {
//	JKY.append_file('jky-load-thread'	, '../JKY.Search.Thread.html'	);
//	JKY.append_file('jky-load-purline'	, '../JKY.Search.PurLine.html'	);

	JKY.hide('jky-action-add-new');
	JKY.show('jky-action-graph'  );

	JKY.set_html('jky-app-select', JKY.set_controls('NFE Folders', ''));
	JKY.set_html('jky-app-select-label', JKY.t('Folder'));
	JKY.show	('jky-app-select-line');
//	JKY.set_html('jky-dyer-name', JKY.set_options_array('', JKY.get_companies('is_dyer'), false));
//	select the first option as default
	$('#jky-app-select option').eq(1).prop('selected', true);
	$('#jky-app-select').change();

//	$('#jky-thread-filter'	).KeyUpDelay(JKY.Product.load_data);
//	$('#jky-purline-filter'	).KeyUpDelay(JKY.PurLine.load_data);

	$('#jky-invoice-pieces'		).ForceNumericOnly();
	$('#jky-invoice-weight'		).ForceNumericOnly();
	$('#jky-invoice-amount'		).ForceNumericOnly();
	$('#jky-received-pieces'	).ForceNumericOnly();
	$('#jky-received-weight'	).ForceNumericOnly();
	$('#jky-received-amount'	).ForceNumericOnly();
};

/**
 *	set table row
 */
JKY.set_table_row = function(the_row) {
//	var my_invoice_weight	= parseFloat(the_row.invoice_weight	);
//	var my_received_weight	= parseFloat(the_row.received_weight);
//	var my_class = (my_invoice_weight == my_received_weight) ? '' : ' jky-error';

	var my_html = ''
		+  '<td class="jky-td-name-w"	>' + the_row.name	+ '</td>'
		+  '<td class="jky-td-key-s"	>' + the_row.ext	+ '</td>'
		+  '<td class="jky-td-name-s"	>' + the_row.size	+ '</td>'
		+  '<td class="jky-td-datetime"	>' + the_row.time	+ '</td>'
		;
	return my_html;
};

/**
 *	set form row
 */
JKY.set_form_row = function(the_row) {
	JKY.hide('jky-action-delete');
//	var my_xml_nfe	= the_row.xml_nfe;
	var my_NFe		= the_row.NFe;
	var my_infNFe	= my_NFe.infNFe;
	var my_ide		= my_infNFe.ide;
	var my_emit		= my_infNFe.emit;
	var my_total	= my_infNFe.total.ICMSTot;
	var my_transp	= my_infNFe.transp;
	var my_infAdic	= my_infNFe.infAdic;

	var my_vendor_id = JKY.get_vendor_id(my_emit.xNome, my_emit.CNPJ);
		my_vendor_id = my_vendor_id || 'null';

	var my_nfe_id	 = JKY.get_id('NFEs', 'vendor_id = ' + my_vendor_id + ' AND nfe_number = ' + my_ide.nNF);
		my_nfe_id	 = my_nfe_id || 'null';

	if (my_nfe_id == 'null') {
		JKY.show('jky-action-insert');
		JKY.hide('jky-action-update');
	}else{
		JKY.display_message('NFE already processed: ' + my_nfe_id);
		JKY.row.id = my_nfe_id;
		JKY.hide('jky-action-insert');
		JKY.show('jky-action-update');
	}
	JKY.hide('jky-action-add-new');

	if (JKY.is_empty(my_ide.dEmi))		{my_ide.dEmi = my_ide.dhEmi;}

	JKY.set_value	('jky-nfe-key'			,				 my_infNFe['@attributes'].Id.substr(3));
	JKY.set_value	('jky-nfe-id'			,				 my_nfe_id			);
	JKY.set_value	('jky-nfe-number'		,				 my_ide.nNF			);
	JKY.set_value	('jky-vendor-id'		,				 my_vendor_id		);
	JKY.set_value	('jky-vendor-cnpj'		,				 my_emit.CNPJ		);
	JKY.set_value	('jky-vendor-name'		,				 my_emit.xNome		);
	JKY.set_value	('jky-operation-name'	,				 my_ide.natOp		);
	JKY.set_date	('jky-received-date'	, JKY.out_time	(JKY.get_now())		);
	JKY.set_date	('jky-invoice-date'		, JKY.out_date	(my_ide.dEmi)		);
	JKY.set_value	('jky-invoice-pieces'	,				 my_transp.vol.qVol	);
	JKY.set_value	('jky-invoice-weight'	,				 my_transp.vol.pesoL);
	JKY.set_value	('jky-invoice-amount'	,				 my_total.vNF		);
	JKY.set_value	('jky-gross-weight'		,				 my_transp.vol.pesoB);
	JKY.set_value	('jky-package-type'		,				 my_transp.vol.esp  );
	JKY.set_value	('jky-received-pieces'	,				 0);
	JKY.set_value	('jky-received-weight'	,				 0);
	JKY.set_value	('jky-received-amount'	,				 0);
	JKY.set_value	('jky-remarks'			,				 my_infAdic.infCpl	 );
	JKY.set_html('jky-hide',
		  '<input id="jky-vBC"			value="' + my_total.vBC			+  '" />'
		+ '<input id="jky-vBCST"		value="' + my_total.vBCST		+  '" />'
		+ '<input id="jky-vCOFINS"		value="' + my_total.vCOFINS		+  '" />'
		+ '<input id="jky-vDesc"		value="' + my_total.vDesc		+  '" />'
		+ '<input id="jky-vFrete"		value="' + my_total.vFrete		+  '" />'
		+ '<input id="jky-vICMS"		value="' + my_total.vICMS		+  '" />'
		+ '<input id="jky-vICMSDeson"	value="' + my_total.vICMSDeson	+  '" />'
		+ '<input id="jky-vII"			value="' + my_total.vII			+  '" />'
		+ '<input id="jky-vIPI"			value="' + my_total.vIPI		+  '" />'
		+ '<input id="jky-vNF"			value="' + my_total.vNF			+  '" />'
		+ '<input id="jky-vOutro"		value="' + my_total.vOutro		+  '" />'
		+ '<input id="jky-vPIS"			value="' + my_total.vPIS		+  '" />'
		+ '<input id="jky-vProd"		value="' + my_total.vProd		+  '" />'
		+ '<input id="jky-vST"			value="' + my_total.vST			+  '" />'
		+ '<input id="jky-vSeg"			value="' + my_total.vSeg		+  '" />'
		+ '<input id="jky-modFrete"		value="' + my_transp.modFrete	+  '" />'
	);

	JKY.generate_items(my_infNFe);
	JKY.generate_bills(my_infNFe);
};

JKY.get_match_object = function(the_key, the_object) {
	for(var key in the_object) {
		if (the_key == key.substr(0, the_key.length)) {
			return the_object[key];
		}
	}
	return [];
};

JKY.generate_items = function(the_infNFe) {
	var my_html  = '';
	if (typeof(the_infNFe.det) != 'undefined') {
		var my_info = the_infNFe.det;
		if (JKY.is_array(my_info)) {
			for(var i in my_info) {
				var my_row = my_info[i];
				my_html += JKY.generate_item(my_row);
			}
		}else{
			my_html += JKY.generate_item(my_info);
		}
	}
	JKY.set_html('jky-items-body', my_html);
};

JKY.generate_item = function(the_row) {
	var my_id = the_row['@attributes'].nItem;
	var my_prod		= the_row.prod;

	if (typeof(the_row.imposto.COFINS	) == 'undefined')	{the_row.imposto.COFINS	= [];}
	if (typeof(the_row.imposto.ICMS		) == 'undefined')	{the_row.imposto.ICMS	= [];}
	if (typeof(the_row.imposto.PIS		) == 'undefined')	{the_row.imposto.PIS	= [];}
	if (typeof(the_row.imposto.IPI		) == 'undefined')	{the_row.imposto.IPI	= [];}
	var my_cofins	= JKY.get_match_object('COFINS'	, the_row.imposto.COFINS);
	var my_icms		= JKY.get_match_object('ICMS'	, the_row.imposto.ICMS	);
	var my_pis		= JKY.get_match_object('PIS'	, the_row.imposto.PIS	);
	var my_ipi		= JKY.get_match_object('IPI'	, the_row.imposto.IPI	);

	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_line(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_html = ''
		+ '<tr class="jky-line" nfe_item_id=' + my_id + '>'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-name-l"	><input class="jky-cProd"	disabled value="' + my_prod.cProd	+ '" /></td>'
		+ '<td class="jky-td-name-w"	><input class="jky-xProd"	disabled value="' + my_prod.xProd	+ '" /></td>'
		+ '<td class="jky-td-code"		><input class="jky-NCM"		disabled value="' + my_prod.NCM		+ '" /></td>'
		+ '<td class="jky-td-code"		><input class="jky-CFOP"	disabled value="' + my_prod.CFOP	+ '" /></td>'
		+ '<td class="jky-td-code"		><input class="jky-uCom"	disabled value="' + my_prod.uCom	+ '" /></td>'
		+ '<td class="jky-td-weight"	><input class="jky-qCom"	disabled value="' + my_prod.qCom	+ '" /></td>'
		+ '<td class="jky-td-amount"	><input class="jky-vUnCom"	disabled value="' + my_prod.vUnCom	+ '" /></td>'
		+ '<td class="jky-td-amount"	><input class="jky-vProd"	disabled value="' + my_prod.vProd	+ '" />'

		+ '<td class="jky-hide">'
		+ '<input class="jky-indTot"		value="' + my_prod.indTot			+  '" />'
		+ '<input class="jky-uTrib"			value="' + my_prod.uTrib			+  '" />'
		+ '<input class="jky-qTrib"			value="' + my_prod.qTrib			+  '" />'
		+ '<input class="jky-vUnTrib"		value="' + my_prod.vUnTrib			+  '" />'
		+ '<input class="jky-vBC-ICMS"		value="' + my_icms.vBC				+  '" />'
		+ '<input class="jky-CST-ICMS"		value="' + my_icms.CST				+  '" />'
		+ '<input class="jky-orig"			value="' + my_icms.orig				+  '" />'
		+ '<input class="jky-modBC"			value="' + my_icms.modBC			+  '" />'
		+ '<input class="jky-pICMS"			value="' + my_icms.pICMS			+  '" />'
		+ '<input class="jky-vICMS"			value="' + my_icms.vICMS			+  '" />'
		+ '<input class="jky-vBC-PIS"		value="' + my_pis.vBC				+  '" />'
		+ '<input class="jky-CST-PIS"		value="' + my_pis.CST				+  '" />'
		+ '<input class="jky-pPIS"			value="' + my_pis.pPIS				+  '" />'
		+ '<input class="jky-vPIS"			value="' + my_pis.vPIS				+  '" />'
		+ '<input class="jky-vBC-COFINS"	value="' + my_cofins.vBC			+  '" />'
		+ '<input class="jky-CST-COFINS"	value="' + my_cofins.CST			+  '" />'
		+ '<input class="jky-pCOFINS"		value="' + my_cofins.pCOFINS		+  '" />'
		+ '<input class="jky-vCOFINS"		value="' + my_cofins.vCOFINS		+  '" />'
		+ '<input class="jky-CST-IPI"		value="' + my_ipi.CST				+  '" />'
		+ '<input class="jky-cEnq"			value="' + the_row.imposto.IPI.cEnq	+  '" />'
		+ '<input class="jky-clEnq"			value="' + the_row.imposto.IPI.clEnq+  '" />'
		+ '<input class="jky-vTotTrib"		value="' + the_row.imposto.vTotTrib	+  '" />'
		+ '</div>'
	
		+ '</td>'
		+ '</tr>'
		;
	var my_received_weight = parseFloat(JKY.get_value('jky-received-weight'));
	var my_received_amount = parseFloat(JKY.get_value('jky-received-amount'));
	JKY.set_value('jky-received-weight', my_received_weight + parseFloat(my_prod.qTrib));
	JKY.set_value('jky-received-amount', my_received_amount + parseFloat(my_prod.vProd));
	JKY.set_calculated_color();
	return my_html;
}

JKY.generate_bills = function(the_infNFe) {
	var my_html  = '';
	if (typeof(the_infNFe.cobr		) != 'undefined'
	&&  typeof(the_infNFe.cobr.dup	) != 'undefined') {
		var my_info = the_infNFe.cobr.dup;
		if (JKY.is_array(my_info)) {
			for(var i in my_info) {
				var my_row = my_info[i];
				my_html += JKY.generate_bill(my_row);
			}
		}else{
			my_html += JKY.generate_bill(my_info);
		}
	}
	JKY.set_html('jky-bills-body', my_html);
};

JKY.generate_bill = function(the_row) {
	var my_row = the_row;
	var my_trash = JKY.is_status('Draft') ? '<a onclick="JKY.delete_bill(this, ' + my_id + ')"><i class="icon-trash"></i></a>' : '';
	var my_html = ''
		+ '<tr class="jky-line">'
		+ '<td class="jky-td-action"	>' + my_trash	+ '</td>'
		+ '<td class="jky-td-number-l"	><input class="jky-bill-number"		disabled value="' +				 my_row.nDup	+ '" /></td>'
		+ '<td class="jky-td-date"		><input class="jky-maturity-date"	disabled value="' + JKY.out_date(my_row.dVenc)	+ '" /></td>'
		+ '<td class="jky-td-amount"	><input class="jky-bill-amount"		disabled value="' +				 my_row.vDup	+ '" /></td>'
		+ '</tr>'
		;
	return my_html;
}

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_invoice_weight	= parseFloat(JKY.get_value('jky-invoice-weight'	));
	var my_received_weight	= parseFloat(JKY.get_value('jky-received-amount'	));
	JKY.set_css('jky-received-weight', 'color', ((my_invoice_weight - my_received_weight) > 0.001) ? 'red' : 'black');

	var my_invoice_amount	= parseInt(JKY.get_value('jky-invoice-amount'	));
	var my_received_amount	= parseInt(JKY.get_value('jky-received_amount'	));
	JKY.set_css('jky-received-amount', 'color', (my_invoice_amount > my_received_amount) ? 'red' : 'black');

//	var my_reserved_boxes	= parseInt(JKY.get_value('jky-reserved-boxes'	));
//	JKY.set_css('jky-reserved-boxes', 'color', (my_reserved_boxes < 0) ? 'red' : 'black');
}

/**
 *	set add new row
 */
JKY.set_add_new_row = function() {
	JKY.disable_button('jky-action-delete'	);
	JKY.disable_button('jky-action-close'	);

	JKY.set_value	('jky-receive-number'	,  JKY.t('New'));
	JKY.set_date	('jky-received-date'	,  JKY.out_time(JKY.get_now()));
	JKY.set_option	('jky-dyer-name'	, '');
	JKY.set_value	('jky-nfe-dl'			, '');
	JKY.set_value	('jky-nfe-tm'			, '');
	JKY.set_date	('jky-invoice-date'		,  JKY.out_date(JKY.get_date()));
	JKY.set_value	('jky-invoice-weight'	,  0);
	JKY.set_value	('jky-invoice-amount'	,  0);
	JKY.set_value	('jky-received-weight'	,  0);
	JKY.set_value	('jky-received-amount'	,  0);
};

/**
 *	get form set
 */
JKY.get_form_set = function() {
	var my_vendor_id = JKY.get_vendor_id(JKY.get_value('jky-vendor-name'), JKY.get_value('jky-vendor-cnpj'));
		my_vendor_id = my_vendor_id || 'null';
	var my_set = ''
		+           'nfe_key=\'' + JKY.get_value	('jky-nfe-key'			) + '\''
		+      ', nfe_number=  ' + JKY.get_value	('jky-nfe-number'		)
		+       ', vendor_id=  ' +  my_vendor_id
		+     ', vendor_cnpj=\'' + JKY.get_value	('jky-vendor-cnpj'		) + '\''
		+     ', vendor_name=\'' + JKY.get_value	('jky-vendor-name'		) + '\''
		+  ', operation_name=\'' + JKY.get_value	('jky-operation-name'	) + '\''
		+    ', invoice_date=  ' + JKY.inp_date		('jky-invoice-date'		)
		+  ', invoice_pieces=  ' + JKY.get_value	('jky-invoice-pieces'	)
		+  ', invoice_weight=  ' + JKY.get_value	('jky-invoice-weight'	)
		+  ', invoice_amount=  ' + JKY.get_value	('jky-invoice-amount'	)
		+    ', gross_weight=  ' + JKY.get_value	('jky-gross-weight'		)
		+    ', package_type=\'' + JKY.get_value	('jky-package-type'		) + '\''
		+ ', received_pieces=  ' + JKY.get_value	('jky-received-pieces'	)
		+ ', received_weight=  ' + JKY.get_value	('jky-received-weight'	)
		+ ', received_amount=  ' + JKY.get_value	('jky-received-amount'	)
	
		+ JKY.set_field_value('vBC'			, 'DECIMAL'	, $('#jky-vBC'			).val())
		+ JKY.set_field_value('vBCST'		, 'DECIMAL'	, $('#jky-vBCST'		).val())
		+ JKY.set_field_value('vCOFINS'		, 'DECIMAL'	, $('#jky-vCOFINS'		).val())
		+ JKY.set_field_value('vDesc'		, 'DECIMAL'	, $('#jky-vDesc'		).val())
		+ JKY.set_field_value('vFrete'		, 'DECIMAL'	, $('#jky-vFrete'		).val())
		+ JKY.set_field_value('vICMS'		, 'DECIMAL'	, $('#jky-vICMS'		).val())
		+ JKY.set_field_value('vICMSDeson'	, 'DECIMAL'	, $('#jky-vICMSDeson'	).val())
		+ JKY.set_field_value('vII'			, 'DECIMAL'	, $('#jky-vII'			).val())
		+ JKY.set_field_value('vIPI'		, 'DECIMAL'	, $('#jky-vIPI'			).val())
		+ JKY.set_field_value('vNF'			, 'DECIMAL'	, $('#jky-vNF'			).val())
		+ JKY.set_field_value('vOutro'		, 'DECIMAL'	, $('#jky-vOutro'		).val())
		+ JKY.set_field_value('vPIS'		, 'DECIMAL'	, $('#jky-vPIS'			).val())
		+ JKY.set_field_value('vProd'		, 'DECIMAL'	, $('#jky-vProd'		).val())
		+ JKY.set_field_value('vST'			, 'DECIMAL'	, $('#jky-vST'			).val())
		+ JKY.set_field_value('vSeg'		, 'DECIMAL'	, $('#jky-vSeg'			).val())
		+ JKY.set_field_value('modFrete'	, 'INT'		, $('#jky-modFrete'		).val())
		
		+         ', remarks=\'' + JKY.encode(JKY.get_value('jky-remarks')) + '\''
		;
		
		
	return my_set;
};

JKY.process_delete = function(the_id, the_row) {
	var my_data =
		{ method: 'delete_many'
		, table : 'Batches'
		, where : 'receivedyer_id = ' + the_id
		};
	JKY.ajax(true, my_data);
};

/**
 *	set calculated color
 */
JKY.set_calculated_color = function() {
	var my_invoice_weight	= parseFloat(JKY.get_value('jky-invoice-weight'	));
	var my_invoice_amount	= parseFloat(JKY.get_value('jky-invoice-amount'	));
	var my_received_weight	= parseFloat(JKY.get_value('jky-received-weight'));
	var my_received_amount	= parseFloat(JKY.get_value('jky-received-amount'));
	JKY.set_css('jky-received-amount', 'color', (Math.abs(my_invoice_amount - my_received_amount) > 0.021) ? 'red' : 'black');
	JKY.set_css('jky-received-weight', 'color', (Math.abs(my_invoice_weight - my_received_weight) > 0.021) ? 'red' : 'black');
};

JKY.display_list = function() {
	JKY.hide('jky-action-add-new');
};

JKY.display_graph = function() {
	JKY.show('jky-loading');
	var my_data =
		{ method	: 'get_index'
		, table		: JKY.App.get_prop('table_name')
		, specific	: JKY.App.get_prop('specific')
		, select	: JKY.App.get_prop('select')
		, filter	: JKY.App.get_prop('filter')
		, display	: JKY.App.get_prop('display')
//		, order_by	: 'invoice_date'
//		, group_by	: 'invoice_date'
		};
	JKY.ajax(false, my_data, JKY.display_graph_success);
}

JKY.display_graph_success = function(response) {
	var my_rows	= response.rows;

//	sum all [invoice_weight] by [invoice_date]
	var sum_by_invoice_date = d3.nest()
		.key	(function(d)	{return d.invoice_date ? d.invoice_date.substr(5,5) : 'unknown';})
		.sortKeys(d3.ascending)
		.rollup	(function(d)	{return	{invoice_weight:d3.sum(d, function(g)	{return +g.invoice_weight ;})};})
		.entries(my_rows)
		;
//	JKY.var_dump('sum_by_invoice_date', sum_by_invoice_date);

//	sum all [received_weight] by [received_date]
	var sum_by_received_date = d3.nest()
		.key	(function(d)	{return d.received_at ? d.received_at.substr(5,5) : 'unknown';})
		.sortKeys(d3.ascending)
		.rollup	(function(d) 	{return	{received_weight:d3.sum(d, function(g)	{return +g.received_weight;})};})
		.entries(my_rows)
		;
//	JKY.var_dump('sum_by_received_date', sum_by_received_date);

	var merged_array = [];
	var get_index = function(the_key) {
		var j = merged_array.length;
		if (j > 0) {
			for(j in merged_array) {
				var my_key = merged_array[j].key;
				if (my_key == the_key)		{return j;}
				if (my_key >  the_key)	 	{j=parseInt(j)-1; break;}
			}
			j=parseInt(j)+1;
		}
		var my_row = {'key':the_key, 'invoice_weight':0, 'received_weight':0};
		merged_array.splice(j, 0, my_row);
		return j;
	}

//	merge all [invoice_weight] by [invoice_date]
	for(var i in sum_by_invoice_date) {
		var my_row = sum_by_invoice_date[i];
		if (my_row.values.invoice_weight > 0) {
			var my_index = get_index(my_row.key);
			merged_array[my_index].invoice_weight += my_row.values.invoice_weight;
		}
	}

//	merge all [received_weight] by [received_date]
	for(var i in sum_by_received_date) {
		var my_row = sum_by_received_date[i];
		if (my_row.values.received_weight > 0) {
			var my_index = get_index(my_row.key);
			merged_array[my_index].received_weight += my_row.values.received_weight;
		}
	}
//	JKY.var_dump('merged_array', merged_array);

//	draw dual_bar chart with [invoice_weight] and [received_weight] by [date]
	$('#jky-graph-body').html('');
	JKY.Graph = JKY.D3;
	JKY.Graph.setArgs(
		{ id_name		: 'jky-graph-body'
		, graph_name	: 'dual_bar'
		, axis_name		: 'key'
		, var1_name		: 'invoice_weight'
		, var2_name		: 'received_weight'
		, round_up		: 200
		, chart_width	: 600
		, chart_height	:   0
		});
	JKY.Graph.draw(merged_array);
	JKY.hide('jky-loading');
}

/* -------------------------------------------------------------------------- */
JKY.save_remarks = function() {
	var my_set	=   'remarks = \'' + JKY.get_value('jky-remarks') + '\'';
	var my_data =
		{ method: 'update'
		, table : 'Quotations'
		, set	:  my_set
		, where : 'Quotations.id = ' + JKY.row.id
		};
	JKY.ajax(true, my_data, JKY.save_remarks_success);
};

JKY.save_remarks_success = function(response) {
	JKY.display_message('Remarks saved, ' + response.message);
	JKY.row = JKY.get_row('Quotations', JKY.row.id);
};

JKY.set_field_value = function(the_key, the_type, the_value) {
	if (the_value == 'undefined') {
		return '';
	}else{
		if (the_type == 'STRING') {
			return ', ' + the_key + '=\'' + the_value + '\''; 
		}else{
			return ', ' + the_key + '=' + the_value;
		}
	}
}

JKY.process_insert = function(the_id) {
	JKY.show('jky-loading');
	
	var my_items = $('#jky-items-body tr');
	for(var i=0, max=my_items.length; i<max; i++) {
		var my_item = $(my_items[i]);
		var my_set = ''
			+ 'nfe_id=  ' + the_id
			+ JKY.set_field_value('cProd'		, 'STRING'	, my_item.find('.jky-cProd'		).val())
			+ JKY.set_field_value('xProd'		, 'STRING'	, my_item.find('.jky-xProd'		).val())
			+ JKY.set_field_value('NCM'			, 'STRING'	, my_item.find('.jky-NCM'		).val())
			+ JKY.set_field_value('CFOP'		, 'STRING'	, my_item.find('.jky-CFOP'		).val())
			+ JKY.set_field_value('uCom'		, 'STRING'	, my_item.find('.jky-uCom'		).val())
			+ JKY.set_field_value('qCom'		, 'DECIMAL'	, my_item.find('.jky-qCom'		).val())
			+ JKY.set_field_value('vUnCom'		, 'DECIMAL'	, my_item.find('.jky-vUnCom'	).val())
			+ JKY.set_field_value('vProd'		, 'DECIMAL'	, my_item.find('.jky-vProd'		).val())
			+ JKY.set_field_value('indTot'		, 'INT'		, my_item.find('.jky-indTot'	).val())
			+ JKY.set_field_value('uTrib'		, 'STRING'	, my_item.find('.jky-uTrib'		).val())
			+ JKY.set_field_value('qTrib'		, 'DECIMAL'	, my_item.find('.jky-qTrib'		).val())
			+ JKY.set_field_value('vUnTrib'		, 'DECIMAL'	, my_item.find('.jky-vUnTrib'	).val())
			+ JKY.set_field_value('vBC_ICMS'	, 'DECIMAL'	, my_item.find('.jky-vBC-ICMS'	).val())
			+ JKY.set_field_value('CST_ICMS'	, 'STRING'	, my_item.find('.jky-CST-ICMS'	).val())
			+ JKY.set_field_value('orig'		, 'INT'		, my_item.find('.jky-orig'		).val())
			+ JKY.set_field_value('modBC'		, 'INT'		, my_item.find('.jky-modBC'		).val())
			+ JKY.set_field_value('pICMS'		, 'DECIMAL'	, my_item.find('.jky-pICMS'		).val())
			+ JKY.set_field_value('vICMS'		, 'DECIMAL'	, my_item.find('.jky-vICMS'		).val())
			+ JKY.set_field_value('vBC_PIS'		, 'DECIMAL'	, my_item.find('.jky-vBC-PIS'	).val())
			+ JKY.set_field_value('CST_PIS'		, 'STRING'	, my_item.find('.jky-CST-PIS'	).val())
			+ JKY.set_field_value('pPIS'		, 'DECIMAL'	, my_item.find('.jky-pPIS'		).val())
			+ JKY.set_field_value('vPIS'		, 'DECIMAL'	, my_item.find('.jky-vPIS'		).val())
			+ JKY.set_field_value('vBC_COFINS'	, 'DECIMAL'	, my_item.find('.jky-vBC-COFINS').val())
			+ JKY.set_field_value('CST_COFINS'	, 'STRING'	, my_item.find('.jky-CST-COFINS').val())
			+ JKY.set_field_value('pCOFINS'		, 'DECIMAL'	, my_item.find('.jky-pCOFINS'	).val())
			+ JKY.set_field_value('vCOFINS'		, 'DECIMAL'	, my_item.find('.jky-vCOFINS'	).val())
			+ JKY.set_field_value('CST_IPI'		, 'STRING'	, my_item.find('.jky-CST-IPI'	).val())
			+ JKY.set_field_value('cEnq'		, 'INT'		, my_item.find('.jky-cEnq'		).val())
			+ JKY.set_field_value('clEnq'		, 'INT'		, my_item.find('.jky-clEnq'		).val())
			+ JKY.set_field_value('vTotTrib'	, 'DECIMAL'	, my_item.find('.jky-vTotTrib'	).val())
			;
		var my_data =
			{ method: 'insert'
			, table : 'NFEItems'
			, set	:  my_set
			};
		JKY.display_message(JKY.t('NFE item added') + ': ' + my_item.find('.jky-cProd').val());
		JKY.ajax(true, my_data);
	}	

	var my_bills = $('#jky-bills-body tr');
	for(var i=0, max=my_bills.length; i<max; i++) {
		var my_bill = $(my_bills[i]);
		var my_set = ''
			+            'nfe_id=  ' + the_id
			+     ', bill_number=\'' + my_bill.find('.jky-bill-number'	 ).val() + '\''
			+     ', bill_amount=  ' + my_bill.find('.jky-bill-amount'	 ).val()
			+   ', maturity_date=  ' + JKY.inp_date_value(my_bill.find('.jky-maturity-date').val())
			;
		var my_data =
			{ method: 'insert'
			, table : 'NFEBills'
			, set	:  my_set
			};
		JKY.display_message(JKY.t('NFE bill added') + ': ' + my_bill.find('.jky-bill-number').val());
		JKY.ajax(true, my_data);
	}	

	JKY.move_to_processed();
	JKY.hide('jky-loading');
};

JKY.process_update = function(the_id, the_row) {
	JKY.move_to_processed();
}

JKY.move_to_processed = function() {
	var my_filename = JKY.get_file_name(JKY.row_id);

	var my_data =
		{ method	: 'move'
		, table		:  JKY.App.get_prop('table_name')
		, filename	:  my_filename
		, from		:  JKY.get_control_value('NFE Folders', 'Received' )
		, to		:  JKY.get_control_value('NFE Folders', 'Processed')
		};
	JKY.ajax(false, my_data, JKY.move_to_processed_success);
};

JKY.move_to_processed_success = function(response) {
	setTimeout(function() {
		JKY.App.display_list();
	}, 1000);
}