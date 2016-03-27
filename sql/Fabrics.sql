DROP   TABLE IF     EXISTS Fabrics;
CREATE TABLE IF NOT EXISTS Fabrics
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'	# Active	> Check In
															# Check In	> Check Out
															# Check Out	> Ship Out
															# Check Out	> Return
															# Return	> Check Out
, order_id			BIGINT				DEFAULT NULL
, load_quot_id		BIGINT				DEFAULT NULL
, saleout_id		BIGINT				DEFAULT NULL
, barcode			VARCHAR(32)			DEFAULT NULL
, is_printed		CHAR(3)				DEFAULT 'No'
, number_of_pieces	INT(11)				DEFAULT 0
, produced_by		VARCHAR(32)			DEFAULT NULL		# machine | partner
, product_name		VARCHAR(255)		DEFAULT NULL
, product_id		BIGINT				DEFAULT NULL
, ftp_id			BIGINT				DEFAULT NULL
, color_name		VARCHAR(255)		DEFAULT NULL
, color_id			BIGINT				DEFAULT NULL
, loadout_id		BIGINT				DEFAULT NULL

, revised_by		BIGINT				DEFAULT NULL
, weighed_by		BIGINT				DEFAULT NULL
, checkout_by		BIGINT				DEFAULT NULL
, shipout_by		BIGINT				DEFAULT NULL
, returned_by		BIGINT				DEFAULT NULL

, checkin_location	VARCHAR(32)			DEFAULT NULL
, checkout_location	VARCHAR(32)			DEFAULT NULL		# dyer name
, returned_location	VARCHAR(32)			DEFAULT NULL

, checkin_at		DATETIME			DEFAULT NULL
, checkout_at		DATETIME			DEFAULT NULL
, shipout_at		DATETIME			DEFAULT NULL
, returned_at		DATETIME			DEFAULT NULL

, checkin_weight	DECIMAL(10,2)		DEFAULT 0
, checkout_weight	DECIMAL(10,2)		DEFAULT 0
, returned_weight	DECIMAL(10,2)		DEFAULT 0

, qualities			VARCHAR(255)		DEFAULT NULL
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY barcode	(barcode)
, KEY order_id	(order_id)
, KEY revised	(revised_by)
, KEY weighed	(weighed_by)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;

INSERT NextIds	SET table_name='Fabrics', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=50, name='Fabrics', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=50, name='Fabrics', updated_by=1, updated_at=NOW();

barcode
product_name
product_id - fpt.composition
color_name
color_id
load_quot_id - loadout_id
location


1. Mapear as areas de estocagem de Tecidos
2. Colocar num carinho: um computador e uma impressoa de barra ligado na rede
3. Por cada area de estocagem, contar as pecas por: Produto, cor, barca
4. Imprimir na hora as etiquetas sequencial a partir de 1000000000
5. Colar as etiquetas nos Tecidos e recolocar na area especificada

6. Na saida de Tecidos, ler o codigo de barra (para dar baixa)

	    Mapa: 9X99
	   Barca: 123456789
     Produto: XXXXXXXXXXXXXXXXXX 
         Cor: XXXXXXXXXXXXXXXXXX
Numero Peças: 99
 
SELECT status, COUNT(*)
  FROM Fabrics
 WHERE saleout_id IS NULL
 GROUP BY status