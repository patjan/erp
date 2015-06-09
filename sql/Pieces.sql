DROP   TABLE IF     EXISTS Pieces;
CREATE TABLE IF NOT EXISTS Pieces
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Active	> Check In
															# Check In	> Check Out
															# Check Out	> Return
															# Return	> Check Out
, order_id			BIGINT				DEFAULT NULL
, loadsale_id		BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL
, is_printed		CHAR(3)				DEFAULT 'No'
, number_of_pieces	INT(11)				DEFAULT 0
, produced_by		VARCHAR(32)			DEFAULT NULL		# machine | partner
, product_name		VARCHAR(255)		DEFAULT NULL

, revised_by		BIGINT				DEFAULT NULL
, weighed_by		BIGINT				DEFAULT NULL
, checkout_by		BIGINT				DEFAULT NULL
, returned_by		BIGINT				DEFAULT NULL

, checkin_location	VARCHAR(32)			DEFAULT NULL
, checkout_location	VARCHAR(32)			DEFAULT NULL		# dyer name
, returned_location	VARCHAR(32)			DEFAULT NULL

, checkin_at		DATETIME			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, returned_at		DATETIME			DEFAULT NULL

, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, retuned_weight	DECIMAL(10,2)		DEFAULT 0

, qualities			VARCHAR(255)		DEFAULT NULL
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode	(barcode)
, KEY order_id	(order_id)
, KEY revised	(revised_by)
, KEY weighed	(weighed_by)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Pieces', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Pieces', created_by=1, created_at=NOW();

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Piece Number', value='1000000001', created_by=1, created_at=NOW();

ALTER TABLE Pieces			ADD COLUMN		product_name			VARCHAR(255)	DEFAULT NULL  AFTER produced_by;

ALTER TABLE Pieces			DROP	quality;
ALTER TABLE Pieces			CHANGE	real_weight		returned_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE Pieces			CHANGE	checkin_by		inspected_by	BIGINT			DEFAULT NULL;
ALTER TABLE Pieces			ADD COLUMN				weighed_by		BIGINT			DEFAULT NULL	AFTER inspected_by;

UPDATE	Pieces	SET	checkin_location = UPPER(checkin_location);

ALTER TABLE Pieces			CHANGE	parent_id	loadsale_id		BIGINT			DEFAULT NULL;

ALTER TABLE Pieces			ADD COLUMN		qualities		VARCHAR(255)		DEFAULT NULL	AFTER returned_at;

ALTER TABLE Pieces			CHANGE	inspected_by	revised_by		BIGINT			DEFAULT NULL;
ALTER TABLE Pieces			CHANGE	weighted_by		weighed_by 		BIGINT			DEFAULT NULL;

ALTER TABLE Pieces			CHANGE	loadsale_id		load_quot_id	BIGINT			DEFAULT NULL;

ALTER TABLE Pieces		ADD INDEX revised		(revised_by		);
ALTER TABLE Pieces		ADD INDEX weighed		(weighed_by		);


SELECT order_id, COUNT(*) AS pieces_printed, labels_printed 
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
  GROUP BY order_id
 HAVING pieces_printed != labels_printed 

order_id	pieces_printed	labels_printed
200058		101				60			41
200097		245				185			60
200196		170				105			65
200216		8				9
200228		70				40			30
200237		177				81			96
200246		175				105			70
200251		156				116			40
									-------
									   402


SELECT order_id, COUNT(*) AS checkin_pieces, produced_pieces, rejected_pieces 
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Pieces.status != 'Active'
 GROUP BY order_id
HAVING checkin_pieces != (produced_pieces + rejected_pieces) 

SELECT order_id, SUM(checkin_weight) AS checkin_weight, produced_weight
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Pieces.status != 'Active'
   AND Pieces.qualities = 'Boa'
 GROUP BY order_id
HAVING checkin_weight != produced_weight


SELECT order_id, COUNT(*) AS checkin_pieces, produced_pieces 
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Pieces.status = 'Check Out'
 GROUP BY order_id
HAVING checkin_pieces != produced_pieces 
									   
									   
