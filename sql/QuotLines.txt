DROP   TABLE IF     EXISTS QuotLines;
CREATE TABLE IF NOT EXISTS QuotLines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, quotation_id		BIGINT				DEFAULT NULL
, order_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY quotation	(quotation_id)
, KEY product	(product_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

