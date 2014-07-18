<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Pieces page');
$I->login			($I, 'Production', 'User');

$I->clickMenu		($I, 'Production');
$I->clickBar		($I, 'Production', 'Pieces');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Check In'			);
$I->clickSelect		($I, 'Check Out'		);
$I->clickSelect		($I, 'Return'			);
$I->clickSelect		($I, 'Active'			);

$I->clickActionList	($I, '8000000120');
$I->canSee			('8000000120');	
$I->canSee			('Active');	
$I->canSee			('Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSee			('200001');	
$I->canSee			('120');	

$I->logoff			($I);