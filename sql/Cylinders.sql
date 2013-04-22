DROP   TABLE IF     EXISTS Cylinders;
CREATE TABLE IF NOT EXISTS Cylinders
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, machine_id		BIGINT				DEFAULT NULL
, is_current		CHAR(3)				DEFAULT 'No'
, name				VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(machine_id, name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;