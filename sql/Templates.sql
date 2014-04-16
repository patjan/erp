DROP   TABLE IF     EXISTS Templates;
CREATE TABLE IF NOT EXISTS Templates
( id                BIGINT				NOT NULL AUTO_INCREMENT
, created_by        BIGINT				DEFAULT NULL
, created_at        DATETIME			DEFAULT NULL
, updated_by        BIGINT				DEFAULT NULL
, updated_at        DATETIME			DEFAULT NULL
, status            VARCHAR(32)         DEFAULT 'Active'

, company_id        BIGINT UNSIGNED     NULL
, template_name     VARCHAR(255)        NULL

, template_type     VARCHAR(32)         NULL                          # by event / by time / mass email
, template_subject  VARCHAR(255)        NULL
, template_body     TEXT                NULL
, template_sql      TEXT                NULL
, description       TEXT                NULL

, PRIMARY KEY  ( id )
, KEY company  ( company_id )
, KEY name     ( template_name )
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1
;
