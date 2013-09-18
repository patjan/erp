DROP   TABLE IF     EXISTS OrdThreads;
CREATE TABLE IF NOT EXISTS OrdThreads
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, order_id			BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, batchin_id		BIGINT				DEFAULT NULL
, batchout_id		BIGINT				DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, ordered_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY	(id)
, KEY order_id 	(order_id)
, KEY thread 	(thread_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='OrdThreads', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='OrdThreads', created_by=1, created_at=NOW();

ALTER TABLE OrdThreads		ADD COLUMN batchout_id	BIGINT		DEFAULT NULL	AFTER batchin_id;

ALTER TABLE OrdThreads		CHANGE	requested_weight	ordered_weight	DECIMAL(10,2)	DEFAULT 0;

ALTER TABLE OrdThreads		CHANGE	order_id			parent_id		BIGINT			DEFAULT NULL;
