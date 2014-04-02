function resize($filename, $newfile, $the_width, $the_height) { 
    //	open the original file
    $image = imagecreatefromjpeg($filename);

    //	create a new blank image
    $new_image = imagecreatetruecolor($the_width, $the_height); 

    //	copy the original, according to the specified width and height
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $the_width, $the_height, imagesx($image), imagesy($image)); 

    // 	save the new file to $newfile
    imagejpeg($new_image, $newfile); 
} 


function img_resize($the_source, $the_target, $the_width, $the_height, $the_rgb=0xFFFFFF, $the_quality=100) {
	if (!file_exists($the_source))			return false;

	$my_size = getimagesize($the_source);
	if ($my_size === false)					return false;

	$my_format = strtolower(substr($my_size['mime'], strpos($my_size['mime'], '/') + 1));	
	$my_function = "imagecreatefrom" . $my_format;
	if (!function_exists($my_function))		return false;

	$x_ratio = $the_width  / $my_size[0];
	$y_ratio = $the_height / $my_size[1];

	$ratio = min($x_ratio, $y_ratio);
	$use_x_ratio = ($x_ratio == $ratio);

	$new_width  =  $use_x_ratio ? $the_width  : floor($my_size[0] * $ratio);
	$new_height = !$use_x_ratio ? $the_height : floor($my_size[1] * $ratio);
	$new_left =  $use_x_ratio ? 0 : floor(($the_width  - $new_width ) / 2);
	$new_top  = !$use_x_ratio ? 0 : floor(($the_height - $new_height) / 2);

	$ithe_source  = $my_function($the_source);
	$idest = imagecreatetruecolor($the_width, $the_height);

	imagefill($idest, 0, 0, $the_rgb);

	if (($my_format == 'gif') or ($my_format == 'png')) {
		imagealphablending($idest, false);
		imagesavealpha($idest, true);
	}

	if ($my_format == 'gif') {
		$transparent = imagecolorallocatealpha($idest, 255, 255, 255, 127);
		imagefilledrectangle($idest, 0, 0, $the_width, $the_height, $transparent);
		imagecolortransparent($idest, $transparent);
	}

	imagecopyresampled($idest, $ithe_source, $new_left, $new_top, 0, 0, $new_width, $new_height, $my_size[0], $my_size[1]);

	getResultImage($idest, $the_target, $my_size['mime']);

	imagedestroy($ithe_source);
	imagedestroy($idest);

	return true;
}

function getResultImage($dst_r, $the_target_path, $type) {
	switch ($type) {
		case 'image/jpg'	:
		case 'image/jpeg'	:
		case 'image/pjpeg'	:	return imagejpeg($dst_r, $the_target_path,  90);	break;
		case 'image/png'	:	return imagepng	($dst_r, $the_target_path,   2);	break;
		case 'image/gif'	:	return imagegif	($dst_r, $the_target_path		);	break;
		default				:	return;
	}
}