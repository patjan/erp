DROP   TABLE IF     EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, order_number		VARCHAR(32)			DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, partner_id		BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, ftp_id			BIGINT				DEFAULT NULL
, quot_line_id		BIGINT				DEFAULT NULL
, quotation_number	VARCHAR(32)			DEFAULT NULL
, labels_printed	INT					DEFAULT 0
, fpts_printed		INT					DEFAULT 0
, ops_printed		INT					DEFAULT 0
, ordered_at		DATETIME			DEFAULT NULL
, needed_at			DATETIME			DEFAULT NULL
, produced_at		DATETIME			DEFAULT NULL
, quoted_units		INT					DEFAULT 0
, quoted_pieces		INT					DEFAULT 0
, ordered_pieces	INT					DEFAULT 0
, rejected_pieces	INT					DEFAULT 0
, produced_pieces	INT					DEFAULT 0
, checkout_pieces	INT					DEFAULT 0
, returned_pieces	INT					DEFAULT 0
, quoted_weight		DECIMAL(10,2)		DEFAULT 0
, ordered_weight	DECIMAL(10,2)		DEFAULT 0
, produced_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0


, PRIMARY KEY	(id)
, UNIQUE		(order_number)
, KEY customer 	(customer_id)
, KEY machine 	(machine_id)
, KEY partner	(partner_id)
, KEY product	(product_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Orders', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Orders', created_by=1, created_at=NOW();

INSERT Controls SET group_set='System Numbers'		, status='Active', sequence=  50, name='Next Order Number', value='100001', created_by=1, created_at=NOW();

ALTER TABLE Orders			ADD COLUMN returned_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN checkout_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN ordered_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			CHANGE	status			status			VARCHAR(32)		DEFAULT 'Draft';

ALTER TABLE Orders			ADD COLUMN ops_printed		INT				DEFAULT 0		AFTER labels_printed;
ALTER TABLE Orders			ADD COLUMN ftps_printed		INT				DEFAULT 0		AFTER labels_printed;

ALTER TABLE Orders			ADD COLUMN quot_line_id		BIGINT			DEFAULT NULL	AFTER ftp_id;
ALTER TABLE Orders			ADD COLUMN quotation_number VARCHAR(32)		DEFAULT NULL	AFTER quot_line_id;
ALTER TABLE Orders			ADD COLUMN quoted_pieces	INT				DEFAULT 0		AFTER produced_at;
ALTER TABLE Orders			ADD COLUMN quoted_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;

ALTER TABLE Orders			ADD COLUMN returned_pieces	INT				DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN checkout_pieces	INT				DEFAULT 0		AFTER produced_pieces;

ALTER TABLE Orders			ADD COLUMN quoted_units		INT				DEFAULT 0		AFTER produced_at;
ALTER TABLE Orders			ADD COLUMN produced_weight	DECIMAL(10,2)	DEFAULT 0		AFTER ordered_weight;
