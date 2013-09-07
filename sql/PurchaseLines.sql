DROP   TABLE IF     EXISTS PurchaseLines;
CREATE TABLE IF NOT EXISTS PurchaseLines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, batch_id			BIGINT				DEFAULT NULL
, expected_date		DATE				DEFAULT NULL
, scheduled_at		DATETIME			DEFAULT NULL
, expected_weight	DECIMAL(10,2)		DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY parent	(parent_id)
, KEY thread	(thread_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE PurchaseLines	ADD COLUMN batch_id				BIGINT		DEFAULT NULL	AFTER thread_id;

ALTER TABLE PurchaseLines	CHANGE	purchase_id			parent_id			BIGINT		DEFAULT NULL;
