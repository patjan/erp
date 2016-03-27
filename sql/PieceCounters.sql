DROP   TABLE IF     EXISTS PieceHistory;
CREATE TABLE IF NOT EXISTS PieceHistory
( id				BIGINT			NOT NULL AUTO_INCREMENT

, history_at		DATETIME		DEFAULT NULL
, machine_id		BIGINT			DEFAULT NULL
, color_id			BIGINT			DEFAULT NULL
, machine_name		VARCHAR(255)	DEFAULT NULL
, color_name		VARCHAR(255)	DEFAULT NULL

, target			INT(11)			DEFAULT 0
, shift_1			INT(11)			DEFAULT 0
, shift_2			INT(11)			DEFAULT 0
, shift_3			INT(11)			DEFAULT 0
, produced			INT(11)			DEFAULT 0
, dyers				INT(11)			DEFAULT 0
, climate			INT(11)			DEFAULT 0
, stock				INT(11)			DEFAULT 0
, total				INT(11)			DEFAULT 0
, hold				INT(11)			DEFAULT 0
, sold				INT(11)			DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(id)
, KEY history		(history_at)
, KEY product		(product_id)
, KEY color			(color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricCounters;
CREATE TABLE IF NOT EXISTS FabricCounters
( id				BIGINT			NOT NULL AUTO_INCREMENT

, product_id		BIGINT			DEFAULT NULL
, color_id			BIGINT			DEFAULT NULL
, product_name		VARCHAR(255)	DEFAULT NULL
, color_name		VARCHAR(255)	DEFAULT NULL

, scheduled			INT(11)			DEFAULT 0
, produced			INT(11)			DEFAULT 0
, dyers				INT(11)			DEFAULT 0
, climate			INT(11)			DEFAULT 0
, stock				INT(11)			DEFAULT 0
, total				INT(11)			DEFAULT 0
, target			INT(11)			DEFAULT 0
, hold				INT(11)			DEFAULT 0
, sold				INT(11)			DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(product_id, color_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricJoined;
CREATE TABLE IF NOT EXISTS FabricJoined
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, scheduled			INT(11)			DEFAULT 0
, produced			INT(11)			DEFAULT 0
, dyers				INT(11)			DEFAULT 0
, climate			INT(11)			DEFAULT 0
, stock				INT(11)			DEFAULT 0
, target			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricScheduled;
CREATE TABLE IF NOT EXISTS FabricScheduled
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, scheduled			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricProduced;
CREATE TABLE IF NOT EXISTS FabricProduced
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, produced			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricDyers;
CREATE TABLE IF NOT EXISTS FabricDyers
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, dyers				INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricClimate;
CREATE TABLE IF NOT EXISTS FabricClimate
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, climate			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricStock;
CREATE TABLE IF NOT EXISTS FabricStock
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, stock			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

DROP   TABLE IF     EXISTS FabricTarget;
CREATE TABLE IF NOT EXISTS FabricTarget
( product_id 		BIGINT			DEFAULT NULL
, color_id 			BIGINT			DEFAULT NULL
, target			INT(11)			DEFAULT 0
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

SELECT @history_at := Configs.value
  FROM Configs
 WHERE Configs.group_set = "System Controls"
   AND Configs.name = "Calculate Fabric Date Time"
;

INSERT INTO FabricHistory
	   (history_at, product_id, color_id, product_name, color_name, scheduled, produced, dyers, climate, stock, total, target, hold, sold)
SELECT @history_at, product_id, color_id, product_name, color_name, scheduled, produced, dyers, climate, stock, total, target, hold, sold
  FROM FabricCounters
;

SET @cut_off_at = NOW();
SET @customer_id = 100002;		#	Tecno Malhas

TRUNCATE FabricCounters;
TRUNCATE FabricJoined;
TRUNCATE FabricScheduled;
TRUNCATE FabricProduced;
TRUNCATE FabricDyers;
TRUNCATE FabricClimate;
TRUNCATE FabricStock;
TRUNCATE FabricTarget;

INSERT FabricScheduled( product_id, color_id, scheduled )
SELECT OSA_Lines.product_id, OSA_Colors.color_id, SUM(OSA_Colors.ordered_pieces) AS scheduled
  FROM OSA_Colors
  LEFT JOIN OSA_Lines ON OSA_Lines.id = OSA_Colors.parent_id
  LEFT JOIN OSAs      ON OSAs.id      = OSA_Lines.parent_id
 WHERE OSAs.customer_id = @customer_id
   AND OSAs.status = 'Active'
 GROUP BY product_id, color_id
;
INSERT FabricProduced(product_id, color_id, produced )
SELECT Pieces.product_id
	 , Orders.color_id
	 , Count(*) AS produced
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Orders.customer_id = @customer_id
   AND Pieces.status = "Active"
 GROUP BY product_id, color_id
 ;
INSERT FabricDyers(product_id, color_id, dyers )
SELECT Pieces.product_id
	 , Orders.color_id
	 , Count(*) AS dyers
  FROM Pieces
  LEFT JOIN Orders ON Orders.id = Pieces.order_id
 WHERE Orders.customer_id = @customer_id
   AND Pieces.status = "Check Out"
 GROUP BY product_id, color_id
 ;
INSERT FabricClimate( product_id, color_id, climate )
SELECT Fabrics.product_id
	 , Fabrics.color_id
	 , Count(*) AS climate
  FROM Fabrics
  LEFT JOIN Orders ON Orders.id = Fabrics.order_id
 WHERE(Fabrics.order_id IS NULL OR Orders.customer_id = @customer_id)
   AND Fabrics.status = "Active"
 GROUP BY product_id, color_id
 ;
INSERT FabricStock( product_id, color_id, stock )
SELECT Fabrics.product_id
	 , Fabrics.color_id
	 , Count(*) AS stock
  FROM Fabrics
  LEFT JOIN Orders ON Orders.id = Fabrics.order_id
 WHERE(Fabrics.order_id IS NULL OR Orders.customer_id = @customer_id)
   AND Fabrics.status = "Check In"
 GROUP BY product_id, color_id
 ;
INSERT FabricTarget( product_id, color_id, target )
SELECT ProdColors.product_id
	 , ProdColors.color_id
	 , ProdColors.target
  FROM ProdColors
 WHERE ProdColors.status = "Active"
 GROUP BY product_id, color_id
 ;

INSERT FabricJoined(product_id, color_id, scheduled, produced, dyers, climate, stock, target)
SELECT product_id, color_id, scheduled, 0, 0, 0, 0, 0
  FROM FabricScheduled
 UNION 
SELECT product_id, color_id, 0, produced, 0, 0, 0, 0
  FROM FabricProduced
 UNION 
SELECT product_id, color_id, 0, 0, dyers, 0, 0, 0
  FROM FabricDyers
 UNION 
SELECT product_id, color_id, 0, 0, 0, climate, 0, 0
  FROM FabricClimate
 UNION 
SELECT product_id, color_id, 0, 0, 0, 0, stock, 0
  FROM FabricStock
 UNION 
SELECT product_id, color_id, 0, 0, 0, 0, 0, target
  FROM FabricTarget
;
INSERT FabricCounters(product_id, color_id, scheduled, produced, dyers, climate, stock, target)
SELECT product_id, color_id
	 , SUM(scheduled) AS scheduled
	 , SUM(produced	) AS produced
	 , SUM(dyers	) AS dyers
	 , SUM(climate	) AS climate
	 , SUM(stock	) AS stock
	 , SUM(target	) AS target
  FROM FabricJoined
 GROUP BY product_id, color_id
;
DROP TABLE FabricJoined;
DROP TABLE FabricScheduled;
DROP TABLE FabricProduced;
DROP TABLE FabricDyers;
DROP TABLE FabricClimate;
DROP TABLE FabricStock;
DROP TABLE FabricTarget;

UPDATE FabricCounters, Products
   SET FabricCounters.product_name = Products.product_name
 WHERE FabricCounters.product_id = Products.id
;
UPDATE FabricCounters, Colors
   SET FabricCounters.color_name = Colors.color_name
 WHERE FabricCounters.color_id = Colors.id
;
UPDATE FabricCounters
   SET total = produced + dyers + climate + stock;
;

UPDATE Configs
   SET Configs.value = @cut_off_at
 WHERE Configs.group_set = "System Controls"
   AND Configs.name = "Calculate Fabric Date Time"
;

SELECT SUM(scheduled), SUM(produced), SUM(dyers), SUM(climate), SUM(stock)
  FROM FabricCounters
;
 
