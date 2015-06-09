//	----------------------------------------------------------------------------

SELECT QuotColors.*
, QuotColors.id					AS			 id
, QuotColors.quoted_units		AS    quoted_units
,      Color.color_name			AS     color_name
,      Color.color_type			AS     color_type
,       Dyer.nick_name			AS      dyer_name
,   QuotLine.product_id			AS	 product_id
,   QuotLine.machine_id			AS	 machine_id
,   QuotLine.peso				AS			 peso
,   QuotLine.units				AS			 units
,  Quotation.quotation_number	AS quotation_number
,  Quotation.quoted_at			AS    quoted_at
,    Product.product_name		AS   product_name
,   Customer.nick_name			AS  customer_name

  FROM QuotColors
  LEFT JOIN      Colors AS Color 		ON     Color.id	=	QuotColors.color_id
  LEFT JOIN    Contacts AS Dyer			ON		Dyer.id	=	QuotColors.dyer_id
  LEFT JOIN   QuotLines AS QuotLine		ON  QuotLine.id	=	QuotColors.parent_id
  LEFT JOIN  Quotations AS Quotation	ON Quotation.id	=	  QuotLine.parent_id
  LEFT JOIN    Products AS Product		ON   Product.id	=	  QuotLine.product_id
  LEFT JOIN    Contacts AS Customer		ON  Customer.id	=	 Quotation.customer_id

 WHERE Quotation.status IN ("Draft", "Active")
   AND QuotColors.color_id		= 100219

 ORDER BY Quotation.quotation_number
 LIMIT 999

foreach($rows as $row) {
	$sql = 'SELECT composition FROM FTPs WHERE product_id = ' . $row['product_id'] . ' LIMIT 1';
	$my_composition = $db->fetchOne($sql);
	$rows[$n]['composition'] = ($my_composition) ? $my_composition : '';

	$sql = 'SELECT SUM(quoted_pieces) AS pieces, SUM(quoted_weight) AS weight FROM LoadQuotations WHERE quot_color_id = ' . $row['id'];
	$my_assigned = $db->fetchRow($sql);
	$rows[$n]['assigned_pieces'] = $my_assigned['pieces'];
	$rows[$n]['assigned_weight'] = $my_assigned['weight'];

	$n++;
}
