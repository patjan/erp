DROP   TABLE IF     EXISTS BatchSets;
CREATE TABLE IF NOT EXISTS BatchSets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, batchout_id		BIGINT				DEFAULT NULL
, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_date		DATE				DEFAULT NULL
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, checkin_boxes		INT					DEFAULT 0
, reserved_boxes	INT					DEFAULT 0
, checkout_boxes	INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY batchout	(batchout_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='BatchSets', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='BatchSets', created_by=1, created_at=NOW();

UPDATE	BatchSets	SET	checkin_location = UPPER(checkin_location);

//	----------------------------------------------------------------------------

SELECT BatchSets.*
, BatchOuts.average_weight		AS   average_weight
, BatchOuts.requested_weight	AS requested_weight
, BatchOuts.checkout_weight		AS  checkout_weight
,   Threads.name				AS    thread_name
,   Batches.batch				AS     batch_code
, CheckOuts.number				AS  checkout_number
, CheckOuts.requested_at		AS requested_at
, CheckOuts.checkout_at			AS  checkout_at
,  Machines.name				AS   machine_name
,   Partner.nick_name			AS   partner_name
,  Supplier.nick_name			AS  supplier_name
,      Dyer.nick_name			AS      dyer_name

  FROM BatchSets
  LEFT JOIN   BatchOuts				ON BatchOuts.id	=		 BatchSets.batchout_id
  LEFT JOIN   CheckOuts  			ON CheckOuts.id	=		 BatchOuts.checkout_id
  LEFT JOIN     Threads  			ON   Threads.id	=		 BatchOuts.thread_id
  LEFT JOIN     Batches  			ON   Batches.id	=		 BatchOuts.batchin_id
  LEFT JOIN    ReqLines  			ON  ReqLines.id	=		 BatchOuts.req_line_id
  LEFT JOIN    Machines				ON  Machines.id	=		 CheckOuts.machine_id
  LEFT JOIN    Contacts AS Partner	ON   Partner.id	=		 CheckOuts.partner_id
  LEFT JOIN    Contacts AS Supplier	ON  Supplier.id	=		 CheckOuts.supplier_id
  LEFT JOIN    Contacts AS Dyer		ON      Dyer.id	=		 CheckOuts.dyer_id
  
  WHERE       BatchOuts.status = "Active"

  ORDER BY CheckOuts.checkout_at ASC