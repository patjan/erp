<?php
//   Program:  SynData
//
//   Command:  C:/PHP/php.exe SynData.php
//
//   Descricao: Sincronizar DB Local para Remoto
//
//   Domain:   Processar somente no Local
//
//    Speed:   8000 transacoes por min ( USA )
//              200 transacoes por min ( Brasil )
//             Depende do tamanho de memoria do Cliente
//             e' recomendado 256 MB no minimo.
//
//   O programa se autoinicia como Windows Services
//
//   1. Looping ate CTRL+C
//        1. sleep( 0 + 5 ) ate 60 segundos
//        2. Conectar Local DB
//        3. Conectar Remote DB
//             1. SELECT SQLChanges
//             2. Looping cada SQLChanges
//                  1. se diferente do anterior
//                       1. SELECT Record
//                       2. se perdeu coneccao, break
//                       3. se existe   SQL = REPLACE
//                          else        SQL = DELETE
//                       4. Atualiza Local DB
//                       5. se OK  Log OK, INSERT Matriz.SQLChanges
//                          else   Log erro
//                  2. DELETE Loja.SQLChanges
//
//   Teclar [CTRL+C] para terminar o programa
//
     set_time_limit( 0 );
     Display( '' );
     Display( 'Inicio do ' . $_SERVER[ 'PHP_SELF' ]);

     $LocalHost     = 'localhost';
     $UserName      = 'suporte';
     $Password      = 'segredo';
//   $Sleep         = 60;

//   while( true )
//   {
// echo "\n\r" . GetNow() . 'Teclar [CTRL+C] para terminar.';

//        sleep( $Sleep );
//        if( $Sleep < 60 )        $Sleep += 5;             // 0 5 10 ... 60

          $LocalLink = @ mysql_pconnect( $LocalHost, $UserName, $Password );
          if( ! $LocalLink )
          {
               Display( 'Erro, nao conectou Local DB: ' . $LocalHost );
//             continue;
          } else {
               TransferData ( $LocalLink );
               DeleteHistory( $LocalLink );
          }
//   }

     Display( 'Fim do ' . $_SERVER[ 'PHP_SELF' ]);

