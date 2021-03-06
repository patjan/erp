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

/* -- 2013/06/01	*/
ALTER TABLE FTPs      CHANGE needling	needling	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE FTPs      CHANGE yield		elasticity	INT(11)			DEFAULT 0;
/* -- 2013/06/02	*/
ALTER TABLE Contacts	ADD COLUMN		nick_name	VARCHAR(255)	DEFAULT NULL  AFTER photo;
ALTER TABLE Contacts	ADD UNIQUE KEY	nick_name	(nick_name);
/* -- 2013/06/05	*/
ALTER TABLE Products	CHANGE name product_name	VARCHAR(255)	DEFAULT NULL	;
/* -- 2013/06/15	*/
ALTER TABLE Threads		CHANGE	code		ncm		VARCHAR(32);
ALTER TABLE Threads		DROP	thread_color;
UPDATE Threads	SET ncm = null;
/* -- 2013/06/18	*/
ALTER TABLE FTPs		ADD		start_date			DATE			DEFAULT NULL	AFTER number;
ALTER TABLE FTPs		ADD		collection			VARCHAR(32)		DEFAULT NULL	AFTER machine_id;
ALTER TABLE FTPs		DROP	lanes;
ALTER TABLE FTPs		DROP	elasticity;
ALTER TABLE FTPs		DROP	needling;
/* -- 2013/06/19	*/
ALTER TABLE Contacts	CHANGE	is_supplier	is_supplier	CHAR(3)			DEFAULT 'No';
UPDATE		Contacts	SET is_supplier = 'No'		WHERE is_supplier = 'no';
/* -- 2013/06/30	*/
UPDATE Translations	SET locale = 'en_US'	WHERE locale = 'en_us';
UPDATE Translations	SET locale = 'pt_BR'	WHERE locale = 'pt_br';
/* -- 2013/07/04	*/
ALTER TABLE Incomings	ADD		nfe_tm			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	ADD		nfe_dl			VARCHAR(32)		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE Incomings	DROP	invoice_number;
/* -- 2013/07/05	*/
ALTER TABLE Batches			ADD COLUMN labels_printed    	INT(11)		DEFAULT 0		AFTER checkin_boxes;
ALTER TABLE Batches			ADD COLUMN number_of_cones    	INT(11)		DEFAULT 0		AFTER labels_printed;
ALTER TABLE Boxes			ADD COLUMN number_of_cones		INT(11)		DEFAULT 0		AFTER barcode;
ALTER TABLE PurchaseLines	ADD COLUMN batch_id				BIGINT		DEFAULT NULL	AFTER thread_id;
/* -- 2013/07/09	*/
ALTER TABLE Boxes	ADD		number_of_boxes		INT(11)		DEFAULT 0	AFTER barcode;
/* -- 2013/07/14	*/
ALTER TABLE CheckOuts		CHANGE	checkout_id		supplier_id			BIGINT;
/* -- 2013/07/15	*/
ALTER TABLE Requests		CHANGE	checkout_id		supplier_id			BIGINT;
ALTER TABLE Requests		CHANGE	checkout_ref	supplier_ref		VARCHAR(32);
/* -- 2013/07/17	*/
ALTER TABLE Boxes	ADD		is_printed			CHAR(3)		DEFAULT 'No'	AFTER barcode;
/* -- 2013/07/27	*/
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
/* -- 2013/07/29	*/
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
/* -- 2013/08/01	*/
ALTER TABLE FTP_Loads		ADD COLUMN thread_id_4    			BIGINT   		DEFAULT NULL  AFTER thread_id_3;
/* -- 2013/08/03	*/
ALTER TABLE Purchases	ADD COLUMN received_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Purchases	ADD COLUMN expected_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Requests	ADD COLUMN requested_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
ALTER TABLE Requests	ADD COLUMN checkout_weight		DECIMAL(10,2)		DEFAULT 0	AFTER scheduled_at;
/* -- 2013/08/04	*/
ALTER TABLE ReqLines	ADD COLUMN batchin_id		BIGINT		DEFAULT NULL	AFTER thread_id;
ALTER TABLE BatchOuts	ADD COLUMN batchin_id		BIGINT		DEFAULT NULL	AFTER thread_id;
/* -- 2013/08/06	*/
ALTER TABLE CheckOuts		CHANGE	invoice_date	requested_date		DATE;
ALTER TABLE CheckOuts		CHANGE	real_weight		requested_weight	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	real_amount		requested_amount	DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_weight	checkout_weight		DECIMAL(10,2);
ALTER TABLE CheckOuts		CHANGE	invoice_amount	checkout_amount		DECIMAL(10,2);
/* -- 2013/08/07	*/
ALTER TABLE Incomings		CHANGE	real_weight 	received_weight		DECIMAL(10,2) 	DEFAULT 0;
ALTER TABLE Incomings		CHANGE	real_amount		received_amount		DECIMAL(10,2) 	DEFAULT 0;
/* -- 2013/08/08	*/
ALTER TABLE CheckOuts		CHANGE	requested_weight	requested_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	requested_amount	requested_amount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_weight		checkout_weight		DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE CheckOuts		CHANGE	checkout_amount		checkout_amount		DECIMAL(10,2)	DEFAULT 0;
/* -- 2013/08/15	*/
ALTER TABLE FTPs		ADD		nick_name				VARCHAR(255) DEFAULT NULL	AFTER collection;
/* -- 2013/08/22	*/
ALTER TABLE BatchOuts	ADD COLUMN reserved_boxes	INT			DEFAULT 0		AFTER requested_boxes;
/* -- 2013/08/23	*/
ALTER TABLE QuotColors		CHANGE	color_group			color_group			VARCHAR(32)		DEFAULT NULL;
/* -- 2013/08/24	*/
ALTER TABLE QuotColors		CHANGE	color_group		color_type		VARCHAR(32)		DEFAULT NULL;
UPDATE 		QuotColors 		SET QuotColors.color_type = (SELECT Colors.color_type FROM Colors WHERE Colors.id = QuotColors.color_id );
ALTER TABLE Contacts	ADD COLUMN is_partner    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;
ALTER TABLE Contacts	ADD COLUMN is_dyer	    		CHAR(3)   		DEFAULT 'No'  AFTER is_supplier;
/* -- 2013/08/29	*/
ALTER TABLE Pieces		CHANGE	checkin_location	checkin_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		CHANGE	returned_location	returned_location	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE Pieces		ADD COLUMN		produced_by						VARCHAR(32)		DEFAULT NULL  AFTER number_of_pieces;
/* -- 2013/08/30	*/
ALTER TABLE Machines	ADD		lane_type			VARCHAR(32) 	DEFAULT NULL	AFTER lanes;
/* -- 2013/08/31	*/
INSERT		Controls	SET sequence= 50, group_set = 'User Resources', name = 'TDyers' ;
INSERT		Controls	SET sequence= 50, group_set = 'User Resources', name = 'TDyerThreads';
INSERT		Controls	SET sequence= 50, group_set = 'User Resources', name = 'TDyerColors' ;

INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyers' ;
INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyerThreads';
INSERT		Controls	SET sequence= 50, group_set = 'Ticket Categories', name = 'TDyerColors' ;

ALTER TABLE TDyers		AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';
/* -- 2013/09/02	*/
ALTER TABLE TDyerThreads		CHANGE	tdyer_id		parent_id			BIGINT		DEFAULT NULL;
ALTER TABLE TDyerThreads		ADD COLUMN batchout_id	BIGINT		DEFAULT NULL	AFTER batchin_id;
ALTER TABLE CheckOuts			ADD COLUMN dyer_id		BIGINT		DEFAULT NULL	AFTER supplier_id;
/* -- 2013/09/05	*/
ALTER TABLE CheckOuts		CHANGE	requested_date		requested_at		DATETIME	DEFAULT NULL;
ALTER TABLE Purchases		CHANGE	number				purchase_number		VARCHAR(32)	DEFAULT NULL;
ALTER TABLE Incomings		CHANGE	number				incoming_number		VARCHAR(32)	DEFAULT NULL;
ALTER TABLE PurchaseLines	CHANGE	purchase_id			parent_id			BIGINT		DEFAULT NULL;
ALTER TABLE TDyers			CHANGE	status				status				VARCHAR(32)	DEFAULT 'Draft';
/* -- 2013/09/09	*/
ALTER TABLE FTPs			CHANGE	number				ftp_number			VARCHAR(32) DEFAULT NULL;
/* -- 2013/09/16	*/
ALTER TABLE BatchOuts		ADD COLUMN tdyer_thread_id	BIGINT			DEFAULT NULL	AFTER req_line_id;
ALTER TABLE TDyerThreads	ADD COLUMN returned_weight	DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
ALTER TABLE TDyerThreads	ADD COLUMN checkout_weight	DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
ALTER TABLE TDyerThreads	ADD COLUMN ordered_weight	DECIMAL(10,2)	DEFAULT 0		AFTER batchout_id;
ALTER TABLE BatchOuts		ADD COLUMN order_thread_id	BIGINT			DEFAULT NULL	AFTER tdyer_thread_id;

ALTER TABLE OrdThreads		ADD COLUMN batchout_id		BIGINT			DEFAULT NULL	AFTER batchin_id;
ALTER TABLE OrdThreads		CHANGE	requested_weight	ordered_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE OrdThreads		CHANGE	order_id			parent_id		BIGINT			DEFAULT NULL;

