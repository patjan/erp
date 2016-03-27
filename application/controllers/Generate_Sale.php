<?
/**
 *	generate Sale from Quotations
 *
 * @param	int		quotation_id
 * @return	int		count of Sale
 *
 *  Lines generated
 */
function JKY_generate_sale($the_id) {
	$db = Zend_Registry::get('db');
	$my_cone_tubular = get_config_value('Cone Types', 'Tubular') / 1000;
	$my_cone_ramado  = get_config_value('Cone Types', 'Ramado' ) / 1000;
	
	$sql= 'SELECT *'
		. '  FROM Quotations'
		. ' WHERE id = ' . $the_id
		;
	$my_quotation = $db->fetchRow($sql);
	$sql= 'SELECT *'
		. '  FROM Contacts'
		. ' WHERE id = ' . $my_quotation['customer_id']
		;
	$my_customer = $db->fetchRow($sql);
	
	if ($my_customer['transport_id'] == null) {
		$sql= 'SELECT id'
			. '  FROM Contacts'
			. ' WHERE nick_name = "O Proprio"'
			;
		$my_customer['transport_id'] = $db->fetchOne($sql);
	};
	
	
//	$my_needed_at = $my_quotation['needed_at'];
//	if ($my_needed_at == null) {
//		$my_needed_at = get_time();
//	}

	$my_sale_id = get_next_id('Sales');
	$sql= 'INSERT Sales'
		. '   SET          id ='  . $my_sale_id
		. ',       updated_by ='  . get_session('user_id')
		. ',       updated_at ="' . get_time() . '"'
		. ',      sale_number ='  . $my_sale_id
		. ',     quotation_id ='  . $the_id
		. ',        sold_date ="' . get_time() . '"'
		. ',      sold_pieces ='  . $my_quotation['quoted_pieces'	]
//		. ',      sold_amount ='  . $my_quotation['quoted_amount'	]
//		. ',    sold_discount ='  . $my_quotation['sold_discount'	]
		. ',  advanced_amount ='  . $my_quotation['advanced_amount'	]
		. ',     transport_id ="' . $my_customer ['transport_id'	] . '"'
		. ',       is_taxable ="' . $my_customer ['is_taxable'		] . '"'
		. ',   icms_exemption ="' . $my_customer ['icms_exemption'	] . '"'
		. ',      deduct_cone ="' . $my_customer ['deduct_cone'		] . '"'
		. ',     payment_type ="' . $my_customer ['payment_type'	] . '"'
		. ',         payments ="' . $my_customer ['payments'		] . '"'
		. ',          remarks ="' . $my_quotation['remarks'			] . '"'
		;
	if ($my_quotation['salesman_id'		])	$sql .= ',      salesman_id='  . $my_quotation['salesman_id'	];
	if ($my_quotation['customer_id'		])	$sql .= ',      customer_id='  . $my_quotation['customer_id'	];
	if ($my_quotation['contact_id'		])	$sql .=	',       contact_id='  . $my_quotation['contact_id'		];
	if ($my_quotation['needed_at'		])	$sql .=	',      needed_date="' . $my_quotation['needed_at'		] . '"';
	if ($my_customer ['interest_rate'	])	$sql .=	',    interest_rate='  . $my_customer ['interest_rate'	];
log_sql('Sales', 'INSERT', $sql);
	$db->query($sql);
	insert_changes($db, 'Sales', $my_sale_id);

	$my_sale_sold_weight	= 0;
	$my_sale_sold_amount	= 0;
	$my_sale_sold_discount	= 0;

	$sql= 'SELECT *'
		. '  FROM QuotLines'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_lines = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_lines as $my_line) {
		$my_sale_line_id = get_next_id('SaleLines');
		$sql= 'INSERT SaleLines'
			. '   SET          id ='  . $my_sale_line_id
			. ',       updated_by ='  . get_session('user_id')
			. ',       updated_at ="' . get_time() . '"'
			. ',        parent_id ='  . $my_sale_id
			. ',             peso ='  . $my_line['peso'			]
			. ',      sold_pieces ='  . $my_line['quoted_pieces']
//			. ',      sold_weight ='  . $my_line['quoted_weight']
//			. ',     quoted_units ='  . $my_line['quoted_units'	]
//			. ',            units ='  . $my_line['units'		]
			. ',         discount ="' . $my_line['discount'		] . '"'
			. ',		  remarks ="' . $my_line['remarks'		] . '"'
			;
		if ($my_line['product_id'])	$sql .= ',       product_id='  . $my_line['product_id'];
		if ($my_line['machine_id'])	$sql .= ',       machine_id='  . $my_line['machine_id'];
log_sql('SaleLines', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleLines', $my_sale_line_id);

		$my_line_sold_weight	= 0;
		$my_line_sold_amount	= 0;
		$my_line_sold_discount	= 0;

		$my_cone_weight = 0;
		if ($my_customer['deduct_cone'] === 'Yes') {
			$my_product_type = get_table_value('Products', 'product_type', $my_line['product_id']); 
				 if ($my_product_type === 'Tubular')		$my_cone_weight = $my_cone_tubular;
			else if ($my_product_type === 'Ramado' )		$my_cone_weight = $my_cone_ramado ;
		}

		$sql= 'SELECT *'
			. '  FROM QuotColors'
			. ' WHERE parent_id = ' . $my_line['id']
			;
		$my_colors = $db->fetchAll($sql);

		foreach($my_colors as $my_color) {
			if ($my_line['units'] == 0) {
				$my_sold_weight =			  $my_color['quoted_units'];
				$my_sold_pieces = ceil((float)$my_color['quoted_units'] / (float)$my_line['peso' ]);
			}else{
				$my_sold_weight =	   (float)$my_color['quoted_units'] * (float)$my_line['peso' ] ;
				$my_sold_pieces = ceil((float)$my_color['quoted_units'] / (float)$my_line['units']);
			}

			$my_sold_price	= $my_color['quoted_price'];
			$my_net_weight	= $my_sold_weight - ($my_sold_pieces * $my_cone_weight);
			$my_sold_amount = $my_net_weight * $my_sold_price;
			
			$my_sold_discount = 0;
			$my_color_discount = $my_color['discount'];
			if ($my_color_discount === '')		{$my_color_discount = $my_line['discount'];}
			if ($my_color_discount !== '') {
				$my_discount_price = 0;
				$my_length = strlen($my_color_discount);
				if (substr($my_color_discount, $my_length-1, 1) === '%') {
					$my_color_discount = (float)$my_color_discount;
					if (!is_nan($my_color_discount)) {
						$my_discount_price = $my_sold_price * $my_color_discount / 100;
					}
				}else{
					$my_color_discount = (float)$my_color_discount;
					if (!is_nan($my_color_discount)) {
						$my_discount_price = (float) $my_color_discount;
					}
				};
				$my_sold_discount = $my_net_weight * $my_discount_price;
			}

			$my_sale_sold_weight	+= $my_sold_weight	;
			$my_sale_sold_amount	+= $my_sold_amount	;
			$my_sale_sold_discount	+= $my_sold_discount;

			$my_line_sold_weight	+= $my_sold_weight	;
			$my_line_sold_amount	+= $my_sold_amount	;
			$my_line_sold_discount	+= $my_sold_discount;

			$my_sale_color_id = get_next_id('SaleColors');
			$sql= 'INSERT SaleColors'
				. '   SET          id ='  . $my_sale_color_id
				. ',       updated_by ='  . get_session('user_id')
				. ',       updated_at ="' . get_time() . '"'
				. ',        parent_id ='  . $my_sale_line_id
				. ',       color_type ="' . $my_color['color_type'	] . '"'
				. ',       sold_price ='  . $my_sold_price
				. ',      sold_pieces = ' . $my_sold_pieces
				. ',      sold_weight = ' . $my_sold_weight
				. ',      sold_amount = ' . $my_sold_amount
				. ',    sold_discount = ' . $my_sold_discount
				. ',         discount ="' . $my_color['discount'	] . '"'
				;
			if ($my_color['dyer_id'	])		$sql .= ',  dyer_id='  . $my_color['dyer_id'	];
			if ($my_color['color_id'])		$sql .= ', color_id='  . $my_color['color_id'	];
log_sql('SaleColors', 'INSERT', $sql);
			$db->query($sql);
			insert_changes($db, 'SaleColors', $my_sale_color_id);
		}

		$sql= 'UPDATE SaleLines'
			. '   SET sold_weight	= ' . $my_line_sold_weight
			. '     , sold_amount	= ' . $my_line_sold_amount
			. '     , sold_discount	= ' . $my_line_sold_discount
			. ' WHERE id = '. $my_sale_line_id
			;
log_sql('SaleLines', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleLines', $my_sale_line_id);
		
 		$my_count++;
 	}

	$sql= 'UPDATE Sales'
		. '   SET sold_weight	= ' . $my_sale_sold_weight
		. '		, sold_amount	= ' . $my_sale_sold_amount
		. '     , sold_discount	= ' . $my_sale_sold_discount
		. ' WHERE id = ' . $my_sale_id
		;
log_sql('Sales', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Sales', $my_sale_id);

	$sql= 'UPDATE Quotations'
		. '   SET status = "Closed"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Quotations', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Quotations', $the_id);

	return $my_count;
}
