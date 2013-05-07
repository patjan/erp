DROP   TABLE IF     EXISTS Tickets;
CREATE TABLE IF NOT EXISTS Tickets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, company_id		BIGINT				DEFAULT NULL
, opened_by			BIGINT				DEFAULT NULL
, opened_at			DATETIME			DEFAULT NULL
, assigned_to		BIGINT				DEFAULT NULL
, assigned_at		DATETIME			DEFAULT NULL
, closed_by			BIGINT				DEFAULT NULL
, closed_at			DATETIME			DEFAULT NULL
, priority			VARCHAR(32)			DEFAULT NULL
, description		TEXT				DEFAULT NULL
, resolution		TEXT				DEFAULT NULL
, attachments		TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY opened_by		(opened_by		)
, KEY opened_at		(opened_at		)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
