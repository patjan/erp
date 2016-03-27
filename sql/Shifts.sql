DROP   TABLE IF     EXISTS Shifts;
CREATE TABLE IF NOT EXISTS Shifts
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, schedule_id		BIGINT				DEFAULT NULL
, shift_code		CHAR(2)				DEFAULT NULL		# turno 1T 2T 3T
, machine_id		BIGINT				DEFAULT NULL
, weaver_id			BIGINT				DEFAULT NULL
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, KEY schedule		(schedule_id)
, KEY weaver		(weaver_id)
, KEY machine		(machine_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='Shifts', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Shifts', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Shifts', updated_by=1, updated_at=NOW();
