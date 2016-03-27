<?

/**
 *	$.ajax({ method: invoice, table: x...x, id: x...x });
 *
 *	return: [ x...x, ..., x...x ]
 */
function JKY_invoice($data) {
	$table	= get_data($data, 'table'	);
	$id		= get_data($data, 'id'		);

	switch($table) {
		case 'Customers'	: JKY_invoice_customer	($id); return;
		case 'Dyers'		: JKY_invoice_dyer		($id); return;
		case 'Partners'		: JKY_invoice_partner	($id); return;
	}

	JKY_echo_error('table [' . $table . '] is undefined');
}

function JKY_echo_count($count) {
	$return = array();
	$return[ 'status' ] = 'ok';
	$return[ 'count'  ] = $count;
	echo json_encode($return);
}

function JKY_echo_error($message) {
	$return = array();
	$return['status' ] = 'error';
	$return['message'] = $message;
	echo json_encode($return);
}

/**
 *	invoice to Customer from Sales
 *
 * @param	int		sale_id
 * @return	int		count of Records generated
 */
function JKY_invoice_customer($the_id) {
	$db = Zend_Registry::get('db');

	$my_cProd			= get_config_value('NFe Dyer', 'cProd'		);
	$my_cor_code		= get_config_value('NFe Dyer', 'cor_code'	);
	$my_cor_type		= get_config_value('NFe Dyer', 'cor_type'	);
	$my_NCM				= get_config_value('NFe Dyer', 'NCM'		);
	$my_CFOP			= get_config_value('NFe Dyer', 'CFOP'		);
	$my_uCom			= get_config_value('NFe Dyer', 'uCom'		);
	$my_vUnCom			= get_config_value('NFe Dyer', 'vUnCom'		);
	$my_orig			= get_config_value('NFe Dyer', 'orig'		);
	$my_CST_ICMS		= get_config_value('NFe Dyer', 'CST_ICMS'	);
	$my_CST_IPI			= get_config_value('NFe Dyer', 'CST_IPI'	);
	$my_pIPI			= get_config_value('NFe Dyer', 'pIPI'		);			
	$my_pPIS			= get_config_value('NFe Dyer', 'pPIS'		);			
	$my_pCOFINS			= get_config_value('NFe Dyer', 'pCOFINS'	);
	$my_product_code	= get_config_value('NFe Dyer', 'cProd'		);
	$my_product_cf		= get_config_value('NFe Dyer', 'NCM'		);
	$my_IPI_code		= get_config_value('NFe Dyer', 'CST_IPI'	);
	$my_IPI_aliquota	= get_config_value('NFe Dyer', 'pIPI'		);
	$my_tpNF			= get_config_value('NFe Dyer', 'tpNF'		);
	$my_natOp			= get_config_value('NFe Dyer', 'natOp'		);
	$my_modFrete		= get_config_value('NFe Dyer', 'modFrete'	);
	$my_esp				= get_config_value('NFe Dyer', 'esp'		);
	$my_marca			= get_config_value('NFe Dyer', 'marca'		);
	$my_infCpl			= get_config_value('NFe Dyer', 'infCpl'		);
	
	$my_invoice = array();
	$my_invoice['table_name'] = 'Sales';
	$my_invoice['table_id'	] = $the_id;

	$sales = db_get_row('Sales', 'id=' . $the_id);

	$customer = db_get_row('Contacts', 'id=' . $sales['customer_id']);
	$company = array();
	$company['pessoa'		] = $customer	['is_company'	] == 'Yes' ? 'J' : 'F';
	$company['name'			] = $customer	['full_name'	];
	$company['fantasia'		] = $customer	['nick_name'	];
	$company['email'		] = $customer	['email'		];
	$company['phone'		] = $customer	['phone'		];
	$company['fax'			] = $customer	['fax'			];
	$company['cnpj'			] = $customer	['cnpj'			];
	$company['ie'			] = $customer	['ie'			];
	$company['district'		] = $customer	['district'		];
	$company['number'		] = $customer	['st_number'	];
	$company['cpl'			] = $customer	['st_cpl'		];
	$company['street1'		] = $customer	['street1'		];
	$company['street2'		] = $customer	['street2'		];
	$company['zip'			] = $customer	['zip'			];
	$company['city'			] = $customer	['city'			];
	$company['state'		] = $customer	['state'		];
	$company['country'		] = $customer	['country'		];
	$my_invoice['customer'	] = $company;

	$transport = db_get_row('Contacts', 'id=' . $sales['transport_id']);
	$company = array();
	$company['pessoa'		] = $transport	['is_company'	] == 'Yes' ? 'J' : 'F';
	$company['name'			] = $transport	['full_name'	];
	$company['fantasia'		] = $transport	['nick_name'	];
	$company['email'		] = $transport	['email'		];
	$company['phone'		] = $transport	['phone'		];
	$company['fax'			] = $transport	['fax'			];
	$company['cnpj'			] = $transport	['cnpj'			];
	$company['ie'			] = $transport	['ie'			];
	$company['district'		] = $transport	['district'		];
	$company['number'		] = $transport	['st_number'	];
	$company['cpl'			] = $transport	['st_cpl'		];
	$company['street1'		] = $transport	['street1'		];
	$company['street2'		] = $transport	['street2'		];
	$company['zip'			] = $transport	['zip'			];
	$company['city'			] = $transport	['city'			];
	$company['state'		] = $transport	['state'		];
	$company['country'		] = $transport	['country'		];
	$my_invoice['transport'	] = $company;
	
	$i = 0;
	$total_volume = 0;
	$total_weight = 0;

	$items		= array();
	$products	= array();
	$salelines = db_get_rows('SaleLines', 'parent_id=' . $the_id);
	foreach($salelines as $saleline) {
		$total_volume += $saleline['checkout_pieces'];
		$prod	= db_get_row ('Products', 'id=' . $saleline['product_id']);
		$cone_weight= JKY_get_cone_weight($sales['deduct_cone'], $prod['product_type']);

		$ftp	= db_get_row ('FTPs', 'product_id=' . $saleline['product_id'] . ' AND is_current = "Yes"');
		if (!$ftp) {
			$ftp= db_get_row ('FTPs', 'product_id=' . $saleline['product_id']);
		}

		$salecolors = db_get_rows('SaleColors', 'parent_id=' . $saleline['id']);
		foreach($salecolors as $salecolor) {
			$color	= db_get_row ('Colors'  , 'id=' . $salecolor['color_id']);

			$net_price	= JKY_get_net_price($salecolor['sold_price'], $salecolor['discount'], $saleline['discount']); 
			$net_weight	= $salecolor['checkout_weight'] - ($salecolor['checkout_pieces'] * $cone_weight);
			$total_weight += $net_weight;
			
			$item = array();
//	??????	['null'] will crash apache for unkown reason, should changed to [null]
			$item	['cProd'		] = $my_cProd;
			$item	['xProd'		] = $prod['product_name'];
			$item	['cor_code'		] = $color['color_code'];
			$item	['cor_type'		] = $color['color_type'];
			$item	['composicao'	] = $ftp['composition'];
			$item	['NCM'			] = $my_NCM;
			$item	['CFOP'			] = $my_CFOP;
			$item	['uCom'			] = $my_uCom;
			$item	['qCom'			] = $net_weight;
			$item	['vUnCom'		] = $net_price;
			$item	['orig'			] = $my_orig;
			$item	['CST_ICMS'		] = $my_CST_ICMS;
			$item	['CST_IPI'		] = $my_CST_IPI;
			$item	['pIPI'			] = $my_pIPI;
			$item	['pPIS'			] = $my_pPIS;
			$item	['pCOFINS'		] = $my_pCOFINS;
			$items[$i] = $item;

			$product = array();
			$product['product_code'	] = $my_cProd;
			$product['product_cf'	] = $my_NCM;
			$product['IPI_code'		] = $my_CST_IPI;
			$product['IPI_aliquota'	] = $my_pIPI;
			$product['product_title'] = $prod['product_name'];
//			$product['composicao'	] = $ftp ['composition'	];
			$products[$i] = $product;

			$i ++;
		}
	}
	$my_count = $i;

	$my_invoice['items'		] = $items;
	$my_invoice['products'	] = $products;

	$nfe = array();
	$nfe	['dEmi'			] = get_date();
	$nfe	['dSaiEnt'		] = get_date();
	$nfe	['tpNF'			] = $my_tpNF;
	$nfe	['natOp'		] = $my_natOp;
	$nfe	['dxNome'		] = $customer ['full_name'];
	$nfe	['txNome'		] = $transport['full_name'];
	$nfe	['modFrete'		] = $my_modFrete;
	$nfe	['qVol'			] = $total_volume;
	$nfe	['esp'			] = $my_esp;
	$nfe	['marca'		] = $my_marca;
	$nfe	['pesoL'		] = $total_weight;
	$nfe	['infCpl'		] = $my_infCpl;
	$my_invoice['nfe'] = $nfe;
/*
	$sql= 'UPDATE ShipDyers'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('ShipDyers', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'ShipDyers', $the_id);
*/

	$my_json = json_encode($my_invoice);
	$my_invoice_id = db_get_id('Invoices', 'table_name="Sales" AND table_id = ' . $the_id);
	if ($my_invoice_id) {
		$sql= 'UPDATE Invoices'
			. '   SET updated_at =\'' . get_now() . '\''
			. '     , json_data = \'' . $my_json  . '\''
			. ' WHERE id = ' . $my_invoice_id
			;
log_sql('Invoice', 'UPDATE', $sql);
		$db->query($sql);
	}else{
		$sql= 'INSERT Invoices'
			. '   SET id = ' . get_next_id('Invoices')
			. '		, updated_at =\'' . get_now() . '\''
			. '     , table_name = "Sales"'
			. '     , table_id = ' . $the_id
			. '     , json_data = \'' . $my_json  . '\''
			;
log_sql('Invoice', 'INSERT', $sql);
		$db->query($sql);
		$my_invoice_id = $db->lastInsertId();
	}
	insert_changes($db, 'Invoices', $my_invoice_id);

	send_message($my_json);

	JKY_echo_count($my_count);
}

