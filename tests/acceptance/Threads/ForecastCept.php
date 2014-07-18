<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Forecast page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Forecast');

$I->fillField		('#jky-reference-date .jky-form-date', '06-30-2014');
$I->clickButton		($I, 'Refresh');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'PA-Card/Pent'		);
$I->clickSelect		($I, 'Viscose'			);
$I->clickSelect		($I, 'PES-Text/Fiado'	);
$I->clickSelect		($I, 'Viscose'			);
$I->clickSelect		($I, 'PV Cru'			);
$I->clickSelect		($I, 'Elastanos'		);
$I->clickSelect		($I, 'Mesclas'			);
$I->clickSelect		($I, 'Tintos'			);
$I->clickSelect		($I, 'CO-Card/Pent'		);

$I->clickActionList	($I, '30/1 CO Cardado');
$I->canSee			('CO-Card/Pent');
$I->canSee			('30/1 CO Cardado');
$I->canSee			('TBM');	
$I->canSee			('10231.73');	
$I->canSee			('2356.55');	
$I->canSee			('0.00');	

$I->logoff			($I);