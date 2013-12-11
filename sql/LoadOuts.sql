DROP   TABLE IF     EXISTS LoadOuts;
CREATE TABLE IF NOT EXISTS LoadOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, load_number		VARCHAR(32)			DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, requested_at		DATETIME			DEFAULT NULL
, requested_pieces	INT					DEFAULT 0
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, loadout_at		DATETIME			DEFAULT NULL
, loadout_pieces	INT					DEFAULT 0
, loadout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_at		DATETIME			DEFAULT NULL
, returned_pieces	INT					DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(load_number)
, KEY dyer		(dyer_id)
, KEY color		(color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadOuts', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadOuts', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadOuts', created_by=1, created_at=NOW();
