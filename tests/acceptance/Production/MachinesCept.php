<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Machines page');
$I->login			($I, 'Production', 'User');

$I->clickMenu		($I, 'Production');
$I->clickBar		($I, 'Production', 'Machines');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Fukuhara'			);
$I->clickSelect		($I, 'Kauo Heng'		);
$I->clickSelect		($I, 'Mayer'			);
$I->clickSelect		($I, 'Monark'			);
$I->clickSelect		($I, 'Orizio'			);
$I->clickSelect		($I, 'Pal Lung'			);
$I->clickSelect		($I, 'Pilotelli'		);
$I->clickSelect		($I, 'Protti'			);
$I->clickSelect		($I, 'Scomar'			);
$I->clickSelect		($I, 'Sen Huang'		);
$I->clickSelect		($I, 'Shima Seik'		);
$I->clickSelect		($I, 'Flyng Horse'		);

$I->clickActionForm	($I, 'Angelina'	);
$I->canSeeInField	('#jky-machine-name'	, 'angelina');
//$I->canSeeInField	('#jky-machine-type'	, 'Retilinea');
$I->canSeeInField	('#jky-machine-family'	, '');
$I->canSeeInField	('#jky-machine-brand'	, 'Flyng Horse');
$I->canSeeInField	('#jky-serial-number'	, '');
$I->canSeeInField	('#jky-diameter'		, '0');
$I->canSeeInField	('#jky-width'			, '155');
$I->canSeeInField	('#jky-density'			, '12');
$I->canSeeInField	('#jky-inputs'			, '2');
$I->canSeeElement	('#jky-purchase-date');
$I->canSeeElement	('#jky-repair-date');
$I->canSeeElement	('#jky-return-date');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'cylinders');
$I->canSee			('null');
//$I->canSeeButton	($I, 'Add-New');

$I->clickTab		($I, 'remarks');
$I->canSeeElement	('#jky-remarks');
//$I->canSeeButton	($I, 'Save-Remarks');

$I->logoff			($I);