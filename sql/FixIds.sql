UPDATE Changes SET servers = '1 9 ';

ALTER TABLE History			CHANGE	created_by		updated_by		BIGINT			DEFAULT NULL;
ALTER TABLE History			CHANGE	created_at		updated_at		DATETIME		DEFAULT NULL;
ALTER TABLE CheckOuts		ADD COLUMN partner_id		BIGINT		DEFAULT NULL	AFTER machine_id;

UPDATE Batches			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Colors			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Configs			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Contacts			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Controls			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Cylinders		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE FTPs				SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE FTP_Loads		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE FTP_Sets			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE FTP_Threads		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Incomings		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE JKY_Users		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Machines			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Permissions		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Products			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE PurchaseLines	SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Purchases		SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Threads			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Tickets			SET updated_by = created_by	WHERE updated_by IS NULL;
UPDATE Translations		SET updated_by = created_by	WHERE updated_by IS NULL;

UPDATE Batches			SET id = id + 2000000000;
UPDATE Colors			SET id = id + 100000;		/* TM	*/
UPDATE Configs			SET id = id + 100000;		/* TM	*/
UPDATE Contacts			SET id = id + 100000;		/* TM	*/
UPDATE Controls			SET id = id - 999100000;	/* HQ	*/
UPDATE Cylinders		SET id = id + 200000;
UPDATE FTPs				SET id = id + 100000;
UPDATE FTP_Loads		SET id = id + 2000000000;
UPDATE FTP_Sets			SET id = id + 2000000000;
UPDATE FTP_Threads		SET id = id + 2000000000;
UPDATE History			SET id = id + 2000000000;
UPDATE Incomings		SET id = id + 100000;
UPDATE JKY_Users		SET id = id + 100000;		/* TM	???	*/
UPDATE Machines			SET id = id - 999800000;
UPDATE Permissions		SET id = id + 900000;		/* HQ	*/
UPDATE Products			SET id = id + 100000;		/* TM	*/
UPDATE PurchaseLines	SET id = id + 2000000000;
UPDATE Purchases		SET id = id + 100000;
UPDATE Threads			SET id = id + 200000;
UPDATE Tickets			SET id = id - 800000;
UPDATE Translations		SET id = id + 900000;		/* HQ	*/

#	TM
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Batches'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'BatchOuts'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'BatchSets'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Boxes'			;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Categories'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'CheckOuts'		;
UPDATE NextIds SET next_id =  3100	WHERE table_name = 'Colors'			;
UPDATE NextIds SET next_id =   223	WHERE table_name = 'Configs'	 	;
UPDATE NextIds SET next_id =   105	WHERE table_name = 'Contacts'	 	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Controls'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Cylinders'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTPs'			;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Loads'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Sets'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Threads'	;
UPDATE NextIds SET next_id =    24	WHERE table_name = 'History'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Incomings'		;
UPDATE NextIds SET next_id =   	44	WHERE table_name = 'JKY_Users'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadOuts'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadSales'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadSets'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Machines'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Orders'			;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'OrdThreads'		;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'Permissions'	;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'Pieces'			;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'ProdPrices'		;
UPDATE NextIds SET next_id =  1286	WHERE table_name = 'Products'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'PurchaseLines'	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Purchases'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Quotations'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'QuotColors'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'QuotLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ReqLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Requests'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ShipDyers'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerColors'  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyers'		  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerThreads'  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Templates'  	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Threads'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Tickets'		;
UPDATE NextIds SET next_id =     1 	WHERE table_name = 'Translations'	;
TRUNCATE TABLE Changes;

