DROP   TABLE IF     EXISTS Batches;
CREATE TABLE IF NOT EXISTS Batches
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, incoming_id		BIGINT				DEFAULT NULL
, thread_id			BIGINT				DEFAULT NULL
, purchase_line_id	BIGINT				DEFAULT NULL
, code				VARCHAR(32)			DEFAULT NULL
, batch				VARCHAR(32)			DEFAULT NULL
, checkin_boxes		INT(11)				DEFAULT 0
, labels_printed	INT(11)				DEFAULT 0
, unit_price		DECIMAL(10,2)		DEFAULT 0
, average_weight	DECIMAL(10,2)		DEFAULT 0
, gross_weight		DECIMAL(10,2)		DEFAULT 0
, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0
, leftover_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, used_weight		DECIMAL(10,2)		DEFAULT 0

, PRIMARY KEY(id)
, KEY incoming	(incoming_id)
, KEY thread	(thread_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE Batches    ADD COLUMN labels_printed    		INT(11)   		DEFAULT 0  AFTER checkin_boxes;
ALTER TABLE Batches    ADD COLUMN number_of_cones    		INT(11)   		DEFAULT 0  AFTER labels_printed;