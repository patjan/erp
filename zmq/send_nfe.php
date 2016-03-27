<?php
/*
*  Hello World client
*  Connects REQ socket to tcp://localhost:5555
*  Sends "Hello" to server, expects "World" back
* @author Ian Barber <ian(dot)barber(at)gmail(dot)com>
*/

$context = new ZMQContext();

//  Socket to talk to server
echo "Connecting to ERP server...\n";
$socket = $context->getSocket(ZMQ::SOCKET_PUB);
$socket->bind("tcp://127.0.0.1:5551");

for ($request_nbr = 0; $request_nbr != 10; $request_nbr++) {
	sleep(1);
	$message = "ERP to NFE " . $request_nbr;
	$socket->send($message);
	printf ("Sent reply " . $message . "\n");
}