#	DL
UPDATE NextIds SET next_id =   389	WHERE table_name = 'Batches'		;
UPDATE NextIds SET next_id =   185	WHERE table_name = 'BatchOuts'		;
UPDATE NextIds SET next_id =   178	WHERE table_name = 'BatchSets'		;
UPDATE NextIds SET next_id = 36589	WHERE table_name = 'Boxes'			;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Categories'		;
UPDATE NextIds SET next_id =   101	WHERE table_name = 'CheckOuts'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Colors'			;
UPDATE NextIds SET next_id =    57	WHERE table_name = 'Configs'	 	;
UPDATE NextIds SET next_id =     6	WHERE table_name = 'Contacts'	 	;
UPDATE NextIds SET next_id =     2	WHERE table_name = 'Controls'		;
UPDATE NextIds SET next_id =   100	WHERE table_name = 'Cylinders'		;
UPDATE NextIds SET next_id =   254	WHERE table_name = 'FTPs'			;
UPDATE NextIds SET next_id =   398	WHERE table_name = 'FTP_Loads'		;
UPDATE NextIds SET next_id =  1255	WHERE table_name = 'FTP_Sets'		;
UPDATE NextIds SET next_id =   505	WHERE table_name = 'FTP_Threads'	;
UPDATE NextIds SET next_id = 62393	WHERE table_name = 'History'		;
UPDATE NextIds SET next_id =   382	WHERE table_name = 'Incomings'		;
UPDATE NextIds SET next_id =   	 4	WHERE table_name = 'JKY_Users'	  	;
UPDATE NextIds SET next_id =   	 2	WHERE table_name = 'LoadOuts'	  	;
UPDATE NextIds SET next_id =   	 3	WHERE table_name = 'LoadSales'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadSets'	  	;
UPDATE NextIds SET next_id =   	95	WHERE table_name = 'Machines'		;
UPDATE NextIds SET next_id =   	10	WHERE table_name = 'Orders'			;
UPDATE NextIds SET next_id =   	28	WHERE table_name = 'OrdThreads'		;
UPDATE NextIds SET next_id =   	13	WHERE table_name = 'Permissions'	;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'Pieces'			;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'ProdPrices'		;
UPDATE NextIds SET next_id =    52	WHERE table_name = 'Products'		;
UPDATE NextIds SET next_id =   269	WHERE table_name = 'PurchaseLines'	;
UPDATE NextIds SET next_id =    98	WHERE table_name = 'Purchases'		;
UPDATE NextIds SET next_id =   	 2	WHERE table_name = 'Quotations'	  	;
UPDATE NextIds SET next_id =   	12	WHERE table_name = 'QuotColors'	  	;
UPDATE NextIds SET next_id =   	 7	WHERE table_name = 'QuotLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ReqLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Requests'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ShipDyers'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerColors'  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyers'		  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerThreads'  	;
UPDATE NextIds SET next_id =   	 2	WHERE table_name = 'Templates'  	;
UPDATE NextIds SET next_id =   360	WHERE table_name = 'Threads'		;
UPDATE NextIds SET next_id =   	78	WHERE table_name = 'Tickets'		;
UPDATE NextIds SET next_id =     1 	WHERE table_name = 'Translations'	;

#	HQ
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Batches'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'BatchOuts'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'BatchSets'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Boxes'			;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'Categories'		;
UPDATE NextIds SET next_id = 	 1	WHERE table_name = 'CheckOuts'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Colors'			;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Configs'	 	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Contacts'	 	;
UPDATE NextIds SET next_id =   399	WHERE table_name = 'Controls'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Cylinders'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTPs'			;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Loads'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Sets'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'FTP_Threads'	;
UPDATE NextIds SET next_id =   793	WHERE table_name = 'History'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Incomings'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'JKY_Users'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadOuts'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadSales'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'LoadSets'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Machines'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Orders'			;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'OrdThreads'		;
UPDATE NextIds SET next_id =   	66	WHERE table_name = 'Permissions'	;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'Pieces'			;
UPDATE NextIds SET next_id =   	 1  WHERE table_name = 'ProdPrices'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Products'		;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'PurchaseLines'	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Purchases'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Quotations'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'QuotColors'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'QuotLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ReqLines'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Requests'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'ShipDyers'	  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerColors'  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyers'		  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'TDyerThreads'  	;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Templates'  	;
UPDATE NextIds SET next_id =     1	WHERE table_name = 'Threads'		;
UPDATE NextIds SET next_id =   	 1	WHERE table_name = 'Tickets'		;
UPDATE NextIds SET next_id =  1531	WHERE table_name = 'Translations'	;
TRUNCATE TABLE Changes;

