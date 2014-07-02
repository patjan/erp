<?php
namespace Codeception\Module;

// here you can define custom functions for WebGuy 

class WebHelper extends \Codeception\Module
{
	public function seeButton($button_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($button_name, 'span');
	}

	public function seeLayer($layer_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($layer_name, '.modal-header');
	}

	public function seeImage($image_url) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->seeElement('//img[@src="/img/'.$image_url.'.png"]');
	}

	public function seeProgram($program_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($program_name, '#jky-app-breadcrumb');
	}


	public function clickActionForm($I, $filter_string) {
		$I->fillField	('#jky-app-filter', $filter_string);
		$I->click		('#jky-action-form');
	}

	public function clickSelect($I, $option_name) {
		$I->selectOption('#jky-app-select', $option_name);
		$I->wait(1);
	}

	public function clickBar($I, $menu_name, $bar_name) {
		$I->amGoingTo	($menu_name . ' - ' . $bar_name . ' page');
		$I->click		(strtolower('#jky-' . $menu_name . '-' . $bar_name));
		$I->seeProgram	($bar_name);
	}

	public function clickTab($I, $tab_name) {
		$I->wait		(1);
		$I->click		('a[href="#jky-pane-' . $tab_name . '"]');
		$I->canSee		("#jky-pane-" . $tab_name);
	}


	public function login($I, $the_first_name, $the_last_name) {
		$I->resizeWindow	(1400, 1000);

		$I->amGoingTo		('Log In page');
		$I->amOnPage		('/');
		$I->waitForElement	('#jky-log-form');
		$I->canSeeLayer		('Log In');

		$I->amGoingTo		($the_first_name . ' page');
		$I->fillField		('#jky-log-user-name', strtolower($the_first_name));
		$I->fillField		('#jky-log-password' , $the_first_name . $the_last_name);
		$I->click			('#jky-button-log-in');
		$I->canSeeLink		($the_first_name . ' ' .  $the_last_name);
	}

	public function logoff($I) {
		$I->wait			(2);
		$I->amGoingTo		('Log Off page');
		$I->click			('Log Off');
		$I->canSeeLayer		('Log Off');
		$I->canSeeButton	('Log In');

		$I->amGoingTo		('Log In page');
		$I->click			('#jky-button-log-in');
		$I->waitForElement	('#jky-log-form');
		$I->canSeeLayer		('Log In');

		$I->wait			(5);
	}
}
