<?
/**
 *	generate Order from OSAs
 *
 * @param	int		quotation_id
 * @return	int		count of Orders generated
 */
function JKY_generate_order($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM OSAs'
		. ' WHERE id = ' . $the_id
		;
	$my_osa = $db->fetchRow($sql);

	$sql= 'SELECT *'
		. '  FROM OSA_Lines'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$my_osa_line_id	= $my_row['id'];
/*
		$sql= 'SELECT *'
			. '  FROM Orders'
			. ' WHERE osa_line_id = ' . $my_row['id']
			;
		$my_orders = $db->fetchAll($sql);

		foreach($my_orders as $my_order) {
			$sql= 'UPDATE Orders'
				. '   SET status = "Active"'
				. ' WHERE id = ' . $my_order['id']
				;
log_sql('Orders', 'UPDATE', $sql);
			$db->query($sql);
			insert_changes($db, 'Orders', $my_order['id']);
		}
*/
		$sql= 'UPDATE OSA_lines'
			. '   SET status = "Active"'
			. ' WHERE id = ' . $my_row['id']
			;
log_sql('OSA_Lines', 'UPDATE', $sql);
		$db->query($sql);
		insert_changes($db, 'OSA_Lines', $my_row['id']);

		$my_count++;
	}

	$sql= 'UPDATE OSAs'
		. '   SET status = "Active"'
		. ' WHERE id = ' . $the_id
		;
log_sql('OSAs', 'UPDATE', $sql);
	$db->query($sql);
	insert_changes($db, 'OSAs', $the_id);

	return $my_count;
}
