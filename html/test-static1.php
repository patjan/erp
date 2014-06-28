<?php
global $my_count;
global $my_static;

if ($my_count != null) {
	$my_count = 0;
}

$my_count = $my_count + 1;
$nl = "\n" . $my_count . ' ';

print $nl . 'start';

if ($my_static != null) {
	print $nl . 'return';
	return;
}

for($i=0; $i<10; $i++) {
	print $nl . $i;
	sleep(1);
}

print $nl . 'end';

?>