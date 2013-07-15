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
ALTER TABLE CheckOuts		CHANGE	checkout_id		supplier_id		BIGINT;
