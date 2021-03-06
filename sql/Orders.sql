DROP   TABLE IF     EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, order_number		VARCHAR(32)			DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, ftp_id			BIGINT				DEFAULT NULL
, machine_id		BIGINT				DEFAULT NULL
, partner_id		BIGINT				DEFAULT NULL
, osa_line_id		BIGINT				DEFAULT NULL
, osa_number		VARCHAR(32)			DEFAULT NULL
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
, location			VARCHAR(4)			DEFAULT NULL

, PRIMARY KEY	(id)
, UNIQUE		(order_number)
, KEY customer 	(customer_id)
, KEY machine 	(machine_id)
, KEY partner	(partner_id)
, KEY product	(product_id)
, KEY color		(color_id)
, KEY ftp		(ftp_id)
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

ALTER TABLE Orders			CHANGE	quot_line_id		osa_line_id		BIGINT			DEFAULT NULL;
ALTER TABLE Orders			CHANGE	quotation_number	osa_number		VARCHAR(32)		DEFAULT NULL;

ALTER TABLE Orders			ADD		color_id				BIGINT			DEFAULT NULL	AFTER product_id;

ALTER TABLE Orders			ADD		location				VARCHAR(4)		DEFAULT NULL	AFTER returned_weight;

ALTER TABLE Orders		ADD INDEX color			(color_id		);
ALTER TABLE Orders		ADD INDEX ftp			(ftp_id			);



SELECT Orders.*
	 ,  Customer.nick_name		AS  customer_name
	 ,   Machine.name			AS   machine_name
	 ,   Partner.nick_name		AS   partner_name
	 ,     Color.color_name		AS     color_name
	 ,       FTP.ftp_number		AS       ftp_number
	 ,   Product.product_name	AS   product_name

  FROM Orders
  LEFT JOIN    Contacts AS Customer	ON  Customer.id	=	Orders.customer_id
  LEFT JOIN    Machines AS Machine	ON   Machine.id	=	Orders.machine_id
  LEFT JOIN    Contacts AS Partner	ON   Partner.id	=	Orders.partner_id
  LEFT JOIN    Products AS Product	ON   Product.id	=	Orders.product_id
  LEFT JOIN      Colors AS Color	ON     Color.id	=	Orders.color_id
  LEFT JOIN        FTPs AS FTP		ON       FTP.id	=	Orders.ftp_id

 WHERE Orders.id = 200384

 
SELECT COUNT(*) AS revised_pieces
  FROM Pieces
 WHERE order_id = $row['id']
   AND status != "Active"
 