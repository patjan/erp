DROP   TABLE IF     EXISTS LoadOrders;
CREATE TABLE IF NOT EXISTS LoadOrders
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Draft'

, loadout_id		BIGINT				DEFAULT NULL
, order_id			BIGINT				DEFAULT NULL
, requested_pieces	INT					DEFAULT 0
, loadout_pieces	INT					DEFAULT 0
, returned_pieces	INT					DEFAULT 0

, PRIMARY KEY(id)
, KEY loadout		(loadout_id)
, KEY order_id		(order_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
