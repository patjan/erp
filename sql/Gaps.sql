CREATE TABLE IF NOT EXISTS Gaps
( id				BIGINT				NOT NULL AUTO_INCREMENT
, gap_starts_at		BIGINT				DEFAULT NULL
, gap_ends_at		BIGINT				DEFAULT NULL


INSERT INTO Gaps
SELECT	null,
		(t1.id + 1) as gap_starts_at, 
		(SELECT MIN(t3.id) -1 FROM Pieces t3 WHERE t3.id > t1.id) as gap_ends_at
FROM Pieces t1
WHERE NOT EXISTS (SELECT t2.id FROM Pieces t2 WHERE t2.id = t1.id + 1)
HAVING gap_ends_at IS NOT NULL


SELECT *, gap_ends_at - gap_starts_at
  FROM Gaps
 WHERE gap_starts_at != gap_ends_at;
