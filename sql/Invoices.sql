DROP   TABLE IF     EXISTS Invoices;
CREATE TABLE IF NOT EXISTS Invoices
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_at		VARCHAR(32)			DEFAULT NULL	# yyyy-mm-dd hh:mm:ss.uuuuuu (from PHP)
, received_at		VARCHAR(32)			DEFAULT NULL	# yyyy-mm-dd hh:mm:ss.uuuuuu (from PHP)
, table_name		VARCHAR(32)			DEFAULT NULL	# Sales | ShipDyers
, table_id			BIGINT				DEFAULT NULL	
, returned_id		BIGINT				DEFAULT NULL	# nfe_id	
, json_data			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY received	(received_at)
, KEY name_id	(table_name, table_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
;

INSERT NextIds	SET table_name='Invoices', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Invoices', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Invoices', updated_by=1, updated_at=NOW();
