"use strict";

/**
 * models.html
 */
var jky_program		= 'Models';
var jky_table		= 'Models';
var jky_select		= '';
var jky_focus		= 'jky-name';
var jky_filter		= '';
var jky_specific	= '';
var jky_sort_by		= 'name';
var jky_sort_seq	=  0;				//	0=ASC, -1=DESC

var jky_count		=  0;
var jky_index		=  0;				//	0=Add New
var jky_set_index	= null;				//	only for insert set
var jky_set_setting	= null;				//	only for insert set

JKY.rows		= [];
JKY.row 		= null;
JKY.materials	= [];
JKY.threads		= [];
JKY.loads		= [];
JKY.settings	= [];

/**
 * start program
 */
JKY.start_program = function(action) {
	JKY.display_trace('start_program - ' + jky_program);
	JKY.set_all_events(jky_program);
	JKY.set_initial_values(jky_program);
}

/**
 *	set all events (run only once per load)
 */
JKY.set_all_events = function(jky_program) {
	JKY.display_trace('set_all_events');
	if (JKY.is_loaded('jky-body')) {
		$('#jky-app-select'		).change(function() {JKY.change_select  (this);});
		$('#jky-app-filter'		).change(function() {JKY.change_filter  (this);});
		$('#jky-action-add-new'	).click (function() {JKY.process_add_new	();});
		$('#jky-action-save'	).click (function() {JKY.process_save		();});
		$('#jky-action-delete'	).click (function() {JKY.process_delete		();});
		$('#jky-action-cancel'	).click (function() {JKY.process_cancel		();});
		$('#jky-action-export'	).click (function() {JKY.process_export		();});
		$('#jky-action-publish'	).click (function() {JKY.process_publish	();});	// not needed on version 0
		$('#jky-action-prev'	).click (function() {JKY.display_prev		();});
		$('#jky-action-next'	).click (function() {JKY.display_next		();});
		$('#jky-action-list'	).click (function() {JKY.display_list		();});
		$('#jky-action-form'	).click (function() {JKY.display_form	   (1);});
		$('#jky-action-comment'	).click (function() {JKY.process_comment	();});	// not done
		$('#jky-check-all'		).click (function() {JKY.process_check_all	();});	// not needed on version 0

		$('#jky-is-company'		).click	(function() {JKY.display_company(this);});

		$('#jky-comp-add-new'	).click (function() {JKY.insert_composition	();});
		$('#jky-thread-add-new'	).click (function() {JKY.insert_thread		();});
		$('#jky-load-add-new'	).click (function() {JKY.insert_load		();});

		$('#jky-tab-threads'	).click (function() {JKY.display_threads	();});
		$('#jky-tab-loads'		).click (function() {JKY.display_loads		();});
		$('#jky-tab-settings'	).click (function() {JKY.display_settings	();});

		$('#jky-repair-date').datepicker();
		$('#jky-return-date').datepicker();
		$('#jky-cylinder-add-new').click (function() {JKY.insert_cylinder();});
	}else{
		setTimeout(function() {JKY.set_all_events();}, 100);
	}
}

/**
 *	set initial values (run only once per load)
 */
