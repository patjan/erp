DROP   TABLE IF     EXISTS BatchOuts;
CREATE TABLE IF NOT EXISTS BatchOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, parent_id			BIGINT				DEFAULT NULL
, checkout_id		BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, supplier_id		BIGINT				DEFAULT NULL
, batchin_id		BIGINT				DEFAULT NULL
, req_line_id		BIGINT				DEFAULT NULL
, tdyer_thread_id	BIGINT				DEFAULT NULL
, order_thread_id	BIGINT				DEFAULT NULL
, scheduled_date	DATE				DEFAULT NULL
, code				VARCHAR(32)			DEFAULT NULL
, batch				VARCHAR(32)			DEFAULT NULL
, unit_price		DECIMAL(10,2)		DEFAULT 0
, requested_weight	DECIMAL(10,2)		DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, requested_boxes	INT(11)				DEFAULT 0
, reserved_boxes	INT(11)				DEFAULT 0
, checkout_boxes	INT(11)				DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY checkout	(checkout_id)
, KEY thread	(thread_id	)
, KEY batchin	(batchin_id	)
, KEY req_line	(req_line_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE BatchOuts		ADD COLUMN batchin_id		BIGINT		DEFAULT NULL	AFTER thread_id;
ALTER TABLE BatchOuts		ADD COLUMN reserved_boxes	INT			DEFAULT 0		AFTER requested_boxes;

ALTER TABLE BatchOuts		ADD COLUMN tdyer_thread_id	BIGINT		DEFAULT NULL	AFTER req_line_id;
ALTER TABLE BatchOuts		ADD COLUMN order_thread_id	BIGINT		DEFAULT NULL	AFTER tdyer_thread_id;

ALTER TABLE BatchOuts		CHANGE	status			status			VARCHAR(32)		DEFAULT 'Draft';

ALTER TABLE BatchOuts		ADD COLUMN parent_id		BIGINT		DEFAULT NULL	AFTER status;

ALTER TABLE BatchOuts		ADD INDEX batchin		(batchin_id		);
ALTER TABLE BatchOuts		ADD INDEX req_line		(req_line_id	);

ALTER TABLE BatchOuts		ADD COLUMN supplier_id		BIGINT		DEFAULT NULL	AFTER thread_id;

ALTER TABLE BatchOuts		ADD COLUMN scheduled_date	DATE		DEFAULT NULL	AFTER order_thread_id;

//	----------------------------------------------------------------------------

SELECT BatchOuts.*
,   Threads.name			AS	  thread_name
,   Batches.batch			AS     batch_code
, CheckOuts.number			AS  checkout_number
, CheckOuts.requested_at	AS requested_at
, CheckOuts.checkout_at		AS  checkout_at
,  Machines.name			AS   machine_name
,   Partner.nick_name		AS  partner_name
,  Supplier.nick_name		AS  supplier_name
,      Dyer.nick_name		AS      dyer_name

  FROM BatchOuts
  LEFT JOIN   CheckOuts  			ON CheckOuts.id	=		 BatchOuts.checkout_id
  LEFT JOIN     Threads  			ON   Threads.id	=		 BatchOuts.thread_id
  LEFT JOIN     Batches  			ON   Batches.id	=		 BatchOuts.batchin_id
  LEFT JOIN    ReqLines  			ON  ReqLines.id	=		 BatchOuts.req_line_id
  LEFT JOIN    Machines				ON  Machines.id	=		 CheckOuts.machine_id
  LEFT JOIN    Contacts AS Partner	ON   Partner.id	=		 CheckOuts.partner_id
  LEFT JOIN    Contacts AS Supplier	ON  Supplier.id	=		 BatchOuts.supplier_id
  LEFT JOIN    Contacts AS Dyer		ON      Dyer.id	=		 CheckOuts.dyer_id

  WHERE   BatchOuts.status IN ("Draft","Active")

  ORDER BY CheckOuts.requested_at ASC
