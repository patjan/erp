DROP   TABLE IF     EXISTS FTP_Threads;
CREATE TABLE IF NOT EXISTS FTP_Threads
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL

, percent   		DECIMAL(6,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(ftp_id,thread_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE FTP_Threads		ADD COLUMN supplier_id		BIGINT		DEFAULT NULL	AFTER thread_id;

ALTER TABLE FTP_Threads		CHANGE	ftp_id		parent_id		BIGINT			DEFAULT NULL;
