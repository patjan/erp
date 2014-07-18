<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Purchase Orders page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Purchases');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '200100');
$I->canSeeInField	('#jky-purchase-number'	, '200100');
$I->canSeeInField	('#jky-source-doc'		, 'SAO BENTO_03_14');
$I->canSeeElement	('#jky-ordered-date'	);
$I->canSeeElement	('#jky-expected-date'	);
//$I->canSeeElement	('#jky-scheduled-date'	);
$I->canSeeInField	('#jky-supplier-name'	, '100045');	//	Sao Bento
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'lines');
$I->canSee			('30/1 PA Mescla Preto 50/50');
$I->canSee			('1000');
$I->canSee			('1015.74');	
$I->canSee			('05-21-2014');	

$I->logoff			($I);