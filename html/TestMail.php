<?php
$to = "pat_jan@hotmail.com";
$subject = "Test mail from " . $_SERVER["SERVER_NAME"];
$message = "Hello! This is a simple email message.";
$from = "patjan2000@gmail.com";
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent from " . $_SERVER["SERVER_NAME"];
?> 
