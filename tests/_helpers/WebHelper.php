<?php
namespace Codeception\Module;

// here you can define custom functions for WebGuy

class WebHelper extends \Codeception\Module
{
	private $delay_time	= 0;	//	in seconds for wait
/*
//	this function is very slow	????????????????????????????????????????????????
	public function seeButton($button_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($button_name, 'span');
//		$webDriver->see('<span>' . $button_name . '</span>', 'button');
	}
*/
	public function seeBar($menu_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($menu_name, 'span');
	}

	public function seeLayer($layer_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($layer_name, '.modal-header');
	}
/*
	public function seeImage($image_url) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->seeElement('//img[@src="/img/' . $image_url . '.png"]');
//		$webDriver->seeElement('//img[@src="/thumbs/contacts/' . $image_url . '.png"]');
//		$webDriver->seeElement('//img[@src="' . $image_url . '.png"]');
	}
*/
	public function seeProgram($program_name) {
		$webDriver = $this->getModule('WebDriver');
		$webDriver->see($program_name, '#jky-app-breadcrumb');
	}
/*
	public function canSeeButton($I, $button_name) {
		$my_icon = '';
		switch($button_name) {
			case 'Add'		: $my_icon = 'plus'			; break;
			case 'Restore'	: $my_icon = 'refresh'		; break;
			case 'Save'		: $my_icon = 'ok-circle'	; break;
		}
		if ($my_icon == '')		return;
		$I->canSeeElement('.icon-' . $my_icon);
	}
*/
	public function canSeeButton($I, $button_name) {
		$I->canSeeElement('#jky-action-' . strtolower($button_name));
	}

	public function clickActionList($I, $filter_string) {
		$I->fillField	('#jky-app-filter', $filter_string);
		$I->click		('#jky-action-list');
	}

	public function clickActionForm($I, $filter_string) {
		$I->fillField	('#jky-app-filter', $filter_string);
		$I->click		('#jky-action-form');
	}

	public function clickButton($I, $button_name) {
//		$I->click		('#gl-button-' . strtolower($button_name));
		$I->click		('#jky-action-' . strtolower($button_name));
	}

	public function clickSelect($I, $option_name) {
		$I->executeJS	("$('#jky-app-count').html('999999');");
		$I->selectOption('#jky-app-select', $option_name);
		$I->wait		($this->delay_time);
//		$I->waitForElementChange('#jky-app-count', function(\WebDriverElement $el) {
//			$my_app_count = $I->grabTextFrom('#jky-app-count');
//			return ($my_app_count == '999999' ? false : true);
//		}, 10);
		$I->dontSee		('999999', '#jky-app-count');
	}

	public function clickMenu($I, $menu_name) {
		$I->amGoingTo	($menu_name . ' page');
		$I->click		($menu_name);
		$I->seeBar		($menu_name);
	}

	public function clickBar($I, $menu_name, $bar_name) {
		$I->amGoingTo	($menu_name . ' - ' . $bar_name . ' page');
		$I->click		(strtolower('#jky-' . $menu_name . '-' . $bar_name));
//		$I->seeProgram	($bar_name);
	}

	public function clickTab($I, $tab_name) {
		$I->wait		($this->delay_time);
		$I->click		('a[href="#jky-pane-' . $tab_name . '"]');
		$I->canSee		("#jky-pane-" . $tab_name);
	}

	public function clickAction($I, $tab_title, $tab_name, $close_name='') {
		$I->wait		($this->delay_time);
		$I->amGoingTo	('display ' . $tab_name);
		$I->click		('a[title="' . $tab_title . '"]');
		$I->canSee		($tab_name);
		$I->wait		($this->delay_time);
//		$I->click		('X', '.close');
//		$I->click		('["data-dismiss" => "modal"]');
//		$I->click		('a[class="btn close"]');
//		$I->click		('#wrk-note-close');
		if ($close_name != '' ) {
			$I->click	('#' . $close_name);
		}
	}

	public function login($I, $the_first_name, $the_last_name) {
		$I->resizeWindow	(1400, 1000);

		$I->amGoingTo		('Log In page');
		$I->amOnPage		('/');
		$I->waitForElement	('#jky-log-form', 30);		//	wait until Log In form is visible
		$I->canSeeLayer		('Log In');

		$I->amGoingTo		($the_first_name . ' page');
		$I->fillField		('#jky-log-user-name', strtolower($the_first_name));
		$I->fillField		('#jky-log-password' , $the_first_name . $the_last_name);
		$I->click			('#jky-button-log-in');
		$I->waitForElement	('#jky-menu-logoff', 30);	//	wait until Log Off is visible
		$I->canSeeLink		($the_first_name . ' ' . $the_last_name);
	}

	public function logoff($I) {
		$I->wait			($this->delay_time);
		$I->amGoingTo		('Log Off page');
		$I->click			('Log Off');
		$I->waitForElement	('#jky-log-form', 30);		//	wait until Log Off form is visible
		$I->canSeeLayer		('Log Off');

		$I->amGoingTo		('Log In page');
		$I->click			('#jky-button-log-in');
		$I->waitForElement	('#jky-log-form', 30);		//	wait until Log In form is visible
		$I->canSeeLayer		('Log In');

		$I->wait			($this->delay_time);
	}
}
