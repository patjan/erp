DROP   TABLE IF     EXISTS Boxes;
CREATE TABLE IF NOT EXISTS Boxes
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, batch_id			BIGINT				DEFAULT NULL
, parent_id			BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL
, number_of_boxes	INT(11)				DEFAULT 0
, number_of_cones	INT(11)				DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, real_weight		DECIMAL(10,2)		DEFAULT 0
, checkin_location	CHAR(4)				DEFAULT NULL
, checkin_by		BIGINT				DEFAULT NULL
, checkin_at		DATETIME			DEFAULT NULL
, checkout_location	VARCHAR(32)			DEFAULT NULL	# machine name or dyer name
, checkout_by		BIGINT				DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, stocked_location	CHAR(4)				DEFAULT NULL
, stocked_by		BIGINT				DEFAULT NULL
, stocked_at		DATETIME			DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode	(barcode)
, KEY batch		(batch_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=100000001
;
INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Box Number', value='1000000001', created_by=1, created_at=NOW();

ALTER TABLE Boxes	ADD		number_of_cones		INT(11)		DEFAULT 0	AFTER barcode;
ALTER TABLE Boxes	ADD		number_of_boxes		INT(11)		DEFAULT 0	AFTER barcode;
