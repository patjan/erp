DROP   TABLE IF     EXISTS Pieces;
CREATE TABLE IF NOT EXISTS Pieces
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Active	> Check In
															# Check In	> Check Out
															# Check Out	> Return
															# Return	> Check Out
, order_id			BIGINT				DEFAULT NULL
, parent_id			BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL
, is_printed		CHAR(3)				DEFAULT 'No'
, number_of_pieces	INT(11)				DEFAULT 0
, produced_by		VARCHAR(32)			DEFAULT NULL		# machine | partner
, checkin_weight	decimal(10,2)		DEFAULT 0
, real_weight		decimal(10,2)		DEFAULT 0
, checkin_location	VARCHAR(32)			DEFAULT NULL
, checkin_by		BIGINT				DEFAULT NULL
, checkin_at		DATETIME			DEFAULT NULL
, checkout_location	VARCHAR(32)			DEFAULT NULL		# dyer name
, checkout_by		BIGINT				DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, returned_location	VARCHAR(32)			DEFAULT NULL
, returned_by		BIGINT				DEFAULT NULL
, returned_at		DATETIME			DEFAULT NULL
, quality			VARCHAR(32)			DEFAULT NULL
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode	(barcode)
, KEY order_id	(order_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Pieces', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Pieces', created_by=1, created_at=NOW();

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Piece Number', value='1000000001', created_by=1, created_at=NOW();

ALTER TABLE Pieces		CHANGE	checkin_location	checkin_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		CHANGE	returned_location	returned_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		ADD COLUMN		produced_by						VARCHAR(32)		DEFAULT NULL  AFTER number_of_pieces;