UPDATE Batches			SET updated_by		= updated_by		+ 100000;
UPDATE Batches			SET incoming_id		= incoming_id		+ 100000;
UPDATE Batches			SET thread_id		= thread_id			+ 200000;
UPDATE Batches			SET purchase_line_id= purchase_line_id	+ 2000000000;
UPDATE Colors			SET updated_by		= updated_by		+ 100000;
UPDATE Configs			SET updated_by		= updated_by		+ 100000;
UPDATE Configs			SET company_id		= 900001;		/* TM	*/
UPDATE Contacts			SET updated_by		= updated_by		+ 100000;
UPDATE Contacts			SET company_id		= NULL;			/* ???	*/
UPDATE Controls			SET updated_by		= updated_by		+ 100000;
UPDATE Controls			SET company_id		= 900001;		/* TM	*/
UPDATE Cylinders		SET updated_by		= updated_by		+ 100000;
UPDATE Cylinders		SET machine_id		= machine_id		- 999800000;
UPDATE FTPs				SET updated_by		= updated_by		+ 100000;
UPDATE FTPs				SET product_id		= product_id		+ 100000;
UPDATE FTPs				SET machine_id		= machine_id		- 999800000;
UPDATE FTP_Loads		SET updated_by		= updated_by		+ 100000;
UPDATE FTP_Loads		SET parent_id		= parent_id			+ 100000;
UPDATE FTP_Loads		SET thread_id_1		= thread_id_1		+ 200000;
UPDATE FTP_Loads		SET thread_id_2		= thread_id_2		+ 200000;
UPDATE FTP_Loads		SET thread_id_3		= thread_id_3		+ 200000;
UPDATE FTP_Loads		SET thread_id_4		= thread_id_4		+ 200000;
UPDATE FTP_Sets			SET updated_by		= updated_by		+ 100000;
UPDATE FTP_Sets			SET parent_id		= parent_id			+ 100000;
UPDATE FTP_Sets			SET setting_id		= setting_id		+ 100000;
UPDATE FTP_Threads		SET updated_by		= updated_by		+ 100000;
UPDATE FTP_Threads		SET parent_id		= parent_id			+ 100000;
UPDATE FTP_Threads		SET thread_id		= thread_id			+ 200000;
UPDATE FTP_Threads		SET supplier_id		= supplier_id		+ 100000;
UPDATE History			SET updated_by		= updated_by		+ 100000;
UPDATE History			SET parent_id		= parent_id			+ 100000;	/* ??? parent_name */
UPDATE Incomings		SET updated_by		= updated_by		+ 100000;
UPDATE Incomings		SET supplier_id		= supplier_id		+ 100000;
UPDATE JKY_Users		SET updated_by		= updated_by		+ 100000;
UPDATE JKY_Users		SET contact_id		= contact_id		+ 100000;
UPDATE Machines			SET updated_by		= updated_by		+ 100000;
UPDATE Permissions		SET updated_by		= updated_by		+ 100000;
UPDATE Products			SET updated_by		= updated_by		+ 100000;
UPDATE PurchaseLines	SET updated_by		= updated_by		+ 100000;
UPDATE PurchaseLines	SET parent_id		= parent_id			+ 100000;
UPDATE PurchaseLines	SET thread_id		= thread_id			+ 200000;
UPDATE PurchaseLines	SET batch_id		= batch_id			+ 2000000000;
UPDATE Purchases		SET updated_by		= updated_by		+ 100000;
UPDATE Purchases		SET supplier_id		= supplier_id		+ 100000;
UPDATE Threads			SET updated_by		= updated_by		+ 100000;
UPDATE Tickets			SET updated_by		= updated_by		+ 100000;
UPDATE Tickets			SET company_id		= 900001;		/* TM	*/
UPDATE Tickets			SET opened_by		= opened_by			+ 100000;
UPDATE Tickets			SET closed_by		= closed_by			+ 100000;
UPDATE Translations		SET updated_by		= updated_by		+ 100000;
UPDATE Translations		SET parent_id		= parent_id			+ 900000;

