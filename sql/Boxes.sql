DROP   TABLE IF     EXISTS Boxes;
CREATE TABLE IF NOT EXISTS Boxes
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Active	> Check In
															# Check In	> Check Out
															# Check Out	> Return
															# Return	> Check Out
, batch_id			BIGINT				DEFAULT NULL
, parent_id			BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL
, is_printed		CHAR(3)				DEFAULT 'No'
, number_of_boxes	INT(11)				DEFAULT 0
, number_of_cones	INT(11)				DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, real_weight		DECIMAL(10,2)		DEFAULT 0

, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_by		BIGINT				DEFAULT NULL
, checkin_at		DATETIME			DEFAULT NULL
, checkout_location	VARCHAR(32)			DEFAULT NULL		# machine name or dyer name
, checkout_by		BIGINT				DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, returned_location	CHAR(4)				DEFAULT NULL
, returned_by		BIGINT				DEFAULT NULL
, returned_at		DATETIME			DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode	(barcode)
, KEY batch		(batch_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Box Number', value='1000000001', created_by=1, created_at=NOW();

ALTER TABLE Boxes	ADD		number_of_cones		INT(11)		DEFAULT 0		AFTER barcode;
ALTER TABLE Boxes	ADD		number_of_boxes		INT(11)		DEFAULT 0		AFTER barcode;
ALTER TABLE Boxes	ADD		is_printed			CHAR(3)		DEFAULT 'No'	AFTER barcode;

UPDATE Boxes	SET is_printed = 'Yes';

UPDATE Boxes	SET	average_weight = 30.94	WHERE batch_id = 8;

ALTER TABLE Boxes		CHANGE	stocked_location	returned_location	CHAR(4) 	DEFAULT NULL;
ALTER TABLE Boxes		CHANGE	stocked_by			returned_by			BIGINT		DEFAULT NULL;
ALTER TABLE Boxes		CHANGE	stocked_at			returned_at			DATETIME	DEFAULT NULL;

http://erp:8100/index.php/ajax?data={"method":"print_labels","table":"Boxes"}


SELECT Boxes.checkin_location		AS location
	 , MIN(Boxes.checkin_at)		AS checkin_at
	 , COUNT(*)						AS total_boxes
	 , SUM(IF( Boxes.real_weight = 0, Boxes.average_weight, Boxes.real_weight))	AS total_weight
  FROM Boxes
  LEFT JOIN Batches	ON Batches.id = Boxes.batch_id
 WHERE Boxes.status = 'Check In'
   AND Batches.thread_id = 112
 GROUP BY Boxes.checkin_location
 ORDER BY Boxes.checkin_location
 
location 	thread_id 	checkin_at 				total_boxes 	total_weight
1A23 		112 		2013-08-08 08:01:10 	6 				179.76
2B23 		77 			2013-08-08 10:35:42 	5 				148.80
3C34 		112 		2013-08-08 10:36:20 	10 				300.50

location 	checkin_at 				total_boxes 	total_weight
1A23 		2013-08-08 08:01:10 	6 				179.76
3C34 		2013-08-08 10:36:20 	10 				300.50

UPDATE	Boxes	SET	checkin_location = UPPER(checkin_location);