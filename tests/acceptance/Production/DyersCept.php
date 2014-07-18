<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Dyers page');
$I->login			($I, 'Production', 'User');

$I->clickMenu		($I, 'Production');
$I->clickBar		($I, 'Production', 'Dyers');

$I->clickSelect		($I, 'All'		);
$I->clickSelect		($I, 'Inactive'	);
$I->clickSelect		($I, 'Active'	);

$I->clickActionForm	($I, 'A2');
$I->canSeeInField	('#jky-nick-name'		, 'A2');
$I->canSeeInField	('#jky-full-name'		, 'Favo Malhas Ltda');
$I->canSeeInField	('#jky-is-company'		, 'Yes');
$I->canSeeInField	('#jky-parent-company'	, 'null');
$I->canSeeInField	('#jky-contact-tag'		, '');
$I->canSeeInField	('#jky-cnpj'			, '');
$I->canSeeInField	('#jky-ie'				, '');
//$I->canSeeImage		('100002');
$I->cantSeeInField	('#jky-position'		, 'Purchase Director');
$I->canSeeInField	('#jky-website'			, '');
$I->canSeeInField	('#jky-email'			, '');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'address');
$I->canSeeInField	('#jky-street1'			, '');
$I->canSeeInField	('#jky-st-number'		, '');
$I->canSeeInField	('#jky-st-cpl'			, '');
$I->canSeeInField	('#jky-street2'			, '');
$I->canSeeInField	('#jky-city'			, '');
$I->canSeeInField	('#jky-zip'				, '');
$I->canSeeInField	('#jky-state'			, '');
$I->canSeeInField	('#jky-country'			, '');
$I->canSeeInField	('#jky-district'		, '');
$I->canSeeButton	($I, 'Save-Address');

$I->clickTab		($I, 'phones'	);
$I->canSeeInField	('#jky-phone'			, '');
$I->canSeeInField	('#jky-mobile'			, '');
$I->canSeeInField	('#jky-fax'				, '');
$I->canSeeButton	($I, 'Save-Phones');

$I->clickTab		($I, 'contacts');
//$I->canSee			('Joselio Di');
//$I->canSee			('joselio');
//$I->canSee			('Production');

$I->logoff			($I);
