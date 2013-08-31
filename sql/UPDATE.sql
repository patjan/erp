ALTER TABLE Configs		DROP INDEX  group_set;
ALTER TABLE Configs		ADD UNIQUE (group_set, name);

ALTER TABLE Controls	DROP INDEX  group_set;
ALTER TABLE Controls	ADD UNIQUE (group_set, name);

ALTER TABLE Contacts	DROP INDEX  full_name;
ALTER TABLE Contacts	ADD UNIQUE (full_name);
ALTER TABLE Contacts    ADD COLUMN is_customer    		CHAR(3)   		DEFAULT 'no'  AFTER is_company;
ALTER TABLE Contacts	CHANGE job_position	position	VARCHAR(255)	DEFAULT NULL;

ALTER TABLE JKY_Users	DROP INDEX  user_name;
ALTER TABLE JKY_Users	ADD UNIQUE (user_name);

ALTER TABLE Machines	DROP INDEX  name;
ALTER TABLE Machines	ADD UNIQUE (name);

ALTER TABLE Permissions	DROP INDEX  user_role;
ALTER TABLE Permissions	DROP INDEX  user_resource;
ALTER TABLE Permissions	ADD UNIQUE (user_role, user_resource);

ALTER TABLE FTPs		ADD COLUMN peso    			DECIMAL(5,2)	DEFAULT 0		AFTER needling;
UPDATE		FTPs		SET peso = 12.5;

----- 2013/06/01
ALTER TABLE FTPs      CHANGE needling	needling	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE FTPs      CHANGE yield		elasticity	INT(11)			DEFAULT 0;
----- 2013/06/02
ALTER TABLE Contacts	ADD COLUMN		nick_name	VARCHAR(255)	DEFAULT NULL  AFTER photo;
ALTER TABLE Contacts	ADD UNIQUE KEY	nick_name	(nick_name);
----- 2013/06/05
ALTER TABLE Products	CHANGE name product_name	VARCHAR(255)	DEFAULT NULL	;
----- 2013/06/15
ALTER TABLE Threads		CHANGE	code		ncm		VARCHAR(32);
ALTER TABLE Threads		DROP	thread_color;
UPDATE Threads	SET ncm = null;
----- 2013/06/18
ALTER TABLE FTPs		ADD		start_date			DATE			DEFAULT NULL	AFTER number;
ALTER TABLE FTPs		ADD		collection			VARCHAR(32)		DEFAULT NULL	AFTER machine_id;
ALTER TABLE FTPs		DROP	lanes;
ALTER TABLE FTPs		DROP	elasticity;
ALTER TABLE FTPs		DROP	needling;
----- 2013/06/19
ALTER TABLE Contacts	CHANGE	is_supplier	is_supplier	CHAR(3)			DEFAULT 'No';
UPDATE		Contacts	SET is_supplier = 'No'		WHERE is_supplier = 'no';
----- 2013/06/30
UPDATE Translations	SET locale = 'en_US'	WHERE locale = 'en_us';
UPDATE Translations	SET locale = 'pt_BR'	WHERE locale = 'pt_br';
----- 2013/07/04
ALTER TABLE Incomings	ADD		nfe_tm			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	ADD		nfe_dl			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	DROP	invoice_number;
----- 2013/07/05
ALTER TABLE Batches			ADD COLUMN labels_printed    	INT(11)		DEFAULT 0		AFTER checkin_boxes;
ALTER TABLE Batches			ADD COLUMN number_of_cones    	INT(11)		DEFAULT 0		AFTER labels_printed;
ALTER TABLE Boxes			ADD COLUMN number_of_cones		INT(11)		DEFAULT 0		AFTER barcode;
ALTER TABLE PurchaseLines	ADD COLUMN batch_id				BIGINT		DEFAULT NULL	AFTER thread_id;
----- 2013/07/09
ALTER TABLE Boxes	ADD		number_of_boxes		INT(11)		DEFAULT 0	AFTER barcode;
----- 2013/07/14
ALTER TABLE CheckOuts		CHANGE	checkout_id		supplier_id			BIGINT;
----- 2013/07/15
ALTER TABLE Requests		CHANGE	checkout_id		supplier_id			BIGINT;
ALTER TABLE Requests		CHANGE	checkout_ref	supplier_ref		VARCHAR(32);
----- 2013/07/17
ALTER TABLE Boxes	ADD		is_printed			CHAR(3)		DEFAULT 'No'	AFTER barcode;
----- 2013/07/27
ALTER TABLE Batches		ADD COLUMN received_boxes    			INT(11)   		DEFAULT 0  AFTER batch;
ALTER TABLE Batches    	ADD COLUMN checkout_boxes    			INT(11)   		DEFAULT 0  AFTER checkin_boxes;
ALTER TABLE Batches    	ADD COLUMN returned_boxes    			INT(11)   		DEFAULT 0  AFTER checkin_boxes;
ALTER TABLE Batches		CHANGE	gross_weight received_weight	DECIMAL(10,2) 	DEFAULT 0;
UPDATE	Batches			SET received_boxes	= checkin_boxes ;
UPDATE	Batches			SET received_weight = checkin_weight;
UPDATE	Batches			SET checkin_boxes	= 0;
UPDATE	Batches			SET checkin_weight	= 0;
ALTER TABLE Boxes		CHANGE	stocked_location	returned_location	CHAR(4) 	DEFAULT NULL;
ALTER TABLE Boxes		CHANGE	stocked_by			returned_by			BIGINT		DEFAULT NULL;
ALTER TABLE Boxes		CHANGE	stocked_at			returned_at			DATETIME	DEFAULT NULL;
----- 2013/07/29
TRUNCATE TABLE	Batches			;
TRUNCATE TABLE 	BatchOuts		;
TRUNCATE TABLE 	BatchSets		;
TRUNCATE TABLE 	Boxes			;
TRUNCATE TABLE 	CheckOuts		;
TRUNCATE TABLE 	Incomings		;
TRUNCATE TABLE 	PurchaseLines	;
TRUNCATE TABLE 	Purchases		;
TRUNCATE TABLE 	Quotations		;
TRUNCATE TABLE 	QuotLines		;
TRUNCATE TABLE 	QuotColors		;
TRUNCATE TABLE 	ReqLines		;
TRUNCATE TABLE 	Requests		;
TRUNCATE TABLE 	ThreadForecast	;

