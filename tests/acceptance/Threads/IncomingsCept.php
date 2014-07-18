<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Incoming Purchases page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'Incomings');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Active'			);

$I->clickActionForm	($I, '200399');
$I->canSeeInField	('#jky-incoming-number'	, '200399');
$I->canSeeInField	('#jky-supplier-name'	, '100049');	//	Sueco
$I->canSeeInField	('#jky-nfe-dl'			, '');
$I->canSeeInField	('#jky-nfe-tm'			, '');
$I->canSeeElement	('#jky-received-date'	);
$I->canSeeElement	('#jky-invoice-date'	);
$I->canSeeInField	('#jky-invoice-amount'	, '0.00');
$I->canSeeInField	('#jky-invoice-weight'	, '20000.00');
$I->canSeeInField	('#jky-received-amount'	, '0.00');
$I->canSeeInField	('#jky-received-weight'	, '0.00');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'batches');
$I->canSee			('20/1 PA Cardado');
$I->canSee			('200103');
$I->canSee			('0');	
$I->canSee			('0.00');	

$I->logoff			($I);