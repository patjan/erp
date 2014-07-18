<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Suppliers page');
$I->login			($I, 'Planning', 'User');

$I->clickMenu		($I, 'Planning');
$I->clickBar		($I, 'Planning', 'Suppliers');

$I->clickSelect		($I, 'All'		);
$I->clickSelect		($I, 'Inactive'	);
$I->clickSelect		($I, 'Active'	);

$I->clickActionForm	($I, 'DL'	);
$I->canSeeInField	('#jky-nick-name'		, 'DL');
$I->canSeeInField	('#jky-full-name'		, 'DL Malhas Ltda');
$I->canSeeInField	('#jky-is-company'		, 'Yes');
$I->canSeeInField	('#jky-parent-company'	, 'null');
$I->canSeeInField	('#jky-contact-tag'		, '');
$I->canSeeInField	('#jky-cnpj'			, '04.787.444/0001-70');
$I->canSeeInField	('#jky-ie'				, '116.274.081.117');
//$I->canSeeImage		('100002');
$I->cantSeeInField	('#jky-position'		, 'Purchase Director');
$I->canSeeInField	('#jky-website'			, 'www.dlmalhas.com.br');
$I->canSeeInField	('#jky-email'			, 'suporte@dlmalhas.com.br');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'address');
$I->canSeeInField	('#jky-street1'			, 'Rua Dias Leme');
$I->canSeeInField	('#jky-st-number'		, '512');
$I->canSeeInField	('#jky-st-cpl'			, '');
$I->canSeeInField	('#jky-street2'			, 'Mooca');
$I->canSeeInField	('#jky-city'			, 'Sao Paulo');
$I->canSeeInField	('#jky-zip'				, '03118-040');
$I->canSeeInField	('#jky-state'			, 'SP');
$I->canSeeInField	('#jky-country'			, 'BR');
$I->canSeeInField	('#jky-district'		, '3550308');
$I->canSeeButton	($I, 'Save-Address');

$I->clickTab		($I, 'phones');
$I->canSeeInField	('#jky-phone'			, '11-2601-8338');
$I->canSeeInField	('#jky-mobile'			, '');
$I->canSeeInField	('#jky-fax'				, '11-2601-8999');
$I->canSeeButton	($I, 'Save-Phones');

$I->clickTab		($I, 'contacts');
$I->canSee			('Joselio Dl');
$I->canSee			('joselio');
$I->canSee			('Production');

$I->logoff			($I);
