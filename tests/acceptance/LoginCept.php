<?php
$I = new WebGuy		($scenario);

$I->wantTo			('test Login page');

$I->login			($I, 'Sales', 'User');

$I->logoff			($I);