ALTER TABLE Orders			ADD COLUMN returned_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN checkout_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN ordered_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			CHANGE	status			status			VARCHAR(32)		DEFAULT 'Draft';
/* -- 2013/09/17	*/
ALTER TABLE BatchOuts		CHANGE	status			status			VARCHAR(32)		DEFAULT 'Draft';
ALTER TABLE Pieces			ADD COLUMN		product_name			VARCHAR(255)	DEFAULT NULL  AFTER produced_by;
/* -- 2013/09/25	*/
ALTER TABLE Pieces			DROP	quality;
ALTER TABLE Pieces			CHANGE	real_weight		returned_weight	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE Pieces			CHANGE	checkin_by		inspected_by	BIGINT			DEFAULT NULL;
ALTER TABLE Pieces			ADD COLUMN				weighed_by		BIGINT			DEFAULT NULL	AFTER inspected_by;
/* -- 2013/09/29	*/
ALTER TABLE FTP_Loads		CHANGE	ftp_id			parent_id		BIGINT			DEFAULT NULL;
ALTER TABLE FTP_Sets		CHANGE	ftp_id			parent_id		BIGINT			DEFAULT NULL;
ALTER TABLE FTP_Threads		CHANGE	ftp_id			parent_id		BIGINT			DEFAULT NULL;
/* -- 2013/10/16	*/
ALTER TABLE History			CHANGE	created_by		updated_by		BIGINT			DEFAULT NULL;
ALTER TABLE History			CHANGE	created_at		updated_at		DATETIME		DEFAULT NULL;
ALTER TABLE CheckOuts		ADD COLUMN partner_id		BIGINT		DEFAULT NULL	AFTER machine_id;
/* -- 2013/11/04	*/
ALTER TABLE Changes			CHANGE	servers			servers			VARCHAR(32)		DEFAULT '';
/* -- 2013/11/17	*/
ALTER TABLE Orders			ADD COLUMN ops_printed		INT				DEFAULT 0		AFTER labels_printed;
ALTER TABLE Orders			ADD COLUMN ftps_printed		INT				DEFAULT 0		AFTER labels_printed;
/* -- 2013/11/20	*/
ALTER TABLE Quotations		ADD COLUMN needed_at		DATETIME		DEFAULT NULL	AFTER quoted_at;
ALTER TABLE Orders			ADD COLUMN quot_line_id		BIGINT			DEFAULT NULL	AFTER ftp_id;
/* -- 2013/11/29	*/
ALTER TABLE Orders			ADD COLUMN quotation_number VARCHAR(32)		DEFAULT NULL	AFTER quot_line_id;
ALTER TABLE Orders			ADD COLUMN quoted_pieces	INT				DEFAULT 0		AFTER produced_at;
ALTER TABLE Orders			ADD COLUMN quoted_weight	DECIMAL(10,2)	DEFAULT 0		AFTER produced_pieces;

