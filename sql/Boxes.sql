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
, KEY parent	(parent_id)
, KEY checkin	(checkin_by)
, KEY checkout	(checkout_by)
, KEY returned	(returned_by)
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

ALTER TABLE Boxes		ADD INDEX parent		(parent_id		);
ALTER TABLE Boxes		ADD INDEX checkin		(checkin_by		);
ALTER TABLE Boxes		ADD INDEX checkout		(checkout_by	);
ALTER TABLE Boxes		ADD INDEX returned		(returned_by	);

SELECT status, COUNT(*) 
  FROM Boxes
 WHERE checkin_at <= '2015-06-11'
 GROUP BY status
	;
status 		COUNT(*) 
Active		676
Check In	18205
Check Out	90329
Return		353


status		COUNT(*)
Check In	18205
Check Out	90329
History		676
Return		353


SELECT DATE(checkin_at), COUNT(*) 
  FROM Boxes
 WHERE status = 'Active'
   AND checkin_at <= '2015-06-11'
 GROUP BY DATE(checkin_at)
	;

DATE(checkin_at)	COUNT(*)
2014-07-17	19
2014-07-22	5
2014-07-29	16
2014-08-01	5
2014-08-05	1
2014-08-06	15
2014-08-07	5
2014-08-12	24
2014-08-14	16
2014-08-15	4
2014-08-29	24
2014-09-04	1
2014-09-08	2
2014-09-11	7
2014-09-12	3
2014-09-16	19
2014-09-25	11
2014-10-07	3
2014-10-08	1
2014-10-09	2
2014-10-27	17
2014-11-04	4
2014-11-18	48
2014-11-24	3
2014-11-25	16
2014-11-28	9
2014-12-01	36
2014-12-02	2
2014-12-03	5
2014-12-04	8
2014-12-08	8
2014-12-10	3
2014-12-12	19
2014-12-15	6
2014-12-17	2
2015-01-05	1
2015-01-06	6
2015-01-07	11
2015-01-09	2
2015-01-12	6
2015-01-16	2
2015-01-17	1
2015-01-19	6
2015-01-21	4
2015-02-05	2
2015-02-06	13
2015-02-11	18
2015-02-19	27
2015-02-20	13
2015-02-23	4
2015-02-24	16
2015-02-26	17
2015-03-04	23
2015-04-02	11
2015-04-13	1
2015-04-15	1
2015-04-23	80
2015-05-06	7
2015-05-07	1
2015-05-11	16
2015-05-15	4
2015-05-19	1
2015-05-21	1
2015-05-22	3
2015-05-25	1
2015-06-03	5
2015-06-10	3


UPDATE Boxes
   SET status = 'History'
 WHERE status = 'Active'
   AND checkin_at <= '2015-06-11'
	;				
