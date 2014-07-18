<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Check Out Orders page');
$I->login			($I, 'Threads', 'User');

$I->clickMenu		($I, 'Threads');
$I->clickBar		($I, 'Threads', 'CheckOuts');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '200200');
$I->canSeeInField	('#jky-checkout-number'	, '200200');
$I->canSeeInField	('#jky-machine-name'	, 'paola');
$I->canSeeInField	('#jky-partner-name'	, '');
$I->canSeeInField	('#jky-supplier-name'	, '');
$I->canSeeInField	('#jky-dyer-name'		, '');
$I->canSeeInField	('#jky-nfe-dl'			, '');
$I->canSeeInField	('#jky-nfe-tm'			, '');
$I->canSeeElement	('#jky-requested-date'	);
$I->canSeeElement	('#jky-checkout-date'	);
$I->canSeeInField	('#jky-requested-weight', '1120.00');
$I->canSeeInField	('#jky-checkout-weight'	, '1128.95');
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'batches');
$I->canSee			('30/1 PA Cardado Morungaba');
$I->canSee			('20086');
$I->canSee			('35.16');	
$I->canSee			('1120.00');	
$I->canSee			('1128.95');	
$I->canSee			('32');	

$I->logoff			($I);