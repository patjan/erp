<?php
//   Program:  ProcessSQL
//
// Descricao:  Process SQL from Local to Server
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

     $LocalLink = @ mysql_pconnect( $LocalHost, $UserName, $Password );
     if( $LocalLink ) {
          $IP  = $_SERVER[ 'REMOTE_ADDR' ];
          $SQL = GetRequest( 'SQL' );
          $SQL = str_replace( '\\"', '"', $SQL );

          if( $IP == GetControle( $LocalLink, 'tecno IP' )       // Tecno
          ||  $IP == GetControle( $LocalLink,    'dl IP' )       // DL
          ||  $IP == '76.90.69.205'                              // JKY
          ||  $IP == '127.0.0.1' ) {                             // LocalHost
               $Result = mysql_query( $SQL, $LocalLink );

               if( $Result ) {
                    Display( 'IP: ' . $IP . ', SQL: ' . $SQL );
                    $Reply = 'OK';
                    if( substr( $SQL, 0, 7 ) == 'SELECT ' )
                         { $NumRows = mysql_num_rows( $Result ); }
                    else { $NumRows = 0; }
               } else {
                    Display( 'Error, Result: ' . $Result . ', SQL: ' . $SQL );
               }
          } else {
               Display( 'Undefined IP: ' . $IP . ', SQL: ' . $SQL );
          }
     } else {
          Display( 'Error, nao conectou DB Local: ' . $LocalHost );
     }

     echo 'Result: ' . $Reply . ', ' . $NumRows;
}

} //class

// -----------------------------------------------------------------------------------------

function Display( $pMessage ) {
     $Date = date( 'Y-m-d' );
     $Time = date( 'H:i:s' );
     $File = fopen( '../LogBatch/' . $Date . '.txt', 'a' ) or die( 'cannot open Log Batch file' );
     fwrite( $File, GetNow() . $pMessage . "\r\n" );
     fclose( $File );
}

function XGetParametro( $LocalLink, $Nome ) {
     $SQL = 'SELECT Valor'
          . '  FROM tecno2012.Parametros'
          . ' WHERE Nome = "' . $Nome . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if( ! $Result ) {
          Display( 'Perdeu a conecao DB Local, Result: ' . $Result );
          return null;
     }

     $Record = mysql_fetch_array( $Result );
     return $Record[ 'Valor' ];
}

function GetControle( $LocalLink, $Nome ) {
     $SQL = 'SELECT Valor'
          . '  FROM tecno2012.Controles'
          . ' WHERE Nome = "' . $Nome . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if( ! $Result ) {
          Display( 'Perdeu a conecao DB Local, Result: ' . $Result );
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
     if( ! $Result ) {
          Display( 'Perdeu a conecao DB Local, Result: ' . $Result );
          return null;
     }
}

function GetRequest( $Name ) {
     if( isset( $_REQUEST[ $Name ])) {
          $Value = $_REQUEST[ $Name ];
          if( is_array( $Value )) {
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

$App = new Program();
$App->Run();
?>

