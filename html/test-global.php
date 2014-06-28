<?php
$all_counter = null;
$GLOBALS['all_counter'];

if ($all_counter != null) {
	$all_counter = 0;
}

$all_counter += 1;
$nl = "\n" . $all_counter . ': ';

echo $nl . 'start';

if ($all_counter > 1 ) {
	echo $nl . 'return';
	return;
}


for($i=0; $i<10; $i++) {
	echo $nl . 'looping ' . $i;
	sleep(1);
}

echo $nl . 'end';
?> 