JKY.set_initial_values = function(jky_program) {
	JKY.display_trace('set_initial_values');
	if (JKY.is_loaded('jky-body')) {
		JKY.set_menu_active('jky-menu-sales');
		JKY.set_side_active('jky-sales-customers');
		JKY.set_html('jky-state'  , JKY.set_group_set('Configs', '', 'States'	));
		JKY.set_html('jky-country', JKY.set_group_set('Configs', '', 'Countries'));

		JKY.set_menu_active('jky-menu-admin');
		JKY.set_side_active('jky-admin-configs');
		JKY.set_html('jky-app-select', JKY.set_group_set(jky_table , jky_select, 'Root'));
		JKY.set_html('jky-status'    , JKY.set_group_set('Controls', 'Active', 'Status Codes' ));

		JKY.set_menu_active('jky-menu-support');
		JKY.set_side_active('jky-support-controls');
		JKY.set_html('jky-app-select', JKY.set_group_set(jky_table , jky_select, 'Root'));
		JKY.set_html('jky-status'    , JKY.set_group_set('Controls', 'Active', 'Status Codes' ));

		JKY.set_menu_active('jky-menu-production');
		JKY.set_side_active('jky-production-ftps');
//		JKY.set_html('jky-product' , JKY.set_radio('Configs', '', 'Machine Types' ));
		JKY.set_html('jky-machine', JKY.set_table_options('Machines', 'name', '', null));

		JKY.set_menu_active('jky-menu-production');
		JKY.set_side_active('jky-production-machines');
		JKY.set_html('jky-machine-family', JKY.set_group_set('Configs', '', 'Machine Families'));
		JKY.set_html('jky-machine-brand' , JKY.set_group_set('Configs', '', 'Machine Brands'));

		JKY.set_menu_active('jky-menu-production');
		JKY.set_side_active('jky-production-threads');
		JKY.set_html('jky-machine-brand', JKY.set_group_set('Configs', '', 'Machine Brands'));

		JKY.set_menu_active('jky-menu-admin');
		JKY.set_side_active('jky-admin-users');
		JKY.set_html('jky-state'  , JKY.set_group_set('Configs', '', 'States'	));
		JKY.set_html('jky-country', JKY.set_group_set('Configs', '', 'Countries'));

		JKY.set_html('jky-app-breadcrumb', jky_program);
		JKY.display_list();
		JKY.show('jky-side-sales'		);
		JKY.show('jky-side-production'	);
		JKY.show('jky-side-admin'		);
		JKY.show('jky-side-support'		);
		JKY.show('jky-app-header'		);
		JKY.show('jky-action-add-new'	);
		JKY.materials	= JKY.get_configs('Materials');
		JKY.threads		= JKY.get_ids	 ('Threads'  );
		JKY.settings	= JKY.get_configs('Settings' );
	}else{
		setTimeout(function() {JKY.set_initial_values();}, 100);
	}
}

JKY.display_company = function(id) {
	if ($(id).is(':checked')) {
		JKY.hide('jky-company-name');
	}else{
		JKY.show('jky-company-name');
	}
}

JKY.display_list = function() {
	JKY.load_table();
	JKY.show('jky-app-filter'		);
	JKY.show('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-action-add-new'	);
	JKY.hide('jky-action-save'		);
	JKY.hide('jky-action-copy'		);
	JKY.hide('jky-action-delete'	);
	JKY.hide('jky-action-cancel'	);
	JKY.show('jky-app-table'		);
	JKY.hide('jky-app-form'			);
}

