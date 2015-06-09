//	----------------------------------------------------------------------------

SELECT QuotColors.id				AS			 id
,      QuotColors.quoted_units		AS    quoted_units
,           Color.id				AS     color_id
,           Color.color_name		AS     color_name
,           Color.color_type		AS     color_type
,        QuotLine.peso				AS			 peso
,        QuotLine.units				AS			 units

  FROM QuotColors
  LEFT JOIN      Colors AS Color 		ON     Color.id	=	QuotColors.color_id
  LEFT JOIN   QuotLines AS QuotLine		ON  QuotLine.id	=	QuotColors.parent_id
  LEFT JOIN  Quotations AS Quotation	ON Quotation.id	=	  QuotLine.parent_id

 WHERE Quotation.status IN ("Draft", "Active")
   AND Color.id IS NOT NULL

 ORDER BY Color.color_name

 
foreach($rows as $row) {
	$sql = 'SELECT SUM(quoted_pieces) AS pieces, SUM(quoted_weight) AS weight FROM LoadQuotations WHERE quot_color_id = ' . $row['id'];
	$my_assigned = $db->fetchRow($sql);
	$rows[$n]['assigned_pieces'] = $my_assigned['pieces'];
	$rows[$n]['assigned_weight'] = $my_assigned['weight'];
	$n++;
}
  