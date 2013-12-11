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
		. ',     status="Check In"'
		. ', checkin_by='  . get_session('user_id')
		. ', checkin_at="' . get_time() . '"'
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
 *	checkin Piece from Pieces Check In
 * 
 *	$.ajax({ method:'checkin', table:'Pieces', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_checkin_piece($the_data) {
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
//	if (lowercase($my_remarks) == 'boa') {
	if ($my_remarks == 'boa') {
		$my_set = ', produced_at=\'' . get_time() . '\''
				. ', produced_pieces = produced_pieces + 1'
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

