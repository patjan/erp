DROP   TABLE IF     EXISTS Samples;
CREATE TABLE IF NOT EXISTS Samples
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Active	> Check In
															# Check In	> Check Out
															# Check Out	> Return
															# Return	> Check Out
, piece_id			BIGINT				DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, customer_id		BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL

, sample_weight		DECIMAL(10,2)		DEFAULT 0
, feedbacks			TEXT				DEFAULT NULL
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode		(barcode)
, KEY product_id	(product_id)
, KEY customer_id	(customer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Samples', created_by=1, created_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Samples', created_by=1, created_at=NOW();

INSERT Controls SET group_set='System Numbers', status='Active', sequence=  50, name='Next Sample Number', value='1000000001', created_by=1, created_at=NOW();