UPDATE FTPs			SET ftp_number		= ftp_number		+ 100000;	/* DL	*/
UPDATE Incomings	SET incoming_number	= incoming_number	+ 100000;	/* DL	*/
UPDATE Purchases	SET purchase_number	= purchase_number	+ 100000;	/* DL	*/

#	TM
UPDATE Controls 	SET value = 1000000001			WHERE group_set = 'System Numbers' AND name = 'Next Box Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next FTP Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next Order Number';
UPDATE Controls 	SET value = 1000000001			WHERE group_set = 'System Numbers' AND name = 'Next Piece Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next Request Number';
UPDATE Controls 	SET value = 100001				WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';

#	DL
UPDATE Controls 	SET value = value + 1000000000	WHERE group_set = 'System Numbers' AND name = 'Next Box Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next FTP Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next Order Number';
UPDATE Controls 	SET value = value + 1000000000	WHERE group_set = 'System Numbers' AND name = 'Next Piece Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next Request Number';
UPDATE Controls 	SET value = value + 100000		WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';

#	HQ
UPDATE Controls 	SET value = 9000000001			WHERE group_set = 'System Numbers' AND name = 'Next Box Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next FTP Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next Order Number';
UPDATE Controls 	SET value = 9000000001			WHERE group_set = 'System Numbers' AND name = 'Next Piece Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next Request Number';
UPDATE Controls 	SET value = 900001				WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';

/*	Rename upload images	*/

UPDATE History			SET parent_id		= parent_id			+ 1999900000	WHERE parent_name = 'Batches'		;
UPDATE History			SET parent_id		= parent_id			-  999200000	WHERE parent_name = 'Controls'		;
UPDATE History			SET parent_id		= parent_id			+     100000	WHERE parent_name = 'Cylinders'		;
UPDATE History			SET parent_id		= parent_id			+ 1999900000	WHERE parent_name = 'FTP_Loads'		;
UPDATE History			SET parent_id		= parent_id			+ 1999900000	WHERE parent_name = 'FTP_Sets'		;
UPDATE History			SET parent_id		= parent_id			+ 1999900000	WHERE parent_name = 'FTP_Threads'	;
UPDATE History			SET parent_id		= parent_id			-  999900000	WHERE parent_name = 'Machines'		;
UPDATE History			SET parent_id		= parent_id			+     800000	WHERE parent_name = 'Permissions'	;
UPDATE History			SET parent_id		= parent_id			+ 1999900000	WHERE parent_name = 'PurchaseLines'	;
UPDATE History			SET parent_id		= parent_id			+     100000	WHERE parent_name = 'Threads'		;
UPDATE History			SET parent_id		= parent_id			+     100000	WHERE parent_name = 'Tickets'		AND parent_id < 900000;;
UPDATE History			SET parent_id		= parent_id			-     900000	WHERE parent_name = 'Tickets'		AND parent_id > 900000;

DELETE FROM History		WHERE parent_name = 'BatchOuts'		;
DELETE FROM History		WHERE parent_name = 'BatchSets'		;
DELETE FROM History		WHERE parent_name = 'Boxes'			;
DELETE FROM History		WHERE parent_name = 'CheckOuts'		;
DELETE FROM History		WHERE parent_name = 'Orders'		;
DELETE FROM History		WHERE parent_name = 'OrdThreads'	;
DELETE FROM History		WHERE parent_name = 'Pieces'		;
DELETE FROM History		WHERE parent_name = 'Quotations'	;
DELETE FROM History		WHERE parent_name = 'QuotColors'	;
DELETE FROM History		WHERE parent_name = 'QuotLines'		;
DELETE FROM History		WHERE parent_name = 'ReqLines'		;
DELETE FROM History		WHERE parent_name = 'Requests'		;
DELETE FROM History		WHERE parent_name = 'TDyerColors'	;
DELETE FROM History		WHERE parent_name = 'TDyers'		;
DELETE FROM History		WHERE parent_name = 'TDyerThreads'	;
DELETE FROM History		WHERE parent_name = 'Translations'	;
