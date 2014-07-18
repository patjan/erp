<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Purchase Lines page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Purc-Lines');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionList	($I, '200100');
$I->canSee			('200100');
$I->canSee			('Sao Bento');
$I->canSee			('30/1 PA Mescla Preto 50/50');
$I->canSee			('05-21-2014');	
$I->canSee			('1000');
$I->canSee			('1015.74');	

$I->logoff			($I);