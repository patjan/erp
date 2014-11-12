DROP   TABLE IF     EXISTS Restrictions;
CREATE TABLE IF NOT EXISTS Restrictions
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, customer_id		BIGINT				DEFAULT NULL	
, issued_dt			VARCHAR(32)			DEFAULT NULL
, document			VARCHAR(32)			DEFAULT NULL
, bank_name			VARCHAR(255)		DEFAULT NULL
, number			VARCHAR(32)			DEFAULT NULL
, amount			DECIMAL(10,2)		DEFAULT 0
, motive			VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY	(id)
, KEY customer	(customer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Restrictions', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Restrictions', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Restrictions', updated_by=1, updated_at=NOW();
