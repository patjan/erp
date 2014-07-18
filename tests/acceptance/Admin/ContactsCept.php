<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Contacts page');
$I->login			($I, 'Admin', 'User');

$I->clickMenu		($I, 'Admin');
$I->clickBar		($I, 'Admin', 'Contacts');

$I->clickSelect		($I, 'All'			);
$I->clickSelect		($I, 'Visitor'		);
$I->clickSelect		($I, 'Guest'		);
$I->clickSelect		($I, 'Sales'		);
$I->clickSelect		($I, 'Sales Manager');
$I->clickSelect		($I, 'Boxes'		);
$I->clickSelect		($I, 'Dyers'		);
$I->clickSelect		($I, 'Fabrics'		);
$I->clickSelect		($I, 'Maintenance'	);
$I->clickSelect		($I, 'Pieces'		);
$I->clickSelect		($I, 'Planning'		);
$I->clickSelect		($I, 'Production'	);
$I->clickSelect		($I, 'Purchases'	);
$I->clickSelect		($I, 'Threads Manager');
$I->clickSelect		($I, 'Crus Manager'	);
$I->clickSelect		($I, 'Account'		);
$I->clickSelect		($I, 'Admin'		);

$I->clickActionForm	($I, 'Marcelo');
$I->canSeeInField	('#jky-nick-name'		, 'Marcelo');
$I->canSeeInField	('#jky-first-name'		, 'Marcelo');
$I->canSeeInField	('#jky-last-name'		, 'Lodi');
$I->canSeeInField	('#jky-contact-company'	, '100002');	//	Tecno
$I->canSeeInField	('#jky-mobile'			, '');
$I->canSeeInField	('#jky-position'		, '');
$I->canSeeInField	('#jky-email'			, 'marcelo@metatex.com.br');
$I->canSeeInField	('#jky-user-name'		, 'marcelo');
$I->canSeeInField	('#jky-user-role'		, 'Admin');
//$I->canSeeImage		('100002');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Reset');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'address');
$I->canSeeInField	('#jky-street1'			, '');
$I->canSeeInField	('#jky-st-number'		, '');
$I->canSeeInField	('#jky-st-cpl'			, '');
$I->canSeeInField	('#jky-street2'			, '');
$I->canSeeInField	('#jky-city'			, '');
$I->canSeeInField	('#jky-zip'				, '');
//$I->canSeeInField	('#jky-state'			, ' ');
//$I->canSeeInField	('#jky-country'			, ' ');
$I->canSeeInField	('#jky-district'		, '');
$I->canSeeButton	($I, 'Save-Address');

$I->logoff			($I);
