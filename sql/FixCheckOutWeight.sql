SELECT Batches.id
     , Batches.checkout_weight
     , SUM(IF (Boxes.real_weight > 0, Boxes.real_weight, Boxes.average_weight)) AS calculated_weight
  FROM Batches
  LEFT JOIN Boxes ON Boxes.batch_id = Batches.id
				 AND Boxes.status = 'Check Out' 
 GROUP BY batch_id
HAVING Batches.checkout_weight != calculated_weight
	   ;
	   
CREATE TEMPORARY TABLE Summaries
SELECT batch_id
     , SUM(IF (real_weight > 0, real_weight, average_weight)) AS calculated_weight
  FROM Boxes
 WHERE status = 'Check Out' 
 GROUP BY batch_id
	   ;
UPDATE Batches
   SET Batches.checkout_weight = 0
	   ;
UPDATE Batches, Summaries
   SET Batches.checkout_weight = Summaries.calculated_weight
 WHERE Batches.id = Summaries.batch_id
	   ;