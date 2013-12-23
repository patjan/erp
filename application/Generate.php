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
		case 'CheckOut'		: $count = JKY_generate_checkout($id); break;
		case 'Order'		: $count = JKY_generate_order	($id); break;
		case 'Purchase'		: $count = JKY_generate_purchase($id); break;
		case 'TDyer'		: $count = JKY_generate_tdyer	($id); break;
	}

	$return = array();
	if ($count > 0) {
		$return[ 'status' ] = 'ok';
		$return[ 'count'  ] = $count;
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = 'records generated: ' . $count;
	}
	return $return;
}

/**
 *	generate CheckOut from Planning Orders
 *
 * @param	int		order_id
 * @return	int		count of CheckOuts generated
 */
function JKY_generate_checkout($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM Orders'
		. ' WHERE id = ' . $the_id
		;
	$my_order = $db->fetchRow($sql);

	$sql= 'SELECT *'
		. '  FROM OrdThreads'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_needed_at = $my_order['needed_at'];
	if ($my_needed_at == null) {
		$my_needed_at = get_time();
	}

	$my_checkout_id = get_next_id('CheckOuts');
	$sql= 'INSERT CheckOuts'
		. '   SET          id='  . $my_checkout_id
		. ',       updated_by='  . get_session('user_id')
		. ',       updated_at="' . get_time() . '"'
		. ',           number='  . $my_checkout_id
		. ',     requested_at="' . $my_needed_at . '"'
		. ', requested_weight='  . $my_order['ordered_weight']
		;
	if( $my_order['machine_id']) {
		$sql .= ', machine_id='  . $my_order['machine_id'];
	}
	if( $my_order['partner_id']) {
		$sql .= ', partner_id='  . $my_order['partner_id'];
	}

log_sql('CheckOuts', 'INSERT', $sql);
	$db->query($sql);
	insert_changes($db, 'CheckOuts', $my_checkout_id);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$my_ord_thread_id	= $my_row['id'];
		$my_batch = db_get_row('Batches', 'id=' . $my_row['batchin_id']);
		$my_ordered_weight = $my_row['ordered_weight'];
		$my_ordered_boxes  = ceil((float)$my_ordered_weight / (float)$my_batch['average_weight']);
		$my_batchout_id = get_next_id('BatchOuts');
		$sql= 'INSERT BatchOuts'
			. '   SET          id='  . $my_batchout_id
			. ',      checkout_id='  . $my_checkout_id
			. ',        thread_id='  . $my_row['thread_id']
			. ',       batchin_id='  . $my_row['batchin_id']
			. ',  order_thread_id='  . $my_ord_thread_id
			. ',            batch="' . $my_batch['batch'] . '"'
			. ',       unit_price='  . $my_batch['unit_price']
			. ',   average_weight='  . $my_batch['average_weight']
			. ', requested_weight='  . $my_ordered_weight
			. ',  requested_boxes='  . $my_ordered_boxes
			;
log_sql('BatchOuts', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'BatchOuts', $my_batchout_id);

		$sql= 'UPDATE OrdThreads'
			. '   SET batchout_id = ' . $my_batchout_id
			. ' WHERE id = ' . $my_ord_thread_id
			;
log_sql('OrdThreads', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'OrdThreads', $my_ord_thread_id);

		$my_count++;
	}

	$sql= 'UPDATE Orders'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Orders', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Orders', $the_id);

	return $my_count;
}

/**
 *	generate Order from Sales Quotations
 *
 * @param	int		quotation_id
 * @return	int		count of Orders generated
 */
function JKY_generate_order($the_id) {
	$db = Zend_Registry::get('db');

	function generate_sub_order($the_db, $the_quotation, $the_quot_line_id, $the_needed_at, $the_quoted_pieces, $the_quoted_weight, $the_product_id, $the_product_percent, $the_product_units) {
		$my_order_id = null;
		if ($the_product_id && ($the_product_percent > 0 || $the_product_units > 0)) {
			$my_order_id = get_next_id('Orders');
			$sql= 'INSERT Orders'
				. '   SET          id='  . $my_order_id
				. ',       updated_by='  . get_session('user_id')
				. ',       updated_at="' . get_now() . '"'
				. ',     order_number="' . $my_order_id . '"'
				. ',      customer_id='  . $the_quotation['customer_id']
				. ',       machine_id='  . $the_quotation['machine_id']
				. ',     quot_line_id='  . $the_quot_line_id
				. ', quotation_number="' . $the_quotation['quotation_number'] . '"'
				. ',       product_id='  . $the_product_id
				. ',       ordered_at="' . $the_quotation['quoted_at'] . '"'
				. ',        needed_at="' . $the_needed_at . '"'
				. ',    quoted_pieces='  . $the_quoted_pieces
				. ',   ordered_pieces='  . $the_quoted_pieces
				. ',    quoted_weight='  . $the_quoted_weight * $the_product_percent / 100
				. ',     quoted_units='  . $the_product_units
				;
log_sql('Orders', 'INSERT', $sql);
			$the_db->query($sql);
			insert_changes($the_db, 'Orders', $my_order_id);
		}
		return $my_order_id;
	}

	$sql= 'SELECT *'
		. '  FROM Quotations'
		. ' WHERE id = ' . $the_id
		;
	$my_quotation = $db->fetchRow($sql);

	$my_needed_at = $my_quotation['needed_at'];
	if ($my_needed_at == null) {
		$my_needed_at = get_time();
	}

	$sql= 'SELECT *'
		. '  FROM QuotLines'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$my_quot_line_id	= $my_row['id'];
		$my_quoted_pieces	= (float)$my_row['quoted_pieces'];
		$my_quoted_weight	= $my_quoted_pieces * (float)$my_quotation['peso'];

		$my_order_id = generate_sub_order($db, $my_quotation, $my_quot_line_id, $my_needed_at, $my_quoted_pieces, $my_quoted_weight, $my_row['product_id'], 100, 0);
		$sql= 'UPDATE QuotLines'
			. '   SET order_id = ' . $my_order_id
			. ' WHERE id = ' . $my_quot_line_id
			;
log_sql('QuotLines', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'QuotLines', $my_quot_line_id);

		$my_count++;

		$my_my_order_id = generate_sub_order($db, $my_quotation, $my_quot_line_id, $my_needed_at, $my_quoted_pieces, $my_quoted_weight, $my_quotation['punho_id'], $my_quotation['punho_percent'], $my_quotation['punho_units']);
		$my_my_order_id = generate_sub_order($db, $my_quotation, $my_quot_line_id, $my_needed_at, $my_quoted_pieces, $my_quoted_weight, $my_quotation[ 'gola_id'], $my_quotation[ 'gola_percent'], $my_quotation[ 'gola_units']);
		$my_my_order_id = generate_sub_order($db, $my_quotation, $my_quot_line_id, $my_needed_at, $my_quoted_pieces, $my_quoted_weight, $my_quotation['galao_id'], $my_quotation['galao_percent'], $my_quotation['galao_units']);
	}

	$sql= 'UPDATE Quotations'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Quotations', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Quotations', $the_id);

	return $my_count;
}

