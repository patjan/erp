DROP   TABLE IF     EXISTS LoadSets;
CREATE TABLE IF NOT EXISTS LoadSets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, load_quot_id		BIGINT				DEFAULT NULL
, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_date		DATE				DEFAULT NULL
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, checkin_pieces	INT					DEFAULT 0
, reserved_pieces	INT					DEFAULT 0
, checkout_pieces	INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY loadsale	(loadsale_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadSets', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='LoadSets', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='LoadSets', updated_by=1, updated_at=NOW();


SELECT LoadSets.*
,   LoadOut.loadout_number		AS   loadout_number
,   LoadOut.requested_at		AS requested_at
,   LoadOut.checkout_at			AS  checkout_at
,      Dyer.nick_name			AS      dyer_name
,     Color.color_name			AS     color_name
, Quotation.quotation_number	AS quotation_number
,  Customer.nick_name			AS  customer_name
,   Product.id					AS   product_id
,   Product.product_name		AS   product_name
, CEIL(QuotColor.quoted_units / QuotLine.units)	AS      sold_pieces

  FROM LoadSets
  LEFT JOIN LoadQuotations AS LoadQuot	ON  LoadQuot.id =         LoadSets.load_quot_id
  LEFT JOIN       LoadOuts AS LoadOut	ON   LoadOut.id	=		  LoadQuot.loadout_id
  LEFT JOIN     QuotColors AS QuotColor	ON QuotColor.id	=		  LoadQuot.quot_color_id
  LEFT JOIN       Contacts AS Dyer		ON      Dyer.id	=		   LoadOut.dyer_id
  LEFT JOIN         Colors AS Color		ON     Color.id	=		 QuotColor.color_id
  LEFT JOIN      QuotLines AS QuotLine	ON  QuotLine.id	=		 QuotColor.parent_id
  LEFT JOIN     Quotations AS Quotation	ON Quotation.id	=		  QuotLine.parent_id
  LEFT JOIN       Products AS Product	ON   Product.id	=		  QuotLine.product_id
  LEFT JOIN       Contacts AS Customer	ON  Customer.id	=		 Quotation.customer_id

  WHERE        LoadSets.status		= "Active"
  AND ( LoadSets.checkin_location	LIKE "marinho%"
  OR  LoadSets.checkin_date			LIKE "marinho%"
  OR  LoadSets.checkin_weight		LIKE "marinho%"
  OR  LoadSets.checkin_pieces		LIKE "marinho%"
  OR  LoadSets.reserved_pieces		LIKE "marinho%"
  OR  LoadSets.checkout_pieces		LIKE "marinho%"
  OR   LoadOut.loadout_number		LIKE "marinho%"
  OR  Customer.nick_name			LIKE "marinho%"
  OR      Dyer.nick_name			LIKE "marinho%"
  OR     Color.color_name			LIKE "marinho%"
  OR   Product.product_name			LIKE "marinho%")

  ORDER BY LoadOut.checkout_at ASC
  LIMIT 1000