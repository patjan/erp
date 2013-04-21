DROP   TABLE IF     EXISTS Machines;
CREATE TABLE IF NOT EXISTS Machines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, name				VARCHAR(32)			UNIQUE
, machine_type		VARCHAR(32)			DEFAULT NULL
, machine_family	VARCHAR(32)			DEFAULT NULL
, machine_brand		VARCHAR(32)			DEFAULT NULL
, diameter			INT(11)				DEFAULT 0
, width		   		INT(11)				DEFAULT 0
, density			INT(11)				DEFAULT 0
, inputs			INT(11)				DEFAULT 0
, lanes				INT(11)				DEFAULT 0
, serial			VARCHAR(32)			DEFAULT 0
, repair_date		DATE				DEFAULT null
, return_date		DATE				DEFAULT null

, PRIMARY KEY(id)
, UNIQUE(name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;