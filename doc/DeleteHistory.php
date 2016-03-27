function DeleteHistory( $LocalLink )
{
     $TempoAtivo = XGetParametro( $LocalLink, 'Tempo Ativo' );

//   $TempoDe = date( 'Y-m-d ' ) . ( date( 'H' ) - $TempoAtivo ) . date( ':i:s' ) ;
     $TempoDe = date( 'Y-m-d H:i:s', ( time() - ( $TempoAtivo * 60 )));

     Display( 'Tempo De: ' . $TempoDe );

     $SQL = 'SELECT Id, Status, Updated'
          . '  FROM Tecno.Fichas'
          . ' WHERE Status != "A" AND Updated <= "' . $TempoDe . '"'
		  . ' LIMIT 40'
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

