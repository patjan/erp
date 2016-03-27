DROP   TABLE IF     EXISTS NextIds;
CREATE TABLE IF NOT EXISTS NextIds
( id				BIGINT				NOT NULL AUTO_INCREMENT
, table_name		VARCHAR(32)			DEFAULT NULL
, next_id			BIGINT				DEFAULT 1
, id_size			INT					DEFAULT 9

, PRIMARY KEY(id)
, KEY table_name(table_name)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

#	INSERT INTO NextIds VALUES (NULL, 'Addresses'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Batches'			, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'BatchOuts'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'BatchSets'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Boxes'			, NULL	, 9);
#	INSERT INTO NextIds VALUES (NULL, 'Categories'		, NULL, 5);
#	INSERT INTO NextIds VALUES (NULL, 'CheckOuts'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Colors'			, NULL, 5);
#	INSERT INTO NextIds VALUES (NULL, 'Comments'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Configs'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Contacts'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Controls'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Cylinders'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Fabrics'			, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'FTPs'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'FTP_Loads'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'FTP_Sets'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'FTP_Threads'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'History'			, NULL	, 9);
#	INSERT INTO NextIds VALUES (NULL, 'Incomings'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Invoices'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'JKY_Users'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'LoadOuts'		, NULL	, 9);
#	INSERT INTO NextIds VALUES (NULL, 'LoadSales'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'LoadSets'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'LoadQuotations'	, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Machines'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'NFEs'			, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'NFEBills'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'NFEItems'		, NULL	, 9);
#	INSERT INTO NextIds VALUES (NULL, 'Orders'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'OrdThreads'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'OSAs'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'OSA_Lines'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'OSA_Colors'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Permissions'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Pieces'			, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'ProdPrices'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Products'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'PurchaseLines'	, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Purchases'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Quotations'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'QuotColors'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'QuotLines'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Receivables'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'ReceiveDyers'	, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Recipes'			, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'ReqLines'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Requests'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Restrictions'	, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Sales'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'SaleLines'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'SaleColors'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'SaleOuts'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'ShipDyers'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'TDyerColors'		, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'TDyers'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'TDyerThreads'	, NULL	, 9);
	INSERT INTO NextIds VALUES (NULL, 'Templates'		, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Threads'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Tickets'			, NULL, 5);
	INSERT INTO NextIds VALUES (NULL, 'Translations'	, NULL, 5);

	UPDATE		NextIds SET next_id = 1;