UPDATE	BatchSets	SET	checkin_location = UPPER(checkin_location);
UPDATE	Boxes		SET	checkin_location = UPPER(checkin_location);
UPDATE	LoadSets	SET	checkin_location = UPPER(checkin_location);
UPDATE	Pieces		SET	checkin_location = UPPER(checkin_location);
/* -- 2013/12/12	*/
ALTER TABLE Orders			ADD COLUMN returned_pieces	INT				DEFAULT 0		AFTER produced_pieces;
ALTER TABLE Orders			ADD COLUMN checkout_pieces	INT				DEFAULT 0		AFTER produced_pieces;
/* -- 2013/12/14	*/
ALTER TABLE Quotations		CHANGE	punho_perc			punho_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		CHANGE	gola_perc			gola_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		CHANGE	galao_perc			galao_percent	INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN punho_units		INTEGER			DEFAULT 0		AFTER punho_percent;
ALTER TABLE Quotations		ADD COLUMN gola_units		INTEGER			DEFAULT 0		AFTER gola_percent;
ALTER TABLE Quotations		ADD COLUMN galao_units		INTEGER			DEFAULT 0		AFTER galao_percent;
ALTER TABLE Orders			ADD COLUMN quoted_units		INT				DEFAULT 0		AFTER produced_at;
/* -- 2013/12/18	*/
ALTER TABLE QuotLines		CHANGE	quotation_id	parent_id		BIGINT			DEFAULT NULL;
/* -- 2013/12/22	*/
ALTER TABLE Orders			ADD COLUMN produced_weight	DECIMAL(10,2)	DEFAULT 0		AFTER ordered_weight;
/* -- 2013/12/23	*/
ALTER TABLE Contacts		ADD COLUMN st_cpl			VARCHAR(255)	DEFAULT NULL	AFTER website;
ALTER TABLE Contacts		ADD COLUMN st_number		VARCHAR(255)	DEFAULT NULL	AFTER website;
ALTER TABLE Contacts		ADD COLUMN district			VARCHAR(255)	DEFAULT NULL	AFTER country;
/* -- 2013/12/25	*/
ALTER TABLE Contacts		ADD COLUMN is_transport    	CHAR(3)   		DEFAULT 'No'	AFTER is_partner;
ALTER TABLE LoadOuts		ADD COLUMN shipdyer_id		BIGINT			DEFAULT NULL	AFTER color_id;
/* -- 2014/01/04	*/
ALTER TABLE ShipDyers		ADD COLUMN sds_printed		INT				DEFAULT 0		AFTER batch_code;
ALTER TABLE Pieces			CHANGE	parent_id	loadsale_id		BIGINT			DEFAULT NULL;
/* -- 2014/01/11	*/
ALTER TABLE Contacts		ADD COLUMN parent_id    		BIGINT   		DEFAULT NULL  	AFTER support_id;
/* -- 2014/01/15	*/
ALTER TABLE FTPs			ADD		units					INT(11)			DEFAULT 1		AFTER width;
UPDATE		FTPs			SET		units = 1;
/* -- 2014/01/17	*/
ALTER TABLE QuotLines		ADD		units					INT(11)			DEFAULT 1		AFTER product_id;
ALTER TABLE QuotLines		ADD		quoted_units			INT(11)			DEFAULT 0		AFTER product_id;
ALTER TABLE QuotLines		ADD		peso					DECIMAL(5,2)	DEFAULT 0		AFTER product_id;
ALTER TABLE QuotColors		CHANGE	quoted_pieces	quoted_units	INT				DEFAULT 0;
ALTER TABLE QuotColors		CHANGE	fabric_price	quoted_price	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE QuotColors		CHANGE	punho_price		product_price	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE QuotColors		DROP	gola_price		;
ALTER TABLE QuotColors		DROP	galao_price		;
/* -- 2014/03/08	*/
UPDATE Boxes				SET	checkin_location	= UPPER(checkin_location );
UPDATE Boxes				SET	checkout_location	= UPPER(checkout_location);
UPDATE Boxes				SET	returned_location	= UPPER(returned_location);
UPDATE Batches				SET	batch				= UPPER(batch);
/* -- 2014/03/11	*/
ALTER TABLE Machines		ADD		remarks					TEXT		 	DEFAULT NULL	AFTER return_date;
/* -- 2014/04/30	*/
INSERT		Controls		SET sequence= 320, group_set = 'System Keys', name = 'Support Domain', value='http://support.jkysoftware.com/index.php/api?';
INSERT		Controls		SET sequence= 410, group_set = 'System Keys', name = 'Expire Date', value='2014-05-01';
INSERT		Controls		SET sequence= 420, group_set = 'System Keys', name = 'Expire Key', value='abcdefghij';
/* -- 2014/05/02	*/
ALTER TABLE Controls		ADD		remarks					TEXT		 	DEFAULT NULL	AFTER value;
ALTER TABLE Configs			ADD		remarks					TEXT		 	DEFAULT NULL	AFTER value;
UPDATE FTPs					SET	draw	= LOWER(draw );
UPDATE FTPs					SET	photo	= LOWER(photo);
/* -- 2014/06/02	*/
ALTER TABLE LoadSales		ADD		reserved_pieces			INT				DEFAULT 0		AFTER requested_pieces;
/* -- 2014/06/14	*/
ALTER TABLE Products		ADD		units					INT(11)			DEFAULT 1		AFTER start_date;
ALTER TABLE Products		ADD		peso					DECIMAL(5,2)	DEFAULT 0		AFTER start_date;
/* -- 2014/06/16	*/
ALTER TABLE Products		ADD		cone_type				VARCHAR(32)		DEFAULT NULL	AFTER units;
/* -- 2014/07/19	*/
ALTER TABLE Contacts		ADD COLUMN extra_info			VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts		ADD COLUMN remarks				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts		ADD COLUMN alert				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts		ADD COLUMN payments				VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts		ADD COLUMN im					VARCHAR(255)	DEFAULT NULL	AFTER ie;
ALTER TABLE Contacts		ADD COLUMN icms_exemption		CHAR(3)			DEFAULT 'No'	AFTER is_taxable;
/* -- 2014/08/02	*/
ALTER TABLE Products		ADD COLUMN parent_id    		BIGINT   		DEFAULT NULL  	AFTER status;
/* -- 2014/08/10	*/
ALTER TABLE Products		ADD		finishing				VARCHAR(255)	DEFAULT NULL	AFTER product_type;
/* -- 2014/10/03	*/
ALTER TABLE Colors			ADD COLUMN remarks    			TEXT   			DEFAULT NULL  	AFTER color_name;
/* -- 2014/10/12	*/
ALTER TABLE Quotations		ADD COLUMN contact_id				BIGINT			DEFAULT NULL	AFTER customer_id;
ALTER TABLE Quotations		CHANGE	weight		weight_from		INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN weight_to				INTEGER			DEFAULT 0		AFTER weight_from;
ALTER TABLE Quotations		CHANGE	width		width_from		INTEGER			DEFAULT 0;
ALTER TABLE Quotations		ADD COLUMN width_to					INTEGER			DEFAULT 0		AFTER width_from;
ALTER TABLE Quotations		CHANGE	has_break	product_type	VARCHAR(32)		DEFAULT '';
ALTER TABLE QuotLines		ADD COLUMN remarks				TEXT			DEFAULT NULL	AFTER quoted_pieces;
/* -- 2014/10/14	*/
ALTER TABLE Orders			CHANGE	quot_line_id		osa_line_id		BIGINT			DEFAULT NULL;
ALTER TABLE Orders			CHANGE	quotation_number	osa_number		VARCHAR(32)		DEFAULT NULL;
ALTER TABLE QuotLines		CHANGE	order_id			osa_line_id		BIGINT			DEFAULT NULL;
/* -- 2014/10/23	*/
ALTER TABLE Quotations		ADD COLUMN discount_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;
ALTER TABLE Quotations		ADD COLUMN quoted_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;
ALTER TABLE QuotLines		ADD COLUMN discount					VARCHAR(8)		DEFAULT ''		AFTER quoted_pieces;
ALTER TABLE QuotColors		ADD COLUMN discount					VARCHAR(8)		DEFAULT ''		AFTER product_price;
/* -- 2014/10/24	*/
ALTER TABLE Products		CHANGE	start_date	start_at	DATETIME			DEFAULT NULL	;
ALTER TABLE Products		CHANGE	finishing	finishings	VARCHAR(255)		DEFAULT NULL	;
/* -- 2014/10/26	*/
ALTER TABLE Pieces			ADD COLUMN		qualities		VARCHAR(255)		DEFAULT NULL	AFTER returned_at;
/* -- 2014/10/27	*/
ALTER TABLE Products		ADD			washings				VARCHAR(255)	DEFAULT NULL	AFTER finishings;
ALTER TABLE Products		ADD COLUMN yield					DECIMAL(5,2)	DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_dyer				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_to					INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN width_from				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_dyer				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_to				INTEGER			DEFAULT 0		AFTER photo;
ALTER TABLE Products		ADD COLUMN weight_from				INTEGER			DEFAULT 0		AFTER photo;
/* -- 2014/10/29	*/
ALTER TABLE Contacts	ADD COLUMN payment_type			VARCHAR(255)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN interest_rate		DECIMAL(5,2)	DEFAULT NULL	AFTER total_paid;
ALTER TABLE Contacts	ADD COLUMN nextel				VARCHAR(255)	DEFAULT NULL 	AFTER fax;
ALTER TABLE Contacts	ADD COLUMN skype				VARCHAR(255)	DEFAULT NULL 	AFTER fax;
/* -- 2014/11/07	*/
ALTER TABLE Quotations		ADD COLUMN advanced_amount			DECIMAL(10,2)	DEFAULT 0		AFTER peso;
ALTER TABLE Quotations		ADD COLUMN payments					VARCHAR(255)	DEFAULT NULL	AFTER discount_amount;
/* -- 2014/11/08	*/
ALTER TABLE QuotLines		ADD COLUMN machine_id			BIGINT			DEFAULT NULL	AFTER product_id;
ALTER TABLE QuotColors		ADD COLUMN dyer_id				BIGINT			DEFAULT NULL	AFTER parent_id;
/* -- 2014/11/29	*/
ALTER TABLE Pieces			CHANGE	inspected_by 	revised_by		BIGINT			DEFAULT NULL;
ALTER TABLE Pieces			CHANGE	weighted_by		weighed_by 		BIGINT			DEFAULT NULL;
/* -- 2014/12/04	*/
ALTER TABLE QuotLines		CHANGE	discount		discount		VARCHAR(8)		DEFAULT '';
ALTER TABLE QuotColors		CHANGE	quoted_units	quoted_units	DECIMAL(7,1)	DEFAULT 0;
ALTER TABLE QuotLines		ADD		quoted_weight			DECIMAL(7,1)	DEFAULT 0		AFTER peso;

