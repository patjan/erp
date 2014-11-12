DROP   TABLE IF     EXISTS NFEs;
CREATE TABLE IF NOT EXISTS NFEs
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, nfe_key			VARCHAR(64)			DEFAULT NULL
, nfe_number		BIGINT				DEFAULT NULL
, vendor_id			BIGINT				DEFAULT NULL
, vendor_name     	VARCHAR(255)		DEFAULT NULL
, vendor_type		VARCHAR(32)			DEFAULT 'Tinturaria'
, invoice_date		DATE				DEFAULT NULL
, invoice_pieces	INT					DEFAULT 0
, invoice_weight	DECIMAL(10,2)		DEFAULT 0
, invoice_amount	DECIMAL(10,2)		DEFAULT 0
, received_pieces	INT					DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, received_amount	DECIMAL(10,2)		DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(nfe_key)
, KEY vendor 	(vendor_id)
, KEY nfe_number(nfe_number)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='NFEs', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='NFes', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='NFEs', updated_by=1, updated_at=NOW();


DROP   TABLE IF     EXISTS NFEItems;
CREATE TABLE IF NOT EXISTS NFEItems
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, nfe_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, product_code		VARCHAR(32)			DEFAULT NULL
, product_name     	VARCHAR(255)		DEFAULT NULL
, ncm				INT					DEFAULT NULL
, total_pieces		INT					DEFAULT 0
, total_weight		DECIMAL(10,2)		DEFAULT 0
, total_amount		DECIMAL(10,2)		DEFAULT 0
, unit_price		DECIMAL(10,2)		DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY nfe	 	(nfe_id)
, KEY prod_id	(product_id)
, KEY product	(product_name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='NFEItems', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='NFeItems', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='NFEItems', updated_by=1, updated_at=NOW();
