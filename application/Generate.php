<?

/**
 *	$.ajax({ method: generate, table: x...x, id: x...x });
 *
 *	return: [ x...x, ..., x...x ]
 */
function JKY_generate($data) {
	$table	= get_data($data, 'table'	);
	$id		= get_data($data, 'id'		);

	$count = 0;
	switch($table) {
		case 'Purchases'	: $count = JKY_generate_purchases($id); break;
	}

	$return = array();
	if ($count > 0) {
		$return[ 'status' ] = 'ok';
		$return[ 'count'  ] = $count;
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = 'Labels printed: ' . $count;
	}
	return $return;
}

function JKY_generate_purchases($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM Purchases'
		. ' WHERE id = ' . $the_id
		;
	$my_purchase = $db->fetchRow($sql);

	$sql= 'SELECT *'
		. '  FROM PurchaseLines'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$sql= 'INSERT Incomings'
			. '   SET incoming_number =  ' . get_next_number('Controls', 'Next Incoming Number')
			. '     ,     supplier_id =  ' . $my_purchase['supplier_id']
			. '     ,    invoice_date = "' . $my_row['expected_date'] . '"'
			. '     ,  invoice_weight =  ' . $my_row['expected_weight']
			;
log_sql('Incomings', 'INSERT', $sql);
		$db->query($sql);
		$my_incoming_id = $db->lastInsertId();

		$sql= 'INSERT Batches'
			. '   SET      incoming_id =  ' . $my_incoming_id
			. '     ,        thread_id =  ' . $my_row['thread_id']
			. '     , purchase_line_id =  ' . $my_row['id']
			;
log_sql('Batches', 'INSERT', $sql);
		$db->query($sql);
		$my_batchin_id = $db->lastInsertId();

		$sql= 'UPDATE PurchaseLines'
			. '   SET batch_id =  ' . $my_batchin_id
			. ' WHERE id = ' . $my_row['id']
			;
log_sql('PurchaseLines', 'UPDATE', $sql);
		$db->query($sql);

		$my_count++;
	}

	$sql= 'UPDATE Purchases'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Purchases', 'UPDATE', $sql);
	$db->query($sql);

	return $my_count;
}

