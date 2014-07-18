<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Quotations page');
$I->login			($I, 'Sales', 'User');

$I->clickMenu		($I, 'Sales');
$I->clickBar		($I, 'Sales', 'Quotations');

$I->clickSelect		($I, 'All'				);
$I->clickSelect		($I, 'Draft'			);
$I->clickSelect		($I, 'Active'			);
$I->clickSelect		($I, 'Closed'			);
$I->clickSelect		($I, 'Draft + Active'	);

$I->clickActionForm	($I, '200001'	);
$I->canSeeInField	('#jky-quotation-number', '200001');
$I->canSeeElement	('#jky-quoted-date'		);
$I->canSeeElement	('#jky-produced-date'	);
$I->canSeeElement	('#jky-delivered-date'	);
$I->canSeeInField	('#jky-customer-name'	, '100002');	//	Tecno
$I->canSeeInField	('#jky-machine-name'	, '200056');	//	Shakira
$I->canSeeInField	('#jky-dyer-name'		, '200001');	//	A2
$I->canSeeInField	('#jky-weight'			, '150');
$I->canSeeInField	('#jky-width'			, '90');
$I->canSeeElement	('#jky-has-break'		);
$I->canSeeButton	($I, 'Save');
$I->canSeeButton	($I, 'Copy');
$I->canSeeButton	($I, 'Delete');
$I->canSeeButton	($I, 'Cancel');

$I->clickTab		($I, 'lines');
$I->canSee			('Meia Malha Mescla Cinza 88/12 Alvejado Tubular');
$I->canSee			('Branco');	

$I->clickTab		($I, 'remarks');
//$I->canSeeInField	('#jky-remarks', 'SEGUIR INTRUCOES E RECEITAS, MAQUINA LONGA TUBULAR CUIDADO COM TOQUE ESTABILIDE QUEBRADURAS');
$I->canSeeElement	('#jky-remarks');

$I->logoff			($I);