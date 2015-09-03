DROP   TABLE IF     EXISTS Purchases;
CREATE TABLE IF NOT EXISTS Purchases
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, purchase_number	VARCHAR(32)			DEFAULT NULL
, source_doc		VARCHAR(32)			DEFAULT NULL
, ordered_at		DATETIME			DEFAULT NULL
, expected_date		DATE				DEFAULT NULL
, scheduled_at		DATETIME			DEFAULT NULL
, expected_weight	DECIMAL(10,2)		DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, supplier_id		BIGINT				DEFAULT NULL
, supplier_ref      VARCHAR(32)			DEFAULT NULL
, payment_term      VARCHAR(255)		DEFAULT NULL
, remarks			VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(purchase_number)
, KEY supplier(supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Purchase Number', value='100001', created_by=1, created_at=NOW();

ALTER TABLE Purchases	ADD COLUMN received_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Purchases	ADD COLUMN expected_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Purchases		CHANGE	number				purchase_number		VARCHAR(32)	DEFAULT NULL;

ALTER TABLE Purchases		ADD COLUMN remarks			VARCHAR(255)	DEFAULT NULL	AFTER payment_term;
