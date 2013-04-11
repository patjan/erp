/*
 * start after jquery loaded
 */
$(function() {
	JKY.start_admin();
});

/*
 * start point for admin
 */
JKY.start_admin = function() {
	JKY.display_trace('start_admin');
	JKY.set_all_events();
	JKY.set_initial_values();
}

/*
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events');
	if ($('#jky-loaded').length > 0) {
		$('#jky-is-company'		).click(function() {JKY.display_is_company(this);});
		$('#jky-display-list'	).click(function() {JKY.display_list();});
		$('#jky-display-form'	).click(function() {JKY.display_form();});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/*
 *	set initial values (run only once per load)
 *	hide [MainMenu] of 2013
 */
JKY.set_initial_values = function() {
	JKY.display_trace('set_initial_values');
	if ($('#jky-loaded').length > 0) {
		JKY.set_menu_active('jky-menu-sales');
		JKY.set_side_active('jky-sales-customers');
		JKY.show('jky-side-sales');
		JKY.display_form();
		JKY.set_html('jky-app-breadcrumb', 'Model / MD000014');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.display_is_company = function(id) {
	var my_value = $(id).is(':checked');
	if (my_value) {
		JKY.hide('jky-company-name');
	}else{
		JKY.show('jky-company-name');
	}
}

JKY.display_list = function() {
	JKY.show('jky-app-filter');
	JKY.show('jky-app-table');
	JKY.hide('jky-app-more');
	JKY.hide('jky-app-navs');
	JKY.hide('jky-app-form');
}

JKY.display_form = function() {
	JKY.hide('jky-app-filter');
	JKY.hide('jky-app-table');
	JKY.show('jky-app-more');
	JKY.show('jky-app-navs');
	JKY.show('jky-app-form');
}

