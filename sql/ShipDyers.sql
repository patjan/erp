DROP   TABLE IF     EXISTS ShipDyers;
CREATE TABLE IF NOT EXISTS ShipDyers
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, dyer_id			BIGINT				DEFAULT NULL
, transport_id		BIGINT				DEFAULT NULL
, shipdyer_number	VARCHAR(32)			DEFAULT NULL
, invoice_number	VARCHAR(32)			DEFAULT NULL
, truck_license		VARCHAR(32)			DEFAULT NULL
, shipped_at		DATETIME			DEFAULT NULL
, delivered_at		DATETIME			DEFAULT NULL
, unit_name			VARCHAR(32)			DEFAULT NULL
, brand_name		VARCHAR(32)			DEFAULT NULL
, batch_code		VARCHAR(32)			DEFAULT NULL
, sds_printed		INT					DEFAULT 0
, sis_printed		INT					DEFAULT 0
, quantity			INT					DEFAULT 0
, gross_weight		DECIMAL(10,2)		DEFAULT 0
, net_weight		DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(shipdyer_number)
, KEY dyer		(dyer_id)
, KEY transport	(transport_id)
, KEY invoice	(invoice_number)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='ShipDyers', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='ShipDyers', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='ShipDyers', updated_by=1, updated_at=NOW();

ALTER TABLE ShipDyers		ADD COLUMN sds_printed		INT			DEFAULT 0		AFTER batch_code;

ALTER TABLE ShipDyers	ADD INDEX transport		(transport_id	);

ALTER TABLE ShipDyers		ADD COLUMN sis_printed		INT			DEFAULT 0		AFTER sds_printed;
