<?php
/**
 *	Resend all unconfirmed Invoices
 *
 *	cd \htdocs\erp\application
 *	php ProcessInvoices.php
 *
 *	author: Pat Jan
 *
 */
require_once 'Constant.php';
require_once  'Utility.php';

date_default_timezone_set('America/Sao_Paulo');

$program = 'ProcessInvoice';
log_prog($program, 'start');

//	connect to the database and select the first row that needs to be encoded
$db_link = mysql_connect( DB_HOST, DB_USER, DB_PASS ) or die( 'Unable to connect database ' . DB_HOST );
mysql_select_db( DB_NAME, $db_link )                  or die( 'Unable to  select database ' . DB_NAME );

$sql= 'SELECT *'
	. '  FROM Invoices'
	. ' WHERE received_at IS NULL'		//	not confirmed
	. '   AND TIMESTAMPDIFF(HOUR, updated_at, "' . get_now() . '") < 1'
	;
log_prog($program, $sql);
$my_result = mysql_query($sql);

while($my_row = mysql_fetch_assoc($my_result)) {
	send_message($my_row['json_data']);
	log_prog($program, 'RESEND ' . $my_row['table_name'] . '=' . $my_row['table_id'] . ', from=' . $my_row['updated_at']);
}

mysql_close($db_link);
log_prog($program, 'end');
