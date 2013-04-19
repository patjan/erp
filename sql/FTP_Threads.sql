DROP   TABLE IF     EXISTS FTP_Threads;
CREATE TABLE IF NOT EXISTS FTP_Threads
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, ftp_id			BIGINT
, thread_id			BIGINT

, sequence			INT(11)				DEFAULT 0
, percent   		DECIMAL(6,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(ftp_id,thread_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;