JKY.display_form = function(index) {
	JKY.display_row(index);
	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.show('jky-action-save'		);
	JKY.show('jky-action-copy'		);
	JKY.show('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}

JKY.change_select = function(event){
	jky_select = event.value;
	JKY.display_trace('change_select: ' + jky_select);
	JKY.display_list();
}

JKY.change_filter = function(event){
	jky_filter = event.value;
	JKY.display_trace('change_filter: ' + jky_filter);
	JKY.display_list();
}

JKY.display_prev = function() {
	jky_index = (jky_index == 1) ? jky_count : (jky_index-1);
	JKY.display_row(jky_index);
}

JKY.display_next = function() {
	jky_index = (jky_index == jky_count) ? 1 : (jky_index+1);
	JKY.display_row(jky_index);
}

JKY.display_row = function(index) {
	JKY.show('jky-form-tabs');
	jky_index = index;
	JKY.row = JKY.get_row(jky_table, JKY.rows[index-1]['id']);
	JKY.rows[index-1] = JKY.row;
	JKY.set_html('jky-app-index', index);
	JKY.set_option	('jky-status'		, JKY.row['status'			]);
	JKY.set_value	('jky-sequence'		, JKY.row['sequence'		]);
	JKY.set_value	('jky-name'			, JKY.row['name'			]);
	JKY.set_value	('jky-value'		, JKY.row['value'			]);

	JKY.set_value	('jky-full-name'	, JKY.row['full_name'		]);
	JKY.set_check	('jky-is-company'	, JKY.row['is_company'		]);
	JKY.set_option	('jky-company-name'	, JKY.row['company_name'	]);
	JKY.set_option	('jky-company-tag'	, JKY.row['company_tag'		]);

	JKY.set_value	('jky-street1'		, JKY.row['street1'			]);
	JKY.set_value	('jky-street2'		, JKY.row['street2'			]);
	JKY.set_value	('jky-city'			, JKY.row['city'			]);
	JKY.set_value	('jky-zip'			, JKY.row['zip'				]);
	JKY.set_option	('jky-state'		, JKY.row['state'			]);
	JKY.set_option	('jky-country'		, JKY.row['country'			]);
	JKY.set_value	('jky-website'		, JKY.row['website'			]);

	JKY.set_value	('jky-position'		, JKY.row['position'		]);
	JKY.set_value	('jky-phone'		, JKY.row['phone'			]);
	JKY.set_value	('jky-mobile'		, JKY.row['mobile'			]);
	JKY.set_value	('jky-fax'			, JKY.row['fax'				]);
	JKY.set_value	('jky-email'		, JKY.row['email'			]);

	JKY.set_value	('jky-code'			, JKY.row['code'			]);
	JKY.set_value	('jky-product'		, JKY.row['product'			]);
	JKY.set_value	('jky-composition'	, JKY.row['composition' 	]);
	JKY.set_option	('jky-machine'		, JKY.row['machine_id'		]);
	JKY.set_value	('jky-diameter'		, JKY.row['diameter'		]);
	JKY.set_value	('jky-density'		, JKY.row['density'			]);
	JKY.set_value	('jky-inputs'		, JKY.row['inputs'			]);
	JKY.set_value	('jky-speed'		, JKY.row['speed'			]);
	JKY.set_value	('jky-turns'		, JKY.row['turns'			]);
	JKY.set_value	('jky-weight'		, JKY.row['weight'			]);
	JKY.set_value	('jky-width'		, JKY.row['width'			]);
	JKY.set_value	('jky-lanes'		, JKY.row['lanes'			]);
	JKY.set_value	('jky-yield'		, JKY.row['yield'			]);
	JKY.set_value	('jky-needling'		, JKY.row['needling'		]);
	JKY.set_value	('jky-peso'			, JKY.row['peso'			]);
	JKY.set_radio	('jky-has-break'	, JKY.row['has_break'		]);

	JKY.set_value	('jky-name'			, JKY.row['name'			]);
	JKY.set_radio	('jky-machine-type'	, JKY.row['machine_type'	]);
	JKY.set_option	('jky-machine-family', JKY.row['machine_family'	]);
	JKY.set_option	('jky-machine-brand', JKY.row['machine_brand'	]);
	JKY.set_value	('jky-diameter'		, JKY.row['diameter'		]);
	JKY.set_value	('jky-width'		, JKY.row['width'			]);
	JKY.set_value	('jky-density'		, JKY.row['density'			]);
	JKY.set_value	('jky-inputs'		, JKY.row['inputs'			]);
	JKY.set_value	('jky-lanes'		, JKY.row['lanes'			]);
	JKY.set_value	('jky-repair-value'	, JKY.fix_ymd2dmy(JKY.row['repair_date']));
	JKY.set_value	('jky-return-value'	, JKY.fix_ymd2dmy(JKY.row['return_date']));

	JKY.set_value	('jky-code'			, JKY.row['code'			]);
	JKY.set_radio	('jky-machine-type'	, JKY.row['machine_type'	]);
	JKY.set_option	('jky-machine-brand', JKY.row['machine_brand'	]);
	JKY.set_value	('jky-name'			, JKY.row['name'			]);
	JKY.set_value	('jky-thread_group'	, JKY.row['thread_group'	]);
	JKY.set_value	('jky-thread_color'	, JKY.row['thread_color'	]);
	JKY.set_value	('jky-composition'	, JKY.row['composition'		]);

	if (jky_select == 'Root' && JKY.row['name'] == 'Root') {
		JKY.hide('jky-action-save'		);
		JKY.hide('jky-action-delete'	);
		JKY.hide('jky-action-cancel'	);
	}else{
		JKY.show('jky-action-save'		);
		JKY.show('jky-action-delete'	);
		JKY.show('jky-action-cancel'	);
	}

	if (JKY.row['is_company'] == 'yes') {
		JKY.hide('jky-company-name');
	}else{
		JKY.show('jky-company-name');
	}
	JKY.set_focus(jky_focus);
	JKY.display_composition()
}

JKY.load_table = function() {
	var my_order_by = jky_sort_by + ' ' + (jky_sort_seq == 0 ? 'ASC' : 'DESC');
	var my_data =
		{ method	: 'get_index'
		, table		: jky_table
		, select	: jky_select
		, filter	: jky_filter
		, order_by	: my_order_by
		};
	JKY.ajax(false, my_data, JKY.process_load_success);
}

JKY.process_load_success = function(response) {
	JKY.display_trace('process_load_success');
	JKY.rows	= response.rows;
	jky_count	= JKY.rows.length;
	jky_index	= 1;
	var my_html = '';
	for(var i=0; i<jky_count; i++) {
		var my_row = JKY.rows[i];
		my_html += '<tr onclick="JKY.display_form(' + (i+1) + ')">'
				+  '<td class="jky-checkbox"	><input type="checkbox"	 /></td>'

				+  '<td class="jky-sequence"	>' + my_row['sequence'		] + '</td>'
				+  '<td class="jky-name"		>' + my_row['name'			] + '</td>'
				+  '<td class="jky-value"		>' + my_row['value'			] + '</td>'
				+  '<td class="jky-status"		>' + my_row['status'		] + '</td>'

				+  '<td class="jky-full-name"	>' + my_row['full_name'		] + '</td>'
				+  '<td class="jky-phone"		>' + my_row['phone'			] + '</td>'
				+  '<td class="jky-mobile"		>' + my_row['mobile'		] + '</td>'
				+  '<td class="jky-email"		>' + my_row['email'			] + '</td>'

				+  '<td class="jky-code"		>' + my_row['code'			] + '</td>'
				+  '<td class="jky-product"		>' + my_row['product'		] + '</td>'
				+  '<td class="jky-machine"		>' + my_row['machine'		] + '</td>'
				+  '<td class="jky-composition"	>' + my_row['composition'	] + '</td>'

				+  '<td class="jky-name"		>' + my_row['name'			] + '</td>'
				+  '<td class="jky-diameter"	>' + my_row['diameter'		] + '</td>'
				+  '<td class="jky-width"		>' + my_row['width'			] + '</td>'
				+  '<td class="jky-density"		>' + my_row['density'		] + '</td>'
				+  '<td class="jky-inputs"		>' + my_row['inputs'		] + '</td>'
				+  '<td class="jky-lanes"		>' + my_row['lanes'			] + '</td>'

				+  '<td class="jky-code"		>' + my_row['code'			] + '</td>'
				+  '<td class="jky-name"		>' + my_row['name'			] + '</td>'
				+  '<td class="jky-thread_group">' + my_row['thread_group'	] + '</td>'
				+  '<td class="jky-thread_color">' + my_row['thread_color'	] + '</td>'
				+  '<td class="jky-composition"	>' + my_row['composition'	] + '</td>'

				+  '</tr>'
				;
	}
	JKY.set_html('jky-app-index', jky_index);
	JKY.set_html('jky-app-count', jky_count);
	JKY.set_html('jky-table-body', my_html );
	JKY.setTableWidthHeight('jky-app-table', 851, 221, 390, 115);
}

JKY.process_add_new = function() {
	JKY.hide('jky-form-tabs');
	jky_index = 0;
	JKY.display_new();
	JKY.hide('jky-app-filter'		);
	JKY.hide('jky-app-more'			);
	JKY.hide('jky-app-navs'			);
	JKY.show('jky-app-add-new'		);
	JKY.hide('jky-app-counters'		);
	JKY.hide('jky-action-add-new'	);
	JKY.show('jky-action-save'		);
	JKY.hide('jky-action-copy'		);
	JKY.hide('jky-action-delete'	);
	JKY.show('jky-action-cancel'	);
	JKY.hide('jky-app-table'		);
	JKY.show('jky-app-form'			);
}

JKY.display_new = function() {
	JKY.set_option	('jky-status'		, 'Active');
	JKY.set_value	('jky-sequence'		, 50);
	JKY.set_value	('jky-name'			, '');
	JKY.set_value	('jky-value'		, '');

	JKY.set_value	('jky-full-name'	, '');
	JKY.set_check	('jky-is-company'	, 'no');
	JKY.set_option	('jky-company-name'	, '');
	JKY.set_option	('jky-company-tag'	, '');

	JKY.set_value	('jky-street1'		, '');
	JKY.set_value	('jky-street2'		, '');
	JKY.set_value	('jky-city'			, '');
	JKY.set_value	('jky-zip'			, '');
	JKY.set_option	('jky-state'		, '');
	JKY.set_option	('jky-country'		, '');
	JKY.set_value	('jky-website'		, '');

	JKY.set_value	('jky-position'		, '');
	JKY.set_value	('jky-phone'		, '');
	JKY.set_value	('jky-mobile'		, '');
	JKY.set_value	('jky-fax'			, '');
	JKY.set_value	('jky-email'		, '');

	JKY.set_value	('jky-code'			, 'New');
	JKY.set_radio	('jky-product'		,  null);
	JKY.set_value	('jky-composition'	, '');
	JKY.set_option	('jky-machine'		,  null);
	JKY.set_value	('jky-diameter'		, '0');
	JKY.set_value	('jky-density'		, '0');
	JKY.set_value	('jky-inputs'		, '0');
	JKY.set_value	('jky-speed'		, '0');
	JKY.set_value	('jky-turns'		, '0');
	JKY.set_value	('jky-weight'		, '0');
	JKY.set_value	('jky-width'		, '0');
	JKY.set_value	('jky-lanes'		, '0');
	JKY.set_value	('jky-yield'		, '0');
	JKY.set_value	('jky-needling'		, '0');
	JKY.set_value	('jky-peso'			, '12.5');
	JKY.set_radio	('jky-has-break'	, 'No');

	JKY.set_value	('jky-name'			, '' );
	JKY.set_radio	('jky-machine-type'	, 'Circular');
	JKY.set_option	('jky-machine-family', '' );
	JKY.set_option	('jky-machine-brand', '' );
	JKY.set_value	('jky-diameter'		, '0');
	JKY.set_value	('jky-width'		, '0');
	JKY.set_value	('jky-density'		, '0');
	JKY.set_value	('jky-inputs'		, '0');
	JKY.set_value	('jky-lanes'		, '0');
	JKY.set_value	('jky-repair-value'	, '' );
	JKY.set_value	('jky-return-value'	, '' );

	JKY.set_value	('jky-code'			, '' );
//	JKY.set_radio	('jky-machine-type'	, 'Circular');
//	JKY.set_option	('jky-machine-brand', '' );
	JKY.set_value	('jky-name'			, '0');
	JKY.set_value	('jky-thread_group'	, '0');
	JKY.set_value	('jky-thread_color'	, '0');
	JKY.set_value	('jky-composition'	, '0');

	JKY.set_focus(jky_focus);
}

JKY.get_form_set = function() {
	var my_set = ''
		+       'group_set=\'' + jky_select + '\''
		+        ', status=\'' + JKY.get_value	('jky-status'		) + '\''
		+      ', sequence=  ' + JKY.get_value	('jky-sequence'		)
		+          ', name=\'' + JKY.get_value	('jky-name'			) + '\''
		+         ', value=\'' + JKY.get_value	('jky-value'		) + '\''

		+       'full_name=\'' + JKY.get_value	('jky-full-name'	) + '\''
		+    ', is_company=\'' + JKY.get_value	('jky-is-company'	) + '\''
//		+  ', company_name=\'' + JKY.get_value	('jky-company-name'	) + '\''
//		+   ', company_tag=\'' + JKY.get_value	('jky-company-tag'	) + '\''

		+       ', street1=\'' + JKY.get_value	('jky-street1'		) + '\''
		+       ', street2=\'' + JKY.get_value	('jky-street2'		) + '\''
		+          ', city=\'' + JKY.get_value	('jky-city'			) + '\''
		+           ', zip=\'' + JKY.get_value	('jky-zip'			) + '\''
		+         ', state=\'' + JKY.get_value	('jky-state'		) + '\''
		+       ', country=\'' + JKY.get_value	('jky-country'		) + '\''
		+       ', website=\'' + JKY.get_value	('jky-website'		) + '\''

		+      ', position=\'' + JKY.get_value	('jky-position'		) + '\''
		+         ', phone=\'' + JKY.get_value	('jky-phone'		) + '\''
		+        ', mobile=\'' + JKY.get_value	('jky-mobile'		) + '\''
		+           ', fax=\'' + JKY.get_value	('jky-fax'			) + '\''
		+         ', email=\'' + JKY.get_value	('jky-email'		) + '\''

//		+            'code=\'' + JKY.get_value	('jky-code'			) + '\''
//		+    ', product_id=\'' + JKY.get_value	('jky-product'		) + '\''
		+    '  machine_id=\'' + JKY.get_value	('jky-machine'		) + '\''
		+      ', diameter=\'' + JKY.get_value	('jky-diameter'		) + '\''
		+       ', density=\'' + JKY.get_value	('jky-density'		) + '\''
		+        ', inputs=\'' + JKY.get_value	('jky-inputs'		) + '\''
		+         ', speed=\'' + JKY.get_value	('jky-speed'		) + '\''
		+         ', turns=\'' + JKY.get_value	('jky-turns'		) + '\''
		+        ', weight=\'' + JKY.get_value	('jky-weight'		) + '\''
		+         ', width=\'' + JKY.get_value	('jky-width'		) + '\''
		+         ', lanes=\'' + JKY.get_value	('jky-lanes'		) + '\''
		+         ', yield=\'' + JKY.get_value	('jky-yield'		) + '\''
		+      ', needling=\'' + JKY.get_value	('jky-needling'		) + '\''
		+		   ', peso=\'' + JKY.get_value	('jky-peso'			) + '\''
		+     ', has_break=\'' + JKY.get_checked('jky-has-break'	) + '\''

		+            'name=\'' + JKY.get_value	('jky-name'			) + '\''
		+  ', machine_type=\'' + JKY.get_checked('jky-machine-type'	) + '\''
		+ ', machine_family=\'' + JKY.get_value	('jky-machine-family') + '\''
		+ ', machine_brand=\'' + JKY.get_value	('jky-machine-brand') + '\''
		+      ', diameter=\'' + JKY.get_value	('jky-diameter'		) + '\''
		+         ', width=\'' + JKY.get_value	('jky-width'		) + '\''
		+       ', density=\'' + JKY.get_value	('jky-density'		) + '\''
		+        ', inputs=\'' + JKY.get_value	('jky-inputs'		) + '\''
		+	      ', lanes=\'' + JKY.get_value	('jky-lanes'		) + '\''

		+            'code=\'' + JKY.get_value	('jky-code'			) + '\''
//		+  ', machine_type=\'' + JKY.get_checked('jky-machine-type'	) + '\''
//		+ ', machine_brand=\'' + JKY.get_value	('jky-machine-brand') + '\''
		+          ', name=\'' + JKY.get_value	('jky-name'			) + '\''
		+  ', thread_group=\'' + JKY.get_value	('jky-thread_group'	) + '\''
		+  ', thread_color=\'' + JKY.get_value	('jky-thread_color'	) + '\''
		+   ', composition=\'' + JKY.get_value	('jky-composition'	) + '\''
		;

	var my_date= JKY.get_value('jky-repair-value');
	my_set += ', repair_date = ' + JKY.fix_dmy2ymd(my_date);

	var my_date= JKY.get_value('jky-return-value');
	my_set += ', return_date = ' + JKY.fix_dmy2ymd(my_date);
	return my_set;
}

JKY.process_save = function() {
	if (jky_index == 0) {
		JKY.process_insert();
	}else{
		JKY.process_update();
	}
}

JKY.process_insert = function() {
	var my_data =
		{ method: 'insert'
		, table : jky_table
		, set	: JKY.get_form_set()
		};
	JKY.ajax(false, my_data, JKY.process_insert_success);
}

JKY.process_insert_success = function(response) {
	JKY.display_trace('process_insert_success');
	JKY.display_message(response.message);
	JKY.refresh_select(jky_select);			//	only used on [Configs and Controls]
	JKY.display_list();

	JKY.load_table();
	JKY.display_form(JKY.get_index_by_id(response.id, JKY.rows)+1);
}

JKY.process_update = function() {
	var my_where = 'id = ' + JKY.rows[jky_index-1]['id'];
	var my_data =
		{ method: 'update'
		, table : jky_table
		, set	: JKY.get_form_set()
		, where : my_where
		};
	JKY.ajax(false, my_data, JKY.process_update_success);
}

JKY.process_update_success = function(response) {
	JKY.display_trace('process_update_success');
	JKY.display_message(response.message);
	JKY.refresh_select(jky_select);			//	only used on [Configs and Controls]
	JKY.rows[jky_index-1] = JKY.get_row(jky_table, JKY.rows[jky_index-1]['id']);
	JKY.display_next();
}

JKY.process_delete = function() {
	JKY.display_confirm(JKY.delete_confirmed, null, 'Delete', 'You requested to <b>delete</b> this record. <br>Are you sure?', 'Yes', 'No');
}

JKY.delete_confirmed = function() {
	var my_id = JKY.row.id;

	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Sets'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Loads'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete_many'
		, table : 'FTP_Threads'
		, where : 'ftp_id = ' + my_id
		};
	JKY.ajax(true, my_data);

	var my_data =
		{ method: 'delete'
		, table : jky_table
		, where : 'id = ' + my_id
		};
	JKY.ajax(false, my_data, JKY.process_delete_success);
}

JKY.process_delete_success = function(response) {
	JKY.display_trace('process_delete_success');
	JKY.display_message(response.message);
	JKY.refresh_select(jky_select);			//	only used on [Configs and Controls]
	JKY.display_list();
}

JKY.process_cancel = function() {
	JKY.show('jky-action-delete'	);
	JKY.show('jky-app-navs'			);
	JKY.hide('jky-app-add-new'		);
	JKY.show('jky-app-counters'		);
	JKY.display_list();
}

/**
 * process export
 */
JKY.process_export = function() {
	var my_sort_by = jky_sort_by;
	if (jky_sort_seq < 0 ) {
		my_sort_by += ' DESC';
	}
	JKY.run_export(jky_table, jky_select, jky_filter, jky_specific, my_sort_by);
};

/**
 * only used on [Configs and Controls]
 */
JKY.refresh_select = function(selected) {
	if (selected == 'Root') {
		JKY.set_html('jky-app-select', JKY.set_group_set(jky_table , jky_select, 'Root'));
	}
}