// -----------------------------------------------------------------------------
function TransferData( $LocalLink )
{
     $SQL = 'SELECT TableName, TableId, Id, Updated'
          . '  FROM Tecno.SQLChanges'
          . ' WHERE Status = "A"'
          . ' ORDER BY TableName, TableId, Updated DESC'
          ;
     $Select = mysql_query( $SQL, $LocalLink );
     if( $Select )
          $NumberRows = mysql_num_rows( $Select );
     else $NumberRows = 0;

     if( $NumberRows == 0 )
          return;

     Display( 'NumberRows: ' . $NumberRows );

     $PrevName = '';
     $PrevId   = '';

// echo "\n\r";
     for( $I = $NumberRows; $I > 0; $I-- )
     {
//        if(( $I % 10 ) == 0 )
//             echo "\n" . GetNow() . ' S Registros: ' . $I . '      ' ;

          $Record = mysql_fetch_array( $Select );
          $TableName     = $Record[ 'TableName'   ];
          $TableId       = $Record[ 'TableId'     ];
          $Id            = $Record[ 'Id'          ];
          $Updated       = $Record[ 'Updated'     ];

          if( $TableName == 'Clientes'
          ||  $TableName == 'Composicoes'
          ||  $TableName == 'Controles'
          ||  $TableName == 'Cores'
          ||  $TableName == 'Entradas'
          ||  $TableName == 'Fichas'
          ||  $TableName == 'FicItems'
          ||  $TableName == 'Fios'
          ||  $TableName == 'Fornecedores'
          ||  $TableName == 'FTransacoes'
          ||  $TableName == 'Funcionarios'
          ||  $TableName == 'Lotes'
          ||  $TableName == 'Maquinas'
          ||  $TableName == 'Parametros'
          ||  $TableName == 'Pecas'
          ||  $TableName == 'Pendencias'
          ||  $TableName == 'Precos'
          ||  $TableName == 'Romaneios'
          ||  $TableName == 'RomItems'
          ||  $TableName == 'TecBens'
          ||  $TableName == 'Tecidos'
          ||  $TableName == 'Tinturarias'
          ||  $TableName == 'Transacoes'
          )    $Selected = true;
          else $Selected = false;

          if( $Selected )
          {
               if( $PrevName != $TableName || $PrevId != $TableId )
               {
                    $PrevName = $TableName;
                    $PrevId   = $TableId  ;

//                  Verificar se o registro existe ou nao
//                  Este SQL demora bastante no Brasil ( 0.300 sec ), US ( 0.007 sec )
                    $LSQL = 'SELECT * FROM Tecno.' . $TableName . ' WHERE Id = ' . $TableId;
                    $LResult = mysql_query( $LSQL, $LocalLink );

                    if( ! $LResult )
                    {
                         Display( 'Error no Local, Result: ' . $LResult . ', TableName: ' . $TableName . ', TableId: ' . $TableId );
                         continue;
                    }

                    if( mysql_num_rows( $LResult ) > 0 )
                    {
                         //   Se o registro existe, gerar SQL Replace
                         $LRecord = mysql_fetch_array( $LResult );
                         $LUpdated = $LRecord[ 'Updated' ];

                         $RSQL = 'REPLACE INTO tecno2012.' . $TableName . ' SET ';
//                       $RSQL = 'REPLACE INTO Remota.' . $TableName . ' SET ';
                         $First = '';
                         foreach( $LRecord as $Name => $Value )
                         {
                              if( ! is_numeric( $Name ))
                              {
                                   $RSQL .= $First . $Name . ' = "' . $Value . '"';
                                   $First = ', ';
                              }
                         }
                         $RSQL .= ' ;';
                    } else {
                         //   Se o registro nao existe, gerar SQL DELETE
                         $LUpdated = $Updated;
                         $RSQL = 'DELETE FROM tecno2012.' . $TableName
//                       $RSQL = 'DELETE FROM Remota.' . $TableName
                               . ' WHERE Id = ' . $TableId
                               . ' ;';
                    }

                    $RResult  = SendSQL( $RSQL );
                    $Reply    = substr( $RResult, 7, 2 );
                    $NumRows  = substr( $RResult, 10 );
// echo "\n\r" . 'RResult: ' . $RResult . ', Reply: ' . $Reply . ', NumRows: ' . $NumRows;


// check timeout, no reply

                    if( $Reply == 'OK' )
                    {
                         Display( $RSQL );

                         if( $Updated <= $LUpdated ) {
                              $LSQL = 'DELETE FROM Tecno.SQLChanges'
                                   . '  WHERE Id = ' . $Id 
                                   . ' ;';
                              $LResult = mysql_query( $LSQL, $LocalLink );
                              Display( $LSQL );
                         }
                    } else {
                         Display( 'Error na Remota, Result: ' . $RResult . ', TableName: ' . $TableName . ', TableId: ' . $TableId );
                    }
               } else {
                    if( $Updated <= $LUpdated ) {
                         $LSQL = 'DELETE FROM Tecno.SQLChanges'
                              . '  WHERE Id = ' . $Id 
                              . ' ;';
                         $LResult = mysql_query( $LSQL, $LocalLink );
                         Display( $LSQL );
                    }
               }
          }
     }
echo "\n\r" . GetNow() . ' S Registros: ' . $NumberRows;
}

// -----------------------------------------------------------------------------------------
function DeleteHistory( $LocalLink )
{
     $TempoAtivo = XGetParametro( $LocalLink, 'Tempo Ativo' );

//   $TempoDe = date( 'Y-m-d ' ) . ( date( 'H' ) - $TempoAtivo ) . date( ':i:s' ) ;
     $TempoDe = date( 'Y-m-d H:i:s', ( time() - ( $TempoAtivo * 60 )));

     Display( 'Tempo De: ' . $TempoDe );

     $SQL = 'SELECT Id, Status, Updated'
          . '  FROM Tecno.Fichas'
          . ' WHERE Status != "A" AND Updated <= "' . $TempoDe . '"'
          ;
     $Select = mysql_query( $SQL, $LocalLink );
     if( $Select )
          $NumberRows = mysql_num_rows( $Select );
     else $NumberRows = 0;

     if( $NumberRows == 0 )
          return;

     Display( 'NumberRows: ' . $NumberRows );

     for( $I = $NumberRows; $I > 0; $I-- )
     {
//        if(( $I % 10 ) == 0 )
//             echo "\n\r" . GetNow() . ' D Registros: ' . $I . '      ' ;

          $Record = mysql_fetch_array( $Select );
          $Id       = $Record[ 'Id'          ];
          $Status   = $Record[ 'Status'      ];
          $Updated  = $Record[ 'Updated'     ];

// echo "\n\r" . 'Id: ' . $Id . ', Status: ' . $Status . ', Updated: ' . $Updated;

//        Verificar se o registro existe no Remota
//        Este SQL demora bastante no Brasil ( 0.300 sec ), US ( 0.007 sec )
          $RSQL = 'SELECT Id, Status, Updated'
               . '  FROM tecno2012.Fichas'
//             . '  FROM Remota.Fichas'
               . ' WHERE Id = ' . $Id
               . '   AND Status  = "' . $Status  . '"'
               . '   AND Updated = "' . $Updated . '"'
               ;
          $RResult  = SendSQL( $RSQL );
          $Reply    = substr( $RResult, 7, 2 );
          $NumRows  = substr( $RResult, 10 );
// echo "\n\r" . 'RResult: ' . $RResult . ', Reply: ' . $Reply . ', NumRows: ' . $NumRows;

          if( $Reply == 'OK' && $NumRows > 0 )
          {
               //   Se o registro existe, gerar SQL Deletes
               $LSQL = 'DELETE FROM Tecno.Fichas WHERE Id = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
               $LSQL = 'DELETE FROM Tecno.FicItems WHERE Ficha = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
               $LSQL = 'DELETE FROM Tecno.Transacoes WHERE Ficha = ' . $Id . ';';
               $LResult = mysql_query( $LSQL, $LocalLink );
          }
     }
echo "\n\r" . GetNow() . ' D Registros: ' . $NumberRows;
}