ALTER TABLE OSA_Lines		ADD		quoted_weight			DECIMAL(7,1)	DEFAULT 0		AFTER peso;
ALTER TABLE Orders			ADD		color_id				BIGINT			DEFAULT NULL	AFTER product_id;
/* -- 2014/12/28	*/
ALTER TABLE Orders			ADD		location				VARCHAR(4)		DEFAULT NULL	AFTER returned_weight;
/* -- 2015/01/01	*/
ALTER TABLE LoadOuts		ADD COLUMN remarks				TEXT			DEFAULT NULL	AFTER returned_weight;
/* -- 2015/01/10	*/
ALTER TABLE Contacts	ADD COLUMN deduct_cone			CHAR(3)			DEFAULT 'Yes'	AFTER icms_exemption;
/* -- 2015/01/18	*/
ALTER TABLE Quotations		ADD COLUMN salesman_id				BIGINT			DEFAULT NULL	AFTER contact_id;
ALTER TABLE Sales			ADD COLUMN salesman_id				BIGINT			DEFAULT NULL	AFTER contact_id;
/* -- 2015/01/24	*/
ALTER TABLE Products		CHANGE weight_from	weight_customer	VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE weight_to	weight_to		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE weight_dyer	weight_dyer		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_from	width_customer	VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_to		width_to		VARCHAR(32)		DEFAULT NULL	;
ALTER TABLE Products		CHANGE width_dyer	width_dyer		VARCHAR(32)		DEFAULT NULL	;
UPDATE Products	SET weight_customer = NULL	WHERE weight_customer	= '0';
UPDATE Products	SET weight_dyer		= NULL	WHERE weight_dyer		= '0';
UPDATE Products	SET width_customer	= NULL	WHERE width_customer	= '0';
UPDATE Products	SET width_dyer		= NULL	WHERE width_dyer		= '0';
UPDATE Products	SET weight_customer = CONCAT(weight_customer, ' - ', weight_to)	WHERE weight_customer	IS NOT NULL;
UPDATE Products	SET width_customer  = CONCAT(width_customer , ' - ', width_to )	WHERE width_customer	IS NOT NULL;
ALTER TABLE Products		DROP weight_to	;
ALTER TABLE Products		DROP width_to	;
/* -- 2015/01/25	*/
ALTER TABLE Quotations		ADD COLUMN expected_date			DATE			DEFAULT NULL	AFTER produced_date;
ALTER TABLE Colors			ADD COLUMN dyeing_type				VARCHAR(32)		DEFAULT NULL	AFTER color_name;
/* -- 2015/02/07	*/
ALTER TABLE LoadQuotations		ADD		reserved_weight			DECIMAL(7,1)	DEFAULT 0		AFTER quoted_weight;
ALTER TABLE LoadQuotations		ADD		reserved_pieces			INT				DEFAULT 0		AFTER quoted_weight;
ALTER TABLE Pieces			CHANGE	loadsale_id		load_quot_id	BIGINT			DEFAULT NULL;
/* -- 2015/02/10	*/
ALTER TABLE LoadOuts		CHANGE	status			status			VARCHAR(32)		DEFAULT 'Active';
/* -- 2015/03/27	*/
ALTER TABLE Quotations		CHANGE	produced_date	produce_from_date	DATE		DEFAULT NULL;
ALTER TABLE Quotations		CHANGE	expected_date	produce_to_date		DATE		DEFAULT NULL;
UPDATE		Quotations		SET 	produce_from_date = produce_to_date;
UPDATE		Quotations		SET 	produce_to_date = delivered_date;
UPDATE		Quotations		SET 	delivered_date = NULL;
/* -- 2015/04/05	*/
ALTER TABLE BatchOuts		ADD COLUMN parent_id		BIGINT		DEFAULT NULL	AFTER status;
/* -- 2015/04/09	*/
 UPDATE CheckOuts
    SET status = 'Closed'
  WHERE status = 'Active'
    AND DATE(checkout_at) < '2015-04-01'
		;
 UPDATE BatchOuts
   LEFT JOIN CheckOuts ON CheckOuts.id = BatchOuts.checkout_id
    SET BatchOuts.status = 'Closed'
  WHERE BatchOuts.status = 'Active'
    AND DATE(CheckOuts.checkout_at) < '2015-04-01'
		;
 UPDATE Boxes
	SET Boxes.real_weight = Boxes.real_weight / 100
  WHERE (Boxes.real_weight / Boxes.average_weight) > 3
		;
