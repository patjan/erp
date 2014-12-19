<?
/**
 *	generate OSA from Quotations
 *
 * @param	int		quotation_id
 * @return	int		count of OSA Lines generated
 */
function JKY_generate_osa($the_id) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT *'
		. '  FROM Quotations'
		. ' WHERE id = ' . $the_id
		;
	$my_quotation = $db->fetchRow($sql);

	$my_needed_at = $my_quotation['needed_at'];
	if ($my_needed_at == null) {
		$my_needed_at = get_time();
	}

	$my_osa_id = get_next_id('OSAs');
	$sql= 'INSERT OSAs'
		. '   SET          id='  . $my_osa_id
		. ',       updated_by='  . get_session('user_id')
		. ',       updated_at="' . get_time() . '"'
		. ',       osa_number='  . $my_osa_id
		. ',     quotation_id='  . $the_id
		. ',      customer_id='  . $my_quotation['customer_id']
		. ',      salesman_id='  . $my_quotation['updated_by' ]
		. ',       ordered_at="' . get_time() . '"'
		. ',        needed_at="' . $my_needed_at . '"'
		. ',          remarks="' . $my_quotation['remarks'] . '"'
		;
log_sql('OSAs', 'INSERT', $sql);
	$db->query($sql);
	insert_changes($db, 'OSAs', $my_osa_id);

	$sql= 'SELECT *'
		. '  FROM QuotLines'
		. ' WHERE parent_id = ' . $the_id
		;
	$my_rows = $db->fetchAll($sql);

	$my_count = 0;
	foreach($my_rows as $my_row) {
		$my_osa_line_id = get_next_id('OSA_Lines');
		$sql= 'INSERT OSA_Lines'
			. '   SET          id='  . $my_osa_line_id
			. ',        parent_id='  . $my_osa_id
			. ',       product_id='  . $my_row['product_id'		]
			. ',             peso='  . $my_row['peso'			]
			. ',    quoted_weight='  . $my_row['quoted_weight'	]
			. ',     quoted_units='  . $my_row['quoted_units'	]
			. ',            units='  . $my_row['units'			]
			. ',    quoted_pieces='  . $my_row['quoted_pieces'	]
			. ',		  remarks="' . $my_row['remarks'		] . '"'
			;
log_sql('OSA_Lines', 'INSERT', $sql);
		$db->query($sql);
		insert_changes($db, 'OSA_Lines', $my_osa_line_id);

		$my_count++;
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
