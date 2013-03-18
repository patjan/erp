DROP   TABLE IF     EXISTS Threads;
CREATE TABLE IF NOT EXISTS Threads
( id                BIGINT				NOT NULL AUTO_INCREMENT
, created_at        DATETIME			DEFAULT NULL
, created_by        BIGINT				DEFAULT NULL
, updated_at        DATETIME			DEFAULT NULL
, updated_by        BIGINT				DEFAULT NULL
, status            VARCHAR(32)         DEFAULT 'Active'

, code				VARCHAR(32)			UNIQUE
, name				VARCHAR(255)		DEFAULT NULL
, thread_group		VARCHAR(255)		DEFAULT NULL
, thread_color		VARCHAR(255)		DEFAULT NULL
, composition		VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, KEY name(name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;