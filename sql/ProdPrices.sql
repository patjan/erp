DROP   TABLE IF     EXISTS ProdPrices;
CREATE TABLE IF NOT EXISTS ProdPrices
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'		/*	History, Future	*/

, product_id		BIGINT				DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, current_price		DECIMAL(10,2)		DEFAULT 0
, new_price			DECIMAL(10,2)		DEFAULT 0
, effective_date	DATE				DEFAULT NULL

, PRIMARY KEY	(id)
, KEY product	(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
