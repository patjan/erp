DROP   TABLE IF     EXISTS TDyerColors;
CREATE TABLE IF NOT EXISTS TDyerColors
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, parent_id			BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, color_recipe		VARCHAR(32)			DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, ordered_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY parent	(parent_id	)
, KEY color		(color_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
