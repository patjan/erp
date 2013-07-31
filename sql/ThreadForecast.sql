DROP   TABLE IF     EXISTS ThreadBalance;
CREATE TABLE IF NOT EXISTS ThreadBalance
( thread_id 		BIGINT			DEFAULT NULL
, supplier_id 		BIGINT			DEFAULT NULL
, current_balance	DECIMAL(10,2)	DEFAULT 0
)
;

DROP   TABLE IF     EXISTS PurchaseForecast;
CREATE TABLE IF NOT EXISTS PurchaseForecast
( thread_id 		BIGINT			DEFAULT NULL
, supplier_id 		BIGINT			DEFAULT NULL
, months			INT(11)			DEFAULT 0
, forecast_weight	DECIMAL(10,2)	DEFAULT 0
)
;

DROP   TABLE IF     EXISTS ThreadForecast;
CREATE TABLE IF NOT EXISTS ThreadForecast
( id				BIGINT			NOT NULL AUTO_INCREMENT
, created_by		BIGINT			DEFAULT NULL
, created_at		DATETIME		DEFAULT NULL
, updated_by		BIGINT			DEFAULT NULL
, updated_at		DATETIME		DEFAULT NULL
, status			VARCHAR(32)		DEFAULT 'Active'

, thread_id			BIGINT			DEFAULT NULL
, supplier_id		BIGINT			DEFAULT NULL

, current_balance	DECIMAL(10,2)	DEFAULT 0
, forecast_past		DECIMAL(10,2)	DEFAULT 0
, forecast_month_1	DECIMAL(10,2)	DEFAULT 0
, forecast_month_2	DECIMAL(10,2)	DEFAULT 0
, forecast_month_3	DECIMAL(10,2)	DEFAULT 0
, forecast_future	DECIMAL(10,2)	DEFAULT 0

, PRIMARY KEY(id)
, UNIQUE(thread_id, supplier_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

SET @cut_off_date = '2013-07-30';

TRUNCATE ThreadBalance;
TRUNCATE ThreadForecast;
TRUNCATE PurchaseForecast;

INSERT ThreadBalance(thread_id, supplier_id, current_balance)
SELECT Batches.thread_id
	 , Incomings.supplier_id
	 , SUM(Batches.checkin_weight + Batches.returned_weight - Batches.checkout_weight) AS current_balance
  FROM Batches
  LEFT JOIN Incomings ON Incomings.id = Batches.incoming_id
 WHERE Batches.status = 'Active'
   AND DATE(Incomings.received_at) <= @cut_off_date
 GROUP BY thread_id, supplier_id
;

INSERT PurchaseForecast(thread_id, supplier_id, months, forecast_weight)
SELECT PurchaseLines.thread_id
	 , Purchases.supplier_id
	 , 12 * (YEAR(PurchaseLines.expected_date) - YEAR(@cut_off_date)) + (MONTH(PurchaseLines.expected_date) - MONTH(@cut_off_date)) AS months
	 , SUM(PurchaseLines.expected_weight - PurchaseLines.received_weight) AS forecast_weight
  FROM PurchaseLines
  LEFT JOIN Purchases ON Purchases.id = PurchaseLines.purchase_id
 WHERE PurchaseLines.status = 'Draft'
 GROUP BY thread_id, supplier_id, months
;

INSERT ThreadForecast(thread_id, supplier_id, forecast_past, forecast_month_1, forecast_month_2, forecast_month_3, forecast_future)
SELECT thread_id
	 , supplier_id
	 , SUM(IF (months < 1, forecast_weight, 0)) AS forecast_past
	 , SUM(IF (months = 1, forecast_weight, 0)) AS forecast_month_1
	 , SUM(IF (months = 2, forecast_weight, 0)) AS forecast_month_2
	 , SUM(IF (months = 3, forecast_weight, 0)) AS forecast_month_3
	 , SUM(IF (months > 3, forecast_weight, 0)) AS forecast_future
  FROM PurchaseForecast
 GROUP BY thread_id, supplier_id
;

REPLACE ThreadForecast(thread_id, supplier_id, current_balance)
 SELECT thread_id, supplier_id, current_balance
   FROM ThreadBalance
  GROUP BY thread_id, supplier_id
;

UPDATE Configs
   SET Configs.value = @cut_off_date
 WHERE Configs.group_set = "System Controls"
   AND Configs.name = "Reference Date"
;