/* -- 2015-04-23	*/
ALTER TABLE Products	ADD INDEX parent_id		(parent_id		);
ALTER TABLE Products	ADD INDEX product_type	(product_type	);
ALTER TABLE Quotations	ADD INDEX salesman		(salesman_id	);
ALTER TABLE Quotations	ADD INDEX contact		(contact_id		);
ALTER TABLE Threads		ADD INDEX thread_group	(thread_group	);
ALTER TABLE OSAs		ADD INDEX salesman		(salesman_id	);
ALTER TABLE Orders		ADD INDEX color			(color_id		);
ALTER TABLE Orders		ADD INDEX ftp			(ftp_id			);
ALTER TABLE Pieces		ADD INDEX revised		(revised_by		);
ALTER TABLE Pieces		ADD INDEX weighed		(weighed_by		);
ALTER TABLE FTPs		ADD INDEX machine		(machine_id		);
ALTER TABLE PurchaseLines	ADD INDEX batch		(batch_id		);
ALTER TABLE Batches		ADD INDEX purchase		(purchase_line_id);
ALTER TABLE CheckOuts	ADD INDEX partner		(partner_id		);
ALTER TABLE CheckOuts	ADD INDEX dyer			(dyer_id		);
ALTER TABLE BatchOuts	ADD INDEX batchin		(batchin_id		);
ALTER TABLE BatchOuts	ADD INDEX req_line		(req_line_id	);
ALTER TABLE Boxes		ADD INDEX parent		(parent_id		);
ALTER TABLE Boxes		ADD INDEX checkin		(checkin_by		);
ALTER TABLE Boxes		ADD INDEX checkout		(checkout_by	);
ALTER TABLE Boxes		ADD INDEX returned		(returned_by	);
ALTER TABLE ShipDyers	ADD INDEX transport		(transport_id	);

ALTER TABLE Sales		ADD INDEX salesman		(salesman_id	);
ALTER TABLE Machines	ADD INDEX machine_brand	(machine_brand	);
/* -- 2015-05-04	*/
ALTER TABLE BatchOuts		ADD COLUMN supplier_id		BIGINT		DEFAULT NULL	AFTER thread_id;
/* -- 2015-05-10	*/
ALTER TABLE ShipDyers		ADD COLUMN sis_printed		INT			DEFAULT 0		AFTER sds_printed;
/* -- 2015-05-12	*/
ALTER TABLE Quotations		ADD COLUMN purchase_order	VARCHAR(255)	DEFAULT NULL	AFTER payments;
ALTER TABLE Quotations		ADD COLUMN customers		TEXT			DEFAULT NULL	AFTER delivered_pieces;
/* -- 2015-05-18	*/
ALTER TABLE Recipes			ADD COLUMN dyeing_type		VARCHAR(32)		DEFAULT NULL	AFTER recipe;
ALTER TABLE Colors			DROP	COLUMN dyeing_type;

ALTER TABLE ThreadJoined	ADD COLUMN invoice_date		DATE		DEFAULT NULL	AFTER supplier_id;
ALTER TABLE ThreadForecast	ADD COLUMN invoice_date		DATE		DEFAULT NULL	AFTER supplier_id;
/* -- 2015-05-25	*/
ALTER TABLE LoadOuts		ADD COLUMN dyeing_type		VARCHAR(32)	DEFAULT NULL	AFTER dyer_id;
ALTER TABLE Colors			ADD	COLUMN recipes			INT			DEFAULT 0 		AFTER color_name;
/* -- 2015-05-29	*/
ALTER TABLE LoadOuts		ADD COLUMN recipe			VARCHAR(32)	DEFAULT NULL	AFTER color_id;
/* -- 2015-06-06	*/
ALTER TABLE BatchOuts		ADD COLUMN scheduled_date	DATE		DEFAULT NULL	AFTER order_thread_id;
/* -- 2015-06-19	*/
ALTER TABLE ThreadForecast	ADD COLUMN forecast_month_0	DECIMAL(10,2)	DEFAULT 0	AFTER forecast_past;
/* -- 2015-06-27	*/
UPDATE LoadQuotations
   LEFT JOIN  QuotColors AS QuotColor	ON QuotColor.id	=	LoadQuotations.quot_color_id
   LEFT JOIN   QuotLines AS QuotLine	ON  QuotLine.id	=		 QuotColor.parent_id
   LEFT JOIN  Quotations AS Quotation	ON Quotation.id	=		  QuotLine.parent_id
   LEFT JOIN    Contacts AS Customer	ON  Customer.id	=		 Quotation.customer_id
   SET LoadQuotations.status = 'History'
 WHERE LoadQuotations.status = 'Draft'
   AND Customer.nick_name = 'Tecno'
	 ;