ALTER TABLE Boxes		AUTO_INCREMENT	= 1000000001;
UPDATE		Controls	SET value		= 1000000001	WHERE group_set = 'System Numbers' AND name = 'Next Box Number';

ALTER TABLE CheckOuts	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number';

ALTER TABLE Incomings	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number';

ALTER TABLE Purchases	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number';

ALTER TABLE Quotations	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number';

ALTER TABLE Requests	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Request Number';

ALTER TABLE TDyerOrders	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next TDyerOrder Number';
----- 2013/08/01
ALTER TABLE FTP_Loads		ADD COLUMN thread_id_4    			BIGINT   		DEFAULT NULL  AFTER thread_id_3;
----- 2013/08/03
ALTER TABLE Purchases	ADD COLUMN received_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Purchases	ADD COLUMN expected_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Requests	ADD COLUMN requested_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Requests	ADD COLUMN checkout_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
----- 2013/08/04
ALTER TABLE ReqLines	ADD COLUMN batchin_id		BIGINT		DEFAULT NULL	AFTER thread_id;
ALTER TABLE BatchOuts	ADD COLUMN batchin_id		BIGINT		DEFAULT NULL	AFTER thread_id;
----- 2013/08/06
ALTER TABLE CheckOuts		CHANGE	invoice_date	requested_date		DATE;
ALTER TABLE CheckOuts		CHANGE	real_weight		requested_weight	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	real_amount		requested_amount	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_weight	checkout_weight		DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_amount	checkout_amount		DECIMAL(10,2);
----- 2013/08/07
ALTER TABLE Incomings		CHANGE	real_weight 	received_weight		DECIMAL(10,2) 	DEFAULT 0;
ALTER TABLE Incomings		CHANGE	real_amount		received_amount		DECIMAL(10,2) 	DEFAULT 0;
----- 2013/08/08
ALTER TABLE CheckOuts		CHANGE	requested_weight	requested_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	requested_amount	requested_amount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_weight		checkout_weight		DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_amount		checkout_amount		DECIMAL(10,2)	DEFAULT 0;
----- 2013/08/15
ALTER TABLE FTPs		ADD		nick_name				VARCHAR(255) DEFAULT NULL	AFTER collection;
----- 2013/08/22
ALTER TABLE BatchOuts	ADD COLUMN reserved_boxes	INT			DEFAULT 0		AFTER requested_boxes;
----- 2013/08/23
ALTER TABLE QuotColors		CHANGE	color_group			color_group			VARCHAR(32)		DEFAULT NULL;
----- 2013/08/24
ALTER TABLE QuotColors		CHANGE	color_group		color_type		VARCHAR(32)		DEFAULT NULL;
UPDATE 		QuotColors 		SET QuotColors.color_type = (SELECT Colors.color_type FROM Colors WHERE Colors.id = QuotColors.color_id );
ALTER TABLE Contacts	ADD COLUMN is_partner    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;
ALTER TABLE Contacts	ADD COLUMN is_dyer	    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;
----- 2013/08/29
ALTER TABLE Pieces		CHANGE	checkin_location	checkin_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		CHANGE	returned_location	returned_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		ADD COLUMN		produced_by						VARCHAR(32)		DEFAULT NULL  AFTER number_of_pieces;
----- 2013/08/30
ALTER TABLE Machines	ADD		lane_type			VARCHAR(32) 	DEFAULT NULL	AFTER lanes;
----- 2013/08/31
INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyers' ;
INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyerThreads';
INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyerColors' ;
ALTER TABLE TDyers		AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';
