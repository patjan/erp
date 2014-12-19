<?
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
			$my_order_id	= get_next_id('Orders');
			$my_customer_id	= $the_quotation['customer_id'] == null ? 'null' : $the_quotation['customer_id'];
			$my_machine_id	= $the_quotation['machine_id' ] == null ? 'null' : $the_quotation['machine_id' ];
			$sql= 'INSERT Orders'
				. '   SET          id='  . $my_order_id
				. ',       updated_by='  . get_session('user_id')
				. ',       updated_at="' . get_now() . '"'
				. ',     order_number="' . $my_order_id . '"'
				. ',      customer_id='  . $my_customer_id
				. ',       machine_id='  . $my_machine_id
				. ',     quot_line_id='  . $the_quot_line_id
				. ', quotation_number="' . $the_quotation['quotation_number'] . '"'
				. ',       product_id='  . $the_product_id
				. ',       ordered_at="' . $the_quotation['quoted_at'] . '"'
				. ',        needed_at="' . $the_needed_at . '"'
				. ',    quoted_pieces='  . $the_quoted_pieces
				. ',   ordered_pieces='  . $the_quoted_pieces
				. ',    quoted_weight='  . $the_quoted_weight * $the_product_units
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
		$my_quoted_weight	= $my_quoted_pieces * (float)$my_row['peso'];

		$my_order_id = generate_sub_order($db, $my_quotation, $my_quot_line_id, $my_needed_at, $my_quoted_pieces, $my_quoted_weight, $my_row['product_id'], 1, $my_row['units']);
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
