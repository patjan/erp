<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Colors page');
$I->login			($I, 'Sales', 'User');

$I->clickMenu		($I, 'Sales');
$I->clickBar		($I, 'Sales', 'Colors');

$I->clickSelect		($I, 'All'			);
$I->clickSelect		($I, 'Clara'		);
$I->clickSelect		($I, 'Escura'		);
$I->clickSelect		($I, 'Forte'		);
$I->clickSelect		($I, 'Fraca'		);
$I->clickSelect		($I, 'Intermedia'	);
$I->clickSelect		($I, 'Media'		);
$I->clickSelect		($I, 'Mescla'		);
$I->clickSelect		($I, 'Unico'		);
$I->clickSelect		($I, 'Bco'			);

$I->clickActionForm	($I, 'Branco');
$I->canSeeInField	('#jky-color-name'	, 'branco');
$I->canSeeInField	('#jky-color-type'	, 'Bco');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'notes');
//$I->canSee			('200001');
//$I->canSee			('50 Algodao, 50 Polyester');
//$I->canSee			('condessa');

$I->logoff			($I);
