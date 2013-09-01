DROP   TABLE IF     EXISTS TDyers;
CREATE TABLE IF NOT EXISTS TDyers
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, tdyer_number		VARCHAR(32)			DEFAULT NULL
, order_id			BIGINT				DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, ordered_at		DATETIME			DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, returned_at		DATETIME			DEFAULT NULL
, ordered_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(tdyer_number)
, KEY order_id 		(order_id)
, KEY customer_id 	(customer_id)
, KEY dyer			(dyer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=100001
;
