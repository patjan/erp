DROP   TABLE IF     EXISTS Schedules;
CREATE TABLE IF NOT EXISTS Schedules
( id				BIGINT				NOT NULL AUTO_INCREMENT
, updated_by		BIGINT				DEFAULT NULL
, updated_at		DATETIME			DEFAULT NULL
, status			VARCHAR(32)			DEFAULT 'Active'

, schedule_date		DATE				DEFAULT NULL
, shift_1_hours		INT					DEFAULT 8
, shift_2_hours		INT					DEFAULT 8
, shift_3_hours		INT					DEFAULT 8
, remarks			TEXT				DEFAULT NULL

, PRIMARY KEY(id)
, UNIQUE (schedule_date)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
INSERT NextIds	SET table_name='Schedules', next_id=1, id_size=9;
INSERT Controls SET group_set='User Resources'		, status='Active', sequence=  50, name='Schedules', updated_by=1, updated_at=NOW();
INSERT Controls SET group_set='Ticket Categories'	, status='Active', sequence=  50, name='Schedules', updated_by=1, updated_at=NOW();

INSERT Schedules	SET updated_by=1, updated_at=NOW(), schedule_date=NOW();
