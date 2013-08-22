DROP   TABLE IF     EXISTS BatchSets;
CREATE TABLE IF NOT EXISTS BatchSets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, batchout_id		BIGINT				DEFAULT NULL
, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_date		DATE				DEFAULT NULL
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, checkin_boxes		INT					DEFAULT 0
, reserved_boxes	INT					DEFAULT 0
, checkout_boxes	INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY batchout	(batchout_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
