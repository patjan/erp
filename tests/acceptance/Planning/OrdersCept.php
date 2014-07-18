<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Orders page');
$I->login			($I, 'Planning', 'User');

$I->clickMenu		($I, 'Planning');
$I->clickBar		($I, 'Planning', 'Orders');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '200001'	);
$I->canSeeInField	('#jky-order-number'	, '200001');
$I->canSeeInField	('#jky-customer-name'	, 'Tecno');
$I->canSeeInField	('#jky-product-name'	, 'Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSeeInField	('#jky-ftp-number'		, '200214');
$I->canSeeInField	('#jky-machine-name'	, 'shakira');
$I->canSeeInField	('#jky-partner-name'	, '');
$I->canSeeInField	('#jky-quotation-number', '');
$I->canSeeElement	('#jky-ordered-date'	);
$I->canSeeElement	('#jky-needed-date'		);
$I->canSeeElement	('#jky-produced-date'	);
$I->canSeeInField	('#jky-quoted-pieces'	, '0');
$I->canSeeInField	('#jky-ordered-pieces'	, '120');
$I->canSeeInField	('#jky-checkout-pieces'	, '15');
$I->canSeeInField	('#jky-produced-pieces'	, '20');
$I->canSeeInField	('#jky-rejected-pieces'	, '5');
$I->canSeeInField	('#jky-quoted-weight'	, '0');
$I->canSeeInField	('#jky-ordered-weight'	, '1360.00');
$I->canSeeInField	('#jky-checkout-weight'	, '181.20');
$I->canSeeInField	('#jky-produced-weight'	, '242.10');
$I->canSeeInField	('#jky-returned-weight'	, '0.00');
$I->canSeeInField	('#jky-quoted-units'	, '0');
$I->canSeeInField	('#jky-labels-printed'	, '120');
$I->canSeeInField	('#jky-ftps-printed'	, '1');
$I->canSeeInField	('#jky-ops-printed'	, '1');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'threads');
$I->canSee			('30/1 pA mescla cinza 88/12 oE');
$I->canSee			('9CT502');	

$I->clickTab		($I, 'pieces');
$I->canSee			('8000000120');	
$I->canSee			('Active');	
$I->canSee			('120');	
$I->canSee			('Shakira');	

$I->logoff			($I);