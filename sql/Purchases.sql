DROP   TABLE IF     EXISTS Purchases;
CREATE TABLE IF NOT EXISTS Purchases
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, code				VARCHAR(32)			UNIQUE
, source_doc		VARCHAR(32)			DEFAULT NULL
, ordered_at		DATETIME			DEFAULT NULL
, expected_dt		DATE				DEFAULT NULL
, scheduled_at		DATETIME			DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL
, supplier_ref      VARCHAR(32)			DEFAULT NULL
, payment_term      VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(code)
, KEY supplier(supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;