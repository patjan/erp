#	Updated on 2013-10-31

TRUNCATE TABLE 	LoadOuts		;
TRUNCATE TABLE 	LoadQuotations	;
TRUNCATE TABLE 	LoadSales		;
TRUNCATE TABLE 	LoadSets		;
TRUNCATE TABLE 	Orders			;
TRUNCATE TABLE 	OrdThreads		;
TRUNCATE TABLE 	OSAs			;
TRUNCATE TABLE 	OSA_Lines		;
TRUNCATE TABLE 	Pieces			;
TRUNCATE TABLE 	Quotations		;
TRUNCATE TABLE 	QuotColors		;
TRUNCATE TABLE 	QuotLines		;
TRUNCATE TABLE 	TDyerColors		;
TRUNCATE TABLE 	TDyers			;
TRUNCATE TABLE 	TDyerThreads	;


TRUNCATE TABLE	Batches			;
TRUNCATE TABLE 	BatchOuts		;
TRUNCATE TABLE 	BatchSets		;
TRUNCATE TABLE 	Boxes			;
TRUNCATE TABLE 	CheckOuts		;
TRUNCATE TABLE 	Incomings		;
TRUNCATE TABLE 	LoadIns			;
TRUNCATE TABLE 	PurchaseLines	;
TRUNCATE TABLE 	Purchases		;
TRUNCATE TABLE 	ReqLines		;
TRUNCATE TABLE 	Requests		;

DELETE FROM History	WHERE parent_name = 'Batches'		;
DELETE FROM History	WHERE parent_name = 'BatchOuts'		;
DELETE FROM History	WHERE parent_name = 'BatchSets'		;
DELETE FROM History	WHERE parent_name = 'Boxes'			;
DELETE FROM History	WHERE parent_name = 'CheckOuts'		;
DELETE FROM History	WHERE parent_name = 'Incomings'		;
DELETE FROM History	WHERE parent_name = 'Orders'		;
DELETE FROM History	WHERE parent_name = 'OrdThreads'	;
DELETE FROM History	WHERE parent_name = 'Pieces'		;
DELETE FROM History	WHERE parent_name = 'PurchaseLines'	;
DELETE FROM History	WHERE parent_name = 'Purchases'		;
DELETE FROM History	WHERE parent_name = 'Quotations'	;
DELETE FROM History	WHERE parent_name = 'QuotColors'	;
DELETE FROM History	WHERE parent_name = 'QuotLines'		;
DELETE FROM History	WHERE parent_name = 'ReqLines'		;
DELETE FROM History	WHERE parent_name = 'Requests'		;
DELETE FROM History	WHERE parent_name = 'TDyerColors'	;
DELETE FROM History	WHERE parent_name = 'TDyers'		;
DELETE FROM History	WHERE parent_name = 'TDyerThreads'	;

UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Batches'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'BatchOuts'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'BatchSets'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Boxes'			; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'CheckOuts'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Incomings'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Orders'			; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'OrdThreads'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Pieces'			; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'PurchaseLines'	; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Purchases'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Quotations'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'QuotColors'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'QuotLines'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'ReqLines'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'Requests'		; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'TDyerColors'	; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'TDyers'			; 
UPDATE NextIds	SET next_id = 1			WHERE table_name = 'TDyerThreads'	; 

UPDATE Controls	SET value = 2000000001	WHERE group_set = 'System Numbers' AND name = 'Next Box Number'			;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next CheckOut Number'	;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next Incoming Number'	;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next Order Number'		;
UPDATE Controls	SET value = 2000000001	WHERE group_set = 'System Numbers' AND name = 'Next Piece Number'		;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next Purchase Number'	;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next Quotation Number'	;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next Request Number'		;
UPDATE Controls	SET value = 200001		WHERE group_set = 'System Numbers' AND name = 'Next TDyer Number'		;

