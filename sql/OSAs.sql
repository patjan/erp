DROP   TABLE IF     EXISTS OSAs;
CREATE TABLE IF NOT EXISTS OSAs
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, osa_number		VARCHAR(32)			DEFAULT NULL
, quotation_id		BIGINT				DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, salesman_id		BIGINT				DEFAULT NULL
, ordered_at		DATETIME			DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, produced_date		DATE				DEFAULT NULL
, delivered_date	DATE				DEFAULT NULL
, quoted_pieces		INT(11)				DEFAULT 0
, ordered_pieces	INT(11)				DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(osa_number)
, KEY quotation (quotation_id)
, KEY customer 	(customer_id)
, KEY salesman 	(salesman_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='OSAs', next_id=1, id_size=5;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='OSAs', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='OSAs', updated_by=1, updated_at=NOW();

ALTER TABLE OSAs		ADD INDEX salesman		(salesman_id	);
