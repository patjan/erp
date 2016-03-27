<?

/**
 *	$.ajax({ method: return, table: x...x, id: x...x });
 *
 *	return: [ status, message ]
 */
function JKY_return($data) {
	$table = get_data($data, 'table');

	$message = '';
	switch($table) {
		case 'Boxes'		: $message = JKY_return_box		($data); break;
		case 'Fabrics'		: $message = JKY_return_fabric	($data); break;
		case 'Pieces'		: $message = JKY_return_piece	($data); break;
	}

	$return = array();
	if ($message == '') {
		$return['status'  ] = 'ok';
		$return['message' ] = 'record returned';
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = $message;
	}
	return $return;
}

/**
 *	return Box from Boxes Return
 * 
 *	$.ajax({ method:'return', table:'Boxes', barcode:9...9};
 *
 * @return	string	''
 */
function JKY_return_box($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode			= get_data($the_data, 'barcode'			);
	$my_number_of_cones	= get_data($the_data, 'number_of_cones'	);
	$my_real_weight		= get_data($the_data, 'real_weight'		);

	$sql= 'UPDATE Boxes'
		. '   SET ' . get_updated()
		. ',           status="Return"'
		. ',      returned_by='  . get_session('user_id')
		. ',      returned_at="' . get_time() . '"'
		. ', number_of_cones ='  . $my_number_of_cones
		. ',     real_weight ='  . $my_real_weight
		. ' WHERE id=' . $my_barcode
		;
	log_sql('Boxes', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Boxes', $my_barcode);

	$my_box = db_get_row('Boxes', 'id=' . $my_barcode);
	$my_average_weight	= $my_box['average_weight'	];
	$my_real_weight		= $my_box['real_weight'		];
	$my_weight			= $my_real_weight == 0 ? $my_average_weight : $my_real_weight;

	$sql= 'UPDATE Batches'
		. '   SET returned_boxes  = returned_boxes  + 1'
		. '     , returned_weight = returned_weight + ' . $my_weight
		. ' WHERE id = ' . $my_box['batch_id']
		;
	log_sql('Batches', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Batches', $my_box['batch_id']);

	return '';
}

/**
 *	return Fabric from Fabrics Return
 *
 *	$.ajax({ method:'return', table:'Fabrics', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_return_fabric($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode		= get_data($the_data, 'barcode'		);
//	$my_weight		= get_data($the_data, 'weight'		);
//	$my_saleout_id	= get_data($the_data, 'saleout_id'	);
//	$my_salecolor_id= get_data($the_data, 'salecolor_id');
//	$my_sale_id		= get_data($the_data, 'sale_id'		);

	$sql= 'SELECT Fabrics.*, SaleOuts.sale_id, SaleColors.parent_id AS saleline_id, SaleOuts.salecolor_id'
		. '  FROM Fabrics'
		. '  LEFT JOIN SaleOuts   ON SaleOuts.id   =    Fabrics.saleout_id'
		. '  LEFT JOIN SaleColors ON SaleColors.id =   SaleOuts.salecolor_id'
		. ' WHERE Fabrics.barcode = ' . $my_barcode
		;
	log_sql('Fabrics', 'select', $sql);
	$my_fabric		= $db->fetchRow($sql);
	$my_sale_id		= $my_fabric['sale_id'			];
	$my_saleout_id	= $my_fabric['saleout_id'		];
	$my_saleline_id = $my_fabric['saleline_id'		];
	$my_salecolor_id= $my_fabric['salecolor_id'		];
	$my_product_id	= $my_fabric['product_id'		];
	$my_weight		= $my_fabric['checkout_weight'	];

	$sql= 'UPDATE Fabrics'
		. '   SET ' . get_updated()
		. ',            status="Return"'
		. ',       returned_by= ' . get_session('user_id')
		. ',       returned_at="' . get_time() . '"'
//		. ',   checkout_weight= ' . $my_weight
//		. ',        saleout_id= ' . $my_saleout_id
		. ' WHERE id =' . $my_barcode
		;
	log_sql('Fabrics', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Fabrics', $my_barcode);

	if ($my_sale_id) {
		$sql= 'UPDATE SaleOuts'
			. '   SET checkout_pieces = checkout_pieces - 1'
			. '     , checkout_weight = checkout_weight - ' . $my_weight
			. ' WHERE id = ' . $my_saleout_id
			;
		log_sql('SaleOuts', 'update', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleOuts', $my_saleout_id);

		$my_sold_price = get_table_value('SaleColors', 'sold_price', $my_salecolor_id);

//		calculate net weight
		$my_cone_weight = 0;
		$my_deduct_cone = get_table_value('Sales', 'deduct_cone', $my_sale_id); 
		if ($my_deduct_cone == 'Yes') {
//			$my_product_id	= get_table_value ('Fabrics' , 'product_id'  , $my_barcode	 );
			$my_product_type= get_table_value ('Products', 'product_type', $my_product_id);
			$my_config_value= get_config_value('Cone Types', $my_product_type);
			 if ($my_config_value) {
				$my_cone_weight = $my_config_value / 1000;
			}
		}
		$my_net_weight = $my_weight - $my_cone_weight;

//		calculate discount price
		$my_discount_price = 0;	
		$my_color_discount = trim(get_table_value('SaleColors', 'discount', $my_salecolor_id));
		if ($my_color_discount == '') {
			$my_color_discount = trim(get_table_value('SaleLines', 'discount', $my_saleline_id));
		}
		if ($my_color_discount != '') {
			$my_length = strlen($my_color_discount);
			if (substr($my_color_discount, $my_length-1, 1) == '%') {
				$my_color_discount = (float)$my_color_discount;
				$my_discount_price = $my_sold_price * $my_color_discount / 100;
			}else{
				$my_discount_price = (float)$my_color_discount;
			};
		}

		$my_amount	= $my_net_weight * $my_sold_price;
		$my_discount= $my_net_weight * $my_discount_price;

		$sql= 'UPDATE SaleColors'
			. '   SET checkout_pieces	= checkout_pieces	- 1'
			. '     , checkout_weight	= checkout_weight	- ' . $my_weight
			. '     , checkout_amount	= checkout_amount	- ' . $my_amount
			. '     , checkout_discount	= checkout_discount	- ' . $my_discount
			. ' WHERE id = ' . $my_salecolor_id
			;
		log_sql('SaleColors', 'update', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleColors', $my_salecolor_id);

		$sql= 'UPDATE SaleLines'
			. '   SET checkout_pieces	= checkout_pieces	- 1'
			. '     , checkout_weight	= checkout_weight	- ' . $my_weight
			. '     , checkout_amount	= checkout_amount	- ' . $my_amount
			. '     , checkout_discount	= checkout_discount	- ' . $my_discount
			. ' WHERE id = ' . $my_saleline_id
			;
		log_sql('SaleLines', 'update', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleLines', $my_salecolor_id);

		$sql= 'UPDATE Sales'
			. '   SET checkout_pieces	= checkout_pieces	- 1'
			. '     , checkout_weight	= checkout_weight	- ' . $my_weight
			. '     , checkout_amount	= checkout_amount	- ' . $my_amount
			. '     , checkout_discount	= checkout_discount	- ' . $my_discount
			. ' WHERE id = ' . $my_sale_id
			;
		log_sql('Sales', 'update', $sql);
		$db->query($sql);
		insert_changes($db, 'Sales', $my_sale_id);
	}
	
	return '';
}

/**
 *	return Piece from Pieces Return
 * 
 *	$.ajax({ method:'return', table:'Pieces', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_return_piece($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode			= get_data($the_data, 'barcode'			);
	$my_inspected_by	= get_data($the_data, 'inspected_by'	);
	$my_weighed_by		= get_data($the_data, 'weighed_by'		);
	$my_remarks			= get_data($the_data, 'remarks'			);
	$my_checkin_weight	= get_data($the_data, 'checkin_weight'	);
	$my_checkin_location= get_data($the_data, 'checkin_location');

	$sql= 'UPDATE Pieces'
		. '   SET ' . get_updated()
		. ',           status="Check In"'
//		. ',          barcode=\'' . $my_barcode			. '\''
		. ',     inspected_by=  ' . $my_inspected_by
		. ',       weighed_by=  ' . $my_weighed_by
		. ',          remarks=\'' . $my_remarks			. '\''
		. ',   checkin_weight=  ' . $my_checkin_weight
		. ', checkin_location=\'' . $my_checkin_location. '\''
		. ',       checkin_at=\'' . get_time()			. '\''
		. ' WHERE id =' . $my_barcode
		;
	log_sql('Pieces', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Pieces', $my_barcode);

	$my_order_id = get_table_value('Pieces', 'order_id', $my_barcode);
	$my_set = ', produced_at=\'' . get_time() . '\''
			. ', produced_pieces = produced_pieces + 1'
			;
	if ($my_remarks != 'boa') {
		$my_set = ', rejected_pieces = rejected_pieces + 1';
	}
	$my_field_name	= $my_remarks == 'boa' ? 'produced_pieces' : 'rejected_pieces';
	$sql= 'UPDATE Orders'
		. '   SET ' . get_updated() . $my_set
		. ' WHERE id = ' . $my_order_id
	     ;
	log_sql('Orders', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Orders', $my_order_id);

	return '';
}

