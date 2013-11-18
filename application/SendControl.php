<?php
//	Program:	SendControl
//
//	Command:	C:/PHP/php.exe SendControl.php name value
//			C:/PHP/php.exe SendControl.php SETIP jky
//
// Descricao:	Send control update from Local to Server
//
//	 Domain:	Process only on local computers
//			this program is started by Scheduled Tasks every 10 minutes

	if(	$argc > 2 ) {
		set_time_limit( 0 );
		$Time	= date( 'Y-m-d+H:i:s' );
		$Name	= $argv[ 1 ];
		$Value	= $argv[ 2 ];
		$Key		= EncryptHash( 'Secret' . $Time . $Name . $Value );
		$Result	= SendData( $Time, $Name, $Value, $Key );
		Display( $_SERVER[ 'PHP_SELF' ] . ' ' . $Name . ' ' . $Value . ' with ' . $Result );
	}

// -----------------------------------------------------------------------------------------

function SendData( $Time, $Name, $Value, $Key )
{
	$Name = str_replace( '&', '%26', $Name );
//	  $cURL =curl_init( 'http://www.tecnomalhas.com/php/ProcessControl.php' );
//	  $cURL =curl_init( 'http://208.109.128.165/php/ProcessControl.php' );
	$cURL =curl_init( 'http://50.63.212.146/php/ProcessControl.php' );
//	  $cURL =curl_init( 'localhost/tecno/php/ProcessControl.php' );
	curl_setopt( $cURL, CURLOPT_POST, 1 );
	curl_setopt( $cURL, CURLOPT_POSTFIELDS, 'time=' . $Time . '&name=' . $Name . '&value=' . $Value . '&key=' . $Key );
	curl_setopt( $cURL, CURLOPT_RETURNTRANSFER, 1 );
	$Html = curl_exec( $cURL );
	curl_close( $cURL );
	return OnlyString( $Html );
}

function EncryptHash( $String )
{
	$Encrypted = MD5( $String );
	return $Encrypted;
}

function Display( $pMessage )
{
	$Date = date( 'Y-m-d' );
	$Time = date( 'H:i:s' );
	$File = fopen( '../LogBatch/' . $Date . '.txt', 'a' ) or die( 'cannot open Log Batch file' );
	fwrite( $File, GetNow() . $pMessage . "\r\n" );
	fclose( $File );
}

function GetNow()
{
	$MilliSec = explode( ' ', microtime());
	return date( 'Y-m-d H:i:s' ) . substr( $MilliSec[ 0 ], 1, 4 ) . ' ';
}

function OnlyString( $String )
{
	$myString = '';
	for( $I = 0; $I < strlen( $String ); $I++ )
	{
		$C = $String[ $I ];
		if(	$C == ' ' || ( $C >= '0' && $C <= '9' ) || ( $C >= 'a' && $C <= 'z' ) || ( $C >= 'A' && $C <= 'Z' ) )
			$myString .= $C;
	}
	return $myString;
}

?>
