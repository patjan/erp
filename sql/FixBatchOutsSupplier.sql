CREATE TEMPORARY TABLE Suppliers
SELECT BatchOuts.id, Incoming.supplier_id
  FROM BatchOuts
  LEFT JOIN Batches			AS BatchIn	ON BatchIn.id	= BatchOuts.batchin_id
  LEFT JOIN Incomings  		AS Incoming	ON Incoming.id	= BatchIn.incoming_id

	   ;
UPDATE BatchOuts, Suppliers
   SET BatchOuts.supplier_id = Suppliers.supplier_id
 WHERE BatchOuts.id = Suppliers.id
	   ;