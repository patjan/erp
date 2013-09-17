DROP   TABLE IF     EXISTS TDyerThreads;
CREATE TABLE IF NOT EXISTS TDyerThreads
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, batchin_id		BIGINT				DEFAULT NULL
, batchout_id		BIGINT				DEFAULT NULL
, ordered_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY	(id)
, KEY tdyer		(tdyer_id)
, KEY thread 	(thread_id)
, KEY batchin 	(batchin_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE TDyerThreads	ADD COLUMN batchout_id			BIGINT			DEFAULT NULL	AFTER batchin_id;
ALTER TABLE TDyerThreads	CHANGE	tdyer_id	parent_id	BIGINT			DEFAULT NULL;

ALTER TABLE TDyerThreads	ADD COLUMN returned_weight		DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
ALTER TABLE TDyerThreads	ADD COLUMN checkout_weight		DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
ALTER TABLE TDyerThreads	ADD COLUMN ordered_weight		DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
