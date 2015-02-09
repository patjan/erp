DROP   TABLE IF     EXISTS LoadQuotations;
CREATE TABLE IF NOT EXISTS LoadQuotations
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, loadout_id		BIGINT				DEFAULT NULL
, quot_color_id		BIGINT				DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, quoted_weight		DECIMAL(7,1)		DEFAULT 0
, reserved_pieces	INT					DEFAULT 0
, reserved_weight	DECIMAL(7,1)		DEFAULT 0
, checkout_pieces	INT					DEFAULT 0
, checkout_weight	DECIMAL(7,1)		DEFAULT 0
, returned_pieces	INT					DEFAULT 0
, returned_weight	DECIMAL(7,1)		DEFAULT 0

, PRIMARY KEY(id)
, KEY loadout		(loadout_id)
, KEY quot_color	(quot_color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadQuotations', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadQuotations', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadQuotations', updated_by=1, updated_at=NOW();

ALTER TABLE LoadQuotations		ADD		reserved_weight			DECIMAL(7,1)	DEFAULT 0		AFTER quoted_weight;
ALTER TABLE LoadQuotations		ADD		reserved_pieces			INT				DEFAULT 0		AFTER quoted_weight;

