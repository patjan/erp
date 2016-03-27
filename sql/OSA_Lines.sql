DROP   TABLE IF     EXISTS OSA_Lines;
CREATE TABLE IF NOT EXISTS OSA_Lines
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, peso				DECIMAL(5,2)		DEFAULT 0		# Peso da Peca (12.5) (Kg)
, quoted_units		INT(11)				DEFAULT 0
, units				INT(11)				DEFAULT 1		# Unidades por Peca
, quoted_pieces		INT(11)				DEFAULT 0
, ordered_pieces	INT(11)				DEFAULT 0
, quoted_weight		DECIMAL(9,2)		DEFAULT 0
, ordered_weight	DECIMAL(9,2)		DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY osa		(parent_id)
, KEY product	(product_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='OSA_Lines', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='OSA_Lines', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='OSA_Lines', updated_by=1, updated_at=NOW();

ALTER TABLE OSA_Lines		CHANGE	quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE OSA_Lines		CHANGE	ordered_weight	ordered_weight	DECIMAL(9,2)	DEFAULT 0;

