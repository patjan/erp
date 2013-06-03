DROP   TABLE IF     EXISTS ThreadsImp;
CREATE TABLE IF NOT EXISTS ThreadsImp
( status			VARCHAR(32)			DEFAULT 'Active'

, code				VARCHAR(32)			UNIQUE
, name				VARCHAR(255)		DEFAULT NULL
, thread_group		VARCHAR(255)		DEFAULT NULL
, composition		VARCHAR(255)		DEFAULT NULL

, UNIQUE(name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
