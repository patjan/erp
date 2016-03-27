<?

/**
 *	$.ajax({ method: checkin, table: x...x, id: x...x });
 *
 *	return: [ status, message ]
 */
function JKY_checkin($data) {
	$table = get_data($data, 'table');

	$message = '';
	switch($table) {
		case 'Boxes'		: $message = JKY_checkin_box	($data); break;
		case 'Fabrics'		: $message = JKY_checkin_fabric	($data); break;
		case 'Pieces'		: $message = JKY_checkin_piece	($data); break;
	}

	$return = array();
	if ($message == '') {
		$return['status'  ] = 'ok';
		$return['message' ] = 'record checked in';
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = $message;
	}
	return $return;
}

/**
 *	checkin Box from Boxes Check In
 *
 *	$.ajax({ method:'checkin', table:'Boxes', barcode:9...9};
 *
 * @return	string	''
 */
function JKY_checkin_box($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode = get_data($the_data, 'barcode');

	$sql= 'UPDATE Boxes'
		. '   SET ' . get_updated()
		.      ', status="Check In"'
		.  ', checkin_by='  . get_session('user_id')
		.  ', checkin_at="' . get_time() . '"'
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
		. '   SET checkin_boxes  = checkin_boxes  + 1'
		. '     , checkin_weight = checkin_weight + ' . $my_weight
		. ' WHERE id = ' . $my_box['batch_id']
		;
	log_sql('Batches', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Batches', $my_box['batch_id']);

	return '';
}

/**
 *	checkin Fabric from Fabric Check In
 *
 *	$.ajax({ method:'checkin', table:'Fabrics', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_checkin_fabric($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode			= get_data($the_data, 'barcode'			);
	$my_checkin_weight	= get_data($the_data, 'checkin_weight'	);

	$my_set  = '';
	$my_set .= ', revised_by = '  . get_session('user_id');
	$my_set .= ', weighed_by = '  . get_session('user_id');
	$my_set .= isset($the_data['qualities'			]) ?        ', qualities ="' . trim($the_data['qualities'		]) . '"' : '';
	$my_set .= isset($the_data['remarks'			]) ?          ', remarks ="' . trim($the_data['remarks'			]) . '"' : '';
	$my_set .= isset($the_data['checkin_weight'		]) ?   ', checkin_weight = ' . trim($the_data['checkin_weight'	])		 : '';
	$my_set .= isset($the_data['checkin_location'	]) ? ', checkin_location ="' . trim($the_data['checkin_location']) . '"' : '';
	
	$sql= 'UPDATE Fabrics'
		. '   SET ' . get_updated()
		.       ', status="Check In"'
		.   ', checkin_at="' . get_time() . '"'
		. $my_set
		. ' WHERE id =' . $my_barcode
		;
	log_sql('Fabrics', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Fabrics', $my_barcode);
/*
	$my_fabric = db_get_row('Fabrics', 'barcode =\'' . $my_barcode . '\'');
	
	$my_order_id = $my_piece['order_id'];
	if (strtolower($my_piece['qualities']) == 'boa') {
		$my_set = ', produced_at=\'' . get_time() . '\''
				. ', produced_pieces = produced_pieces + 1'
				. ', produced_weight = produced_weight + ' . $my_checkin_weight
				;
	}else{
		$my_set = ', rejected_pieces = rejected_pieces + 1';
	}
	$sql= 'UPDATE Orders'
		. '   SET ' . get_updated() . $my_set
		. ' WHERE id = ' . $my_order_id
		;
	log_sql('Orders', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Orders', $my_order_id);
*/
	return '';
}

/**
 *	checkin Piece from Pieces Check In
 *
 *	$.ajax({ method:'checkin', table:'Pieces', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_checkin_piece($the_data) {
	$db = Zend_Registry::get('db');
	$my_weaver_date		= get_data($the_data, 'weaver_date'		);
	$my_weaver_shift	= get_data($the_data, 'weaver_shift'	);
	$my_barcode			= get_data($the_data, 'barcode'			);
	$my_checkin_weight	= get_data($the_data, 'checkin_weight'	);

	$sql= 'SELECT produced_by'
		. '  FROM Pieces'
		. ' WHERE id = ' . $my_barcode
		;
	$my_machine_name = $db->fetchOne($sql); 

	$sql= 'SELECT weaver_by'
		. '  FROM Weavers'
		. ' WHERE weaver_date  ="' . $my_weaver_date  . '"'
		. '   AND weaver_shift ="' . $my_weaver_shift . '"'
		. '   AND machine_name ="' . $my_machine_name . '"'
		;
	$my_weaver_by = $db->fetchOne($sql); 

	$my_set  = '';
	$my_set .= ', revised_by = '  . get_session('user_id');
	$my_set .= ', weighed_by = '  . get_session('user_id');
	$my_set .= isset($the_data['qualities'			]) ?        ', qualities ="' . trim($the_data['qualities'		]) . '"' : '';
	$my_set .= isset($the_data['remarks'			]) ?          ', remarks ="' . trim($the_data['remarks'			]) . '"' : '';
	$my_set .= isset($the_data['checkin_weight'		]) ?   ', checkin_weight = ' . trim($the_data['checkin_weight'	])		 : '';
	$my_set .= isset($the_data['checkin_location'	]) ? ', checkin_location ="' . trim($the_data['checkin_location']) . '"' : '';
	$my_set .= ', weaver_date  ="' . $my_weaver_date	. '"';
	$my_set .= ', weaver_shift ="' . $my_weaver_shift	. '"';
	$my_set .= ', weaver_by    ="' . $my_weaver_by		. '"';
	
	$sql= 'UPDATE Pieces'
		. '   SET ' . get_updated()
		.       ', status="Check In"'
		.   ', checkin_at="' . get_time() . '"'
		. $my_set
		. ' WHERE id =' . $my_barcode
		;
	log_sql('Pieces', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Pieces', $my_barcode);

	$my_piece = db_get_row('Pieces', 'barcode =\'' . $my_barcode . '\'');
	
	$my_order_id = $my_piece['order_id'];
	if (strtolower($my_piece['qualities']) == 'boa') {
		$my_set = ', produced_at=\'' . get_time() . '\''
				. ', produced_pieces = produced_pieces + 1'
				. ', produced_weight = produced_weight + ' . $my_checkin_weight
				;
	}else{
		$my_set = ', rejected_pieces = rejected_pieces + 1';
	}
	$sql= 'UPDATE Orders'
		. '   SET ' . get_updated() . $my_set
		. ' WHERE id = ' . $my_order_id
		;
	log_sql('Orders', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Orders', $my_order_id);

	return '';
}
