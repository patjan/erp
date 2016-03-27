<?
/**
 *	generate SaleOut from Sales Orders
 *
 * @param	int		sales_id
 * @return	int		count of SaleOuts generated
 */
function JKY_generate_saleout($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM Sales'
		. ' WHERE id = ' . $the_id
		;
	$my_sale = $db->fetchRow($sql);

	$sql= 'SELECT SaleColors.*'
		. '     , SaleLines.product_id'
		. '  FROM SaleColors'
		. '  LEFT JOIN SaleLines ON SaleLines.id = SaleColors.parent_id'
		. ' WHERE SaleLines.parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);
/*
	$my_saleout_id = get_next_id('SaleOuts');
	$sql= 'INSERT SaleOuts'
		. '   SET          id ='  . $my_saleout_id
		. ',       updated_by ='  . get_session('user_id')
		. ',       updated_at ="' . get_time() . '"'
		. ',           number ='  . $my_saleout_id
//		. ',     requested_at ="' . $my_needed_at . '"'
		. ',     requested_at ="' . get_time() . '"'
		. ', requested_weight ='  . $my_sale['ordered_weight']
		;
	if( $my_sale['machine_id']) {
		$sql .= ', machine_id='  . $my_sale['machine_id'];
	}
	if( $my_sale['partner_id']) {
		$sql .= ', partner_id='  . $my_sale['partner_id'];
	}

log_sql('SaleOuts', 'INSERT', $sql);
	$db->query($sql);
	insert_changes($db, 'SaleOuts', $my_saleout_id);
*/
	$my_count = 0;
	foreach($my_rows as $my_row) {
//		$my_ord_thread_id	= $my_row['id'];
//		$my_batch = db_get_row('Batches', 'id=' . $my_row['batchin_id']);
//		$my_saleed_weight = $my_row['ordered_weight'];
//		$my_saleed_boxes  = ceil((float)$my_saleed_weight / (float)$my_batch['average_weight']);
		$my_saleout_id = get_next_id('SaleOuts');
		$sql= 'INSERT SaleOuts'
			. '   SET          id ='  . $my_saleout_id
			. ',       updated_by ='  . get_session('user_id')
			. ',       updated_at ="' . get_time() . '"'
			. ',          sale_id ='  . $the_id
			. ',     salecolor_id ='  . $my_row['id']
			. ',       product_id ='  . $my_row['product_id']
			. ',         color_id ='  . $my_row['color_id']
			. ',     requested_at ="' . get_time() . '"'
			. ', requested_pieces ='  . $my_row['sold_pieces']
			. ', requested_weight ='  . $my_row['sold_weight']
			;
log_sql('SaleOuts', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'SaleOuts', $my_saleout_id);

		$my_count++;
	}

	$sql= 'UPDATE Sales'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('Sales', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'Sales', $the_id);

	return $my_count;
}
