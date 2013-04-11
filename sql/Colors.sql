DROP   TABLE IF     EXISTS Colors;
CREATE TABLE IF NOT EXISTS Colors
( id                BIGINT				NOT NULL AUTO_INCREMENT
, created_at        DATETIME			DEFAULT NULL
, created_by        BIGINT				DEFAULT NULL
, updated_at        DATETIME			DEFAULT NULL
, updated_by        BIGINT				DEFAULT NULL
, status            VARCHAR(32)         DEFAULT 'Active'

, code				VARCHAR(32)			DEFAULT NULL
, name				VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(code)
, KEY name(name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;