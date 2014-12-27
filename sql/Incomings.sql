DROP   TABLE IF     EXISTS Incomings;
CREATE TABLE IF NOT EXISTS Incomings
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, incoming_number	VARCHAR(32)			DEFAULT NULL
, received_at		DATETIME			DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL
, nfe_dl			VARCHAR(32)			DEFAULT NULL
, nfe_tm			VARCHAR(32)			DEFAULT NULL
, invoice_date		DATE				DEFAULT NULL
, invoice_weight	DECIMAL(10,2)		DEFAULT 0
, invoice_amount	DECIMAL(10,2)		DEFAULT 0
, received_weight	DECIMAL(10,2)		DEFAULT 0
, received_amount	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(incoming_number)
, KEY supplier	(supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Incomings Number', value='100001', created_by=1, created_at=NOW();

ALTER TABLE Incomings	ADD		nfe_tm			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	ADD		nfe_dl			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	DROP	invoice_number;

ALTER TABLE Incomings		CHANGE	real_weight 		received_weight		DECIMAL(10,2) 	DEFAULT 0;
ALTER TABLE Incomings		CHANGE	real_amount			received_amount		DECIMAL(10,2) 	DEFAULT 0;

ALTER TABLE Incomings		CHANGE	number				incoming_number		VARCHAR(32)	DEFAULT NULL;
