DROP   TABLE IF     EXISTS Sales;
CREATE TABLE IF NOT EXISTS Sales
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, sale_number		VARCHAR(32)			DEFAULT NULL
, quotation_id		BIGINT				DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, contact_id		BIGINT				DEFAULT NULL
, needed_date		DATE				DEFAULT NULL
, sold_date			DATE				DEFAULT NULL
, hold_date			DATE				DEFAULT NULL
, sent_date			DATE				DEFAULT NULL
, sold_pieces		INT					DEFAULT 0
, hold_pieces		INT					DEFAULT 0
, sent_pieces		INT					DEFAULT 0
, sold_weight		INT					DEFAULT 0
, hold_weight		INT					DEFAULT 0
, sent_weight		INT					DEFAULT 0
, sold_amount		DECIMAL(10,2)		DEFAULT 0
, adjust_amount		DECIMAL(10,2)		DEFAULT 0
, discount_amount	DECIMAL(10,2)		DEFAULT 0
, advanced_amount	DECIMAL(10,2)		DEFAULT 0
, paid_amount		DECIMAL(10,2)		DEFAULT 0
, interest_rate		DECIMAL( 5,2)		DEFAULT 0
, is_taxable		CHAR(3)				DEFAULT 'yes'
, icms_exemption	CHAR(3)				DEFAULT 'no'
, deduct_cone		CHAR(3)				DEFAULT 'yes'
, payment_type		VARCHAR(255)		DEFAULT NULL
, payments			VARCHAR(255)		DEFAULT NULL	# 30 45 60
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(sale_number)
, KEY quotation	(quotation_id)
, KEY customer 	(customer_id)
, KEY contact 	(contact_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS SaleLines;
CREATE TABLE IF NOT EXISTS SaleLines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, quoted_weight		DECIMAL(7,1)		DEFAULT 0		# Peso da Line
, quoted_units		INT(11)				DEFAULT 0
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, quoted_pieces		INT(11)				DEFAULT 0
, discount			VARCHAR(8)			DEFAULT ''
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY sale		(parent_id)
, KEY product	(product_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS SaleColors;
CREATE TABLE IF NOT EXISTS SaleColors
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

INSERT NextIds	SET table_name='Sales', next_id=1, id_size=5;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Sales', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Sales', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='SaleLines', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='SaleLines', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='SaleLines', updated_by=1, updated_at=NOW();

INSERT NextIds	SET table_name='SaleLines', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='SaleColors', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='SaleColors', updated_by=1, updated_at=NOW();
