<?

/**
 *	$.ajax({ method: print_labels, table: x...x, key: x...x });
 *
 *	return: [ x...x, ..., x...x ]
 */
function JKY_print_labels($data) {
	$table = get_data($data, 'table');

	$count = 0;
	switch($table) {
		case 'Boxes'	: $count = JKY_print_boxes		($data); break;
		case 'Fabrics'	: $count = JKY_print_fabrics	($data); break;
		case 'Pieces'	: $count = JKY_print_pieces		($data); break;
		case 'Products'	: $count = JKY_print_products	($data); break;
	}

	$return = array();
	if ($count > 0) {
		$return[ 'status' ] = 'ok';
		$return[ 'message'] = 'Labels printed: ' . $count;
	}else{
		$return[ 'status' ] = 'error';
		$return[ 'message'] = 'Labels printed: ' . $count;
	}
	return $return;
}

function JKY_print_boxes($data) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT Boxes.*'
		. '     , Batches.batch AS batch_code'
		. '     , Threads.composition, Threads.name AS thread_name'
		. '     , Incomings.nfe_dl, Incomings.nfe_tm'
		. '     , Contacts.nick_name AS supplier_name'
		. '  FROM Boxes'
		. '  LEFT JOIN Batches		ON Batches.id   = Boxes.batch_id'
		. '  LEFT JOIN Threads		ON Threads.id   = Batches.thread_id'
		. '  LEFT JOIN Incomings	ON Incomings.id = Batches.incoming_id'
		. '  LEFT JOIN Contacts		ON Contacts.id  = Incomings.supplier_id'
		. ' WHERE Boxes.is_printed = "No"'
		. ' ORDER BY Boxes.barcode ASC'
		;
	$rows = $db->fetchAll($sql);

	$count		= 0;
	$folder		= 'boxes/';
	$ip_number	= get_config_value('System Controls', 'IP DL Printer Barcode Boxes');
	foreach($rows as $my_row) {
		$my_id				= $my_row['id'				];
		$my_average_weight	= $my_row['average_weight'	];
		$my_real_weight		= $my_row['real_weight'		];
		if ($my_real_weight == 0) {
			$my_real_weight = $my_average_weight;
		}

		$my_thread_name		= ucwords($my_row['thread_name']);
		$my_thread_name1	= ucwords($my_row['thread_name']);
		$my_thread_name2	= '';
		if (strlen($my_thread_name) > 28) {
			$i = 28;
			for(; $i>0; $i--) {
				if ($my_thread_name[$i] == ' ') {
					break;
				}
			}
			if ($i == 0) {
				$my_thread_name1 = substr($my_thread_name, 0, 28);
				$my_thread_name2 = substr($my_thread_name, 28);
			}else{
				$my_thread_name1 = substr($my_thread_name, 0, $i);
				$my_thread_name2 = substr($my_thread_name, $i+1);
			}
		}

		$labels  =		'~NORMAL';
		$labels .= NL . '~NORMAL';
		$labels .= NL . '~PIOFF';
		$labels .= NL . '~DELETE LOGO;*ALL';
		$labels .= NL . '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 6;SLEW IPS 4';
		$labels .= NL . '~CREATE;BOX;226';
		$labels .= NL . 'SCALE;DOT;203;203';
		$labels .= NL . '/PARTE FIXA';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;422;788;12;12;*FORNEC:*';
		$labels .= NL . 'INV;POINT;373;788;12;12;*COMP:*';
		$labels .= NL . 'INV;POINT;327;788;12;12;*PESO:*';
		$labels .= NL . 'INV;POINT;279;788;12;12;*CONES:*';
		$labels .= NL . 'INV;POINT;231;788;12;12;*LOTE:*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/PARTE VARIAVEL';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;527;788;16;16;*' . $my_thread_name1			  . '*';
		$labels .= NL . 'INV;POINT;482;788;16;16;*' . $my_thread_name2			  . '*';
		$labels .= NL . 'INV;POINT;422;600;22;22;*' . $my_row['supplier_name'	] . '*';
		$labels .= NL . 'INV;POINT;373;667;16;16;*' . $my_row['composition'		] . '*';
		$labels .= NL . 'INV;POINT;327;671;16;16;*' . $my_real_weight			  . ' KG*';
		$labels .= NL . 'INV;POINT;279;647;16;16;*' . $my_row['number_of_cones'	] . '*';
		$labels .= NL . 'INV;POINT;231;678;16;16;*' . $my_row['batch_code'		] . '*';
		$labels .= NL . 'INV;POINT;231;296;32;33;*' . $my_row['checkin_location'] . '*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/CODIGO DE BARRAS';
		$labels .= NL . 'BARCODE';
		$labels .= NL . 'C128C;INV;XRD7:7:14:14:21:21:28:28;H8;36;122';
		$labels .= NL . '*' . $my_row['barcode'] . '*';
		$labels .= NL . 'PDF;B';
		$labels .= NL . 'STOP';
		$labels .= NL . '/FIM DO PROGRAMA';
		$labels .= NL . 'END';
		$labels .= NL . '~EXECUTE;BOX;1';
		$labels .= NL . '~NORMAL';

		$out_name = $folder . $my_id . '.txt';
		$out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
		fwrite( $out_file, $labels );
		fwrite( $out_file, NL );
		fclose( $out_file );

		$command = 'tcp.exe ' . $ip_number . ' ' . $out_name;
		if (ENVIRONMENT == 'development') {
			log_sql('Print_Labels', 'Boxes', $command);
		}else{
//			system( '(' . $command . ' & ) > /dev/null');
//			system( '( php ' . APPLICATION . 'GenerateHtml.php & ) > /dev/null' );
			exec($command);
		}

		$sql= 'UPDATE Boxes'
			. '   SET is_printed = "Yes"'
			. ' WHERE id = ' . $my_id
			;
		$db->query($sql);

		$count++;
	}
	return $count;
}

