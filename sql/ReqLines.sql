DROP   TABLE IF     EXISTS ReqLines;
CREATE TABLE IF NOT EXISTS ReqLines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, request_id		BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, batch_id			BIGINT				DEFAULT NULL
, requested_date	DATE				DEFAULT NULL
, scheduled_at		DATETIME			DEFAULT NULL
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY request	(request_id)
, KEY thread	(thread_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
