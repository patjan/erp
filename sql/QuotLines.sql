DROP   TABLE IF     EXISTS QuotLines;
CREATE TABLE IF NOT EXISTS QuotLines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, osa_line_id		BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, quoted_units		INT(11)				DEFAULT 0
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, quoted_pieces		INT(11)				DEFAULT 0
, discount			VARCHAR(8)			DEFAULT ''
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY quotation	(parent_id)
, KEY product	(product_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE QuotLines		CHANGE	quotation_id	parent_id		BIGINT			DEFAULT NULL;

ALTER TABLE QuotLines		ADD		units					INT(11)			DEFAULT 1		AFTER product_id;
ALTER TABLE QuotLines		ADD		quoted_units			INT(11)			DEFAULT 0		AFTER product_id;
ALTER TABLE QuotLines		ADD		peso					DECIMAL(5,2)	DEFAULT 0		AFTER product_id;

ALTER TABLE QuotLines		ADD COLUMN remarks				TEXT			DEFAULT NULL	AFTER quoted_pieces;

ALTER TABLE QuotLines		CHANGE	order_id			osa_line_id		BIGINT			DEFAULT NULL;

ALTER TABLE QuotLines		ADD COLUMN discount				VARCHAR(8)		DEFAULT ''		AFTER quoted_pieces;

ALTER TABLE QuotLines		ADD COLUMN machine_id			BIGINT			DEFAULT NULL	AFTER product_id;
