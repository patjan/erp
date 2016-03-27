DROP   TABLE IF     EXISTS Families;
CREATE TABLE IF NOT EXISTS Families
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'		/*	History, Future	*/

, family_name		VARCHAR(255)		DEFAULT NULL

, UNIQUE(family_name)
, PRIMARY KEY	(id)
, KEY family	(family_name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='Families', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Families', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Families', updated_by=1, updated_at=NOW();