function JKY_print_fabrics($data) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT Fabrics.*'
		. '  FROM Fabrics'
		. ' WHERE Fabrics.id IN (' . $data['ids'] . ')'
		;
	$rows  = $db->fetchAll($sql);

	$count		= 0;
	$folder		= 'fabrics/';
	$ip_number	= get_config_value('System Controls', 'IP TM Printer Barcode Fabrics');
	foreach($rows as $my_row) {
		$my_id = $my_row['id'];

		$sql= 'SELECT Pieces.id'
			. '  FROM Pieces'
			. ' WHERE Pieces.id = ' . $my_row['barcode']
			. '   AND Pieces.status != "Received"'
			;
		$my_piece_id = $db->fetchOne($sql);
		if ($my_piece_id != false) {
			$sql= 'UPDATE Pieces'
				. '   SET status = "Received"'
				. '     , received_at ="' . $my_row['updated_at'] . '"'
				. ' WHERE id = ' . $my_piece_id
				;
			$db->query($sql);
		}

		$my_product_name	= ucwords($my_row['product_name']);
		$my_product_name1	= ucwords($my_row['product_name']);
		$my_product_name2	= '';
		if (strlen($my_product_name) > 50) {
			$i = 50;
			for(; $i>0; $i--) {
				if ($my_product_name[$i] == ' ') {
					break;
				}
			}
			if ($i == 0) {
				$my_product_name1 = substr($my_product_name, 0, 50);
				$my_product_name2 = substr($my_product_name, 50);
			}else{
				$my_product_name1 = substr($my_product_name, 0, $i);
				$my_product_name2 = substr($my_product_name, $i+1);
			}
		}

		$my_product_id = $my_row['product_id'];
		if ($my_product_id == false) {
			$sql= 'SELECT Products.id'
				. '  FROM Products'
				. ' WHERE Products.product_name = "' . $my_row['product_name'] . '"'
				;
//log_sql('Print_Labels', 'Fabrics', $sql);
			$my_product_id = $db->fetchOne($sql);
		}

		$my_composition = false;
		$my_ftp_id = $my_row['ftp_id'];
		if ($my_ftp_id != false) {
			$sql= 'SELECT FTPs.composition'
				. '  FROM FTPs'
				. ' WHERE FTPS.id = ' . $my_ftp_id
				;
//log_sql('Print_Labels', 'Fabrics', $sql);
			$my_composition = $db->fetchOne($sql);
		}
/*
		if ($my_composition == false) {
			if ($my_product_id != false) {
				$sql= 'SELECT FTPs.composition'
					. '  FROM FTPs'
					. ' WHERE FTPS.product_id = ' . $my_product_id . ' AND FTPs.is_current = "Yes"'
					;
	//log_sql('Print_Labels', 'Fabrics', $sql);
				$my_composition = $db->fetchOne($sql);

				if ($my_composition == false) {
					$sql= 'SELECT Products.parent_id'
						. '  FROM Products'
						. ' WHERE Products.id = ' . $my_product_id
						;
	//log_sql('Print_Labels', 'Fabrics', $sql);
					$my_parent_id = $db->fetchOne($sql);

					if ($my_parent_id) {
						$sql= 'SELECT FTPs.composition'
							. '  FROM FTPs'
							. ' WHERE FTPS.product_id = ' . $my_parent_id . ' AND FTPs.is_current = "Yes"'
							;
	//log_sql('Print_Labels', 'Fabrics', $sql);
						$my_composition = $db->fetchOne($sql);
					}
				}
			}
		}
*/
		if ($my_composition == false) {
			$my_composition = '';
		}
		$names = explode(', ', $my_composition);
		$xcount = count($names);
		$my_composition1 = '';
		if ($xcount > 0)	{$my_composition1 .=		preg_replace('/ /', '% ', $names[0], 1);}
		if ($xcount > 1)	{$my_composition1 .= ', ' . preg_replace('/ /', '% ', $names[1], 1);}
		$my_composition2 = '';
		if ($xcount > 2)	{$my_composition2 .=		preg_replace('/ /', '% ', $names[2], 1);}
		if ($xcount > 3)	{$my_composition2 .= ', ' . preg_replace('/ /', '% ', $names[3], 1);}
		if ($xcount > 4)	{$my_composition2 .= ', ' . preg_replace('/ /', '% ', $names[4], 1);}
/*
		$my_loadout_id = '';
		$my_color_name = '';
		
		if ($my_row['load_quot_id']) {
			$sql= 'SELECT LoadQuotations.loadout_id, Colors.color_name, Colors.id'
				. '  FROM LoadQuotations'
				. '  LEFT JOIN LoadOuts		ON LoadOuts.id = LoadQuotations.loadout_id'
				. '  LEFT JOIN Colors		ON Colors.id = LoadOuts.color_id'
				. ' WHERE LoadQuotations.id = ' . $my_row['load_quot_id']
				;
			$my_loadquote = $db->fetchRow($sql);
			$my_loadout_id	= $my_loadquote['loadout_id'];
			$my_color_name	= $my_loadquote['color_name'];
			$my_color_id	= $my_loadquote['id'		];
		}
*/
		$labels  =		'~NORMAL';
		$labels .= NL . '~NORMAL';
		$labels .= NL . '~PIOFF';
		$labels .= NL . '~DELETE LOGO;*ALL';
		$labels .= NL . '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 6;SLEW IPS 4';
		$labels .= NL . '~CREATE;FABRIC;141';
		$labels .= NL . 'SCALE;DOT;203;203';
		$labels .= NL . '/PARTE FIXA';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;284;741;10;10;*Comp:*';
		$labels .= NL . 'INV;POINT;209;741;10;10;*Cor :*';
		$labels .= NL . 'INV;POINT;169;741;10;10;*Lote:*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/PARTE VARIAVEL';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;359;741;12;12;*' . $my_product_name1		. '*';
		$labels .= NL . 'INV;POINT;324;741;12;12;*' . $my_product_name2		. '*';
		$labels .= NL . 'INV;POINT;284;660;10;10;*' . $my_composition1		. '*';
		$labels .= NL . 'INV;POINT;249;660;10;10;*' . $my_composition2		. '*';
		$labels .= NL . 'INV;POINT;209;660;10;10;*' . $my_row['color_name']	. '*';
		$labels .= NL . 'INV;POINT;169;660;10;10;*' . $my_row['loadout_id']	. '*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/CODIGO DE BARRAS';
		$labels .= NL . 'BARCODE';
		$labels .= NL . 'C128C;INV;XRD4:4:8:8:12:12:16:16;H7;38;267';
		$labels .= NL . '*' . $my_row['barcode'] . '*';
		$labels .= NL . 'PDF;B';
		$labels .= NL . 'STOP';
		$labels .= NL . '/FIM DO PROGRAMA';
		$labels .= NL . 'END';
		$labels .= NL . '~EXECUTE;FABRIC;1';
		$labels .= NL . '~NORMAL';

		$out_name = $folder . $my_id . '.txt';
		$out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
		fwrite( $out_file, $labels );
		fwrite( $out_file, NL );
		fclose( $out_file );

		$command = 'tcp.exe ' . $ip_number . ' ' . $out_name;
		if (ENVIRONMENT == 'development') {
			log_sql('Print_Labels', 'Fabrics', $command);
		}else{
			exec($command);
		}

		$count++;
	}
	return $count;
}

