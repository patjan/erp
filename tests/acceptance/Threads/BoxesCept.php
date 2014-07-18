<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Incoming Boxes page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Boxes');

//$I->clickSelect		($I, 'All'				);		//	too many rows 40075
//$I->clickSelect		($I, 'Check In'			);		//	too many rows 21854
//$I->clickSelect		($I, 'Check Out'		);		//	too many rows 17822 
$I->clickSelect		($I, 'Return'			);
$I->clickSelect		($I, 'Active'			);

$I->clickActionList	($I, '2000038900');
$I->canSee			('2000038900');
$I->canSee			('Active');
$I->canSee			('30/1 SL VP CV/PES Flame');	
$I->canSee			('Adatex');	
$I->canSee			('386511');	
$I->canSee			('3');	
$I->canSee			('12');	
$I->canSee			('28.03');	
$I->canSee			('0.00');	
$I->canSee			('1C01');	

$I->logoff			($I);