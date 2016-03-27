DROP   TABLE IF     EXISTS LoadOuts;
CREATE TABLE IF NOT EXISTS LoadOuts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, loadout_number	VARCHAR(32)			DEFAULT NULL
, dyer_id			BIGINT				DEFAULT NULL
, dyeing_type		VARCHAR(32)			DEFAULT NULL	/* Lavar */
, color_id			BIGINT				DEFAULT NULL
, shipdyer_id		BIGINT				DEFAULT NULL
, selected			CHAR(3)				DEFAULT NULL
, printed_at		DATETIME			DEFAULT NULL
, labels_printed	INT					DEFAULT 0
, requested_at		DATETIME			DEFAULT NULL
, quoted_pieces		INT					DEFAULT 0
, quoted_weight		DECIMAL(9,2)		DEFAULT 0
, checkout_at		DATETIME			DEFAULT NULL
, checkout_pieces	INT					DEFAULT 0
, checkout_weight	DECIMAL(9,2)		DEFAULT 0
, returned_at		DATETIME			DEFAULT NULL
, returned_pieces	INT					DEFAULT 0
, returned_weight	DECIMAL(9,2)		DEFAULT 0
, remarks			TEXT				DEFAULT	NULL

, PRIMARY KEY(id)
, UNIQUE(loadout_number)
, KEY dyer		(dyer_id)
, KEY color		(color_id)
, KEY shipdyer	(shipdyer_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='LoadOuts', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='LoadOuts', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='LoadOuts', updated_by=1, updated_at=NOW();

ALTER TABLE LoadOuts		ADD COLUMN shipdyer_id		BIGINT		DEFAULT NULL	AFTER color_id;

ALTER TABLE LoadOuts		ADD COLUMN remarks			TEXT		DEFAULT NULL	AFTER returned_weight;

ALTER TABLE LoadOuts		CHANGE	status	status		VARCHAR(32)	DEFAULT 'Active';

ALTER TABLE LoadOuts		ADD COLUMN dyeing_type		VARCHAR(32)	DEFAULT NULL	AFTER dyer_id;

ALTER TABLE LoadOuts		ADD COLUMN printed_at		DATETIME	DEFAULT NULL	AFTER shipdyer_id;
ALTER TABLE LoadOuts		ADD COLUMN is_selected		CHAR(3)		DEFAULT 'No'	AFTER shipdyer_id;

ALTER TABLE LoadOuts		CHANGE	quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadOuts		CHANGE	checkout_weight	checkout_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadOuts		CHANGE	returned_weight	returned_weight	DECIMAL(9,2)	DEFAULT 0;

ALTER TABLE LoadOuts		ADD COLUMN labels_printed			INT				DEFAULT 0		AFTER printed_at;

//	----------------------------------------------------------------------------

SELECT LoadOuts.*
	 ,      Dyer.nick_name		AS      dyer_name
	 ,     Color.color_name		AS     color_name
  FROM LoadOuts
  LEFT JOIN    Contacts AS Dyer		ON      Dyer.id	=		  LoadOuts.dyer_id
  LEFT JOIN      Colors AS Color	ON     Color.id	=		  LoadOuts.color_id

 WHERE        LoadOuts.dyer_id		= 200001
 AND       LoadOuts.shipdyer_id		IS NULL

 ORDER BY LoadOuts.loadout_number
 LIMIT 1000
 

SELECT checkout_pieces, COUNT(*) AS counter
  FROM LoadOuts
 GROUP BY checkout_pieces
 
SELECT floor(checkout_weight/10), COUNT(*) AS counter
  FROM LoadOuts
 GROUP BY floor(checkout_weight/10)
 
SELECT status, COUNT(*) AS counter
  FROM LoadOuts
 GROUP BY status
 
 
//	----------------------------------------------------------------------------
 
DROP   TABLE IF     EXISTS LoadSum;
CREATE TABLE IF NOT EXISTS LoadSum
( loadout_id 		BIGINT			DEFAULT NULL
, sum_quoted_pieces	INT(11)			DEFAULT 0
, sum_quoted_weight	DECIMAL(10,2)	DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT LoadSum(loadout_id, sum_quoted_pieces, sum_quoted_weight)
SELECT loadout_id
	 , SUM(quoted_pieces) AS sum_quoted_pieces
	 , SUM(quoted_weight) AS sum_quoted_weight
  FROM LoadQuotations
 GROUP BY loadout_id
;

SELECT LoadSum.loadout_id
	 , LoadSum.sum_quoted_pieces
	 , LoadSum.sum_quoted_weight
	 , LoadOuts.quoted_pieces
	 , LoadOuts.quoted_weight
  FROM LoadSum
  LEFT JOIN LoadOuts ON LoadOuts.id = LoadSum.loadout_id
 WHERE LoadSum.sum_quoted_pieces != LoadOuts.quoted_pieces
    OR LoadSum.sum_quoted_weight != LoadOuts.quoted_weight
;

UPDATE LoadOuts, LoadSum
   SET LoadOuts.quoted_pieces = LoadSum.sum_quoted_pieces
     , LoadOuts.quoted_weight = LoadSum.sum_quoted_weight
 WHERE LoadOuts.id = LoadSum.loadout_id
;