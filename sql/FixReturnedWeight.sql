SELECT Batches.id
     , Batches.returned_weight
     , SUM(Boxes.real_weight) AS real_weight
  FROM Batches
  LEFT JOIN Boxes ON Boxes.batch_id = Batches.id
				 AND Boxes.status = 'Return' 
 GROUP BY batch_id
HAVING Batches.returned_weight != real_weight
	   ;
	   
CREATE TEMPORARY TABLE Returneds
SELECT batch_id
     , SUM(real_weight) AS real_weight
  FROM Boxes
 GROUP BY batch_id
	   ;
UPDATE Batches
   SET Batches.returned_weight = 0
	   ;
UPDATE Batches, Returneds
   SET Batches.returned_weight = Returneds.real_weight
 WHERE Batches.id = Returneds.batch_id
	   ;