DROP   TABLE IF     EXISTS FTP_Loads;
CREATE TABLE IF NOT EXISTS FTP_Loads
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, ftp_id			BIGINT				DEFAULT NULL

, sequence			INT(11)				DEFAULT 0
, first_number		INT(11)				DEFAULT 0
, first_thread_id	BIGINT				DEFAULT NULL
, second_number		INT(11)				DEFAULT 0
, second_thread_id	BIGINT				DEFAULT NULL

, PRIMARY KEY(id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;