function JKY_print_pieces($data) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT Pieces.*'
		. '  FROM Pieces'
		. ' WHERE Pieces.is_printed = "No"'
		. ' ORDER BY Pieces.barcode ASC'
		;
	$rows = $db->fetchAll($sql);

	$count		= 0;
	$folder		= 'pieces/';
	$ip_number	= get_config_value('System Controls', 'IP DL Printer Barcode Pieces');
	foreach($rows as $my_row) {
		$my_id				=		  $my_row['id'			];
		$my_produced_by		= ucwords($my_row['produced_by'	]);

		$my_product_name	= ucwords($my_row['product_name']);
		$my_product_name1	= ucwords($my_row['product_name']);
		$my_product_name2	= '';
		if (strlen($my_product_name) > 28) {
			$i = 28;
			for(; $i>0; $i--) {
				if ($my_product_name[$i] == ' ') {
					break;
				}
			}
			if ($i == 0) {
				$my_product_name1 = substr($my_product_name, 0, 28);
				$my_product_name2 = substr($my_product_name, 28);
			}else{
				$my_product_name1 = substr($my_product_name, 0, $i);
				$my_product_name2 = substr($my_product_name, $i+1);
			}
		}
		$my_date = $my_row['updated_at'];
		$my_updated = substr($my_date, 8, 2) . '/' . substr($my_date, 5, 2) . '/' . substr($my_date, 0, 4);

		$sql= 'SELECT FTPs.nick_name'
			. '  FROM Orders'
			. '  LEFT JOIN FTPs ON FTPs.id = Orders.ftp_id'
			. ' WHERE Orders.id = ' . $my_row['order_id']
			;
		$my_ftp_name = $db->fetchOne($sql);

		$labels  =		'~NORMAL';
		$labels .= NL . '~NORMAL';
		$labels .= NL . '~PIOFF';
		$labels .= NL . '~DELETE LOGO;*ALL';
		$labels .= NL . '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 6;SLEW IPS 4';
		$labels .= NL . '~CREATE;PIECE;141';
		$labels .= NL . 'SCALE;DOT;203;203';
		$labels .= NL . '/PARTE FIXA';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;268;741;12;12;*CM*';
		$labels .= NL . 'INV;POINT;268;230;12;12;*Data:*';
		$labels .= NL . 'INV;POINT;188;741;12;12;*OR:*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/PARTE VARIAVEL';
		$labels .= NL . 'ISET;0';
		$labels .= NL . 'FONT;FACE 92250';
		$labels .= NL . 'ALPHA';
		$labels .= NL . 'INV;POINT;354;741;12;12;*' . $my_product_name1		. '*';
		$labels .= NL . 'INV;POINT;311;741;12;12;*' . $my_product_name2		. '*';
		$labels .= NL . 'INV;POINT;268;678;12;12;*' . $my_produced_by		. '*';
		$labels .= NL . 'INV;POINT;268;150;12;12;*' . $my_updated			. '*';
		$labels .= NL . 'INV;POINT;228;741;10;10;*' . $my_ftp_name			. '*';
		$labels .= NL . 'INV;POINT;188;678;12;12;*' . $my_row['order_id'  ] . '*';
		$labels .= NL . 'STOP';
		$labels .= NL . '/CODIGO DE BARRAS';
		$labels .= NL . 'BARCODE';
		$labels .= NL . 'C128C;INV;XRD4:4:8:8:12:12:16:16;H7;43;267';
		$labels .= NL . '*' . $my_row['barcode'] . '*';
		$labels .= NL . 'PDF;B';
		$labels .= NL . 'STOP';
		$labels .= NL . '/FIM DO PROGRAMA';
		$labels .= NL . 'END';
		$labels .= NL . '~EXECUTE;PIECE;1';
		$labels .= NL . '~NORMAL';

		$out_name = $folder . $my_id . '.txt';
		$out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
		fwrite( $out_file, $labels );
		fwrite( $out_file, NL );
		fclose( $out_file );

		$command = 'tcp.exe ' . $ip_number . ' ' . $out_name;
		if (ENVIRONMENT == 'development') {
				log_sql('Print_Labels', 'Pieces', $command);
		}else{
				exec($command);
		}
		$sql= 'UPDATE Pieces'
			. '   SET is_printed = "Yes"'
			. ' WHERE id = ' . $my_id
			;
		$db->query($sql);

		$count++;
	}
	return $count;
}

