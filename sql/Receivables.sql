DROP   TABLE IF     EXISTS Receivables;
CREATE TABLE IF NOT EXISTS Receivables
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Closed'	# Active, Closed, History	

, customer_id		BIGINT				DEFAULT NULL
, sale_id			BIGINT				DEFAULT NULL
, transaction_date	DATE				DEFAULT NULL
, transaction_type	VARCHAR(32)			DEFAULT NULL	# sales return interest discount payment waived refund
, debit_amount		DECIMAL(10,2)		DEFAULT 0
, credit_amount		DECIMAL(10,2)		DEFAULT 0
, document			VARCHAR(255)		DEFAULT NULL	# 30 45 60
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, KEY customer		 	(customer_id)
, KEY transaction_date	(transaction_date)
, KEY transaction_type	(transaction_type)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Receivables', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Receivables', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Receivables', updated_by=1, updated_at=NOW();

