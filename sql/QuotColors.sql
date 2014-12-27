DROP   TABLE IF     EXISTS QuotColors;
CREATE TABLE IF NOT EXISTS QuotColors
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, quoted_units		DECIMAL(7,1)		DEFAULT 0
, quoted_price		DECIMAL(10,2)		DEFAULT 0
, product_price		DECIMAL(10,2)		DEFAULT 0
, discount			VARCHAR(8)			DEFAULT ''

, PRIMARY KEY(id)
, KEY parent(parent_id	)
, KEY color	(color_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE QuotColors		CHANGE	color_group		color_type		VARCHAR(32)		DEFAULT NULL;
UPDATE 		QuotColors 		SET QuotColors.color_type = (SELECT Colors.color_type FROM Colors WHERE Colors.id = QuotColors.color_id );

ALTER TABLE QuotColors		CHANGE	quoted_pieces	quoted_units	INT				DEFAULT 0;
ALTER TABLE QuotColors		CHANGE	fabric_price	quoted_price	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE QuotColors		CHANGE	punho_price		product_price	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE QuotColors		DROP	gola_price		;
ALTER TABLE QuotColors		DROP	galao_price		;

ALTER TABLE QuotColors		ADD COLUMN discount				VARCHAR(8)		DEFAULT ''		AFTER product_price;

ALTER TABLE QuotColors		ADD COLUMN dyer_id				BIGINT			DEFAULT NULL	AFTER parent_id;

ALTER TABLE QuotColors		CHANGE	quoted_units	quoted_units	DECIMAL(7,1)	DEFAULT 0;