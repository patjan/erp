<?php
//   example: place this kind of link into the document where the file download is offered:
//   <a href='jky_download.php?file_name=avatars/some_file.jpg'>Download here</a>

$file_path = $_SERVER[ 'DOCUMENT_ROOT' ] . '/uploads/';       //   change the path to fit your websites document structure
$full_path = $file_path . $_REQUEST[ 'file_name' ];

if(  $fd = fopen( $full_path, 'r' )) {
     $file_size  = filesize( $full_path );
     $path_parts = pathinfo( $full_path );
     $ext = strtolower( $path_parts[ 'extension' ]);
     switch( $ext ) {
          case 'pdf'   : header( 'Content-type: application/pdf' );   //   add here more headers for diff. extensions
                         header( 'Content-Disposition: attachment; filename="' . $path_parts[ 'basename' ] . '"' );     // use 'attachment' to force a download
                         break;
          default      : header( 'Content-type: application/octet-stream' );
                         header( 'Content-Disposition: attachment; filename="' . $path_parts[ 'basename' ] . '"' );
                         break;
     }
     header( 'Content-length: ' . $file_size );
     header( 'Cache-control: private' );     //   use this to open files directly
     while( !feof( $fd )) {
          $buffer = fread( $fd, 2048 );
          echo $buffer;
     }
}
fclose( $fd );
exit;
?>