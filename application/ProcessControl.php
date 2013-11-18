<?php
//   Program:  ProcessControl
//
// Descricao:  Process control update from Local to Server
//
//    Domain:  Process only on server computers

class Program {

function Run() {

//   $LocalHost     = 'localhost';
//   $UserName      = 'root';
//   $Password      = 'phrsj1481';

     $LocalHost     = 'tecno2012.db.8682013.hostedresource.com';
     $UserName      = 'tecno2012';
     $Password      = 'Segredo2012';

     $Reply = 'Error';
     $NumRows = 0;

     $IP = $_SERVER[ 'REMOTE_ADDR' ];
     $Time     = GetRequest( 'time'     );
     $Name     = GetRequest( 'name'     );
     $Value    = GetRequest( 'value'    );
     $Input    = ' time: ' . $Time . ', name: ' . $Name . ', value: ' . $Value;

     $Key = EncryptHash( 'Secret' . str_replace( ' ', '+', $Time . $Name . $Value ));
     if(  $Key != GetRequest( 'key' )) {
          Display( 'From IP: ' . $IP . ' error on key,' . $Input );
     } else {

     $LocalLink = @ mysql_pconnect( $LocalHost, $UserName, $Password );
     if(  ! $LocalLink ) {
          Display( 'From IP: ' . $IP . ' error to conect DB: ' . $LocalHost . ',' . $Input );
     } else {

     $Hours = DiffHours( $Time, date( 'Y-m-d H:i:s' ));
     if(  substr( $IP, 0, 4 ) == '201.' )         $Hours = $Hours + 5;
     if(  substr( $IP, 0, 4 ) == '177.' )         $Hours = $Hours + 5;
     if(  substr( $IP, 0, 3 ) ==  '76.' )         $Hours = $Hours - 1;
     if(  $Hours < 0 ) {
          Display( 'From IP: ' . $IP . ' error on time,' . $Input . ', hours: ' . $Hours );
     } else {

     if(  substr( $IP, 0, 4 ) == '201.' ) {
          SetControle( $LocalLink, 'UpMost Time', $Time );
     }
     if(  substr( $IP, 0, 4 ) == '187.' ) {
          SetControle( $LocalLink, 'UpMost Time', $Time );
     }

     if(  $Name == 'SETIP' ) {
          UpdateIP( $LocalLink, $Value . ' IP', $IP );
     } else {
          SetControle( $LocalLink, $Name, $Value );
     }

     $Reply = 'OK';

     }}}
     echo 'Result: ' . $Reply . ', ' . $NumRows;
}

} //class

// -----------------------------------------------------------------------------------------

function UpdateIP( $LocalLink, $From, $IP ) {
     $Value = GetControle( $LocalLink, $From );
     if(  $Value != null && $Value != $IP ) {
          SetControle( $LocalLink, $From, $IP );
          Display( 'From IP: ' . $IP . ' IP updated from [' . $From . ']' );
     }
}

function EncryptHash( $String )
{
     $Encrypted = MD5( $String );
     return $Encrypted;
}

function Display( $pMessage ) {
     $Date = date( 'Y-m-d' );
     $Time = date( 'H:i:s' );
     $File = fopen( '../LogBatch/' . $Date . '.txt', 'a' ) or die( 'cannot open Log Batch file' );
     fwrite( $File, GetNow() . $pMessage . "\r\n" );
     fclose( $File );
}

function GetControle( $LocalLink, $Nome ) {
     $SQL = 'SELECT Valor'
          . '  FROM tecno2012.Controles'
          . ' WHERE Nome = "' . $Nome . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if(  ! $Result ) {
          Display( 'Lost the connection to DB Local, Result: ' . $Result );
          return null;
     }

     $Record = mysql_fetch_array( $Result );
     return $Record[ 'Valor' ];
}

function SetControle( $LocalLink, $Nome, $Valor ) {
     $SQL = 'UPDATE tecno2012.Controles'
          . '   SET Valor = "' . $Valor . '"'
          . ' WHERE Nome  = "' . $Nome  . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if(  ! $Result ) {
          Display( 'Lost the connection to DB Local, Result: ' . $Result );
          return null;
     }
}

function GetRequest( $Name ) {
     if(  isset( $_REQUEST[ $Name ])) {
          $Value = $_REQUEST[ $Name ];
          if(  is_array( $Value )) {
               $String = '';
               for( $I = 0; $I < sizeof( $Value ); $I++ )
                    { $String .= ( $I == 0 ? '' : ',' ) . $Value[ $I ]; }
               $Value = $String;
          }
          return $Value;
     } else {
          return '';
     }
}

function GetNow() {
     $MilliSec = explode( ' ', microtime());
     return date( 'Y-m-d H:i:s' ) . substr( $MilliSec[ 0 ], 1, 4 ) . ' ';
}

function DiffHours( $DateFrom, $DateUpto )
{    //   Time format YYYY-MM-DD HH:MM:SS
     $DateFrom = YMDHMS2Epoch( $DateFrom );
     $DateUpto = YMDHMS2Epoch( $DateUpto );
     $Diff = $DateUpto - $DateFrom;
     return round( $Diff / 3600 );
}

function YMDHMS2Epoch( $Time )
{    //   Time format YYYY-MM-DD HH:MM:SS
     $Year  = substr( $Time,  0, 4 );
     $Month = substr( $Time,  5, 2 );
     $Day   = substr( $Time,  8, 2 );
     $Hour  = substr( $Time, 11, 2 );
     $Min   = substr( $Time, 14, 2 );
     $Sec   = substr( $Time, 17, 2 );
     $Epoch = mktime( $Hour, $Min, $Sec, $Month, $Day, $Year );
     return $Epoch;
}

$App = new Program();
$App->Run();
?>
