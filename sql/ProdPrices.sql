DROP   TABLE IF     EXISTS ProdPrices;
CREATE TABLE IF NOT EXISTS ProdPrices
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, product_id		BIGINT				DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, previous_date		DATE				DEFAULT NULL
, previous_price	DECIMAL(10,2)		DEFAULT 0
, active_date		DATE				DEFAULT NULL
, active_price		DECIMAL(10,2)		DEFAULT 0
, next_date			DATE				DEFAULT NULL
, next_price		DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY	(id)
, KEY product	(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;




UPDATE Colors	SET color_type	= 'Bco'			WHERE color_type = 'CL';
UPDATE Colors	SET color_type	= 'Clara'		WHERE color_type = 'MD';
UPDATE Colors	SET color_type	= 'Media'		WHERE color_type = 'EC';
UPDATE Colors	SET color_type	= 'Intermedia'	WHERE color_type = 'EP';
UPDATE Colors	SET color_type	= 'Escura'		WHERE color_type = 'SE';
UPDATE Colors	SET color_type	= 'Mescla'		WHERE color_type = 'MC';
UPDATE Colors	SET color_type	= 'Unico'		WHERE color_type = 'UN';
UPDATE Colors	SET color_type	= 'Branco'		WHERE color_type = 'BR';
UPDATE Colors	SET color_type	= 'Preto'		WHERE color_type = 'PR';
UPDATE Colors	SET color_type	= 'Fraca'		WHERE color_type = 'FC';
UPDATE Colors	SET color_type	= 'Forte'		WHERE color_type = 'FT';

UPDATE Colors	SET color_name	= LCASE(color_name);
