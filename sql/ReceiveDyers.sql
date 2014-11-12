DROP   TABLE IF     EXISTS ReceiveDyers;
CREATE TABLE IF NOT EXISTS ReceiveDyers
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, receive_number	VARCHAR(32)			DEFAULT NULL
, received_at		DATETIME			DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, nfe_dl			VARCHAR(32)			DEFAULT NULL
, nfe_tm			VARCHAR(32)			DEFAULT NULL
, invoice_date		DATE				DEFAULT NULL
, invoice_weight	DECIMAL(10,2)		DEFAULT 0
, invoice_amount	DECIMAL(10,2)		DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, received_amount	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(receive_number)
, KEY dyer	(dyer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='ReceiveDyers', next_id=1, id_size=5;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='ReceiveDyers', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='ReceiveDyers', updated_by=1, updated_at=NOW();