UPDATE LoadQuotations
   LEFT JOIN    LoadOuts AS LoadOut		ON   LoadOut.id	=	LoadQuotations.loadout_id
   LEFT JOIN    Contacts AS Dyer    	ON      Dyer.id =          LoadOut.dyer_id
   SET LoadQuotations.status = 'History'
 WHERE LoadQuotations.status = 'Draft'
   AND Dyer.nick_name = 'nada'
	 ;
/* -- 2015-06-30 server Tecno	*/
UPDATE LoadOuts	SET quoted_pieces = 20, quoted_weight = 250 WHERE id = 1000000497;
UPDATE LoadOuts	SET quoted_pieces = 20, quoted_weight = 250 WHERE id = 1000000498;
UPDATE Changes	SET servers = ''	WHERE table_name = 'LoadOuts' AND table_id = 1000000497;
UPDATE Changes	SET servers = ''	WHERE table_name = 'LoadOuts' AND table_id = 1000000498;
/* -- 2015-07-09	*/
ALTER TABLE Recipes			ADD COLUMN remarks			VARCHAR(255)	DEFAULT NULL	AFTER dyeing_type;
/* -- 2015-07-28	*/
ALTER TABLE LoadSets		ADD COLUMN machine_name		VARCHAR(32)		DEFAULT NULL	AFTER load_quot_id;
/* -- 2015-08-03	*/
ALTER TABLE LoadSets		ADD COLUMN checkout_weight	DECIMAL(10,2)	DEFAULT 0		AFTER checkin_weight;
ALTER TABLE LoadSets		ADD COLUMN reserved_weight	DECIMAL(10,2)	DEFAULT 0		AFTER checkin_weight;
/* -- 2015-08-08	*/
ALTER TABLE FTPs			ADD	COLUMN is_current		CHAR(3)			DEFAULT 'No'	AFTER product_id;
ALTER TABLE Batches			ADD COLUMN remarks			TEXT		 	DEFAULT NULL	AFTER used_weight;
/* -- 2015-08-18	*/
ALTER TABLE Purchases		ADD COLUMN remarks			VARCHAR(255)	DEFAULT NULL	AFTER payment_term;
/* -- 2015-10-07	*/
ALTER TABLE LoadOuts		ADD COLUMN printed_at		DATETIME	DEFAULT NULL	AFTER shipdyer_id;
ALTER TABLE LoadOuts		ADD COLUMN is_selected		CHAR(3)		DEFAULT 'No'	AFTER shipdyer_id;
/* -- 2015-10-28	*/
ALTER TABLE LoadOuts		CHANGE	quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadOuts		CHANGE	checkout_weight	checkout_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadOuts		CHANGE	returned_weight	returned_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadQuotations	CHANGE	quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadQuotations	CHANGE	reserved_weight	reserved_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadQuotations	CHANGE	checkout_weight	checkout_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE LoadQuotations	CHANGE	returned_weight	returned_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE OSA_Lines		CHANGE	quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE OSA_Lines		CHANGE	ordered_weight	ordered_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE QuotLines		CHANGE  quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
ALTER TABLE SaleLines		CHANGE  quoted_weight	quoted_weight	DECIMAL(9,2)	DEFAULT 0;
/* -- 2015-10-31	*/
ALTER TABLE Changes			ADD KEY name_id(table_name, table_id);
/* -- 2015-11-09	*/
ALTER TABLE Sales			ADD COLUMN transport_id				BIGINT			DEFAULT NULL	AFTER salesman_id;
/* -- 2015-11-15	*/
ALTER TABLE SaleColors		ADD COLUMN sold_weight				DECIMAL(10,2)	DEFAULT 0		AFTER quoted_price;
/* -- 2015-11-19	*/
ALTER TABLE Pieces			ADD COLUMN product_id				BIGINT			DEFAULT NULL	AFTER product_name;
/* -- 2015-11-20	*/
ALTER TABLE LoadOuts		ADD COLUMN labels_printed			INT				DEFAULT 0		AFTER printed_at;
/* -- 2015-11-23	*/
ALTER TABLE Contacts		ADD COLUMN transport_id    			BIGINT   		DEFAULT NULL	AFTER parent_id;
/* -- 2015-12-11	*/
ALTER TABLE Fabrics			ADD COLUMN saleout_id				BIGINT			DEFAULT NULL	AFTER load_quot_id;
ALTER TABLE Fabrics			ADD COLUMN checkout_weight			DECIMAL(10,2)	DEFAULT 0		AFTER checkin_weight;
ALTER TABLE SaleColors		ADD COLUMN checkout_pieces			INT				DEFAULT 0		AFTER sold_pieces;
ALTER TABLE SaleColors		ADD COLUMN checkout_weight			DECIMAL(10,2)	DEFAULT 0		AFTER sold_weight;
ALTER TABLE Sales			ADD COLUMN checkout_pieces			INT				DEFAULT 0		AFTER sold_pieces;
ALTER TABLE Sales			ADD COLUMN checkout_weight			DECIMAL(10,2)	DEFAULT 0		AFTER sold_weight;
ALTER TABLE Fabrics			ADD COLUMN shipout_by				BIGINT			DEFAULT NULL	AFTER checkout_by;
ALTER TABLE Fabrics			ADD COLUMN shipout_at				DATETIME		DEFAULT NULL	AFTER checkout_at;
/* -- 2015-12-18	*/
ALTER TABLE Pieces			ADD COLUMN ftp_id					BIGINT			DEFAULT NULL	AFTER product_id;
ALTER TABLE Fabrics			ADD COLUMN ftp_id					BIGINT			DEFAULT NULL	AFTER product_id;
/* -- 2015-12-19	*/
UPDATE Pieces, Orders
   SET Pieces.ftp_id = Orders.ftp_id
 WHERE Pieces.order_id = Orders.id
   AND Pieces.ftp_id IS NULL
     ;
