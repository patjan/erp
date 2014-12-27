DROP   TABLE IF     EXISTS LoadSets;
CREATE TABLE IF NOT EXISTS LoadSets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, load_quot_id		BIGINT				DEFAULT NULL
, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_date		DATE				DEFAULT NULL
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, checkin_pieces	INT					DEFAULT 0
, reserved_pieces	INT					DEFAULT 0
, checkout_pieces	INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY loadsale	(loadsale_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadSets', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='LoadSets', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='LoadSets', updated_by=1, updated_at=NOW();

