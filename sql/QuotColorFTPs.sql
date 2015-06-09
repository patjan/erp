SELECT DISTINCT FTPs.id

  FROM QuotColors
  LEFT JOIN QuotLines ON QuotLines.id = QuotColors.parent_id
  LEFT JOIN FTPs   ON FTPs.product_id = QuotLines.product_id

 WHERE QuotColors.id=1000000022
 ORDER BY FTPs.ftp_number
 LIMIT 1
