<?

/**
 *	$.ajax({ method: shipout, table: x...x, id: x...x });
 *
 *	return: [ status, message ]
 */
function JKY_shipout($data) {
	$table = get_data($data, 'table');

	$message = '';
	switch($table) {
		case 'Fabrics'		: $message = JKY_shipout_fabric($data); break;
	}

	$return = array();
	if ($message == '') {
		$return['status'  ] = 'ok';
		$return['message' ] = 'record checked out';
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = $message;
	}
	return $return;
}

/**
 *	shipout Fabric from Fabrics Check Out
 *
 *	$.ajax({ method:'shipout', table:'Fabrics', barcode:9...9, ...};
 *
 * @return	string	''
 */
function JKY_shipout_fabric($the_data) {
	$db = Zend_Registry::get('db');
	$my_barcode = get_data($the_data, 'barcode');

	$sql= 'UPDATE Fabrics'
		. '   SET ' . get_updated()
		. ',     status="Ship Out"'
		. ', shipout_by= ' . get_session('user_id')
		. ', shipout_at="' . get_time() . '"'
		. ' WHERE id =' . $my_barcode
		;
	log_sql('Fabrics', 'update', $sql);
	$db->query($sql);
	insert_changes($db, 'Fabrics', $my_barcode);

	return '';
}
