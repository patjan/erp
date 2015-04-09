DROP   TABLE IF     EXISTS OSA_Colors;
CREATE TABLE IF NOT EXISTS OSA_Colors
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, ftp_id			BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, partner_id		BIGINT				DEFAULT NULL
, color_type		VARCHAR(32)			DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, quoted_weight		DECIMAL(10,2)		DEFAULT 0
, ordered_pieces	INT					DEFAULT 0
, ordered_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY parent(parent_id	)
, KEY color	(color_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='OSA_Colors', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='OSA_Colors', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='OSA_Colors', updated_by=1, updated_at=NOW();
