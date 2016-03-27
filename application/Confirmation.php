<?php
/**
 *	Process all NFE Confirmation
 *
 *	cd \htdocs\erp\application
 *	php Confirmation.php
 *
 *	author: Pat Jan
 *
 */
require_once 'Constant.php';
require_once  'Utility.php';

date_default_timezone_set('America/Sao_Paulo');

$program = 'Confirmation';
log_prog($program, 'start');

$context = new ZMQContext();

printf('Connecting to ZMQ service on port: 5559' . "\n");
$socket = $context->getSocket(ZMQ::SOCKET_SUB);
$socket->connect('tcp://127.0.0.1:5559');
$socket->setSockOpt(ZMQ::SOCKOPT_SUBSCRIBE, 'NFE RECV');
printf('Waiting for NFE RECV' . "\n");

while(true) {
	$my_message = $socket->recv();
	$my_json = json_decode(substr($my_message, 10), true);

	$my_table_name	= $my_json['table_name'	];
	$my_table_id	= $my_json['table_id'	];
	$my_nfe_id		= $my_json['nfe_id'		];

	$my_message = 'Received ' . $my_table_name . ' = ' . $my_table_id . ', nfe_id = ' . $my_nfe_id;
	echo $my_message . NL;
	log_prog($program, $my_message);

	if ($my_table_name === 'Sales'
	or  $my_table_name === 'ShipDyers') {

//		connect to the database and select the first row that needs to be encoded
		$db_link = mysql_connect( DB_HOST, DB_USER, DB_PASS ) or die( 'Unable to connect database ' . DB_HOST );
		mysql_select_db( DB_NAME, $db_link )                  or die( 'Unable to  select database ' . DB_NAME );

		$sql= 'UPDATE Invoices'
			. '   SET received_at =\'' . get_now()		. '\''
			. '     , returned_id =  ' . $my_nfe_id
			. ' WHERE table_name  =\'' . $my_table_name	. '\''
			. '   AND table_id    =  ' . $my_table_id
			;
		log_prog($program, 'sql = ' . $sql);
		$my_result = mysql_query($sql);

		mysql_close($db_link);
	}
}

log_prog($program, 'end');
