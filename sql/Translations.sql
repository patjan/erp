DROP   TABLE IF     EXISTS Translations;
CREATE TABLE IF NOT EXISTS Translations
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, locale			VARCHAR(32)			DEFAULT NULL
, sentence			VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(parent_id, locale)
, KEY parent		(parent_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
