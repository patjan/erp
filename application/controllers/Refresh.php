<?

/**
 *	$.ajax({ method: refresh, table: x...x, reference_date: yyy-mm-dd });
 *
 *	return: [ x...x, ..., x...x ]
 */
function JKY_refresh($data) {
	$table = get_data($data, 'table');

	$count = 0;
	switch($table) {
		case 'ThreadForecast'	: $return = JKY_refresh_threads	($data); break;
		case 'FabricCounters'	: $return = JKY_refresh_fabrics	($data); break;
	}

	return $return;
}

function JKY_refresh_threads($data) {
	$table			= get_data($data, 'table');
	$reference_date = get_data($data, 'reference_date');

	$sql= 'SET @cut_off_date = ' . $reference_date . ';'
		. 'TRUNCATE PurchaseMonthly;'
		. 'TRUNCATE ThreadJoined;'
		. 'TRUNCATE ThreadForecast;'

		. 'INSERT PurchaseMonthly(thread_id, supplier_id, months, forecast_weight)'
		. 'SELECT PurchaseLines.thread_id'
		. '	    , Purchases.supplier_id'
		. '	    , 12 * (YEAR(PurchaseLines.expected_date) - YEAR(@cut_off_date)) + (MONTH(PurchaseLines.expected_date) - MONTH(@cut_off_date)) AS months'
		. '	    , SUM(PurchaseLines.expected_weight - PurchaseLines.received_weight) AS forecast_weight'
		. '  FROM PurchaseLines'
		. '  LEFT JOIN Purchases ON Purchases.id = PurchaseLines.parent_id'
		. ' WHERE PurchaseLines.status = "Draft"'
		. '   AND PurchaseLines.expected_weight > PurchaseLines.received_weight'
		. ' GROUP BY thread_id, supplier_id, months'
		. ';'

		. 'INSERT ThreadJoined(thread_id, supplier_id, invoice_date, current_balance)'
		. 'SELECT Batches.thread_id'
		. '     , Incomings.supplier_id'
		. '     , MIN(Incomings.invoice_date) AS invoice_date'
		. '     , SUM(IF(Boxes.status = "Check In" OR Boxes.status = "Return", IF(Boxes.real_weight = 0, Boxes.average_weight, Boxes.real_weight), 0)) AS current_balance'
		. '  FROM Boxes'
		. '  LEFT JOIN Batches				ON Batches.id = Boxes.batch_id'
		. '  LEFT JOIN Incomings  			ON Incomings.id	= Batches.incoming_id'
		. ' WHERE Batches.status = "Active"'
		. ' GROUP BY thread_id, supplier_id'
		. ';'

		. 'INSERT ThreadJoined(thread_id, supplier_id, months, forecast_weight)'
		. 'SELECT *'
		. '  FROM PurchaseMonthly'
		. ';'

		. 'INSERT ThreadForecast(thread_id, supplier_id, invoice_date, current_balance, forecast_past, forecast_month_0, forecast_month_1, forecast_month_2, forecast_month_3, forecast_future)'
		. 'SELECT thread_id'
		. '	    , supplier_id'
		. '	    , invoice_date'
		. '	    , SUM(current_balance) AS current_balance'
		. '	    , SUM(IF (months < 0, forecast_weight, 0)) AS forecast_past'
		. '	    , SUM(IF (months = 0, forecast_weight, 0)) AS forecast_month_0'
		. '	    , SUM(IF (months = 1, forecast_weight, 0)) AS forecast_month_1'
		. '	    , SUM(IF (months = 2, forecast_weight, 0)) AS forecast_month_2'
		. '	    , SUM(IF (months = 3, forecast_weight, 0)) AS forecast_month_3'
		. '	    , SUM(IF (months > 3, forecast_weight, 0)) AS forecast_future'
		. '  FROM ThreadJoined'
		. ' GROUP BY thread_id, supplier_id'
		. ';'

		. 'UPDATE Configs'
		. '   SET Configs.value = @cut_off_date'
		. ' WHERE Configs.group_set = "System Controls"'
		. '   AND Configs.name = "Reference Date"'
		. ';'
		;
//	$this->log_sql( $table, 'refresh', $sql );
	$db   = Zend_Registry::get('db');
	$db->query($sql);

	$return = array();
	$return[ 'status' ] = 'ok';
	$return[ 'message'] = 'Refreshed';
	return $return;
}