// -----------------------------------------------------------------------------------------

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

function XGetParametro( $LocalLink, $Nome )
{
     $SQL = 'SELECT Valor'
          . '  FROM Tecno.Parametros'
          . ' WHERE Nome = "' . $Nome . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if( ! $Result )
     {
          Display( 'Perdeu a conecao DB Local, Result: ' . $Result );
          return null;
     }

     $Record = mysql_fetch_array( $Result );
     return $Record[ 'Valor' ];
}

function GetControlValue( $GroupId, $Codigo, $LocalLink )
{
     $SQL = 'SELECT Value'
          . '  FROM Local.Controls'
          . ' WHERE GroupId =  ' . $GroupId
          . '   AND  Codigo = "' . $Codigo . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
     if( $Result && mysql_num_rows( $Result ) > 0 )
     {
          $Record = mysql_fetch_array( $Result );
          return $Record[ 'Value' ];
     } else {
          return null;
     }
}

function SetControlValue( $GroupId, $Codigo, $LocalLink, $Value )
{
     $SQL = 'UPDATE Local.Controls'
          . '   SET   Value = "' . $Value  . '"'
          . ' WHERE GroupId =  ' . $GroupId
          . '   AND  Codigo = "' . $Codigo . '"'
          ;
     $Result = mysql_query( $SQL, $LocalLink );
}

function OnlyString( $String )
{
     $myString = '';
     for( $I = 0; $I < strlen( $String ); $I++ )
     {
          $C = $String[ $I ];
          if( $C == ' ' || ( $C >= '0' && $C <= '9' ) || ( $C >= 'a' && $C <= 'z' ) || ( $C >= 'A' && $C <= 'Z' ) )
               $myString .= $C;
     }
     return $myString;
}

function SendSQL( $SQL )
{
     $SQL = str_replace( '&', '%26', $SQL );

//     $cURL =curl_init( 'http://www.tecnomalhas.com/php/ProcessSQL.php' );
//     $cURL =curl_init( 'http://208.109.128.165/php/ProcessSQL.php' );
     $cURL =curl_init( 'http://50.63.212.146/php/ProcessSQL.php' );
//     $cURL =curl_init( 'localhost/tecno/php/ProcessSQL.php' );
//     $cURL =curl_init( 'http://189.33.194.120:8000/php/ProcessSQL.php' );

     curl_setopt( $cURL, CURLOPT_POST, 1 );
     curl_setopt( $cURL, CURLOPT_POSTFIELDS, 'SQL=' . $SQL );
     curl_setopt( $cURL, CURLOPT_RETURNTRANSFER, 1 );

     $Html = curl_exec( $cURL );
     $errno = curl_errno( $cURL );

     curl_close( $cURL );

echo "\n\r" . 'Errno: ' . $errno . ', Html: ' . $Html;

//   $Beg = strpos( $Html, 'Result: "' ) + 9;
//   $End = strpos( $Html, '"', $Beg );
//   return substr( $Html, $Beg, $End-$Beg );
     return OnlyString( $Html );
}

?>
