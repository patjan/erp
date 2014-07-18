<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Thread Dyers page');
$I->login			($I, 'Planning', 'User');

$I->clickMenu		($I, 'Planning');
$I->clickBar		($I, 'Planning', 'TDyers');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '800001');
$I->canSeeInField	('#jky-tdyer-number'	, '800001');
$I->canSeeInField	('#jky-order-number'	, '');
$I->canSeeInField	('#jky-customer-name'	, 'A FERNANDO');
$I->canSeeInField	('#jky-dyer-name'		, 'Leao');
$I->canSeeElement	('#jky-ordered-date'	);
$I->canSeeElement	('#jky-needed-date'		);
$I->canSeeElement	('#jky-checkout-date'	);
$I->canSeeElement	('#jky-returned-date'	);
$I->canSeeInField	('#jky-ordered-weight'	, '100.00');
$I->canSeeInField	('#jky-checkout-weight'	, '162.00');
$I->canSeeInField	('#jky-returned-weight'	, '0.00');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'threads');
$I->canSee			('30/1 CO Cardado');
$I->canSee			('04');	
$I->canSee			('Abacate');	

$I->clickTab		($I, 'remarks'	);
//$I->canSeeInField	('#jky-remarks', '');
$I->canSeeElement	('#jky-remarks');

$I->logoff			($I);