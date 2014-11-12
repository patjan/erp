DROP   TABLE IF     EXISTS Recipes;
CREATE TABLE IF NOT EXISTS Recipes
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, dyer_id			BIGINT				DEFAULT NULL	
, color_id			BIGINT				DEFAULT NULL
, composition		VARCHAR(255)		DEFAULT NULL
, recipe			VARCHAR(32)			DEFAULT NULL

, PRIMARY KEY	(id)
, KEY color		(color_id)
, KEY recipe	(recipe)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Recipes', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Recipes', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Recipes', updated_by=1, updated_at=NOW();
