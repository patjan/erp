<?php
$I = new WebGuy		($scenario);

$I->wantTo			('view Welcome page');

$I->amOnPage		('/welcome.html');
$I->see				('Welcome', 'h1');
