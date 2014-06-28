DROP   TABLE IF     EXISTS LoadSales;
CREATE TABLE IF NOT EXISTS LoadSales
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, loadout_id		BIGINT				DEFAULT NULL
, sale_color_id		BIGINT				DEFAULT NULL
, requested_pieces	INT					DEFAULT 0
, reserved_pieces	INT					DEFAULT 0
, checkout_pieces	INT					DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_pieces	INT					DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY load_sale		(loadout_id, sale_color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadSales', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadSales', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadSales', updated_by=1, updated_at=NOW();

ALTER TABLE LoadSales		ADD		reserved_pieces			INT			DEFAULT 0		AFTER requested_pieces;
