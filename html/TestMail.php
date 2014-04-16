<?php
$to = "pat_jan@hotmail.com";
$subject = "Test mail from " . $_SERVER["SERVER_NAME"];
$message = "Hello! This is a simple email message.";
$from = "patjan2000@gmail.com";
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent from " . $_SERVER["SERVER_NAME"];
?> 




smtp.gmail.com;marcelo@metatex.com.br;bolovisk1977;tls;587

"\u00005.7.85.7.8"