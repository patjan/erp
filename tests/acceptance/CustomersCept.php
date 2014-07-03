<?php

$I = new WebGuy($scenario);

$I->wantTo			('test Customers page');

$I->login			($I, 'Sales', 'User');

$I->clickBar		($I, 'Sales', 'Customers');

$I->clickSelect		($I, 'Active'	);
$I->clickSelect		($I, 'Inactive'	);
$I->clickSelect		($I, 'All'		);

$I->clickActionForm	($I, 'Tecno'	);

$I->clickTab		($I, 'address'	);
$I->clickTab		($I, 'phones'	);
$I->clickTab		($I, 'contacts'	);

$I->logoff			($I);
