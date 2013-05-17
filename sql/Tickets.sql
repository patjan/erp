DROP   TABLE IF     EXISTS Tickets;
CREATE TABLE IF NOT EXISTS Tickets
( id				BIGINT				NOT NULL AUTO_INCREMENT
, created_by		BIGINT				DEFAULT NULL
, created_at		DATETIME			DEFAULT NULL
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, company_id		BIGINT				DEFAULT NULL
, opened_by			BIGINT				DEFAULT NULL
, opened_at			DATETIME			DEFAULT NULL
, assigned_to		BIGINT				DEFAULT NULL
, assigned_at		DATETIME			DEFAULT NULL
, closed_by			BIGINT				DEFAULT NULL
, closed_at			DATETIME			DEFAULT NULL
, estimate_hour		DECIMAL(4,1)		DEFAULT 0
, worked_hour		DECIMAL(4,1)		DEFAULT 0
, priority			VARCHAR(32)			DEFAULT NULL
, category			VARCHAR(32)			DEFAULT NULL
, photo				VARCHAR(255)		DEFAULT NULL
, description		TEXT				DEFAULT NULL
, resolution		TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY opened_by		(opened_by		)
, KEY opened_at		(opened_at		)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

ALTER TABLE Tickets		ADD COLUMN category			VARCHAR(32)		DEFAULT NULL	AFTER priority;
ALTER TABLE Tickets		ADD COLUMN worked_hour		DECIMAL(4,1)	DEFAULT 0		AFTER closed_at;
ALTER TABLE Tickets		ADD COLUMN estimate_hour	DECIMAL(4,1)	DEFAULT 0		AFTER closed_at;
ALTER TABLE Tickets		CHANGE attachment	photo	VARCHAR(255); 

UPDATE Tickets			SET status = 'Open'			WHERE status = 'Active';
UPDATE Tickets			SET category = 'AjaxController'	, description = substr(description,18)			WHERE description like 'AjaxController%';
UPDATE Tickets			SET category = 'Configs'		, description = substr(description,11)			WHERE description like 'Configs%';
UPDATE Tickets			SET category = 'Contacts'		, description = substr(description,12)			WHERE description like 'Contacts%';
UPDATE Tickets			SET category = 'Controls'		, description = substr(description,12)			WHERE description like 'Controls%';
UPDATE Tickets			SET category = 'Customers'		, description = substr(description,13)			WHERE description like 'Customers%';
UPDATE Tickets			SET category = 'FTPs'			, description = substr(description, 8)			WHERE description like 'FTPs%';
UPDATE Tickets			SET category = 'General'		, description = substr(description,11)			WHERE description like 'General%';
UPDATE Tickets			SET category = 'Home'			, description = substr(description, 8)			WHERE description like 'Home%';
UPDATE Tickets			SET category = 'Login'			, description = substr(description, 9)			WHERE description like 'Login%';
UPDATE Tickets			SET category = 'Machines'		, description = substr(description,12)			WHERE description like 'Machines%';
UPDATE Tickets			SET category = 'Models'			, description = substr(description, 8)			WHERE description like 'Models.%';	
UPDATE Tickets			SET category = 'Permissions'	, description = substr(description,15)			WHERE description like 'Permissions%';
UPDATE Tickets			SET category = 'Products'		, description = substr(description,12)			WHERE description like 'Products%';
UPDATE Tickets			SET category = 'Profile'		, description = substr(description,11)			WHERE description like 'Profile%';
UPDATE Tickets			SET category = 'Templates'		, description = substr(description,13)			WHERE description like 'Templates%';
UPDATE Tickets			SET category = 'Threads'		, description = substr(description,11)			WHERE description like 'Threads%';
UPDATE Tickets			SET category = 'Tickets'		, description = substr(description,11)			WHERE description like 'Tickets%';
UPDATE Tickets			SET category = 'Translations'	, description = substr(description,16)			WHERE description like 'Translations%';

SELECT category, count(*)
  FROM Tickets
 GROUP BY category
 
AjaxController 	69
Configs		 	13
Contacts	 	14
Controls	 	14
Customers	 	19
FTPs		 	30
General		 	33
Home		 	10
Login		 	13
Machines	 	20
Models		 	42
Permissions 	14
Products 		18
Profile 		 5
Templates 		 9
Threads 		16
Tickets 		19
Translations 	 8