function JKY_get_cone_weight($deduct_cone, $product_type) {
	$my_cone_weight = 0;
	if ($deduct_cone == 'Yes') {
		$my_config_value= get_config_value('Cone Types', $product_type);
		 if ($my_config_value) {
			$my_cone_weight = $my_config_value / 1000;
		}
	}
	return $my_cone_weight;
}

function JKY_get_net_price($sold_price, $color_discount, $line_discount) {
	$my_discount_price = 0;	
	if ($color_discount == '') {
		$color_discount = $line_discount;
	}
	if ($color_discount != '') {
		$my_length = strlen($color_discount);
		if (substr($color_discount, $my_length-1, 1) == '%') {
			$my_color_discount = (float)$color_discount;
			$my_discount_price = $sold_price * $my_color_discount / 100;
		}else{
			$my_discount_price = (float)$color_discount;
		};
	}
	return $sold_price - $my_discount_price;
}

/**
 *	invoice to Dyer from ShipDyer
 *
 * @param	int		shipdyer_id
 * @return	int		count of Records generated
 */
function JKY_invoice_dyer($the_id) {
	$domain		= get_config_value('NFe Dyer', 'domain');
	$my_return	= json_decode(proxy($domain, 'data={"method":"check_status"}'), true);
	if (!isset($my_return['status'])) {
		JKY_echo_error('domain [' . $domain . '] is not active');
		return;
	}
	if ($my_return['status'] != 'ok') {
		JKY_echo_error($my_return['message']);
		return;
	}

	$db	= Zend_Registry::get('db');
	$ship_dyer = db_get_row('ShipDyers', 'id=' . $the_id);

	$dyer = db_get_row('Contacts', 'id=' . $ship_dyer['dyer_id']);
	$company['pessoa'		] = $dyer		['is_company'	] == 'Yes' ? 'J' : 'F';
	$company['name'			] = $dyer		['full_name'	];
	$company['fantasia'		] = $dyer		['nick_name'	];
	$company['email'		] = $dyer		['email'		];
	$company['phone'		] = $dyer		['phone'		];
	$company['fax'			] = $dyer		['fax'			];
	$company['cnpj'			] = $dyer		['cnpj'			];
	$company['ie'			] = $dyer		['ie'			];
	$company['district'		] = $dyer		['district'		];
	$company['number'		] = $dyer		['st_number'	];
	$company['cpl'			] = $dyer		['st_cpl'		];
	$company['street1'		] = $dyer		['street1'		];
	$company['street2'		] = $dyer		['street2'		];
	$company['zip'			] = $dyer		['zip'			];
	$company['city'			] = $dyer		['city'			];
	$company['state'		] = $dyer		['state'		];
	$company['country'		] = $dyer		['country'		];
	$my_return = json_decode(proxy($domain, 'data={"method":"add_company", "row":' . json_encode($company) . '}'), true);
	$my_id = $my_return['id'];
log_sql('Dyer', 'INSERT', $my_id);

	$transport = db_get_row('Contacts', 'id=' . $ship_dyer['transport_id']);
	$company['pessoa'		] = $transport	['is_company'	] == 'Yes' ? 'J' : 'F';
	$company['name'			] = $transport	['full_name'	];
	$company['fantasia'		] = $transport	['nick_name'	];
	$company['email'		] = $transport	['email'		];
	$company['phone'		] = $transport	['phone'		];
	$company['fax'			] = $transport	['fax'			];
	$company['cnpj'			] = $transport	['cnpj'			];
	$company['ie'			] = $transport	['ie'			];
	$company['district'		] = $transport	['district'		];
	$company['number'		] = $transport	['st_number'	];
	$company['cpl'			] = $transport	['st_cpl'		];
	$company['street1'		] = $transport	['street1'		];
	$company['street2'		] = $transport	['street2'		];
	$company['zip'			] = $transport	['zip'			];
	$company['city'			] = $transport	['city'			];
	$company['state'		] = $transport	['state'		];
	$company['country'		] = $transport	['country'		];
	$my_return = json_decode(proxy($domain, 'data={"method":"add_company", "row":' . json_encode($company) . '}'), true);
	$my_id = $my_return['id'];
log_sql('Transport', 'INSERT', $my_id);

	$i = 0;
	$total_volume = 0;
	$items = array();
	$loadouts = db_get_rows('LoadOuts', 'shipdyer_id=' . $the_id);
	foreach($loadouts as $loadout) {
		$loadquots = db_get_rows('LoadQuotations', 'loadout_id=' . $loadout['id']);
		foreach($loadquots as $loadquot) {
			$pieces = db_get_rows('Pieces'	, 'load_quot_id=' .$loadquot['id']);
			$order  = db_get_row ('Orders'	, 'id=' . $pieces[0]['order_id'	]);
			$ftp	= db_get_row ('FTPs'	, 'id=' . $order['ftp_id'		]);
			$prod	= db_get_row ('Products', 'id=' . $order['product_id'	]);

			$total_weight = 0;
			foreach($pieces as $piece) {
				$total_volume ++;
				$total_weight += $piece['checkin_weight'];
			}
			$item	['NFe_id'		] = 'null';
			$item	['cProd'		] = get_config_value('NFe Dyer', 'cProd'	);
			$item	['xProd'		] = $prod['product_name'];
			$item	['cor_code'		] = get_config_value('NFe Dyer', 'cor_code'	);
			$item	['cor_type'		] = get_config_value('NFe Dyer', 'cor_type'	);
			$item	['composicao'	] = $ftp ['composition'	];
			$item	['NCM'			] = get_config_value('NFe Dyer', 'NCM'		);
			$item	['CFOP'			] = get_config_value('NFe Dyer', 'CFOP'		);
			$item	['uCom'			] = get_config_value('NFe Dyer', 'uCom'		);
			$item	['qCom'			] = $total_weight;
			$item	['vUnCom'		] = get_config_value('NFe Dyer', 'vUnCom'	);
			$item	['orig'			] = get_config_value('NFe Dyer', 'orig'		);
			$item	['CST_ICMS'		] = get_config_value('NFe Dyer', 'CST_ICMS'	);
			$item	['CST_IPI'		] = get_config_value('NFe Dyer', 'CST_IPI'	);
			$item	['pIPI'			] = get_config_value('NFe Dyer', 'pIPI'		);
			$item	['pPIS'			] = get_config_value('NFe Dyer', 'pPIS'		);
			$item	['pCOFINS'		] = get_config_value('NFe Dyer', 'pCOFINS'	);
			$items[$i] = $item;
			$i ++;

			$product['product_code'	] = get_config_value('NFe Dyer', 'cProd'	);
			$product['product_cf'	] = get_config_value('NFe Dyer', 'NCM'		);
			$product['IPI_code'		] = get_config_value('NFe Dyer', 'CST_IPI'	);
			$product['IPI_aliquota'	] = get_config_value('NFe Dyer', 'pIPI'		);
			$product['product_title'] = $prod['product_name'];
			$product['composicao'	] = $ftp ['composition'	];
			$my_return = json_decode(proxy($domain, 'data={"method":"add_product", "row":' . json_encode($product) . '}'), true);
			$my_id = $my_return['id'];
log_sql('Product', 'INSERT', $my_id);
		}
	}

	$my_count = 0;
	$nfe	['dEmi'			] = get_date();
	$nfe	['dSaiEnt'		] = get_date();
	$nfe	['tpNF'			] = get_config_value('NFe Dyer', 'tpNF'		);
	$nfe	['natOp'		] = get_config_value('NFe Dyer', 'natOp'	);
	$nfe	['dxNome'		] = $dyer		['full_name'	];
	$nfe	['txNome'		] = $transport	['full_name'	];
	$nfe	['modFrete'		] = get_config_value('NFe Dyer', 'modFrete'	);
	$nfe	['qVol'			] = $total_volume;
	$nfe	['esp'			] = get_config_value('NFe Dyer', 'esp'		);
	$nfe	['marca'		] = get_config_value('NFe Dyer', 'marca'	);
	$nfe	['pesoL'		] = '0';
	$nfe	['infCpl'		] = get_config_value('NFe Dyer', 'infCpl'	);
log_sql('NFe', 'BEFORE INSERT', json_encode($nfe));
	$my_return = json_decode(proxy($domain, 'data={"method":"add_nfe", "row":' . json_encode($nfe) . '}'), true);
	$my_nfe_id = $my_return['id'];
	if ($my_nfe_id)		$my_count++;
log_sql('NFe', 'INSERT', $my_nfe_id);

	foreach($items as $item) {
		$item['NFe_id'] = $my_nfe_id;
		$my_return = json_decode(proxy($domain, 'data={"method":"add_nfeitem", "row":' . json_encode($item) . '}'), true);
		$my_id = $my_return['id'];
		if ($my_id)		$my_count++;
log_sql('NFeItem', 'INSERT', $my_id);
	}

	$sql= 'UPDATE ShipDyers'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('ShipDyers', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'ShipDyers', $the_id);

	JKY_echo_count($my_count);
}

/**
 *	invoice to Partner from ShipDyer
 *
 * @param	int		shipdyer_id
 * @return	int		count of Records generated
 */
function JKY_invoice_partner($the_id) {
	$db		= Zend_Registry::get('db');
	$domain	= get_config_value('NFe Dyer', 'domain');

	$my_count = 0;
	JKY_echo_count($my_count);
}
