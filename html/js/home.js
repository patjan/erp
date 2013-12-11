"use strict";

/**
 * home.html
 */
var jky_program	= 'Home';

$(function() {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_company_name(JKY.Session.get_value('company_name'	));
	JKY.set_company_logo(JKY.Session.get_value('company_logo'	));
	JKY.set_copyright	(JKY.Session.get_value('copyright'		));
//	JKY.set_contact_us	(JKY.Session.get_value('contact_us'		));
//	JKY.set_buttons_control([], JKY.Session.get_value('language'), JKY.Session.get_value('languages'));
	JKY.set_all_events_home(jky_program);

	if (JKY.Session.has('full_name')) {
//		JKY.set_initial_values_home(jky_program);
		JKY.process_start_page();
	}else{
		JKY.process_action('login');
	}
});

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events_home = function(jky_program) {
	if (JKY.is_loaded('jky-loaded')) {
		JKY.display_trace('set_all_events - '  + jky_program);
		JKY.set_html('jky-loaded', '<scr' + 'ipt src="js/translations/' + JKY.Session.get_value('locale') + '.js"></scr' + 'ipt>');
		JKY.t_tag	('jky-wrapper', 'span');
		JKY.t_input	('jky-wrapper', 'placeholder');
/*
		$('#jky-sign-up'		).click (function() {JKY.display_sign_up	()		;});
		$('#jky-log-in'			).click (function() {JKY.display_log_in		()		;});
		$('#jky-profile'		).click (function() {JKY.display_profile	()		;});
		$('#jky-log-out'		).click (function() {JKY.display_log_out	()		;});

		$('#jky-company-logo'	).click (function() {JKY.display_wordpress	()		;});
		$('#jky-company-name'	).click (function() {JKY.display_company	(this)	;});

		$('#jky-copyright'		).click (function() {JKY.display_copyright	()		;});
		$('#jky-contact-us'		).click (function() {JKY.display_contact_us	()		;});
*/
		$('#jky-sales-customers'		).click (function() {JKY.process_action('customers'			);});
		$('#jky-sales-products'			).click (function() {JKY.process_action('products'			);});
		$('#jky-sales-colors'			).click (function() {JKY.process_action('colors'			);});
		$('#jky-sales-quotations'		).click (function() {JKY.process_action('quotations'		);});

		$('#jky-planning-threads'		).click (function() {JKY.process_action('threads'			);});
		$('#jky-planning-machines'		).click (function() {JKY.process_action('machines'			);});
		$('#jky-planning-products'		).click (function() {JKY.process_action('products'			);});
		$('#jky-planning-suppliers'		).click (function() {JKY.process_action('suppliers'			);});
		$('#jky-planning-tdyers'		).click (function() {JKY.process_action('tdyers'			);});
		$('#jky-planning-orders'		).click (function() {JKY.process_action('orders'			);});
		$('#jky-planning-pieces'		).click (function() {JKY.process_action('pieces'			);});
//		$('#jky-planning-requests'		).click (function() {JKY.process_action('requests'			);});
//		$('#jky-planning-reqlines'		).click (function() {JKY.process_action('reqlines'			);});

		$('#jky-production-threads'		).click (function() {JKY.process_action('threads'			);});
		$('#jky-production-machines'	).click (function() {JKY.process_action('machines'			);});
		$('#jky-production-products'	).click (function() {JKY.process_action('products'			);});
		$('#jky-production-suppliers'	).click (function() {JKY.process_action('suppliers'			);});
		$('#jky-production-dyers'		).click (function() {JKY.process_action('dyers'				);});
		$('#jky-production-partners'	).click (function() {JKY.process_action('partners'			);});
		$('#jky-production-ftps'		).click (function() {JKY.process_action('ftps'				);});
		$('#jky-production-pieces'		).click (function() {JKY.process_action('pieces'			);});

		$('#jky-threads-threads'		).click (function() {JKY.process_action('threads'			);});
		$('#jky-threads-suppliers'		).click (function() {JKY.process_action('suppliers'			);});
		$('#jky-threads-machines'		).click (function() {JKY.process_action('machines'			);});
		$('#jky-threads-purchases'		).click (function() {JKY.process_action('purchases'			);});
		$('#jky-threads-purc-lines'		).click (function() {JKY.process_action('purc_lines'		);});
		$('#jky-threads-incomings'		).click (function() {JKY.process_action('incomings'			);});
		$('#jky-threads-batches'		).click (function() {JKY.process_action('batches'			);});
		$('#jky-threads-checkouts'		).click (function() {JKY.process_action('checkouts'			);});
		$('#jky-threads-batchouts'		).click (function() {JKY.process_action('batchouts'			);});
		$('#jky-threads-boxes'			).click (function() {JKY.process_action('boxes'				);});
		$('#jky-threads-forecast'		).click (function() {JKY.process_action('threadforecast'	);});

		$('#jky-boxes-checkin'			).click (function() {JKY.process_action('boxes_checkin'		);});
		$('#jky-boxes-return'			).click (function() {JKY.process_action('boxes_return'		);});
		$('#jky-boxes-checkout'			).click (function() {JKY.process_action('boxes_checkout'	);});
		$('#jky-boxes-info'				).click (function() {JKY.process_action('boxes_info'		);});

		$('#jky-dyers-pieces'			).click (function() {JKY.process_action('pieces'			);});
		$('#jky-dyers-dyers'			).click (function() {JKY.process_action('dyers'				);});
		$('#jky-dyers-machines'			).click (function() {JKY.process_action('machines'			);});
		$('#jky-dyers-purchases'		).click (function() {JKY.process_action('purchases'			);});
		$('#jky-dyers-purc-lines'		).click (function() {JKY.process_action('purc_lines'		);});
		$('#jky-dyers-incomings'		).click (function() {JKY.process_action('incomings'			);});
		$('#jky-dyers-batches'			).click (function() {JKY.process_action('batches'			);});
		$('#jky-dyers-loadouts'			).click (function() {JKY.process_action('loadouts'			);});
		$('#jky-dyers-batchouts'		).click (function() {JKY.process_action('batchouts'			);});
		$('#jky-dyers-boxes'			).click (function() {JKY.process_action('boxes'				);});
		$('#jky-dyers-forecast'			).click (function() {JKY.process_action('dyerforecast'		);});

		$('#jky-pieces-checkin'			).click (function() {JKY.process_action('pieces_checkin'	);});
		$('#jky-fabrics-info'			).click (function() {JKY.process_action('fabrics_info'		);});

		$('#jky-help-tickets'			).click (function() {JKY.process_action('tickets'			);});

		$('#jky-admin-configs'			).click (function() {JKY.process_action('configs'			);});
		$('#jky-admin-contacts'			).click (function() {JKY.process_action('contacts'			);});
		$('#jky-admin-companies'		).click (function() {JKY.process_action('companies'			);});
		$('#jky-admin-history'			).click (function() {JKY.process_action('history'			);});

		$('#jky-support-controls'		).click (function() {JKY.process_action('controls'			);});
		$('#jky-support-permissions'	).click (function() {JKY.process_action('permissions'		);});
		$('#jky-support-templates'		).click (function() {JKY.process_action('templates'			);});
		$('#jky-support-translations'	).click (function() {JKY.process_action('translations'		);});
	}else{
		setTimeout(function() {JKY.set_all_events_home();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values_home = function(jky_program) {
	if (JKY.is_loaded('jky')) {
JKY.display_trace('set_initial_values - '  + jky_program);
//		JKY.set_menu_active('jky-menu-admin');
/*
		$('#jky-home'				).click (function() {JKY.process_home		()		;});
		$('#jky-help'				).click (function() {JKY.process_help		()		;});
		$('#jky-my-info'			).click (function() {JKY.process_my_info	()		;});
		$('#jky-control-language'	).change(function() {JKY.change_language	(this)	;});
		JKY.set_html('jky-app-breadcrumb', JKY.t(jky_program));
*/
		JKY.show('jky-side-bar');
	}else{
		setTimeout(function() {JKY.set_initial_values_home();}, 100);
	}
}

/** ------------------------------------------------------------------------ **/
/*
JKY.display_sign_up = function() {
	JKY.display_trace('display_sign_up');
}

JKY.display_log_in = function() {
	JKY.display_trace('display_log_in');
}

JKY.display_profile = function() {
	JKY.display_trace('display_profile');
}

JKY.display_log_out = function() {
	JKY.display_trace('display_log_out');
}
*/
JKY.display_wordpress = function() {
	JKY.display_trace('display_wordpress');
}

JKY.display_company = function(company_name) {
	var my_company_name = $(company_name).text();
	JKY.display_trace('display_company: ' + my_company_name);
}

JKY.display_event = function(event_name) {
	var my_event_name = $(event_name).text();
	JKY.display_trace('display_event: ' + my_event_name);
}

JKY.display_copyright = function() {
	JKY.display_trace('display_copyright');
}

JKY.display_contact_us = function() {
	JKY.display_trace('display_contact_us');
}

JKY.change_language = function(language) {
	var my_language = language.options[language.selectedIndex].value;
	JKY.display_trace('language: ' + my_language);
}

/** ------------------------------------------------------------------------ **/

JKY.process_home = function() {
	JKY.display_trace('process_home');
	JKY.process_action('welcome');
}

JKY.process_help = function() {
	JKY.display_trace('process_help');
}

JKY.process_my_info = function() {
	JKY.display_trace('process_my_info');
}

JKY.process_start_page = function() {
	JKY.display_trace('process_start_page - '  + jky_program);
	var my_menus =
		[{id:'jky-menu-sales'		, icon:'plus', label:'Sales'		}
		,{id:'jky-menu-planning'	, icon:'plus', label:'Planning'		}
		,{id:'jky-menu-production'	, icon:'plus', label:'Production'	}
//		,{id:'jky-menu-invoicing'	, icon:'plus', label:'Invoicing'	}
//		,{id:'jky-menu-delivers'	, icon:'plus', label:'Delivers'		}
//		,{id:'jky-menu-purchases'	, icon:'plus', label:'Purchases'	}
//		,{id:'jky-menu-incomings'	, icon:'plus', label:'Incomings'	}
//		,{id:'jky-menu-storage'		, icon:'plus', label:'Storage'		}
//		,{id:'jky-menu-revision'	, icon:'plus', label:'Revision'		}
//		,{id:'jky-menu-inventory'	, icon:'plus', label:'Inventory'	}
//		,{id:'jky-menu-payable'		, icon:'plus', label:'Payable'		}
//		,{id:'jky-menu-receivable'	, icon:'plus', label:'Receivable'	}

		,{id:'jky-menu-threads'		, icon:'plus', label:'Threads'		}
		,{id:'jky-menu-boxes'		, icon:'plus', label:'Boxes'		}
		,{id:'jky-menu-dyers'		, icon:'plus', label:'Dyers'		}
		,{id:'jky-menu-pieces'		, icon:'plus', label:'Pieces'		}
//		,{id:'jky-menu-fabrics'		, icon:'plus', label:'Fabrics'		}
		,{id:'jky-menu-help'		, icon:'plus', label:'Help'			}
		,{id:'jky-menu-admin'		, icon:'plus', label:'Admin'		}
		,{id:'jky-menu-support'		, icon:'plus', label:'Support'		}
		];
	JKY.set_buttons_menus(my_menus);
	JKY.set_user_info(JKY.Session.get_value('full_name'));
	var my_start_page = JKY.Session.get_value('start_page');
	JKY.process_menu('jky-menu-' + my_start_page);
//	JKY.process_action(my_start_page);
//	JKY.process_action('ftps');
//	JKY.process_action('suppliers');
	JKY.show('jky-side-bar');
}

/** ------------------------------------------------------------------------ **/
JKY.process_menu = function(menu) {
	JKY.display_trace('process_menu - '  + jky_program + ': ' + menu);
	JKY.set_menu_active(menu);
	switch(menu) {
		case 'jky-menu-sales'		: JKY.show('jky-side-sales'		); JKY.process_action('quotations'		); break;
		case 'jky-menu-purchases'	: JKY.show('jky-side-purchases'	); JKY.process_action('purchases'		); break;
		case 'jky-menu-planning'	: JKY.show('jky-side-planning'	); JKY.process_action('orders'			); break;
		case 'jky-menu-threads'		: JKY.show('jky-side-threads'	); JKY.process_action('purchases'		); break;
		case 'jky-menu-boxes'		: JKY.show('jky-side-boxes'		); JKY.process_action('boxes_checkin'	); break;
		case 'jky-menu-dyers'		: JKY.show('jky-side-dyers'		); JKY.process_action('loadouts'		); break;
		case 'jky-menu-pieces'		: JKY.show('jky-side-pieces'	); JKY.process_action('pieces_checkin'	); break;
		case 'jky-menu-fabrics'		: JKY.show('jky-side-fabrics'	); JKY.process_action('fabrics_checkin'	); break;
		case 'jky-menu-production'	: JKY.show('jky-side-production'); JKY.process_action('ftps'			); break;
		case 'jky-menu-help'		: JKY.show('jky-side-help'		); JKY.process_action('tickets'			); break;
		case 'jky-menu-admin'		: JKY.show('jky-side-admin'		); JKY.process_action('contacts'		); break;
		case 'jky-menu-support'		: JKY.show('jky-side-support'	); JKY.process_action('translations'	); break;
	}
}
