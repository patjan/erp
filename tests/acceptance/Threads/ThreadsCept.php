<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Threads page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Threads');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'PA-Card/Pent'		);
$I->clickSelect		($I, 'Viscose'			);
$I->clickSelect		($I, 'PES-Text/Fiado'	);
$I->clickSelect		($I, 'PV Cru'			);
$I->clickSelect		($I, 'Elastanos'		);
$I->clickSelect		($I, 'Tintos'			);
$I->clickSelect		($I, 'CO-Card/Pent'		);

$I->clickActionForm	($I, '30/1 CO Cardado'	);
$I->canSeeInField	('#jky-thread-name'		, '30/1 CO Cardado');
$I->canSeeInField	('#jky-ncm'				, '');
$I->canSeeInField	('#jky-thread-group'	, 'CO-Card/Pent');
$I->canSeeInField	('#jky-composition'		, '100% CO');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'balance');
$I->canSee			('1CN800');
$I->canSee			('01-14-2014');	
$I->canSee			('TBM');	

//$I->clickTab		($I, 'notes');
//$I->canSeeElement	('#jky-remarks');

$I->logoff			($I);