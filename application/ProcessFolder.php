<?php
require_once   '../application/Constant.php';
require_once   '../application/Utility.php';

//   Program:  ProcessFolder
//
//	 Command:	C:/PHP/php.exe ProcessFolder.php folder
//				C:/PHP/php.exe ProcessFolder.php contacts
//
// Descricao:  Process all files from specific folder
//

class Program {

function Run($folder) {
	echo "\n" . 'Start of program';
	echo "\n" . 'folder: ' . $folder;
	$files = scandir(UPLOADS . $folder);
	$folder .= '/';
	foreach($files as $key => $value) {
		if ($value != '.'
		and $value != '..') {
			echo "\n" . 'file name: ' . $value;
			$new_name = strtolower($value);
			if ($new_name != $value) {
				rename(UPLOADS . $folder . $value, UPLOADS . $folder . $new_name);
			}
			$names	= explode( '.', $new_name );
			$name	= $names[0];
			$ext	= $names[count($names) - 1];
			if ($ext == 'gif'
			or  $ext == 'jpg'
			or  $ext == 'png') {
				create_thumb($folder, $name, $ext, 120, 120);
			}
		}
	}
	echo "\n" . 'End of program';
}

} //class

// -----------------------------------------------------------------------------------------

function create_thumb( $folder, $name, $ext, $maxW, $maxH ) {
	$photoPath = UPLOADS . $folder . $name . '.' . $ext;

     $info = getimagesize( $photoPath );
     $w = $info[ 0 ];
     $h = $info[ 1 ];

     $ratio = $w / $h;

     if(  $ratio < 1 ) {
          $newW = min( $w, $maxW );
          $newH = $newW / $ratio;
     } else {
          $newH = min( $h, $maxH );
          $newW = $newH * $ratio;
     }

     switch( $ext ) {
          case 'gif':    $infunc = 'imagecreatefromgif' ;   $outfunc = 'imagepng';  break;
          case 'jpg':    $infunc = 'imagecreatefromjpeg';   $outfunc = 'imagepng';  break;
          case 'png':    $infunc = 'imagecreatefrompng' ;   $outfunc = 'imagepng';  break;
          default   :    throw new Exception( 'Invalid image type' );
     }

     $image = @$infunc( $photoPath );

     if( !$image )                           throw new Exception( 'Unable to read image file' );

     $thumb = imagecreatetruecolor( $newW, $newH );
     imagecopyresampled( $thumb, $image, 0, 0, 0, 0, $newW, $newH, $w, $h );

     $thumbPath = THUMBS . $folder . $name . '.png';
     imagepng( $thumb, $thumbPath );

     if(  ! file_exists( $thumbPath ))       throw new Exception( 'Unkown error occured creating thumbnail' );
     if(  ! is_readable( $thumbPath ))       throw new Exception( 'Unable to read thumbnail' );
}

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


if(	$argc != 2 ) {
	echo "\n" . 'Error: arguments must have [folder]';
}else{
	$folder = $argv[1];

	$error = '';
	if (!is_dir(UPLOADS . $folder))		$error .= "\n" . 'The folder: ' . $folder . ' is not valid.';

	if ($error != '') {
		echo "\n" . 'Error: ' . $error;
	}else{
		$App = new Program();
		$App->Run($folder);
	}
}
?>

