DROP   TABLE IF     EXISTS Requests;
CREATE TABLE IF NOT EXISTS Requests
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, number			VARCHAR(32)			DEFAULT NULL
, source_doc		VARCHAR(32)			DEFAULT NULL
, ordered_at		DATETIME			DEFAULT NULL
, requested_date	DATE				DEFAULT NULL
, scheduled_at		DATETIME			DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL
, supplier_ref      VARCHAR(32)			DEFAULT NULL
, payment_term      VARCHAR(255)		DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(number)
, KEY machine 	(machine_id)
, KEY supplier	(supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=100001
;
 
INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Request Number', value='100001', created_by=1, created_at=NOW()

ALTER TABLE Requests		CHANGE	expected_date	requested_date		DATE;
ALTER TABLE Requests		CHANGE	checkout_id		supplier_id			BIGINT;
ALTER TABLE Requests		CHANGE	checkout_ref	supplier_ref		VARCHAR(32);
