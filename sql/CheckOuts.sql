DROP   TABLE IF     EXISTS CheckOuts;
CREATE TABLE IF NOT EXISTS CheckOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, number			VARCHAR(32)			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, partner_id		BIGINT				DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, nfe_dl			VARCHAR(32)			DEFAULT NULL
, nfe_tm			VARCHAR(32)			DEFAULT NULL
, requested_date	DATE				DEFAULT NULL
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_amount	DECIMAL(10,2)		DEFAULT 0
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, requested_amount	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(number)
, KEY machine	(machine_id)
, KEY supplier	(supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next CheckOut Number', value='100001', created_by=1, created_at=NOW();

ALTER TABLE CheckOuts		CHANGE	checkout_id		supplier_id			BIGINT;
ALTER TABLE CheckOuts		CHANGE	invoice_date	requested_date		DATE;
ALTER TABLE CheckOuts		CHANGE	real_weight		requested_weight	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	real_amount		requested_amount	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_weight	checkout_weight		DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_amount	checkout_amount		DECIMAL(10,2);

ALTER TABLE CheckOuts		CHANGE	requested_weight	requested_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	requested_amount	requested_amount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_weight		checkout_weight		DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_amount		checkout_amount		DECIMAL(10,2)	DEFAULT 0;

ALTER TABLE CheckOuts		ADD COLUMN dyer_id			BIGINT		DEFAULT NULL	AFTER supplier_id;

ALTER TABLE CheckOuts		CHANGE	requested_date		requested_at		DATETIME	DEFAULT NULL;

ALTER TABLE CheckOuts		ADD COLUMN partner_id		BIGINT		DEFAULT NULL	AFTER machine_id;
