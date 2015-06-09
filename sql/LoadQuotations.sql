DROP   TABLE IF     EXISTS LoadQuotations;
CREATE TABLE IF NOT EXISTS LoadQuotations
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, loadout_id		BIGINT				DEFAULT NULL
, quot_color_id		BIGINT				DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, quoted_weight		DECIMAL(7,1)		DEFAULT 0
, reserved_pieces	INT					DEFAULT 0
, reserved_weight	DECIMAL(7,1)		DEFAULT 0
, checkout_pieces	INT					DEFAULT 0
, checkout_weight	DECIMAL(7,1)		DEFAULT 0
, returned_pieces	INT					DEFAULT 0
, returned_weight	DECIMAL(7,1)		DEFAULT 0

, PRIMARY KEY(id)
, KEY loadout		(loadout_id)
, KEY quot_color	(quot_color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadQuotations', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadQuotations', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadQuotations', updated_by=1, updated_at=NOW();

ALTER TABLE LoadQuotations		ADD		reserved_weight			DECIMAL(7,1)	DEFAULT 0		AFTER quoted_weight;
ALTER TABLE LoadQuotations		ADD		reserved_pieces			INT				DEFAULT 0		AFTER quoted_weight;

/* ------------------------------------------------------------------------- */

SELECT LoadQuotations.*
,   LoadOut.loadout_number		AS   loadout_number
,   LoadOut.requested_at		AS requested_at
, Quotation.quotation_number	AS quotation_number
,      Dyer.nick_name			AS      dyer_name
,     Color.id					AS     color_id
,     Color.color_name			AS     color_name
,  Customer.nick_name			AS  customer_name
,   Product.id					AS   product_id
,   Product.product_name		AS   product_name

   FROM LoadQuotations
   LEFT JOIN    LoadOuts AS LoadOut		ON   LoadOut.id	=	LoadQuotations.loadout_id
   LEFT JOIN  QuotColors AS QuotColor	ON QuotColor.id	=	LoadQuotations.quot_color_id
   LEFT JOIN    Contacts AS Dyer    	ON      Dyer.id =          LoadOut.dyer_id
   LEFT JOIN   QuotLines AS QuotLine	ON  QuotLine.id	=		 QuotColor.parent_id
   LEFT JOIN      Colors AS Color     	ON     Color.id =        QuotColor.color_id
   LEFT JOIN  Quotations AS Quotation	ON Quotation.id	=		  QuotLine.parent_id
   LEFT JOIN    Products AS Product		ON   Product.id	=		  QuotLine.product_id
   LEFT JOIN    Contacts AS Customer	ON  Customer.id	=		 Quotation.customer_id

  WHERE   LoadQuotations.status IN ("Draft","Active")
  ORDER BY LoadOut.loadout_number DESC


SELECT LoadQuotations.*
,   LoadOut.loadout_number		AS   loadout_number
,   LoadOut.requested_at		AS requested_at
, Quotation.quotation_number	AS quotation_number
,      Dyer.nick_name			AS      dyer_name
,     Color.id					AS     color_id
,     Color.color_name			AS     color_name
,  Customer.nick_name			AS  customer_name
,   Product.id					AS   product_id
,   Product.product_name		AS   product_name

  FROM LoadQuotations
  LEFT JOIN    LoadOuts AS LoadOut		ON   LoadOut.id	=	LoadQuotations.loadout_id
  LEFT JOIN  QuotColors AS QuotColor	ON QuotColor.id	=	LoadQuotations.quot_color_id
  LEFT JOIN    Contacts AS Dyer     	ON      Dyer.id =          LoadOut.dyer_id
  LEFT JOIN   QuotLines AS QuotLine		ON  QuotLine.id	=		 QuotColor.parent_id
  LEFT JOIN      Colors AS Color    	ON     Color.id =        QuotColor.color_id
  LEFT JOIN  Quotations AS Quotation	ON Quotation.id	=		  QuotLine.parent_id
  LEFT JOIN    Products AS Product		ON   Product.id	=		  QuotLine.product_id
  LEFT JOIN    Contacts AS Customer		ON  Customer.id	=		 Quotation.customer_id

  WHERE LoadQuotations.id = 8000000029