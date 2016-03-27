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
$requestor = $context->getSocket(ZMQ::SOCKET_SUB);
$requestor->connect("tcp://127.0.0.1:5551");
$requestor->setSockOpt(ZMQ::SOCKOPT_SUBSCRIBE, '');
printf("Waiting for ERP server...\n");

while (true) {
	$message = $requestor->recv();
	printf ("Received message: %s\n", $message);
}
