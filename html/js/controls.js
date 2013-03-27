"use strict";

/**
 * controls.html
 */


/**
 * start program
 */
JKY.start_program = function() {
	JKY.display_trace('start_program - controls');
	JKY.set_all_events();
	JKY.set_initial_values();
}

/*
 *	set all events (run only once per load)
 */
JKY.set_all_events = function() {
	JKY.display_trace('set_all_events');
	if ($('#jky-loaded').length > 0) {
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
//		JKY.load_html('jky-header'		, 'JKY-Header.html'			);
//		JKY.load_html('jky-side-bar'	, 'JKY-Side-Bar.html'		);
//		JKY.load_html('jky-table-body'	, 'JKY-Controls-TBody.html'	);
		var my_menus =
			[{id:'jky-menu-sales'		, icon:'plus', label:'Sales'		}
			,{id:'jky-menu-invoicing'	, icon:'plus', label:'Invoicing'	}
			,{id:'jky-menu-delivers'	, icon:'plus', label:'Delivers'		}
			,{id:'jky-menu-purchases'	, icon:'plus', label:'Purchases'	}
			,{id:'jky-menu-incomings'	, icon:'plus', label:'Incomings'	}
			,{id:'jky-menu-storage'		, icon:'plus', label:'Storage'		}
			,{id:'jky-menu-production'	, icon:'plus', label:'Production'	}
			,{id:'jky-menu-revision'	, icon:'plus', label:'Revision'		}
			,{id:'jky-menu-inventory'	, icon:'plus', label:'Inventory'	}
			,{id:'jky-menu-payable'		, icon:'plus', label:'Payable'		}
			,{id:'jky-menu-receivable'	, icon:'plus', label:'Receivable'	}
			,{id:'jky-menu-admin'		, icon:'plus', label:'Admin'		}
			];
		JKY.set_buttons_menus(my_menus);
		JKY.set_user_info(JKY.Session.get_value('full_name'));

		JKY.set_active('jky-menu-admin');
		JKY.set_active('jky-admin-controls');
		JKY.show('jky-side-admin');

		JKY.load_table();

		JKY.display_form();
		JKY.set_html('jky-app-breadcrumb', 'Controls - CT000001');
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
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

JKY.load_table = function() {

}