function JKY_generate_purchase($the_id) {
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
		$my_incoming_id = get_next_id('Incomings');
		$sql= 'INSERT Incomings'
			. '   SET         id =  ' . $my_incoming_id
			. ', incoming_number =  ' . $my_incoming_id
			. ',     supplier_id =  ' . $my_purchase['supplier_id']
			. ',    invoice_date = "' . $my_row['expected_date'] . '"'
			. ',  invoice_weight =  ' . $my_row['expected_weight']
			;
log_sql('Incomings', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'Incomings', $my_incoming_id);

		$my_batchin_id = get_next_id('Batches');
		$sql= 'INSERT Batches'
			. '   SET          id =  ' . $my_batchin_id
			. ',      incoming_id =  ' . $my_incoming_id
			. ',        thread_id =  ' . $my_row['thread_id']
			. ', purchase_line_id =  ' . $my_row['id']
			;
log_sql('Batches', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'Batches', $my_batchin_id);

		$sql= 'UPDATE PurchaseLines'
			. '   SET batch_id =  ' . $my_batchin_id
			. ' WHERE id = ' . $my_row['id']
			;
log_sql('PurchaseLines', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'PurchaseLines', $my_row['id']);

		$my_count++;
	}

	$sql= 'UPDATE Purchases'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Purchases', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Purchases', $the_id);

	return $my_count;
}

function JKY_generate_tdyer($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM TDyers'
		. ' WHERE id = ' . $the_id
		;
	$my_tdyer = $db->fetchRow($sql);

	$my_needed_date = $my_tdyer['needed_at'];
	if ($my_needed_date == null) {
		$my_needed_date = get_time();
	}

	$my_checkout_id = get_next_id('CheckOuts');
	$sql= 'INSERT CheckOuts'
		. '   SET          id='  . $my_checkout_id
		. ',       updated_by='  . get_session('user_id')
		. ',       updated_at="' . get_time() . '"'
		. ',           number='  . $my_checkout_id
		. ',          dyer_id='  . $my_tdyer['dyer_id']
		. ',     requested_at="' . $my_needed_date . '"'
		. ', requested_weight='  . $my_tdyer['ordered_weight']
		;
log_sql('CheckOuts', 'INSERT', $sql);
	$db->query($sql);
	insert_changes($db, 'CheckOuts', $my_checkout_id);

	$sql= 'SELECT *'
		. '  FROM TDyerThreads'
		. ' WHERE parent_id=' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$my_batch = db_get_row('Batches', 'id=' . $my_row['batchin_id']);
		$my_ordered_weight = db_get_sum('TDyerColors', 'ordered_weight', 'parent_id=' . $my_row['id']);
		$my_ordered_boxes  = ceil((float)$my_ordered_weight / (float)$my_batch['average_weight']);
		$my_batchout_id = get_next_id('BatchOuts');
		$sql= 'INSERT BatchOuts'
			. '   SET          id='  . $my_batchout_id
			. ',      checkout_id='  . $my_checkout_id
			. ',        thread_id='  . $my_row['thread_id']
			. ',       batchin_id='  . $my_row['batchin_id']
//			. ',      req_line_id='  . $my_row['id']
			. ',  tdyer_thread_id='  . $my_row['id']
//			. ',             code="' . '' . '"'
			. ',            batch="' . $my_batch['batch'] . '"'
			. ',       unit_price='  . $my_batch['unit_price']
			. ',   average_weight='  . $my_batch['average_weight']
			. ', requested_weight='  . $my_ordered_weight
			. ',  requested_boxes='  . $my_ordered_boxes
			;
log_sql('BatchOuts', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'BatchOuts', $my_batchout_id);

		$sql= 'UPDATE TDyerThreads'
			. '   SET batchout_id = ' . $my_batchout_id
			. ' WHERE id = ' . $my_row['id']
			;
log_sql('TDyerThreads', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'TDyerThreads', $my_row['id']);

		$my_count++;
	}

	$sql= 'UPDATE TDyers'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('TDyers', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'TDyers', $the_id);

	return $my_count;
}

