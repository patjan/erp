<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Check Out page');
$I->login			($I, 'Boxes', 'User');

$I->clickMenu		($I, 'Boxes');
$I->clickBar		($I, 'Boxes', 'CheckOut');

$I->clickActionForm	($I, '200200');
$I->canSee			('200200');
$I->canSee			('05-23-2014');	
$I->canSee			('05-26-2014');
$I->canSee			('Paola');	
$I->canSee			('30/1 PA Cardado Morungaba');	
$I->canSee			('20086');	
$I->canSee			('2D05');	
$I->canSee			('0');	
$I->canSee			('32');	

$I->logoff			($I);