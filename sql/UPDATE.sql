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

ALTER TABLE FTPs		ADD COLUMN peso    				DECIMAL(5,2)	DEFAULT 0		AFTER needling;
UPDATE		FTPs		SET peso = 12.5;

----- 2013/06/01
ALTER TABLE FTPs      CHANGE needling	needling	VARCHAR(32)		DEFAULT NULL;
ALTER TABLE FTPs      CHANGE yield		elasticity	INT(11)			DEFAULT 0;
----- 2013/06/02
ALTER TABLE Contacts      ADD COLUMN		nick_name	VARCHAR(255)	DEFAULT NULL  AFTER photo;
ALTER TABLE Contacts      ADD UNIQUE KEY	nick_name	(nick_name);
----- 2013/06/05
ALTER TABLE Products		CHANGE name product_name			VARCHAR(255)		DEFAULT NULL	;
