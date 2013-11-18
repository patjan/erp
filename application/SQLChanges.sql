DROP TABLE IF EXISTS SQLChanges;

CREATE TABLE IF NOT EXISTS SQLChanges
(	Id			int(11) unsigned	NOT NULL	auto_increment
,	Created		datetime			NOT NULL	default '0000-00-00 00:00:00'
,	Updated		datetime			NOT NULL	default '0000-00-00 00:00:00'
,	UserId		int(11) unsigned	NOT NULL	default '0'
,	Status		char(1)			NOT NULL	default 'A'

,	TableId		int(11) unsigned	default '0'			# table key id
,	TableName		varchar(99)		default NULL			# table name

,	PRIMARY KEY( Id )
,	KEY SQLChange( TableId, TableName )
);