function JKY_print_products($data) {
	$db = Zend_Registry::get('db');

	$sql= 'SELECT Products.*'
		. '  FROM Products'
		. ' WHERE Products.id = ' . $data['id']
		;
	$row  = $db->fetchRow($sql);

	$count		= 0;
	$folder		= 'products/';
	$ip_number	= get_config_value('System Controls', 'IP TM Printer Barcode Products');

	$my_row = $row;
	$my_id = $my_row['id'];

	$my_product_name	= ucwords($my_row['product_name']);
	$my_product_name1	= ucwords($my_row['product_name']);
	$my_product_name2	= '';
	if (strlen($my_product_name) > 50) {
		$i = 50;
		for(; $i>0; $i--) {
			if ($my_product_name[$i] == ' ') {
				break;
			}
		}
		if ($i == 0) {
			$my_product_name1 = substr($my_product_name, 0, 50);
			$my_product_name2 = substr($my_product_name, 50);
		}else{
			$my_product_name1 = substr($my_product_name, 0, $i);
			$my_product_name2 = substr($my_product_name, $i+1);
		}
	}
	
	$sql= 'SELECT FTPs.composition'
		. '  FROM FTPs'
		. ' WHERE FTPS.product_id = ' . $my_row['id'] . ' AND FTPs.is_current = "Yes"'
		;
	$my_composition = $db->fetchOne($sql);

	if ($my_composition == false && $my_row['parent_id']) {
		$sql= 'SELECT FTPs.composition'
			. '  FROM FTPs'
			. ' WHERE FTPS.product_id = ' . $my_row['parent_id'] . ' AND FTPs.is_current = "Yes"'
			;
		$my_composition = $db->fetchOne($sql);
	}

	if ($my_composition == false) {
		$my_composition = '';
	}	
    $names = explode(', ', $my_composition);
	$xcount = count($names);
    $my_composition1 = '';
	if ($xcount > 0)	{$my_composition1 .=		preg_replace('/ /', '% ', $names[0], 1);}
	if ($xcount > 1)	{$my_composition1 .= ', ' . preg_replace('/ /', '% ', $names[1], 1);}
	$my_composition2 = '';
	if ($xcount > 2)	{$my_composition2 .=		preg_replace('/ /', '% ', $names[2], 1);}
	if ($xcount > 3)	{$my_composition2 .= ', ' . preg_replace('/ /', '% ', $names[3], 1);}
	if ($xcount > 4)	{$my_composition2 .= ', ' . preg_replace('/ /', '% ', $names[4], 1);}

	$my_image = '';
	switch($my_row['washings']) {
		case('Instrucoes Lavagem 1')	: $my_image .= 'PES'	; break;
		case('Instrucoes Lavagem 2')	: $my_image .= 'PESCO'	; break;
		case('Instrucoes Lavagem 3')	: $my_image .= 'ALL'	; break;
	}

	$labels  =		'~NORMAL';
	$labels .= NL . '~NORMAL';
	$labels .= NL . '~PIOFF';
	$labels .= NL . '~DELETE LOGO;*ALL';
	$labels .= NL . '~PAPER;INTENSITY 6;MEDIA 1;FEED SHIFT 0;CUT 0;PAUSE 0;TYPE 0;LABELS 2;SPEED IPS 6;SLEW IPS 4';
	$labels .= NL . '~CREATE;PRODUCT;141';
	$labels .= NL . 'SCALE;DOT;203;203';
	$labels .= NL . 'LOGO';
	$labels .= NL . '45;17;' . $my_image;
	$labels .= NL . 'STOP';
	$labels .= NL . '/PARTE FIXA';
	$labels .= NL . 'ISET;0';
	$labels .= NL . 'FONT;FACE 92250';
	$labels .= NL . 'ALPHA';
	$labels .= NL . 'INV;POINT;289;740;10;10;*Comp:*';
	$labels .= NL . 'INV;POINT;219;740;10;10;*Larg:*';
	$labels .= NL . 'INV;POINT;184;740;10;10;*Gram:*';
	$labels .= NL . 'INV;POINT;184;280;10;10;*Rend:*';
	$labels .= NL . 'INV;POINT;10;740;10;10;*# Dados sujeitos a variacoes #*';
	$labels .= NL . 'STOP';
	$labels .= NL . '/PARTE VARIAVEL';
	$labels .= NL . 'ISET;0';
	$labels .= NL . 'FONT;FACE 92250';
	$labels .= NL . 'ALPHA';
	$labels .= NL . 'INV;POINT;354;741;12;12;*' . $my_product_name1			  . '*';
	$labels .= NL . 'INV;POINT;320;741;12;12;*' . $my_product_name2			  . '*';
	$labels .= NL . 'INV;POINT;289;660;10;10;*' . $my_composition1			  . '*';
	$labels .= NL . 'INV;POINT;254;660;10;10;*' . $my_composition2			  . '*';
	$labels .= NL . 'INV;POINT;219;660;10;10;*' . $my_row['width_customer'	] . ' cms*';
	$labels .= NL . 'INV;POINT;184;660;10;10;*' . $my_row['weight_customer' ] . ' grs*';
	$labels .= NL . 'INV;POINT;184;200;10;10;*' . $my_row['yield'			] . ' mts/kg*';
	$labels .= NL . 'STOP';
	$labels .= NL . '/CODIGO DE BARRAS';
	$labels .= NL . '/BARCODE';
	$labels .= NL . '/C128C;INV;XRD4:4:8:8:12:12:16:16;H7;43;267';
	$labels .= NL . '/*' . $my_id . '*';
	$labels .= NL . '/PDF;B';
	$labels .= NL . '/STOP';
	$labels .= NL . '/FIM DO PROGRAMA';
	$labels .= NL . 'END';
	$labels .= NL . '~EXECUTE;PRODUCT;1';
	$labels .= NL . '~NORMAL';

	$out_name = $folder . $my_id . '.txt';
	$out_file = fopen( $out_name, 'w' ) or die( 'cannot open ' . $out_name );
	fwrite( $out_file, $labels );
	fwrite( $out_file, NL );
	fclose( $out_file );

	$command = 'tcp.exe ' . $ip_number . ' ' . $out_name;
	if (ENVIRONMENT == 'development') {
		log_sql('Print_Labels', 'Products', $command);
	}else{
		exec($command);
	}

	$count++;

	return $count;
}
