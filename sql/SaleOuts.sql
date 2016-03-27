DROP   TABLE IF     EXISTS SaleOuts;
CREATE TABLE IF NOT EXISTS SaleOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, sale_id			BIGINT				DEFAULT NULL
, salecolor_id		BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, assigned_by		BIGINT				DEFAULT NULL	
, requested_at		DATETIME			DEFAULT NULL
, requested_pieces	INT(11)				DEFAULT 0
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_at		DATETIME			DEFAULT NULL
, checkout_pieces	INT(11)				DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY sale		(sale_id		)
, KEY salecolor	(salecolor_id	)
, KEY product	(product_id		)
, KEY color		(color_id		)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='SaleOuts', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='SaleOuts', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='SaleOuts', updated_by=1, updated_at=NOW();