UPDATE Pieces 	SET ftp_id = 201058	WHERE order_id = 200026;
UPDATE Pieces 	SET ftp_id = 201126	WHERE order_id = 200155;

UPDATE Fabrics, Orders
   SET Fabrics.ftp_id = Orders.ftp_id
 WHERE Fabrics.order_id = Orders.id
   AND Fabrics.ftp_id IS NULL
     ;
UPDATE Fabrics, FTPs
   SET Fabrics.ftp_id = FTPs.id
 WHERE FTPs.product_id = Fabrics.product_id
   AND FTPs.is_current = 'Yes'
   AND Fabrics.ftp_id IS NULL
	 ;
UPDATE Fabrics	SET ftp_id = 201075	WHERE product_id = 100019;
UPDATE Fabrics	SET ftp_id = 201763	WHERE product_id = 100576;
UPDATE Fabrics	SET ftp_id = null	WHERE product_id = 100759;
UPDATE Fabrics	SET ftp_id = 201609	WHERE product_id = 100973;
UPDATE Fabrics	SET ftp_id = 201325	WHERE product_id = 101400;
UPDATE Fabrics	SET ftp_id = 200719	WHERE product_id = 101412;
UPDATE Fabrics	SET ftp_id = 201797	WHERE product_id = 200275;
/* -- 2015-12-20	*/
ALTER TABLE SaleColors		ADD COLUMN checkout_amount			DECIMAL(10,2)	DEFAULT 0		AFTER sold_amount;
ALTER TABLE SaleLines		ADD COLUMN checkout_amount			DECIMAL(10,2)	DEFAULT 0		AFTER sold_amount;
ALTER TABLE SaleLines		ADD COLUMN checkout_pieces			INT				DEFAULT 0		AFTER sold_pieces;
ALTER TABLE SaleLines		ADD COLUMN checkout_weight			DECIMAL(10,2)	DEFAULT 0		AFTER sold_weight;
ALTER TABLE Sales			ADD COLUMN checkout_amount			DECIMAL(10,2)	DEFAULT 0		AFTER sold_amount;

ALTER TABLE Sales			CHANGE  discount_amount	sold_discount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE SaleLines		CHANGE  discount_amount	sold_discount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE SaleColors		CHANGE  discount_amount	sold_discount	DECIMAL(10,2)	DEFAULT 0;
ALTER TABLE Sales			ADD COLUMN checkout_discount			DECIMAL(10,2)	DEFAULT 0	AFTER sold_discount;
ALTER TABLE SaleLines		ADD COLUMN checkout_discount			DECIMAL(10,2)	DEFAULT 0	AFTER sold_discount;
ALTER TABLE SaleColors		ADD COLUMN checkout_discount			DECIMAL(10,2)	DEFAULT 0	AFTER sold_discount;

/* -- 2015-12-21	*/
UPDATE Fabrics				SET status = 'Ship Out'				WHERE status = 'Check Out';
/* -- 2016-01-30	*/
ALTER TABLE Sales			ADD COLUMN invoice_date				DATETIME		DEFAULT NULL	AFTER sent_date;
/* -- 2016-02-05	*/
ALTER TABLE Pieces			ADD COLUMN received_at				DATETIME		DEFAULT NULL	AFTER checkout_at;
UPDATE Pieces, Fabrics
   SET Pieces.status = 'Received'
     , Pieces.received_at = Fabrics.updated_at
 WHERE Pieces.id = Fabrics.barcode
	 ;
/* -- 2016-02-11	*/
ALTER TABLE Products		ADD COLUMN ncm						VARCHAR(32)		DEFAULT NULL	AFTER units;
/* -- 2016-02-17	*/
ALTER TABLE SaleOuts		ADD COLUMN assigned_by				BIGINT			DEFAULT NULL	AFTER color_id;
/* -- 2016-02-18	*/
ALTER TABLE JKY_Users		ADD COLUMN pin						VARCHAR(32)		DEFAULT NULL	AFTER password;
/* -- 2016-03-04	*/
ALTER TABLE Products		ADD COLUMN family_id				BIGINT			DEFAULT NULL	AFTER parent_id;
/* -- 2016-03-10	*/
ALTER TABLE JKY_Users		ADD COLUMN user_email				VARCHAR(255)	DEFAULT NULL	AFTER user_role;
/* -- 2016-03-11	*/
RENAME TABLE JKY_Users TO Users;
UPDATE NextIds				SET table_name = 'Users'		WHERE table_name = 'JKY_Users'; 
/* -- 2014/03/12	*/
ALTER TABLE Products		ADD		remarks					TEXT		 	DEFAULT NULL	AFTER yield;
/* -- 2016-03-19	*/
ALTER TABLE Pieces			ADD COLUMN weaver_shift				CHAR(2)			DEFAULT NULL	AFTER returned_by;
ALTER TABLE Pieces			ADD COLUMN weaver_date				DATE			DEFAULT NULL	AFTER returned_by;
ALTER TABLE Pieces			ADD COLUMN weaver_by				BIGINT			DEFAULT NULL	AFTER returned_by;
/* -- 2016-03-25	*/
ALTER TABLE Users			ADD COLUMN user_shift				CHAR(2)			DEFAULT NULL	AFTER user_role;