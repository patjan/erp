DROP   TABLE IF     EXISTS Users;
CREATE TABLE IF NOT EXISTS Users
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, contact_id		BIGINT				DEFAULT NULL
, start_date		DATE				DEFAULT NULL
, end_date			DATE				DEFAULT NULL
, user_name			VARCHAR(255)		NOT NULL		// unique
, user_type 		VARCHAR(32)			DEFAULT 'User'
, user_role 		VARCHAR(32)			DEFAULT 'Guest'
, user_shift		CHAR(2)				DEFAULT NULL	# 1T 2T 3T
, user_email		VARCHAR(255)		DEFAULT NULL
, user_key 			VARCHAR(255)		DEFAULT NULL
, password			VARCHAR(255)		DEFAULT NULL
, pin				VARCHAR(32)			DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE(user_name)
, KEY contact		(contact_id	)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT INTO Users
(`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(1, NULL, NULL, NULL, NULL, 'Active', 4, '2012-09-24', NULL, 'patjan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');
INSERT INTO Users
(`id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`, `contact_id`, `start_date`, `end_date`, `user_name`, `user_type`, `user_role`, `user_key`, `password`) VALUES
(2, NULL, NULL, NULL, NULL, 'Active', 5, '2012-09-24', NULL, 'joeljan', 'Support', 'Support', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f', '6e5fa4d9c48ca921c0a2ce1e64c9ae6f');


UPDATE Users SET pin = '3459' WHERE id = 100001; 
UPDATE Users SET pin = '2037' WHERE id = 100002; 
UPDATE Users SET pin = '9806' WHERE id = 100003;
UPDATE Users SET pin = '2920' WHERE id = 100022;
UPDATE Users SET pin = '5182' WHERE id = 100023; 
UPDATE Users SET pin = '7152' WHERE id = 100024; 
UPDATE Users SET pin = '2141' WHERE id = 100025; 
UPDATE Users SET pin = '9613' WHERE id = 100026; 
UPDATE Users SET pin = '7424' WHERE id = 100027; 
UPDATE Users SET pin = '8284' WHERE id = 100028; 
UPDATE Users SET pin = '9147' WHERE id = 100029; 
UPDATE Users SET pin = '8830' WHERE id = 100030; 
UPDATE Users SET pin = '6973' WHERE id = 100031; 
UPDATE Users SET pin = '2218' WHERE id = 100032; 
UPDATE Users SET pin = '1724' WHERE id = 100033; 
UPDATE Users SET pin = '4206' WHERE id = 100034; 
UPDATE Users SET pin = '5148' WHERE id = 100035; 
UPDATE Users SET pin = '9954' WHERE id = 100037; 
UPDATE Users SET pin = '8229' WHERE id = 100038; 
UPDATE Users SET pin = '1283' WHERE id = 100039; 
UPDATE Users SET pin = '1728' WHERE id = 100040; 
UPDATE Users SET pin = '4791' WHERE id = 100042; 
UPDATE Users SET pin = '8772' WHERE id = 100051; 
UPDATE Users SET pin = '9490' WHERE id = 200001; 
UPDATE Users SET pin = '1131' WHERE id = 200002; 
UPDATE Users SET pin = '7185' WHERE id = 200003; 
UPDATE Users SET pin = '2535' WHERE id = 200015; 
UPDATE Users SET pin = '1122' WHERE id = 100053; 
UPDATE Users SET pin = '8002' WHERE id = 200008; 
UPDATE Users SET pin = '6647' WHERE id = 100065; 
UPDATE Users SET pin = '9227' WHERE id = 100064; 
UPDATE Users SET pin = '6196' WHERE id = 200013; 
UPDATE Users SET pin = '3299' WHERE id = 100052; 
UPDATE Users SET pin = '7907' WHERE id = 100048; 
UPDATE Users SET pin = '9641' WHERE id = 200016; 
UPDATE Users SET pin = '4482' WHERE id = 100050; 
UPDATE Users SET pin = '3488' WHERE id = 100063; 
UPDATE Users SET pin = '3993' WHERE id = 200018; 
UPDATE Users SET pin = '9502' WHERE id = 100056; 
UPDATE Users SET pin = '5531' WHERE id = 100058; 
UPDATE Users SET pin = '9151' WHERE id = 100059; 
UPDATE Users SET pin = '9163' WHERE id = 100062; 
UPDATE Users SET pin = '8361' WHERE id = 100061; 
UPDATE Users SET pin = '4315' WHERE id = 200017; 
UPDATE Users SET pin = '6495' WHERE id = 100066; 
UPDATE Users SET pin = '9528' WHERE id = 100067; 
UPDATE Users SET pin = '8158' WHERE id = 100068; 
UPDATE Users SET pin = '2204' WHERE id = 200019; 
UPDATE Users SET pin = '6547' WHERE id = 100069; 
UPDATE Users SET pin = '1211' WHERE id = 100072; 
