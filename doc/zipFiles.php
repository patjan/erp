/**
 * zip files
 *
 * @param	the_obj
 *				folder_name		//	/tmp
 *				prefix_name		//	/prefix
 *				output_name		//	 output
 * @param	the_file_names
 *
 * @return	zip_name  
 */
function zipFiles($the_obj, $the_file_names) {
//	create the zip file and throw the error if unsuccessful
	$my_zip_name = $the_obj->folder_name
				 . $the_obj->prefix_name . '_'
				 . $the_obj->output_name . '_'
				 .  date('Ymd')
				 . '.zip'
				 ;
    $my_zip = new ZipArchive();
	if ($my_zip->open($my_zip_name, ZIPARCHIVE::CREATE )!== TRUE) {
        exit("Error, cannot open <" . $my_zip_name . ">\n");
    }

//	add each files of $file_name array to archive
	foreach($the_file_names as $my_file_name) {
		$my_zip->addFile($the_obj->folder_name . $my_file_name, $my_file_name);
	}

	$my_zip->close();

//	delete every input file(s)
//	this can only run after close zip archive 
	foreach($the_file_names as $my_file_name) {
		unlink($the_obj->folder_name . $my_file_name);
	}

	return $my_zip_name;
}
