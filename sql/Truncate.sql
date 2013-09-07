TRUNCATE TABLE	Batches			;
TRUNCATE TABLE 	BatchOuts		;
TRUNCATE TABLE 	BatchSets		;
TRUNCATE TABLE 	Boxes			;
TRUNCATE TABLE 	CheckOuts		;
TRUNCATE TABLE 	Incomings		;
TRUNCATE TABLE 	Orders			;
TRUNCATE TABLE 	OrdThreads	;
TRUNCATE TABLE 	Pieces			;
TRUNCATE TABLE 	PurchaseLines	;
TRUNCATE TABLE 	Purchases		;
TRUNCATE TABLE 	Quotations		;
TRUNCATE TABLE 	QuotLines		;
TRUNCATE TABLE 	QuotColors		;
TRUNCATE TABLE 	ReqLines		;
TRUNCATE TABLE 	Requests		;
TRUNCATE TABLE 	TDyers			;
TRUNCATE TABLE 	TDyerThreads	;
TRUNCATE TABLE 	TDyerColors		;
TRUNCATE TABLE 	ThreadForecast	;

ALTER TABLE Boxes		AUTO_INCREMENT	= 1000000001;
UPDATE		Controls	SET value		= 1000000001	WHERE group_set = 'System Numbers' AND name = 'Next Box Number';

ALTER TABLE CheckOuts	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number';

ALTER TABLE Incomings	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number';

ALTER TABLE Orders		AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Order Number';

ALTER TABLE Pieces		AUTO_INCREMENT	= 1000000001;
UPDATE		Controls	SET value 		= 1000000001	WHERE group_set = 'System Numbers' AND name = 'Next Pieces Number';

ALTER TABLE Purchases	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number';

ALTER TABLE Quotations	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number';

ALTER TABLE Requests	AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next Request Number';

ALTER TABLE TDyers		AUTO_INCREMENT	= 100001;
UPDATE		Controls	SET value 		= 100001		WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number';
