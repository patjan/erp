DROP   TABLE IF     EXISTS FTP_Sets;
CREATE TABLE IF NOT EXISTS FTP_Sets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, setting_id		BIGINT				DEFAULT NULL
, value				VARCHAR(32)			DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(ftp_id, setting_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

/*
, ponto_malha		CHAR(2)				DEFAULT NULL
, fita_malha		INT(11)				DEFAULT 0
, lfa_malha			INT(11)				DEFAULT 0
, ponto_fang		INT(11)				DEFAULT 0
, fita_fang			INT(11)				DEFAULT 0
, lfa_fang			INT(11)				DEFAULT 0
, ponto_central		DECIMAL(5,2)		DEFAULT 0
, ponto_disco		INT(11)				DEFAULT 0
, altura_disco		INT(11)				DEFAULT 0
, chave_disco		INT(11)				DEFAULT 0
, frontura			INT(11)				DEFAULT 0
, puxador			INT(11)				DEFAULT 0
*/

ALTER TABLE FTP_Sets		CHANGE	ftp_id		parent_id		BIGINT			DEFAULT NULL;
