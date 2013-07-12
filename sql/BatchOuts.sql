DROP   TABLE IF     EXISTS BatchOuts;
CREATE TABLE IF NOT EXISTS BatchOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, checkout_id		BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, req_line_id		BIGINT				DEFAULT NULL
, code				VARCHAR(32)			DEFAULT NULL
, batch				VARCHAR(32)			DEFAULT NULL
, unit_price		DECIMAL(10,2)		DEFAULT 0
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, requested_boxes	INT(11)				DEFAULT 0
, checkout_boxes	INT(11)				DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY checkout	(checkout_id)
, KEY thread	(thread_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
