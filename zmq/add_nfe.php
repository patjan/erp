<?php
/*
*  Hello World client
*  Connects REQ socket to tcp://localhost:5555
*  Sends "Hello" to server, expects "World" back
* @author Ian Barber <ian(dot)barber(at)gmail(dot)com>
*/

$context = new ZMQContext();

//  Socket to talk to server
printf("Connecting to ERP server...\n");
$confirm = $context->getSocket(ZMQ::SOCKET_PUB);
$confirm->bind("tcp://127.0.0.1:5559");
$socket = $context->getSocket(ZMQ::SOCKET_SUB);
$socket->connect("tcp://127.0.0.1:5551");
$socket->setSockOpt(ZMQ::SOCKOPT_SUBSCRIBE, "");
printf("Waiting for ERP server...\n");

while (true) {
	$message = $socket->recv();
	printf ("Received message %s\n", $message);
	
	sleep(1);
//	$random  = (int) rand() * 1000000;
//	$message = "NFE processed invoice: " . $random;
	$json = json_decode($message, true);
//var_dump($json);	
	$table_name = $json['table_name'];
	$table_id	= $json['table_id'	];
	$message = "NFE processed invoice: " . "table_name: " . $table_name . ", table_id: " . $table_id;
	printf ("Sending confirmation: %s\n", $message);
	$confirm->send($message);
}
