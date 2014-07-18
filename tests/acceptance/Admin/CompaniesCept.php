<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Companies page');
$I->login			($I, 'Admin', 'User');

$I->clickMenu		($I, 'Admin');
$I->clickBar		($I, 'Admin', 'Companies');

$I->clickSelect		($I, 'All'		);
$I->clickSelect		($I, 'Inactive'	);
$I->clickSelect		($I, 'Active'	);

$I->clickActionForm	($I, 'Tecno');
$I->canSeeInField	('#jky-nick-name'		, 'Tecno');
$I->canSeeInField	('#jky-full-name'		, 'Tecno Malhas');
$I->canSeeCheckboxIsChecked	('#jky-is-customer'	);
$I->cantSeeCheckboxIsChecked('#jky-is-supplier'	);
$I->cantSeeCheckboxIsChecked('#jky-is-dyer'		);
$I->cantSeeCheckboxIsChecked('#jky-is-partner'	);
$I->cantSeeCheckboxIsChecked('#jky-is-transport');
$I->canSeeInField	('#jky-parent-company'	, 'null');
$I->canSeeInField	('#jky-contact-tag'		, '');
$I->canSeeInField	('#jky-cnpj'			, '04.744.013/0001-26');
$I->canSeeInField	('#jky-ie'				, '116.257.257.110');
//$I->canSeeImage		('100002');
$I->canSeeInField	('#jky-website'			, 'www.metatex.com.br');
$I->canSeeInField	('#jky-email'			, 'suporte@metatex.com.br');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'address');
$I->canSeeInField	('#jky-street1'			, 'Rua Baceunas');
$I->canSeeInField	('#jky-st-number'		, '51');
$I->canSeeInField	('#jky-st-cpl'			, '');
$I->canSeeInField	('#jky-street2'			, 'Vila Prudente');
$I->canSeeInField	('#jky-city'			, 'Parque da Mooca');
$I->canSeeInField	('#jky-zip'				, '03127-060');
$I->canSeeInField	('#jky-state'			, 'SP');
$I->canSeeInField	('#jky-country'			, 'BR');
$I->canSeeInField	('#jky-district'		, '3550308');
$I->canSeeButton	($I, 'Save-Address');

$I->clickTab		($I, 'phones');
$I->canSeeInField	('#jky-phone'			, '11 2274.3833');
$I->canSeeInField	('#jky-mobile'			, '');
$I->canSeeInField	('#jky-fax'				, '11 2274.3865');
$I->canSeeButton	($I, 'Save-Phones');

$I->clickTab		($I, 'contacts');
$I->canSee			('Marcelo Lodi');
$I->canSee			('marcelo@metatex.com.br');
$I->canSee			('marcelo');
$I->canSee			('Admin');

$I->logoff			($I);