function JKY_refresh_fabrics($data) {
	$table			= get_data($data, 'table');
	$reference_date = get_data($data, 'reference_date');

	$sql= 'DROP   TABLE IF     EXISTS FabricCounters;'
		. 'CREATE TABLE IF NOT EXISTS FabricCounters'
		. '( id				BIGINT			NOT NULL AUTO_INCREMENT'
		. ', product_id		BIGINT			DEFAULT NULL'
		. ', color_id		BIGINT			DEFAULT NULL'
		. ', product_name	VARCHAR(255)	DEFAULT NULL'
		. ', color_name		VARCHAR(255)	DEFAULT NULL'
		. ', scheduled		INT(11)			DEFAULT 0'
		. ', produced		INT(11)			DEFAULT 0'
		. ', dyers			INT(11)			DEFAULT 0'
		. ', climate		INT(11)			DEFAULT 0'
		. ', stock			INT(11)			DEFAULT 0'
		. ', total			INT(11)			DEFAULT 0'
		. ', target			INT(11)			DEFAULT 0'
		. ', hold			INT(11)			DEFAULT 0'
		. ', sold			INT(11)			DEFAULT 0'
		. ', PRIMARY KEY(id)'
		. ', UNIQUE(product_id, color_id)'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricJoined;'
		. 'CREATE TABLE IF NOT EXISTS FabricJoined'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', scheduled		INT(11)			DEFAULT 0'
		. ', produced		INT(11)			DEFAULT 0'
		. ', dyers			INT(11)			DEFAULT 0'
		. ', climate		INT(11)			DEFAULT 0'
		. ', stock			INT(11)			DEFAULT 0'
		. ', target			INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricScheduled;'
		. 'CREATE TABLE IF NOT EXISTS FabricScheduled'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', scheduled		INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricProduced;'
		. 'CREATE TABLE IF NOT EXISTS FabricProduced'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', produced		INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricDyers;'
		. 'CREATE TABLE IF NOT EXISTS FabricDyers'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', dyers			INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricClimate;'
		. 'CREATE TABLE IF NOT EXISTS FabricClimate'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', climate		INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricStock;'
		. 'CREATE TABLE IF NOT EXISTS FabricStock'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', stock			INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'DROP   TABLE IF     EXISTS FabricTarget;'
		. 'CREATE TABLE IF NOT EXISTS FabricTarget'
		. '( product_id 	BIGINT			DEFAULT NULL'
		. ', color_id 		BIGINT			DEFAULT NULL'
		. ', target			INT(11)			DEFAULT 0'
		. ') ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1'
		. ';'

		. 'SELECT @history_at := Configs.value'
		. '  FROM Configs'
		. ' WHERE Configs.group_set = "System Controls"'
		. '   AND Configs.name = "Calculate Fabric Date Time"'
		. ';'

//		. 'INSERT INTO FabricHistory'
//		. '	   (history_at, product_id, color_id, product_name, color_name, scheduled, produced, dyers, climate, stock, total, target, hold, sold)'
//		. 'SELECT @history_at, product_id, color_id, product_name, color_name, scheduled, produced, dyers, climate, stock, total, target, hold, sold'
//		. '  FROM FabricCounters'
//		. ';'

		. 'SET @cut_off_at = NOW();'
		. 'SET @customer_id = 100002;'		//	Tecno Malhas

		. 'TRUNCATE FabricCounters;'
		. 'TRUNCATE FabricJoined;'
		. 'TRUNCATE FabricScheduled;'
		. 'TRUNCATE FabricProduced;'
		. 'TRUNCATE FabricDyers;'
		. 'TRUNCATE FabricClimate;'
		. 'TRUNCATE FabricStock;'
		. 'TRUNCATE FabricTarget;'

		. 'INSERT FabricScheduled( product_id, color_id, scheduled )'
		. 'SELECT OSA_Lines.product_id, OSA_Colors.color_id, SUM(OSA_Colors.ordered_pieces) AS scheduled'
		. '  FROM OSA_Colors'
		. '  LEFT JOIN OSA_Lines ON OSA_Lines.id = OSA_Colors.parent_id'
		. '  LEFT JOIN OSAs      ON OSAs.id      = OSA_Lines.parent_id'
		. ' WHERE OSAs.customer_id = @customer_id'
		. '   AND OSAs.status = "Active"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricProduced(product_id, color_id, produced )'
		. 'SELECT Pieces.product_id'
		. '	 , Orders.color_id'
		. '	 , Count(*) AS produced'
		. '  FROM Pieces'
		. '  LEFT JOIN Orders ON Orders.id = Pieces.order_id'
		. ' WHERE Orders.customer_id = @customer_id'
		. '   AND Pieces.status = "Active"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricDyers(product_id, color_id, dyers )'
		. 'SELECT Pieces.product_id'
		. '	 , Orders.color_id'
		. '	 , Count(*) AS dyers'
		. '  FROM Pieces'
		. '  LEFT JOIN Orders ON Orders.id = Pieces.order_id'
		. ' WHERE Orders.customer_id = @customer_id'
		. '   AND Pieces.status = "Check Out"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricClimate( product_id, color_id, climate )'
		. 'SELECT Fabrics.product_id'
		. '	 , Fabrics.color_id'
		. '	 , Count(*) AS climate'
		. '  FROM Fabrics'
		. '  LEFT JOIN Orders ON Orders.id = Fabrics.order_id'
		. ' WHERE(Fabrics.order_id IS NULL OR Orders.customer_id = @customer_id)'
		. '   AND Fabrics.status = "Active"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricStock( product_id, color_id, stock )'
		. 'SELECT Fabrics.product_id'
		. '	 , Fabrics.color_id'
		. '	 , Count(*) AS stock'
		. '  FROM Fabrics'
		. '  LEFT JOIN Orders ON Orders.id = Fabrics.order_id'
		. ' WHERE(Fabrics.order_id IS NULL OR Orders.customer_id = @customer_id)'
		. '   AND Fabrics.status = "Check In"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricTarget( product_id, color_id, target )'
		. 'SELECT ProdColors.product_id'
		. '	 , ProdColors.color_id'
		. '	 , ProdColors.target'
		. '  FROM ProdColors'
		. ' WHERE ProdColors.status = "Active"'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'INSERT FabricJoined(product_id, color_id, scheduled, produced, dyers, climate, stock, target)'
		. 'SELECT product_id, color_id, scheduled, 0, 0, 0, 0, 0'
		. '  FROM FabricScheduled'
		. ' UNION '
		. 'SELECT product_id, color_id, 0, produced, 0, 0, 0, 0'
		. '  FROM FabricProduced'
		. ' UNION '
		. 'SELECT product_id, color_id, 0, 0, dyers, 0, 0, 0'
		. '  FROM FabricDyers'
		. ' UNION '
		. 'SELECT product_id, color_id, 0, 0, 0, climate, 0, 0'
		. '  FROM FabricClimate'
		. ' UNION '
		. 'SELECT product_id, color_id, 0, 0, 0, 0, stock, 0'
		. '  FROM FabricStock'
		. ' UNION '
		. 'SELECT product_id, color_id, 0, 0, 0, 0, 0, target'
		. '  FROM FabricTarget'
		. ';'

		. 'INSERT FabricCounters(product_id, color_id, scheduled, produced, dyers, climate, stock, target)'
		. 'SELECT product_id, color_id'
		. '	 , SUM(scheduled) AS scheduled'
		. '	 , SUM(produced	) AS produced'
		. '	 , SUM(dyers	) AS dyers'
		. '	 , SUM(climate	) AS climate'
		. '	 , SUM(stock	) AS stock'
		. '	 , SUM(target	) AS target'
		. '  FROM FabricJoined'
		. ' GROUP BY product_id, color_id'
		. ';'

		. 'DROP TABLE FabricJoined;'
		. 'DROP TABLE FabricScheduled;'
		. 'DROP TABLE FabricProduced;'
		. 'DROP TABLE FabricDyers;'
		. 'DROP TABLE FabricClimate;'
		. 'DROP TABLE FabricStock;'
		. 'DROP TABLE FabricTarget;'

		. 'UPDATE FabricCounters, Products'
		. '   SET FabricCounters.product_name = Products.product_name'
		. ' WHERE FabricCounters.product_id = Products.id'
		. ';'

		. 'UPDATE FabricCounters, Colors'
		. '   SET FabricCounters.color_name = Colors.color_name'
		. ' WHERE FabricCounters.color_id = Colors.id'
		. ';'

		. 'UPDATE FabricCounters'
		. '   SET total = produced + dyers + climate + stock'
		. ';'

		. 'UPDATE Configs'
		. '   SET Configs.value = @cut_off_at'
		. ' WHERE Configs.group_set = "System Controls"'
		. '   AND Configs.name = "Calculate Fabric Date Time"'
		. ';'
		;
//	$this->log_sql( $table, 'refresh', $sql );
	$db   = Zend_Registry::get('db');
	$db->query($sql);

	$return = array();
	$return[ 'status' ] = 'ok';
	$return[ 'message'] = 'Refreshed';
	return $return;
}
