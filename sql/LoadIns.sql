DROP   TABLE IF     EXISTS LoadIns;
CREATE TABLE IF NOT EXISTS LoadIns
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, receivedyer_id	BIGINT				DEFAULT NULL
, loadset_id		BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, purchase_line_id	BIGINT				DEFAULT NULL
, code				VARCHAR(32)			DEFAULT NULL
, load				VARCHAR(32)			DEFAULT NULL	/*	????????????????? */
, received_fabrics	INT(11)				DEFAULT 0
, checkin_fabrics	INT(11)				DEFAULT 0
, returned_fabrics	INT(11)				DEFAULT 0
, checkout_fabrics	INT(11)				DEFAULT 0
, labels_printed	INT(11)				DEFAULT 0
, unit_price		DECIMAL(10,2)		DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0
, leftover_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, used_weight		DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY receivedyer	(receivedyer_id)
, KEY product		(product_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='LoadIns', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadIns', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadIns', updated_by=1, updated_at=NOW();



